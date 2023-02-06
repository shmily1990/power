<template>
  <view>
    <!-- 使用组件  规范写法: top-nav -->
    <!--注： 顶部导航组件一定要写在顶部 -->
    <navbar
      class="header customNavBar"
      :background="backgroundColor"
      title="驾驶舱"
      @onBack="goBack"
    ></navbar>
    <view class="view-box">
      <CommTab :tabMenu="tabMenu" @swiperCurrent="swiperCurrent">
        <template slot="tab0" class="content">
          <resourceAll :swiperIndex="swiperIndex" />
        </template>
        <template slot="tab1" class="content">
          <resourceScatter />
        </template>
        <template slot="tab2" class="content">
          <regulatoryAbility :swiperIndex="swiperIndex" />
        </template>
      </CommTab>
    </view>
    <u-no-network />
  </view>
</template>

<script>
import imgBgURL from "@/static/images/cockpit/bg.png";
import CommTab from "@/components/tab.vue";
import resourceAll from "./resourceAll.vue";
import regulatoryAbility from "./regulatoryAbility.vue";
import resourceScatter from "./resourceScatter.vue";
import navbar from "@/components/topNav.vue"; //引入组件
import { uniScrollTop } from "@/utils/common.js";

export default {
  components: {
    CommTab,
    resourceAll,
    resourceScatter,
    regulatoryAbility,
    navbar,
  },
  data() {
    return {
      imgBgURL,
      tabMenu: [
        {
          name: "资源总览",
          iconfont: "icon-iconJSC_active_ZYZL",
        },
        {
          name: "资源分布",
          iconfont: "icon-iconJSC_inactive_ZYFB",
        },
        {
          name: "调控能力",
          iconfont: "icon-iconJSC_inactive_TKNL",
        },
      ],
      backgroundColor: "linear-gradient(90deg, #102D58 0%, #144E6D 100%);",
      swiperIndex: 0,
    };
  },
  onLoad() {},
  methods: {
    goBack() {
      // 返回函数，内容大家自行修改编写
      // 返回顶部
      uniScrollTop();
    },
    swiperCurrent(value) {
      console.log("sssss", value);
      this.swiperIndex = value;
    },
  },
};
</script>

<style lang="scss" scoped>
.view-box {
  padding: 40rpx 50rpx;
  width: 100%;
  min-height: 100vh;
  color: $uni-text-color;
  flex-wrap: wrap;
  box-sizing: border-box;
  .content {
    overflow: auto;
    height: 100%;
  }
}
</style>
