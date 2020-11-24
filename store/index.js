class State {
    constructor() {

        if (State.exists) return State.instance

        this.dict = []
        this.words = []
        this.artist = {}

        State.exists = true
        State.instance = this
    }

    setWords(words) {
        this.words = words
    }
    setDict(dict) {
        this.dict = dict
    }
    setArtist(data) {
        this.artist = data
    }

    getWords() {
        return this.words
    }
    getDict() {
        return this.dict
    }
    getArtist() {
        return this.artist
    }
}

export default new State()