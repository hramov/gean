import axios from 'axios'
import cheerio from 'cheerio'
import hp2 from 'htmlparser2'
import { log } from './../utils'
import { removeEmptyStrings } from './../proceed'
import config from './../config.json'

async function searchSongsByArtist(name_artist) {

    let songs = []
    for (let i = 0; i < config.pages; i++) {
        console.log(`${process.env.API_URL}${encodeURI(name_artist)}&per_page=${config.per_page}&page=${i+1}`)

        let result = await axios.get(`${process.env.API_URL}${encodeURI(name_artist)}&per_page=${config.per_page}&page=${i+1}`)
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

export async function searchSongsAndContent(name_artist) {
    try {
        let songs = await searchSongsByArtist(name_artist)
        for (let i = 0; i < songs.length; i++) {
            log(`Обрабатываю ${songs[i].song_name}`)
            let result
            do {
                result = await searchSongContent(songs[i].song_url)
            } while (result.length < 200)

            songs[i].lyrics = result
        }
    } catch (err) {
        console.log(err)
        return
    }
    return songs
}

export async function searchWordForExisting(words, word) {
    if (words.includes(word)) return true
    return false
}