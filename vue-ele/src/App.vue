<template>
  <div>
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <router-link to="/goods"><span>商品</span></router-link>
      <router-link to="/ratings"><span>评价</span></router-link>
      <router-link to="/seller"><span>商家</span></router-link>
    </div>
    <keep-alive>
      <router-view :seller="seller"/>
    </keep-alive>
  </div>
</template>

<script>
  import header from './components/header/header';

  const ERR_OK = 0;
  export default {
    name: 'App',
    data() {
      return {
        seller: {}
      }
    },
    created() {
      this.$http.get('http://192.168.0.103:30/api/seller').then((res) => {
        let {body: resdata} = res;
        if (resdata.errnum === ERR_OK) {
          this.seller = resdata.data;
        }
      });
    },
    components: {
      'v-header': header,
    },
  }
</script>

<style lang="less">
  @import "./common/css/index.less";

  .tab {
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    .border-1px(rgba(7, 17, 27, .1));
    a {
      flex: 1;
      text-align: center;
      display: block;
      font-size: 14px;
      color: rgb(77, 85, 83);
      &.router-link-active {
        color: rgb(240, 20, 20);
      }
    }
  }

  .cart {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 50;
    width: 100%;
    height: 48px;
  }
</style>
