<template>
  <view class="invite-detail">
    <template v-if="currentPage === 'invite'">
      <view class="breadcrumb">
        <text>邀约详情</text>
      </view>
      <List titleTxt="关联事件信息" fontClass="icon-iconKSYY_YYGL_1-0-title">
        <view class="card-conent">
          <view class="event-info">
            <view class="label-value">
              <text class="title">事件名称</text>
              <view class="value">
                <text class="count">{{ basicInfo.eventName }}</text>
              </view>
            </view>
            <view class="label-value">
              <text class="title">调控指标</text>
              <view class="value">
                <text class="count">{{ basicInfo.target }}</text>
                <text class="unit">kw</text>
              </view>
            </view>
            <view class="label-value">
              <text class="title">开始时间</text>
              <view class="value">
                <text class="count">{{ basicInfo.startTime }}</text>
              </view>
            </view>
            <view class="label-value">
              <text class="title">持续时间</text>
              <view class="value">
                <text class="count" style="width: 132rpx">{{ basicInfo.duration }}</text>
                <text class="unit">分钟</text>
              </view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="用户响应情况" fontClass="icon-iconKSYY_YYGL_3-0-title">
        <view class="card-body">
          <overview :data="data" />
          <u-divider color="#E6F1FF"></u-divider>
          <view class="user">
            <view class="screen">
              <text class="title sx">筛选</text>
              <!-- <u-radio-group
                v-model="radiovalue"
                placement="row"
                shape="square"
              >
                <u-radio
                  :customStyle="{ marginBottom: '8px' }"
                  v-for="(item, index) in radiolist"
                  :key="index"
                  :label="item.name"
                  :name="item.name"
                >
                </u-radio>
              </u-radio-group> -->
              <checkbox-group @change="handChange">
                <view class="flex">
                  <label class="flex"  v-for="item in list" :key="item.name">
                    <checkbox :value="item.value" class="round" :checked="item.checked" :id="item.id" :class="{ partChoose: partChoose && item.value == 'cb' }" />
                    <view class="title c-title choose-title"> {{ item.name }} </view>
                  </label>
                </view>
              </checkbox-group>
              
            </view>
            <view class="user-list">
              <view class="user-list-item" v-for="(customer, index) in filterCustomer" :key="customer.userId" @click="handleSelect(customer)">
                <text class="left">{{ (index + 1) < 10 ? `0${index + 1}` : index + 1 }}</text>
                <view class="mid">
                  <text class="mid-name">{{ customer.userName }}</text>
                  <view class="mid-bottom">
                    <text class="status">{{ customer.responseName }}</text>
                    <text class="value" v-if="customer.responseId == 30">{{ customer.load }}<text class="unit">kw</text></text>
                  </view>
                </view>
                <u-icon
                  name="arrow-right"
                  color="#00c8ff"
                  size="16"
                  class="right"
                />
              </view>
              <view class="empty" v-if="!filterCustomer.length">
                <u-empty mode="list"></u-empty>
              </view>
            </view>
          </view>
        </view>
      </List>
      <view class="bottom">
        <view class="back flex center" @click="goBack">
          <image src="~@/static/icon-back.png" class="img-back" />
          <text class="title">返回</text>
        </view>
        <view class="btns" v-if="inviteInfo.inviteState == 10">
          <text class="btn" @click="opeartInvite(20)">放弃邀约</text>
          <text class="btn" @click="opeartInvite(30)">完成邀约</text>
        </view>
      </view>
    </template>
    <template v-if="currentPage === 'user'">
      <userDetail @changeCurrentPage="() => (currentPage = 'invite')" :user="userInfo" :inviteInfo="inviteInfo" />
    </template>
  </view>
