<template>
    <div class="sxDetailWrap">
        <Breadcrumb>
            <Breadcrumb-item href="/">
                <Icon type="ios-home-outline"></Icon> Home
            </Breadcrumb-item>
            <Breadcrumb-item>
                <Icon type="social-buffer-outline"></Icon> {{kxName}}{{sxName}}
            </Breadcrumb-item>
        </Breadcrumb>
        <div v-for="item in sxInfo" :key="item.key" class="item">
            <div @click="naviToTujian(item)">
                <img :src="item.bgImg" class="itemImg"/>
            </div>
            <div class="msgWrapper">
                    {{ item.name }}
                    <div :style=" {display: item.dianzanNum >0 ? 'inline-flex' :'none' }">
                        <img class="msgImg-dianzan" src="http://oopa8ayey.bkt.clouddn.com/dianzan_sel.png"/>
                        <text class="tjText"> {{ item.dianzanNum }} </text>
                    </div>
                    <div :style=" {display: item.dianzanNum >0 ? 'inline-flex' :'none' }">
                        <img mode="aspectFit" class="msgImg" src="http://oopa8ayey.bkt.clouddn.com/msg_sel.png"/>
                        <text  class="tjText">{{ item.comentNum }}</text>
                    </div>
                    <div :style=" {display: item.dianzanNum >0 ? 'inline-flex' :'none' }">
                        <img class="msgImg" src="http://oopa8ayey.bkt.clouddn.com/eye_sel.png"/>
                        <text class="tjText"> {{ item.preNums }} </text>  
                    </div>
            </div>
        </div>
    </div>
</template>

<script>
let self = null
export default {
  name: 'sxDetail',
  data(){
    return {
       sxInfo: {},
        kx: '',
        sx: '',
        kxName: '',
        sxName: '',
        options: {}
    }
  },
  created () {
    self = this
    console.log(self.$store.getters.shuxiInfo)
    self.options = self.$route.params
    self.loadFun(self.options)
    
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
        self.path = `drBang2/cats/${options.kx}/list/${options.sx}/list`
        self.getSxInfo().then(function(res){
            self.sxInfo = res
        })
    },
    /**
     * 獲取當前科屬下的所有肉肉信息列表
     */
    getSxInfo () {
        return new Promise((resolve, reject) => {
            let sxInfo = {}
            self.$wildRef.child(self.path).on('child_added', function(snapshot, prKey) {
                let key = snapshot.key(), item = snapshot.val()
                item['key'] = key
                if (item.coment) {
                    let i = 0;
                    for(let v in item.coment){
                        i++;
                    }
                    item.comentNum = i
                }
                if (item.zans) {
                    let i = 0;
                    for(let v in item.zans){
                        i++;
                    }
                    item.dianzanNum = i
                }
                item.preNums = item.preNum ? item.preNum.num : 0
                sxInfo[key] = item 
                resolve(sxInfo)
            }, self)
        }) 
    },
    naviToTujian(item) {
       let url = `/tujianDetail/${self.kx}/${self.sx}/${self.sxName}/${self.kxName}/${item.key}/${item.name}/${encodeURIComponent(item.bgImg)}`
       self.$router.push(url)
    }
  }
}
</script>

<style lang="less" scoped>
.sxDetailWrap {
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 20px;
    color: #555;
    background-color: rgba(60, 60, 60, 0.7);
    .item{
        width: 50%;
        color: #555;
        font-size: 14px;
        display: inline-flex;
        flex-flow: column;
        text-align: center;
        padding-bottom: 10px;
    }
    .itemImg{
        display: inline-block;
        width: 460px;
        height: 340px;
    }
    .msgImg{
        width: 24px;
        height: 20px;
        margin-left: 4px;
    }
    .msgWrapper{
        color: #eeeeee;
        display: flex;
        line-height: 20px;
        justify-content: center;
    }
    .msgImg-dianzan{
        width: 22px;
        height: 19px;
        margin: 0 4px;
        background-size:100% 100%;
    }
    .tjText{
        color:#62b900;
        font-size: 10px;
    }
    img {
        // width: 100px;
        // height: 100px;
    }
}
</style>
