<template>
  <view class="user-detail">
    <view class="breadcrumb">
      <text>邀约详情 > 用户响应情况</text>
    </view>
    <List titleTxt="用户响应情况" fontClass="icon-iconKSYY_YYGL_3-0-title">
      <view class="card-conent">
        <div class="user-info">
          <text class="left">02</text>
          <view class="mid">
            <text class="mid-name">电脑管家001</text>
            <view class="mid-bottom">
              <text class="status">参与</text>
              <text class="value">85 kw</text>
            </view>
          </view>
          <view class="right">
            <text class="title">响应时间</text>
            <text class="time">2022-10-02 15:30</text>
          </view>
        </div>
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
        <u-divider class="my-divider"></u-divider>
        <view class="sum"
          >共计响应<text class="count">50</text
          ><text class="unit">kw</text></view
        >
        <view class="user-form-info">
          <view class="label-value">
            <text class="title">联系人</text>
            <text class="value">唐先锋</text>
          </view>
          <view class="label-value">
            <text class="title">联系方式</text>
            <text class="value">15261562803</text>
          </view>
        </view>
      </view>
    </List>
    <view class="bottom">
      <view class="back" @click="goBack">
        <image src="~@/static/icon_back.png" class="img-back" />
        <text class="title">返回</text>
      </view>
    </view>
  </view>
</template>

<script>
import List from "@/components/list";
import { uniScrollTop } from "@/utils/common.js";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      radiolist: [
        {
          name: "全部",
          disabled: false,
        },
        {
          name: "参与",
          disabled: false,
        },
        {
          name: "不参与",
          disabled: false,
        },
        {
          name: "未响应",
          disabled: false,
        },
      ],
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
    };
  },
  components: {
    List,
  },
  onLoad() {},
  methods: {
    goBack() {
      this.$emit("changeCurrentPage");
      uniScrollTop();
    },
  },
};
</script>

<style lang="scss" scoped>
.user-detail {
  width: 100%;
  .breadcrumb {
    font-size: 40rpx;
    font-family: MicrosoftYaHei;
    color: rgba(0, 148, 179, 0.5);
    margin: 20rpx 0 28rpx 0;
    padding-left: 30rpx;
  }
  .card-conent {
    .user-info {
      background: rgba(0, 142, 181, 0.2);
      border-radius: 16rpx;
      padding: 20rpx;
      display: flex;
      justify-content: space-between;
      margin-top: 22rpx;
      .left {
        display: block;
        color: #0094b3;
        font-size: 28rpx;
        margin-right: 16rpx;
      }
      .mid {
        // flex: 1;
        &-name {
          font-size: 32rpx;
          font-family: MicrosoftYaHei;
          color: #e6f1ff;
          line-height: 24rpx;
        }
        &-bottom {
          margin-top: 10rpx;
          .status {
            text-align: center;
            line-height: 44rrpx;
            display: inline-block;
            width: 128rpx;
            height: 44rpx;
            background: rgba(0, 145, 255, 0.6);
            font-size: 24rpx;
            color: #fff;
            border-radius: 10rpx;
          }
          .value {
            font-size: 32rpx;
            margin-left: 30rpx;
            color: #f7b500;
            font-family: square-font;
            .unit {
              font-size: 28rpx;
              color: #0094b3;
              padding: 20rpx;
            }
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        text-align: right;
        font-size: 24rpx;
        .title {
          color: #0094b3;
        }
        .time {
          color: #00c8ff;
        }
      }
    }
    .device-info {
      padding: 8rpx 0;
      color: rgba(230, 241, 255, 0.6);
      margin-top: 30rpx;
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
    ::v-deep .u-divider {
      margin: 12rpx 0 !important;
      .u-line {
        border-color: #ffffff33 !important;
      }
    }
    .sum {
      text-align: right;
      font-size: 24rpx;
      color: #9fa6af;
      .count {
        padding: 0 28rpx 0 42rpx;
        font-size: 36rpx;
        color: #f7b500;
      }
      .unit {
        color: rgba(255, 255, 255, 0.5);
      }
    }
    .user-form-info {
      margin-top: 50rpx;
      .label-value {
        display: flex;
        // justify-content: space-between;
        align-items: center;
        font-size: 24rpx;
        margin-bottom: 16rpx;
        .title {
          text-align: right;
          color: #9fa6af;
          width: 102rpx;
          margin-right: 6rpx;
        }
        .value {
          display: flex;
          /* flex: 1; */
          width: 60%;
          padding-left: 20rpx;
          align-items: flex-end;
          border-radius: 16rpx;
          border: 2rpx solid rgba(230, 241, 255, 0.2);
          color: #00c8ff;
          height: 48rpx;
          line-height: 48rpx;
        }
      }
    }
  }
  .bottom {
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
    .btns {
      margin-top: 28rpx;
      display: flex;
      justify-content: space-around;
    }
  }
}
</style>
