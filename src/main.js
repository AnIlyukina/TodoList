import Vue from 'vue'
import App from './App.vue'
import { store } from './store'
import { router } from './router'
import Vuelidate from 'vuelidate'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(VueRouter)

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
