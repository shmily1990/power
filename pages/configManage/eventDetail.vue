<template>
  <view>
    <view class="detail-title flex between">
      <text>事件详情</text>
      <!-- <text class="r">{{ eventInfo.eventID }}</text> -->
    </view>

    <List titleTxt="事件名称" fontClass="icon-iconPZGL_SJGL_5-0-title">
      <template slot="optBtn" v-if="eventInfo.status == 1">
        <button
          class="mini-btn"
          type="default"
          size="mini"
          @click="editEventName"
        >
          {{ eventNameForm.editStatus ? '保存' : '编辑' }}
        </button>
      </template>
      <view class="card-content form-box">
          <u-form :model="eventNameForm.form" ref="uForm" :label-style="style">
            <u-form-item label="事件名称"
              ><u-input v-model="eventNameForm.form.eventName" :disabled="!eventNameForm.editStatus"
            /></u-form-item>
            <u-form-item label="是否关联">
              <u-input
                :value="eventNameForm.form.isRelation ? '已关联' : '未关联'"
                disabled
                class="r4easdf"
              />
            </u-form-item>
        </u-form>
      </view>
    </List>
    <List titleTxt="基本信息" fontClass="icon-iconKSYY_SJXQ_1-0-title">
      <template slot="optBtn" v-if="eventInfo.status == 1">
        <button class="mini-btn" type="default" size="mini" @click="editBaseInfo">{{ baseInfoForm.editStatus ? '保存' : '编辑' }}</button>
      </template>
      <view class="card-content form-box">
        <u-form :model="baseInfoForm.form" ref="uForm" :label-style="style">
          <u-form-item label="事件来源"
            ><u-input v-model="baseInfoForm.form.eventSource" :disabled="!baseInfoForm.editStatus"
          /></u-form-item>
          <u-form-item label="事件类型">
            <picker
              @change="handleTypeChange"
              :value="typeIndex"
              :range="typeList"
              range-key="name"
              :disabled="!baseInfoForm.editStatus"
            >
              <u-input
                :value="currentEventTypeName"
                disabled
                suffixIcon="arrow-down-fill"
                suffixIconStyle="color: #909399;font-size: 12px;"
              />
            </picker>
          </u-form-item>
          <u-form-item label="发布时间">
            <datapicker :timeValue.sync="baseInfoForm.form.releaseDate"  class="form-item-time" :disabled="!baseInfoForm.editStatus" />
          </u-form-item>
        </u-form>
      </view>
    </List>
    <List titleTxt="调控指标" fontClass="icon-iconKSYY_SJXQ_2-0-title">
      <template slot="optBtn" v-if="eventInfo.status == 1">
        <button class="mini-btn" type="default" size="mini" @click="editTarget">{{ targetForm.editStatus ? '保存' : '编辑' }}</button>
      </template>

      <view class="card-content">
        <view class="uni-form-item flex">
          <text class="iconfont icon-iconKSYY_SJXQ_2-1"></text>
          <view class="title number"><u-input v-model="targetForm.form.target" :disabled="!targetForm.editStatus" /></view>
          <text class="itemtext">kw</text>
        </view>
      </view>
    </List>
    <List titleTxt="执行时间" fontClass="icon-iconKSYY_SJXQ_3-0-title">
      <template slot="optBtn" v-if="eventInfo.status == 1">
        <button class="mini-btn" type="default" size="mini" @click="editExecutionTime">{{ executionTime.editStatus ? '保存' : '编辑' }}</button>
      </template>
      <view class="card-content form-box">
        <u-form :model="executionTime.form" ref="uForm" :label-style="style">
          <u-form-item label="开始时间">
             <datapicker :timeValue.sync="executionTime.form.startDate" class="form-item-time" :disabled="!executionTime.editStatus" />
          </u-form-item>
          <u-form-item label="持续时间">
            <view class="formItemAndUnit">
              <u-input v-model="executionTime.form.lastDate" :disabled="!executionTime.editStatus" /><text class="unit">分钟</text>
            </view>
          </u-form-item>
        </u-form>
      </view>
    </List>
    <List titleTxt="事件描述" fontClass="icon-iconKSYY_SJXQ_4-0-title">
      <template slot="optBtn" v-if="eventInfo.status == 1">
        <button class="mini-btn" type="default" size="mini" @click="editEventDes">{{ eventDesForm.editStatus ? '保存' : '编辑' }}</button>
      </template>
      <view class="card-content">
        <view class="uni-form-item flex">
          <textarea
            :disabled="!eventDesForm.editStatus"
            class="textarea"
            placeholder-style="color:#19D8FF"
            placeholder="请输入内容"
            auto-height
            @blur="bindTextAreaBlur"
            :value="eventDesForm.form.desc"
          />
        </view>
      </view>
      <view class="chart-content" v-if="eventInfo.status === 4">
        <view class="chart-title flex">
          <text class="iconfont icon-iconDR_day_inactive"></text>
          <text>响应结果曲线</text>
        </view>
        <view class="chart-box">
          <qiun-data-charts
            type="line"
            :opts="opts"
            :chartData="chartData"
            :inScrollView="true"
            :canvas2d="true"
            canvasId="canvasId85755"
            :pageScrollTop="900"
          />
        </view>
      </view>
    </List>

    <view class="bottom flex center" @click="onBack">
      <image src="~@/static/icon-back.png" class="img-back" />
      <text class="title">返回</text>
    </view>
  </view>
