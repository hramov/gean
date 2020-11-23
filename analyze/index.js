import natural from 'natural'
import { log } from './../utils'

import { searchWordForExisting } from './../search'

const tokenizer = new natural.WordTokenizer();

async function checkWord(words, word) {
    try {
        word = word.toLowerCase()
        word = natural.PorterStemmerRu.stem(word)
        if (!await searchWordForExisting(words, word)) {
            word = ''
        }
    } catch (err) {
        log(err)
        return ''
    }
    return word
}

export async function checkWords(words, song) {
    let words_array = []

    try {
        song.lyrics = tokenizer.tokenize(song.lyrics)
    } catch (err) {
        console.log(err)
    }

    song.lyrics = new Set(song.lyrics)
    song.lyrics = Array.from(song.lyrics)
    for (let i = 0; i < song.lyrics.length; i++) {
        words_array.push(await checkWord(words, song.lyrics[i]))
    }

    words_array = words_array.filter(word => word !== '')
    song.lyrics = words_array
    return song
}