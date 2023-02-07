<template>
  <view>
    <!-- 使用组件  规范写法: top-nav -->
    <!--注： 顶部导航组件一定要写在顶部 -->
    <navbar
      class="header customNavBar"
      title="配置管理"
      @onBack="goBack"
    ></navbar>
    <view class="view-box">
      <CommTab :tabMenu="tabMenu" @tabCurrent="tabCurrent" ref="tabs">
        <template slot="tab0" v-if="tabIdx == 0">
          <invitation-management />
        </template>
        <template slot="tab1" v-if="tabIdx == 1">
          <event-management />
        </template>
        <template slot="tab2" v-if="tabIdx == 2">
          <user-management />
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
import invitationManagement from "./InvitationManagement.vue";
import userManagement from "./userManagement.vue";
import eventManagement from "./eventManagement.vue";
import navbar from "@/components/topNav.vue"; //引入组件
import { uniScrollTop } from "@/utils/common.js";
export default {
  components: {
    CommTab,
    invitationManagement,
    userManagement,
    eventManagement,
    navbar,
  },
  data() {
    return {
      tabIdx: 0,
      imgBgURL,
      tabMenu: [
        {
          name: "邀约管理",
          iconfont: "icon-iconJSC_active_ZYZL",
        },
        {
          name: "事件管理",
          iconfont: "icon-iconJSC_inactive_ZYFB",
        },
        {
          name: "用户管理",
          iconfont: "icon-iconJSC_inactive_TKNL",
        },
      ],
    };
  },
  onLoad() {},
  onShow: function (e) {
    this.tabIdx = 0;
    this.$refs.tabs.swiperCurrent = 0;
    uniScrollTop();
  },
  methods: {
    /**
     * 当前tab页码
     */
    tabCurrent(index) {
      this.tabIdx = index;
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
}
</style>
