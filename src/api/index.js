// const baseURL = "http://localhost:3000"
const baseURL = "http://192.168.1.2:3000"
export default {
    login: baseURL + '/login/cellphone',
    getLikeList: baseURL + '/likelist',
    getSongDetail: baseURL + '/song/detail',
    getSongUrl: baseURL + '/song/url'
}