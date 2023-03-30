<template>
  <view class="user-response-detail">
    
    <template v-if="currentType == 'index'">
      <view class="top">
        <text class="title">我的资源</text>
      </view>
      <List titleTxt="基本信息" fontClass="icon-iconKSYY_SJXQ_1-0-title">
        <template slot="optBtn">
          <button
            class="mini-btn"
            type="default"
            size="mini"
            @click="update(0)"
          >
            {{ editBaseInfoStatus ? "编辑" : "保存" }}
          </button>
        </template>
        <view class="card-content base-info">
          <scroll-view scroll-y style="height: 380rpx">
            <view class="uni-form">
              <view class="form-item">
                <view class="label">用户名称</view>
                <view class="value">{{ form.userName }}</view>
              </view>
              <view class="form-item">
                <view class="label">用户编号</view>
                <view class="value">{{ form.userNumber }}</view>
              </view>
              <view class="form-item">
                <view class="label">用户类型</view>
                <view class="value">{{ currentUserTypeName }}</view>
              </view>
              <view class="form-item">
                <view class="label">用户户号</view>
                <view class="value">{{ form.userNo }}</view>
              </view>
              <view class="form-item">
                <view class="label">联系人</view>
                <view class="value">{{ form.contact }}</view>
              </view>
              <view class="form-item">
                <view class="label">手机号</view>
                <view class="value">{{ form.phone }}</view>
              </view>
              <view class="form-item">
                <view class="label">电压等级</view>
                <view class="value">{{ form.voltageGrade || 10 }} kV</view>
              </view>
              <view class="form-item">
                <view class="label">所属区域</view>
                <view class="value">{{ currentUserRegionName }}</view>
              </view>
            </view>
          </scroll-view>
        </view>
      </List>
      <List titleTxt="响应配置" fontClass="icon-iconPZGL_YHGL_2-0-title">
        <template slot="optBtn">
          <button
            class="mini-btn"
            type="default"
            size="mini"
            @click="update(2)"
          >
            {{ editResponseStatus ? "编辑" : "保存" }}
          </button>
        </template>
        <view class="card-content">
          <view class="equip flex between">
            <view
              :class="['item', index === currentTab ? 'load' : '']"
              v-for="(item, index) in tabs"
              :key="index"
              @click="currentTab = index"
            >
              <view class="icon-t"
                ><text :class="['iconfont', item.icon]" :style="{ color: index === currentTab ? '#0DFF9A' : 'rgba(0,200,255,0.4)'}"></text
                ><text class="txt">{{ item.title }}</text></view
              >
              <text
                class="value"
                :style="{
                  background: index === currentTab ? '#008eb580' : '#008eb526', color: index === currentTab ? '#0DFF9A' : 'rgba(0,200,255,0.4)'

                }"
                >{{ item.sum }}</text
              >
            </view>
            <!-- <view class="item load">
              <view class="icon-t"
                ><text class="iconfont icon-iconDR_quick_active"></text
                ><text class="txt">快速响应</text></view
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
                ><text class="txt">中长期响应</text></view
              >
              <text class="value">360</text>
            </view> -->
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
                v-for="(item, index) in tabs[currentTab].list"
                :key="item.deviceId + index"
              >
                <text class="order border">{{ index + 1 }}</text>
                <!-- <picker
                  @change="bindPickerChange(e, index)"
                  :value="item.deviceTypeIndex || 0"
                  :range="deviceTypeList"
                  range-key="deviceName"
                >
                  <u-input
                    :value="item.deviceName"
                    disabled
                    suffixIcon="arrow-down-fill"
                    suffixIconStyle="color: #909399;font-size: 12px;"
                  />
                </picker> -->
                <u-input
                    :value="item.deviceName"
                    disabled
                    suffixIcon="arrow-down-fill"
                    suffixIconStyle="color: #909399;font-size: 12px;"
                  />
                <!-- <text class="name border">{{ item.name }}</text> -->
                <view class="capacity">
                  <!-- <text class="value border">12</text> -->
                  <u-input v-model="item.volume" disabled />
                  <view class="btns">
                    <u-icon
                      name="plus-circle"
                      color="#0678a6"
                      size="24"

                    ></u-icon>
                    <u-icon
                      name="minus-circle"
                      color="#0678a6"
                      size="24"
                      v-if="tabs[currentTab].list.length > 1"
                    ></u-icon>
                  </view>
                </view>
              </view>
              <view class="empty" v-if="!tabs[currentTab].list.length">
                <u-empty mode="list"></u-empty>
              </view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="策略管理 " fontClass="icon-iconPZGL_YHGL_3-0-title">
        <template slot="optBtn">
          <button
            class="mini-btn"
            type="default"
            size="mini"
            @click="update(3)"
          >
            {{ editPolicyStatus ? "编辑" : "保存" }}
          </button>
        </template>
        <view class="card-content">
          <view class="policy">
            <view
              class="policy-item"
              v-for="(item, index) in strategyList"
              :key="index"
            >
              <view class="left flex center column">
                <text :class="['iconfont', item.icon]"></text>
                {{ item.name }}
              </view>
              <view class="right">
                <view class="load labal-value">
                  <text class="title">录入负荷</text>
                  <view class="value">
                    <u-input
                      widht="40"
                      style="width: 200rpx"
                      :value="item.enterLoad"
                      disabled
                    />
                    <text class="unit">kw</text>
                  </view>
                </view>
                <view class="load labal-value">
                  <text class="title">核准负荷</text>
                  <view class="value">
                    <u-input
                      class="my-input"
                      v-model="item.approvalLoad"
                      :disabled="editPolicyStatus"
                    />
                    <text class="unit">kw</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </List>
    </template>
    <createUserForm
      v-else
      :currentType.sync="currentType"
      :parentId="userId"
      :jumpTabIndex="jumpTabIndex"
    />
  </view>
