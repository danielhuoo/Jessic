export default {
    namespaced: true,
    state: {
        playingIndex: undefined,// index of the list
        playingId: undefined,
        playingSrc: undefined,
        playingName: undefined,
        playingSinger: undefined,
        playingAlbumPicUrl: undefined,

        isShowLivePage: false
    },
    mutations: {
        updatePlayingInfo(state, payload) {
            // console.log(payload)
            state.playingIndex = payload.index
            state.playingSrc = payload.songUrl
            state.playingId = payload.id
            state.playingName = payload.name
            state.playingSinger = payload.ar[0].name
            state.playingAlbumPicUrl = payload.al.picUrl
        },

        updateShowLivePage(state, payload) {
            state.isShowLivePage = payload
        },

        removeState(state) {
            state.playingIndex = undefined
            state.playingId = undefined
            state.playingSrc = undefined
            state.playingName = undefined
            state.playingSinger = undefined
            state.playingAlbumPicUrl = undefined
            state.isShowLivePage = false
        }
    }
}