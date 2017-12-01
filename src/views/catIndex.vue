<template>
  <div class="cat-ist-wrap">
    <Carousel v-if="isLoadFinish" autoplay class="carousel">
        <Carousel-item v-for="item in banners" :key="item.title">
            <div class="demo-carousel" :style="{'background-image': 'url(' + item.imgPath + ')' }" @click="naviToArticle(item)">
              <div class="banner-title">{{item.title}}</div>
            </div>
        </Carousel-item>
    </Carousel>
    <div v-if="isLoadFinish" >
      <div class="cells-wrap bgBlack"> 
        <div class="cells-title textWhite">文章列表 </div>
        <div class="shu-wrap">
          <Card v-for="t in articles" :key="t.title" style="width:350px">
              <p @click="naviToArticle(t)">
                  <Icon type="ios-book"></Icon>
                  {{t.title}}
              </p>
              <p class="article-desc-wrap" @click="naviToArticle(t)">
                <img class="article-img" :src="t.imgPath" />
                <div class="content-text">
                  <Icon type="thumbsup"></Icon><span>{{t.dianzanNum}}</span>
                  <Icon type="chatbox-working"></Icon><span>{{t.comentNum}}</span>
                  <Icon type="eye"></Icon><span>{{t.preNums}}</span>
                  <span>发表时间:{{t.time}}</span>
                </div>
              </p>
          </Card>
        </div>
      </div>
      <div class="cells-wrap"> 
        <div class="cells-title">科属分类 </div>
        <Row>
            <Col span="8" class="kind-list">
                <div v-for="(item, index) in cats" class="kind-list__item" :key="item.baseInfo.name">
                    <div class="weui-flex kind-list__item-hd" :class="{ 'kind-list__item-hd_show' : now == index }" @click="showShutypes(index)">
                        <div class="weui-flex__item">{{item.baseInfo.name}}</div>
                    </div>
                </div>
            </Col>
            <Col span="16">
              <div class="shu-title">{{cats[index].baseInfo.name}}</div>
              <div class="shu-wrap">
                <Card v-for="t in cats[index].list" :key="t.baseInfo.name"  style="width:350px">
                    <p slot="title" @click="naviToDetail(cats[index], t)">
                        <Icon type="briefcase"></Icon>
                        {{t.baseInfo.name}}
                    </p>
                    <p class="desc-pm-wrap">
                      <a v-for="name in t.list">{{ name.name }}</a>
                    </p>
                </Card>
              </div>
            </Col>
        </Row>
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
      isLoadFinish: false,
      index:　0,
      now: 0, // 当前选择的科系索引
      cats: [], // 多肉种类
      shuArrys:　[],
      articles:[], // 文章数组
      banners:[] // 走马灯
    }
  },
  created(){
    self = this
  },
  mounted() {
    self.getCats().then((cats)=>{
      self.shuArrys = cats[0]
      // console.log(self.shuArrys)
      self.getBanners().then((banners)=>{
        self.banners = banners
        // console.log(self.banners)
        self.getArticles().then((articles)=>{
          self.articles = articles
          // console.log(self.articles)
          self.isLoadFinish = true
        })
      })
    })
  },
  methods: {
    /**
     * 获取科属数据
     */
    getCats() {
      return new Promise((resolve, reject)=>{
        self.$wildRef.child('drBang2/catsBrief').on('child_added', function(snapshot, prKey) {
          let key = snapshot.key()
          let item = snapshot.val()
          if (key != 'kxEnd') {
              item['key'] = key
              self.cats.push(item)
          }
          resolve(self.cats)
        }, self)
      })
    },
    /**
     * 获取走马灯数据
     */
    getBanners() {
      return new Promise((resolve, reject)=>{
        let banners = []
        self.$wildRef.child('drBang2/banner').on('child_added', function(snapshot, prKey) {
            let key = snapshot.key(), item = snapshot.val()
            item.key = key
            banners.push(item)
            resolve(banners)
        }, self)
      })
    },
    /**
     * 获取文章列表数据
     */
    getArticles() {
      return new Promise((resolve, reject)=>{
        let articles = []
        self.$wildRef.child('drBang2/msgs').on('child_added', function(snapshot, prKey) {
          let key = snapshot.key(), item = snapshot.val()
          if (key.indexOf('msg') != -1) {
            item.key = key
            articles.push(item)
          }
          for ( let item of articles) {
            let comentNum = 0, dianzanNum = 0
            item.preNums = item.preNum ? item.preNum.num : 0
            for( let v in  item.coment) {
              comentNum++;
            }
            item.comentNum = comentNum

            for( let v in  item.zans) {
              dianzanNum++;
            }
            item.dianzanNum = dianzanNum
          }
          resolve(articles)
        }, self)
      })
    },
    /**
     * 展开科属列表
     * @in_index 科系索引
     */
    showShutypes(in_index) {
      self.shuArrys = self.cats[in_index]
      self.index = in_index
      self.now = self.now == in_index ? -1 : in_index
    },
    /**
     * 跳转到属系列表页
     */
    naviToDetail(item, t){
      let url = "/sxDetail/" + item.key + '/'+ t.baseInfo.sx + '/' + t.baseInfo.name + '/' + item.baseInfo.name
      self.$router.push(url)
    },
    /**
     * 跳转到文章页面
     */
    naviToArticle(t) {
       self.$router.push({name: 'articleDetail', params: t})
    }
  }
}
</script>

<style lang="less" scoped>
.cat-ist-wrap{
  padding: 10rpx;
  width: 1156px;
  margin: 0 auto;
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
      position: relative;
      width: 100%;
      height: 300px;
      background-color: #506b9e;
      background-size: 100% 100%;
      color: #ffffff;
      .banner-title {
        width: 100%;
        background-color: #3c3c3c;
        opacity: 0.5;
        line-height: 40px;
        text-align: center;
        position: absolute;
        bottom: 20px;
      }
    }
  }
  .shu-title{
    padding: 0 15px;
    line-height: 40px;
  }
  .shu-wrap{
    padding: 0 15px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .ivu-card{
      margin: 0 10px 10px 0;
    }
  }
  .desc-pm-wrap{
    display: flex;
    flex-wrap: wrap;
    a {
      margin-right: 4px;
    }
  }
  .article-desc-wrap {
     display: flex;
     flex-direction: column;
    .article-img{
      width: 300px;
      height: 200px;
    }
    .content-text{
      line-height: 32px;
    }
  }
  
  .cells-wrap{
    padding: 0 15px;
    .cells-title{
      line-height: 40px;
    }
  } 
  .bgBlack {
    background-color: #3c3c3c;
  }
  .textWhite{
    color: #ffffff;
  }
  
}
</style>
