<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view  ref="app"/>
  </div>
</template>

<script>
let self = null
export default {
  name: 'app',
  data(){
    return {
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  background-color: #3C3C3C;
  /* color: #ffffff; */
  /* margin-top: 60px; */
}
</style>
