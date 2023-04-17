<template>
  <view>
    <view class="card card1">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_YYGL_1-0-title"></text>
          <text class="itemtext">关联事件信息</text>
        </view>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <text class="iconfont icon-iconKSYY_YYGL_1-1 control curr-img"></text>
          <text class="itemtext title">调控目标</text>
          <view class="title number">{{ targetObj.target }}</view>
          <text class="itemtext">kw</text>
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件类型</view>
          <input class="uni-input" disabled :value="targetObj.eventType" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="targetObj.startDate" disabled />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">持续时长</view>
          <input
            class="uni-input account"
            disabled
            v-model="targetObj.lastDate"
          />
          <text class="itemtext">分钟</text>
        </view>
      </view>
    </view>
    <view class="card card2">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_YYGL_2-0-title"></text>
          <text class="itemtext">邀约截止日期</text>
        </view>
        <!-- <button class="mini-btn" type="default" size="mini">编辑</button> -->
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">申报截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="targetObj.declareTime" disabled />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">邀约截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="inviteTime" disabled />
            <!-- <datapicker :timeValue.sync="inviteTime" disabled="true" /> -->
          </view>
        </view>
      </view>
    </view>
    <view class="card card2">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-icon-PayCircleOutlined"></text>
          <text class="itemtext">参与用户补贴</text>
        </view>
        <!-- <button class="mini-btn" type="default" size="mini">编辑</button> -->
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">补贴额度</view>
          <input class="uni-input account" v-model="targetObj.subsidy" disabled />
          <text class="itemtext">元/千瓦时</text>
        </view>
      </view>
    </view>
    <view class="card card3">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconPZGL_YHGL_2-0-title"></text>
          <text class="itemtext">响应配置</text>
        </view>
        <!-- <button class="mini-btn" type="default" size="mini">编辑</button> -->
      </view>
      <view class="card-content">
        <!-- <view class="uni-form-item flex">
          <view class="title">补贴额度</view>
          <input class="uni-input account" v-model="targetObj.subsidy" />
          <text class="itemtext">元/千瓦时</text>
        </view> -->
        <view class="sub-tab">
          <view class="sub-tab-item">
            <u-icon
              label="快速响应"
              name="setting"
              :color="currentTab === 0 ? '#0DFF9A' : '#9FA6AF'"
              :label-color="currentTab === 0 ? '#00C8FF' : '#9FA6AF'"
              label-size="12"
            ></u-icon>
            <text
              class="value"
              :style="{ color: currentTab === 0 ? '#0DFF9A' : '#00C8FF', background: currentTab === 0 ? '#008eb580' : '#008eb51a' }"
              >{{ tabs[0]['sum'] }}</text
            >
          </view>
          <view class="sub-tab-item">
            <u-icon
              label="日内响应"
              name="setting"
              :color="currentTab === 1 ? '#0DFF9A': '#9FA6AF'"
              :label-color="currentTab === 1 ? '#00C8FF' : '#9FA6AF'"
              label-size="12"
            ></u-icon>
            <text
              class="value"
              :style="{ color: currentTab === 1 ? '#0DFF9A' : '#00C8FF', background: currentTab === 1 ? '#008eb580' : '#008eb51a' }"
              >{{ tabs[1]['sum'] }}</text
            >
          </view>
          <view class="sub-tab-item">
            <u-icon
              label="中长期响应"
              name="setting"
              :color="currentTab === 2 ? '#FA6400' : '#9FA6AF'"
              :label-color="currentTab === 2 ? '#00C8FF' : '#9FA6AF'"
              label-size="12"
            ></u-icon>
            <text
              class="value"
              :style="{ color: currentTab === 2 ? '#0DFF9A' : '#00C8FF', background: currentTab === 2 ? '#008eb580' : '#008eb51a' }"
              >{{ tabs[2]['sum'] }}</text
            >
          </view>
        </view>
        <card>
          <!-- <view class="device-info">
            <view class="device-info-head">
              <text>序号</text>
              <text>响应设备</text>
              <text>响应容量</text>
            </view>
            <view class="device-info-list">
              <view class="device-item" v-for="(item, index) in tabs[currentTab]['list']" :key="index">
                <text class="order border">{{ index + 1}}</text>
                <text class="name border">{{ item.deviceName }}</text>
                <view class="capacity">
                  <text class="value border">{{ item.deviceVolume }}</text>
                  <text class="unit">kw</text>
                </view>
              </view>
              <view class="empty" v-if="!tabs[currentTab].list.length">
                <u-empty mode="list"></u-empty>
              </view>
            </view>
          </view> -->
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
              :key="index + item.deviceId"
            >
              <text class="order border">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</text>
              <picker
                @change="(e) => bindPickerChange(e, index)"
                :value="item.deviceTypeIndex || 0"
                :range="tabs[currentTab].rangeList"
                range-key="deviceName"
              >
                <u-input
                  :value="item.deviceName"
                  disabled
                  suffixIcon="arrow-down-fill"
                  suffixIconStyle="color: #909399;font-size: 12px;"
                  :font-size="12"
                />
              </picker>
              <!-- <text class="name border">{{ item.name }}</text> -->
              <view class="capacity">
                <!-- <text class="value border">12</text> -->
                <u-input disabled v-model="item.deviceVolume" :font-size="12" />
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
                    v-if="tabs[currentTab].list.length > 1"
                    @click="reduce(index)"
                  ></u-icon>
                </view>
              </view>
            </view>
          </view>
        </view>
        </card>
        <view class="total">共计<text class="value">{{ sumList[currentTab]}}</text>kw</view>
      </view>
    </view>
    <view class="card myResponse">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-UPMYRESPONSE"></text>
          <text class="itemtext">我的响应</text>
        </view>
        <view class="inviteStatus">{{ inviteInfo.responseState }}</view>
      </view>
      <view class="card-content">
        <view class="btns">
          <view class="btns-item no-response" :class="{'active': state == 0}" @click="() => state = 0">不参与本次响应</view>
          <view class="btns-item yes-response" :class="{'active': state == 1}" @click="() => state = 1">参与响应<view class="value"><text>{{ sumList[currentTab] }}</text>kw</view></view>
        </view>
      </view>
    </view>
    <view class="bottom-btn" @click="createInvite">邀约提交</view>
  </view>
