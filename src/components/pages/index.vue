<template>
  <div>
    <p>{{count}}</p>
    <el-button @click="increment">sufan</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      increment() {
        this.$store.dispatch('increment').then(() => {
          console.log(1)
        })
      }
    },
    computed: {
      count() {
        return this.$store.state.count
      }
    }
  }
</script>

