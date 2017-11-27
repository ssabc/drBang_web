<template>
  <div class="cat-ist-wrap">
    <Carousel autoplay class="carousel">
        <Carousel-item>
            <div class="demo-carousel">1</div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">2</div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">3</div>
        </Carousel-item>
        <Carousel-item>
            <div class="demo-carousel">4</div>
        </Carousel-item>
    </Carousel>
    <Row>
        <Col span="8" class="kind-list">
            <div v-for="(item, index) in cats" class="kind-list__item" :key="item.baseInfo.name">
                <div class="weui-flex kind-list__item-hd" :class="{ 'kind-list__item-hd_show' : now == index }" @click="showShutypes(index)">
                    <div class="weui-flex__item">{{item.baseInfo.name}}</div>
                </div>
            </div>
        </Col>
        <Col span="16" class="shu-wrap">
          <!-- <div class="kind-list__item-bd" :class="{'kind-list__item-bd_show weui-cells_show' : now==index}"> -->
            <Card v-for="t in shuArrys.list" :key="t.baseInfo.name"  style="width:350px">
                <p slot="title" @click="naviToDetail(shuArrys, t)">
                    <Icon type="ios-film-outline"></Icon>
                    {{t.baseInfo.name}}
                </p>
                <ul>
                    <li v-for="item in movieList">
                        <a :href="item.url" target="_blank">{{ item.name }}</a>
                        <span>
                            <Icon type="ios-star" v-for="n in 4"></Icon><Icon type="ios-star" v-if="item.rate >= 9.5"></Icon><Icon type="ios-star-half" v-else></Icon>
                            {{ item.rate }}
                        </span>
                    </li>
                </ul>
            </Card>
          <!-- </div> -->
        </Col>
    </Row>
  </div>
</template>

<script>
let self = null
export default {
  name: 'catList',
  data(){
    return {
      index:　0,
      now: 0, // 当前选择的科系索引
      cats: [], // 多肉种类
      shuArrys:　[],
      limitNum: 5,
      limitFrom: 0,
      movieList: [
          {
              name: '肖申克的救赎',
              url: 'https://movie.douban.com/subject/1292052/',
              rate: 9.6
          }
      ]
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
          self.shuArrys = self.cats[0]
    }, self)
  },
  methods: {
    showShutypes(in_index) {
      self.shuArrys = self.cats[in_index]
      self.index = in_index
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
  background-color: #efefef;
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

  /*走马灯*/
  .carousel{
    margin-bottom: 10px;
    .demo-carousel{
      width: 100%;
      height: 300px;
      background-color: #506b9e;
      color: #ffffff;
    }
  }

  .shu-wrap{
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    .ivu-card{
      margin-bottom: 15px;
    }
  }
}
</style>
