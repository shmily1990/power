<template>
  <view class="resource-all">
    <view class="lists">
      <List titleTxt="调控能力监测" fontClass="icon-iconJSC_TKNL_1-0-title">
        <view class="ul capability-monitoring">
          <view class="li">
            <!--左-->
            <view class="l">
              <image class="jsc-icon" src="/static/jsc-icon1.png" alt="" />
              <view class="txt">
                <view class="top">总可调负荷</view>
                <view class="num load">232<text class="unit">kW</text></view>
              </view>
            </view>
            <!--右-->
            <view class="r load">
              <view class="top">
                <text>实际</text> <text>280kW</text><text>申报比例</text>
                <text> 95%</text>
              </view>
              <template>
                <u-line-progress
                  :percentage="95"
                  inactiveColor="#256079"
                  activeColor="#0DFF9A"
                  :showText="false"
                ></u-line-progress>
              </template>
            </view>
            <!--右结束-->
          </view>
          <!--li2-->
          <view class="li">
            <!--左-->
            <view class="l">
              <image class="jsc-icon" src="/static/jsc-icon2.png" alt="" />
              <view class="txt">
                <view class="top">总可调负荷</view>
                <view class="num response"
                  >232<text class="unit">kW</text></view
                >
              </view>
            </view>
            <!--右-->
            <view class="r response">
              <view class="top">
                <text>实际</text> <text>280kW</text> <text>申报比例 95%</text>
              </view>
              <template>
                <u-line-progress
                  :percentage="87"
                  inactiveColor="#256079"
                  activeColor="#F7B500"
                  :showText="false"
                ></u-line-progress>
              </template>
            </view>
            <!--右结束-->
          </view>
          <!--li3-->
          <view class="li">
            <!--左-->
            <view class="l">
              <image class="jsc-icon" src="/static/jsc-icon3.png" alt="" />
              <view class="txt">
                <view class="top">总可调负荷</view>
                <view class="num max-response"
                  >232<text class="unit">kW</text></view
                >
              </view>
            </view>
            <!--右-->
            <view class="r max-response">
              <view class="top">
                <text>实际</text> <text>280kW</text> <text>申报比例 95%</text>
              </view>
              <template>
                <u-line-progress
                  :percentage="97"
                  inactiveColor="#256079"
                  activeColor="#FA6400"
                  :showText="false"
                ></u-line-progress>
              </template>
            </view>
            <!--右结束-->
          </view>
        </view>
      </List>
      <List titleTxt="调控能力分布" fontClass="icon-iconJSC_TKNL_2-0-title">
        <template slot="optBtn">
          <view class="optBtn"
            ><text @click="btn_active = 1" :class="{ active: btn_active == 1 }"
              >区域</text
            ><text btn_active="2" :class="{ active: btn_active == 2 }"
              >用户</text
            ></view
          >
        </template>
        <view class="chart-box">
          <qiun-data-charts
            type="column"
            :opts="opts"
            :chartData="chartData"
            :canvas2d="true"
          />
        </view>
        <view class="range">
          <view class="max common">
            <view>最大响应<text class="name">园区D</text></view>
            <view
              >可调负荷<text class="name">430</text
              ><text class="unit">kW</text></view
            >
            <view
              >日内响应<text class="name">510</text
              ><text class="unit">kW</text></view
            >
            <view
              >最大响应<text class="name">620</text
              ><text class="unit">kW</text></view
            >
          </view>
          <!--min-->
          <view class="min common">
            <view>最小响应<text class="name">园区D</text></view>
            <view
              >可调负荷<text class="name">210</text
              ><text class="unit">kW</text></view
            >
            <view
              >日内响应<text class="name">230</text
              ><text class="unit">kW</text></view
            >
            <view
              >最大响应<text class="name">160</text
              ><text class="unit">kW</text></view
            >
          </view>
        </view>
      </List>
    </view>
  </view>
