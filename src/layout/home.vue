<template>
  <div class="home-wrap">
    <top />
    <div class="content-wrap">
      <router-view />
    </div>
    <bottom />
  </div>
</template>
<script>
import top from '@/layout/top'
import bottom from '@/layout/bottom'
import {judgeLoginOut} from '@/script/utils'

export default {
  name: 'home',
  components: {
      top, bottom
  },
  created(){
    judgeLoginOut()
  }
}
</script>
<style lang="less" scoped>
  .content-wrap {
    width: 1156px;
    margin: 0 auto;
  }
</style>