import axios from 'axios'
import { artistType, errorType } from '../types'
import { log } from '../utils'

export async function addArtist(artist: artistType): Promise<boolean> {
    let result: artistType[]
    let artists: artistType[] = await getArtists()
    
    if (artists) {
        const values = Object.values(artists)
        const valuesId: number[] = values.map(values => values.id)

        if (valuesId.includes(artist.id)) {
            log('Нет новых исполнителей')
            return false
        }
    }

    log('Записываю нового исполнителя')
    result = await axios.post('https://genuis-parser.firebaseio.com/artists.json', artist)
    return true
}

async function getArtists(): Promise<artistType[]> {
    const result = await axios.get('https://genuis-parser.firebaseio.com/artists.json')
    return result.data
}

export async function getArtist(id: number): Promise<artistType> {
    const artist: artistType[] = await getArtists()
    console.log(Object.values(artist))
    return Object.values(artist).filter(artist => artist.id === id)[0]
}

export async function updateArtist(artist: artistType): Promise<artistType> {
    log('Отправляю данные')
    let artists: artistType = await getArtist(artist.id)
    let keys: string[] = Object.keys(artists)
    let values = Object.values(artists)
    let key: string = ''

    for (let i = 0; i < values.length; i++) {
        if (values[i] === artist.id) key = keys[i]
    }
    log(`https://genuis-parser.firebaseio.com/artists/${key}`)
    const result = await axios.patch(`https://genuis-parser.firebaseio.com/artists/${key}.json`, artist)
    return result.data
}

export async function getWords(id_artist: number) {
    const result: artistType = await getArtist(id_artist)
    return {
        unique_words: result.unique_words,
        words: result.words
    }
}