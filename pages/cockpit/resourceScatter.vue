<template>
  <view class="resource-scatter">
    <view class="top">
      <view class="item-info" v-for="(item, index) in previewInfo" :key="index">
        <text class="iconfont" :class="item.icon"></text>
        <view class="key-value">
          <text class="key">{{ item.name }}</text>
          <view class="value">
            <text class="count">{{ item.value }}</text>
            <text class="unit">{{ item.unit }}</text>
          </view>
        </view>
      </view>
    </view>
    <u-search
      placeholder="输入最少6位业务编号"
      v-model="searchText"
      actionText=" "
      v-if="!showDetail"
    ></u-search>
    <scroll-view scroll-y="true" class="scroll-Y" v-if="!showDetail">
      <uni-card :isShadow="true" mode="basic" class="scatter-card">
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
      <uni-card
        :isShadow="true"
        mode="basic"
        class="scatter-card"
        @click="handleSelect"
      >
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
      <uni-card :isShadow="true" mode="basic" class="scatter-card">
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
      <uni-card :isShadow="true" mode="basic" class="scatter-card">
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
      <uni-card :isShadow="true" mode="basic" class="scatter-card">
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
      <uni-card :isShadow="true" mode="basic" class="scatter-card">
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
      <uni-card :isShadow="true" mode="basic" class="scatter-card">
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
          <view class="card-info-item">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#0DFF9A' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#F7B500' }">360</text>
          </view>
          <view class="card-info-item">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text class="value" :style="{ color: '#FA6400' }">360</text>
          </view>
        </view>
      </uni-card>
    </scroll-view>
    <resourceUserDetail v-else @goBack="handleGoBack" />
  </view>
</template>

<script>
import resourceUserDetail from "./resourceUserDetail.vue";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      previewInfo: [
        {
          name: "响应用户",
          value: 230,
          unit: "家",
          icon: "icon-xingzhuangjiehe",
        },
        {
          name: "响应设备",
          value: 319,
          unit: "个",
          icon: "icon-xingzhuangjiehe",
        },
        {
          name: "总最大响应",
          value: 821,
          unit: "kw",
          icon: "icon-xingzhuangjiehe",
        },
      ],
      searchText: "",
      type: "text",
      border: true,
      showDetail: false,
    };
  },
  components: {
    resourceUserDetail,
  },
  methods: {
    handleSelect() {
      this.showDetail = true;
    },
    handleGoBack() {
      this.showDetail = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-scatter {
  width: 100%;
  .top {
    display: flex;
    justify-content: space-between;
    margin-top: 20rpx;
    margin-bottom: 34rpx;
    .item-info {
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 60rpx;
      }
      .key-value {
        margin-left: 14rpx;
        .key {
          font-size: 24rpx;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 0.8);
        }
        .value {
          margin-top: 14rpx;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .count {
            font-size: 32rpx;
            color: #32c5ff;
          }
          .unit {
            font-size: 20rpx;
          }
        }
      }
    }
  }
  ::v-deep .u-search {
    width: 100%;
    display: block;
    .u-search__content {
      background: rgba(0, 96, 169, 0.2) !important;
      border-radius: 16px !important;
      height: 50rpx;
      input {
        background: unset !important;
      }
    }
    .u-search__action {
      display: none;
    }
  }
  .scatter-card ::v-deep .uni-card {
    margin: 20rpx 0 !important;
    padding: 0 40rpx !important;
    background: rgba(0, 142, 181, 0.15);
    border-radius: 16rpx;
    border: none;
    height: 200rpx;
    .uni-card__content {
      padding: 0 !important;
    }
    .card-head {
      display: flex;
      justify-content: space-between;
      height: 90rpx;
      align-items: center;
      &-title {
        font-weight: bold;
        color: #e6f1ff;
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
    .u-divider {
      margin: 0 !important;
    }
    .card-body {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 109rpx;
      .card-info-item {
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
  }
}
</style>