<template>
    <div>
      计数器： <button @click="minus">-</button>
      <br>
      当前：{{this.$store.state.count}}
      <br>
      计数器： <button @click="add">+</button>
    </div>
</template>

<script>
    export default {
        name: "counter",
        data() {
            return {
              count:0,
            }
        },
        methods: {
          add(){
            // 提交add的mutation
            // 载荷 payload
            this.$store.commit("add", 2)
          },
          minus(){
            this.$store.commit("minus", 2)
          }
        },
        computed: {},
        components: {}
    }
</script>

<style scoped>

</style>
