import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './pages/main.vue'
import login from './pages/login.vue'
Vue.use(VueRouter)
const routes = [
    { path: '/', component: main },
    { path: '/login', component: login }
]

export default new VueRouter({
    mode: 'history',// remove '#' inside the url
    routes
})