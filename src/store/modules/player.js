export default {
    namespaced: true,
    state: {
        playingIndex: undefined,// index of the list
        playingId: undefined,
        playingSrc: undefined,
        playingName: undefined,
        playingSinger: undefined,
        playingAlbumPicUrl: undefined,

        isGettingUrl: false,
        isShowLivePage: false
    },
    mutations: {
        updatePlayingInfo(state, payload) {
            state.playingIndex = payload.index
            state.playingId = payload.id
            state.playingName = payload.name
            state.playingSinger = payload.ar[0].name
            state.playingAlbumPicUrl = payload.al.picUrl
        },

        updateUrlStatus(state, payload) {
            state.isGettingUrl = payload.status
        },

        updatePlayingSrc(state, payload) {
            state.playingSrc = payload.songUrl
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
    },

    actions: {
        getSongUrl({ rootState, commit }, params) {
            // console.log('getSongUrl')
            commit('updateUrlStatus', {
                status: true
            })
            return new Promise((resolve) => {
                rootState.api.request(rootState.api.getSongUrl, {
                    id: params.id
                }).then(response => {
                    const song = response.data.data[0]
                    let songUrl = ''
                    if (song.url) {
                        songUrl = "http://m10c" + song.url.substring(10)
                    }

                    commit('updatePlayingSrc', {
                        songUrl: songUrl
                    })

                    commit('updateUrlStatus', {
                        status: false
                    })
                    resolve()
                })
            })
        }
    }
}