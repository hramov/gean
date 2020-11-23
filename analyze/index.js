import natural from 'natural'
import { searchWordForExisting } from './../search'

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmerRu

async function checkWord(word) {
    word = word.toLowerCase()
    if (await searchWordForExisting(word.toLowerCase())) {
        console.log(word)
        word = stemmer.stem(word)
        return word
    }
    return ''
}

export async function checkWords(song) {
    let words_array = []

    song.lyrics = tokenizer.tokenize(song.lyrics)
    song.lyrics = new Set(song.lyrics)
    song.lyrics = Array.from(song.lyrics)

    for (let i = 0; i < song.lyrics.length; i++) {
        words_array.push(await checkWord(song.lyrics[i]))
    }

    words_array = words_array.filter(word => word !== '')
    song.lyrics = words_array
    return song
}