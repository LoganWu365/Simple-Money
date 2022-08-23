import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import {DatePicker} from 'element-ui'

Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
Vue.config.productionTip = false

Vue.use(DatePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
