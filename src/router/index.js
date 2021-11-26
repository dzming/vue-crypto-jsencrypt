import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import test2 from '../views/test2.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
  ]
})
