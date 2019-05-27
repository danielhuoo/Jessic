import Vue from 'vue'
import './plugins/axios'
import './plugins/element.js'
import store from './store/'
import router from './router/'
import App from './App.vue'
Vue.config.productionTip = false


new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
