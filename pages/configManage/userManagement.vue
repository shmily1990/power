<template>
  <view class="user-manage">
    <template v-if="!visableCreateModal">
      <overview :data="data" />
      <u-search
        placeholder="搜索"
        v-model="searchText"
        :showAction="false"
      ></u-search>
      <userList :height="700" />
      <view class="bottom">
        <text class="btn" @click="create">新建用户</text>
      </view>
    </template>
    <createUserForm v-else />
  </view>
</template>

<script>
import overview from "@/components/overview";
import userList from "@/components/userList";
import createUserForm from "./component/createUser.vue";
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
      visableCreateModal: true,
    };
  },
  components: {
    overview,
    userList,
    createUserForm,
  },
  onLoad() {},
  methods: {
    create() {
      this.visableCreateModal = true;
    },
  },
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
