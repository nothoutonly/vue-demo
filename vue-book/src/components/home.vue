<template>
  <div>
    <bookhead>首页</bookhead>
    <div class="content">
      <loading v-if="loading">加载中</loading>
      <template v-else>
        <swiper :swiperSliders="sliders"></swiper>
        <div class="hotbooks">
          <h3>热门图书</h3>
          <ul>
            <li v-for="(hot,index) in hotBooks" :key="index">
              <img :src="hot.bookCover" alt="">
              <span>{{hot.bookName}}</span>
            </li>
          </ul>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
  import bookhead from "../base/bookhead.vue"
  import swiper from "../base/swiper.vue"
  import loading from "../base/loading.vue";
  import {getAll} from "../api/index.js";

  export default {
    name: "home",
    data() {
      return {
        sliders: [],
        hotBooks: [],
        loading: true,
      }
    },
    created() {
      this.getData();
    },
    methods: {
      async getData() {
        let [sliders, hotBooks] = await getAll();
        this.sliders = sliders;
        this.hotBooks = hotBooks;
        this.loading = false;
      }
    },
    computed: {},
    components: {
      bookhead, swiper, loading
    }
  }
</script>

<style scoped lang="less">
  .hotbooks {
    width: 90%;
    margin: 0 auto;
    h3 {
      color: #555;
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 50%;
        margin: 10px 0;
        text-align: center;
        img {
          width: 100%;
        }
      }

    }
  }
</style>
