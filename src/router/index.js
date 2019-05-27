import Vue from 'vue'
import VueRouter from 'vue-router'
// import likeList from "../components/likeList"
Vue.use(VueRouter)
const routes = [
    { path: '/like', component: likeList }
]

export default new VueRouter({
    routes
})