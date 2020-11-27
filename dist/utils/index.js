import fs from 'fs';
import appRoot from 'app-root-path';
import csv from 'csv-parser';
import store from '../store';
import natural from 'natural';
const LOG_PATH = `${appRoot}/logs/log.txt`;
export function checkLogFile() {
    if (!fs.existsSync(LOG_PATH)) {
        fs.openSync(LOG_PATH, 'w');
        log('Файл логов создан');
    }
}
export function log(logText) {
    const log = `${new Date(Date.now()).toLocaleDateString()} ${new Date(Date.now()).toLocaleTimeString()} | ${logText}`;
    fs.appendFileSync(LOG_PATH, log + '\n');
    console.log(log);
}
export async function readCSV() {
    let results = [];
    log('Начинаю читать csv');
    fs.createReadStream(`${appRoot}/data/emo_dict.csv`)
        .pipe(csv({ separator: ';' }))
        .on('data', (data) => results.push(data))
        .on('end', () => {
        results = results.map((word) => {
            word.term = natural.PorterStemmerRu.stem(word.term);
            return word;
        });
        store.setDict(results);
    });
}
