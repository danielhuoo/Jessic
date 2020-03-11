import { PlayerState } from "./module-types";
import { Module, MutationTree, ActionTree } from "vuex";
import { RootState } from "../root-types";
const initState = () => {
	const state: PlayerState = {
		playingIndex: 0, // index of the list
		playingId: 0,
		playingSrc: "",
		playingName: "",
		playingSinger: "",
		playingAlbumPicUrl: "",
		isGettingUrl: false,
		isShowLivePage: false
	};

	return state;
};

const state: PlayerState = initState();

const mutations: MutationTree<PlayerState> = {
	updatePlayingInfo(state, payload) {
		state.playingIndex = payload.index;
		state.playingId = payload.id;
		state.playingName = payload.name;
		state.playingSinger = payload.ar[0].name;
		state.playingAlbumPicUrl = payload.al.picUrl;
		state.playingSrc = `https://music.163.com/song/media/outer/url?id=${payload.id}.mp3`;
	},

	// updatePlayingSrc(state, payload) {
	// 	state.playingSrc = payload.songUrl;
	// },

	removeState(state) {
		state = initState();
	}
};

const actions: ActionTree<PlayerState, RootState> = {};
export const player: Module<PlayerState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions
};