</template>
<script>
import List from "@/components/list.vue";
import { getUserInfo, getTypeList, getRegionList, getUserDevice } from "@/api/user/index.js";
import { seeInfo } from "@/api/customer/index.js"
import createUserForm from "../component/createUser.vue";
import { uniScrollTop } from "@/utils/common.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  options: {
    styleIsolation: "shared",
  },
  components: {
    List,
    createUserForm
  },
  data() {
    return {
      typeIndex: 0,
      regionIndex: 0, // 所属区域index
      editBaseInfoStatus: true,
      editPolicyStatus: true,
      editResponseStatus: true,
      currentTab: 0,
      form: {},
      deviceList: [],
      typeList: [],
      regionList: [],
      strategyList: [
        {
          name: "快速响应",
          value: 0,
          approvalLoad: 0, // 核准负荷
          enterLoad: 0, // 录入负荷
          icon: "icon-iconPZGL_YHGL_3-1",
        },
        {
          name: "日内响应",
          approvalLoad: 0, // 核准负荷
          enterLoad: 0, // 录入负荷
          icon: "icon-iconPZGL_YHGL_3-2",
        },
        {
          name: "中长期响应",
          approvalLoad: 0, // 核准负荷
          enterLoad: 0, // 录入负荷
          icon: "icon-iconPZGL_YHGL_3-3",
        },
      ],
      tabs: [
        {
          title: "快速响应",
          type: 10,
          sum: 0,
          list: [],
          icon: "icon-iconDR_quick_active",
        },
        {
          title: "日内响应",
          type: 20,
          sum: 0,
          list: [],
          icon: "icon-iconDR_day_active",
        },
        {
          title: "中长期响应",
          type: 30,
          sum: 0,
          list: [],
          icon: "icon-iconDR_long_active",
        },
      ],
      deviceTypeList: [], // 设备类型
      currentType: "index",
      jumpTabIndex: 0
    };
  },
  onReady() {
    this.getTypeList();
    this.getRegionList();
    this.queryUserDetail();
    this.queryDeviceList()
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ]),
    userId() {
      return this.loginUserInfo.userID
    },
    currentUserTypeName() {
      return (
        this.typeList.find((c) => c.typeId === this.form.userType)?.typeName ||
        "-"
      );
    },
    currentUserRegionName() {
      return this.regionList.find((c) => c.regionId === this.form.regionId)
        ?.regionName;
    },
  },
  methods: {
    // 获取用户设备列表
    async queryDeviceList() {
      const { resultCode, resultData } = await getUserDevice({ userId: this.userId })
      if (!resultCode) {
        this.deviceTypeList =resultData
      }
    },
    // 获取用户类型列表
    async getTypeList() {
      const { resultCode, resultData } = await getTypeList({});
      if (!resultCode) {
        this.typeList = resultData;
      }
    },
    // 获取用户区域列表
    async getRegionList() {
      const { resultCode, resultData } = await getRegionList({});
      if (!resultCode) {
        this.regionList = resultData;
      }
    },
    // 用户详情
    async queryUserDetail() {
      const {
        resultCode,
        resultData: { user, strategy, response },
      } = await seeInfo();
      if (!resultCode) {
        const {
          address,
          contact,
          userName,
          userNo,
          userType,
          regionId,
          phone,
          userNumber
        } = user;
        this.form = {
          address,
          contact,
          userName,
          userNo,
          userType,
          regionId,
          phone,
          userNumber
        };
        const type10 = [], type20 = [], type30 = []
        response.forEach(c => {
          switch(c.type) {
            case 10:
              type10.push(c)
              break
            case 20:
              type20.push(c)
              break
            case 30:
              type30.push(c)
              break
          }
        })
        this.tabs = [
          {
            title: "快速响应",
            type: 10,
            sum: type10.reduce((pre, cur) => pre + cur.volume, 0),
            list: type10,
            icon: "icon-iconDR_quick_active",
          },
          {
            title: "日内响应",
            type: 20,
            sum: type20.reduce((pre, cur) => pre + cur.volume, 0),
            list: type20,
            icon: "icon-iconDR_day_active",
          },
          {
            title: "中长期响应",
            type: 30,
            sum: type30.reduce((pre, cur) => pre + cur.volume, 0),
            list: type30,
            icon: "icon-iconDR_long_active",
          },
        ];
        // 处理策略管理数据
        this.strategyList.forEach((c, index) => {
          c.approvalLoad = strategy[index]?.approvalLoad;
          c.enterLoad = strategy[index]?.enterLoad;
        });
      }
    },
    update(index) {
      this.jumpTabIndex = index
      this.currentType = "create"
      // this.$emit("update:currentType", "create");
    }
  },
};
</script>

