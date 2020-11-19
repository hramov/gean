import dotenv from 'dotenv'
dotenv.config()

import axios from 'axios'
axios.defaults.headers.common = { 'Authorization': `bearer ${process.env.CLIENT_TOKEN}` }

import hp2 from 'htmlparser2'
import cheerio from 'cheerio'

import config from './config.json'

async function sendData() {

}

function removeEmptyStrings(message) {
    let content = message.split('\n')

    let newMessage = []
    for (let line of content) {
        line = line.trim()
        if (line.length > 20) newMessage.push(line)
    }
    message = newMessage.join('\n')
    return message
}

async function searchSongsByArtist(artist) {
    let songs = []
    for (let i = 0; i < config.pages; i++) {
        let result = await axios.get(`${process.env.API_URL}${encodeURI(artist)}&per_page=${config.per_page}&page=${i+1}`)
        result = result.data.response.hits
        result.forEach(res => {
            songs.push({
                artist_name: res.result.primary_artist.name,
                artist_id: res.result.primary_artist.id,
                song_name: res.result.title,
                song_id: res.result.id,
                song_url: res.result.url,
                lyrics: ''
            })
        })
    }
    return songs
}

async function searchSongContent(url) {
    let content = await axios.get(url)
    content = content.data
    const dom = hp2.parseDOM(content)
    const $ = cheerio.load(dom);
    let textp = $('.song_body-lyrics')
    return removeEmptyStrings(textp.text())
}

async function searchSongsAndContent(artist) {
    let songs = await searchSongsByArtist(artist)
    for (let i = 0; i < songs.length; i++) {
        console.log(`Обрабатываю ${songs[i].song_name}`)
        let result
        do {
            result = await searchSongContent(songs[i].song_url)
        } while (result.length < 200)

        songs[i].lyrics = result
    }
    return songs
}

async function index() {
    let result
    const artists = config.artists

    for (let i = 0; i < config.artists.length; i++) {
        result = await searchSongsAndContent(artists[i])
        await sendData(result)
        console.log(result)
    }
}

index()