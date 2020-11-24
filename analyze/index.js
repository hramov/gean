import natural from 'natural'
import { log } from './../utils'
import store from './../store'

import { searchWordForExisting } from './../search'

const tokenizer = new natural.WordTokenizer();

async function sentimental(word) {
    const dict = store.getDict()
    let sentimental = 0
    dict.forEach(dictWord => {
        if (dictWord.term === word) {
            sentimental = dictWord.value
            return
        }
    })
    return Number(sentimental)
}

async function checkWord(word) {
    let sent = 0
    try {
        word = word.toLowerCase()
        if (!await searchWordForExisting(natural.PorterStemmerRu.stem(word))) {
            word = ''
        }
        sent = await sentimental(natural.PorterStemmerRu.stem(word))
    } catch (err) {
        log(err)
    }

    return {
        word: word,
        sentimental: sent
    }
}

export async function checkWords(song) {
    let words_array = []

    try {
        song.lyrics = tokenizer.tokenize(song.lyrics)
    } catch (err) {
        console.log(err)
    }

    song.lyrics = new Set(song.lyrics)
    song.lyrics = Array.from(song.lyrics)
    for (let i = 0; i < song.lyrics.length; i++) {
        words_array.push(await checkWord(song.lyrics[i]))
    }

    words_array = words_array.filter(word => word.term !== '')
    song.lyrics = words_array

    return song
}