</template>

<script>
import List from "@/components/list.vue";
export default {
  components: { List },
  data() {
    return {
      opts: {
        color: [
          "#6DD400",
          "#F7B500",
          "#F7B500",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
        ],
        padding: [15, 0, 0, 15],
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
          axisLineColor: "#396780",
          fontColor: "rgba(255,255,255,0.4)",
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
              axisLineColor: "#396780",
              fontColor: "rgba(255,255,255,0.4)",
              fontSize: 12,
              titleFontColor: "#9FA6AF",
              titleOffsetY: -6,
            },
          ],
        },
        extra: {
          column: {
            type: "group",
            width: 8,
            activeBgOpacity: 0.08,
            linearType: "custom",
            seriesGap: 5,
            linearOpacity: 0.5,
            barBorderCircle: false, //柱形圆角
            customColor: ["#6DD400", "#FDFF00", "#E02020"],
          },
        },
      },
      chartData: {},
      btn_active: 1,
      range: {},
    };
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["园区A", "园区B", "园区C", "园区D", "园区E"],
          series: [
            {
              name: "目标值",
              textSize: 1,
              data: [35, 36, 31, 33, 13],
            },
            {
              name: "完成量",
              textSize: 1,
              data: [18, 27, 21, 24, 6],
            },
            {
              name: "园区",
              textSize: 1,
              data: [90, 40, 50, 70, 80],
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
.load {
  color: $uni-color-load;
}
.response {
  color: $uni-color-response;
}
.max-response {
  color: $uni-color-max-response;
}
.optBtn {
  font-size: 24rpx;
  text {
    display: inline-block;
    width: 92rpx;
    height: 48rpx;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    text-align: center;
    line-height: 48rpx;
    color: rgba(255, 255, 255, 0.3);
    margin: 0 10rpx;
    &.active {
      background: #0091ff;
      font-weight: bold;
      color: #e6f1ff;
    }
  }
}
.lists {
  .capability-monitoring {
    .li {
      display: flex;
      font-size: 24rpx;
      margin-bottom: 26rpx;
      .l {
        width: 45%;
        display: flex;
        .jsc-icon {
          width: 40rpx;
          height: 40rpx;
        }
        .iconfont {
          font-size: 40rpx;
        }
        .txt {
          margin-left: 20rpx;
          font-size: 24rpx;
          font-family: MicrosoftYaHei;
          color: rgba(255, 255, 255, 0.8);
          line-height: 32rpx;
          .num {
            font-size: 32rpx;
            margin-top: 10rpx;
            font-family: square-font;
            .unit {
              font-size: 16rpx;
              color: rgba(255, 255, 255, 0.8);
              margin-left: 16rpx;
            }
          }
        }
      }
      .r {
        width: 55%;
        .top {
          display: flex;
          justify-content: space-between;
          margin-bottom: 18rpx;
          text {
            &:nth-child(2) {
              font-family: square-font;
            }
            &:nth-child(4) {
              font-family: square-font;
            }
          }
        }
        /deep/.u-line-progress {
        }
      }
    }
    .ul {
      margin-top: 34rpx;
      display: flex;
      justify-content: space-between;
      .li {
        display: flex;
        .iconfont {
          font-size: 64rpx;
          margin-right: 20rpx;
        }
        .txt {
          font-size: 24rpx;
          color: rgba(255, 255, 255, 0.8);
          .num {
            font-size: 32rpx;
            margin-top: 18rpx;
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
  }
  .chart-box {
    width: 568rpx;
    height: 350rpx;
    .top {
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
  .range {
    margin-top: 24rpx;
    font-size: 24rpx;
    color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: space-between;
    .common {
      width: 40%;
      .name {
        font-weight: bold;
        color: #00c8ff;
        margin-right: 8rpx;
        margin-left: 28rpx;
        font-family: square-font;
      }
    }
  }
}
</style>
