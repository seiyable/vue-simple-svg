<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div @click="toggle()" class="svg-button" :style="getButtonStyle">
    <div class="svg-button-container">
      <simple-svg
        :filepath="svgFilepath"
        :color="getColor"
        :width="svgWidth"
        :height="svgHeight"
        @ready="svgReady()"
        />
      <p class="button-label" :style="getLabelStyle"> {{ buttonLabel }} </p>
    </div>
  </div>
</template>

<!-- =================================================
 Vue Script
================================================== -->
<script>
export default {
  name: 'svg-button',
  data () {
    return {
      isActive: false,
      regularFill: 'white',
      activeFill: '#AD00AD',
      svgFilepath: '/demo/assets/' + 'ufo.svg',
      svgWidth: 100 + 'px',
      svgHeight: 100 + 'px',
      buttonLabel: 'UFO'
    }
  },
  computed: {
    getColor () {
      if (this.isActive) {
        return this.activeFill
      } else {
        return this.regularFill
      }
    },
    getButtonStyle () {
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
    getLabelStyle () {
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
    toggle () {
      this.isActive = !this.isActive
    },
    svgReady () {
      console.log('svg is ready!!')
    }
  }
}
</script>

<!-- =================================================
 Vue Style
================================================== -->
<style scoped>
.svg-button {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  border-radius: 8px;
  width: 400px;
  height: 300px;
  padding: 20px;
  text-align: center;
  user-select: none;
}

p.button-label {
  font-size: 32px;
}
</style>
