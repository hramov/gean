export function removeEmptyStrings(data: string): string {
    let content: string[] = data.split('\n')
    let newMessage: string[] = []

    for (let line of content) {
        line = line.trim()
        if (line.length > 20) newMessage.push(line)
    }
    return newMessage.join('\n')
}