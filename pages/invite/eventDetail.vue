<template>
  <view>
    <view class="select-box">
      <text class="big title">事件选择</text>
      <view class="select" @click="open">
        <text class="targetText" v-show="target">{{ target }}</text>
        <view class="arrow"></view>
        <view class="list" v-if="show">
          <view class="item" v-for="item in lists" @click.stop="choose(item)">
            <text class="itemtext">{{ item }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="card card1">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_YYGL_inactive"></text>
          <text class="itemtext">基本信息</text>
        </view>
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">事件名称</view>
          <input class="uni-input" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件来源</view>
          <input class="uni-input" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件类型</view>
          <input class="uni-input" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">发布时间</view>
          <!-- <input class="uni-input" /> -->
          <view class="uni-list-cell-db">
            <!-- <picker
              mode="multiSelector"
              :value="dateTime"
              @change="changeDateTime($event, 'first')"
              @columnchange="changeDateTimeColumn($event, 'first')"
              :range="dateTimeArray"
            >
              <view class="lableBox">
                <view class="choose-value uni-input">{{ timeStr }}</view>
              </view>
            </picker> -->
            <datePicker :timeValue.sync="value" :disabled="false" />
          </view>
        </view>
      </view>
    </view>
    <view class="card card2">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_SJXQ_2-0-title"></text>
          <text class="itemtext">调控指标</text>
        </view>
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <text class="iconfont icon-iconKSYY_SJXQ_2-1 curr-img"></text>
          <view class="title number">2000</view>
          <text class="itemtext">kw</text>
        </view>
      </view>
    </view>
    <view class="card card3">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_SJXQ_3-0-title"></text>
          <text class="itemtext">执行时间</text>
        </view>
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <!-- <picker
              mode="multiSelector"
              :value="dateTime1"
              @change="changeDateTime($event, 'second')"
              @columnchange="changeDateTimeColumn($event, 'second')"
              :range="dateTimeArray1"
            >
              <view class="lableBox">
                <view class="choose-value uni-input">{{ timeStr1 }}</view>
              </view>
            </picker> -->
            <datePicker :timeValue.sync="value" :disabled="false" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">持续时长</view>
          <input class="uni-input account" />
          <text class="itemtext">分钟</text>
        </view>
      </view>
    </view>
    <view class="card card4">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_SJXQ_4-0-title"></text>
          <text class="itemtext">事件描述</text>
        </view>
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <!-- <picker
              mode="multiSelector"
              :value="dateTime1"
              @change="changeDateTime($event, 'second')"
              @columnchange="changeDateTimeColumn($event, 'second')"
              :range="dateTimeArray1"
            >
              <view class="lableBox">
                <view class="choose-value uni-input">{{ timeStr1 }}</view>
              </view>
            </picker> -->
            <datePicker :timeValue.sync="value" :disabled="false" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <textarea
            class="textarea"
            placeholder-style="color:#19D8FF"
            placeholder="请输入内容"
            auto-height
          />
        </view>
      </view>
    </view>
  </view>
</template>

<script>
// import datePicker from "@/components/datePicker.vue";
import datePicker from "@/components/datePicker.vue";
const { dateTimePicker, getMonthDay } = require("@/utils/date.js");

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      lists: ["select1", "select2", "select3", "select4"],
      show: false,
      target: "",
      value: "2021-02-03 12:22",
    };
  },
  mounted() {
    // this.initTime();
  },
  methods: {
    open() {
      this.show = true;
    },
    choose(target) {
      this.target = target;
      this.show = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}

.select-box {
  display: flex;
  text-align: center;
  margin: 20rpx 0;
  justify-content: center;

  .select {
    position: relative;
    margin-left: 12rpx;
    width: 2 * 136rpx;
    height: 2 * 24rpx;
    border-radius: 16rpx;
    border: 1rpx solid #005066;

    .list {
      position: absolute;
      left: 0%;
      right: 0;
      top: 48rpx;
      background-color: #fff;
      min-height: 200rpx;
      max-height: 300rpx;
      overflow-y: auto;
      z-index: 10;

      .item {
        margin: 10rpx 0;
      }
    }

    .arrow {
      position: absolute;
      top: 20rpx;
      right: 10rpx;
      border: 12rpx solid transparent;
      border-top-color: #00c8ff;
    }
  }
}

.card {
  padding: 30rpx 30rpx 20rpx 30rpx;
  background: rgba(0, 142, 181, 0.15);
  border-radius: 16rpx;
  margin-bottom: 20rpx;

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
      font-weight: bold;
      .iconfont {
        font-size: 48rpx;
        margin-right: 18rpx;
        font-weight: normal;
      }
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
        border-radius: 16rpx;
        font-size: 44rpx;
        color: #f7b500;
        padding: 10rpx 100rpx;
        margin-right: 28rpx;
      }

      .curr-img {
        font-size: 68rpx;
        color: #07648d;
      }
    }

    .textarea {
      border-radius: 16rpx;
      border: 2rpx solid rgba(230, 241, 255, 0.2);
      padding: 20rpx;
      width: 400rpx;
      min-height: 104rpx;
    }
  }
}
</style>
