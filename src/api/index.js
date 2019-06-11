import axios from '../plugins/axios'
export default {
    login: '/login/cellphone',
    getUserDetail: '/user/detail',
    getLikeList: '/likelist',
    getSongDetail: '/song/detail',
    getSongUrl: '/song/url',
    getPlayListInfo: '/user/playlist',
    getPlayListDetail: '/playlist/detail',

    request(url, params) {
        return axios.get(url, {
            params: params,
            withCredentials: true,
            baseURL: "http://localhost:3000",
            // baseURL: "http://192.168.1.2:3000",
        })
    }

}