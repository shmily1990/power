<template>
  <view class="uni-page">
    <!-- 使用组件  规范写法: top-nav -->
    <!--注： 顶部导航组件一定要写在顶部 -->
    <navbar
      class="header customNavBar"
      title="配置管理"
    ></navbar>
    <!-- <view class="view-box"> -->
      <tab-swiper :tabList="tabList" class="container" @tabCurrent="tabCurrent" refs="tabs">
        <template slot="tab0" v-if="tabIdx == 0">
          <invitation-management />
        </template>
        <template slot="tab1" v-if="tabIdx == 1">
          <event-management />
        </template>
        <template slot="tab2" v-if="tabIdx == 2" >
          <user-management v-if="loginUserInfo.userType != 30" />
          <myResource v-else />
        </template>
      </tab-swiper>
    <u-no-network />
  </view>
</template>

<script>
import { getUserInfo } from "@/api/login/index.js";
import invitationManagement from "./InvitationManagement.vue";
import userManagement from "./userManagement.vue";
import eventManagement from "./eventManagement.vue";
import navbar from "@/components/topNav.vue"; //引入组件
import tabSwiper from '@/components/tabSwiperBar'
import myResource from "./user/myResource.vue"
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  components: {
    invitationManagement,
    userManagement,
    eventManagement,
    navbar,
    tabSwiper,
    myResource
  },
  data() {
    return {
      tabIdx: 0
    };
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ]),
    tabList() {
      const { userType } = this.loginUserInfo
      if (userType == 30) { // 30 用户 10管理员，20 子管理员
        return [
          {
            name: "邀约管理",
            iconfont: "icon-iconJSC_active_ZYZL",
            id: "tab01",
            newsid: 0,
          },
          {
            name: "事件管理",
            iconfont: "icon-iconJSC_inactive_ZYFB",
            id: "tab02",
            newsid: 10,
          },
          {
            name: "资源管理",
            iconfont: "icon-iconJSC_inactive_TKNL",
            id: "tab03",
            newsid: 30,
          },
        ]
      }
      return [
        {
          name: "邀约管理",
          iconfont: "icon-iconJSC_active_ZYZL",
          id: "tab01",
          newsid: 0,
        },
        {
          name: "事件管理",
          iconfont: "icon-iconJSC_inactive_ZYFB",
          id: "tab02",
          newsid: 10,
        },
        {
          name: "用户管理",
          iconfont: "icon-iconJSC_inactive_TKNL",
          id: "tab03",
          newsid: 30,
        },
      ]
    }
  },
  onLoad() {},
  onShow: function (e) {
    // this.tabIdx = 0;
    // this.$refs.tabs.swiperCurrent = 0;
    // uniScrollTop();
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
