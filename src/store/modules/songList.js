export default {
    namespaced: true,
    state: {
        isReady: false,
        likeSongs: []
    },
    mutations: {
        updateLikeSongs(state, payload) {
            state.likeSongs = payload.likeSongs
        },

        getReady(state) {
            state.isReady = true
        }
    },
    actions: {
        getLikeList({ dispatch, rootState }) {
            console.log('getLikeList')
            axios
                .get(rootState.api.getLikeList, {
                    params: {
                        uid: rootState.userInfo.uid
                    },
                    withCredentials: true
                })
                .then(function (response) {
                    dispatch('getSongsList', { res: response.data })
                })
        },

        getSongsList({ commit, rootState, dispatch }, params) {
            console.log('getSongsList')
            const ids = params.res.ids.sort(function (a, b) {
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
                    commit('updateLikeSongs', {
                        likeSongs: res.songs
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

            let likeSongs = state.likeSongs
            let data = params.data.sort(function (a, b) {
                return a.id - b.id
            })
            // console.log(data)

            let len = data.length
            for (let i = 0; i < len; i++) {
                if (data[i].url) {
                    likeSongs[i].songUrl = "http://m10c" + data[i].url.substring(10)
                } else {
                    likeSongs[i].songUrl = ''
                }
                likeSongs[i].index = i
            }

            commit('updateLikeSongs', {
                likeSongs: likeSongs
            })
            commit('getReady')
        }

    }
}