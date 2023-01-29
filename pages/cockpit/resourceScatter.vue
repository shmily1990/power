<template>
  <view class="resource-scatter">
    <u-icon name="photo"></u-icon>
    <view class="top">
      <view class="item-info">
        <u-icon name="minus"></u-icon>
        <view class="key-value">
          <text>响应用户</text>
          <view class="value">
            <text>220 家</text>
          </view>
        </view>
      </view>
      <view class="item-info">
        <u-icon name="photo"></u-icon>
        <view class="key-value">
          <text>响应用户</text>
          <view class="value">
            <text>220 家</text>
          </view>
        </view>
      </view>
      <view class="item-info">
        <u-icon name="photo"></u-icon>
        <view class="key-value">
          <text>响应用户</text>
          <view class="value">
            <text>220 家</text>
          </view>
        </view>
      </view>
    </view>
    <view class="seach">
      <input
        class="uni-input"
        confirm-type="search"
        placeholder="键盘右下角按钮显示为搜索"
      />
    </view>
    <view class="list">
      <view class="card list-item"></view>
    </view>
    <scroll-view scroll-y="true" class="scroll-Y">
      <view id="demo1" class="scroll-view-item uni-bg-red">A</view>
      <view id="demo2" class="scroll-view-item uni-bg-green">B</view>
      <view id="demo3" class="scroll-view-item uni-bg-blue">C</view>
    </scroll-view>
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
// .lists {
//   .item {
//     background: rgba(0, 142, 181, 0.15);
//     border-radius: 16px;
//     padding: 30rpx 36rpx;
//     box-sizing: border-box;
//     .item-title {
//       font-size: 42rpx;
//       font-weight: bold;
//       color: #fff;
//     }
//     .li {
//       .txt {
//         .num {
//           color: #19d8ff;
//         }
//       }
//     }
//   }
// }
</style>