<template>
  <view class="uni-page">
    <navbar
      class="header customNavBar"
      title="快速预约"
      @onBack="goBack"
    ></navbar>
    <tab-swiper
      :tabList="tabList"
      class="container"
      @tabCurrent="tabCurrent"
      refs="tabs"
    >
      <template slot="tab0" v-if="tabIdx == 0">
        <eventDetail ref="child" />
      </template>
      <template slot="tab1" v-if="tabIdx == 1">
        <inviteManage @changeTab="changeTab" v-if="loginUserInfo.userType != 30" />
        <uMyInviteManage v-else />
      </template>
    </tab-swiper>
    <u-no-network />
  </view>
</template>

<script>
import tabSwiper from "@/components/tabSwiperBar";
import eventDetail from "./eventDetail.vue";
import inviteManage from "./inviteManage.vue";
import navbar from "@/components/topNav.vue"; //引入组件
import uMyInviteManage from "./myInviteManage.vue"
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  components: {
    uMyInviteManage,
    eventDetail,
    inviteManage,
    navbar,
    tabSwiper,
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
            id: "tab01",
            name: "事件详情",
            iconfont: "icon-iconKSYY_SJXQ_active",
            newsid: 0,
          },
          {
            id: "tab02",
            name: "我的邀约",
            iconfont: "icon-iconKSYY_YYGL_inactive",
            newsid: 23,
          }
        ]
      }
      return [
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
        }
      ]
    }
  },
  onLoad() {},
  onShow: function (e) {
    this.onRefresh()
  },
  async onPullDownRefresh() {
    if (this.$refs.child) {
      await this.$refs.child.getData()
      uni.stopPullDownRefresh();
    }
  },
  methods: {
    /**
     * @description 切换刷新页面
     */
    onRefresh() {
      this.$refs.child && this.$refs.child.getData()
    },
    /**
     * @description 切换tab
     */
    changeTab() {
      setTimeout(() => {
        uni
          .createSelectorQuery()
          .in(this)
          .select(".container")
          ._component.$children[1].switchTab(0);
      }, 500);
    },
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
