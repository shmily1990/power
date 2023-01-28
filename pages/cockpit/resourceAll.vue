<template>
  <view class="resource-all">
    <!-- <view class="top-view">
      <view class="li">
        <text class="iconfont icon-login-zu"></text>
        <view class="txt"></view>
      </view>
    </view> -->
    <view class="lists">
      <view class="item user-item">
        <view class="item-title">
          <text class="iconfont icon-login-zu"> 接入用户总览</text></view
        >
        <view class="li">
          <text class="iconfont icon-login-zu"></text>
          <view class="txt">
            <view>接入用户总数</view>
            <view class="num">232</view>
          </view>
        </view>
        <view class="li">
          <text class="iconfont icon-login-zu"></text>
          <view class="txt">
            <view>接入用户总数</view>
            <view class="num">230</view>
          </view>
        </view>
        <!---->
      </view>
      <view class="item equip-item"> </view>
      <view class="item response-item"> </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.lists {
  .item {
    background: rgba(0, 142, 181, 0.15);
    border-radius: 16px;
    padding: 30rpx 36rpx;
    box-sizing: border-box;
    .item-title {
      font-size: 42rpx;
      font-weight: bold;
      color: #fff;
    }
    .li {
      .txt {
        .num {
          color: #19d8ff;
        }
      }
    }
  }
}
</style>