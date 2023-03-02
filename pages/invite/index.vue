<template>
  <view class="uni-page">
    <navbar
      class="header customNavBar"
      title="快速预约"
      @onBack="goBack"
    ></navbar>
    <tab-swiper :tabList="tabList" class="container" @tabCurrent="tabCurrent" refs="tabs">
      <template slot="tab0" v-if="tabIdx == 0">
          <eventDetail />
        </template>
        <template slot="tab1" v-if="tabIdx == 1">
          <inviteManage />
        </template>
    </tab-swiper>
    <u-no-network />
  </view>
</template>

<script>
import tabSwiper from '@/components/tabSwiperBar'
import eventDetail from "./eventDetail.vue";
import inviteManage from "./inviteManage.vue";
import navbar from "@/components/topNav.vue"; //引入组件

export default {
  components: {
    eventDetail,
    inviteManage,
    navbar,
    tabSwiper
  },
  data() {
    return {
      tabIdx: 0,
      tabList: [
        {
          id: "tab01",
          name: "事件详情",
          iconfont: "icon-iconKSYY_SJXQ_active",
          newsid: 0,
        },
        {
          id: "tab02",
          name: "邀约管理",
          iconfont: "icon-iconKSYY_YYGL_inactive",
          newsid: 23,
        },
      ],
    };
  },
  onLoad() {},
  onShow: function (e) {},
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
