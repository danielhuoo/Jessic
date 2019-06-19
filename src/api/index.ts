import axios from 'axios'

export const url: any = {
    login: '/login/cellphone',
    getUserDetail: '/user/detail',
    getSongDetail: '/song/detail',
    getSongUrl: '/song/url',
    getPlayListInfo: '/user/playlist',
    getPlayListDetail: '/playlist/detail'
}

export function request(url: string, params: any): any {
    return axios.get(url, {
        params: params,
        withCredentials: true,
        baseURL: "http://localhost:3000",
        // baseURL: "http://192.168.1.2:3000",
    })
}