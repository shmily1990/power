<template>
  <view class="tabs">
    <view class="uni-tab-menu">
      <view
        class="tab-item"
        v-for="(tab, index) in tabList"
        :key="tab.id"
        :id="tab.id"
        :ref="'tabitem' + index"
        :data-id="index"
        :data-current="index"
        @click="ontabtap"
        :class="{ curr: tabIndex == index }"
      >
        <image
          class="curr-img"
          src="@/static/images/cockpit/tab_curr.png"
        ></image>
        <view class="title">
          <text :class="['iconfont', tab.iconfont]"></text>{{ tab.name }}</view
        >
      </view>
    </view>
    <swiper
      class="tab-box"
      ref="swiper1"
      :current="tabIndex"
      :duration="300"
      @change="onswiperchange"
      @transition="onswiperscroll"
    >
      <swiper-item
          v-for="(item, index) in tabList"
          :key="index"
        >
        <scroll-view scroll-y="true" class="swiper-one-list" :scroll-top="scrollTop">
          <view :id="'content-wrap' + index" class="wrap">
            <slot :name="`tab${index}`"></slot>
          </view>
        </scroll-view>
      </swiper-item>
    </swiper>
  </view>
</template>
<script>
import { uniScrollTop } from "@/utils/common.js";
export default {
  components: {},
  data() {
    return {
      backgroundColor: "linear-gradient(90deg, #102D58 0%, #144E6D 100%);",
      scrollTop: 0,
      tabIndex: 0,
      scrollInto: "",
      isChanging: false
    };
  },
  props: {
    tabList: {
      type: Array,
      default: [],
    },
  },
  onLoad: function (options) {},
  onShow() {},
  onReady() {},
  // 上拉刷新
  // onPullDownRefresh() {},

  methods: {
    // 切换tab
    ontabtap(e) {
      let index = e.target.dataset.current || e.currentTarget.dataset.current;
      this.switchTab(index);
    },
    switchTab(index) {
      if (this.tabIndex === index) {
        return;
      }
      this.tabIndex = index;
      this.scrollTop = 0;
      this.$emit("tabCurrent", this.tabIndex);
      uniScrollTop();
    },
    onswiperchange(e) {
      let index = e.target.current || e.detail.current;
      const { source } = e.detail
      if (source === 'touch') {
        this.tabIndex = index;
        this.$emit("tabCurrent", this.tabIndex);
        uniScrollTop();
      }
      
    },
    onswiperscroll() {},
    animationfinish() {},
    confirm(val) {},
  },
};
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  flex: 1;
  flex-direction: column;
}
.tab-box {
  flex: 1;
  height: 100%;
}

.uni-tab-item {
  /* #ifndef APP-PLUS */
  display: inline-block;
  /* #endif */
  flex-wrap: nowrap;
  padding-left: 40rpx;
  padding-right: 40rpx;
}

.swiper-item {
  flex: 1;
  flex-direction: column;
}

.swiper-one-list {
  height: 100%;
  width: 100%;
}

.wrap {
  height: 100%;
  padding: 0 50rpx;
  // width: 100%;
  // margin-top: 40rpx;
}
.uni-tab-menu {
  // height: 40px;
  display: flex;
  justify-content: space-around;
  padding: 60rpx 50rpx 0;
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
      .title {
        color: #fff;
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
      color: #9fa6af;
    }
    .iconfont {
      &::before {
        margin-right: 12rpx;
        font-size: 40rpx;
      }
    }
  }
}
</style>