</template>
<script>
import List from "@/components/list.vue";
import userDetail from "./userDetail.vue";
import overview from "@/components/overview";
import { uniScrollTop } from "@/utils/common.js";
import { getInviteInfo, excuteInviteOperation } from "@/api/invite/index.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      list: [
        {
          name: "全部",
          checked: true,
          value: 'cb',
          id: 'c1'
        },
        {
          name: "参与",
          checked: true,
          value: "30",
          id: 'c2'
        },
        {
          name: "不参与",
          checked: true,
          value: "20",
          id: 'c3'
        },
        {
          name: "未响应",
          checked: true,
          value: "10",
          id: 'c4'
        },
      ],
      defaultCheckdeValues: ['cb', '30', '20', '10'],
      data: [
        {
          name: "已通知",
          value: 0,
          unit: "家",
          icon: "icon-iconPZGL_YYGL_4-1",
        },
        {
          name: "已响应",
          value: 0,
          unit: "家",
          icon: "icon-iconPZGL_YYGL_4-2",
        },
        {
          name: "当前总响应",
          value: 0,
          unit: "KW",
          icon: "icon-iconPZGL_YYGL_4-3",
        },
      ],
      currentPage: "invite",
      basicInfo: {}, // 基础信息
      customerList: [],
      userInfo: {}
    };
  },
  props: {
    inviteInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ]),
    partChoose() {
      return !this.defaultCheckdeValues.includes('cb') && this.defaultCheckdeValues.length > 0
    },
    filterCustomer() {
      return this.customerList.filter(c => this.defaultCheckdeValues.includes(c.responseId.toString()))
    }
  },
  components: {
    List,
    userDetail,
    overview,
  },
  onReady() {
    this.getInviteDetail()
  },
  onLoad() {},
  methods: {
    async getInviteDetail() {
      const { inviteId } = this.inviteInfo
      const { resultCode, resultData } = await getInviteInfo({ inviteId })
      if (!resultCode) {
        const { basic, summary: { userTotal, responseTotal, responseVolume, customer } } = resultData
        this.basicInfo = basic
        this.data = [
        {
          name: "已通知",
          value: userTotal,
          unit: "家",
          icon: "icon-iconPZGL_YYGL_4-1",
        },
        {
          name: "已响应",
          value: responseTotal,
          unit: "家",
          icon: "icon-iconPZGL_YYGL_4-2",
        },
        {
          name: "当前总响应",
          value: responseVolume,
          unit: "KW",
          icon: "icon-iconPZGL_YYGL_4-3",
        },
        ]
        this.customerList = customer
      }
    },
    handChange(e) {
      const values = e.detail.value
      const ischeckedAllFalse = this.defaultCheckdeValues.includes('cb') && !values.includes('cb') // 取消全部
      const isCheckedAllTrue =  (!this.defaultCheckdeValues.includes('cb') && values.includes('cb')) || (values.includes('30') && values.includes('20') && values.includes('10')) // 全选
      
      this.list.forEach(c => {
        if (ischeckedAllFalse) {
          c.checked = false
          return
        }
        if (isCheckedAllTrue) {
          c.checked = true
          return
        }
        if (c.value == 'cb') {
          c.checked = false
          return
        }
        if (values.includes(c.value)) {
          c.checked = true
        } else {
          c.checked = false
        }
      })
      if (ischeckedAllFalse) {
        this.defaultCheckdeValues = []
      } else if (isCheckedAllTrue) {
        this.defaultCheckdeValues = ['cb', '30', '20', '10']
      } else {
        this.defaultCheckdeValues = e.detail.value.filter(c => c != 'cb')
      }
      
    },
    goBack() {
      this.$emit("update:isShow", false);
      uniScrollTop();
    },
    handleSelect(user) {
      this.userInfo = user
      this.currentPage = "user";
      uniScrollTop();
    },
    // 放弃20、完成30
    async opeartInvite(val) {
      const { inviteId } = this.inviteInfo
      const params = {
        inviteId,
        state: val
      }
      const { resultCode } = await excuteInviteOperation(params)
      if (!resultCode) {
        // 返回邀约管理页面
        this.$emit("update:isShow", false);
        uniScrollTop();
      }
    }
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
.c-title {
  color: #d7d8e0;
  font-size: 24rpx;
}

.uni-checkbox .uni-checkbox-input {
  background: #0060a9;
  border-radius: 4rpx;
  width: 36rpx;
  height: 36rpx;
}
.breadcrumb {
  font-size: 40rpx;
  font-family: MicrosoftYaHei;
  color: rgba(0, 148, 179, 0.5);
  margin: 20rpx 0 28rpx 0;
  padding-left: 30rpx;
}
.invite-detail {
  .event-info {
    width: 84%;
    margin: 26rpx auto 0;
    .label-value {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24rpx;
      margin-bottom: 16rpx;
      .title {
        text-align: right;
        // width: 34%;
        color: #9fa6af;
      }
      .value {
        display: flex;
        flex: 1;
        padding-left: 20rpx;
        align-items: flex-end;
        .count {
          width: 100%;
          height: 48rpx;
          border-radius: 16rpx;
          border: 2rpx solid rgba(230, 241, 255, 0.2);
          line-height: 48rpx;
          padding-left: 14rpx;
          color: #00c8ff;
          font-family: square-font;
        }
        .unit {
          margin-left: 16rpx;
          font-size: 20rpx;
          color: rgba(255, 255, 255, 0.5);
          padding-left: 20rpx;
        }
      }
    }
  }
  .respond-count {
    display: flex;
    justify-content: space-between;
    margin-top: 18rpx;
    margin-bottom: 30rpx;
    .list-item {
      display: flex;
      align-items: center;
      .iconfont {
        font-size: 60rpx;
        color: #32c5ff;
      }
      .title-value {
        margin-left: 14rpx;
        .title {
          font-size: 24rpx;
          font-family: MicrosoftYaHei;
          color: #9fa6af;
        }
        .value {
          margin-top: 14rpx;
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          .count {
            font-size: 32rpx;
            color: #32c5ff;
            font-family: square-font;
          }
          .unit {
            font-size: 28rpx;
            color: #0094b3;
            padding: 20rpx;
          }
        }
      }
    }
  }
  ::v-deep .u-divider {
    margin: 40rpx 0 22rpx !important;
    .u-line {
      border-color: #ffffff33 !important;
    }
  }
  // 筛选
  .user {
    .screen {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20rpx;
        font-size: 24rpx;
      }
      .sx {
        color: #0094b380;
      }
    }
    &-list {
      padding-top: 30rpx;
    }
    &-list-item {
      background: rgba(0, 142, 181, 0.2);
      border-radius: 16rpx;
      padding: 20rpx 30rpx;
      margin-bottom: 20rpx;
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 28rpx;
        margin-right: 16rpx;
        color: #0094b3;
      }
      .mid {
        flex: 1;

        &-name {
          font-size: 32rpx;
          font-family: MicrosoftYaHei;
          color: #e6f1ff;
          line-height: 24rpx;
        }
        &-bottom {
          margin-top: 10rpx;
          .status {
            width: 128rpx;
            height: 44rpx;
            background: #0091ff;
            border-radius: 10rpx;
            text-align: center;
            /* line-height: 44rpx; */
            display: inline-block;
            color: #ffffff;
          }
          .value {
            font-size: 32rpx;
            margin-left: 30rpx;
            color: #f7b500;
            font-family: square-font;
            .unit {
              font-size: 20rpx;
              color: #0094b3;
              padding-left: 20rpx;
            }
          }
        }
      }
      .right {
        color: #00c8ff;
        // width: 80rpx;
        line-height: 70rpx;
      }
    }
  }
  .bottom {
    margin-top: 50rpx;
    margin-bottom: 60rpx;
    .back {
      margin-top: 10rpx;
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
    }
    .btns {
      margin-top: 60rpx;
      display: flex;
      justify-content: space-around;
      padding-bottom: 40rpx;
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
