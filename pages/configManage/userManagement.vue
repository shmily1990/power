<template>
  <view class="user-manage">
    <template v-if="currentType === 'index'">
      <overview :data="data" />
      <u-search
        placeholder="搜索"
        v-model="searchText"
        :showAction="false"
      ></u-search>
      <userList :height="700" @selectUser="handleSelect" :data="user" />
      <view class="bottom">
        <text class="btn" @click="create">新建用户</text>
      </view>
    </template>
    <createUserForm
      :currentType.sync="currentType"
      v-if="currentType === 'create'"
    />
    <userResponseDetail
      :currentType.sync="currentType"
      v-if="currentType === 'detail'"
      :userId="userId"
    />
  </view>
</template>

<script>
import overview from "@/components/overview";
import userList from "@/components/userList";
import createUserForm from "./component/createUser.vue";
import userResponseDetail from "./userResponseDetail.vue";
import { getUserList } from "@/api/user/index.js";
import { uniScrollTop } from "@/utils/common.js";
export default {
  data() {
    return {
      userTotal: 0, // 总用户数
      partakeTotal: 0, // 参与用户
      ratio: 0, // 参与占比
      user: [], // 用户列表
      searchText: "",
      currentType: "index", // 当前展示
      data: [
        {
          name: "用户总数",
          value: 0,
          unit: "家",
          icon: "icon-iconPZGL_YHGL_1-1",
        },
        {
          name: "参与用户",
          value: 0,
          unit: "个",
          icon: "icon-iconPZGL_YHGL_1-2",
        },
        {
          name: "参与度",
          value: 0,
          unit: "%",
          icon: "icon-iconPZGL_YHGL_1-3",
        },
      ],
      visableCreateModal: true,
      userId: null,
    };
  },
  components: {
    overview,
    userList,
    createUserForm,
    userResponseDetail,
  },
  onReady() {
    this.queryUserList();
  },
  methods: {
    // 查询用户列表
    async queryUserList() {
      const {
        resultData: { userTotal, partakeTotal, ratio, user },
      } = await getUserList({
        pageIndex: 0,
        pageSize: 999,
        userName: this.searchText,
      });
      this.user = user.map(item => {
        return {
          ...item,
          statusName: item.userType
        }
      });
      this.data = [
        {
          name: "用户总数",
          value: userTotal || 20,
          unit: "家",
          icon: "icon-iconPZGL_YHGL_1-1",
        },
        {
          name: "参与用户",
          value: partakeTotal,
          unit: "个",
          icon: "icon-iconPZGL_YHGL_1-2",
        },
        {
          name: "参与度",
          value: ratio,
          unit: "%",
          icon: "icon-iconPZGL_YHGL_1-3",
        },
      ];
    },
    handleSelect(item) {
      this.currentType = "detail";
      this.userId = item.userId;
      uniScrollTop();
    },
    create() {
      this.currentType = "create";
      uniScrollTop();
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