</template>




<script>
import { mapState, mapGetters } from "vuex";
import datapicker from "@/components/datePicker";
import card from "@/components/card";
import { queryEventByID } from "@/api/event/index.js";
import { getUserInfo, addInvite } from "@/api/invite/index.js";
import { customerInviteDetails, operateCustomerInvite } from "@/api/customer/index.js";
import { getUserDevice } from "@/api/user/index.js";
export default {
   options: {
    styleIsolation: "shared",
  },
  components: {
    datapicker,
    card
  },
  data() {
    return {
      //  checked标识是否选中,expand标识是否展开折叠,partChoose标识是否部分选中，示例演示，如果接口无类似字段需要手动添加
      groups: [
        {
          id: "1",
          checked: false,
          expand: true,
          partChoose: false,
          title: "电管家集团",
          children: [],
        },
      ],
      value: "2021-02-03 12:22",
      value1: "2022-03-03 11:22",
      value2: "2023-04-01 10:18",
      checkboxValue: "",
      checkValue: false,
      targetObj: {
        eventID: "",
        target: undefined,
        eventType: "",
        startDate: "",
        lastDate: undefined,
        declareTime: "",
        subsidy: undefined,
      },
      inviteTime: "",
      userMsg: {
        responseTotal: undefined,
        userTotal: undefined,
      },
      eventNameMap: {
        10: '快速响应',
        20: '日内响应',
        30: '中长期响应'
      },
      //
      tabs: [
          {
            title: "快速响应",
            type: 10,
            sum: 0,
            list: [],
            rangeList: [],
            icon: "icon-iconDR_quick_active",
          },
          {
            title: "日内响应",
            type: 20,
            sum: 0,
            list: [],
            rangeList: [],
            icon: "icon-iconDR_day_active",
          },
          {
            title: "中长期响应",
            type: 30,
            sum: 0,
            list: [],
            rangeList: [],
            icon: "icon-iconDR_long_active",
          },
        ],
      currentTab: 0,
      devicesList: [],
      state: 0
    };
  },
  props: {
    inviteInfo: {
      type: Object,
      default: {}
    }
  },
  async onReady() {
    // this.queryEventByID(this.eventID);
    await this.queryInviteDetail()
    await this.queryDeviceData()
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ]),
    ...mapGetters(["eventID"]),
    userId() {
      return this.loginUserInfo.userID
    },
    chooseText(val) {
      return this.checkValue ? "全不选" : "全选";
    },
    userCheckList() {
      const list = this.groups[0].children;
      let user = [];
      list.forEach((item) => {
        if (item.checked) {
          user.push({ userId: item.userId });
        }
      });
      return user;
    },
    sumList() {
      const sum1 = this.tabs[0].list.reduce((pre, cur) => pre + Number(cur.deviceVolume), 0)
      const sum2 = this.tabs[1].list.reduce((pre, cur) => pre + Number(cur.deviceVolume), 0)
      const sum3 = this.tabs[2].list.reduce((pre, cur) => pre + Number(cur.deviceVolume), 0)
      return [sum1, sum2, sum3]
    }
  },
  watch: {
    devicesList(val) {
      this.tabs.forEach(item => {
        item.rangeList = this.devicesList.filter((c) => {
          return !item.list.some(cItem => cItem.deviceName === c.deviceName)
        })
      })
      console.log(this.tabs)
    }
  },
  methods: {
    /**
     * @description 获取邀约详情
     * @param { number } id - 邀约id
     */
    async queryInviteDetail() {
      const { inviteId } = this.inviteInfo
      const { resultCode, resultData } = await customerInviteDetails({ inviteId })
      if (!resultCode) {
        const { basicInfo, deviceInfo } = resultData
        const { target, typeName, startTime, duration, declareDate, inviteDate, subsidy, typeId } = basicInfo
        this.targetObj = {
          target,
          eventType: typeName,
          startDate: startTime,
          lastDate: duration,
          declareTime: declareDate,
          subsidy
        }
        this.state = this.inviteInfo.stateValue || 0
        // 获取事件类型
        this.currentTab = typeId == 10 ? 0 : typeId == 20 ? 1 : 2
        this.inviteTime = inviteDate
        if (deviceInfo.length) {
          const [tab0, tab1, tab2 ] = deviceInfo
          this.tabs = [
          {
            title: "快速响应",
            type: 10,
            sum: tab0.total,
            list: tab0.devices,
            rangeList: [],
            icon: "icon-iconDR_quick_active",
          },
          {
            title: "日内响应",
            type: 20,
            sum: tab1.total,
            list: tab1.devices,
            rangeList: [],
            icon: "icon-iconDR_day_active",
          },
          {
            title: "中长期响应",
            type: 30,
            sum: tab2.total,
            list: tab2.devices,
            rangeList: [],
            icon: "icon-iconDR_long_active",
          },
        ]
        }
      }
    },
    /**
     * @description 获取事件详情
     * @param { number } id - 事件id
     */
    async queryEventByID(eventID) {
      if (!eventID) {
         uni.showToast({ title: "暂无关联事件，请添加事件", icon: "none" });
         return
      }
      const { resultCode, resultData } = await queryEventByID({ eventID });
      if (!resultCode) {
        resultData.startDate = resultData.startDate.slice(0, -3);
        const { eventID, target, eventType, lastDate } = resultData;
        this.targetObj = {
          eventID,
          target,
          eventType,
          startDate: resultData.startDate,
          lastDate,
          declareTime: "",
          subsidy: undefined,
        };
        this.getUserInfo(resultData.eventType);
      }
    },
    /**
     * @description 获取用户列表
     * @param { number } typeId - 类型id
     */
    async getUserInfo(typeId) {
      const { resultCode, resultData } = await getUserInfo({ typeId });
      if (!resultCode) {
        const { responseTotal, userTotal } = resultData;
        this.userMsg = { responseTotal, userTotal };
        // resultData.customer = [
        //   { load: 0, userId: 12, userName: "某用户1" },
        //   { load: 20, userId: 13, userName: "某用户2" },
        //   { load: 10, userId: 14, userName: "某用户3" },
        //   { load: 40, userId: 16, userName: "某用户4" },
        // ];
        resultData.customer.forEach((item) => {
          item.checked = false;
        });
        this.groups[0].children = resultData.customer;
      }
    },
    /**
     * @description 响应邀约
     */
    async createInvite() {
      const device = []
      this.tabs[this.currentTab].list.forEach(cItem => {
        cItem.deviceName && device.push({deviceId: cItem.deviceId, deviceVolume: cItem.deviceVolume })
      })
      if (!device.length) {
        uni.showToast({ title: "请先完成响应配置后再参与响应", icon: "none" });
        return
      }
      const params = {
        inviteId: this.inviteInfo.inviteId,
        state: this.state,
        device: this.state == 1 ? device : undefined
      }
      const { resultCode, resultData } = await operateCustomerInvite(params)
      if (!resultCode) {
        uni.showToast({ title: "提交邀约成功", icon: "none" });
        this.$emit('update:isShow', false)
      }
    },
    /**
     * @description 箭头展开列表数据
     * @param { group } 单个数据项
     */
    expandArrow(group) {
      group.expand = !group.expand;
    },
    /**
     * @description 全选全不选逻辑处理
     * @param { e } 选中的数据项，数组形式，e.detail.value
     */
    checkboxChange(e) {
      this.checkValue = e.detail.value.length > 0;
      this.groups.forEach((item) => {
        item.checked = this.checkValue;
        item.partChoose = false;
        item.children.forEach((child) => {
          child.checked = this.checkValue;
        });
      });
    },
    /**
     * @description 每个列表大项最上面的复选框勾选逻辑
     * @param { e } 选中的数据项，数组形式，e.detail.value
     * @param { group } 当前列表项的数据
     */
    checkboxChangeHeader(e, group) {
      group.checked = e.detail.value.length > 0;
      group.children.forEach((item) => {
        item.checked = group.checked;
      });
      group.partChoose = false;
      this.checkValue = this.groups.every((item) => item.checked === true);
    },
    /**
     * @description 每个列表项子项目勾选框选择逻辑
     * @param { e } 选中的数据项，数组形式，e.detail.value
     * @param { group } 当前列表项的数据
     */
    checkboxChangeList(e, group) {
      const checkValues = e.detail.value;
      group.children.forEach((item) => {
        if (checkValues.includes(String(item.userId))) {
          item.checked = true;
        } else {
          item.checked = false;
        }
      });
      group.partChoose =
        checkValues.length && checkValues.length < group.children.length;
      group.checked = checkValues.length === group.children.length;
      this.checkValue = this.groups.every((item) => item.checked === true);
    },
     bindPickerChange(e, index) {
      const value = e.detail.value
      const selectDeviceId = this.tabs[this.currentTab].rangeList[value].deviceId
      const isFind = this.tabs[this.currentTab].list.find(c => c.deviceId === selectDeviceId)
      const { deviceId, deviceName, deviceVolume} = this.tabs[this.currentTab].list[index]
      if (isFind) {
        uni.showToast({ title: "同一响应配置设备不能重复添加", icon: "none" });
        return
      }
      this.$set(this.tabs[this.currentTab].list, index, {
        deviceTypeIndex: Number(value),
        deviceId: this.tabs[this.currentTab].rangeList[value].deviceId,
        deviceName: this.tabs[this.currentTab].rangeList[value].deviceName,
        deviceVolume: this.tabs[this.currentTab].rangeList[value].deviceVolume,
        // id: this.tabs[this.currentTab].list[index].id
      });

      if (deviceName) {
          this.tabs[this.currentTab].rangeList.splice(value, 1, {deviceId, deviceName, deviceVolume})
      } else {
          this.tabs[this.currentTab].rangeList.splice(value, 1)
      }
    },
     add(currentIndex, item) {
      this.tabs[this.currentTab].list.splice(currentIndex, 0, {deviceVolume: 0, deviceId: new Date()});
    },
    reduce(currentIndex) {
      // this.tabs[this.currentTab].list.splice(currentIndex, 1);
      const { deviceId, deviceName, deviceVolume } = this.tabs[this.currentTab].list[currentIndex]
      if (deviceId) {
        this.tabs[this.currentTab].rangeList.push({
          deviceName,
          deviceId,
          deviceVolume
        })
      }
      this.tabs[this.currentTab].list.splice(currentIndex, 1);
    },
    async queryDeviceData() {
      if (!this.userId) return
      const { resultCode, resultData } = await getUserDevice({
        userId: this.userId
      })
      if (!resultCode) {
        this.devicesList = resultData.map(item => {
          return {
            ...item,
            deviceVolume: item.volume
          }
        })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  align-items: center;
}

.between {
  justify-content: space-between;
}

.uni-checkbox .uni-checkbox-input {
  background: #0060a9;
  border-radius: 4rpx;
  width: 36rpx;
  height: 36rpx;
}

.card {
  padding: 30rpx 30rpx 20rpx 30rpx;
  background: rgba(0, 142, 181, 0.15);
  border-radius: 16rpx;
  margin: 20rpx 0;

  .card-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24rpx;

    .titleleft {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      color: #fff;
      font-weight: bold;
      .iconfont {
        font-size: 48rpx;
        margin-right: 18rpx;
        font-weight: normal;
      }
    }
  }

  .mini-btn {
    background: rgba(0, 200, 255, 0.3);
    border-radius: 12rpx;
    font-size: 24rpx;
    color: #e6f1ff;
    margin: 0;
  }
  .inviteStatus {
    // width: 100rpx;
    background: rgba(13,255,154,0.3);
    border-radius: 12rpx;
    font-size: 24rpx;
    font-family: MicrosoftYaHei;
    color: #E6F1FF;
    padding: 10rpx 14rpx;
    text-align: center;
  }
  .curr-img {
    width: 48rpx;
    margin-right: 16rpx;
    font-size: 44rpx;
  }

  .uni-input,
  .uni-list-cell-db {
    border-radius: 16rpx;
    border: 2rpx solid rgba(230, 241, 255, 0.2);
    padding: 6rpx 20rpx;
    font-size: 24rpx;
    color: #19d8ff;
    margin-left: 6rpx;
    width: 292rpx;
    height: 48rpx;
    line-height: 48rpx;
  }

  .account {
    width: 146rpx;
    margin-right: 20rpx;
  }

  .card-content {
    padding-left: 70rpx;

    .uni-form-item {
      margin-bottom: 12rpx;
      .itemtext {
        color: #ffffff80;
      }
      .iconfont {
        color: #ffffff80;
      }
      .title {
        color: #9fa6af;
        font-size: 24rpx;
      }
      .number {
        background: rgba(0, 142, 181, 0.2);
        border-radius: 12rpx;
        font-size: 32rpx;
        color: #0094b3;
        padding: 10rpx 70rpx;
        margin-right: 20rpx;
        margin-left: 20rpx;
      }

      .count {
        font-size: 32rpx;
        color: #19d8ff;
        margin-right: 20rpx;
        font-family: square-font;
      }

      .numcount {
        font-size: 32rpx;
        margin-right: 20rpx;
        color: #f7b500;
        font-family: square-font;
      }
    }
  }
}
.total {
  font-size: 24rpx;
  color: #9FA6AF;
  text-align: right;
  .value {
    font-size: 36rpx;
    color: #F7B500;
    padding: 0 30rpx;
    font-family: square-font;
  }
}
.card3 .card-content {
  padding: 0;
  .user {
    .curr-img {
      width: 60rpx;
      height: 60rpx;
      border: 1px solid #3b5f80;
      border-radius: 50%;
      font-size: 60rpx;
      color: #19d8ff;
    }
    &:last-child {
      .curr-img {
        color: #f7b500;
      }
    }
  }
  .header {
    margin: 0 46rpx 20rpx;
    padding-bottom: 20rpx;
    justify-content: space-between;
    border-bottom: 2rpx solid rgba(255, 255, 255, 0.2);
  }

  .check-title {
    margin: 20rpx 46rpx 26rpx;
  }

  .c-title {
    color: #d7d8e0;
    font-size: 28rpx;
  }

  .choose-title {
    width: 86rpx;
  }

  .scroll-view {
    margin: 0 20rpx 0 60rpx;
  }

  .check-list {
    .c-title {
      margin: 24rpx 0;
      margin-left: 24rpx;
    }
    .check-arrow {
      position: relative;
    }
  }

  .scroll-Y {
    height: 600rpx;
  }

  .column {
    font-size: 28rpx;
    font-weight: 500;
    color: #f7b500;
    margin-right: 12rpx;
  }

  .arrow {
    position: absolute;
    top: 40rpx;
    left: -36rpx;
    border: 12rpx solid transparent;
    border-top-color: #00c8ff;
    transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .collapse {
    transform: rotate(-90deg);
  }
}

.bottom-btn {
  width: 440rpx;
  height: 90rpx;
background: linear-gradient(360deg, #47A41D 0%, #029B9E 100%);
  border-radius: 20rpx;
  margin: 0 auto;
  text-align: center;
  line-height: 90rpx;
  font-weight: bold;
  font-size: 40rpx;
  margin-top: 66rpx;
  color: #ffffff;
}
.sub-tab {
    display: flex;
    align-items: center;
    justify-content: space-around;
    margin-bottom: 12rpx;
    &-item {
      text-align: center;
      .value {
        height: 40rpx;
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
      .left {
        padding: 0 8rpx;
        line-height: 49rpx;
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
  .device-info ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 1rpx 9rpx !important;
    width: 200rpx;
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
.myResponse {
  background: rgba(0,255,111,0.1);
  .card-content {
    padding-left: 0;
  }
  // padding: 0;
  .btns {
    display: flex;
    justify-content: space-between;
    &-item {
      height: 80rpx;
      border-radius: 16rpx;
      border: 2rpx solid rgba(14,173,112,0.21);
      font-size: 24rpx;
      font-family: MicrosoftYaHei;
      color: #0C9A64;
      text-align: center;
      line-height: 80rpx;
      display: flex;
      justify-content: center;
      .value {
        width: 160rpx;
        height: 60rpx;
        background: rgba(13, 255, 154, 0.08);
        border-radius: 8rpx;
        margin-top: 10rpx;
        line-height: 60rpx;
        margin-left: 10rpx;
        display: flex;
        justify-content: space-around;
        text {
          color: #15FFA5;
          font-family: square-font;
          font-size: 44rpx;
        }
      }
    }
    .no-response {
      width: 200rpx;
    }
    .yes-response {
      flex: 1;
      margin: 0 40rpx;
    }
    .active {
      border: 2rpx solid #15FFA5;
      color: #15FFA5;
    }
  }
}
</style>
