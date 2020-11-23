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

export default async function statistics(artist, data) {
    const result = await getWords(artist.id)
    const words = new Set(result.words)
    words = words.add(data)

    artist.words = words
    artist.unique_words = words.length

    return artist
}