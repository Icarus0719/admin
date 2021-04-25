<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    console.log(this.$router)
  },
}
</script>
<style lang='less'>
#app {
  height: 100%;
  min-width: 1366px;
}
</style>
