<template>
    <div class="footer">
      <router-link to="/home">
        <i class="iconfont icon-daohangshouye"></i>
        <span>首页</span>
      </router-link>
      <router-link to="/list">
        <i class="iconfont icon-category"></i>
        <span>列表</span>
      </router-link>
      <router-link to="/collect">
        <i class="iconfont icon-favorite"></i>
        <span>收藏</span>
      </router-link>
      <router-link to="/add">
        <i class="iconfont icon-add"></i>
        <span>添加</span>
      </router-link>
    </div>
</template>

<script>
    export default {
        name: "tab",
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {}
    }
</script>

<style scoped lang="less">
  .footer{
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    border-top: 1px solid #ccc;
    a{
      display: flex;
      color: #bbb;
      flex-direction: column;
      flex:1;
      justify-content: center;
      align-items: center;
      &.router-link-active{
        color: #2e6da4;
      }
    }
  }
</style>
