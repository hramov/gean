class State {
    constructor() {
        this.dict = [];
        this.words = [];
        this.artist = {
            id: 0,
            name: '',
            songs: []
        };
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    }
    setWords(words) {
        this.words = words;
    }
    setDict(dict) {
        this.dict = dict;
    }
    setArtist(artist) {
        this.artist = artist;
    }
    getWords() {
        return this.words;
    }
    getDict() {
        return this.dict;
    }
    getArtist() {
        return this.artist;
    }
}
export default new State();
