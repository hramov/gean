import fs from 'fs'
import appRoot from 'app-root-path'

const LOG_PATH = `${appRoot}/logs/log.txt`

export function checkLogFile() {
    if (!fs.existsSync(LOG_PATH)) {
        fs.openSync(LOG_PATH, 'w')
        log('Файл логов создан')
    }
}

export function log(logText) {
    const log = `${new Date(Date.now()).toLocaleDateString()} ${new Date(Date.now()).toLocaleTimeString()} | ${logText}`
    fs.appendFileSync(LOG_PATH, log + '\n')
    console.log(log)
}