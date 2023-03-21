<template>
  <view class="resource-all">
    <view class="lists">
      <List titleTxt="我的响应设备" fontClass="icon-iconJSC_2_0-title">
        <view class="ul indent">
          <view class="li">
            <text class="iconfont icon-iconJSC_2_1"></text>
            <view class="txt">
              <view>设备总数量</view>
              <view class="num">{{ accessDeviceOverview.accessTotal }}</view>
            </view>
          </view>
          <view class="li">
            <text class="iconfont icon-iconJSC_2_2"></text>
            <view class="txt">
              <view>响应设备数量</view>
              <view class="num">{{ accessDeviceOverview.respondTotal }}</view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="我的响应能力" fontClass="icon-iconJSC_3_0-title">
        <view class="ul resopnse-ul">
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon1.png" alt="" />
            <view class="txt">
              <view>快速响应</view>
              <view class="num"> {{ responsivenessOverview.adjustableReview }}<text>kW</text></view>
            </view>
          </view>
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon2.png" alt="" />
            <view class="txt">
              <view>日内响应</view>
              <view class="num">{{ responsivenessOverview.intradayResponse }}<text>kW</text></view>
            </view>
          </view>
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon3.png" alt="" />
            <view class="txt">
              <view>中长期响应</view>
              <view class="num">{{ responsivenessOverview.maxResponse }}<text>kW</text></view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="年度响应统计" fontClass="icon-iconJSC_4_0-title">
        <view class="pie-chart">
          <view class="legend">
            <view class="legend-item">
              <text class="iconfont icon-iconUser-JSC-3-2" style="width:60rpx;height:60rpx"></text>
              <view class="txt">
                <view class="title">年度累计响应次数</view>
                <view class="num">{{ yearResponseInfo.annualResponseTimes }}<text class="unit">次</text></view>
              </view>
            </view>
            <view class="legend-item">
              <text class="iconfont icon-iconUser-JSC-3-1" style="width:60rpx;height:60rpx"></text>
              <view class="txt">
                <view class="title">年度累计响应负荷</view>
                <view class="num">{{ yearResponseInfo.annualResponseLoad || 0 }}<text class="unit">kW</text></view>
              </view>
            </view>
          </view>
          <view class="chart">
            <qiun-data-charts width="80" height="80" type="arcbar" :opts="opts2" :chartData="chartData2" :inScrollView="true" :canvas2d="true" />
            <view class="chart-title">年度参与度</view>
          </view>
        </view>
        <view class="chart-box">
          <qiun-data-charts
            type="mix"
            :opts="opts"
            :chartData="chartData"
            :inScrollView="true"
            :canvas2d="true"
          />
        </view>
      </List>
    </view>
  </view>
</template>

<script>
import List from "@/components/list.vue";
import { queryResourceOverview } from "@/api/cockpit/index.js";
export default {
  components: { List },
  props: {},
  data() {
    return {
      opts2: {
        color: [
          "#00f8ec",
          // "#05d0e7",
          // "#01bcf7",
          // "#0e94d7",
          "#0096f8",
        ],
        padding: undefined,
        title: {
          name: "80",
          fontSize: 18,
          color: "#19D8FF",
        },
        subtitle: {
          name: "%",
          fontSize: 18,
          color: "#ffffff80",
        },
        extra: {
          arcbar: {
            type: "circle",
            width: 4,
            backgroundColor: "#E9E9E9",
            startAngle: 1.5,
            endAngle: 0.25,
            gap: 2,
            lineCap: "butt",
            linearType: "custom",
            customColor: [
              "#00f8ec",
              // "#05d0e7",
              // "#01bcf7",
              // "#0e94d7",
              "#0096f8",
            ]
          },
        },
      },
      opts: {
        color: [
          "#0091FF",
          "#91CB74",
          "#FAC858",
          "#EE6666",
          "#73C0DE",
          "#3CA272",
          "#FC8452",
          "#9A60B4",
          "#ea7ccc",
        ],
        padding: [0, 0, 0, 5],
        enableScroll: false,
        legend: {
          position: "top",
          float: "right",
          fontColor: "#9FA6AF",
          fontSize: 12,
          lineHeight: 60,
          // show:false
        },
        xAxis: {
          disableGrid: true,
          // title: "单位：年"
          axisLineColor: "rgba(255,255,255,0.1)",
          fontColor: "#D8D8D8",
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
              title: " 负荷 kWh",
              axisLineColor: "rgba(255,255,255,0.1)",
              fontColor: "#D8D8D8",
              fontSize: 12,
              titleFontColor: "#9FA6AF",
              titleOffsetY: -6,
            },
          ],
        },
        extra: {
          mix: {
            column: {
              width: 10,
              linearOpacity: 0.5,
              customColor: ["#32C5FF", "#32C5FF"],
            },
          },
        },
      },
      chartData: {},
      chartData2: {},
      accessUserOverview: { // 用户
        accessTotal: 0,
        respondTotal: 0
      },
      accessDeviceOverview: { // 设备
        accessTotal: 0,
        respondTotal: 0
      },
      responsivenessOverview: { // 响应
        adjustableReview: 0,
        intradayResponse: 0,
        maxResponse: 0
      },
      yearResponseInfo: {
        annualResponseTimes: 0,
        annualResponseLoad: 0
      }
    };
  },
  methods: {
    // 统一方法便于刷新
    getData() {
      // 初始化数据
      this.queryData()
    },
    // 查询资源总览数据
    async queryData() {
      this.isEmpty = false
      const { resultCode, resultData } = await queryResourceOverview()
      if (!resultCode) {
        const { accessUserOverview, accessDeviceOverview, annualParticipation, responsivenessOverview, annualResponse, annualResponseTimes, annualResponseLoad } = resultData
        this.accessUserOverview = accessUserOverview
        this.accessDeviceOverview = accessDeviceOverview
        this.responsivenessOverview = responsivenessOverview
        this.yearResponseInfo = {
          annualResponseTimes,
          annualResponseLoad
        }
        this.buildPieChart(annualParticipation)
        // 这里处理图表数据
        if (annualResponse.length) {
          this.buildChart(annualResponse)
        } else {
          const res = {
          categories: [''],
          series: [
            {
              index: 0,
              name: "响应负荷",
              type: "column",
              textSize: 1,
              // show: false,
              // data: [40,{"value":30,"color":"#f04864"},55,110,24,58]
              data: [],
            },
            {
              name: "用户数量",
              index: 0,
              type: "line",
              lineType: "solid",
              color: "#2fc25b",
              textSize: 1,
              pointShape: "none",
              data: [],
            },
          ],
        }
          setTimeout(() => {
            this.chartData = JSON.parse(JSON.stringify(res));
          }, 500)
        }
      }
    },
    buildPieChart(value) {
      this.opts2.title.name = value
       setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          series: [
            {
              name: "年度参与度",
              color: "#2fc25b",
              data: parseFloat(value) / 100,
            },
          ],
        };
        this.chartData2 = JSON.parse(JSON.stringify(res));
      }, 500);
    },
    buildChart(data) {
      const xAxisData = []
      const responseData = []
      const userData = []
      data.forEach(item => {
        xAxisData.push(item.startMoth)
        responseData.push(item.responseLoad)
        userData.push(item.userNumber)
      })
      let res = {
        categories: xAxisData,
        series: [
          {
            index: 0,
            name: "响应负荷",
            type: "column",
            textSize: 1,
            // show: false,
            // data: [40,{"value":30,"color":"#f04864"},55,110,24,58]
            data: responseData,
          },
          {
            name: "用户数量",
            index: 0,
            type: "line",
            lineType: "solid",
            color: "#2fc25b",
            textSize: 1,
            pointShape: "none",
            data: userData,
          },
        ],
      }
      setTimeout(() => {
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500)
    }

  },
  onReady() {
    this.queryData()
  },
};
</script>

