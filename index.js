import dotenv from 'dotenv'
dotenv.config()

import { searchSongsAndContent } from './search'
import { checkWords } from './analyze'
import { sendData } from './FBController'
import { checkLogFile, log } from './utils'
import statistics from './analyze/statistics'

import config from './config.json'

async function index() {

    for (let i = 0; i < config.artists.length; i++) {

        let result
        result = await searchSongsAndContent(artists[i])
        result = result.map(song => checkWords(song))

        await sendData(result)
        await statistics(result)
    }

}

checkLogFile()
index()