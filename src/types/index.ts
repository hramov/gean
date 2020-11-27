export type readCSVType = {
    term: string,
    tag: string,
    value: number,
    pstv: number,
    neut: number,
    ngtv: number,
    dunno: number,
    distortion: number
}

export type songType = {
    artist_name: string,
    artist_id: number,
    song_name: string,
    song_id: number,
    song_url: string
    lyrics: string,
    lyricsArray: checkWordType[]
}

export type artistType = {
    id: number,
    name: string,
    songs: number[],
    image_url?: string,
    unique_words?: number,
    words?: string[]
}
export type errorType = {
    error: boolean,
    message: string
}

export type primaryArtistType = {
    id: number,
    name: string
}
export type geniusAPIResultType = {
    id: number,
    title: string,
    url: string,
    primaryArtist: primaryArtistType
}

export type geniusAPIType = {
    result: {
        id: number,
        title: string,
        url: string,
        primary_artist: primaryArtistType
    }
}

export type checkWordType = {
    word: string,
    sentimental: number
}