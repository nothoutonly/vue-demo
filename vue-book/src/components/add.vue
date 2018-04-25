<template>
  <div class="content">
    <bookhead :back="true">添加</bookhead>
    <ul>
      <li>
        <label for="bookCover">书的封面</label>
        <input type="text" id="bookCover" v-model="book.bookCover">
      </li>
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
        <button @click="add">添加</button>
      </li>
    </ul>
  </div>
</template>

<script>
  import bookhead from "../base/bookhead.vue"
  import {addBook} from "../api";
  export default {
    name: "add",
    data() {
      return {book:{}}
    },
    methods: {
      async add(){
        await addBook(this.book);
        this.$router.push('/list');
      }
    },
    computed: {},
    components: {
      bookhead,
    }
  }
</script>

<style scoped lang="less">
  ul {
    margin: 10px 20px 0;

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
</style>
