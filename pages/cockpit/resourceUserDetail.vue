<template>
  <view class="resource-user-detail">
    <card>
      <view class="card-head">
        <view class="card-head-title">电管家{{ userInfo.userName }}用户</view>
        <view class="card-head-status">
          <u-icon
              :label="info.statusName"
              labelSize="24rpx"
              :labelColor="status[userInfo.partake].color"
              space="15rpx"
              size="15px"
              :color="status[userInfo.partake].color"
              :name="status[userInfo.partake].icon"
            ></u-icon>
        </view>
      </view>
      <u-divider color="#E6F1FF"></u-divider>
      <view class="card-body">
        <view class="user-info">
          <view class="label-value">
            <text class="label">用户名称</text>
            <text class="value">{{ userInfo.userName }}</text>
          </view>
          <view class="label-value">
            <text class="label">用户地址</text>
            <text class="value">{{ userInfo.address }}</text>
          </view>
          <view class="label-value">
            <text class="label">用户类型</text>
            <text class="value">{{ info.userType }}</text>
          </view>
          <view class="label-value">
            <text class="label">联系人</text>
            <text class="value">{{ userInfo.contact }}</text>
          </view>
          <view class="label-value">
            <text class="label">联系方式</text>
            <text class="value">{{ userInfo.phone }}</text>
          </view>
          <view class="label-value">
            <text class="label">用户户号</text>
            <text class="value">{{ userInfo.userNo }}</text>
          </view>
        </view>
      </view>
    </card>
    <view class="sub-tab">
      <view class="sub-tab-item" @click="() => (currentTab = 0)">
        <u-icon
          label="快速响应"
          name="setting"
          :color="currentTab === 0 ? '#0DFF9A' : '#9FA6AF'"
          :label-color="currentTab === 0 ? '#00C8FF' : '#9FA6AF'"
          label-size="12"
        ></u-icon>
        <text
          class="value"
          :style="{ color: currentTab === 0 ? '#0DFF9A' : '#00C8FF', background: currentTab === 0 ? '#008eb580' : '#008eb51a' }"
          >{{ tabs[0]['sum'] }}</text
        >
      </view>
      <view class="sub-tab-item" @click="() => (currentTab = 1)">
        <u-icon
          label="日内响应"
          name="setting"
          :color="currentTab === 1 ? '#0DFF9A': '#9FA6AF'"
          :label-color="currentTab === 1 ? '#00C8FF' : '#9FA6AF'"
          label-size="12"
        ></u-icon>
        <text
          class="value"
          :style="{ color: currentTab === 1 ? '#0DFF9A' : '#00C8FF', background: currentTab === 1 ? '#008eb580' : '#008eb51a' }"
          >{{ tabs[1]['sum'] }}</text
        >
      </view>
      <view class="sub-tab-item" @click="() => (currentTab = 2)">
        <u-icon
          label="中长期响应"
          name="setting"
          :color="currentTab === 2 ? '#FA6400' : '#9FA6AF'"
          :label-color="currentTab === 2 ? '#00C8FF' : '#9FA6AF'"
          label-size="12"
        ></u-icon>
        <text
          class="value"
          :style="{ color: currentTab === 2 ? '#0DFF9A' : '#00C8FF', background: currentTab === 2 ? '#008eb580' : '#008eb51a' }"
          >{{ tabs[2]['sum'] }}</text
        >
      </view>
    </view>
    <card>
      <view class="device-info">
        <view class="device-info-head">
          <text>序号</text>
          <text>响应设备</text>
          <text>响应容量</text>
        </view>
        <view class="device-info-list">
          <view class="device-item" v-for="(item, index) in tabs[currentTab]['list']" :key="index">
            <text class="order border">{{ index + 1}}</text>
            <text class="name border">{{ item.deviceName }}</text>
            <view class="capacity">
              <text class="value border">{{ item.volume }}</text>
              <text class="unit">kw</text>
            </view>
          </view>
        </view>
      </view>
    </card>
    <view class="bottom">
      <view class="back" @click="goBack">
        <image src="~@/static/icon_back.png" class="img-back" />
        <text class="title">返回</text>
      </view>
    </view>
  </view>
</template>

