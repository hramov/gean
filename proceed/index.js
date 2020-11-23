import { log } from './utils'
export function removeEmptyStrings(message) {
    let content = message.split('\n')

    let newMessage = []
    for (let line of content) {
        line = line.trim()
        if (line.length > 20) newMessage.push(line)
    }
    message = newMessage.join('\n')
    return message
}