<template>
  <view class="resource-scatter">
    <overview :data="data" />
    <u-search
      placeholder="搜索"
      v-model="searchText"
      :showAction="false"
      v-if="!showDetail"
      @search="handSearch"
    ></u-search>
    <userList @selectUser="handleSelect" v-if="!showDetail" :data="userList" height="580" />
    <resourceUserDetail @goBack="goBack" :info="detailInfo" v-else />
  </view>
</template>

<script>
import overview from "@/components/overview";
import userList from "@/components/userList";
import resourceUserDetail from "./resourceUserDetail.vue";
import { queryResourceDistribution } from "@/api/cockpit/index.js";
import { getUserList } from "@/api/user/index.js";

export default {
  data() {
    return {
      data: [
        {
          name: "响应用户",
          value: 0,
          unit: "家",
          icon: "icon-iconJSC_ZYFB_1-1",
        },
        {
          name: "响应设备",
          value: 0,
          unit: "个",
          icon: "icon-iconJSC_ZYFB_1-2",
        },
        {
          name: "总最大响应",
          value: 0,
          unit: "kw",
          icon: "icon-iconJSC_ZYFB_1-3",
        },
      ],
      showDetail: false,
      userList: [],
      searchText: '',
      userId: '',
      detailInfo: {}
    };
  },
  components: {
    overview,
    userList,
    resourceUserDetail,
  },
  onLoad() {},
  onReady() {
    this.queryData()
    this.queryUserList();
  },
  methods: {
    handSearch() {
      this.queryUserList()
    },
    // 查询用户列表
    async queryUserList() {
      const { resultCode, resultData: { user } } = await getUserList({
        pageIndex: 0,
        pageSize: 999,
        userName: this.searchText,
      });
      if (!resultCode) {
        this.userList = user.map(item => {
          return {
            ...item,
            statusName: item.partake == 1 ? '未申报' : '已申报' // 同参于2 不参与 1
          }
        });
      }
    },
    // 查询数据
    async queryData() {
      const { resultCode, resultData } = await queryResourceDistribution()
      if (!resultCode) {
        const { responseUserTotal, responseDeviceTotal, maxResponseLoadTotal } = resultData
        this.data = [
        {
          name: "响应用户",
          value: responseUserTotal,
          unit: "家",
          icon: "icon-iconJSC_ZYFB_1-1",
        },
        {
          name: "响应设备",
          value: responseDeviceTotal,
          unit: "个",
          icon: "icon-iconJSC_ZYFB_1-2",
        },
        {
          name: "总最大响应",
          value: maxResponseLoadTotal,
          unit: "kw",
          icon: "icon-iconJSC_ZYFB_1-3",
        },
      ]
      }
    },
    handleSelect(item) {
      this.detailInfo = item
      this.showDetail = true;
    },
    // 回退
    goBack() {
      this.showDetail = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-scatter {
  width: 100%;
}
</style>
