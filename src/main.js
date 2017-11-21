// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import * as wilddog from 'wilddog'

Vue.config.productionTip = false
Vue.use(Vuex)

var config = {
  syncURL: "https://drzwbang.wilddogio.com/" //输入节点 URL
};
wilddog.initializeApp(config);
Vue.prototype.$wildRef = wilddog.sync().ref('/')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})

