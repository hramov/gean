import dotenv from 'dotenv'
dotenv.config()
import fs from 'fs'
import appRoot from 'app-root-path'
import axios from 'axios'

import { searchSongsAndContent } from './search'
import { checkWords } from './analyze'
import { addArtist, updateArtist, getArtist } from './FBController'
import { checkLogFile, readCSV } from './utils'

import statistics from './analyze/statistics'
import config from './config.json'
import store from './store'

const artists = config.artists
axios.defaults.headers.common = { 'Authorization': `bearer ${process.env.CLIENT_TOKEN}` }

async function index() {

    checkLogFile()
    await readCSV()

    let words = fs.readFileSync(`${appRoot}/data/words_stem.txt`, 'utf-8')
    words = words.split('\n')
    store.setWords(words)

    for (let i = 0; i < artists.length; i++) {

        if (!await addArtist(artists[i])) artists[i] = await getArtist(artists[i].id)
        let result = await searchSongsAndContent(artists[i])

        let songs_id = result.map(song => song.song_id)
        let proceeded_result = []

        for (let j = 0; j < result.length; j++) {
            proceeded_result.push(await checkWords(result[j]))
        }

        for (let k = 0; k < proceeded_result.length; k++) {
            await updateArtist(await statistics(artists[i], proceeded_result[k].lyrics, songs_id))
        }

    }
}

index()