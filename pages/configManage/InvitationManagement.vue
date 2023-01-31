<template>
  <view class="invitation-management">
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
      placeholder="搜索"
      v-model="searchText"
      actionText=" "
      v-if="!showDetail"
    ></u-search>
    <view class="page-content">
      <uni-card :isShadow="true" mode="basic" class="page-card">
        <view class="card-head">
          <u-icon
            label="正在邀约"
            name="clock"
            color="#ffffff"
            label-color="#ffffff"
            label-size="16"
            size="24"
          ></u-icon>
        </view>
        <u-list class="list-info">
          <u-list-item
            v-for="(item, index) in currentEventList"
            :key="index"
            class="test"
          >
            <view class="left" @click="handleCurrentInvitatSelect(item)">
              <text class="order">{{ item.order }}</text>
              <u-icon name="play-circle" color="#ffffff" size="16"></u-icon>
            </view>
            <view class="right">
              <view class="label-value">
                <text class="label">事件名称</text>
                <view class="value">
                  <text class="count">123</text>
                </view>
              </view>
              <view
                class="label-value"
                v-if="item.order === currentSelectOrder"
              >
                <text class="label">调控指标</text>
                <view class="value">
                  <text class="count">123</text>
                  <text class="unit">家</text>
                </view>
              </view>
              <view
                class="label-value"
                v-if="item.order === currentSelectOrder"
              >
                <text class="label">当前响应用户</text>
                <view class="value">
                  <text class="count">123</text>
                  <text class="unit">家</text>
                </view>
              </view>
              <view
                class="label-value"
                v-if="item.order === currentSelectOrder"
              >
                <text class="label">当前响应指标</text>
                <view class="value">
                  <text class="count">123</text>
                  <text class="unit">家</text>
                </view>
              </view>
            </view>
          </u-list-item>
        </u-list>
      </uni-card>
      <uni-card :isShadow="true" mode="basic" class="page-card">
        <view class="card-head">
          <u-icon
            label="历史邀约"
            name="clock"
            color="#ffffff"
            label-color="#ffffff"
            label-size="16"
            size="24"
          ></u-icon>
        </view>
        <u-list class="list-info">
          <u-list-item
            v-for="(item, index) in currentEventList"
            :key="index"
            class="test"
          >
            <view class="left" @click="handleCurrentInvitatSelect(item)">
              <text class="order">{{ item.order }}</text>
              <u-icon name="play-circle" color="#ffffff" size="16"></u-icon>
            </view>
            <view class="right">
              <view class="label-value">
                <text class="label">事件名称</text>
                <view class="value">
                  <text class="count">123</text>
                </view>
              </view>
              <view
                class="label-value"
                v-if="item.order === currentSelectOrder"
              >
                <text class="label">调控指标</text>
                <view class="value">
                  <text class="count">123</text>
                  <text class="unit">家</text>
                </view>
              </view>
              <view
                class="label-value"
                v-if="item.order === currentSelectOrder"
              >
                <text class="label">当前响应用户</text>
                <view class="value">
                  <text class="count">123</text>
                  <text class="unit">家</text>
                </view>
              </view>
              <view
                class="label-value"
                v-if="item.order === currentSelectOrder"
              >
                <text class="label">当前响应指标</text>
                <view class="value">
                  <text class="count">123</text>
                  <text class="unit">家</text>
                </view>
              </view>
            </view>
          </u-list-item>
        </u-list>
      </uni-card>
      <view class="bottom-btn" @click="createInvitat">新建邀约</view>
    </view>
  </view>
</template>

<script>
// import resourceUserDetail from "./resourceUserDetail.vue";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      previewInfo: [
        {
          name: "正在邀约",
          value: 5,
          unit: "条",
          icon: "icon-xingzhuangjiehe",
        },
        {
          name: "当年完成",
          value: 26,
          unit: "条",
          icon: "icon-xingzhuangjiehe",
        },
        {
          name: "总完成",
          value: 821,
          unit: "条",
          icon: "icon-xingzhuangjiehe",
        },
      ],
      searchText: "",
      type: "text",
      border: true,
      showDetail: false,
      currentSelectOrder: "NO1",
      currentEventList: [
        {
          order: "NO1",
          name: "event88888",
          quota: "2000",
          currentUserCount: 8,
          currentQuota: 1250,
        },
        {
          order: "NO2",
          name: "event88888",
          quota: "2000",
          currentUserCount: 8,
          currentQuota: 1250,
        },
        {
          order: "NO3",
          name: "event88888",
          quota: "2000",
          currentUserCount: 8,
          currentQuota: 1250,
        },
        {
          order: "NO4",
          name: "event88888",
          quota: "2000",
          currentUserCount: 8,
          currentQuota: 1250,
        },
      ],
    };
  },
  components: {
    // resourceUserDetail,
  },
  methods: {
    handleSelect() {
      this.showDetail = true;
    },
    handleGoBack() {
      this.showDetail = false;
    },
    // 新建邀约
    createInvitat() {
      console.log(999);
    },
    handleCurrentInvitatSelect(item) {
      this.currentSelectOrder = item.order;
    },
  },
};
</script>

<style lang="scss" scoped>
.invitation-management {
  width: 100%;
  overflow: auto;
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
  .page-card ::v-deep .uni-card {
    margin: 20rpx 0 !important;
    padding: 30rpx !important;
    background: rgba(0, 142, 181, 0.15);
    border-radius: 16rpx;
    border: none;
    height: 688rpx;
    .uni-card__content {
      padding: 0 !important;
    }
    .card-head {
      margin-bottom: 22rpx;
    }
  }
  ::v-deep .u-list {
    overflow: auto;
    height: 636rpx !important;
  }
  ::v-deep .u-list-item {
    position: relative;
    background: rgba(0, 142, 181, 0.15);
    border-radius: 16rpx;
    padding: 22rpx 30rpx 0;
    position: relative;
    margin-bottom: 16rpx;
    overflow: hidden;
    box-sizing: border-box;
    .left {
      width: 86rpx;
      display: flex;
      color: #ffffff;
      font-size: 24rpx;
      justify-content: space-between;
      align-items: flex-start;
      position: absolute;
      left: 30rpx;
      top: 22rpx;
      .order {
        margin-top: -3px;
      }
    }
    .right {
      padding-left: 82rpx;
      margin-top: -7rpx;
      .label-value {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
        margin-bottom: 16rpx;
        .label {
          text-align: right;
          width: 34%;
          color: #9fa6af;
        }
        .value {
          display: flex;
          flex: 1;
          padding-left: 20rpx;
          .count {
            width: 100%;
            height: 48rpx;
            border-radius: 16rpx;
            border: 2rpx solid rgba(230, 241, 255, 0.2);
            line-height: 48rpx;
            padding-left: 20rpx;
            color: #00c8ff;
            font-family: square-font;
          }
          .unit {
            margin-left: 16rpx;
            font-size: 20rpx;
            color: rgba(255, 255, 255, 0.5);
          }
        }
      }
    }
  }
  .bottom-btn {
    width: 440rpx;
    height: 90rpx;
    background: linear-gradient(360deg, #0145d4 0%, #00b2fd 100%);
    border-radius: 20rpx;
    margin: 0 auto;
    text-align: center;
    line-height: 90rpx;
    font-weight: bold;
    font-size: 40rpx;
    margin-top: 66rpx;
    color: #ffffff;
  }
}
</style>