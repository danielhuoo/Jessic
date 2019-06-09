import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import songList from './modules/songList'
import player from './modules/player'
import sidebar from './modules/sidebar'
import color from './modules/color'
import api from '../api'
Vue.use(Vuex)

export default new Vuex.Store({
	strict: process.env.NODE_ENV !== 'production',
	modules: {
		userInfo,
		songList,
		player,
		sidebar,
		color
	},
	state: {
		api: api
	}
})