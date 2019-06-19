import { Module } from 'vuex'
import { ActionTree, MutationTree } from 'vuex'
import { LoginInfoState } from './module-types'
import { RootState } from '../root-types'
import { request, url } from '../../api/'
const state: LoginInfoState = {
    uid: 0,//user id
    username: '',
    nickname: '',
    avatarUrl: '',
    loading: false
}

const actions: ActionTree<LoginInfoState, RootState> = {
    login({ dispatch }, params: any) {
        console.log('1 login')
        return new Promise((resolve) => {
            request(url.login,
                {
                    phone: params.username,
                    password: params.password
                },
            ).then((response: any) => {
                console.log('2 login api then')
                const res = response.data;
                // console.log(res)
                if (res.code === 200) {
                    dispatch('getUserDetail', { uid: res.account.id }).then(() => {
                        console.log('5 login api resolve')
                        resolve()
                    })
                }
            });
        })

    },

    getUserDetail({ commit }, params) {
        console.log('3 getUserDetail')
        return new Promise((resolve) => {
            request(url.getUserDetail, {
                uid: params.uid
            }).then((response: any) => {
                console.log('4 getUserDetail api then')
                const res = response.data;
                // console.log(res)
                res.uid = params.uid
                commit('updateUserInfo', { userInfo: res });
                resolve()
            });
        })
    }
}

const mutations: MutationTree<LoginInfoState> = {
    updateUserInfo(state: LoginInfoState, payload: any) {
        state.uid = payload.userInfo.uid
        state.nickname = payload.userInfo.profile.nickname
        state.avatarUrl = payload.userInfo.profile.avatarUrl
    },

    updateLoadingInstance(state: LoginInfoState, payload: any) {
        state.loading = payload
    },

    removeState(state: LoginInfoState) {
        state.uid = 0
        state.username = ''
        state.nickname = ''
        state.avatarUrl = ''
    },
}


export const loginInfo: Module<LoginInfoState, RootState> = {
    namespaced: true,
    state,
    actions,
    mutations
}