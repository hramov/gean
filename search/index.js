import axios from 'axios'
import cheerio from 'cheerio'
import hp2 from 'htmlparser2'
import { log } from './../utils'
import { removeEmptyStrings } from './../proceed'
import config from './../config.json'
import store from './../store'

async function searchSongsByArtist(artist) {

    let songs = []
    for (let i = 0; i < config.pages; i++) {
        log(`${process.env.API_URL}${encodeURI(artist.name)}&per_page=${config.per_page}&page=${i+1}`)

        let result = await axios.get(`${process.env.API_URL}${encodeURI(artist.name)}&per_page=${config.per_page}&page=${i+1}`)
        result = result.data.response.hits
        result.forEach(res => {

            if (artist.songs.includes(res.result.id)) {
                log(`Песня ${res.result.title} уже есть в базе`)
                return
            }

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

export async function searchSongsAndContent(artist) {
    let songs = []
    try {
        songs = await searchSongsByArtist(artist)
        for (let i = 0; i < songs.length; i++) {
            log(`Обрабатываю ${songs[i].song_name}`)
            let result
            do {
                result = await searchSongContent(songs[i].song_url)
            } while (result.length < 200)

            songs[i].lyrics = result
        }
    } catch (err) {
        log(err)
        return
    }
    return songs
}

export async function searchWordForExisting(word) {
    const words = store.getWords()
    if (words.includes(word)) return true
    return false
}