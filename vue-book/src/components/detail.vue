<template>
  <div class="detail">
    <bookhead :back="true">详情</bookhead>
    <ul>
      <li>
        <label for="bookName">书的名称</label>
        <input type="text" id="bookName" v-model="book.bookName">
      </li>
      <li>
        <label for="bookInfo">书的信息</label>
        <input type="text" id="bookInfo" v-model="book.bookInfo">
      </li>
      <li>
        <label for="bookPrice">书的价格</label>
        <input type="text" id="bookPrice" v-model.number="book.bookPrice">
      </li>
      <li>
        <button @click="update">提交修改</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import bookhead from "../base/bookhead.vue"
  import {findBook, updateBook} from "../api";

  export default {
    name: "detail",
    data() {
      return {book: {}}
    },
    created() {
      this.getData();
    },
    watch: {
      $route() {
        this.getData();
      }
    },
    methods: {
      async getData() {
        this.book  = await findBook(this.bid);
        Object.keys(this.book).length > 0 ? void 0 : this.$router.push('/list');
      },
      async update(){
        await updateBook(this.bid, this.book);
        this.$router.push('/list');
      }
    },
    computed: {
      bid() {
        return this.$route.params.bid;
      }
    },
    components: {
      bookhead,
    }
  }
</script>

<style scoped lang="less">
  .detail {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 100;
    ul {
      margin: 60px 20px 0;
      li {
        margin-top: 20px;
        label {
          display: block;
          font-size: 25px;
          line-height: 35px;
        }
        input {
          margin-top: 10px;
          width: 100%;
          height: 30px;
          line-height: 30px;
          text-indent: 5px;
          font-size: 20px;
          border: 1px solid #000;
          outline: none;
        }
        button {
          display: block;
          width: 100%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: none;
          border-radius: 5px;
          outline: none;
          color: #fff;
          background-color: #2e6da4;
        }
      }
    }
  }
</style>
