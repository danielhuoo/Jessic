
export default {
    namespaced: true,
    state: {
        isSucceed: false,

        uid: 0,
        username: '',
        nickname: '',
        avatarUrl: '',

        loading: null
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.uid = payload.userInfo.uid
            state.nickname = payload.userInfo.profile.nickname
            state.avatarUrl = payload.userInfo.profile.avatarUrl
        },

        updateLoginStatus(state, payload) {
            state.isSucceed = payload.isSucceed
        },

        removeLoginInfo(state) {
            state.uid = 0
            state.username = ''
            state.nickname = ''
            state.avatarUrl = ''
            state.isSucceed = false
        },

        updateLoadingInstance(state, payload) {
            state.loading = payload
        }
    },
    actions: {

        login({ rootState, dispatch }, params) {
            axios
                .get(rootState.api.login, {
                    params: {
                        phone: params.username,
                        password: params.password
                    },
                    withCredentials: true
                })
                .then(function (response) {
                    const res = response.data;
                    // console.log(res)
                    if (res.code === 200) {
                        dispatch('getUserDetail', { uid: res.account.id })
                    }

                });
        },

        getUserDetail({ commit, rootState }, params) {
            axios
                .get(rootState.api.getUserDetail, {
                    params: {
                        uid: params.uid
                    },
                    withCredentials: true
                })
                .then(function (response) {
                    const res = response.data;
                    // console.log(res)
                    res.uid = params.uid
                    commit('updateUserInfo', { userInfo: res });
                    commit('updateLoginStatus', { isSucceed: true })
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