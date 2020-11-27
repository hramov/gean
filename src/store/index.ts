import { artistType, readCSVType } from './../types'

class State {
    private static instance: State;

    dict: readCSVType[] = []
    words: string[] = []
    artist: artistType = {
        id: 0,
        name: '',
        songs: []
    }

    public constructor() {
        if (!State.instance) {
            State.instance = new State();
        }
        return State.instance;
    }

    public setWords(words: string[]) {
        this.words = words
    }

    public setDict(dict: readCSVType[]) {
        this.dict = dict
    }
    
    public setArtist(artist: artistType) {
        this.artist = artist
    }

    public getWords(): string[] {
        return this.words
    }

    public getDict() {
        return this.dict
    }
    
    public getArtist() {
        return this.artist
    }
}

export default new State()