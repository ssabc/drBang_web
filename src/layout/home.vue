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

export default {
  name: 'home',
  components: {
      top, bottom
  }
}
</script>
<style lang="less" scoped>

</style>