<script>
import card from "@/components/card";
import overview from "@/components/overview";
import { getUserInfo, getTypeList, getRegionList } from "@/api/user/index.js";
export default {
  options: {
    styleIsolation: "shared",
  },
  props: {
    info: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      currentTab: 0,
      userInfo: {},
      status: {
        2: {
          bg: "rgba(13,255,154,0.1)",
          color: "#0DFF9A",
          icon: "checkmark-circle",
        },
        1: {
          bg: "rgba(247,181,0,0.1)",
          color: "#F7B500",
          icon: "close-circle",
        },
      },
      tabs: [
          {
            title: "快速响应",
            type: 10,
            sum: 0,
            list: [],
            icon: "icon-iconDR_quick_active",
          },
          {
            title: "日内响应",
            type: 20,
            sum: 0,
            list: [],
            icon: "icon-iconDR_day_active",
          },
          {
            title: "中长期响应",
            type: 30,
            sum: 0,
            list: [],
            icon: "icon-iconDR_long_active",
          },
        ]
    };
  },
  components: {
    card,
    overview,
  },
  onReady() {
    this.queryUserDetail();
  },
  methods: {
    goBack() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
      this.$emit("goBack");
    },
    // 用户详情
    async queryUserDetail() {
      const {
        resultCode,
        resultData: { user, strategy, response },
      } = await getUserInfo({ userId: this.info.userId });
      if (!resultCode) {
        this.userInfo = user
        const type10 = response.filter((c) => c.type === 10);
        const type20 = response.filter((c) => c.type === 20);
        const type30 = response.filter((c) => c.type === 30);
        this.tabs = [
          {
            title: "快速响应",
            type: 10,
            sum: type10.reduce((pre, cur) => pre + cur.volume, 0),
            list: [{
              deviceName: 'asdf'
            },
            {
              deviceName: 'asdf'
            },
            {
              deviceName: 'asdf'
            },
            {
              deviceName: 'asdf'
            },
            {
              deviceName: 'asdf'
            },
            {
              deviceName: 'asdf'
            }],
            icon: "icon-iconDR_quick_active",
          },
          {
            title: "日内响应",
            type: 20,
            sum: type20.reduce((pre, cur) => pre + cur.volume, 0),
            list: type20,
            icon: "icon-iconDR_day_active",
          },
          {
            title: "中长期响应",
            type: 30,
            sum: type30.reduce((pre, cur) => pre + cur.volume, 0),
            list: type30,
            icon: "icon-iconDR_long_active",
          },
        ];
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-user-detail {
  width: 100%;
  padding-bottom: 40rpx;
  .card-head {
    display: flex;
    justify-content: space-between;
    // height: 90rpx;
    align-items: center;
    &-title {
      font-weight: bold;
      color: #e6f1ff;
      font-size: 32rpx;
    }
    &-status {
      height: 52rpx;
      background: rgba(13, 255, 154, 0.1);
      border-radius: 10px;
      width: fit-content;
      padding: 0 20rpx;
      display: flex;
    }
  }
  ::v-deep .u-divider {
    margin: 12rpx 0 !important;
  }
  .card-body {
    .user-info {
      line-height: 65rpx;
      height: 400rpx;
      overflow: auto;
    }
    .label-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .label {
        text-align: right;
        width: 21%;
        color: #9fa6af;
      }
      .value {
        width: 68%;
        height: 48rpx;
        border-radius: 16rpx;
        border: 2rpx solid rgba(230, 241, 255, 0.2);
        line-height: 48rpx;
        padding-left: 20rpx;
        color: #00c8ff;
      }
    }
  }
  .preview-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 109rpx;
    &-item {
      text-align: center;
      .value {
        height: 40rpx;
        background: rgba(0, 142, 181, 0.2);
        border-radius: 8rpx;
        display: block;
        margin-bottom: 12rpx;
        font-size: 28rpx;
        margin-top: 7rpx;
      }
    }
  }
  .device-info {
    padding: 8rpx 0;
    color: rgba(230, 241, 255, 0.6);
    &-head {
      display: flex;
      justify-content: space-between;
    }
    &-list {
      line-height: 57rpx;
      max-height: 170rpx;
      overflow: auto;
      .device-item {
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-items: center;
      }
      .border {
        height: 40rpx;
        border-radius: 16rpx;
        border: 2rpx solid rgba(230, 241, 255, 0.2);
        line-height: 40rpx;
      }
      .order {
        width: 10%;
      }
      .name {
        width: 60%;
        color: #19d8ff;
      }
      .capacity {
        width: 22%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .value {
          width: 72rpx;
        }
      }
    }
  }
  .back {
    display: flex;
    justify-content: center;
    margin-left: -40rpx;
    margin-top: 10rpx;
    .title {
      font-size: 32rpx;
      padding-left: 20rpx;
      margin-top: 7rpx;
      color: #fff;
    }
    .img-back {
      width: 60rpx;
      height: 60rpx;
      display: flex;
    }
  }
  .sub-tab {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 12rpx;
    &-item {
      text-align: center;
      .value {
        height: 40rpx;
        background: rgba(0, 142, 181, 0.2);
        border-radius: 8rpx;
        display: block;
        margin-bottom: 12rpx;
        font-size: 28rpx;
        margin-top: 7rpx;
        font-family: square-font;
      }
    }
  }
}
</style>