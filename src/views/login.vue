<template>
  <div class="login-wrap">
    <Button class="login-btn" type="primary" @click="loginFn">登录</Button>
  </div>
</template>
<script>

export default {
  methods: {
      loginFn(){
          this.$router.push('/')
      }
  }
}
</script>
<style lang="less" scoped>
    .login-wrap{
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgb(151, 223, 185);
        .login-btn{
            margin: 0 auto;
        }
    }
</style>