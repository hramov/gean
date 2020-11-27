export function removeEmptyStrings(data) {
    let content = data.split('\n');
    let newMessage = [];
    for (let line of content) {
        line = line.trim();
        if (line.length > 20)
            newMessage.push(line);
    }
    return newMessage.join('\n');
}
