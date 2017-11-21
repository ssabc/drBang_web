import Vue from 'vue'
import Router from 'vue-router'
import catList from '@/components/catList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'catList',
      component: catList
    }
  ]
})
