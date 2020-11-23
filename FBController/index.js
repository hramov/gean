import { fbconfig } from './fbconfig'
import firebase from 'firebase'
import admin from 'firebase-admin'

firebase.initializeApp(fbconfig);
admin.initializeApp(fbconfig)

const db = admin.database();

export async function addSong(id_artist, data) {

}

export async function patchSong(id_artist, id_song, data) {

}

export async function getSong(id_artist, id_song) {

}

export async function getSongs(id_artist) {

}

export async function addArtist(data) {
    const result = await axios.post('https://genuis-parser.firebaseio.com/artists.json', data)
    return result.data
}

export async function getArtist(id) {
    const result = await getArtists()
    return Object.values(result).filter(artist => artist.id === id)[0] || { error: true, message: 'Нет исполнителя с таким ID' }
}

export async function getArtists() {
    const result = await axios.get('https://genuis-parser.firebaseio.com/artists.json') || { error: true, message: 'В базе нет исполнителей' }
    return result.data
}