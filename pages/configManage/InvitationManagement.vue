<template>
  <view class="event-manage">
    <template v-if="!showEventDetail">
      <overview :data="data" />
      <u-search
        placeholder="搜索"
        v-model="searchText"
        :showAction="false"
      ></u-search>
      <event
        name="正在邀约"
        fontClass="icon-iconPZGL_YYGL_2-0-title"
        @eventSelect="handleSelect"
      />
      <event
        name="历史邀约"
        fontClass="icon-iconPZGL_YYGL_3-0-title"
        @eventSelect="handleSelect"
      />
      <view class="bottom">
        <text class="btn">新建邀约</text>
      </view>
    </template>
    <inviteDetail :isShow.sync="showEventDetail" v-else />
  </view>
</template>

<script>
import overview from "@/components/overview";
import event from "./component/event.vue";
import inviteDetail from "./inviteDetail.vue";
import { uniScrollTop } from "@/utils/common.js";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      data: [
        {
          name: "正在邀约",
          value: 230,
          unit: "条",
          icon: "icon-iconPZGL_YYGL_1-1",
        },
        {
          name: "当年完成",
          value: 319,
          unit: "条",
          icon: "icon-iconPZGL_YYGL_1-2",
        },
        {
          name: "总完成",
          value: 821,
          unit: "条",
          icon: "icon-iconPZGL_SJGL_1-3",
        },
      ],
      searchText: "",
      showEventDetail: false,
    };
  },
  components: {
    overview,
    event,
    inviteDetail,
  },
  methods: {
    handleSelect(val) {
      console.log(8989);
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
