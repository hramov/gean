// import natural from 'natural'
import { log } from './utils'

function removeRedundant(word) {
    // use one of natural functions to remove word's preffix and suffix
}

function isValid(word) {
    //maybe use some free check API
}

function checkWord(word) {
    word = removeRedundant(word)
    word = isValid(word)
    return word
}

export function checkWords(song) {
    const word_array = song.split(' ')
    word_array = word_array.map(word => checkWord(word))
    return word_array || []
}