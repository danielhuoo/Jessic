import Vue from 'vue'
import VueRouter from 'vue-router'
import main from './pages/main'
import login from './pages/login'
Vue.use(VueRouter)
const routes = [
    { path: '/', component: main },
    { path: '/login', component: login }
]

export default new VueRouter({
    routes
})