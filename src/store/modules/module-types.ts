export interface LoginInfoState {
    uid: number,//user id
    username: string,
    nickname: string,
    avatarUrl: string,
    loading: boolean
}

export interface SongListState {
    isLoading: boolean,
    currentSongs: Array<any>,
    selectedListIndex: number, // not the unique id
    playListInfo: Array<any>
}

export interface PlayerState {
    playingIndex: number,// index of the list
    playingId: number,
    playingSrc: string,
    playingName: string,
    playingSinger: string,
    playingAlbumPicUrl: string,
    isGettingUrl: boolean,
    isShowLivePage: boolean
}