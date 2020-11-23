import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
axios.defaults.headers.common = { 'Authorization': `bearer ${process.env.CLIENT_TOKEN}` }

import { searchSongsAndContent } from './search'
import { checkWords } from './analyze'
import { updateArtist } from './FBController'
import statistics from './analyze/statistics'

import { checkLogFile, log } from './utils'
import config from './config.json'

const artists = config.artists

async function index() {

    for (let i = 0; i < artists.length; i++) {

        /*****************Checked!************************* */

        let result
        result = await searchSongsAndContent(artists[i].name)

        /************************************************** */

        let proceeded_result = []

        for (let j = 0; j < result.length; j++) {
            proceeded_result.push(await checkWords(result[i]))
        }
        console.log(proceeded_result)

        // log(await updateArtist(await statistics(artists[i], result)))
    }

    process.exit(0)
}

checkLogFile()
index()