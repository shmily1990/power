<template>
  <view class="event-manage">
    <template v-if="!showEventDetail && !showUserDetail">
      <overview :data="data" />
      <u-search
        placeholder="搜索"
        v-model="searchText"
        :showAction="false"
        @search="queryInviteList"
      ></u-search>
      <event
        name="正在邀约"
        fontClass="icon-iconPZGL_YYGL_2-0-title"
        @eventSelect="handleSelect"
        :eventList="currentInviteList"
      />
      <event
        name="历史邀约"
        fontClass="icon-iconPZGL_YYGL_3-0-title"
        @eventSelect="handleSelect"
        :eventList="historyInviteList"
      />
      <view class="bottom" v-if="loginUserInfo.userType != 30">
        <text class="btn" @click="gotoInvitateManagePage">新建邀约</text>
      </view>
    </template>
    <inviteDetail :isShow.sync="showEventDetail" :inviteInfo="currentInviteInfo" v-if="showEventDetail && !showUserDetail" />
    <myInviteDetail @back="goBack" :inviteInfo="currentInviteInfo" v-if="!showEventDetail && showUserDetail" />
  </view>
</template>

<script>
import overview from "@/components/overview";
import event from "./component/event.vue";
import inviteDetail from "./inviteDetail.vue";
import myInviteDetail from "./user/myInviteDetail.vue"
import { uniScrollTop } from "@/utils/common.js";
import { getInviteTotal, getInvitePage } from "@/api/invite/index.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      data: [
        {
          name: "正在邀约",
          value: 0,
          unit: "条",
          icon: "icon-iconPZGL_YYGL_1-1",
        },
        {
          name: "当年完成",
          value: 0,
          unit: "条",
          icon: "icon-iconPZGL_YYGL_1-2",
        },
        {
          name: "总完成",
          value: 0,
          unit: "条",
          icon: "icon-iconPZGL_SJGL_1-3",
        },
      ],
      searchText: "",
      showEventDetail: false,
      currentInviteList: [],
      historyInviteList: [],
      currentInviteInfo: {},
      showUserDetail: false
    };
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ])
  },
  components: {
    overview,
    event,
    inviteDetail,
    myInviteDetail
  },
  watch: {
    showEventDetail(val) {
      if (!val) {
        this.queryInviteInfo()
        this.queryInviteList()
      }
    }
  },
  onReady() {
    this.queryInviteInfo()
    // 查询邀约列表
    this.queryInviteList()
  },
  methods: {
    // 查询邀约总览
    async queryInviteInfo() {
      const { resultData, resultCode } = await getInviteTotal({});
      if (!resultCode) {
        const { afootTotal, currentYearTotal, completeTotal} = resultData
        this.data =  [
          {
            name: "正在邀约",
            value: afootTotal,
            unit: "条",
            icon: "icon-iconPZGL_YYGL_1-1",
          },
          {
            name: "当年完成",
            value: currentYearTotal,
            unit: "条",
            icon: "icon-iconPZGL_YYGL_1-2",
          },
          {
            name: "总完成",
            value: completeTotal,
            unit: "条",
            icon: "icon-iconPZGL_SJGL_1-3",
          },
        ]
      }
    },
    // 查询邀约列表
    async queryInviteList() {
      const { resultData, resultCode } = await getInvitePage({
        eventName: this.searchText,
        pageIndex: 0,
        pageSize: 9999
      });
      if (!resultCode) {
        const { infoList } = resultData
        this.currentInviteList = []
        this.historyInviteList = []
        infoList.forEach(item => {
          // 	状态(10:已发起 20:已取消 30:已完成) 已发现属于正在邀约 其它属于历史邀约
          if (item.inviteState == 10) {
            this.currentInviteList.push(item)
          } else {
            this.historyInviteList.push(item)
          }
        })
      }
    },
    handleSelect(val) {
      this.currentInviteInfo = val
      this.showEventDetail = this.loginUserInfo.userType != 30;
      this.showUserDetail = this.loginUserInfo.userType == 30;
      uniScrollTop();
    },
    // 跳转到邀约管理页面
    gotoInvitateManagePage() {
      uni.switchTab({
        url: '/pages/invite/index',
      }
      )
    },
    goBack() {
      this.showUserDetail = false
      this.showEventDetail = false
    }
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
