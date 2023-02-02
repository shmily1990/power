<template>
  <view class="card-com">
    <uni-card :isShadow="true" mode="basic" class="card-box">
      <slot></slot>
    </uni-card>
  </view>
</template>

<script>
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {};
  },
  props: {
    // name: {
    //   type: String,
    //   default: '标题',
    // },
    // icon: {
    //   type: 'String',
    //   default: 'clock'
    // }
    handleSelect: {
      type: Function,
      default: () => {},
    },
  },
};
</script>

<style lang="scss" scoped>
.card-com {
  .card-box ::v-deep .uni-card {
    margin: 0 0 20rpx 0 !important;
    padding: 30rpx !important;
    background: rgba(0, 142, 181, 0.15);
    border-radius: 16rpx;
    border: none;
    .uni-card__content {
      padding: 0 !important;
    }
  }
}
</style>
