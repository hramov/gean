import dotenv from 'dotenv'
dotenv.config()

import { searchSongsAndContent } from './search'
import { checkWords } from './analyze'
import { sendData } from './FBController'
import statistics from './analyze/statistics'

import { checkLogFile, log } from './utils'
import config from './config.json'

const artists = config.artists

async function index() {

    for (let i = 0; i < artists.length; i++) {

        let result
        result = await searchSongsAndContent(artists[i])
        result = result.map(song => checkWords(song))
        await sendData(statistics(artists[i].id, result.join(' ')))
    }

}

checkLogFile()
index()