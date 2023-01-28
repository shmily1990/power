<template>
  <view>
    <view class="view-box">
      <view class="item">
        <text class="item-name">合同实施</text>
        <view class="item-content">
          <view class="item-content-info" @click="goDetail(1)">
            <view class="item-icon">
              <u-icon name="order" color="#fff" size="30"></u-icon>
            </view>
            <text class="item-text">工单中心</text>
          </view>
        </view>
      </view>
      <view class="item" @click="goDetail(2)">
        <view class="item-content">
          <view class="item-content-info clear-flex">
            <view class="item-icon">
              <u-icon name="account-fill" color="#fff" size="30"></u-icon>
            </view>
            <text class="item-text">我的</text>
          </view>
        </view>
      </view>
    </view>
    <u-no-network />
  </view>
</template>

<script>
import { getUserInfo } from "@/api/login/index.js";
export default {
  data() {
    return {};
  },
  onLoad() {
    // this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      // 获取用户信息
      try {
        const { resultCode, resultData } = await getUserInfo();
        if (resultCode === 0) {
          uni.setStorageSync("userInfo", resultData);
        } else {
          uni.setStorageSync("userInfo", {});
        }
      } catch (e) {
        console.log(e);
      }
    },
    goDetail(flag) {
      /*
				flag:
					1:工单中心
					2:我的
				*/
      switch (flag) {
        case 1:
          uni.navigateTo({
            url: "/pages/orders/index",
          });
          break;
        case 2:
          uni.switchTab({
            url: "/pages/my/index",
          });
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.view-box {
  margin: 25rpx 0;
  width: 100%;
  min-height: 278rpx;
  color: $uni-text-color;
  flex-wrap: wrap;

  .item {
    display: flex;
    flex-direction: column;
    padding: 20rpx;
    font-size: 24rpx;
    margin-bottom: 20rpx;
    background-color: #fff;

    .item-content {
      display: flex;
      flex-wrap: wrap;
      overflow: hidden;

      ::v-deep.item-icon {
        width: 120rpx;
        height: 120rpx;
        background-color: $uni-color-primary;
        position: relative;
        margin: 20rpx 0 20rpx 10rpx;
        border-radius: 18rpx;

        .u-icon {
          color: #fff;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }

      .item-content-info {
        display: flex;
        flex-direction: column;
        width: 20%;
        align-items: center;
        .item-text {
          // margin-left: 10rpx;
        }
      }

      .clear-flex {
        flex: none;
      }
    }

    .item-name::before {
      content: "";
      width: 8rpx;
      height: 24rpx;
      background-color: #00b0f0;
      display: inline-block;
      margin-right: 10rpx;
    }
  }
}
</style>
