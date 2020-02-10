import axios from "axios";
// import { Loading } from "element-ui";
axios.defaults.baseURL = "http://192.168.1.154:3000",//"http://huo184745138.xicp.net:3000"; //"http://music.jessic.xyz:3000"  "http://192.168.1.2:3000"
axios.defaults.withCredentials = true;
const DISABLE_CACHE = true;
export const url: any = {
    login: "/login/cellphone",
    getUserDetail: "/user/detail",
    getSongDetail: "/song/detail",
    getSongUrl: "/song/url",
    getPlayListInfo: "/user/playlist",
    getPlayListDetail: "/playlist/detail",
    likeTheSong: "/like"
};

export function request(config: any): any {
    if (DISABLE_CACHE === true) {
        config.params.timestamp = Date.now(); //阻止缓存
    }

    const instance = axios.create();
    // instance.interceptors.request.use(
    //     (configure): any => {
    //         let c: any = configure;
    //         if (c.isShowLoading) {
    //             console.log("true");
    //             let loadingInstance = Loading.service(options);
    //         }
    //         return c;
    //     }
    // );

    // instance.interceptors.response.use(
    //     function(response) {
    //         // Do something with response data
    //         return response;
    //     },
    //     function(error) {
    //         // Do something with response error
    //         return Promise.reject(error);
    //     }
    // );
    return instance.request(config);
}
