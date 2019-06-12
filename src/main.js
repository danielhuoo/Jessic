import Vue from 'vue'
import './plugins/element.js'
import './plugins/axios'
import store from './store/'
import router from './router/'
import App from './App.vue'
// import log4Test from './tools/'
Vue.config.productionTip = false
// Vue.use(log4Test);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
