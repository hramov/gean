import axios, { AxiosResponse } from 'axios'
import cheerio from 'cheerio'
import hp2 from 'htmlparser2'

import { log } from '../utils'
import { removeEmptyStrings } from './../proceed'
import store from '../store'

import { artistType, songType, geniusAPIType } from './../types'
import config from '../config.json'

async function searchSongsByArtist(artist: artistType): Promise<Array<songType>> {

    let songs: songType[] = []

    for (let i = 0; i < config.pages; i++) {
        log(`${process.env.API_URL}${encodeURI(artist.name)}&per_page=${config.per_page}&page=${i + 1}`)

        const result = await axios.get(`${process.env.API_URL}${encodeURI(artist.name)}&per_page=${config.per_page}&page=${i + 1}`)
        const resultText = result.data.response.hits

        resultText.forEach((res: geniusAPIType) => {

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
                lyrics: '',
                lyricsArray: []
            })

        })
    }
    return songs
}

async function searchSongContent(url: string): Promise<string> {
    const content: AxiosResponse = await axios.get(url)
    const contentData: string = content.data

    const domContent = hp2.parseDOM(contentData)
    const $ = cheerio.load(domContent.toString());
    let textp = $('.song_body-lyrics')
    return removeEmptyStrings(textp.text())
}

export async function searchSongsAndContent(artist: artistType): Promise<songType[]> {
    let songs: songType[]
    songs = await searchSongsByArtist(artist)
    for (let i = 0; i < songs.length; i++) {
        log(`Обрабатываю ${songs[i].song_name}`)
        let result: string
        do {
            result = await searchSongContent(songs[i].song_url)
        } while (result.length < 200)

        songs[i].lyrics = result
    }
    return songs
}

export async function searchWordForExisting(word: string): Promise<boolean> {
    const words: Array<string> = store.getWords()
    if (words.includes(word)) return true
    return false
}