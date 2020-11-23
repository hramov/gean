import { getSongs } from './../FBController'
import _ from 'underscore'

export default async function statistics(id_artist, data) {

    const words = await getSongs(id_artist) // ['','','']
    words = words.append(data).join(' ').split(' ')
    words = _.unique(words)

    return {
        words: words, // ['','',''] Array of all unique words for the particular artist
        count: words.length // Number of unique words for the particular artist
    }
}