<template>
  <view class="resource-all">
    <view class="lists">
      <List titleTxt="接入用户总览" fontClass="icon-iconJSC_1_0-title">
        <view class="ul indent">
          <view class="li">
            <text class="iconfont icon-iconJSC_1_1"></text>
            <view class="txt">
              <view>接入设备</view>
              <view class="num">232</view>
            </view>
          </view>
          <view class="li">
            <text class="iconfont icon-iconJSC_1_2"></text>
            <view class="txt">
              <view>响应设备</view>
              <view class="num">230</view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="接入设备总览" fontClass="icon-iconJSC_2_0-title">
        <view class="ul indent">
          <view class="li">
            <text class="iconfont icon-iconJSC_2_1"></text>
            <view class="txt">
              <view>接入用户</view>
              <view class="num">232</view>
            </view>
          </view>
          <view class="li">
            <text class="iconfont icon-iconJSC_2_2"></text>
            <view class="txt">
              <view>响应用户</view>
              <view class="num">230</view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="响应能力总览" fontClass="icon-iconJSC_3_0-title">
        <view class="ul resopnse-ul">
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon1.png" alt="" />
            <view class="txt">
              <view>可调负荷</view>
              <view class="num"> 266<text>kW</text></view>
            </view>
          </view>
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon2.png" alt="" />
            <view class="txt">
              <view>日内响应</view>
              <view class="num">230<text>kW</text></view>
            </view>
          </view>
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon3.png" alt="" />
            <view class="txt">
              <view>最大响应</view>
              <view class="num">245<text>kW</text></view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="年度响应统计" fontClass="icon-iconJSC_4_0-title">
        <view class="chart-box">
          <!-- :canvas2d="true" -->
          <qiun-data-charts
            type="mix"
            :opts="opts"
            :chartData="chartData"
            :canvas2d="true"
            s
          />
        </view>
      </List>
    </view>
  </view>
</template>

<script>
import List from "@/components/list.vue";
export default {
  components: { List },
  props: {},
  data() {
    return {
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
              title: "负荷 kWh",
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
    };
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["1", "2", "3", "4", "5", "6"],
          series: [
            {
              index: 0,
              name: "响应负荷",
              type: "column",
              textSize: 1,
              // show: false,
              // data: [40,{"value":30,"color":"#f04864"},55,110,24,58]
              data: [120, 140, 105, 170, 95, 160],
            },
            {
              name: "用户数量",
              index: 0,
              type: "line",
              lineType: "solid",
              color: "#2fc25b",
              textSize: 1,
              pointShape: "none",
              data: [40, 60, 55, 110, 24, 58],
            },
          ],
        };
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  },
  onReady() {
    this.getServerData();
  },
};
</script>

<style lang="scss" scoped>
.lists {
  .ul {
    display: flex;
    justify-content: space-between;
    &.indent {
      padding-left: 66rpx;
    }
    .li {
      display: flex;
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
}
</style>
