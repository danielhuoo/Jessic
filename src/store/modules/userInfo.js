export default {
    namespaced: true,
    state: {
        isSucceed: false,
        uid: null,
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.uid = payload.uid
        },

        updateLoginStatus(state, payload) {
            state.isSucceed = payload.isSucceed
        }

    },
    actions: {
        login({ dispatch, commit, rootState }) {
            axios
                .get(rootState.api.login, {
                    params: {
                        phone: 15602298828,
                        password: 82216118
                    },
                    withCredentials: true
                })
                .then(function (response) {
                    const res = response.data;
                    // console.log(res)
                    if (res.code === 200) {
                        commit('updateLoginStatus', { isSucceed: true })
                        commit('updateUserInfo', { uid: res.account.id });
                    }
                    // dispatch('songList/getLikeList', {}, { root: true })
                });
        },

        // refreshLoginState() {
        //     let that = this;
        //     axios
        //         .get(this.baseURL + "/login/refresh")
        //         .then(function(response) {
        //             // handle success
        //             console.log(response.data);
        //         })
        //         .catch(function(error) {
        //             // handle error
        //             console.log(error);
        //         })
        //         .finally(function() {
        //             // always executed
        //         });
        // }
    }
}