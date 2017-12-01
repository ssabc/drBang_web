<template>
  <div id="app">
    <router-view />
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

<style lang="less">
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  // background-color: #efefef;
  .ivu-breadcrumb{
    background-color: #3c3c3c;
    line-height: 40px;
    a, span {
      color: #ffffff !important;
    }
    a:hover {
      color: #506b9e!important;
    }
  }
}
</style>
