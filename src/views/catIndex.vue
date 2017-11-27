<template>
  <div class="cat-ist-wrap">
    <div class="page__bd page__bd_spacing">
        <div class="kind-list">
            <div v-for="(item,index) in cats" class="kind-list__item" :key="item.baseInfo.name">
                <div class="weui-flex kind-list__item-hd" :class="{ 'kind-list__item-hd_show' : now==index }" @click="showShutypes(index)">
                    <!-- <div class="weui-flex__item">{{item.baseInfo.name}}</div> -->
                </div>
                <div class="kind-list__item-bd" :class="{'kind-list__item-bd_show' : now==index}">
                    <div class="weui-cells" :class="{'weui-cells_show' : now==index }">
                        <div v-for="t in item.list" :key="t.baseInfo.name" @click="naviToDetail(item, t)">
                            <div class="weui-cell__bd">{{t.baseInfo.name}}</div>
                            <div class="weui-cell__ft weui-cell__ft_in-access"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
let self = null
export default {
  name: 'catList',
  data(){
    return {
      now: -1, // 当前选择的科系索引
      cats: [] // 多肉种类
    }
  },
  created(){
    self = this
  },
  mounted(){
    self.$wildRef.child('drBang2/catsBrief').on('child_added', function(snapshot, prKey) {
          let key = snapshot.key()
          let item = snapshot.val()
          if (key == 'kxEnd') {
            //  console.log(self.cats)
          } else {
              item['key'] = key
              self.cats.push(item)
          }
    }, self)
  },
  methods: {
    showShutypes(in_index) {
      self.now = self.now == in_index ? -1 : in_index
    },
    naviToDetail(item, t){
      let url = "/sxDetail/" + item.key + '/'+ t.baseInfo.sx + '/' + t.baseInfo.name + '/' + item.baseInfo.name
      self.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.cat-ist-wrap{
  padding: 10rpx;
  color: #555;
  .item{
      border: 1px solid #234233;
      background-color: #62b900;
      background-size: 100% 100%;
      height: 120px;
      color: #fff;
      font-size: 20px;
  }
  /* pages/common/kxDetail/index.wxss */

  .weui-flex {
    -webkit-box-align: center;
    -webkit-align-items: center;
            align-items: center;
  }
  .weui-cells {
    margin-top: 0;
    opacity: 0;
    -webkit-transform: translateY(-50%);
            transform: translateY(-50%);
    -webkit-transition: .3s;
    transition: .3s;
  }
  .weui-cells:before,
  .weui-cells:after {
    display: none;
  }
  .weui-cells_show {
    opacity: 1;
    -webkit-transform: translateY(0);
            transform: translateY(0);
  }
  .weui-cell:before {
    right: 15px;
  }
  .kind-list__item {
    margin: 10px 0;
    background-color: #FFFFFF;
    border-radius: 2px;
    overflow: hidden;
  }
  .kind-list__item:first-child {
    margin-top: 0;
  }
  .kind-list__img {
    width: 30px;
    height: 30px;
  }
  .kind-list__item-hd {
    padding: 20px;
    -webkit-transition: opacity .3s;
    transition: opacity .3s;
  }
  .kind-list__item-hd_show {
    opacity: .4;
  }
  .kind-list__item-bd {
    height: 0;
    overflow: hidden;
  }
  .kind-list__item-bd_show {
    height: auto;
  }
}
</style>