<style lang="scss" scoped>
.shadow {
	width: 100px;
	height: 100px;
	position: relative;
	border-radius: 50%;
	background: conic-gradient(#ddff5c 0%, #28d4c3 50%, #85ea8e 75%, #1d335c 75%, #1d335c 100%);
	mask: radial-gradient(transparent 44px, #000 45px);
  -webkit-mask: radial-gradient(transparent 44px, #000 45px);
}
.shadow::before {
	content: '';
	position: absolute;
	left: 48px;
	top: 0px;
	width: 5px;
	height: 5px;
	background: #ddff5c;
	border-radius: 50%;
}
.shadow::after {
	content: '';
	position: absolute;
	left: -1px;
	top: 44px;
	width: 8px;
	height: 8px;
	background: #85ea8e;
	border-radius: 50%;
}
.lists {
  .ul {
    display: flex;
    justify-content: space-between;
    &.indent {
      padding-left: 66rpx;
    }
    .li {
      display: flex;
      align-items: center;
      .jsc-icon {
        width: 40rpx;
        height: 40rpx;
        margin-right: 20rpx;
      }
      .iconfont {
        font-size: 60rpx;
        margin-right: 20rpx;
        color: #19d8ff;
      }
      .txt {
        font-size: 24rpx;
        color: rgba(255, 255, 255, 0.8);
        .num {
          font-size: 28rpx;
          color: #19d8ff;
          margin-top: 10rpx;
          font-family: square-font;
          text {
            color: rgba(255, 255, 255, 0.8);
            font-size: 20rpx;
            margin-left: 8rpx;
          }
        }
      }
    }
    &.resopnse-ul {
      .li {
        &:first-child {
          .txt {
            .num {
              color: #0dff9a;
            }
          }
        }
        &:nth-child(2) {
          .txt {
            .num {
              color: #f7b500;
            }
          }
        }
        &:last-child {
          .txt {
            .num {
              color: #fa6400;
            }
          }
        }
      }
    }
  }
  .chart-box {
    width: 568rpx;
    height: 350rpx;
    margin-top: -124rpx;
    .top {
      display: flex;
      justify-content: space-between;
      .legnd {
        font-size: 24rpx;
        display: flex;
        justify-content: space-between;
        .legnd {
          font-size: 24rpx;
          display: flex;
          i {
            margin-left: 20rpx;
          }
        }
      }
    }
  }
  .pie-chart {
    width: 100%;
    display: flex;
    margin-bottom: 50rpx;
    margin-top: 20rpx;
    padding-left: 40rpx;
    padding-top: 20rpx;
    // justify-content: space-between;
    
    .legend {
      margin-right: 50rpx;
      &-item {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        margin-bottom: 40rpx;
        .iconfont {
          font-size: 60rpx;
          margin-right: 20rpx;
          color: #19d8ff;
        }
        .txt {
          .title {
            color: #ffffffcc;
          }
          .num {
            color: #19D8FF;
            padding-top: 10rpx;
            font-family: square-font;
            .unit {
              color: #FFFFFF80;
              padding-left: 50rpx;
            }
          }
        }
      }
    }
    .chart {
      width: 168rpx;
      height: 168rpx;
      &-title {
        font-size: 24rpx;
        font-family: MicrosoftYaHei;
        color: rgba(230,241,255,0.8);
        text-align: center;
        padding-top: 10rpx;
      }
    }
  }
}
</style>
