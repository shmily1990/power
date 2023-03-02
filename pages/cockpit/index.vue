<template>
  <view class="uni-page">
    <navbar
      class="header customNavBar"
      :background="backgroundColor"
      title="驾驶舱"
      @onBack="goBack"
    ></navbar>
    <tab-swiper :tabList="tabList" class="container" @tabCurrent="tabCurrent" refs="tabs">
      <template slot="tab0" v-if="tabIdx == 0">
        <resourceAll />
      </template>
      <template slot="tab1" v-if="tabIdx == 1">
        <resourceScatter />
      </template>
      <template slot="tab2" v-if="tabIdx == 2">
        <regulatoryAbility />
      </template>
    </tab-swiper>
  </view>
</template>
<script>
import navbar from "@/components/topNav.vue"; //引入组件
import resourceAll from "./resourceAll.vue";
import regulatoryAbility from "./regulatoryAbility.vue";
import resourceScatter from "./resourceScatter.vue";
import tabSwiper from '@/components/tabSwiperBar'

export default {
  components: {
    navbar,
    resourceAll,
    regulatoryAbility,
    resourceScatter,
    tabSwiper
  },
  data() {
    return {
      backgroundColor: "linear-gradient(90deg, #102D58 0%, #144E6D 100%);",
      tabList: [
        {
          id: "tab01",
          name: "资源总览",
          newsid: 0,
           iconfont: "icon-iconJSC_active_ZYZL",
        },
        {
          id: "tab02",
          name: "资源分布",
          newsid: 23,
           iconfont: "icon-iconJSC_active_ZYZL",
        },
        {
          id: "tab03",
          name: "调控能力",
          newsid: 223,
           iconfont: "icon-iconJSC_active_ZYZL",
        },
      ],
      tabIdx: 0,
      scrollInto: "",
    };
  },
  onLoad: function (options) {},
  onReady() {},
  methods: {
    /**
     * 当前tab页码
     */
    tabCurrent(index) {
      console.log(index)
      this.tabIdx = index;
    },
  },
};
</script>

<style lang="scss" scoped>
/* #ifndef APP-PLUS */
page {
  width: 100%;
  min-height: 100%;
  display: flex;
}

/* #endif */

.uni-page {
  flex: 1;
  flex-direction: column;
  overflow: hidden;
  display: flex;
  // background-color: #ffffff;
  height: 100vh;
  background: linear-gradient(90deg, #102d58 0%, #144e6d 100%);
}
.container {
  flex: 1;
  flex-direction: column;
  display: flex;
}
</style>
