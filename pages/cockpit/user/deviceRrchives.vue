<template>
  <view class="user-page"> 
    <List titleTxt="设备档案" fontClass="icon-iconPZGL_YHGL_2-0-title">
      <view class="card-content">
        <view class="device-info">
          <view class="device-info-head">
            <text class="order-title">序号</text>
            <text class="name">响应设备</text>
            <text class="capacity-title">响应容量 kw</text>
          </view>
           <scroll-view scroll-y style="height: 600rpx">
            <view class="device-info-list" v-if="devicesList.length">
              <view class="device-item" v-for="(item, index) in devicesList" :key="index">
                <view class="left border">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</view>
                <view class="middle"><u-input placeholder="请输入内容" v-model="item.deviceName" disabled /></view>
                <view class="capacity">
                  <u-input v-model="item.volume" disabled />
                </view>
              </view>
            </view>
            <view class="empty" v-else>
                <u-empty mode="list"></u-empty>
              </view>
           </scroll-view>
        </view>
      </view>
    </List>
  </view>
</template>
<script>
import List from "@/components/list.vue";
import { getUserDevice } from "@/api/user/index.js";
import { uniScrollTop } from "@/utils/common.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  options: {
    styleIsolation: "shared",
  },
  components: {
    List,
  },
  data() {
    return {
      style: {
        color: "#9FA6AF",
        fontSize: "24rpx",
        display: "block",
        textAlign: "right",
        width: "128rpx",
      },
      userId: null,
      // 设备
      devicesList: []
    };
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ])
  },
  onReady() {
    // 初始化数据
    this.queryDeviceList()
  },
  methods: {
    // 获取用户设备列表
    async queryDeviceList() {
      const userId = this.loginUserInfo.userID
      const { resultCode, resultData } = await getUserDevice({ userId })
      if (!resultCode) {
        this.devicesList = resultData || []
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.load {
  color: $uni-color-load;
}
.response {
  color: $uni-color-response;
}
.max-response {
  color: $uni-color-max-response;
}
.mini-btn {
  background: rgba(0, 200, 255, 0.3);
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #e6f1ff;
  margin: 0;
}

.user-page {
  .device-info ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 1rpx 9rpx !important;
    width: 280rpx;
    // margin-left: 70rpx;
    background: none !important;
  }
  ::v-deep input {
    color: #00c8ff !important;
  }
  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 92rpx;
      height: 48rpx;
      background: rgba(0, 200, 255, 0.3);
      border-radius: 12rpx;
      display: block;
      text-align: center;
      font-size: 24rpx;
      color: #fff;
      line-height: 48rpx;
    }
  }
  .device-info {
    padding: 8rpx 0;
    color: rgba(230, 241, 255, 0.6);
    &-head {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      text-align: center;
      .order-title {
        display: block;
        width: 74rpx;
      }
      .capacity-title {
        display: block;
        width: 40%;
      }
    }
    &-list {
      line-height: 57rpx;
      .device-item {
        display: flex;
        // justify-content: space-between;
        text-align: center;
        align-items: center;
        margin: 10rpx;
      }
      .left {
        padding: 0 8rpx;
        line-height: 49rpx;
      }
      .middle {
        margin-left: 30rpx;
      }
      .border {
        height: 49rpx;
        border-radius: 16rpx;
        border: 2rpx solid rgba(230, 241, 255, 0.2);
        line-height: 40rpx;
      }
      .order {
        width: 10%;
      }
      .name {
        // flex: 1 0 280rpx;
        color: #19d8ff;
        margin: 0 16rpx;
        width: 280rpx;
      }
      .capacity {
        width: 100rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-left: 30rpx;
        .value {
          width: 72rpx;
        }
        .btns {
          flex: 1;
          display: flex;
          justify-content: space-around;
          margin-left: 20rpx;
        }
      }
    }
    .empty {
      margin-top: 50rpx;
    }
  }
}
</style>
