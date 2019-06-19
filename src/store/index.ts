import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { RootState } from './root-types'
import { loginInfo } from './modules/loginInfo'
import { songList } from './modules/songList'
import { player } from './modules/player'
// import color from './modules/color'
import api from '../api'
Vue.use(Vuex)

const store: StoreOptions<RootState> = {
	strict: process.env.NODE_ENV !== 'production',
	state: {
		api: api
	},
	modules: {
		loginInfo,
		songList,
		player
	},
	actions: {
		removeAllStates({ commit }) {
			commit('loginInfo/removeState')
			commit('songList/removeState')
			commit('player/removeState')
		}
	}
}

export default new Vuex.Store<RootState>(store)