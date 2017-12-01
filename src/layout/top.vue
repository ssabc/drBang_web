<template>
  <div class="top-wrap">
      <Row class="info-wrap">
        <Col span="12">
            <span>多肉邦</span>
            <div class="wx-img-div">
                <img src="../assets/images/wx.png" class="wx-img" @mouseover="imgMouseFn" @mouseout="imgMouseFn"/>
                <div v-if="isShowQR" class="wxQR-wrap">
                    <img src="../assets/images/drbQR.jpg" class="wxqr-img" />
                    <div class="img-text">微信小程序</div>
                </div>
            </div>
        </Col>
        <Col span="12" class="info-wrap__rt">
            <span>欢迎您, {{userName}}</span>
            <a @click="loginOut">退出</a>
            <span>关于我们</span>
        </Col>
      </Row>
      <div class="head-wrap">

      </div>
  </div>
</template>
<script>
import {Cookie} from '@/script/utils'

export default {
  name: 'top',
  data() {
    return {
        userName: '珊qqabc',
        isShowQR: false
    }
  },
  methods: {
      /**
       * 微信图标鼠标移动事件
       */
      imgMouseFn(){
        this.isShowQR = !this.isShowQR
      },
      /**
       * 登出
       */
      loginOut(){
          Cookie.delete('userName')
          this.$router.push('/login')
      }
  },
  created(){
    this.userName = Cookie.get("userName")
  },
}
</script>
<style lang="less" scoped>
    .top-wrap {
        background-color: #3C3C3C;
        .info-wrap{
            padding: 5px 0;
            color: #ffffff;
            line-height: 30px;
            & > div {
                display: flex;
                align-items: center;
            }
            .info-wrap__rt {
                justify-content: flex-end;
                padding-right: 15px;
            }
            span, a{
                margin-left: 8px;
            }
            .wx-img-div, .wx-img{
                position: relative;
                display: inline-block;
                width: 26px;
                height: 26px;
                margin-left: 4px;
            }
            .wxQR-wrap {
                position: absolute;
                padding: 0 5px 5px 5px;
                top:34px;
                background-color: #ffffff;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                border-radius: 5px;
                border: 1px solid #efefef;
                .wxqr-img {
                    width: 100px;
                    height: 100px;
                }
                .img-text{
                    color: #3C3C3C;
                    text-align: center;
                }
            }
        }
        .head-wrap{

        }
    }
</style>