<template>
  <view class="user-list">
    <scroll-view scroll-y="true" class="scroll-box" :style="currentStyle">
      <List
        v-for="(item, index) in data"
        :key="item.userId"
        :titleTxt="item.userName"
        bordered
      >
        <template slot="optBtn">
          <view
            class="card-status flex center"
            :style="{
              background: status[index].bg,
              color: status[index].color,
            }"
          >
            <u-icon
              :label="status[index].text"
              labelSize="24rpx"
              :labelColor="status[index].color"
              space="15rpx"
              size="15px"
              :color="status[index].color"
              :name="status[index].uview"
            ></u-icon>
          </view>
        </template>
        <view class="card-conent flex between" @click="handleSelect(item)">
          <view class="item load">
            <view class="icon-t"
              ><text class="iconfont icon-iconDR_quick_active"></text
              ><text class="txt">快速响应</text></view
            >
            <text class="value">{{ item.fastResponse }}</text>
          </view>
          <view class="item response">
            <view class="icon-t"
              ><text class="iconfont icon-iconDR_day_active"></text
              ><text class="txt">日内响应</text></view
            >
            <text class="value">{{ item.dayResponse }}</text>
          </view>
          <view class="item max-response">
            <view class="icon-t"
              ><text class="iconfont icon-iconDR_long_active"></text
              ><text class="txt">中长期响应</text></view
            >
            <text class="value">{{ item.maxResponse }}</text>
          </view>
        </view>
      </List>
    </scroll-view>
  </view>
</template>

<script>
import card from "@/components/card";
import List from "@/components/list.vue";
export default {
  options: {
    styleIsolation: "shared",
  },
  props: {
    height: {
      type: Number,
      default: 550,
    },
    data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      currentStyle: ``,
      status: {
        1: {
          text: "已申报",
          bg: "rgba(13,255,154,0.1)",
          color: "#0DFF9A",
          iconf: "icon-iconElementConfirm",
          uview: "checkmark-circle",
        },
        0: {
          text: "未申报",
          bg: "rgba(247,181,0,0.1)",
          color: "#F7B500",
          iconf: "icon-iconElementNotice",
          uview: "error-circle",
        },
      },
      userList: [
        {
          name: "上海大学1号门",
        },
        {
          name: "上海大学2号门",
        },
        {
          name: "上海大学3号门",
        },
        {
          name: "上海大学4号门",
        },
        {
          name: "上海大学5号门",
        },
        {
          name: "上海大学6号门",
        },
        {
          name: "上海大学7号门",
        },
      ],
    };
  },
  components: {
    card,
    List,
  },
  onReady() {
    // this.getEventList();
    this.currentStyle = {
      height: `calc(100vh - ${this.height}rpx)`,
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
      this.$emit("selectUser", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  ::v-deep .u-divider {
    margin: 12rpx 0 !important;
  }
  .load {
    color: $uni-color-load;
  }
  .response {
    color: $uni-color-response;
  }
  .max-response {
    color: $uni-color-max-response;
  }
  .card-status {
    width: 160rpx;
    height: 52rpx;
    border-radius: 10rpx;
    font-size: 24rpx;
    text-align: center;
    line-height: 52rpx;
    .iconfont {
      margin-right: 20rpx;
    }
  }
  .card-conent {
    // height: 109rpx;
    .item {
      margin-top: 10rpx;
      .icon-t {
        font-size: 24rpx;

        .iconfont {
          font-size: 30rpx;
          margin-right: 10rpx;
        }
        .txt {
          color: #9fa6af;
        }
      }
      .value {
        height: 40rpx;
        background: rgba(0, 142, 181, 0.2);
        border-radius: 8rpx;
        display: block;
        font-size: 28rpx;
        margin-top: 10rpx;
        font-family: square-font;
        text-align: center;
      }
    }
  }
}
</style>
