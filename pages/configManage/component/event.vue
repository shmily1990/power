<template>
  <view class="invite-event-info">
    <List :titleTxt="name" :fontClass="fontClass">
      <view class="card-conent">
        <scroll-view :scroll-y="true" class="event-list">
          <view
            class="event-list-item"
            v-for="(item, index) in eventList"
            :key="item.inviteId"
            @click="handleSelectEvent(item)"
          >
            <view class="left" @click.stop="handleSelect(item)">
              <text class="order">{{ (index + 1) < 10 ? 'N0' + (index + 1) : (index + 1) }}</text>
              <view class="drop-icon">
                <u-icon
                  :name="
                    item.inviteId === selectOrder
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
              <template v-if="selectOrder === item.inviteId">
                <view class="label-value">
                  <text class="title">调控指标</text>
                  <view class="value">
                    <text class="count">{{ item.target }}</text>
                    <text class="unit">kw</text>
                  </view>
                </view>
                <view class="label-value">
                  <text class="title">当前响应用户</text>
                  <view class="value">
                    <text class="count">{{ item.currentUserTotal }}</text>
                    <text class="unit">户</text>
                  </view>
                </view>
                <view class="label-value">
                  <text class="title">当前响应指标</text>
                  <view class="value">
                    <text class="count">{{ item.currentTargetTotal }}</text>
                    <text class="unit">kw</text>
                  </view>
                </view>
              </template>
            </view>
          </view>
        </scroll-view>
      </view>
    </List>
  </view>
</template>

<script>
import List from "@/components/list.vue";
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
  onReady() {},
  methods: {
    handleSelectEvent(item) {
      this.$emit("eventSelect", item);
    },
    handleSelect(item) {
      this.selectOrder = item.inviteId === this.selectOrder ? "" : item.inviteId;
    }
  },
};
</script>

<style lang="scss" scoped>
.invite-event-info {
  .card-head {
    margin-bottom: 22rpx;
  }
  .event-list {
    max-height: 556rpx;
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
