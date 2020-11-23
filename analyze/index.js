import natural from 'natural'

import { log } from './utils'
import { searchWordForExisting } from './../search'

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmerRu

async function checkWord(word) {
    if (await searchWordForExisting(word)) {
        word = stemmer.stem(word)
        return word
    }
    return ''
}

export async function checkWords(song) {
    song.lyrics = tokenizer.tokenize(song.lyrics)
    song.lyrics = song.lyrics.map(async word => await checkWord(word))
    song.lyrics.filter(word => word !== '')
    return song
}