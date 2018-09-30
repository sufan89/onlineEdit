<template>
  <div id="app" v-loading.fullscreen="loading">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      loading() {
        return this.$store.state.loading
      }
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
