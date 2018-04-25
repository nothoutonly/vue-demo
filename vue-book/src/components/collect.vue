<template>
    <div>
      <bookhead :back="true">收藏</bookhead>
    </div>
</template>

<script>
  import bookhead from "../base/bookhead.vue"
    export default {
        name: "collect",
        data() {
            return {}
        },
        methods: {},
        computed: {},
        components: {
          bookhead,
        }
    }
</script>

<style scoped>

</style>
