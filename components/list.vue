<template>
  <view class="list-wrap">
    <view class="title-wrap">
      <view class="title"
        ><text :class="['iconfont', fontClass]"></text>{{ titleTxt }}</view
      >
      <!-- 编辑类似按钮插槽 -->
      <slot name="optBtn"> </slot>
    </view>
    <view class="list-item">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    fontClass: {
      type: String,
      default: "",
    },
    titleTxt: {
      type: String,
      default: null,
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.list-wrap {
  background: rgba(0, 142, 181, 0.15);
  border-radius: 16px;
  padding: 30rpx 30rpx 20rpx;
  box-sizing: border-box;
  margin-top: 20rpx;
  .title-wrap {
    font-size: 32rpx;
    color: #fff;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    margin-bottom: 26rpx;
    .title {
      display: flex;
    }
    .iconfont {
      font-size: 48rpx;
      margin-right: 18rpx;
      font-weight: normal;
    }
  }
}
</style>
