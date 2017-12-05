import Vue from 'vue'
import App from './App'

import VueSimpleSVG from '../dist/index.js'
Vue.use(VueSimpleSVG)

// Vue.config.productionTip = false

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
