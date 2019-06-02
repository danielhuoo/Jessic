export default {
    namespaced: true,
    state: {
        playingIndex: null,// index of the list
        playingId: null,
        playingSrc: null,
        playingName: null,
        playingSinger: null,
        playingAlbumPicUrl: null,

        isShowLivePage:false
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

        updateShowLivePage(state, payload){
            state.isShowLivePage = payload
        }
    }
}