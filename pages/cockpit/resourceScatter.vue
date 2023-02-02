<template>
  <view class="resource-scatter">
    <overview :data="data" />
    <u-search
      placeholder="搜索"
      v-model="searchText"
      :showAction="false"
      v-if="!showDetail"
    ></u-search>
    <userList @selectUser="handleSelect" v-if="!showDetail" />
    <resourceUserDetail @goBack="goBack" v-else />
  </view>
</template>

<script>
import overview from "@/components/overview";
import userList from "@/components/userList";
import resourceUserDetail from "./resourceUserDetail.vue";

export default {
  data() {
    return {
      data: [
        {
          name: "响应用户",
          value: 230,
          unit: "家",
          icon: "icon-iconJSC_1_2",
        },
        {
          name: "响应设备",
          value: 319,
          unit: "个",
          icon: "icon-iconJSC_2_2",
        },
        {
          name: "总最大响应",
          value: 821,
          unit: "kw",
          icon: "icon-iconJSC_2_2",
        },
      ],
      showDetail: false,
    };
  },
  components: {
    overview,
    userList,
    resourceUserDetail,
  },
  onLoad() {},
  methods: {
    handleSelect(val) {
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
