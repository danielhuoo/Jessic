export default {
    namespaced: true,
    state: {
        uid: 0,//user id
        username: undefined,
        nickname: undefined,
        avatarUrl: undefined,

        loading: null
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.uid = payload.userInfo.uid
            state.nickname = payload.userInfo.profile.nickname
            state.avatarUrl = payload.userInfo.profile.avatarUrl
        },

        removeState(state) {
            state.uid = 0
            state.username = undefined
            state.nickname = undefined
            state.avatarUrl = undefined
            state.isSucceed = false
        },

        updateLoadingInstance(state, payload) {
            state.loading = payload
        }
    },
    actions: {

        login({ rootState, dispatch }, params) {
            // console.log('1 login')
            return new Promise((resolve) => {
                rootState.api.request(rootState.api.login,
                    {
                        phone: params.username,
                        password: params.password
                    },
                ).then(response => {
                    console.log('2 login api then')
                    const res = response.data;
                    // console.log(res)
                    if (res.code === 200) {
                        dispatch('getUserDetail', { uid: res.account.id }).then(() => {
                            // console.log('5 login api resolve')
                            resolve()
                        })
                    }
                });
            })

        },

        getUserDetail({ commit, rootState }, params) {
            // console.log('3 getUserDetail')
            return new Promise((resolve) => {
                rootState.api.request(rootState.api.getUserDetail, {
                    uid: params.uid
                }).then(response => {
                    // console.log('4 getUserDetail api then')
                    const res = response.data;
                    // console.log(res)
                    res.uid = params.uid
                    commit('updateUserInfo', { userInfo: res });
                    resolve()
                });
            })
        }
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