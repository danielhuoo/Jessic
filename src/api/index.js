import Vue from 'vue'
export default {
    login: '/login/cellphone',
    getUserDetail: '/user/detail',
    getSongDetail: '/song/detail',
    getSongUrl: '/song/url',
    getPlayListInfo: '/user/playlist',
    getPlayListDetail: '/playlist/detail',

    request(url, params) {
        return Vue.axios.get(url, {
            params: params,
            withCredentials: true,
            baseURL: "http://localhost:3000",
            // baseURL: "http://192.168.1.2:3000",
        })
    }

}