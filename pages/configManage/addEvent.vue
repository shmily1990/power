<template>
  <view>
    <view class="detail-title flex between">
      <text>新建事件</text>
    </view>
    <List titleTxt="事件名称" fontClass="icon-iconJSC_2_0-title">
      <!-- <template slot="optBtn">
        <button class="mini-btn" type="default" size="mini">保存</button>
      </template> -->
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">事件名称</view>
          <input class="uni-input" />
        </view>
      </view>
    </List>

    <List titleTxt="基本信息" fontClass="icon-iconJSC_2_0-title">
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">事件来源</view>
          <input class="uni-input" />
        </view>
        <view class="uni-form-item flex">
          <view class="title">事件类型</view>
          <view class="uni-list-cell-db">
            <view class="arrow"></view>
            <picker
              @change="pickerEveChange"
              :value="eveIdx"
              :range="pickerArray.eventName"
            >
              <view class="picker">
                {{ pickerArray.eventName[eveIdx] }}
              </view>
            </picker>
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">发布时间</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="publishTime" />
          </view>
        </view>
      </view>
    </List>
    <List titleTxt="调控指标" fontClass="icon-iconJSC_2_0-title">
      <view class="card-content">
        <view class="uni-form-item flex">
          <image class="curr-img" src="@/static/user.png"></image>
          <view class="title number">2000</view>
          <text class="itemtext">kw</text>
        </view>
      </view>
    </List>
    <List titleTxt="执行时间" fontClass="icon-iconJSC_2_0-title">
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="startTime" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <view class="title">持续时长</view>
          <input class="uni-input account" />
          <text class="itemtext">分钟</text>
        </view>
      </view>
    </List>
    <List titleTxt="事件描述" fontClass="icon-iconJSC_2_0-title">
      <view class="card-content">
        <view class="uni-form-item flex">
          <textarea
            class="textarea"
            placeholder-style="color:#19D8FF"
            placeholder="请输入"
            auto-height
            value=""
          />
        </view>
      </view>
    </List>

    <view class="bottom flex around">
      <text @click="onBack" class="btn">取消事件</text>
      <text @click="add" class="btn">保存事件</text>
    </view>
  </view>
</template>

<script>
import List from "@/components/list.vue";
import datapicker from "@/components/datePicker";
export default {
  components: {
    datapicker,
    List,
  },
  data() {
    return {
      startTime: "2022-02-03 11:22",
      publishTime: "2022-02-02 11:22",
      checkValue: false,
      pickerArray: {
        isRelation: ["未关联", "已关联"],
        eventName: [
          "事件名称A",
          "事件名称B",
          "事件名称C",
          "事件名称D",
          "事件名称E",
        ],
      },
      eveIdx: 0,
      relationIdx: 0,
    };
  },
  onLoad() {},
  computed: {
    chooseText(val) {
      return this.checkValue ? "全不选" : "全选";
    },
  },
  methods: {
    checkboxChange(e) {
      console.log(e, this.checkValue);
      this.checkValue = e.detail.value.length > 0;
    },
    //
    pickerRelationChange(e) {
      this.relationIdx = e.detail.value;
    },
    // 是否关联下拉
    pickerEveChange(e) {
      this.eveIdx = e.detail.value;
    },
    // 取消事件
    onBack() {
      this.$emit("onback");
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-title {
  font-size: 40rpx;
  font-family: MicrosoftYaHei;
  color: rgba(0, 148, 179, 0.5);
  margin: 20rpx 0 28rpx 0;
  padding-left: 30rpx;
  .r {
    color: #00c8ff;
  }
}
.mini-btn {
  background: rgba(0, 200, 255, 0.3);
  border-radius: 12rpx;
  font-size: 24rpx;
  color: #e6f1ff;
  margin: 0;
}
.card-content {
  padding-left: 70rpx;
  .uni-form-item {
    margin-bottom: 16rpx;
    .title {
      font-size: 24rpx;
    }
    .number {
      background: rgba(0, 142, 181, 0.2);
      border-radius: 12rpx;
      font-size: 40rpx;
      color: #f7b500;
      height: 72rpx;
      width: 55%;
      text-align: center;
      line-height: 72rpx;
      margin-right: 20rpx;
      margin-left: 20rpx;
      font-family: square-font;
    }
    .curr-img {
      width: 68rpx;
      height: 60rpx;
    }
    .count {
      font-size: 32rpx;
      color: #19d8ff;
      margin-right: 20rpx;
    }
    .numcount {
      font-size: 32rpx;
      margin-right: 20rpx;
      color: #f7b500;
    }
  }
  .uni-input,
  .uni-list-cell-db {
    border-radius: 16rpx;
    border: 2rpx solid rgba(230, 241, 255, 0.2);
    padding: 0rpx 20rpx;
    font-size: 24rpx;
    color: #19d8ff;
    margin-left: 6rpx;
    width: 292rpx;
    height: 48rpx;
    line-height: 48rpx;
    position: relative;
    .arrow {
      position: absolute;
      border: 12rpx solid transparent;
      border-top-color: #00c8ff;
      right: 16rpx;
      top: 16rpx;
    }
  }
  .textarea {
    border-radius: 16rpx;
    border: 2rpx solid rgba(230, 241, 255, 0.2);
    padding: 20rpx;
    width: 400rpx;
    min-height: 104rpx;
    font-size: 24rpx;
    color: #0094b3;
  }
  .account {
    width: 146rpx;
    margin-right: 20rpx;
  }
}
.bottom {
  margin-top: 48rpx;
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
</style>
