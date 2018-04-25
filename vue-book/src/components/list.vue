<template>
  <div>
    <bookhead :back="true">列表</bookhead>
    <div class="content" ref="scroll" @scroll="getMore">
      <ul>
        <router-link :to="{name:'detail',params:{bid:book.bookId}}" tag="li" v-for="(book,index) in books" :key="index">
          <div class="cover">
            <img :src="book.bookCover" alt="">
          </div>
          <div class="info">
            <h4>{{book.bookName}}</h4>
            <p>{{book.bookInfo}}</p>
            <b>{{book.bookPrice | toFixed(2)}}</b>
            <button @click.stop="remove(book.bookId)">删除</button>
          </div>
        </router-link>
      </ul>
      <!--<button class="more" v-if="hasMore">加载更多</button>-->
    </div>
  </div>
</template>

<script>
  import {getPage, removeBook} from "../api/index.js";
  import bookhead from "../base/bookhead.vue"

  export default {
    name: "list",
    data() {
      return {books: [], hasMore: true, offset: 0, isLoading: false,}
    },

    created() {
      this.getBook();
    },

    mounted() {
      let scroll = this.$refs.scroll;
      let top = scroll.offsetTop;
      let distance = 0;
      scroll.addEventListener("touchstart", (e) => {
        if (scroll.scrollTop !== 0 || scroll.offsetTop !== top) return;
        let start = e.touches[0].pageY;
        let move = (e) => {
          let current = e.touches[0].pageY;
          distance = current - start;
          if (distance > 0) {
            distance > 80 ? distance = 80 : null;
            scroll.style.top = distance + top + "px";
          } else {
            scroll.removeEventListener("touchmove", move);
            scroll.removeEventListener("touchend", end)
          }
        };
        let end = () => {
          clearInterval(this.scrollTimer);
          this.scrollTimer = setInterval(() => {
            if (distance <= 0) {
              clearInterval(this.scrollTimer);
              distance = 0;
              scroll.style.top = distance + top + "px";
              scroll.removeEventListener("touchmove", move);
              scroll.removeEventListener("touchend", end);
              this.offset=0;
              this.books=[];
              this.getBook();
              return;
            }
            distance -= 2;
            scroll.style.top = distance + top + "px";
          }, 1);
        };
        scroll.addEventListener("touchmove", move, false);
        scroll.addEventListener("touchend", end, false);
      }, false);
    },

    methods: {
      async getBook() {
        if (this.hasMore && !this.isLoading) {
          this.isLoading = true;
          let {hasMore, books} = await
            getPage(this.offset);
          this.hasMore = hasMore;
          this.books = [...this.books, ...books];
          this.offset = this.books.length;
          this.isLoading = false;
        }
      },
      async remove(id) {
        await
          removeBook(id); // 删除某一项
        this.books = this.books.filter(item => item.bookId !== id);
      },
      getMore() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          let {scrollTop, clientHeight, scrollHeight} = this.$refs.scroll;
          if (scrollTop + clientHeight + 30 > scrollHeight) {
            this.getBook();
          }
        }, 50)
      }
    },

    filters: {
      toFixed(value, param) {
        return "￥" + value.toFixed(param);
      }
    }
    ,
    computed: {}
    ,

    components: {
      bookhead,
    }
  }
</script>

<style scoped>
  .content ul {
    padding: 10px;
  }

  .content ul li {
    display: flex;
    margin: 10px 0;
    padding: 5px 0;
    border-bottom: 1px solid #f1f1f1;
  }

  .content ul li div.cover {
    padding: 33% 0 0 33%;
    position: relative;
  }

  .content ul li div.cover img {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .content ul li div.info {
    margin-left: 10px;
  }

  .content ul li div.info h4 {
    font-size: 20px;
    line-height: 30px;
  }

  .content ul li div.info p {
    color: #242424;
    line-height: 25px;
  }

  .content ul li div.info b {
    color: red;
  }

  .content ul li div.info button {
    display: block;
    width: 60px;
    height: 25px;
    border: none;
    border-radius: 10px;
    outline: none;
    color: #fff;
    background-color: orangered;
  }

  .more {
    display: block;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border: none;
    border-radius: 5px;
    outline: none;
    color: #fff;
    font-size: 18px;
    background-color: #2e6da4;
  }


</style>
