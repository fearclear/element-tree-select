import Vue from 'vue'
import App from './App.vue'
import { Select, Popover, Tree, Option } from 'element-ui'

Vue.config.productionTip = false

Vue.use(Select)
Vue.use(Popover)
Vue.use(Tree)
Vue.use(Option)

new Vue({
  render: h => h(App)
}).$mount('#app')
