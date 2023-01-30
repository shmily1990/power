<template>
  <view>
    <view class="tab-box">
      <view v-for="(item, index) in tabMenu" :key="`tab${index}`">
        <view
          class="tab-item"
          @click="tabchange(index)"
          :class="{ curr: current == index }"
        >
          <image
            class="curr-img"
            src="@/static/images/cockpit/tab_curr.png"
          ></image>
          <view class="title">
            <text :class="['iconfont', item.iconfont]"></text
            >{{ item.name }}</view
          >
        </view>
      </view>
    </view>
    <swiper :current="swiperCurrent" @change="transition" class="swipeHeiht">
      <swiper-item class="swiper-item" v-for="(item, index) in tabMenu">
        <!-- <slot :name="tab" + index></slot> -->
        <!-- #ifdef H5  -->
        <!-- <slot :name="tab" + index></slot> -->
        <!-- #endif -->
        <!-- #ifdef MP -->
        <slot name="tab{{index}}"></slot>
        <!-- #endif -->
      </swiper-item>
    </swiper>
  </view>
</template>

<script>
import tab_curr from "@/static/images/cockpit/tab_curr.png";

export default {
  data() {
    return {
      tab_curr,
      swiperCurrent: 0,
      current: 0,
    };
  },
  props: {
    tabMenu: {
      type: Array,
      default: [],
    },
  },
  methods: {
    //拿到tab栏的下标 绑定给轮播图的index
    tabchange(e) {
      console.log(e);
      this.active = e;
      this.swiperCurrent = e;
    },
    //滑动swiper后的下标  绑定给tab栏index
    transition(e) {
      console.log(e);
      this.current = e.detail.current;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-box {
  display: flex;
  justify-content: space-between;
  .tab-item {
    width: 200rpx;
    height: 80rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 16rpx;
    position: relative;
    &.curr {
      height: 100rpx;
      width: 202rpx;
      background: transparent;
      color: #fff;
      .curr-img {
        opacity: 1;
      }
    }
    .curr-img {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      z-index: 0;
      opacity: 0;
    }
    .title {
      width: 200rpx;
      height: 80rpx;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28rpx;
      font-weight: bold;
    }
    .iconfont {
      &::before {
        margin-right: 12rpx;
        font-size: 40rpx;
      }
    }
  }
}
.swipeHeiht {
  height: calc(100vh - 180rpx);
}
</style>
