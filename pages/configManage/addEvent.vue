<template>
  <view>
    <view class="detail-title flex between">
      <text>新建事件</text>
    </view>

    <List titleTxt="事件名称" fontClass="icon-iconPZGL_SJGL_5-0-title">
      <view class="card-content form-box">
          <u-form :model="eventNameForm.form" ref="uForm1" :label-style="style" :rules="rules">
            <u-form-item label="事件名称" prop="eventName"
              ><u-input v-model="eventNameForm.form.eventName"
            /></u-form-item>
        </u-form>
      </view>
    </List>
    <List titleTxt="基本信息" fontClass="icon-iconKSYY_SJXQ_1-0-title">
      <view class="card-content form-box">
        <u-form :model="baseInfoForm.form" ref="uForm2" :label-style="style" :rules="rules">
          <u-form-item label="事件来源" prop="eventSource"
            ><u-input v-model="baseInfoForm.form.eventSource"
          /></u-form-item>
          <u-form-item label="事件类型">
            <picker
              @change="handleTypeChange"
              :value="typeIndex"
              :range="typeList"
              range-key="name"
            >
              <u-input
                :value="currentEventTypeName"
                disabled
                suffixIcon="arrow-down-fill"
                suffixIconStyle="color: #909399;font-size: 12px;"
              />
            </picker>
          </u-form-item>
          <u-form-item label="发布时间" prop="releaseDate">
            <datapicker :timeValue.sync="baseInfoForm.form.releaseDate"  class="form-item-time" />
          </u-form-item>
        </u-form>
      </view>
    </List>
    <List titleTxt="调控指标" fontClass="icon-iconKSYY_SJXQ_2-0-title">
      <view class="card-content">
        <view class="uni-form-item flex">
          <text class="iconfont icon-iconKSYY_SJXQ_2-1"></text>
          <view class="title number"><u-input v-model="targetForm.form.target" /></view>
          <text class="itemtext">kw</text>
        </view>
      </view>
    </List>
    <List titleTxt="执行时间" fontClass="icon-iconKSYY_SJXQ_3-0-title">
      <view class="card-content form-box">
        <u-form :model="executionTime.form" ref="uForm3" :label-style="style" :rules="rules">
          <u-form-item label="开始时间" prop="startDate">
             <datapicker :timeValue.sync="executionTime.form.startDate" class="form-item-time" />
          </u-form-item>
          <u-form-item label="持续时间" prop="lastDate">
            <view class="formItemAndUnit">
              <u-input v-model="executionTime.form.lastDate" /><text class="unit">分钟</text>
            </view>
          </u-form-item>
        </u-form>
      </view>
    </List>
    <List titleTxt="事件描述" fontClass="icon-iconKSYY_SJXQ_4-0-title">
      <view class="card-content">
        <view class="uni-form-item flex">
          <textarea
            class="textarea"
            placeholder-style="color:#19D8FF"
            placeholder="请输入内容"
            auto-height
            @blur="bindTextAreaBlur"
            :value="eventDesForm.form.desc"
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
import { addEvent } from "@/api/event/index.js";
import { uniScrollTop, eventTypeList } from "@/utils/common.js";

