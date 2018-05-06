import Vue from 'vue'
import Router from 'vue-router'
import Resource from 'vue-resource'

Vue.use(Router)

import goods from 'components/goods/goods.vue'
import ratings from 'components/ratings/ratings.vue'
import seller from 'components/seller/seller.vue'


export default new Router({
  // mode: "history",
  routes: [
    {path: '/', redirect: "/goods"},
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller},

  ]
})

// 使用vue-resource进行Ajax请求
Vue.use(Resource)