</template>

<script>
import List from "@/components/list.vue";
import datapicker from "@/components/datePicker";
import { queryEventByID, updateEvent } from "@/api/event/index.js";
import { queryRespCurve } from "@/api/cockpit/index.js"
import { uniScrollTop, eventTypeList } from "@/utils/common.js";

export default {
   options: {
    styleIsolation: "shared",
  },
  components: {
    datapicker,
    List,
  },
  props: {
    eventInfo: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      typeList: eventTypeList,
      opts: {
        color: [
          "#19D8FF",
          "#0DFF9A",
          "#FFD76A",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
        ],
        padding: [15, 0, 0, 5],
        // enableScroll: false,
        legend: {
          position: "top",
          float: "right",
          fontColor: "#9FA6AF",
          fontSize: 12,
          lineHeight: 60,
          show: false,
        },
        xAxis: {
          disableGrid: true,
          // title: "单位：年"
          axisLineColor: "#0D6798",
          fontColor: "rgba(0,200,255,0.3)",
          fontSize: 12,
          itemCount: 4,
          rotateLabel: true
        },
        yAxis: {
          disabled: false,
          disableGrid: true,
          // splitNumber: 5,
          gridColor: "#9FA6AF",
          padding: 10,
          showTitle: true,
          data: [
            {
              position: "left",
              title: "负荷 kWh",
              axisLineColor: "#0D6798",
              fontColor: "rgba(0,200,255,0.3)",
              fontSize: 12,
              titleFontSize: 14,
              titleFontColor: "rgba(0,200,255,0.3)",
              titleOffsetY: -6,
            },
          ],
        },
        extra: {
          line: {
            type: "curve",
            width: 2,
            activeType: "solid",
            onShadow: false,
          },
        },
      },
      chartData: {},
      // startTime: "2022-02-03 11:22",
      // publishTime: "2022-02-02 11:22",
      // checkValue: false,
      // pickerArray: {
      //   isRelation: ["未关联", "已关联"],
      //   eventName: [
      //     "事件名称A",
      //     "事件名称B",
      //     "事件名称C",
      //     "事件名称D",
      //     "事件名称E",
      //   ],
      // },
      // eveIdx: 0,
      // relationIdx: 0,
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
      typeIndex: 0
    };
  },
  computed: {
    currentEventTypeName() {
      const item = this.typeList.find((c) => c.value == this.baseInfoForm.form.eventType) || {}
      return item.name;
    },
  },
  onReady() {
    this.getDetail()
    if (this.eventInfo.status != 1) {
      this.queryChartData()
    }
  },
  mounted() {},
  methods: {
    // 更新接口
    async update(currentForm) {
      const { form: { eventName }} = this.eventNameForm
      const { form: { releaseDate, eventType, eventSource }} = this.baseInfoForm
      const { form: { target} } = this.targetForm
      const { form: { startDate, lastDate }} = this.executionTime
      const { form: { desc }} = this.eventDesForm
      const params = {
        eventID: this.eventInfo.eventID,
        eventName,
        releaseDate,
        eventType,
        eventSource,
        target,
        startDate,
        lastDate,
        desc
      }
      const { resultCode } = await updateEvent(params)
      if (!resultCode) {
        currentForm.editStatus = false
        uni.showToast({ title: "更新事件成功", icon: "none" });
      }
    },
    // 编辑事件名称
    editEventName() {
      if (!this.eventNameForm.editStatus) {
        if (this.baseInfoForm.editStatus || this.targetForm.editStatus ||this.executionTime.editStatus || this.eventDesForm.editStatus) {
          uni.showToast({ title: "当前有未保存内容，请先保存", icon: "none" });
        } else {
          this.eventNameForm.editStatus = !this.eventNameForm.editStatus
        }
      } else {
        this.update(this.eventNameForm)
      }
    },
    // 编辑基础信息
    editBaseInfo() {
      if (!this.baseInfoForm.editStatus) {
        if (this.eventNameForm.editStatus || this.targetForm.editStatus ||this.executionTime.editStatus || this.eventDesForm.editStatus) {
          uni.showToast({ title: "当前有未保存内容，请先保存", icon: "none" });
        } else {
          this.baseInfoForm.editStatus = !this.baseInfoForm.editStatus
          this.typeIndex = this.typeList.findIndex(
            (c) => c.value === this.baseInfoForm.form.eventType
          );
        }
      } else {
         // 编辑接口
        this.update(this.baseInfoForm)
      }
    },
    // 编辑指标
    editTarget() {
      
      if (!this.targetForm.editStatus) {
        if (this.eventNameForm.editStatus || this.baseInfoForm.editStatus ||this.executionTime.editStatus || this.eventDesForm.editStatus) {
          uni.showToast({ title: "当前有未保存内容，请先保存", icon: "none" });
        } else {
          this.targetForm.editStatus = !this.targetForm.editStatus
        }
      } else {
        // 编辑接口
        this.update(this.targetForm)
        
      }
    },
    // 执行时间
    editExecutionTime() {
      if (!this.executionTime.editStatus) {
        if (this.eventNameForm.editStatus || this.baseInfoForm.editStatus ||this.targetForm.editStatus || this.eventDesForm.editStatus) {
          uni.showToast({ title: "当前有未保存内容，请先保存", icon: "none" });
        } else {
          this.executionTime.editStatus = !this.executionTime.editStatus
        }
      } else {
        // 编辑接口
        this.update()
      }
    },
    // 事件描述
    editEventDes() {
      
      if (!this.eventDesForm.editStatus) {
        if (this.eventNameForm.editStatus || this.baseInfoForm.editStatus ||this.targetForm.editStatus || this.executionTime.editStatus) {
          uni.showToast({ title: "当前有未保存内容，请先保存", icon: "none" });
        } else {
          this.eventDesForm.editStatus = !this.eventDesForm.editStatus
        }
      } else {
        // 编辑接口
        this.update()
      }
    },
    bindTextAreaBlur(e) {
      this.eventDesForm.form.desc = e.detail.value
    },
    // 查询事件详情
    async getDetail() {
      const { resultData, resultCode } = await queryEventByID({
        eventId: this.eventInfo.eventID
      })
      if (!resultCode) {
        const { isRelation, eventName, eventSource, eventType, lastDate, startDate, target, desc, releaseDate  } = resultData
        this.eventNameForm.form = { isRelation, eventName }
        this.baseInfoForm.form = { eventSource, eventType, releaseDate }
        this.targetForm.form = { target }
        this.executionTime.form = { startDate, lastDate }
        this.eventDesForm.form = { desc }
      }
    },
    // 获取曲线数据
    async queryChartData() {
      const { resultCode, resultData } = await queryRespCurve({ eventId: this.eventInfo.eventID })
      if (!resultCode) {
        if (resultData && resultData.length) {
          const xAxisData = []
          const data = []
          resultData.forEach(c => {
            xAxisData.push(c.responseTime.slice(-5))
            data.push(c.responseLoad)
          })
          let res = {
            categories: xAxisData,
            series: [
              {
                name: "目标值",
                textSize: 1,
                data,
                lineStyle: {
                  normal: {
                    //线的颜色
                    color: "#f00",
                    shadowColor: "rgba(0, 0, 0, 1)",
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                  },
                },
                itemStyle: {
                  //面积图里的颜色和圆点里的颜色
                  color: "#00ca95",
                  //圆点外的颜色
                  borderColor: "#fff",
                  //圆点的宽度
                  borderWidth: 10,
                  //圆点影子的颜色
                  shadowColor: "rgba(0, 0, 0, 1)",
                  //阴影的模糊级数
                  shadowBlur: 0,
                  //阴影的偏移效果
                  shadowOffsetY: 2,
                  shadowOffsetX: 2,
                },
              }
            ],
          };
          setTimeout(() => {
            this.chartData = JSON.parse(JSON.stringify(res));
          }, 500)
        } else {
          let res = {
            categories: [' '],
            series: [
              {
                name: "目标值",
                textSize: 1,
                data: [],
                lineStyle: {
                  normal: {
                    //线的颜色
                    color: "#f00",
                    shadowColor: "rgba(0, 0, 0, 1)",
                    shadowBlur: 0,
                    shadowOffsetY: 5,
                    shadowOffsetX: 5,
                  },
                },
                itemStyle: {
                  //面积图里的颜色和圆点里的颜色
                  color: "#00ca95",
                  //圆点外的颜色
                  borderColor: "#fff",
                  //圆点的宽度
                  borderWidth: 10,
                  //圆点影子的颜色
                  shadowColor: "rgba(0, 0, 0, 1)",
                  //阴影的模糊级数
                  shadowBlur: 0,
                  //阴影的偏移效果
                  shadowOffsetY: 2,
                  shadowOffsetX: 2,
                },
              }
            ],
          };
          setTimeout(() => {
            this.chartData = JSON.parse(JSON.stringify(res));
          }, 500)
        }
      }
    },
    // checkboxChange(e) {
    //   console.log(e, this.checkValue);
    //   this.checkValue = e.detail.value.length > 0;
    // },
    // //
    // pickerRelationChange(e) {
    //   this.relationIdx = e.detail.value;
    // },
    // // 是否关联下拉
    // pickerEveChange(e) {
    //   this.eveIdx = e.detail.value;
    // },

    // 返回按钮调用
    onBack() {
      this.$emit("onback");
      uniScrollTop();
    },
    /**
     *  edit 编辑每部分
     */
    edit(part) {
      this.datas[part].show = !this.datas[part].show;
    },
    /**
     * save 保存每部分
     */
    save(part) {
      this.datas[part].show = false;
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
    height: 350rpx;
  }
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