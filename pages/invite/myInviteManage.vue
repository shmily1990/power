<template>
  <view class="event-manage">
    <template v-if="!showEventDetail">
      <event
        name="当前邀约"
        fontClass="icon-iconKSYY_SJXQ_active"
        @eventSelect="handleSelect"
        :eventList="currentInviteList"
      />
    </template>
    <inviteDetail :isShow.sync="showEventDetail" :inviteInfo="currentInviteInfo" v-else />
  </view>
</template>

<script>
import event from "./event.vue"
import inviteDetail from "./inviteDetail.vue"
import { uniScrollTop } from "@/utils/common.js";
import { customerInvite } from "@/api/customer/index.js";

export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      showEventDetail: false,
      currentInviteList: [],
      historyInviteList: [],
      currentInviteInfo: {}
    };
  },
  components: {
    event,
    inviteDetail
  },
  watch: {
    showEventDetail(val) {
      if (!val) {
        // this.queryInviteInfo()
        this.queryInviteList()
      }
    }
  },
  onReady() {
    // 查询邀约列表
    this.queryInviteList()
  },
  methods: {
    // 查询邀约列表
    async queryInviteList() {
      const { resultData, resultCode } = await customerInvite();
      if (!resultCode) {
        this.currentInviteList = resultData || []
      }
    },
    handleSelect(val) {
      this.currentInviteInfo = val
      this.showEventDetail = true;
      uniScrollTop();
    },
  },
};
</script>

<style lang="scss" scoped>
.event-manage {
  .bottom {
    margin-top: 28rpx;
    .btn {
      width: 440rpx;
      height: 90rpx;
      background: linear-gradient(360deg, #0145d4 0%, #00b2fd 100%);
      border-radius: 20rpx;
      margin: 0 auto;
      text-align: center;
      line-height: 90rpx;
      font-weight: bold;
      font-size: 40rpx;
      color: #ffffff;
      display: block;
    }
  }
}
</style>
