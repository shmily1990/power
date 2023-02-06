<template>
  <view class="user-response-detail">
    <view class="top">
      <text class="title">用户详情</text>
      <text class="user-name">电管家某某某某用户</text>
    </view>
    <List titleTxt="基本信息" fontClass="icon-iconKSYY_SJXQ_1-0-title">
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
    </List>
    <List titleTxt="响应配置" fontClass="icon-iconPZGL_YHGL_2-0-title">
      <view class="card-content">
        <view class="equip flex between">
          <view class="item load">
            <view class="icon-t"
              ><text class="iconfont icon-iconDR_quick_active"></text
              ><text class="txt">可调负荷</text></view
            >
            <text class="value">360</text>
          </view>
          <view class="item response">
            <view class="icon-t"
              ><text class="iconfont icon-iconDR_day_active"></text
              ><text class="txt">日内响应</text></view
            >
            <text class="value">360</text>
          </view>
          <view class="item max-response">
            <view class="icon-t"
              ><text class="iconfont icon-iconDR_long_active"></text
              ><text class="txt">最大响应</text></view
            >
            <text class="value">360</text>
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
              <picker @change="bindPickerChange" :value="index" :range="array">
                <view class="uni-input name border">{{ array[index] }}</view>
              </picker>
              <!-- <text class="name border">{{ item.name }}</text> -->
              <view class="capacity">
                <!-- <text class="value border">12</text> -->
                <u-input value="12" />
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
    </List>
    <List titleTxt="策略管理 " fontClass="icon-iconPZGL_YHGL_3-0-title">
      <template slot="optBtn">
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </template>
      <view class="card-content">
        <view class="policy">
          <view class="policy-item">
            <view class="left flex center column">
              <text class="iconfont icon-iconPZGL_YHGL_3-1"></text>
              可调负荷
            </view>
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
            <view class="left flex center column">
              <text class="iconfont icon-iconPZGL_YHGL_3-2"></text>日内响应
            </view>
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
            <view class="left flex center column">
              <text class="iconfont icon-iconPZGL_YHGL_3-3"></text>最大响应
            </view>
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
    </List>
    <view class="bottom">
      <view class="btns">
        <text class="btn" @click="cancel">取消</text>
        <text class="btn" @click="save">保存</text>
      </view>
    </view>
  </view>
</template>
<script>
import List from "@/components/list.vue";
import { uniScrollTop } from "@/utils/common.js";
export default {
  options: {
    styleIsolation: "shared",
  },
  components: {
    List,
  },
  data() {
    return {
      title: "picker",
      array: ["一层公共照明", "二层公共照明", "三层公共照明", "四层公共照明"],
      index: 0,
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
        name: "啦啦啦",
        intro: "1221312",
        sex: "121221",
        count: "121221",
        connet: "121212",
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
    bindPickerChange: function (e) {
      console.log("picker发送选择改变，携带值为", e.detail.value);
      this.index = e.detail.value;
    },
    cancel() {
      this.$emit("update:currentType", "index");
      uniScrollTop();
    },
    save() {
      this.$emit("update:currentType", "index");
      uniScrollTop();
    },
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
.load {
  color: $uni-color-load;
}
.response {
  color: $uni-color-response;
}
.max-response {
  color: $uni-color-max-response;
}
.mini-btn {
  background: rgba(0, 200, 255, 0.3);
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #e6f1ff;
  margin: 0;
}

.user-response-detail {
  .top {
    margin: 20rpx 0 28rpx 0;
    display: flex;
    justify-content: space-between;
    .title {
      padding-left: 30rpx;
      font-size: 40rpx;
      font-family: MicrosoftYaHei;
      color: rgba(0, 148, 179, 0.5);

      .user-name {
        font-size: 28rpx;
        font-family: MicrosoftYaHei;
        color: #00c8ff;
      }
    }
  }
  .device-info ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 1rpx 9rpx !important;
    width: 50rpx;
    // margin-left: 70rpx;
    background: none !important;
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
  .equip {
    margin-bottom: 20rpx;
    .item {
      margin-top: 10rpx;
      .icon-t {
        font-size: 24rpx;

        .iconfont {
          font-size: 30rpx;
          margin-right: 10rpx;
        }
        .txt {
          color: #9fa6af;
        }
      }
      .value {
        height: 40rpx;
        background: rgba(0, 142, 181, 0.2);
        border-radius: 8rpx;
        display: block;
        font-size: 28rpx;
        margin-top: 10rpx;
        font-family: square-font;
        text-align: center;
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
        height: 49rpx;
        border-radius: 16rpx;
        border: 2rpx solid rgba(230, 241, 255, 0.2);
        line-height: 40rpx;
      }
      .order {
        width: 10%;
      }
      .name {
        // flex: 1 0 280rpx;
        color: #19d8ff;
        margin: 0 16rpx;
        width: 280rpx;
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
        flex: 1;
        text-align: center;
        font-size: 28rpx;
        color: rgba(0, 179, 255, 0.5);
        .iconfont {
          display: block;
          font-size: 70rpx;
          margin-bottom: 8rpx;
        }
      }
      .right {
        width: 400rpx;
        /* height: 150rpx; */
        background: rgba(0, 142, 181, 0.15);
        border-radius: 16rpx;
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
