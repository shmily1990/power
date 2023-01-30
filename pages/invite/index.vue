<template>
  <view>
    <view
      class="view-box"
      :style="{
        backgroundImage: `url(${imgBgURL})`,
        backgroundSize: 'cover',
      }"
    >
      <CommTab :tabMenu="tabMenu">
        <template slot="tab0" class="content">
          <eventDetail />
        </template>
        <template slot="tab1" class="content">
          <eventDetail />
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
export default {
  components: {
    CommTab,
    eventDetail,
    inviteManage,
  },
  data() {
    return {
      imgBgURL,
      tabMenu: [
        {
          name: "事件详情",
        },
        {
          name: "邀约管理",
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