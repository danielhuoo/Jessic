import { PlayerState } from './module-types'
import { Module, MutationTree, ActionTree } from 'vuex';
import { RootState } from '../root-types';
import { request, url } from '../../api'
const initState = () => {
    const state: PlayerState = {
        playingIndex: 0,// index of the list
        playingId: 0,
        playingSrc: '',
        playingName: '',
        playingSinger: '',
        playingAlbumPicUrl: '',
        isGettingUrl: false,
        isShowLivePage: false
    }

    return state
}

const state: PlayerState = initState()

const mutations: MutationTree<PlayerState> = {
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
        state = initState()
    }
}


const actions: ActionTree<PlayerState, RootState> = {
    getSongUrl({ commit }, params) {
        // console.log('getSongUrl')
        commit('updateUrlStatus', {
            status: true
        })
        return new Promise((resolve) => {
            request(url.getSongUrl, {
                id: params.id
            }).then((response: any) => {
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
export const player: Module<PlayerState, RootState> = {
    namespaced: true,
    state,
    mutations,
    actions
}