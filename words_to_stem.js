import natural from 'natural'
import fs from 'fs'
import appRoot from 'app-root-path'

const tokenizer = new natural.WordTokenizer()

let data = fs.readFileSync(`${appRoot}/data/words.txt`, 'utf-8').split('\r\n')

data = data.map(word => natural.PorterStemmerRu.stem(word))

data.forEach(word => {
    fs.appendFileSync(`${appRoot}/data/words_stem.txt`, word + '\n')
})