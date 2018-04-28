<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :key="index" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH=5;
  const CLS_ON='on';
  const CLS_HALF='half';
  const CLS_OFF='off';

  export default {
    name: "star",
    props: ['size', 'score'],
    data() {
      return {}
    },
    methods: {},
    computed: {
      starType(){
        return 'star-'+this.size;
      },
      itemClasses(){
        let result=[];
        let score=Math.floor(this.score*2)/2;
        let hasDecimal=score%1!==0;
        let integer=Math.floor(score);
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON);
        }
        if (hasDecimal) {
            result.push(CLS_HALF);
        }
        while (result.length<LENGTH){
          result.push(CLS_OFF);
        }
        return result;
      }
    },
    components: {}
  }
</script>

<style scoped lang="less">
  @import "../../common/css/index.less";
  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
    }
    &.star-24{
      .star-item{
        width: 10px;
        height: 10px;
        margin-right: 3px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-img('star24_on');
        }
        &.half{
          .bg-img('star24_half');
        }
        &.off{
          .bg-img('star24_off');
        }
      }
    }
    &.star-36{
      .star-item{
        width: 15px;
        height: 15px;
        margin-right: 6px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-img('star36_on');
        }
        &.half{
          .bg-img('star36_half');
        }
        &.off{
          .bg-img('star36_off');
        }
      }
    }

    &.star-48{
      .star-item{
        width: 20px;
        height: 20px;
        margin-right: 22px;
        &:last-child{
          margin-right: 0;
        }
        &.on{
          .bg-img('star48_on');
        }
        &.half{
          .bg-img('star48_half');
        }
        &.off{
          .bg-img('star48_off');
        }
      }
    }

  }
</style>
