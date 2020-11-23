import axios from 'axios'
import { fbconfig } from './fbconfig'
import firebase from 'firebase'
import admin from 'firebase-admin'
import { log } from './../utils'

firebase.initializeApp(fbconfig);
admin.initializeApp(fbconfig)

const db = admin.database();

export async function getWords(id_artist) {
    const result = await getArtist(id_artist)
    return {
        unique_words: result.unique_words,
        words: result.words
    }
}

export async function addArtist(data) {
    const result = await axios.post('https://genuis-parser.firebaseio.com/artists.json', data)
    return result.data
}

async function getArtist(id) {
    const result = await getArtists()
    return Object.values(result).filter(artist => artist.id === id)[0] || { error: true, message: 'Нет исполнителя с таким ID' }
}

async function getArtists() {
    const result = await axios.get('https://genuis-parser.firebaseio.com/artists.json') || { error: true, message: 'В базе нет исполнителей' }
    return result.data
}

export async function updateArtist(artist) {
    console.log('Отправляю данные')
    let artists = await getArtists(artist.id)
    let keys = Object.keys(artists)
    let values = Object.values(artists)
    let key = ''

    for (let i = 0; i < values.length; i++) {
        if (values[i].id === artist.id) key = keys[i]
    }
    console.log(`https://genuis-parser.firebaseio.com/artists/${key}`)
    const result = await axios.patch(`https://genuis-parser.firebaseio.com/artists/${key}.json`, artist)
    return result.data
}