<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon" :class="className[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" @click="detailShow" class="support-count">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>

    </div>

    <div class="bulletin-wrapper" @click="detailShow">
      <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>

    <div class="background">
      <img :src="seller.avatar" alt="">
    </div>

    <div v-show="detailCover" class="detail">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li v-for="(item, index) in seller.supports" :key="index" class="support-item">
              <span class="icon" :class="className[item.type]"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">{{seller.bulletin}}</p>
          </div>
        </div>
      </div>
      <div class="detail-close" @click="detailHide">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import star from 'components/star/star';

  export default {
    props: {
      seller: {
        type: Object,
      }
    },
    data() {
      return {
        className: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailCover: false,
      }
    },
    created() {

    },

    methods: {
      detailShow() {
        this.detailCover = true;
      },
      detailHide() {
        this.detailCover = false;
      }
    },
    computed: {},
    components: {
      star
    }
  }
</script>

<style scoped lang="less">
  @import "../../common/css/mixin.less";

  .header {
    position: relative;
    color: #fff;
    overflow: hidden;
    .content-wrapper {
      font-size: 0;
      padding: 24px 12px 18px 24px;
      background-color: rgba(7, 17, 27, 0.5);
      position: relative;
      .avatar {
        display: inline-block;
        img {
          border-radius: 2px;
          width: 64px;
          height: 64px;
        }
      }
      .content {
        display: inline-block;
        margin-left: 16px;
        .title {
          margin: 2px 0 8px 0;
          .brand {
            vertical-align: top;
            width: 30px;
            height: 18px;
            display: inline-block;
            .bg-img("brand");
            background-size: cover;
            background-repeat: no-repeat;
          }
          .name {
            margin-left: 6px;
            font-size: 16px;
            line-height: 18px;
            font-weight: bold;
          }
        }
        .description {
          margin-bottom: 10px;
          line-height: 12px;
          font-size: 12px;
        }
        .support {
          .icon {
            display: inline-block;
            width: 12px;
            height: 12px;
            margin-right: 4px;
            background-size: cover;
            background-repeat: no-repeat;
            &.decrease {
              .bg-img('decrease_1')
            }
            &.discount {
              .bg-img('discount_1')
            }
            &.guarantee {
              .bg-img('guarantee_1')
            }
            &.invoice {
              .bg-img('invoice_1')
            }
            &.special {
              .bg-img('special_1')
            }
          }
          .text {
            vertical-align: top;
            line-height: 12px;
            font-size: 10px;
          }
        }
      }
      .support-count {
        position: absolute;
        right: 12px;
        bottom: 12px;
        padding: 0 8px;
        height: 24px;
        line-height: 24px;
        border-radius: 14px;
        background: rgba(0, 0, 0, .2);
        text-align: center;
        .count {
          vertical-align: top;
          font-size: 10px;
        }
        .icon-keyboard_arrow_right {
          margin-left: 2px;
          line-height: 24px;
          font-size: 10px;
        }
      }
    }

    .bulletin-wrapper {
      position: relative;
      height: 28px;
      line-height: 28px;
      padding: 0 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      background-color: rgba(7, 17, 27, 0.2);
      .bulletin-title {
        display: inline-block;
        width: 22px;
        height: 12px;
        .bg-img('./bulletin');
        background-size: 22px 12px;

      }
      .bulletin-text {
        vertical-align: top;
        margin: 0 4px;
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        position: absolute;
        font-size: 10px;
        right: 12px;
        top: 8px;
      }

    }

    .background {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter: blur(10px);
      img {
        width: 100%;
        height: 100%;
      }
    }

    .detail {
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;
      overflow: auto;
      background: rgba(7, 17, 27, 0.8);
      backdrop-filter: blur(10px);
      .detail-wrapper {
        min-height: 100%;
        width: 100%;
        .detail-main {
          margin-top: 64px;
          padding-bottom: 64px;
          .name {
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          .star-wrapper {
            margin-top: 18px;
            text-align: center;
            padding: 2px 0;
          }
          .title {
            width: 80%;
            margin: 28px auto 24px auto;
            display: flex;
            .line {
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255, 255, 255, 0.2);
            }
            .text {
              margin: 0 12px;
              font-size: 14px;
              font-weight: 700;
            }
          }
          .supports {
            width: 80%;
            margin: 0 auto;
            .support-item {
              padding: 0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child {
                margin-bottom: 0;
              }
              .icon {
                display: inline-block;
                width: 16px;
                height: 16px;
                vertical-align: top;
                margin-right: 6px;
                &.decrease {
                  .bg-img('decrease_1')
                }
                &.discount {
                  .bg-img('discount_1')
                }
                &.guarantee {
                  .bg-img('guarantee_1')
                }
                &.invoice {
                  .bg-img('invoice_1')
                }
                &.special {
                  .bg-img('special_1')
                }
              }
              .text {
                margin-left: 6px;
                line-height: 16px;
                font-size: 12px;
                font-weight: 200;
                color: rgb(255, 255, 255);
              }
            }
          }
          .bulletin {
            width: 80%;
            margin: 24px auto 0;
            .content {
              padding: 0 12px;
              line-height: 24px;
              font-size: 12px;
              font-weight: 200;
              color: rgb(255, 255, 255);
            }
          }
        }
      }

      .detail-close {
        position: relative;
        width: 32px;
        height: 32px;
        margin: -64px auto 0 auto;
        clear: both;
        font-size: 32px;
        color: rgba(255, 255, 255, 0.5);
      }
    }

  }
</style>
