<template>
  <view class="invite-event-info">
    <card>
      <view class="card-head">
        <u-icon
          :label="name"
          name="clock"
          color="#ffffff"
          label-color="#ffffff"
          label-size="16"
          size="24"
        ></u-icon>
      </view>
      <view class="card-conent">
        <view class="event-list">
          <view
            class="event-list-item"
            v-for="(item, index) in eventList"
            :key="index"
            @click="handleSelectEvent(item)"
          >
            <view class="left" @click.stop="handleSelect(item)">
              <text class="order">{{ item.order }}</text>
              <u-icon name="play-circle" color="#ffffff" size="16"></u-icon>
            </view>
            <view class="right">
              <view class="label-value">
                <text class="title">事件名称</text>
                <view class="value">
                  <text class="count">{{ item.name }}</text>
                </view>
              </view>
              <template v-if="selectOrder === item.order">
                <view class="label-value">
                  <text class="title">调控指标</text>
                  <view class="value">
                    <text class="count">{{ item.quota }}</text>
                    <text class="unit">kw</text>
                  </view>
                </view>
                <view class="label-value">
                  <text class="title">当前响应用户</text>
                  <view class="value">
                    <text class="count">{{ item.startTime }}</text>
                    <text class="unit">户</text>
                  </view>
                </view>
                <view class="label-value">
                  <text class="title">当前响应指标</text>
                  <view class="value">
                    <text class="count">{{ item.cxsj }}</text>
                    <text class="unit">kw</text>
                  </view>
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </card>
  </view>
</template>

<script>
import card from "@/components/card";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      eventList: [],
      selectOrder: "",
    };
  },
  components: {
    card,
  },
  props: {
    name: {
      type: String,
      default: "标题",
    },
  },
  onReady() {
    this.getEventList();
  },
  methods: {
    handleSelectEvent(item) {
      console.log(item);
      this.$emit("eventSelect", item);
    },
    handleSelect(item) {
      this.selectOrder = item.order === this.selectOrder ? "" : item.order;
    },
    getEventList() {
      this.eventList = [
        {
          order: "W01",
          name: "event7789",
          quota: 2000,
          startTime: "20",
          cxsj: 60,
        },
        {
          order: "W02",
          name: "event7789",
          quota: 2000,
          startTime: "20",
          cxsj: 60,
        },
        {
          order: "W03",
          name: "event7789",
          quota: 2000,
          startTime: "20",
          cxsj: 60,
        },
        {
          order: "W04",
          name: "event7789",
          quota: 2000,
          startTime: "20",
          cxsj: 60,
        },
      ];
      console.log(777);
    },
  },
};
</script>

<style lang="scss" scoped>
.invite-event-info {
  .card-head {
    margin-bottom: 22rpx;
  }
  .event-list {
    height: 556rpx;
    overflow: auto;
    &-item {
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
        padding-left: 50rpx;
        margin-top: -7rpx;
        .label-value {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 24rpx;
          margin-bottom: 16rpx;
          .title {
            text-align: right;
            width: 34%;
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
        .event-des {
          flex-direction: column;
          align-items: flex-start;
          .value {
            width: 86%;
            margin-left: 42rpx;
            margin-top: 10rpx;
            .count {
              display: block;
              min-height: 98rpx;
            }
          }
        }
      }
    }
  }
}
</style>
