const baseURL = "http://localhost:3000"
// const baseURL = "http://192.168.1.2:3000"
export default {
    login: baseURL + '/login/cellphone',
    getUserDetail: baseURL + '/user/detail',
    getLikeList: baseURL + '/likelist',
    getSongDetail: baseURL + '/song/detail',
    getSongUrl: baseURL + '/song/url',
    getPlayListInfo: baseURL + '/user/playlist',
    getPlayListDetail: baseURL + '/playlist/detail',
}