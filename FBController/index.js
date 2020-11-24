import axios from 'axios'
import { fbconfig } from './../fbconfig'
import firebase from 'firebase'
import admin from 'firebase-admin'
import { log } from './../utils'

firebase.initializeApp(fbconfig);
admin.initializeApp(fbconfig)

const db = admin.database();

export async function addArtist(data) {
    let result = []
    let artists = await getArtists()
    if (artists) {
        let values = Object.values(artists)
        values = values.map(values => values.id)

        if (values.includes(data.id)) {
            log('Нет новых исполнителей')
            return false
        }
    }
    log('Записываю нового исполнителя')
    result = await axios.post('https://genuis-parser.firebaseio.com/artists.json', data)
    return true
}

async function getArtists() {
    const result = await axios.get('https://genuis-parser.firebaseio.com/artists.json') || { error: true, message: 'В базе нет исполнителей' }
    return result.data
}

export async function getArtist(id) {
    const result = await getArtists()
    return Object.values(result).filter(artist => artist.id === id)[0] || { error: true, message: 'Нет исполнителя с таким ID' }
}

export async function updateArtist(artist) {
    log('Отправляю данные')
    let artists = await getArtists(artist.id)
    let keys = Object.keys(artists)
    let values = Object.values(artists)
    let key = ''

    for (let i = 0; i < values.length; i++) {
        if (values[i].id === artist.id) key = keys[i]
    }
    log(`https://genuis-parser.firebaseio.com/artists/${key}`)
    const result = await axios.patch(`https://genuis-parser.firebaseio.com/artists/${key}.json`, artist)
    return result.data
}

export async function getWords(id_artist) {
    const result = await getArtist(id_artist)
    return {
        unique_words: result.unique_words,
        words: result.words
    }
}