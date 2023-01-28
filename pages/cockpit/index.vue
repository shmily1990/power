<template>
  <view>
    <!-- <view
      class="view-box"
      :style="{
        backgroundImage: `url(${imgBgURL})`,
        backgroundSize: 'cover',
      }"
    > -->
    <view
      class="view-box"
      :style="{
        backgroundImage: `url(${imgBgURL})`,
        backgroundSize: 'cover',
      }"
    >
      <CommTab>
        <template slot="tab0">
          <resourceAll />
        </template>
        <template slot="tab1">
          <text>999</text>
        </template>
        <template slot="tab2">
          <text>99129</text>
        </template>
      </CommTab>
    </view>
    <u-no-network />
  </view>
</template>

<script>
import { getUserInfo } from "@/api/login/index.js";
import imgBgURL from "@/static/images/cockpit/bg.png";
import CommTab from "@/components/tab.vue";
import resourceAll from "./resourceAll.vue";
export default {
  components: {
    CommTab,
    resourceAll,
  },
  data() {
    return {
      imgBgURL,
      ab: {
        ldd: "8",
        dd: "20",
      },
      tabMenu: [
        {
          name: "资源总览",
        },
        {
          name: "资源分布",
        },
        {
          name: "调控能力",
        },
      ],
      swiperCurrent: 0,
      current: 0,
    };
  },
  onLoad() {},
  methods: {
    //拿到tab栏的下标 绑定给轮播图的index
    tabchange(e) {
      console.log(e);
      this.swiperCurrent = e.index;
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
.view-box {
  padding: 40rpx 60rpx;
  width: 100%;
  min-height: 100vh;
  color: $uni-text-color;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
