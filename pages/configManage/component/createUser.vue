<template>
  <view class="user-page">
    <view class="top">
      <text class="title">{{ parentId ? '编辑' : '新建'}}用户</text>
    </view>
    <view>
      <u-tabs :list="list1" @change="handChange" :current="currentTabIndex"
        :activeStyle="{
            color: '#00C8FF'
        }"
        :inactiveStyle="{
            color: '#e6f1ff33'
        }"
      ></u-tabs>
    </view>
     
    <List titleTxt="基本信息" fontClass="icon-iconKSYY_SJXQ_1-0-title" v-if="currentTabIndex == 0">
      <scroll-view scroll-y="true" style="height: 600rpx">
        <view class="card-content base-info">
            <u-form :model="form" ref="uForm" :label-style="style" :rules="rules">
              <u-form-item label="用户名称" prop="userName"
                ><u-input v-model="form.userName"
              /></u-form-item>
              <u-form-item label="用户编号" prop="userNumber"
                ><u-input v-model="form.userNumber"
              /></u-form-item>
              <u-form-item label="用户地址" prop="address"
                ><u-input v-model="form.address"
              /></u-form-item>
              <u-form-item label="用户类型">
                <picker
                  @change="handleTypeChange"
                  :value="typeIndex"
                  :range="typeList"
                  range-key="typeName"
                >
                  <u-input
                    :value="typeList[typeIndex].typeName"
                    disabled
                    suffixIcon="arrow-down-fill"
                    suffixIconStyle="color: #909399;font-size: 12px;"
                  />
                </picker>
              </u-form-item>
              <u-form-item label="用户户号" prop="userNo"
                ><u-input v-model="form.userNo"
              /></u-form-item>
              <u-form-item label="联系人" prop="contact"
                ><u-input v-model="form.contact" 
              /></u-form-item>
              <u-form-item label="手机号" prop="phone"
                ><u-input v-model="form.phone" type="number"
              /></u-form-item>
              <u-form-item label="所属区域">
                <picker
                  @change="handleRegionChange"
                  :value="regionIndex"
                  :range="regionList"
                  range-key="regionName"
                >
                  <u-input
                    :value="regionList[regionIndex].regionName"
                    disabled
                    suffixIcon="arrow-down-fill"
                    suffixIconStyle="color: #909399;font-size: 12px;"
                  />
                </picker>
              </u-form-item>
              <u-form-item label="参与响应">
                <picker
                  @change="handleResponseChange"
                  :value="responseIndex"
                  :range="responseList"
                  range-key="name"
                >
                  <u-input
                    :value="responseList[responseIndex].name"
                    disabled
                    suffixIcon="arrow-down-fill"
                    suffixIconStyle="color: #909399;font-size: 12px;"
                  />
                </picker>
              </u-form-item>
            </u-form>
        </view>
      </scroll-view>
    </List>
    <List titleTxt="设备档案" fontClass="icon-iconPZGL_YHGL_2-0-title"  v-if="currentTabIndex == 1">
      <view class="card-content">
        <view class="device-info">
          <view class="device-info-head">
            <text class="order-title">序号</text>
            <text class="name">响应设备</text>
            <text class="capacity-title">响应容量</text>
          </view>
           <scroll-view scroll-y style="height: 600rpx">
            <view class="device-info-list">
              <view class="device-item" v-for="(item, index) in devicesList" :key="index">
                <view class="left border">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</view>
                <view class="middle"><u-input placeholder="请输入内容" v-model="item.deviceName" /></view>
                <view class="capacity">
                  <u-input v-model="item.volume" type="number" />
                  <view class="btns">
                    <u-icon
                      name="plus-circle"
                      color="#FAD800"
                      size="24"
                      @click="deviceAdd(index)"
                    ></u-icon>
                    <u-icon
                      name="minus-circle"
                      color="#FAD800"
                      size="24"
                      v-if="devicesList.length > 1"
                      @click="deviceReduce(index)"
                    ></u-icon>
                  </view>
                </view>
              </view>
            </view>
           </scroll-view>
          
        </view>
      </view>
    </List>
    <List titleTxt="响应配置" fontClass="icon-iconPZGL_YHGL_2-0-title" v-if="currentTabIndex == 2">
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
              >{{ sumList[index] }}</text
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
              v-for="(item, index) in tabs[currentTab].list"
              :key="item.id"
            >
              <text class="order border">{{ index < 9 ? '0' + (index + 1) : index + 1 }}</text>
              <picker
                @change="(e) => bindPickerChange(e, index)"
                :value="item.deviceTypeIndex || 0"
                :range="devicesList"
                range-key="deviceName"
              >
                <u-input
                  :value="item.deviceName"
                  disabled
                  suffixIcon="arrow-down-fill"
                  suffixIconStyle="color: #909399;font-size: 12px;"
                />
              </picker>
              <!-- <text class="name border">{{ item.name }}</text> -->
              <view class="capacity">
                <!-- <text class="value border">12</text> -->
                <u-input disabled v-model="item.volume" />
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
      </view>
    </List>
    <List titleTxt="策略管理 " fontClass="icon-iconPZGL_YHGL_3-0-title" v-if="currentTabIndex == 3">
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
                    :value="sumList[index]"
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
                    type="number"
                    v-model="item.approvalLoad"
                  />
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
import { getUserInfo, getTypeList, getRegionList, getUserDevice, addUser, updateUser } from "@/api/user/index.js";
import { uniScrollTop } from "@/utils/common.js";
export default {
  options: {
    styleIsolation: "shared",
  },
  components: {
    List,
  },
  props: {
    // 编辑id
    parentId: {
      type: String,
      default: ''
    },
    // 跳转页面
    jumpTabIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      typeIndex: 0, // 用户类型
      regionIndex: 0, // 所属区域index
      typeList: [],
      regionList: [],
      // title: "picker",
      currentTabIndex: 0, // tab
      form: {
        partake: 2 // 默认参于
      },
      style: {
        color: "#9FA6AF",
        fontSize: "24rpx",
        display: "block",
        textAlign: "right",
        width: "128rpx",
      },
      strategyList: [
        {
          name: "快速响应",
          value: 0,
          approvalLoad: 0, // 核准负荷
          enterLoad: 0, // 录入负荷
          icon: "icon-iconPZGL_YHGL_3-1",
          type: 10
        },
        {
          name: "日内响应",
          approvalLoad: 0, // 核准负荷
          enterLoad: 0, // 录入负荷
          icon: "icon-iconPZGL_YHGL_3-2",
          type: 20
        },
        {
          name: "中长期响应",
          approvalLoad: 0, // 核准负荷
          enterLoad: 0, // 录入负荷
          icon: "icon-iconPZGL_YHGL_3-3",
          type: 30
        },
      ],
      userId: null,
      responseList: [
        {
          name: '参与',
          value: 2
        },
        {
          name: '不参与',
          value: 1
        }
      ],
      responseIndex: 0,
      // 设备
      devicesList: [
        {
          deviceName: '',
          volume: 0,
          deviceId: 0
        }
      ],
      currentTab: 0,
      tabs: [
        {
          title: "快速响应",
          type: 10,
          sum: 0,
          list: [{ volume: 0, id: new Date()}],
          icon: "icon-iconDR_quick_active",
        },
        {
          title: "日内响应",
          type: 20,
          sum: 0,
          list: [{ volume: 0, id: new Date()}],
          icon: "icon-iconDR_day_active",
        },
        {
          title: "中长期响应",
          type: 30,
          sum: 0,
          list: [{ volume: 0, id: new Date()}],
          icon: "icon-iconDR_long_active",
        },
      ],
      userInfo: {},
      // 表单校验
      rules: {
        userName: {
          type: "string",
          required: true,
          message: "请输入用户名",
          trigger: ["blur", "change"],
        },
        userNumber: {
          type: "string",
          required: true,
          message: "请输入用户编号",
          trigger: ["blur", "change"],
        },
        address: {
          type: "string",
          required: true,
          message: "请输入地址",
          trigger: ["blur", "change"],
        },
        userNo: {
          type: "string",
          required: true,
          message: "请输入用户户号",
          trigger: ["blur", "change"],
        },
        contact: {
          type: "string",
          required: true,
          message: "请输入联系人",
          trigger: ["blur", "change"],
        },
        phone: [{
          type: "string",
          required: true,
          message: "请输入手机号码",
          trigger: ["blur", "change"],
        },
        {
          // 自定义验证函数，见上说明
          validator: (rule, value, callback) => {
            // 上面有说，返回true表示校验通过，返回false表示不通过
            // uni.$u.test.mobile()就是返回true或者false的
            return uni.$u.test.mobile(value);
          },
          message: '手机号码不正确',
          // 触发器可以同时用blur和change
          trigger: ['change','blur'],
        }]
      },
    };
  },
  computed: {
    list1() {
      const value = [
        {
          name: '基础信息',
          disabled: true
        }, {
          name: '设备档案',
          disabled: true
        }, {
          name: '响应配置',
          disabled: true
        }, {
          name: '策略配置',
          disabled: true
        }
      ]
      return value
    },
    sumList() {
      const sum1 = this.tabs[0].list.reduce((pre, cur) => pre + Number(cur.volume), 0)
      const sum2 = this.tabs[1].list.reduce((pre, cur) => pre + Number(cur.volume), 0)
      const sum3 = this.tabs[2].list.reduce((pre, cur) => pre + Number(cur.volume), 0)
      return [sum1, sum2, sum3]
    }
  },
  watch: {
    currentTabIndex(val) {
      if (val === 2) {
        // 根据用户id查询设备表数据
        this.queryDeviceData()
      }
    }
  },
  onReady() {
    // 初始化数据
    this.initData()
     this.getTypeList();
    this.getRegionList();
  },
  methods: {
    initData() {
      if (this.parentId) {
        this.userId = this.parentId
        this.currentTabIndex = this.jumpTabIndex
        this.queryUserInfo()
      }
    },
    // 查询用户信息
    async queryUserInfo() {
      const { resultCode, resultData } = await getUserInfo({ userId: this.userId })
      if (!resultCode) {
        const { user, device, response, strategy } = resultData
        this.userInfo = resultData
        this.form = { ...user }
        if (device.length) this.devicesList = device // 如果设备没数据不赋值
        const list1 = [], list2 = [], list3 = []
        response.forEach(item => {
          switch(item.type) {
            case 10: 
              list1.push({
                ...item,
                id: item.responseId
              })
            case 20:
              list2.push({
                ...item,
                id: item.responseId
              })
            case 30:
              list3.push({
                ...item,
                id: item.responseId
              })
          }
        })
        this.tabs = [
          {
            title: "快速响应",
            type: 10,
            sum: 0,
            list: list1.length ? list1 : [{ volume: 0, id: new Date()}],
            icon: "icon-iconDR_quick_active",
          },
          {
            title: "日内响应",
            type: 20,
            sum: 0,
            list: list2.length ? list2 : [{ volume: 0, id: new Date()}],
            icon: "icon-iconDR_day_active",
          },
          {
            title: "中长期响应",
            type: 30,
            sum: 0,
            list: list3.length ? list3 : [{ volume: 0, id: new Date()}],
            icon: "icon-iconDR_long_active",
          }
        ]
        if (strategy.length) {
          let value1 = 0, value2 = 0, value3 = 0
          let strategyId1 = null, strategyId2 = null, strategyId3 = null
          strategy.forEach(item => {
            if (item.type === 10) {
              value1 = item.approvalLoad
              strategyId1 = item.strategyId
            } else if (item.type === 20) {
              value2 = item.approvalLoad
              strategyId2 = item.strategyId
            } else {
              value3 = item.approvalLoad
              strategyId3 = item.strategyId
            }
          })
          this.strategyList = [{
            name: "快速响应",
            value: 0,
            approvalLoad: value1, // 核准负荷
            enterLoad: 0, // 录入负荷
            icon: "icon-iconPZGL_YHGL_3-1",
            type: 10,
            strategyId: strategyId1
          },
          {
            name: "日内响应",
            approvalLoad: value2, // 核准负荷
            enterLoad: 0, // 录入负荷
            icon: "icon-iconPZGL_YHGL_3-2",
            type: 20,
            strategyId: strategyId2
          },
          {
            name: "中长期响应",
            approvalLoad: value3, // 核准负荷
            enterLoad: 0, // 录入负荷
            icon: "icon-iconPZGL_YHGL_3-3",
            type: 30,
            strategyId: 3
          }]
        }
      }
    },
    // 获取用户类型列表
    async getTypeList() {
      const { resultCode, resultData } = await getTypeList({});
      if (!resultCode) {
        this.typeList = resultData;
        this.form.userType = this.typeList[this.typeIndex]?.typeId || null
      }
    },
    // 获取用户区域列表
    async getRegionList() {
      const { resultCode, resultData } = await getRegionList({});
      if (!resultCode) {
        this.regionList = resultData;
        this.form.regionId = this.regionList[this.regionIndex]?.regionId || null
      }
    },
    // 区域选择
    handleRegionChange(e) {
      this.regionIndex = e.detail.value;
      this.form.regionId = this.regionList[Number(this.regionIndex)].regionId;
    },
    // 用户类型选择
    handleTypeChange(e) {
      this.typeIndex = e.detail.value;
      this.form.userType = this.typeList[Number(this.typeIndex)].typeId;
    },
    // 切换tab
    handChange(e) {
      this.currentTabIndex = e.index
    },
    bindPickerChange(e, index) {
      const value = e.detail.value
      this.$set(this.tabs[this.currentTab].list, index, {
        deviceTypeIndex: Number(value),
        deviceId: this.devicesList[value].deviceId,
        deviceName: this.devicesList[value].deviceName,
        volume: this.devicesList[value].volume,
        id: this.tabs[this.currentTab].list[index].id
      });
    },
    cancel() {
      this.$emit("update:currentType", "index");
      uniScrollTop();
    },
    async editUserBaseInfo() {
      const params = {
        user: this.form,
        userId: this.userId
      }
      const { resultCode } = await updateUser(params)
      if (!resultCode) {
        uni.showToast({ title: "保存成功", icon: "none" });
         this.currentTabIndex = 1
      }
    },
    async save() {
      if (this.currentTabIndex === 0) {
        this.$refs.uForm.validate().then(async (res) => {
          if (this.parentId) {
          // 编辑
            this.editUserBaseInfo()
          } else {
            // 创建
            const { resultCode, resultData } = await addUser({
              user: {
                ...this.form
              }
            })
            if (!resultCode) {
              uni.showToast({ title: "保存成功", icon: "none" });
              this.userId = resultData.userId
              this.currentTabIndex = 1
            }
          }
        });
      } else if (this.currentTabIndex === 1){
        const device = this.devicesList.filter(item => item.deviceName.length > 0 && item.volume.length > 0)
        if (this.parentId) {
          const params = {
            device: device.map(item => {
              return {
                ...item,
                volume: Number(item.volume)
              }
            }),
            userId: this.userId
          }
          const { resultCode } = await updateUser(params)
          if (!resultCode) {
            uni.showToast({ title: "保存成功", icon: "none" });
            this.currentTabIndex = 2
          }
        } else {
          const params = {
            ascription: {
              userId: this.userId,
              device: device.map(item => {
                return {
                  ...item,
                  volume: Number(item.volume)
                }
              })
            }
          }
          const { resultCode, resultData } = await addUser(params)
          if (!resultCode) {
            uni.showToast({ title: "保存成功", icon: "none" });
            this.currentTabIndex = 2
          }
        }
      } else if (this.currentTabIndex === 2) {
        const response = []
        this.tabs.forEach(item => {
          item.list.forEach(cItem => {
            if (cItem.deviceId) {
              if (this.parentId) {
                const opt = {
                  type: item.type,
                  deviceId: cItem.deviceId,
                  volume: cItem.volume,
                  deviceName: cItem.deviceName
                }
                if (cItem.responseId) {
                  opt.responseId = cItem.responseId
                }
                response.push(opt)
              } else {
                 response.push({
                  type: item.type,
                  deviceId: cItem.deviceId,
                })
              }
            }
          })
        })
        if (this.parentId) {
          const params = {
            response,
            userId: this.userId
          }
          const { resultCode } = await updateUser(params)
          if (!resultCode) {
            uni.showToast({ title: "保存成功", icon: "none" });
            this.currentTabIndex = 3
          }
        } else {
          const { resultCode, resultData } = await addUser({
            ascription: {
              userId: this.userId,
              response
            }
          })
          if (!resultCode) {
            uni.showToast({ title: "保存成功", icon: "none" });
            this.currentTabIndex = 3
          }
        }
        
      } else {
        const strategy = this.strategyList.map(item => {
          let info = {
            type: item.type,
            approvalLoad: Number(item.approvalLoad),
          }
          if (this.parentId) {
            info.strategyId = item.strategyId
            info.enterLoad = item.enterLoad
          }
          return info
        })
        // 输入不能大于
        const flat = strategy.every((item, index) => {
          return item.approvalLoad <= this.sumList[index]
        })
        if (!flat) {
          uni.showToast({ title: "输入有误, 核准负荷不能大于录入负荷!", icon: "none" });
          return
        }
        if (this.parentId) {
          const params = {
            strategy,
            userId: this.userId
          }
          const { resultCode } = await updateUser(params)
          if (!resultCode) {
            uni.showToast({ title: "保存成功", icon: "none" });
            this.cancel()
          }
        } else {
          const { resultCode, resultData } = await addUser({
            ascription: {
              userId: this.userId,
              strategy
            }
          })
          if (!resultCode) {
            uni.showToast({ title: "保存成功", icon: "none" });
            this.cancel()
          }
        }
      }
      // this.$emit("update:currentType", "index");
      // uniScrollTop();
    },
    // 设备添加
    deviceAdd(currentIndex) {
      if (!this.devicesList[currentIndex].deviceName.length) {
        uni.showToast({
          title: '请输入设备名称',
          icon: 'none',
        })
        return
      }
      this.devicesList.splice(currentIndex, 0, {
        deviceName: '',
        volume: 0,
        deviceId: 0
      });
    },
    // 设备删除
    deviceReduce(currentIndex) {
      this.devicesList.splice(currentIndex, 1);
    },

    handleResponseChange(e) {
      this.responseIndex = e.detail.value;
      this.form.partake = this.responseList[Number(this.responseIndex)].value;
    },
    // 查询设备表数据
    async queryDeviceData() {
      if (!this.userId) return
      const { resultCode, resultData } = await getUserDevice({
        userId: this.userId
      })
      if (!resultCode) {
        this.devicesList = resultData
      }
    },
    add(currentIndex, item) {
      this.tabs[this.currentTab].list.splice(currentIndex, 0, {volume: 0, id: new Date()});
    },
    reduce(currentIndex) {
      this.tabs[this.currentTab].list.splice(currentIndex, 1);
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
