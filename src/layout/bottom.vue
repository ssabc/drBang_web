<template>
  <div class="bottom-wrap">
      <Row>
          <Col span="8">
            <div>多肉邦</div>
          </Col>
          <Col span="8">
           <div>17715617863</div>
          </Col>
          <Col span="8">
            <div>扫码进入微信小程序</div>
            <img src="../assets/images/drbQR.jpg" class="wxqr-img" />
          </Col>
      </Row>
  </div>
</template>
<script>
export default {
  name: 'bottom'
}
</script>
<style lang="less" scoped>
    .bottom-wrap {
        background-color: #3C3C3C;
        color: #ffffff;
        padding: 10px 0;
        .ivu-col{
            padding: 0 10px;
            text-align: center;
            line-height: 40px;
        }
        .wxqr-img{
            width: 150px;
            height: 150px;
        }
    }
</style>
