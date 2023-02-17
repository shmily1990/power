<template>
  <view>
    <view class="detail-title flex between">
      <text>事件详情</text>
      <text class="r">event7788</text>
    </view>
    <List titleTxt="事件名称" fontClass="icon-iconPZGL_SJGL_5-0-title">
      <template slot="optBtn">
        <button
          v-if="!datas.evePartOne.show"
          class="mini-btn"
          type="default"
          @click="edit('evePartOne')"
          size="mini"
        >
          编辑
        </button>
        <button
          v-else
          class="mini-btn"
          type="default"
          @click="save('evePartOne')"
          size="mini"
        >
          保存
        </button>
      </template>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">事件名称</view>
          <input v-if="datas.evePartOne.show" class="uni-input" />
          <text v-else>事件名称名称</text>
        </view>
        <view class="uni-form-item flex">
          <view class="title">是否关联</view>
          <view class="uni-list-cell-db" v-if="datas.evePartOne.show">
            <picker
              @change="pickerRelationChange"
              :value="relationIdx"
              :range="pickerArray.isRelation"
            >
              <view class="picker">
                {{ pickerArray.isRelation[relationIdx] }}
              </view>
            </picker>
          </view>
          <text v-else>未关联</text>
        </view>
      </view>
    </List>
    <List titleTxt="基本信息" fontClass="icon-iconKSYY_SJXQ_1-0-title">
      <template slot="optBtn">
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </template>
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
    <List titleTxt="调控指标" fontClass="icon-iconKSYY_SJXQ_2-0-title">
      <template slot="optBtn">
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </template>
      <view class="card-content">
        <view class="uni-form-item flex">
          <text class="iconfont icon-iconKSYY_SJXQ_2-1"></text>
          <view class="title number">2000</view>
          <text class="itemtext">kw</text>
        </view>
      </view>
    </List>
    <List titleTxt="执行时间" fontClass="icon-iconKSYY_SJXQ_3-0-title">
      <template slot="optBtn">
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </template>
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
    <List titleTxt="事件描述" fontClass="icon-iconKSYY_SJXQ_4-0-title">
      <template slot="optBtn">
        <button class="mini-btn" type="default" size="mini">编辑</button>
      </template>
      <view class="card-content">
        <view class="uni-form-item flex">
          <view class="title">开始时间</view>
          <view class="uni-list-cell-db">
            <datapicker :timeValue.sync="startTime" />
          </view>
        </view>
        <view class="uni-form-item flex">
          <textarea
            class="textarea"
            placeholder-style="color:#19D8FF"
            placeholder="请输入内容"
            auto-height
            value="该事件已于2022年10月5日14:00顺执行结果...."
          />
        </view>
      </view>
      <view class="chart-content">
        <view class="chart-title flex">
          <text class="iconfont icon-iconDR_day_inactive"></text>

          <text>响应结果曲线</text>
        </view>
        <view class="chart-box">
          <qiun-data-charts type="line" :opts="opts" :chartData="chartData" />
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
import { uniScrollTop } from "@/utils/common.js";

export default {
  components: {
    datapicker,
    List,
  },
  data() {
    return {
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
        enableScroll: false,
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
      datas: {
        evePartOne: {
          show: false,
          eventName: "ldd",
        },
        evePartTwo: {
          show: false,
        },
        evePartOne: {
          show: false,
        },
        evePartOne: {
          show: false,
        },
        evePartOne: {
          show: false,
        },
      },
    };
  },
  onLoad() {},
  computed: {
    chooseText(val) {
      return this.checkValue ? "全不选" : "全选";
    },
  },
  onReady() {
    this.getServerData();
  },
  mounted() {
    console.log("555子页面");
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["15:00", "15:10", "15:20", "15:30", "15:40"],
          series: [
            {
              name: "目标值",
              textSize: 1,
              data: [75, 48, 65, 66, 50, 60],
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
            },
            {
              name: "完成量",
              textSize: 1,
              data: [90, 80, 100, 80, 90, 100],
            },
            {
              name: "园区",
              textSize: 1,
              data: [110, 90, 110, 120, 112, 150],
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
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
</style>