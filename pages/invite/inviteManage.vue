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
          <view class="title number">{{targetObj.target}}</view>
          <text class="itemtext">kw</text>
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件类型</view>
          <input class="uni-input" disabled v-model="targetObj.eventType" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="targetObj.startDate" disabled />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">持续时长</view>
          <input class="uni-input account" disabled v-model="targetObj.lastDate" />
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
            <datapicker :timeValue.sync="targetObj.declareTime" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">邀约截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="value2" />
          </view>
        </view>
      </view>
    </view>
    <view class="card card2">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_YYGL_2-0-title"></text>
          <text class="itemtext">参与用户补贴</text>
        </view>
        <!-- <button class="mini-btn" type="default" size="mini">编辑</button> -->
      </view>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">补贴额度</view>
          <input class="uni-input account" v-model="targetObj.subsidy" />
          <text class="itemtext">元/千瓦时</text>
        </view>
        <!-- <view class="uni-form-item flex">
          <view class="title">申报截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="value1" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">邀约截止</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="value2" />
          </view>
        </view>-->
      </view>
    </view>
    <view class="card card3">
      <view class="card-title">
        <view class="titleleft">
          <text class="iconfont icon-iconKSYY_YYGL_3-0-title"></text>
          <text class="itemtext">邀约用户选择</text>
        </view>
      </view>
      <view class="card-content">
        <view class="uni-form-item flex header">
          <view class="user flex">
            <text class="iconfont icon-iconKSYY_YYGL_3-1 curr-img"></text>
            <view class="uni-form-item">
              <text class="itemtext title">可参与用户</text>
              <view class="title">
                <text class="count">{{userMsg.userTotal}}</text>家
              </view>
            </view>
          </view>
          <view class="user flex">
            <text class="iconfont icon-iconKSYY_YYGL_3-2 curr-img"></text>
            <view class="uni-form-item">
              <text class="itemtext title">总日内响应</text>
              <view class="title">
                <text class="numcount">{{userMsg.responseTotal}}</text>kw
              </view>
            </view>
          </view>
        </view>
        <view class="check-title flex between">
          <view class="title" style="color: #008eb526;">筛选</view>
          <view class="check-choose">
            <checkbox-group @change="checkboxChange">
              <label class="flex">
                <checkbox value="cb" class="round" :checked="checkValue" />
                <view class="title c-title choose-title">{{ chooseText }}</view>
              </label>
            </checkbox-group>
          </view>
        </view>
        <scroll-view scroll-y="true" class="scroll-Y">
          <view class="check-title check-list" v-for="group in groups" :key="group.id">
            <view class="title flex check-arrow">
              <view class="arrow" @click="expandArrow(group)" :class="{ collapse: !group.expand }"></view>
              <checkbox-group @change="checkboxChangeHeader($event, group)">
                <label class="flex">
                  <checkbox class="round" :value="group.id" :checked="group.checked" :class="{ partChoose: group.partChoose }" />
                  <view class="title c-title">{{ group.title }}</view>
                </label>
              </checkbox-group>
            </view>
            <view class="check-choose" v-show="group.expand">
              <view class="scroll-view">
                <checkbox-group @change="checkboxChangeList($event, group)">
                  <view class="title flex between" v-for="(item, index) in group.children" :key="index">
                    <label class="flex">
                      <checkbox class="round" :value="item.userId" :checked="item.checked" />
                      <view class="title c-title">{{ item.userName }}</view>
                    </label>
                    <view class="column">
                      <text class="title">{{ item.load }}</text>kw
                    </view>
                  </view>
                </checkbox-group>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
    <view class="bottom-btn" @click="createInvitat">发起邀约</view>
  </view>
</template>

<script>
import { mapGetters } from "vuex";
import datapicker from "@/components/datePicker";
import { queryEventByID } from "@/api/event/index.js";
import { getUserInfo } from "@/api/invite/index.js";
export default {
  components: {
    datapicker,
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
      userMsg: {
        responseTotal: undefined,
        userTotal: undefined,
      },
    };
  },
  onReady() {
    this.queryEventByID(this.eventID);
  },
  computed: {
    ...mapGetters(["eventID"]),
    chooseText(val) {
      return this.checkValue ? "全不选" : "全选";
    },
  },
  methods: {
    /**
     * @description 获取事件详情
     * @param { number } id - 事件id
     */
    async queryEventByID(eventID) {
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
        resultData.customer = [
          { load: 0, userId: 12, userName: "某用户1" },
          { load: 20, userId: 13, userName: "某用户2" },
          { load: 10, userId: 14, userName: "某用户3" },
          { load: 40, userId: 16, userName: "某用户4" },
        ];
        resultData.customer.forEach((item) => {
          item.checked = false;
        });
        this.groups[0].children = resultData.customer;
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
  background: linear-gradient(360deg, #0145d4 0%, #00b2fd 100%);
  border-radius: 20rpx;
  margin: 0 auto;
  text-align: center;
  line-height: 90rpx;
  font-weight: bold;
  font-size: 40rpx;
  margin-top: 66rpx;
  color: #ffffff;
}
</style>
