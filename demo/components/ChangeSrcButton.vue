<template>
  <div
    class="change-src-button"
    @click="$emit('click')"
  >
    Click to change SVG src
  </div>
</template>

<style scoped>
.change-src-button {
  text-align: center;
  line-height: 40px;
  width: 200px;
  font-weight: bold;
  color: lightcyan;
  user-select: none;
  text-decoration: underline;
}

.change-src-button:active {
  filter: brightness(0.7);
}
</style>
