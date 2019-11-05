<template>
  <div
    class="svg-button"
    :style="{'background-color': buttonBGColor}"
    @click="toggle()"
  >
    <div class="svg-wrapper">
      <simple-svg
        :src="svgSrc"
        :fill="svgFillColor"
        fill-class-name="fill-to-change"
        :stroke="svgFillColor"
        stroke-class-name="stroke-to-change"
        width="100%"
        height="100%"
        custom-id="my-id"
        custom-class-name="my-class"
        @load="svgLoaded()"
      />
    </div>
    <p class="button-label" :style="{'color': labelColor}">
      Click to toggle color
    </p>
  </div>
</template>

<script>
export default {
  name: 'svg-button',
  props: {
    svgSrc: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      isActive: false,
      regularFill: 'oldlace',
      activeFill: 'tomato',
    }
  },
  computed: {
    svgFillColor () {
      return this.isActive ? this.activeFill : this.regularFill
    },
    buttonBGColor () {
      return this.isActive ? this.regularFill : this.activeFill
    },
    labelColor () {
      return this.isActive ? this.activeFill : this.regularFill
    }
  },
  methods: {
    toggle () {
      this.isActive = !this.isActive
    },
    svgLoaded () {
      console.log('Inline SVG is loaded!')
    }
  }
}
</script>

<style scoped>
.svg-button {
  border-radius: 20px;
  width: 400px;
  height: 300px;
  padding: 20px;
  text-align: center;
  user-select: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.svg-wrapper {
  width: 200px;
  height: 200px;
}

p.button-label {
  font-size: 32px;
  margin-top: 40px;
  font-weight: bold;
}
</style>
