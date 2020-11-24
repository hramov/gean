import dotenv from 'dotenv'
dotenv.config()
import axios from 'axios'
axios.defaults.headers.common = { 'Authorization': `bearer ${process.env.CLIENT_TOKEN}` }

import { searchSongsAndContent } from './search'
import { checkWords } from './analyze'
import { addArtist, updateArtist } from './FBController'
import statistics from './analyze/statistics'
import fs from 'fs'
import appRoot from 'app-root-path'

import { checkLogFile } from './utils'
import config from './config.json'

const artists = config.artists

export default async function index() {

    checkLogFile()

    let words = fs.readFileSync(`${appRoot}/data/words_stem.txt`, 'utf-8')
    words = words.split('\n')

    for (let i = 0; i < artists.length; i++) {

        await addArtist(artists[i])

        /*****************Checked!************************* */

        let result
        result = await searchSongsAndContent(artists[i].name)

        /************************************************** */

        let proceeded_result = []

        for (let j = 0; j < result.length; j++) {
            proceeded_result.push(await checkWords(words, result[j]))
        }

        for (let k = 0; k < proceeded_result.length; k++) {
            await updateArtist(await statistics(artists[i], proceeded_result[k].lyrics))
        }

    }
    process.exit(0)
}