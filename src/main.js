import Vue from 'vue'
import App from './App.vue'
import ElementUi from 'element-ui'
import axios from '@/Api'
import 'element-ui/lib/theme-chalk/index.css'
import router from '@/router'
import MyComponents from '@/utils/MyComponents'
Vue.use(MyComponents)
Vue.prototype.$http = axios
Vue.use(ElementUi)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')