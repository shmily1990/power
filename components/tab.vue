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
          <text class="iconfont icon-gongdidingwei">{{ item.name }}</text>
        </view>
      </view>
    </view>
    <swiper :current="swiperCurrent" @change="transition" class="swipeHeiht">
      <swiper-item class="swiper-item">
        <slot name="tab0"></slot>
      </swiper-item>
      <swiper-item class="swiper-item">
        <slot name="tab1"></slot>
      </swiper-item>
      <swiper-item class="swiper-item">
        <slot name="tab2"></slot>
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
      tabMenu: [
        {
          name: "爱情",
        },
        {
          name: "搞笑",
        },
        {
          name: "科幻",
        },
      ],
      swiperCurrent: 0,
      current: 0,
    };
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
    .iconfont {
      width: 200rpx;
      height: 80rpx;
      position: absolute;
      z-index: 1;
      left: 0;
      top: 0;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>