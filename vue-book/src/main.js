// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//导入轮播图插件
import VueAwesomeSwiper from "vue-awesome-swiper"
import 'swiper/dist/css/swiper.css'
// 使用轮播图插件
Vue.use(VueAwesomeSwiper)

// 在进入路由之前，每一次都会执行此方法，全局钩子，也有拦截功能
router.beforeEach(function (to, from, next) {
  document.title = to.meta.title;
  if (to.path === "/list") {
    // next({path:"/add"});
    next();
  } else {
    next();
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
})
