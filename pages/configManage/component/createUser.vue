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
      <view class="card-content base-info">
        <u-form :model="form" ref="uForm" :label-style="style">
          <u-form-item label="用户名称"
            ><u-input v-model="form.name" disabled
          /></u-form-item>
          <u-form-item label="用户地址"
            ><u-input v-model="form.intro"
          /></u-form-item>
          <!-- <u-form-item
            label="性别"
            prop="userInfo.sex"
            borderBottom
            @click="
              showSex = true;
              hideKeyboard();
            "
            ref="item1"
          >
            <u--input
              v-model="model1.userInfo.sex"
              disabled
              disabledColor="#ffffff"
              placeholder="请选择性别"
              border="none"
            ></u--input>
            <u-icon slot="right" name="arrow-right"></u-icon>
          </u-form-item> -->
          <u-form-item label="用户户号"
            ><u-input v-model="form.count"
          /></u-form-item>
          <u-form-item label="联系人"
            ><u-input v-model="form.connet"
          /></u-form-item>
        </u-form>
        <u-action-sheet
          :show="showSex"
          :actions="actions"
          title="请选择性别"
          description="如果选择保密会报错"
          @close="showSex = false"
          @select="sexSelect"
        >
        </u-action-sheet>
      </view>
    </card>
    <card>
      <view class="card-head">
        <u-icon
          label="响应配置"
          name="clock"
          color="#ffffff"
          label-color="#ffffff"
          label-size="16"
          size="24"
        ></u-icon>
        <text class="btn">保存</text>
      </view>
      <view class="card-content">
        <view class="sub-tab">
          <view class="sub-tab-item" @click="() => (currentTab = 1)">
            <u-icon
              label="可调负荷"
              name="setting"
              color="#0DFF9A"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text
              class="value"
              :style="{ color: currentTab === 1 ? '#0DFF9A' : '#00C8FF' }"
              >360</text
            >
          </view>
          <view class="sub-tab-item" @click="() => (currentTab = 2)">
            <u-icon
              label="日内响应"
              name="setting"
              color="#F7B500"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text
              class="value"
              :style="{ color: currentTab === 2 ? '#0DFF9A' : '#00C8FF' }"
              >360</text
            >
          </view>
          <view class="sub-tab-item" @click="() => (currentTab = 3)">
            <u-icon
              label="最大响应"
              name="setting"
              color="#FA6400"
              label-color="#9FA6AF"
              label-size="12"
            ></u-icon>
            <text
              class="value"
              :style="{ color: currentTab === 3 ? '#0DFF9A' : '#00C8FF' }"
              >360</text
            >
          </view>
        </view>
        <view class="device-info">
          <view class="device-info-head">
            <text class="order-title">序号</text>
            <text>响应设备</text>
            <text class="capacity-title">响应容量</text>
          </view>
          <view class="device-info-list">
            <view
              class="device-item"
              v-for="(item, index) in deviceList"
              :key="index"
            >
              <text class="order border">{{ index + 1 }}</text>
              <text class="name border">{{ item.name }}</text>
              <view class="capacity">
                <text class="value border">12</text>
                <view class="btns">
                  <u-icon
                    name="plus-circle"
                    color="#FAD800"
                    size="24"
                    @click="add(index)"
                  ></u-icon>
                  <u-icon
                    name="minus-circle"
                    color="#FAD800"
                    size="24"
                    @click="reduce(index)"
                    v-if="deviceList.length > 1"
                  ></u-icon>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </card>
    <card>
      <view class="card-head">
        <u-icon
          label="策略管理"
          name="clock"
          color="#ffffff"
          label-color="#ffffff"
          label-size="16"
          size="24"
        ></u-icon>
        <text class="btn">保存</text>
      </view>
      <view class="card-content">
        <view class="policy">
          <view class="policy-item">
            <view class="left">可调负荷</view>
            <view class="right">
              <view class="load labal-value">
                <text class="title">录入负荷</text>
                <view class="value">
                  <u-input widht="40" style="width: 200rpx" />
                  <text class="unit">kw</text>
                </view>
              </view>
              <view class="load labal-value">
                <text class="title">标准负荷</text>
                <view class="value">
                  <u-input class="my-input" />
                  <text class="unit">kw</text>
                </view>
              </view>
            </view>
          </view>
          <view class="policy-item">
            <view class="left">日内响应</view>
            <view class="right">
              <view class="load labal-value">
                <text class="title">录入负荷</text>
                <view class="value">
                  <u-input />
                  <text class="unit">kw</text>
                </view>
              </view>
              <view class="load labal-value">
                <text class="title">标准负荷</text>
                <view class="value">
                  <u-input />
                  <text class="unit">kw</text>
                </view>
              </view>
            </view>
          </view>
          <view class="policy-item">
            <view class="left">最大响应</view>
            <view class="right">
              <view class="load labal-value">
                <text class="title">录入负荷</text>
                <view class="value">
                  <u-input />
                  <text class="unit">kw</text>
                </view>
              </view>
              <view class="load labal-value">
                <text class="title">标准负荷</text>
                <view class="value">
                  <u-input />
                  <text class="unit">kw</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </card>
    <view class="bottom">
      <view class="btns">
        <text class="btn">取消</text>
        <text class="btn">保存</text>
      </view>
    </view>
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
      currentTab: 1,
      showSex: false,
      model1: {
        userInfo: {
          name: "uView UI",
          sex: "",
        },
      },
      actions: [
        {
          name: "男",
        },
        {
          name: "女",
        },
        {
          name: "保密",
        },
      ],
      rules: {
        "userInfo.name": {
          type: "string",
          required: true,
          message: "请填写姓名",
          trigger: ["blur", "change"],
        },
        "userInfo.sex": {
          type: "string",
          max: 1,
          required: true,
          message: "请选择男或女",
          trigger: ["blur", "change"],
        },
      },
      radio: "",
      switchVal: false,
      showSex: false,
      model1: {
        userInfo: {
          name: "uView UI",
          sex: "",
        },
      },
      actions: [
        {
          name: "男",
        },
        {
          name: "女",
        },
        {
          name: "保密",
        },
      ],
      list: [
        {
          value: "1",
          label: "江",
        },
        {
          value: "2",
          label: "湖",
        },
      ],
      form: {
        name: "asdf",
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
      deviceList: [
        {
          name: "一楼XXXXXX",
        },
        {
          name: "二楼XXXXXX",
        },
        {
          name: "三楼XXXXXX",
        },
        {
          name: "四楼XXXXXX",
        },
      ],
    };
  },
  onLoad() {},
  methods: {
    add(currentIndex) {
      this.deviceList.splice(currentIndex, 0, { name: "" });
    },
    reduce(currentIndex) {
      this.deviceList.splice(currentIndex, 1);
    },
    sexSelect(e) {
      this.model1.userInfo.sex = e.name;
      this.$refs.form1.validateField("userInfo.sex");
    },
  },
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
  .base-info ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 2rpx 9rpx !important;
    width: 380rpx;
    margin-left: 70rpx;
    background: none !important;
  }
  ::v-deep input {
    color: #00c8ff !important;
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
  .sub-tab {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 16rpx;
    margin: 26rpx 0 10rpx;
    &-item {
      text-align: center;
      width: 160rpx;
      .value {
        height: 44rpx;
        background: rgba(0, 142, 181, 0.2);
        border-radius: 8rpx;
        display: block;
        margin-bottom: 12rpx;
        font-size: 28rpx;
        margin-top: 7rpx;
        font-family: square-font;
      }
    }
  }
  .device-info {
    padding: 8rpx 0;
    color: rgba(230, 241, 255, 0.6);
    &-head {
      display: flex;
      justify-content: space-between;
      font-size: 24rpx;
      text-align: center;
      .order-title {
        display: block;
        width: 74rpx;
      }
      .capacity-title {
        display: block;
        width: 40%;
      }
    }
    &-list {
      line-height: 57rpx;
      .device-item {
        display: flex;
        justify-content: space-between;
        text-align: center;
        align-items: center;
        margin: 10rpx;
      }
      .border {
        height: 40rpx;
        border-radius: 16rpx;
        border: 2rpx solid rgba(230, 241, 255, 0.2);
        line-height: 40rpx;
      }
      .order {
        width: 10%;
      }
      .name {
        flex: 1;
        color: #19d8ff;
        margin: 0 16rpx;
      }
      .capacity {
        width: 40%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .value {
          width: 72rpx;
        }
        .btns {
          flex: 1;
          display: flex;
          justify-content: space-around;
          margin-left: 20rpx;
        }
      }
    }
  }
  .policy {
    &-item {
      display: flex;
      margin-top: 22rpx;
      .left {
        display: block;
        flex: 1;
        text-align: center;
        font-size: 28rpx;
        color: rgba(0, 179, 255, 0.5);
      }
      .right {
        width: 400rpx;
        /* height: 150rpx; */
        background: rgba(0, 142, 181, 0.15);
        border-radius: 16prx;
        padding: 26rpx 26rpx 10rpx;
        box-sizing: border-box;
        .load {
          font-size: 24rpx;
          display: flex;
          margin-bottom: 11rpx;
          align-items: center;
          .title {
            color: #9fa6af;
          }
          .value {
            display: flex;
            align-items: center;
            .unit {
              padding-left: 11px;
              color: rgba(255, 255, 255, 0.5);
            }
          }
        }
      }
    }
  }
  .policy ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 2rpx 9rpx !important;
    width: 160rpx;
    margin-left: 10rpx;
    background: none !important;
  }
  .bottom {
    .back {
      display: flex;
      justify-content: center;
      margin-left: -40rpx;
      margin-top: 10rpx;
      .title {
        font-size: 32rpx;
        padding-left: 20rpx;
        margin-top: 7rpx;
      }
      .img-back {
        width: 60rpx;
        height: 60rpx;
        display: flex;
      }
    }
    .btns {
      margin-top: 54rpx;
      display: flex;
      justify-content: space-around;
      .btn {
        width: 240rpx;
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
}
</style>
