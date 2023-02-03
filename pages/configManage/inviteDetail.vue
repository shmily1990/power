<template>
  <view class="invite-detail">
    <template v-if="currentPage === 'invite'">
      <view class="breadcrumb">
        <text>邀约详情</text>
      </view>
      <card>
        <view class="card-head">
          <u-icon
            label="关联事件信息"
            name="clock"
            color="#ffffff"
            label-color="#ffffff"
            label-size="16"
            size="24"
          ></u-icon>
        </view>
        <view class="card-conent">
          <view class="event-info">
            <view class="label-value">
              <text class="title">事件名称</text>
              <view class="value">
                <text class="count">event8888</text>
                <text class="unit">kw</text>
              </view>
            </view>
            <view class="label-value">
              <text class="title">调控指标</text>
              <view class="value">
                <text class="count">2000</text>
                <text class="unit">kw</text>
              </view>
            </view>
            <view class="label-value">
              <text class="title">开始时间</text>
              <view class="value">
                <text class="count">2023-01-02 15:30</text>
              </view>
            </view>
            <view class="label-value">
              <text class="title">持续时间</text>
              <view class="value">
                <text class="count" style="width: 132rpx">60</text>
                <text class="unit">分钟</text>
              </view>
            </view>
          </view>
        </view>
      </card>
      <card>
        <view class="card-head">
          <u-icon
            label="用户响应情况"
            name="clock"
            color="#ffffff"
            label-color="#ffffff"
            label-size="16"
            size="24"
          ></u-icon>
        </view>
        <view class="card-body">
          <view class="respond-count">
            <view class="list-item" v-for="(item, index) in data" :key="index">
              <text class="iconfont" :class="item.icon"></text>
              <view class="title-value">
                <text class="title">{{ item.name }}</text>
                <view class="value">
                  <text class="count">{{ item.value }}</text>
                  <text class="unit">{{ item.unit }}</text>
                </view>
              </view>
            </view>
          </view>
          <u-divider color="#E6F1FF"></u-divider>
          <view class="user">
            <view class="screen">
              <text class="title">筛选</text>
              <!-- <u-radio-group
                v-model="radiovalue"
                placement="row"
                shape="square"
              >
                <u-radio
                  :customStyle="{ marginBottom: '8px' }"
                  v-for="(item, index) in radiolist"
                  :key="index"
                  :label="item.name"
                  :name="item.name"
                >
                </u-radio>
              </u-radio-group> -->
              <checkbox-group @change="handChange">
                <view class="flex">
                  <label class="flex">
                    <checkbox value="cb1" class="round" :checked="checkValue" />
                    <view class="title c-title choose-title"> 全部 </view>
                  </label>
                  <label class="flex">
                    <checkbox value="cb2" class="round" :checked="checkValue" />
                    <view class="title c-title choose-title"> 参与 </view>
                  </label>
                  <label class="flex">
                    <checkbox value="cb3" class="round" :checked="checkValue" />
                    <view class="title c-title choose-title"> 不参与 </view>
                  </label>
                  <label class="flex">
                    <checkbox value="cb4" class="round" :checked="checkValue" />
                    <view class="title c-title choose-title"> 未响应 </view>
                  </label>
                </view>
              </checkbox-group>
            </view>
            <view class="user-list">
              <view class="user-list-item" @click="handleSelect">
                <text class="left">01</text>
                <view class="mid">
                  <text class="mid-name">电脑管家001</text>
                  <view class="mid-bottom">
                    <text class="status">参与</text>
                    <text class="value">85<text class="unit">kw</text></text>
                  </view>
                </view>
                <u-icon
                  name="arrow-right"
                  color="#00c8ff"
                  size="16"
                  class="right"
                />
              </view>
              <view class="user-list-item" @click="handleSelect">
                <text class="left">01</text>
                <view class="mid">
                  <text class="mid-name">电脑管家001</text>
                  <view class="mid-bottom">
                    <text class="status">参与</text>
                    <text class="value">85<text class="unit">kw</text></text>
                  </view>
                </view>
                <u-icon
                  name="arrow-right"
                  color="#00c8ff"
                  size="16"
                  class="right"
                />
              </view>
              <view class="user-list-item" @click="handleSelect">
                <text class="left">01</text>
                <view class="mid">
                  <text class="mid-name">电脑管家001</text>
                  <view class="mid-bottom">
                    <text class="status">参与</text>
                    <text class="value">85<text class="unit">kw</text></text>
                  </view>
                </view>
                <u-icon
                  name="arrow-right"
                  color="#00c8ff"
                  size="16"
                  class="right"
                />
              </view>
              <view class="user-list-item" @click="handleSelect">
                <text class="left">01</text>
                <view class="mid">
                  <text class="mid-name">电脑管家001</text>
                  <view class="mid-bottom">
                    <text class="status">参与</text>
                    <text class="value">85 <text class="unit">kw</text></text>
                  </view>
                </view>
                <u-icon
                  name="arrow-right"
                  color="#00c8ff"
                  size="16"
                  class="right"
                />
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
        <view class="btns">
          <text class="btn">放弃邀约</text>
          <text class="btn">完成邀约</text>
        </view>
      </view>
    </template>
    <template v-if="currentPage === 'user'">
      <userDetail @changeCurrentPage="() => (currentPage = 'invite')" />
    </template>
  </view>
