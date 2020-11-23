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
    song.content = song.content.split(' ')
    song.content = song.content.map(word => checkWord(word))
    return song
}