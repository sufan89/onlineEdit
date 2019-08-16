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
    position: absolute;
    width:100%;
    height:100%;
    float: left;
    z-index: 1;
  }

  body {
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 0px;
    margin-bottom: 0px;
    height: 100%;
  }
</style>
