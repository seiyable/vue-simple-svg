import Vue from 'vue'
import App from './App'

import VueSimpleSVG from '../dist/plugin.js'
Vue.use(VueSimpleSVG)

let vss = require('../dist/plugin.js')
console.log('plugin is installed?', vss)

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
})
