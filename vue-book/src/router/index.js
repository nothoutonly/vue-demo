import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      component: () => import("../components/home.vue"),
      meta: {keepAlive: true, title:"首页"}
    },
    {
      path: "/list",
      component: () => import("../components/list.vue"),
      meta: {keepAlive: true, title:"列表"}
    },
    {
      path: "/collect",
      component: () => import("../components/collect.vue"),
      meta: {title:"收藏"}
    },
    {
      path: "/detail/:bid",
      component: () => import("../components/detail.vue"),
      name: 'detail',
      meta: {title:"详情"}
    },
    {
      path: "/add",
      component: () => import("../components/add.vue"),
      meta: {title:"添加"}
    },
    {
      path: "*", redirect: '/home'
    },
  ]
})
