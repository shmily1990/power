<template>
  <view>
    <view class="card card1">
      <view class="card-title">
        <view class="titleleft">
          <image class="curr-img" src="@/static/user.png"></image>
          <text class="itemtext">关联事件信息</text>
        </view>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <image class="curr-img" src="@/static/user.png"></image>
          <text class="itemtext title">调控目标</text>
          <view class="title number">2000</view>
          <text class="itemtext">kw</text>
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件类型</view>
          <input class="uni-input" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="value" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">持续时长</view>
          <input class="uni-input account" />
          <text class="itemtext">分钟</text>
        </view>
      </view>
    </view>
    <view class="card card2">
      <view class="card-title">
        <view class="titleleft">
          <image class="curr-img" src="@/static/user.png"></image>
          <text class="itemtext">邀约截止日期</text>
        </view>
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">申报截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="value1" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">邀约截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="value2" />
          </view>
        </view>
      </view>
    </view>
    <view class="card card3">
      <view class="card-title">
        <view class="titleleft">
          <image class="curr-img" src="@/static/user.png"></image>
          <text class="itemtext">邀约用户选择</text>
        </view>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex header">
          <view class="user flex">
            <image class="curr-img" src="@/static/user.png"></image>
            <view class="uni-form-item">
              <text class="itemtext title">可参与用户</text>
              <view class="title"><text class="count">20</text>家</view>
            </view>
          </view>
          <view class="user flex">
            <image class="curr-img" src="@/static/user.png"></image>
            <view class="uni-form-item">
              <text class="itemtext title">总日内响应</text>
              <view class="title"><text class="numcount">433</text>kw</view>
            </view>
          </view>
        </view>
        <view class="check-title flex between">
          <view class="title"> 筛选 </view>
          <view class="check-choose">
            <checkbox-group @change="checkboxChange">
              <label class="flex">
                <checkbox value="cb" class="round" :checked="checkValue" />
                <view class="title c-title choose-title">
                  {{ chooseText }}
                </view>
              </label>
            </checkbox-group>
          </view>
        </view>
        <view class="check-title check-list">
          <view class="title flex check-arrow">
            <view class="arrow"></view>
            <label class="flex">
              <checkbox class="round" />
              <view class="title c-title"> 电管家集团 </view>
            </label>
          </view>
          <view class="check-choose">
            <view class="scroll-view">
              <scroll-view scroll-y="true" class="scroll-Y">
                <view
                  class="title flex between"
                  v-for="i in Array(10)"
                  :key="i"
                >
                  <label class="flex">
                    <checkbox class="round" />
                    <view class="title c-title"> 电管家某某用户A </view>
                  </label>
                  <view class="column"> <text class="title">95</text>kw </view>
                </view>
              </scroll-view>
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="bottom-btn" @click="createInvitat">发起邀约</view>
  </view>
</template>

<script>
import datapicker from "@/components/datePicker";
export default {
  components: {
    datapicker,
  },
  data() {
    return {
      value: "2021-02-03 12:22",
      value1: "2022-03-03 11:22",
      value2: "2023-04-01 10:18",
      checkboxValue: "",
      checkValue: false,
    };
  },
  onLoad() {},
  computed: {
    chooseText(val) {
      return this.checkValue ? "全不选" : "全选";
    },
  },
  methods: {
    checkboxChange(e) {
      console.log(e, this.checkValue);
      this.checkValue = e.detail.value.length > 0;
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

.uni-checkbox .uni-checkbox-input {
  background: #0060a9;
  border-radius: 4rpx;
  width: 36rpx;
  height: 36rpx;
}

.card {
  padding: 30rpx 30rpx 20rpx 30rpx;
  background: rgba(0, 142, 181, 0.15);
  border-radius: 16rpx;
  margin: 20rpx 0;

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .titleleft {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      color: #fff;
    }
  }

  .mini-btn {
    background: rgba(0, 200, 255, 0.3);
    border-radius: 12rpx;
    font-size: 24rpx;
    color: #e6f1ff;
    margin: 0;
  }

  .curr-img {
    width: 48rpx;
    height: 48rpx;
    margin-right: 16rpx;
  }

  .uni-input,
  .uni-list-cell-db {
    border-radius: 16rpx;
    border: 2rpx solid rgba(230, 241, 255, 0.2);
    padding: 6rpx 20rpx;
    font-size: 24rpx;
    color: #19d8ff;
    margin-left: 6rpx;
    width: 292rpx;
    height: 48rpx;
    line-height: 48rpx;
  }

  .account {
    width: 146rpx;
    margin-right: 20rpx;
  }

  .card-content {
    padding-left: 70rpx;

    .uni-form-item {
      margin-bottom: 12rpx;

      .title {
        font-size: 24rpx;
      }
      .number {
        background: rgba(0, 142, 181, 0.2);
        border-radius: 12rpx;
        font-size: 32rpx;
        color: #0094b3;
        padding: 10rpx 70rpx;
        margin-right: 20rpx;
        margin-left: 20rpx;
      }

      .curr-img {
        width: 68rpx;
        height: 60rpx;
      }

      .count {
        font-size: 32rpx;
        color: #19d8ff;
        margin-right: 20rpx;
      }

      .numcount {
        font-size: 32rpx;
        margin-right: 20rpx;
        color: #f7b500;
      }
    }
  }
}

.card3 .card-content {
  padding: 0;

  .header {
    margin: 0 46rpx 20rpx;
    padding-bottom: 20rpx;
    justify-content: space-between;
    border-bottom: 2rpx solid rgba(255, 255, 255, 0.2);
  }

  .check-title {
    margin: 20rpx 46rpx 26rpx;
  }

  .c-title {
    color: #d7d8e0;
    font-size: 28rpx;
  }

  .choose-title {
    width: 86rpx;
  }

  .scroll-view {
    margin: 0 20rpx 0 60rpx;
  }

  .check-list {
    .c-title {
      margin: 24rpx 0;
      margin-left: 24rpx;
    }
    .check-arrow {
      position: relative;
    }
  }

  .scroll-Y {
    height: 600rpx;
  }

  .column {
    font-size: 28rpx;
    font-weight: 500;
    color: #f7b500;
    margin-right: 12rpx;
  }

  .arrow {
    position: absolute;
    top: 40rpx;
    left: -36rpx;
    border: 12rpx solid transparent;
    border-top-color: #00c8ff;
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
</style>