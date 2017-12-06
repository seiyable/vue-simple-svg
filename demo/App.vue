<template>
  <div id="app">
    <SvgButton />
  </div>
</template>

<script>
import SvgButton from './components/SvgButton'
require('reset.css')

export default {
  name: 'app',
  components: {
    SvgButton
  }
}
</script>

<style>
html, body, #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  background-color: seagreen;
  height: 100%;
}
</style>