<style lang="scss" scoped>
.uni-form {
  .form-item {
    display: flex;
    align-items: center;
    margin-bottom: 12rpx;
    margin-left: 12rpx;
  }
  .label {
    font-size: 24rpx;
    color: #9FA6AF;
    margin-right: 6rpx;
    width: 100rpx;
    text-align: right;
  }
  .value {
    width: 422rpx;
    height: 48rpx;
    border-radius: 16rpx;
    border: 2rpx solid rgba(230,241,255,0.2);
    font-size: 24rpx;
    color: #00C8FF;
    line-height: 48rpx;
    text-align: center;
    border: 2rpx solid rgba(230,241,255,0.2);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}
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
  height: 100%;
  padding-bottom: 40rpx;
  .top {
    margin: 20rpx 0 28rpx 0;
    display: flex;
    justify-content: space-between;
    .title {
      padding-left: 30rpx;
      font-size: 40rpx;
      font-family: MicrosoftYaHei;
      color: rgba(0, 148, 179, 0.5);

      
    }
    .user-name {
        font-size: 28rpx;
        font-family: MicrosoftYaHei;
        color: #00c8ff;
      }
  }
  // .device-info ::v-deep .u-border {
  //   border-color: #e6f1ff33 !important;
  //   padding: 1rpx 9rpx !important;
  //   width: 50rpx;
  //   // margin-left: 70rpx;
  //   background: none !important;
  // }
  // .base-info {
  //   height: 500rpx;
  //   overview: auto;
  // }
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
        // color: rgba(0,200,255,0.4);
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
        // color: rgba(0,200,255,0.4);
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
    margin-top: 50rpx;
    margin-bottom: 60rpx;
    .title {
      font-size: 32rpx;
      padding-left: 20rpx;
      font-size: 44rpx;
      color: rgba(0, 179, 255, 0.5);
    }
    .img-back {
      width: 80rpx;
      height: 80rpx;
      display: flex;
    }
    // .back {
    //   display: flex;
    //   justify-content: center;
    //   margin-left: -40rpx;
    //   margin-top: 10rpx;
    //   .title {
    //     font-size: 32rpx;
    //     padding-left: 20rpx;
    //     margin-top: 7rpx;
    //   }
    //   .img-back {
    //     width: 60rpx;
    //     height: 60rpx;
    //     display: flex;
    //   }
    // }
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
.device-item ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 2rpx 9rpx !important;
    width: 200rpx;
    margin-left: 30rpx;
    background: none !important;
  }
.device-item ::v-deep input {
    color: #00c8ff !important;
  }
</style>
