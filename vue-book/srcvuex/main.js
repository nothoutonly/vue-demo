// vuex
// 平级组件交互，找共同的父级解决
// 跨组件交互 -> EventBus混乱，发布订阅

// vuex 主要借鉴了flux、redux，vuex只能在vue中使用

// vuex为了大型项目，主要是状态管理，将数据统一管理

import Vue from 'vue';
import Vuex from 'vuex';
import logger from 'vuex/dist/logger'; //logger是一个日志插件
import app from './app.vue'
Vue.use(Vuex);

const state={count:0};
const mutations={
  add(state, count){ // state是默认放入的，值得就是当前的state
    state.count+=count;
  },
  minus(state, count){
    state.count-=count;
  }
}
const store= new Vuex.Store({
  state,
  mutations,
  plugins:[logger(), ],
  strict:true,// 只能通过mutation(管理员)来更改状态，mutation不支持异步
});

new Vue({
  el: "#app",
  ...app,
  store,
  logger,
});

