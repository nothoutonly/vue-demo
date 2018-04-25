<template>
  <div id="app">
    <!--需要缓存的-->
    <transition name="fade">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"/>
      </keep-alive>
    </transition>
    <!--正常的访问-->
    <transition name="fade">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
    <tab></tab>
  </div>
</template>

<script>
import tab from "./base/tab.vue"
export default {
  name: 'App',
  components:{
    tab,
  }
}
</script>

<style>
  *{margin: 0;padding:0;}
  ul, li{list-style:none;}
  a {text-decoration:none;}
  input,button{-webkit-webkit-appearance: none;}
  .content{
    position: fixed;
    width: 100%;
    top: 40px;
    bottom: 50px;
    overflow-y: auto;
  }
  .fade-enter{
    opacity: 0;
  }
  /*.fade-enter-to {*/
    /*opacity: 1;*/
  /*}*/
  /*.fade-leave-to {*/
    /*opacity: 0;*/
  /*}*/

  .fade-enter-active{
    transition: all .3s linear;
    opacity: 1;
  }
  .fade-leave-active {
    transition: all .3s linear;
    opacity: 0;
  }


</style>
