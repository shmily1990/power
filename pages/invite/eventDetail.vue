<template>
  <view style="padding-bottom: 60rpx">
    <view class="select-box">
      <text class="big title" style="color: #e6f1ff99">事件选择</text>
      <view class="select" @click="open">
        <text class="targetText" v-show="target">{{ target }}</text>
        <view class="arrow"></view>
        <view class="list" v-if="show">
          <view class="item" v-for="(item, index) in lists" @click.stop="choose(item)" :key="index">
            <text class="itemtext">{{ item.eventName }}</text>
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
        <button class="mini-btn" type="default" size="mini" @click="operate('card1')">{{ getCardLabel("card1") }}</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">事件名称</view>
          <input class="uni-input" v-model="eventObj.eventName" :disabled="operateDisable.card1" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件来源</view>
          <input class="uni-input" v-model="eventObj.eventSource" :disabled="operateDisable.card1" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件类型</view>
          <input class="uni-input" v-model="eventObj.eventType" :disabled="operateDisable.card1" />
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
            </picker>-->
            <datePicker :timeValue.sync="eventObj.releaseDate" :disabled="operateDisable.card1" />
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
        <button class="mini-btn" type="default" size="mini" @click="operate('card2')">{{ getCardLabel("card2") }}</button>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <text class="iconfont icon-iconKSYY_SJXQ_2-1 curr-img"></text>
          <view class="title">
            <input class="uni-input number" v-model="eventObj.target" :disabled="operateDisable.card2" />
          </view>
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
        <button class="mini-btn" type="default" size="mini" @click="operate('card3')">{{ getCardLabel("card3") }}</button>
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
            </picker>-->
            <datePicker :timeValue.sync="eventObj.startDate" :disabled="operateDisable.card3" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">持续时长</view>
          <input class="uni-input account" v-model="eventObj.lastDate" :disabled="operateDisable.card3" />
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
        <button class="mini-btn" type="default" size="mini" @click="operate('card4')">{{ getCardLabel("card4") }}</button>
      </view>
      <view class="card-content">
        <!-- <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <datePicker :timeValue.sync="eventObj.startDate" :disabled="operateDisable.card4" />
          </view>
        </view> -->
        <view class="uni-form-item flex">
          <textarea
            :disabled="operateDisable.card4"
            v-model="eventObj.desc"
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
import { getEventInfo } from "@/api/invite/index.js";
import { queryEventByID, updateEvent } from "@/api/event/index.js";
const { dateTimePicker, getMonthDay } = require("@/utils/date.js");
import { mapMutations } from "vuex";

export default {
  components: {
    datePicker,
  },
  data() {
    return {
      lists: ["select1", "select2", "select3", "select4"],
      show: false,
      target: "",
      eventId: null,
      value: "2021-02-03 12:22",
      operateDisable: {
        card1: true,
        card2: true,
        card3: true,
        card4: true,
      },
      eventObj: {
        desc: "",
        eventID: null,
        eventName: "",
        eventSource: "",
        eventType: null,
        releaseDate: "",
        startDate: "",
        lastDate: null,
        target: "",
      },
    };
  },
  onReady() {
    // 查询事件列表
    this.getEventInfo();
  },
  mounted() {
    // this.initTime();
  },
  methods: {
    ...mapMutations(["setEventID"]),
    /**
     * @description 获取事件列表信息
     */
    async getEventInfo() {
      const { resultCode, resultData } = await getEventInfo();
      if (!resultCode) {
        this.lists = resultData;
        if (this.lists.length) {
          this.target = this.lists[0].eventName;
          this.eventID = this.lists[0].eventId;
          this.setEventID(this.eventID);
          this.queryEventByID(this.eventID);
        }
      }
    },
    /**
     * @description 获取事件详情
     * @param { number } id - 事件id
     */
    async queryEventByID(eventID) {
      const { resultCode, resultData } = await queryEventByID({ eventID });
      if (!resultCode) {
        resultData.startDate = resultData.startDate.slice(0, -3);
        resultData.releaseDate = resultData.releaseDate.slice(0, -3);
        this.eventObj = resultData;
      }
    },
    /**
     * @description 编辑卡片点击
     * @param { string } cardType - 对应点击卡片
     */
    operate(cardType) {
      if (!this.operateDisable[cardType]) {
        this.saveEvent();
        return false;
      }
      Object.keys(this.operateDisable).forEach((item) => {
        this.operateDisable[item] = true;
      });
      this.operateDisable[cardType] = !this.operateDisable[cardType];
    },
    /**
     * @description 设置卡片文案
     * @param { string } cardType - 对应点击卡片
     * @return { string } 卡片文案
     */
    getCardLabel(cardType) {
      return this.operateDisable[cardType] ? "编辑" : "保存";
    },
    /**
     * @description 保存当前编辑项内容
     */
    async saveEvent() {
      this.eventObj.startDate = this.eventObj.startDate.replace(/\./g,'-') 
      this.eventObj.releaseDate = this.eventObj.releaseDate.replace(/\./g,'-') 
      const { resultCode, resultData } = await updateEvent(this.eventObj);
      if (!resultCode) {
        Object.keys(this.operateDisable).forEach((item) => {
          this.operateDisable[item] = true;
        });
      }
    },
    open() {
      this.show = true;
    },
    choose(target) {
      this.target = target.eventName;
      this.eventID = target.eventId;
      this.setEventID(this.eventID);
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
.targetText {
  color: #19d8ff;
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
    border: 2rpx solid rgba(230, 241, 255, 0.2);

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
    .title {
      color: #9fa6af;
    }
    .itemtext {
      color: #ffffff80;
    }
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
        border: 0;
        margin-right: 28rpx;
        text-align: center;
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
      color: #19d8ff;
    }
  }
}
</style>
