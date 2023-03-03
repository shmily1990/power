<template>
  <view class="event-info">
    <List :titleTxt="name" :fontClass="fontClass">
      <view class="card-conent">
        <view class="event-list">
          <view
            class="event-list-item"
            v-for="(item, index) in eventList"
            :key="item.eventID"
            @click="handleSelectEvent(item)"
          >
            <view class="left" @click.stop="handleSelect(item)">
              <text class="order">{{ (index + 1) < 10 ? 'W0' + (index + 1) : 'W' + (index + 1) }}</text>
              <view class="drop-icon">
                <u-icon
                  :name="
                    item.order === selectOrder
                      ? 'arrow-down-fill'
                      : 'play-right-fill'
                  "
                  color="#ffffff"
                  size="9"
                ></u-icon>
              </view>
            </view>
            <view class="right">
              <view class="label-value">
                <text class="title">事件名称</text>
                <view class="value">
                  <text class="count">{{ item.eventName }}</text>
                </view>
              </view>
              <template v-if="selectOrder === item.order">
                <view class="label-value">
                  <text class="title">调控指标</text>
                  <view class="value">
                    <text class="count">{{ item.target }}</text>
                    <text class="unit">kw</text>
                  </view>
                </view>
                <view class="label-value">
                  <text class="title">开始时间</text>
                  <view class="value">
                    <text class="count">{{ item.startDate }}</text>
                  </view>
                </view>
                <view class="label-value">
                  <text class="title">持续时间</text>
                  <view class="value">
                    <text class="count" style="width: 160rpx">{{
                      item.lastDate
                    }}</text>
                    <text class="unit">分钟</text>
                  </view>
                </view>
                <view class="label-value event-des">
                  <text class="title">事件描述</text>
                  <view class="value">
                    <text class="count">{{ item.desc }}</text>
                  </view>
                </view>
              </template>
            </view>
          </view>
        </view>
      </view>
    </List>
  </view>
</template>

<script>
import List from "@/components/list";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      selectOrder: "",
    };
  },
  components: {
    List,
  },
  props: {
    name: {
      type: String,
      default: "标题",
    },
    fontClass: {
      type: String,
      default: "",
    },
    eventList: {
      type: Array,
      default: [],
    }
  },
  onReady() {
    // this.getEventList();
  },
  methods: {
    handleSelectEvent(item) {
      this.$emit("eventSelect", item);
    },
    handleSelect(item) {
      this.selectOrder = item.order === this.selectOrder ? "" : item.order;
    },
    getEventList() {
      // this.eventList = [
      //   {
      //     order: "W01",
      //     name: "event7789",
      //     quota: 2000,
      //     startTime: "2022-10-02 13:00:00",
      //     cxsj: 60,
      //     des: "22年这是放的描述",
      //   },
      //   {
      //     order: "W02",
      //     name: "event7789",
      //     quota: 2000,
      //     startTime: "2022-10-02 13:00:00",
      //     cxsj: 60,
      //     des: "22年这是放的描述",
      //   },
      //   {
      //     order: "W03",
      //     name: "event7789",
      //     quota: 2000,
      //     startTime: "2022-10-02 13:00:00",
      //     cxsj: 60,
      //     des: "22年这是放的描述",
      //   },
      //   {
      //     order: "W04",
      //     name: "event7789",
      //     quota: 2000,
      //     startTime: "2022-10-02 13:00:00",
      //     cxsj: 60,
      //     des: "22年这是放的描述",
      //   },
      // ];
      // console.log(777);
    },
  },
};
</script>

<style lang="scss" scoped>
.event-info {
  .card-head {
    margin-bottom: 22rpx;
  }
  .event-list {
    max-height: 456rpx;
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
          padding: 7rpx 3rpx;
        }
        .drop-icon {
          width: 32rpx;
          height: 32rpx;
          border: 2rpx solid;
          border-color: rgba(0, 142, 181, 0.15);
          display: flex;
          justify-content: center;
          border-radius: 50%;
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
