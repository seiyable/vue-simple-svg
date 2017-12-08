<!-- =================================================
 Vue Template
================================================== -->
<template>
  <div @click="toggle()" class="svg-button" :style="{'background-color': getButtonBGColor}">
    <div class="svg-button-container">
      <simple-svg
        :filepath="svgFilepath"
        :color="getSVGFillColor"
        :width="svgWidth"
        :height="svgHeight"
        :id="svgId"
        @ready="svgReady()"
        />
      <p class="button-label" :style="{'color': getLabelColor}"> {{ buttonLabel }} </p>
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
      regularFill: 'oldlace',
      activeFill: 'tomato',
      svgFilepath: '/demo/assets/' + 'ufo.svg',
      svgWidth: 200 + 'px',
      svgHeight: 200 + 'px',
      svgId: 'mySVG',
      buttonLabel: 'Click me to toggle'
    }
  },
  computed: {
    getSVGFillColor () {
      return this.isActive ? this.activeFill : this.regularFill
    },
    getButtonBGColor () {
      return this.isActive ? this.regularFill : this.activeFill
    },
    getLabelColor () {
      return this.isActive ? this.activeFill : this.regularFill
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
  border-radius: 20px;
  width: 400px;
  height: 300px;
  padding: 20px;
  text-align: center;
  user-select: none;
  display: table;
}

.svg-button-container {
  height: 100%;
  display: table-cell;
  vertical-align: middle;
}

p.button-label {
  font-size: 32px;
  margin-top: 20px;
  font-weight: bold;
}
</style>