</template>
<script>
import card from "@/components/card";
import userDetail from "./userDetail.vue";
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
      currentPage: "invite",
    };
  },
  components: {
    card,
    userDetail,
  },
  onLoad() {},
  methods: {
    handChange(val) {
      console.log(val);
    },
    goBack() {
      this.$emit("update:isShow", false);
    },
    handleSelect() {
      this.currentPage = "user";
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}

.between {
  justify-content: space-between;
}
.c-title {
  color: #d7d8e0;
  font-size: 24rpx;
}

.uni-checkbox .uni-checkbox-input {
  background: #0060a9;
  border-radius: 4rpx;
  width: 36rpx;
  height: 36rpx;
}
.breadcrumb {
  font-size: 40rpx;
  font-family: MicrosoftYaHei;
  color: rgba(0, 148, 179, 0.5);
  margin: 20rpx 0 28rpx 0;
  padding-left: 30rpx;
}
.invite-detail {
  .event-info {
    width: 84%;
    margin: 26rpx auto 0;
    .label-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      margin-bottom: 16rpx;
      .title {
        text-align: right;
        // width: 34%;
        color: #9fa6af;
      }
      .value {
        display: flex;
        flex: 1;
        padding-left: 20rpx;
        align-items: flex-end;
        .count {
          width: 100%;
          height: 48rpx;
          border-radius: 16rpx;
          border: 2rpx solid rgba(230, 241, 255, 0.2);
          line-height: 48rpx;
          padding-left: 14rpx;
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
  .respond-count {
    display: flex;
    justify-content: space-between;
    margin-top: 18rpx;
    margin-bottom: 30rpx;
    .list-item {
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 60rpx;
        color: #32c5ff;
      }
      .title-value {
        margin-left: 14rpx;
        .title {
          font-size: 24rpx;
          font-family: MicrosoftYaHei;
          color: #9fa6af;
        }
        .value {
          margin-top: 14rpx;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .count {
            font-size: 32rpx;
            color: #32c5ff;
            font-family: square-font;
          }
          .unit {
            font-size: 28rpx;
            color: #0094b3;
            padding: 20rpx;
          }
        }
      }
    }
  }
  ::v-deep .u-divider {
    margin: 40rpx 0 22rpx !important;
  }
  // 筛选
  .user {
    .screen {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20rpx;
        font-size: 24rpx;
      }
    }
    &-list {
      padding-top: 30rpx;
    }
    &-list-item {
      background: rgba(0, 142, 181, 0.2);
      border-radius: 16rpx;
      padding: 20rpx 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 28rpx;
        margin-right: 4rpx;
        color: #0094b3;
      }
      .mid {
        flex: 1;

        &-name {
          font-size: 32rpx;
          font-family: MicrosoftYaHei;
          color: #e6f1ff;
          line-height: 24rpx;
        }
        &-bottom {
          margin-top: 10rpx;
          .status {
            width: 128rpx;
            height: 44rpx;
            background: #0091ff;
            border-radius: 10rpx;
            text-align: center;
            /* line-height: 44rpx; */
            display: inline-block;
            color: #ffffff;
          }
          .value {
            font-size: 32rpx;
            margin-left: 30rpx;
            color: #f7b500;
            font-family: square-font;
            .unit {
              font-size: 20rpx;
              color: #0094b3;
            }
          }
        }
      }
      .right {
        color: #00c8ff;
        // width: 80rpx;
        line-height: 70rpx;
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
      .btn {
        width: 240rpx;
        height: 90rpx;
        background: linear-gradient(360deg, #0145d4 0%, #00b2fd 100%);
        border-radius: 20rpx;
        margin: 0 auto;
        text-align: center;
        line-height: 90rpx;
        font-weight: bold;
        font-size: 40rpx;
        color: #ffffff;
        display: block;
      }
    }
  }
}
</style>
