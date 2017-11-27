import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: resolve => require(['@/views/login'], resolve)
    },
    {
      path: '',
      name: 'home',
      components: {
        default: resolve => require(['@/layout/home'], resolve)
      },
      children: [{
          path: '/', // 首页
          name: 'catList',
          component: resolve => require(['@/views/catIndex'], resolve)
        },
        {
          path: '/sxDetail/:kx/:sx/:sxName/:kxName',
          name: 'sxDetail',
          component: resolve => require(['@/views/sxDetail'], resolve)
        },
        {
          path: '/tujianDetail/:kx/:sx/:sxName/:kxName/:pm/:pmName/:imgPath',
          name: 'tujianDetail',
          component: resolve => require(['@/views/tujianDetail'], resolve)
        }
      ]
    }
  ]
})
