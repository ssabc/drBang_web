import Vue from 'vue'
import Router from 'vue-router'
import catList from '@/views/catIndex'
import sxDetail from '@/views/sxDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'catList',
      component: catList
    },
    {
      path: '/sxDetail/:kx/:sx/:sxName/:kxName',
      name: 'sxDetail',
      component: sxDetail
    }
  ]
})
