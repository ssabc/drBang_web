// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import * as wilddog from 'wilddog'
import 'iview/dist/styles/iview.css'
import iView from 'iview'

import {judgeLoginOut} from '@/script/utils'

Vue.config.productionTip = false
Vue.use(iView)

import store from '@/store'
// Vue.component('Button', Button);
// Vue.component('Row', Row);
// Vue.component('Col', Col);

var config = {
  syncURL: "https://drbang.wilddogio.com/" //输入节点 URL
};
wilddog.initializeApp(config);
Vue.prototype.$wildRef = wilddog.sync().ref('/')

router.beforeEach((transition, from, next)=>{
  // 登录路径不执行
	if(transition.path.indexOf('login') == -1){
		// 判断缓存信息是否存在，不存在则直接跳转登录页
		judgeLoginOut(function(){
	    	return next({ path: '/login' });
		})
	}
	next();
})

/* eslint-disable no-new */
new Vue({
	el: '#app',
	store,
  router,
  template: '<App/>',
  components: { App }
})

