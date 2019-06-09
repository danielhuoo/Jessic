export default {
    namespaced: true,
    state: {
        isReady: false,
        currentSongs: [],

        selectedListIndex: 0, // not the unique id
        playListInfo: []
    },
    mutations: {
        updateCurrentSongs(state, payload) {
            state.currentSongs = payload.currentSongs
        },

        updateSelectedListIndex(state, payload) {
            state.selectedListIndex = payload.selectedListIndex
        },

        updatePlayListInfo(state, payload) {
            let list = payload.playListInfo
            for (let i = 0, len = list.length; i < len; i++) {
                list[i].index4El = i.toString()
            }

            // console.log(list)
            state.playListInfo = list
        },

        notReady(state) {
            state.isReady = false
        },

        getReady(state) {
            state.isReady = true
        }
    },
    actions: {
        getPlayListInfo({ rootState, commit }) {
            console.log('getPlayListInfo')
            axios
                .get(rootState.api.getPlayListInfo, {
                    params: {
                        uid: rootState.userInfo.uid,
                    },
                    withCredentials: true
                })
                .then(response => {
                    const res = response.data;
                    // console.log(res)

                    commit('updatePlayListInfo', {
                        playListInfo: res.playlist
                    })
                });
        },

        getPlayListDetail({ state, commit, rootState, dispatch }) {
            commit('notReady')
            console.log('getPlayListDetail')
            const id = state.playListInfo[state.selectedListIndex].id
            axios
                .get(rootState.api.getPlayListDetail, {
                    params: {
                        id: id
                    },
                    withCredentials: true
                })
                .then(response => {
                    const res = response.data
                    console.log(res)
                    dispatch('getSongsList', { res: response.data })
                })
        },

        getSongsList({ commit, rootState, dispatch }, params) {
            console.log('getSongsList')
            const items = params.res.privileges
            let ids = []
            for (let i = 0, len = items.length; i < len; i++) {
                ids.push(items[i].id)
            }

            ids = ids.sort((a, b) => a - b).toString()

            axios
                .get(rootState.api.getSongDetail, {
                    params: {
                        ids: ids
                    },
                    withCredentials: true
                })
                .then(response => {
                    const res = response.data;
                    commit('updateCurrentSongs', {
                        currentSongs: res.songs
                    })

                    dispatch('getSongUrl', { res: ids })
                })
        },

        getSongUrl({ rootState, dispatch }, params) {
            console.log('getSongUrl')
            axios
                .get(rootState.api.getSongUrl, {
                    params: {
                        id: params.res
                    },
                    withCredentials: true
                })
                .then(response => {
                    dispatch('handleSongUrl', response.data)
                })
        },

        handleSongUrl({ state, commit }, params) {
            console.log('handleSongUrl')

            let currentSongs = state.currentSongs
            let data = params.data.sort((a, b) => a.id - b.id)
            // console.log(data)

            for (let i = 0, len = data.length; i < len; i++) {
                if (data[i].url) {
                    currentSongs[i].songUrl = "http://m10c" + data[i].url.substring(10)
                } else {
                    currentSongs[i].songUrl = ''
                }
                currentSongs[i].index = i
            }

            commit('updateCurrentSongs', {
                currentSongs: currentSongs
            })
            commit('getReady')
        }
    }
}