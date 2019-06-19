import { SongListState } from './module-types'
import { MutationTree, ActionTree, Module } from 'vuex';
import { RootState } from '../root-types';

const state: SongListState = {
    isLoading: false,
    currentSongs: [],
    selectedListIndex: 0, // not the unique id
    playListInfo: []
}

const mutations: MutationTree<SongListState> = {
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

        state.playListInfo = list
    },

    updateLoadingStatus(state, payload) {
        state.isLoading = payload.status
    },

    removeState(state) {
        state.isLoading = false
        state.currentSongs = []
        state.selectedListIndex = 0
        state.playListInfo = []
    }
}


const actions: ActionTree<SongListState, RootState> = {
    // Favourite, Rihhana and so on...
    getPlayListInfo({ rootState, commit, dispatch }) {
        console.log('getPlayListInfo')
        rootState.api.request(rootState.api.getPlayListInfo, {
            uid: rootState.loginInfo.uid,
        }).then((response: any) => {
            const res = response.data;
            commit('updatePlayListInfo', {
                playListInfo: res.playlist
            })

            dispatch('getPlayListDetail')
        });
    },

    // details of a specific list, containing id of songs
    getPlayListDetail({ state, rootState, dispatch, commit }) {
        console.log('getPlayListDetail')
        commit('updateLoadingStatus', {
            status: true
        })
        rootState.api.request(rootState.api.getPlayListDetail, {
            id: state.playListInfo[state.selectedListIndex].id
        }).then((response: any) => {
            console.log(response.data)
            dispatch('getSongsList', { res: response.data })
        })
    },

    getSongsList({ commit, rootState }, params) {
        console.log('getSongsList')
        const items = params.res.privileges
        let ids = []
        for (let i = 0, len = items.length; i < len; i++) {
            ids.push(items[i].id)
        }

        rootState.api.request(rootState.api.getSongDetail, {
            ids: ids.toString()
        }).then((response: any) => {
            const res = response.data;

            for (let i = 0, len = res.songs.length; i < len; i++) {
                res.songs[i].index = i
            }

            commit('updateCurrentSongs', {
                currentSongs: res.songs
            })

            commit('updateLoadingStatus', {
                status: false
            })
        })
    }
}
export const songList: Module<SongListState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions
}