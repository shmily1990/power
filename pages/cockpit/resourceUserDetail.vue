<template>
  <view class="resource-user-detail">
    <card>
      <view class="card-head">
        <view class="card-head-title">电管家某某某用户</view>
        <view class="card-head-status">
          <u-icon
            label="已申报"
            name="checkmark-circle"
            color="#0DFF9A"
            label-color="#0DFF9A"
            label-size="12"
          ></u-icon>
        </view>
      </view>
      <u-divider color="#E6F1FF"></u-divider>
      <view class="card-body">
        <view class="user-info">
          <view class="label-value">
            <text class="label">用户名称</text>
            <text class="value">上海浦东大公司A</text>
          </view>
          <view class="label-value">
            <text class="label">用户地址</text>
            <text class="value">上海浦东大公司A</text>
          </view>
          <view class="label-value">
            <text class="label">用户类型</text>
            <text class="value">工业用户</text>
          </view>
          <view class="label-value">
            <text class="label">联系人</text>
            <text class="value">shmilytml</text>
          </view>
          <view class="label-value">
            <text class="label">联系方式</text>
            <text class="value">15261562803</text>
          </view>
          <view class="label-value">
            <text class="label">用户户号</text>
            <text class="value">15261562803</text>
          </view>
        </view>
      </view>
    </card>
    <view class="sub-tab">
      <view class="sub-tab-item" @click="() => (currentTab = 1)">
        <u-icon
          label="可调负荷"
          name="setting"
          color="#0DFF9A"
          label-color="#9FA6AF"
          label-size="12"
        ></u-icon>
        <text
          class="value"
          :style="{ color: currentTab === 1 ? '#0DFF9A' : '#00C8FF' }"
          >360</text
        >
      </view>
      <view class="sub-tab-item" @click="() => (currentTab = 2)">
        <u-icon
          label="日内响应"
          name="setting"
          color="#F7B500"
          label-color="#9FA6AF"
          label-size="12"
        ></u-icon>
        <text
          class="value"
          :style="{ color: currentTab === 2 ? '#0DFF9A' : '#00C8FF' }"
          >360</text
        >
      </view>
      <view class="sub-tab-item" @click="() => (currentTab = 3)">
        <u-icon
          label="最大响应"
          name="setting"
          color="#FA6400"
          label-color="#9FA6AF"
          label-size="12"
        ></u-icon>
        <text
          class="value"
          :style="{ color: currentTab === 3 ? '#0DFF9A' : '#00C8FF' }"
          >360</text
        >
      </view>
    </view>
    <!-- <overview :data="data" /> -->
    <card>
      <view class="device-info">
        <view class="device-info-head">
          <text>序号</text>
          <text>响应设备</text>
          <text>响应容量</text>
        </view>
        <view class="device-info-list">
          <view class="device-item">
            <text class="order border">01</text>
            <text class="name border">1层公共照明</text>
            <view class="capacity">
              <text class="value border">12</text>
              <text class="unit">kw</text>
            </view>
          </view>
          <view class="device-item">
            <text class="order border">01</text>
            <text class="name border">1层公共照明</text>
            <view class="capacity">
              <text class="value border">12</text>
              <text class="unit">kw</text>
            </view>
          </view>
          <view class="device-item">
            <text class="order border">01</text>
            <text class="name border">1层公共照明</text>
            <view class="capacity">
              <text class="value border">12</text>
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
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      data: [
        {
          name: "正在邀约",
          value: 230,
          unit: "条",
          icon: "icon-iconJSC_1_2",
        },
        {
          name: "当年完成",
          value: 319,
          unit: "条",
          icon: "icon-iconJSC_2_2",
        },
        {
          name: "总完成",
          value: 821,
          unit: "条",
          icon: "icon-iconJSC_2_2",
        },
      ],
      currentTab: 1,
    };
  },
  components: {
    card,
    overview,
  },
  methods: {
    goBack() {
      this.$emit("goBack");
      console.log(666);
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-user-detail {
  width: 100%;
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