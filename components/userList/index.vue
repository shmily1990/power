<template>
  <view class="user-list">
    <scroll-view
      scroll-y="true"
      class="scroll-box"
      :style="`height: calc(100vh - ${height}rpx)`"
    >
      <card v-for="(item, index) in userList" :key="index">
        <view @click="handleSelect(item)">
          <view class="card-head">
            <view class="card-head-title">{{ item.name }}</view>
            <view class="card-head-status">
              <u-icon
                label="已申报"
                name="checkmark-circle"
                color="#0DFF9A"
                label-color="#0DFF9A"
                label-size="12"
              ></u-icon>
            </view>
          </view>
          <u-divider color="#E6F1FF"></u-divider>
          <view class="card-conent">
            <view class="card-info-item">
              <u-icon
                label="可调负荷"
                name="setting"
                color="#0DFF9A"
                label-color="#9FA6AF"
                label-size="12"
              ></u-icon>
              <text class="value" :style="{ color: '#0DFF9A' }">360</text>
            </view>
            <view class="card-info-item">
              <u-icon
                label="日内响应"
                name="setting"
                color="#F7B500"
                label-color="#9FA6AF"
                label-size="12"
              ></u-icon>
              <text class="value" :style="{ color: '#F7B500' }">360</text>
            </view>
            <view class="card-info-item">
              <u-icon
                label="最大响应"
                name="setting"
                color="#FA6400"
                label-color="#9FA6AF"
                label-size="12"
              ></u-icon>
              <text class="value" :style="{ color: '#FA6400' }">360</text>
            </view>
          </view>
        </view>
      </card>
    </scroll-view>
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
  props: {
    height: {
      type: Number,
      default: 550,
    },
  },
  components: {
    card,
  },
  onReady() {
    // this.getEventList();
  },
  methods: {
    handleSelect(item) {
      this.$emit("selectUser", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.user-list {
  .scroll-box {
  }
  .card-head {
    display: flex;
    justify-content: space-between;
    // height: 90rpx;
    align-items: center;
    &-title {
      font-weight: bold;
      color: #e6f1ff;
      font-size: 32rpx;
    }
    &-status {
      height: 52rpx;
      background: rgba(13, 255, 154, 0.1);
      border-radius: 10px;
      width: fit-content;
      padding: 0 20rpx;
      display: flex;
    }
  }
  ::v-deep .u-divider {
    margin: 12rpx 0 !important;
  }
  .card-conent {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // height: 109rpx;
    .card-info-item {
      text-align: center;
      .value {
        height: 40rpx;
        background: rgba(0, 142, 181, 0.2);
        border-radius: 8rpx;
        display: block;
        margin-bottom: 12rpx;
        font-size: 28rpx;
        margin-top: 7rpx;
        font-family: square-font;
      }
    }
  }
}
</style>
