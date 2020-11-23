/**
 * artists.json
 * [
 *   random_id: {
 *          id: number
 *          name: string
 *          image: string
 *          url: string
 *          unique_words: number
 *          words: Array<string>
 *      }
 * ]
 * 
 */

import { getWords } from './../FBController'
import _ from 'underscore'

export default async function statistics(artist, data) {
    console.log('Собираю статистику')

    let result = await getWords(artist.id)

    if (result.words) {
        result.words.push(_.flatten(data))
        result.words = Array.from(new Set(_.flatten(result.words)))
        artist.words = result.words
        artist.unique_words = result.words.length
    } else {
        result.words = _.flatten(data)
        result.words = Array.from(new Set(_.flatten(result.words)))

        artist.words = result.words
        artist.unique_words = result.words.length
    }

    return artist
}