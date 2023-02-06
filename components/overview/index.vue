<template>
  <view class="overview-box-com">
    <view class="list">
      <view class="list-item" v-for="(item, index) in data" :key="index">
        <text class="iconfont" :class="item.icon"></text>
        <view class="title-value">
          <text class="title">{{ item.name }}</text>
          <view class="value">
            <text class="count">{{ item.value }}</text>
            <text class="unit">{{ item.unit }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Array,
      default: [],
    },
  },
};
</script>

<style lang="scss" scoped>
.overview-box-com {
  .list {
    display: flex;
    justify-content: space-between;
    margin-top: 18rpx;
    margin-bottom: 30rpx;
    &-item {
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 60rpx;
        color: #32c5ff;
        border: 1px solid #3b5f80;
        border-radius: 50%;
      }
      .title-value {
        margin-left: 14rpx;
        .title {
          font-size: 24rpx;
          font-family: MicrosoftYaHei;
          color: #9fa6af;
        }
        .value {
          margin-top: 14rpx;
          display: flex;
          // justify-content: space-between;
          align-items: baseline;
          .count {
            font-size: 32rpx;
            color: #32c5ff;
            font-family: square-font;
            margin-right: 10rpx;
          }
          .unit {
            font-size: 20rpx;
          }
        }
      }
    }
  }
}
</style>
