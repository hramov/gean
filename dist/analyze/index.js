import natural from 'natural';
import { log } from '../utils';
import store from '../store';
import { searchWordForExisting } from '../search';
const tokenizer = new natural.WordTokenizer();
async function sentimental(word) {
    const dict = store.getDict();
    let sentimental = 0;
    dict.forEach(dictWord => {
        if (dictWord.term === word) {
            sentimental = dictWord.value;
            return;
        }
    });
    return sentimental;
}
async function checkWord(word) {
    let sent = 0;
    try {
        word = word.toLowerCase();
        if (!await searchWordForExisting(natural.PorterStemmerRu.stem(word))) {
            word = '';
        }
        sent = await sentimental(natural.PorterStemmerRu.stem(word));
    }
    catch (err) {
        log(err);
    }
    return {
        word: word,
        sentimental: sent
    };
}
export async function checkWords(song) {
    let words_array = [];
    let lyricsArray = [];
    lyricsArray = tokenizer.tokenize(song.lyrics);
    const lyricsSet = new Set(lyricsArray);
    lyricsArray = Array.from(lyricsSet);
    for (let i = 0; i < lyricsArray.length; i++) {
        words_array.push(await checkWord(lyricsArray[i]));
    }
    words_array = words_array.filter(word => word.word !== '');
    song.lyricsArray = words_array;
    return song;
}
