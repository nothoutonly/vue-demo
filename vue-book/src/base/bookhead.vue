<template>
    <div class="header">
      <slot></slot>
      <i class="iconfont icon-back" v-if="back" @click="goback"></i>
    </div>
</template>

<script>
    export default {
        name: "bookhead",
        props:{
          back:{
            type: Boolean,
            default: false,
          }
        },
        data() {
            return {}
        },
        methods: {
          goback(){
            this.$router.go(-1);
          }
        },
        computed: {},
        components: {}
    }
</script>

<style scoped lang="less">
  .header{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #2e6da4;
    color: #fff;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-weight: bold;
    i{
      position: absolute;
      left: 20px;
    }
  }
</style>
