import { SongListState } from "./module-types";
import { MutationTree, ActionTree, Module } from "vuex";
import { RootState } from "../root-types";
import { request, url } from "../../api/";
const state: SongListState = {
	isLoading: false,
	currentSongs: [],
	selectedListIndex: 0, // not the unique id
	playListInfo: []
};

const mutations: MutationTree<SongListState> = {
	updateCurrentSongs(state, payload) {
		state.currentSongs = payload.currentSongs;
	},

	updateSelectedListIndex(state, payload) {
		state.selectedListIndex = payload.selectedListIndex;
	},

	updatePlayListInfo(state, payload) {
        let list: Array<any> = payload.playListInfo;
        //add index for playlist
		list.forEach((item, index) => (item.index4El = index.toString()));
		state.playListInfo = list;
	},

	updateLoadingStatus(state, payload) {
		state.isLoading = payload.status;
	},

	removeState(state) {
		state.isLoading = false;
		state.currentSongs = [];
		state.selectedListIndex = 0;
		state.playListInfo = [];
	}
};

const actions: ActionTree<SongListState, RootState> = {
	// Favourite, Rihhana and so on...
	getPlayListInfo({ rootState, commit, dispatch }): void {
		console.log("getPlayListInfo");
		const rs: any = rootState;
		request({
			url: url.getPlayListInfo,
			params: {
				uid: rs.loginInfo.uid
			}
		}).then((response: any) => {
			const res = response.data;
			commit("updatePlayListInfo", {
				playListInfo: res.playlist
			});

			dispatch("getPlayListDetail");
		});
	},

	// details of a specific list, containing id of songs
	getPlayListDetail({ state, commit }): void {
		console.log("getPlayListDetail");
		commit("updateLoadingStatus", {
			status: true
		});
		request({
			url: url.getPlayListDetail,
			params: {
				id: state.playListInfo[state.selectedListIndex].id
			}
		}).then((response: any) => {
			let songs: Array<any> = response.data.playlist.tracks;
			// add index for each song
			songs.forEach((song, i) => (song.index = i));

			commit("updateCurrentSongs", {
				currentSongs: songs
			});

			commit("updateLoadingStatus", {
				status: false
			});
		});
	},

	likeTheSong({ state, dispatch }, params): any {
		console.log("likeTheSong");
		return new Promise(resolve => {
			let isLike: boolean;
			if (state.selectedListIndex === 0) {
				isLike = false;
			} else {
				isLike = true;
			}
			request({
				url: url.likeTheSong,
				params: {
					id: params.id,
					like: isLike
				}
				// isShowLoading: true
			}).then((response: any) => {
				const res = response.data;
				console.log(res);
				if (state.selectedListIndex === 0) {
					dispatch("getPlayListDetail");
				}
				resolve();
			});
		});
	}
};
export const songList: Module<SongListState, RootState> = {
	namespaced: true,
	state,
	mutations,
	actions
};
