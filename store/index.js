class State {
    constructor() {

        if (State.exists) return State.instance

        this.dict = []
        this.words = []

        State.exists = true
        State.instance = this
    }

    setWords(words) {
        this.words = words
    }
    setDict(dict) {
        this.dict = dict
    }

    getWords() {
        return this.words
    }
    getDict() {
        return this.dict
    }
}

export default new State()