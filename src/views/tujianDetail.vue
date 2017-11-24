<template>
    <div class="tujianDetailWrap" :style="{'background-image': 'url(' + imgPath + ')' }">
        <img :src="imgPath"/>
        <div class="weui-article">
            <div class="weui-article__h1">{{ pmName }}</div>
            <div class='headPreNum'>浏览量：{{preNum || 0}}</div>
            <div class="weui-article__section">
                <div class="weui-article__title">{{ kxName }} {{ sxName }}</div>
                <div class="weui-article__section lineTop">
                    <div class="weui-article__p" v-html="infos.desc"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let self = null
export default {
  name: 'tujianDetail',
  data(){
    return {
        infos: {},
        kx: '',
        sx: '',
        kxName: '',
        sxName: '',
        commentText: '',
        text: '',
        pmName: '',
        imgPath: '',
        dianzan: false,
        preNum: 0
    }
  },
  created () {
    self = this
    self.loadFun(self.$route.params)
  },
  methods: {
    /**
     * 頁面初始加載的處理事件
     */
    loadFun (options) {
        self.kx = options.kx
        self.sx = options.sx
        self.kxName = options.kxName
        self.sxName = options.sxName
        self.pmName = options.pmName
        self.imgPath = decodeURIComponent(options.imgPath)
        self.path = 'drBang2/cats/' + options.kx + '/list/' + options.sx + '/list/' + options.pm

        self.getTujianInfo().then(res=>{
            self.infos = res
        })
    },
    /**
     * 獲取當前肉肉文章
     */
    getTujianInfo () {
        return new Promise((resolve, reject) => {
            let infos = {}
            self.$wildRef.child(self.path).on('child_added', function(snapshot, prKey) {
            let key = snapshot.key(), text = snapshot.val()
                if (key == 'desc') {
                    text = text.replace(/src="/g, 'src="http://w.bw9.org/')
                }
                infos[key] = text
                let preNum = infos.preNum ? infos.preNum.num : 0
                self.preNum = ++preNum
                let path = self.path + '/preNum', yun = {}
                yun.num = self.preNum
                self.refPreNum = self.$wildRef.child(path)
                // self.refPreNum.set(yun) // 更新瀏覽量
                resolve(infos)
            }, self)
        
        }) 
    }
  }
}
</script>

<style lang="less" scoped>
.tujianDetailWrap{
    color: #ffffff;
    font-size: 13px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    // padding: 0 10px 40px 10px;
    .scroll-wrapper{
        background-repeat: no-repeat;
        background-size: 100% 100%;
    }
    image{
        margin: 4px 0;
    }
    .lineTop{
        border-top: 4rpx solid #6D6D6D;
    }
    .sun,.water{
        display: inline-block;
        width: 18px;
        height: 20px;
    }

    .imgTextWrap{
        display: flex;
        height: 20px;
        line-height: 20px;
        padding: 4px 0;
    }
    .imgTextWrap text{
        padding-right: 16rpx;
    }
    image{
        margin: 0;
    }
    .weui-article__h1 {
        font-size:22px;
        font-weight:400;
        margin-bottom:.5em;
    }
    .weui-article__p{
    padding-top: .5em;
    }

    .bge3{
        background-color: #3C3C3C;
    }
    .weui-article {
        position: relative;
        opacity:0.95;
        background-color:#3c3c3c;
        border-radius:8px 8px 0 0;
        padding: 0 10px;
    }
    .weui-cell {
        padding: 10px 0;
    }
    .msgImg-dianzan{
        width: 26px;
        height: 26px;
        margin: 0 8rpx;
        background-size:100% 100%;
    }
    .upArrow{
    position: absolute;
    display: block;
    background-image: url("http://oopa8ayey.bkt.clouddn.com/upPull.png");
    width: 30px;
    height: 24px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    z-index: 999;
    }
    .weui-panel {
        margin-top: 0;
    }
    .weui-media-box__thumb{
        border-radius: 50%;
    }
    .shuoming{
        font-size: 12px;
        color: #A89E98;
    }
    .foot{
        position: fixed;
        bottom: 0;
    }
    .commentWrap{
        height: 52px;
        width: 100%;
        padding: 10rpx 5rpx;
        background-color: #3c3c3c;
    }
    .commentWrap input, .commentWrap .btn{
        font-size: 12px;
    }
    .commentText{
        /*height: 200px;*/
        padding: 0 10px;
        border-top: 1px solid #eee;
    }
    .com-item{
        display: flex;
        padding: 10px 0;
        border-bottom: 1px solid #ddd;
    }
    .input{
        border-radius: 8rpx;
        border: 1px solid #ddd;
        padding-left: 8rpx;
    }
    .btn{
        height: 1.4rem;
        line-height: 1.4rem;
        padding: 0 10rpx;
        border-radius: 8rpx;
        border: 1px solid #ddd;
        margin: 0 20rpx 0 40rpx;
    }

    input{
        height: 30px;
        line-height: 30px;
    }
    .headPreNum{
    color: #62b900;
    font-size: 12px;
    padding-bottom:  20rpx;
    
    }
}
</style>
