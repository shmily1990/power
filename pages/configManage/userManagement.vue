<template>
  <view class="user-manage">
    <overview :data="data" />
    <u-search
      placeholder="搜索"
      v-model="searchText"
      :showAction="false"
    ></u-search>
    <userList :height="700" />
    <view class="bottom">
      <text class="btn">新建用户</text>
    </view>
  </view>
</template>

<script>
import overview from "@/components/overview";
import userList from "@/components/userList";
export default {
  data() {
    return {
      data: [
        {
          name: "用户总数",
          value: 230,
          unit: "家",
          icon: "icon-iconJSC_1_2",
        },
        {
          name: "参与用户",
          value: 319,
          unit: "个",
          icon: "icon-iconJSC_2_2",
        },
        {
          name: "参与度",
          value: 821,
          unit: "kw",
          icon: "icon-iconJSC_2_2",
        },
      ],
    };
  },
  components: {
    overview,
    userList,
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.user-manage {
  width: 100%;
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
