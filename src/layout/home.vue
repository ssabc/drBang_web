<template>
  <div class="home-wrap">
    <top />
    <router-view />
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

</style>