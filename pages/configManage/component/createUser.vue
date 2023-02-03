<template>
  <view class="user-page">
    <view class="top">
      <text class="title">新建用户</text>
    </view>
    <card>
      <view class="card-head">
        <u-icon
          label="基本信息"
          name="clock"
          color="#ffffff"
          label-color="#ffffff"
          label-size="16"
          size="24"
        ></u-icon>
        <text class="btn">保存</text>
      </view>
      <view class="card-content">
        <u-form :model="form" ref="uForm" :label-style="style">
          <u-form-item label="用户名称"
            ><u-input v-model="form.name" :border-color="'#e6f1ff33'"
          /></u-form-item>
          <u-form-item label="用户地址"
            ><u-input v-model="form.intro"
          /></u-form-item>
          <u-form-item label="用户类型"
            ><u-input v-model="form.sex" type="select"
          /></u-form-item>
          <u-form-item label="用户户号"
            ><u-input v-model="form.count"
          /></u-form-item>
          <u-form-item label="联系人"
            ><u-input v-model="form.connet"
          /></u-form-item>
        </u-form>
      </view>
    </card>
  </view>
</template>
<script>
import card from "@/components/card";
export default {
  options: {
    styleIsolation: "shared",
  },
  components: {
    card,
  },
  data() {
    return {
      form: {
        name: "",
        intro: "",
        sex: "",
        count: "",
        connet: "",
      },
      style: {
        color: "#9FA6AF",
        fontSize: "24rpx",
        display: "block",
        textAlign: "right",
        width: "128rpx",
      },
      checkboxList: [
        {
          name: "苹果",
          checked: false,
          disabled: false,
        },
        {
          name: "雪梨",
          checked: false,
          disabled: false,
        },
        {
          name: "柠檬",
          checked: false,
          disabled: false,
        },
      ],
      radioList: [
        {
          name: "鲜甜",
          disabled: false,
        },
        {
          name: "麻辣",
          disabled: false,
        },
      ],
      radio: "",
      switchVal: false,
    };
  },
  onLoad() {},
  methods: {},
};
</script>
 
<style lang="scss" scoped>
.user-page {
  .top {
    margin: 20rpx 0 28rpx 0;
    .title {
      padding-left: 30rpx;
      font-size: 40rpx;
      font-family: MicrosoftYaHei;
      color: rgba(0, 148, 179, 0.5);
    }
  }
  ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 2rpx 9rpx !important;
    width: 380rpx;
    margin-left: 70rpx;
  }

  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .btn {
      width: 92rpx;
      height: 48rpx;
      background: rgba(0, 200, 255, 0.3);
      border-radius: 12rpx;
      display: block;
      text-align: center;
      font-size: 24rpx;
      color: #fff;
      line-height: 48rpx;
    }
  }
}
</style>
