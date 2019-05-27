export default {
    namespaced: true,
    state: {
        username: null,
        password: null,
        isSucceed: false,
        uid: null,
    },
    mutations: {
        updateUserInfo(state, payload) {
            state.uid = payload.uid
        },

        updateLoginStatus(state, payload) {
            state.isSucceed = payload.isSucceed
        },

        updateUserNameNPwd(state, payload) {
            state.username = payload.username
            state.password = payload.password
        }

    },
    actions: {
        login({ commit, rootState, state }) {
            axios
                .get(rootState.api.login, {
                    params: {
<<<<<<< HEAD
                        phone: state.username,
                        password: state.password
=======
                        phone: '',
                        password: ''
>>>>>>> d91af78d3f2ddc4adb3af14a9ca6c7975314031a
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