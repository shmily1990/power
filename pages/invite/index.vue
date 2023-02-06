<template>
  <view>
    <!-- 使用组件  规范写法: top-nav -->
    <!--注： 顶部导航组件一定要写在顶部 -->
    <navbar
      class="header customNavBar"
      title="快速预约"
      @onBack="goBack"
    ></navbar>
    <view class="view-box">
      <CommTab :tabMenu="tabMenu">
        <template slot="tab0" class="content">
          <eventDetail />
        </template>
        <template slot="tab1" class="content">
          <inviteManage />
        </template>
      </CommTab>
    </view>
    <u-no-network />
  </view>
</template>

<script>
import imgBgURL from "@/static/images/cockpit/bg.png";
import CommTab from "@/components/tab.vue";
import eventDetail from "./eventDetail.vue";
import inviteManage from "./inviteManage.vue";
import navbar from "@/components/topNav.vue"; //引入组件

export default {
  components: {
    CommTab,
    eventDetail,
    inviteManage,
    navbar,
  },
  data() {
    return {
      imgBgURL,
      tabMenu: [
        {
          name: "事件详情",
          iconfont: "icon-iconKSYY_SJXQ_active",
        },
        {
          name: "邀约管理",
          iconfont: "icon-iconKSYY_YYGL_inactive",
        },
      ],
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
::v-deep .tab-box {
  margin: 0 100rpx;
}

.content {
  overflow-y: auto;
  height: 100%;
}

.view-box {
  padding: 40rpx 60rpx;
  width: 100%;
  min-height: 100vh;
  color: $uni-text-color;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