export default {
   options: {
    styleIsolation: "shared",
  },
  components: {
    datapicker,
    List,
  },
  data() {
    return {
      typeList: eventTypeList,
      eventDetail: {},
      style: {
        color: "#9FA6AF",
        fontSize: "24rpx",
        display: "block",
        textAlign: "right",
        width: "128rpx",
      },
      eventNameForm: { // 事件名称form数据
        editStatus: false,
        form: {
          eventName: '',
          isRelation: false
        }
      },
      baseInfoForm: { // 基本信息
        editStatus: false,
        form: {
          eventSource: '',
          eventType: 30,
          releaseDate: ''
        }
      },
      targetForm: { // 指标
        editStatus: false,
        form: {
          target: 0
        }
      },
      executionTime: { // 执行时间
        editStatus: false,
        form: {
          startDate: '',
          lastDate: ''
        }
      },
      eventDesForm: {
        editStatus: false,
        form: {
          des: ''
        }
      },
      typeIndex: 0,
      // 表单校验
      rules: {
        eventName: {
          type: "string",
          required: true,
          message: "请输入事件名",
          trigger: ["blur", "change"],
        },
        eventSource: {
          type: "string",
          required: true,
          message: "请输入事件来源",
          trigger: ["blur", "change"],
        },
        releaseDate: {
          type: "string",
          required: true,
          message: "请选择发布时间",
          trigger: ["blur", "change"],
        },
        startDate: {
          type: "string",
          required: true,
          message: "请选择开始时间",
          trigger: ["blur", "change"],
        },
        lastDate: {
          type: "string",
          required: true,
          message: "请输入持续时间",
          trigger: ["blur", "change"],
        }
      },
    };
  },
  computed: {
    currentEventTypeName() {
      return (
        this.typeList.find((c) => c.value === this.baseInfoForm.form.eventType)?.name ||
        ""
      );
    },
  },
  onReady() {},
  mounted() {},
  methods: {
    // 提交接口
    async add() {
      // 表单校验
      await this.$refs.uForm1.validate()
      await this.$refs.uForm2.validate()
      await this.$refs.uForm3.validate()
      const { form: { eventName }} = this.eventNameForm
      const { form: { releaseDate, eventType, eventSource }} = this.baseInfoForm
      const { form: { target} } = this.targetForm
      const { form: { startDate, lastDate }} = this.executionTime
      const { form: { desc }} = this.eventDesForm
      const params = {
        eventName,
        releaseDate: releaseDate.replace(/\./g, "-"),
        eventType: 30,
        eventSource,
        target,
        startDate: startDate.replace(/\./g, "-"),
        lastDate,
        desc
      }
      const { resultCode } = await addEvent(params)
      if (!resultCode) {
        uni.showToast({ title: "保存事件成功", icon: "none" });
        this.onBack()
      }
    },
    bindTextAreaBlur(e) {
      this.eventDesForm.form.desc = e.detail.value
    },
    // 返回按钮调用
    onBack() {
      this.$emit("onback");
      uniScrollTop();
    },
    // 用户类型选择
    handleTypeChange(e) {
      this.typeIndex = e.detail.value;
      this.baseInfoForm.form.eventType = this.typeList[Number(this.typeIndex)].value;
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
  
  // padding-left: 70rpx;
  .uni-form-item {
    margin-bottom: 16rpx;
    .iconfont {
      font-size: 68rpx;
      color: #06648b;
    }
    .title {
      font-size: 24rpx;
    }
    text {
      font-size: 24rpx;
      color: #19d8ff;
      margin-left: 26rpx;
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
    width: 600rpx;
    min-height: 104rpx;
    font-size: 24rpx;
    color: #0094b3;
  }
  .account {
    width: 146rpx;
    margin-right: 20rpx;
  }
}
.chart-content {
  .chart-title {
    font-size: 28rpx;
    color: #00c8ff;
    margin: 28rpx 0 12rpx;
    .iconfont {
      margin-right: 18rpx;
      font-size: 50rpx;
      color: #0d6798;
    }
  }
  .chart-box {
    width: 568rpx;
    height: 300rpx;
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
.form-box ::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    padding: 2rpx 9rpx !important;
    width: 380rpx;
    margin-left: 70rpx;
    background: none !important;
  }
  ::v-deep input {
    color: #00c8ff !important;
  }
.form-item-time {
  margin-left: 70rpx;
    border: 1px solid;
    width: 398rpx;
    border-color: #e6f1ff33 !important;
    height: 48rpx;
    line-height: 48rpx;
    border-radius: 8rpx;
    padding-left: 10rpx;
}
.formItemAndUnit {
  display: flex;
  align-items: center;
  width: 80% !important;
  .unit {
    padding: 40rpx;
    color: #ffffff80
  }
}
::v-deep .u-border {
    border-color: #e6f1ff33 !important;
    // padding: 2rpx 9rpx !important;
    // width: 380rpx;
    // margin-left: 70rpx;
    background: none !important;
  }
</style>