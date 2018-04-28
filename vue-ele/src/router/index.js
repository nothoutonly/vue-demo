import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

Vue.use(Router)

import goods from 'components/goods/goods.vue'
import commit from 'components/commit/commit.vue'
import business from 'components/business/business.vue'


export default new Router({
  // mode: "history",
  routes: [
    {path: '/', redirect: "/goods"},
    {path: '/goods', component: goods},
    {path: '/commit', component: commit},
    {path: '/business', component: business},

  ]
})

// 使用vue-resource进行Ajax请求
Vue.use(Resource)
