import dotenv from 'dotenv'
dotenv.config()

import { searchSongsAndContent } from './search'
import config from './config.json'

async function index() {

    for (let i = 0; i < config.artists.length; i++) {
        result = await searchSongsAndContent(artists[i])
        console.log(result)
    }
}

index()