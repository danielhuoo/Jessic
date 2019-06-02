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
            let i = 0
            let len = list.length
            for (; i < len; i++) {
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
                .then(function (response) {
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
                .then(function (response) {
                    let res = response.data
                    console.log(res)
                    dispatch('getSongsList', { res: response.data })
                })
        },

        getSongsList({ commit, rootState, dispatch }, params) {
            console.log('getSongsList')

            let ids = []
            const items = params.res.privileges
            let i = 0
            let len = items.length
            for (; i < len; i++) {
                ids.push(items[i].id)
            }

            ids = ids.sort(function (a, b) {
                return a - b
            }).toString()

            axios
                .get(rootState.api.getSongDetail, {
                    params: {
                        ids: ids
                    },
                    withCredentials: true
                })
                .then(function (response) {
                    let res = response.data;
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
                .then(function (response) {
                    dispatch('handleSongUrl', response.data)
                })
        },

        handleSongUrl({ state, commit }, params) {
            console.log('handleSongUrl')

            let currentSongs = state.currentSongs
            let data = params.data.sort(function (a, b) {
                return a.id - b.id
            })
            // console.log(data)

            let len = data.length
            for (let i = 0; i < len; i++) {
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