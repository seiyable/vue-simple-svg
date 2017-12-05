import Vue from 'vue'
import App from './App'

import VueSimpleSVG from '../dist/plugin.js'
Vue.use(VueSimpleSVG)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
