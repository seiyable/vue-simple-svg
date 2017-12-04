Vue.component('SvgButton', {
  data: function () {
    return {
      isActive: false,
      regularFill: 'white',
      activeFill: '#AD00AD',
      svgFilepath: 'ufo.svg',
      svgWidth: 100 + 'px',
      svgHeight: 100 + 'px',
      buttonLabel: 'UFO'
    }
  },
  computed: {
    getColor: function () {
      if (this.isActive) {
        return this.activeFill
      } else {
        return this.regularFill
      }
    },
    getButtonStyle: function () {
      if (this.isActive) {
        return {
          'background-color': this.regularFill
        }
      } else {
        return {
          'background-color': this.activeFill
        }
      }
    },
    getLabelStyle: function () {
      if (this.isActive) {
        return {
          'color': this.activeFill
        }
      } else {
        return {
          'color': this.regularFill
        }
      }
    }
  },
  methods: {
    toggle: function () {
      this.isActive = !this.isActive
    },
    svgReady: function () {
      console.log('svg is ready!!')
    }
  },
  template:
    '<div @click="toggle()" class="svg-button" :style="getButtonStyle">' +
      '<div class="svg-button-container">' +
        '<simple-svg' +
          ':filepath="svgFilepath"' +
          ':color="getColor"' +
          ':width="svgWidth"' +
          ':height="svgHeight"' +
          '@ready="svgReady()"' +
          '/>' +
        '<p class="button-label" :style="getLabelStyle"> {{ buttonLabel }} </p>' +
      '</div>' +
    '</div>'
})

Vue.use(plugin)

new Vue({
  el: '#app'
})
