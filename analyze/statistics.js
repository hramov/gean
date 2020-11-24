import _ from 'underscore'

import { getWords } from './../FBController'
import { log } from './../utils'

/**
 * Функция удаления одинаковых объектов из массива (https://www.internet-technologies.ru)
 * @param {Array<Object>} arr - массив слов и их эмоциональной окраски
 * @returns {Array<Object>} массив уникальных слов и их эмоциональной окраски
 */
function removeDuplicates(arr) {
    const result = [];
    const duplicatesIndices = [];
    arr.forEach((current, index) => {
        if (duplicatesIndices.includes(index)) return
        result.push(current)
        for (let comparisonIndex = index + 1; comparisonIndex < arr.length; comparisonIndex++) {
            const comparison = arr[comparisonIndex]
            const currentKeys = Object.keys(current)
            const comparisonKeys = Object.keys(comparison)
            if (currentKeys.length !== comparisonKeys.length) continue
            const currentKeysString = currentKeys.sort().join("").toLowerCase()
            const comparisonKeysString = comparisonKeys.sort().join("").toLowerCase()
            if (currentKeysString !== comparisonKeysString) continue
            let valuesEqual = true;
            for (let i = 0; i < currentKeys.length; i++) {
                const key = currentKeys[i]
                if (current[key] !== comparison[key]) {
                    valuesEqual = false
                    break
                }
            }
            if (valuesEqual) duplicatesIndices.push(comparisonIndex);
        }
    })
    return result;
}

/**
 * Функция обработки и обновления данных исполнителя
 * @param {Object} artist - объект исполнителя 
 * @param {Array<Object>} data - массив объектов слов
 * @returns Обновленный объект исполнителя
 */
export default async function statistics(artist, data) {
    log('Собираю статистику')
    let result = await getWords(artist.id)
    if (result.words.length > 0) {
        result.words.push(_.flatten(data))
        result.words = _.flatten(result.words)
        result.words = removeDuplicates(result.words)
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