<template>
  <view class="resource-all" @click="isShowTooltips = false">
    <view class="lists">
      <List titleTxt="接入用户总览" fontClass="icon-iconJSC_1_0-title">
        <view class="ul indent">
          <view class="li">
            <text class="iconfont icon-iconJSC_1_1"></text>
            <view class="txt">
              <view>接入用户</view>
              <view class="num">{{ accessUserOverview.accessTotal }}</view>
            </view>
          </view>
          <view class="li">
            <text class="iconfont icon-iconJSC_1_2"></text>
            <view class="txt">
              <view>响应用户</view>
              <view class="num">{{ accessUserOverview.respondTotal }}</view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="接入设备总览" fontClass="icon-iconJSC_2_0-title">
        <view class="ul indent">
          <view class="li">
            <text class="iconfont icon-iconJSC_2_1"></text>
            <view class="txt">
              <view>接入设备</view>
              <view class="num">{{ accessDeviceOverview.accessTotal }}</view>
            </view>
          </view>
          <view class="li">
            <text class="iconfont icon-iconJSC_2_2"></text>
            <view class="txt">
              <view>响应设备</view>
              <view class="num">{{ accessDeviceOverview.respondTotal }}</view>
            </view>
          </view>
        </view>
      </List>
      <List titleTxt="响应能力总览" fontClass="icon-iconJSC_3_0-title">
        <view class="ul resopnse-ul">
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon1.png" alt="" />
            <view class="txt">
              <view @click.stop="showToolTips(10)">快速响应</view>
              <view class="num">
                {{ responsivenessOverview.adjustableReview
                }}<text>kW</text></view
              >
            </view>
          </view>
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon2.png" alt="" />
            <view class="txt">
              <view @click.stop="showToolTips(20)">日内响应</view>
              <view class="num"
                >{{ responsivenessOverview.intradayResponse
                }}<text>kW</text></view
              >
            </view>
          </view>
          <view class="li">
            <image class="jsc-icon" src="/static/jsc-icon3.png" alt="" />
            <view class="txt">
              <view @click.stop="showToolTips(30)">中长期响应</view>
              <view class="num"
                >{{ responsivenessOverview.maxResponse }}<text>kW</text></view
              >
            </view>
          </view>
          <view class="tool-tip" v-if="isShowTooltips">
            <view class="tool-tip-title">{{ toolTipsTitle }}规则</view>
            <view class="tool-tip-content">{{ toolTipsContent }}</view>
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
            :inScrollView="true"
            :canvas2d="true"
          />
        </view>
      </List>
      <view class="bottom">
        <text @click="logout" class="btn">退出登录</text>
      </view>
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
      toolTipsTitle: '',
      toolTipsContent: '',
      isShowTooltips: false,
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
          titleOffsetX: 16,
          data: [
            {
              position: "left",
              title: "负荷 kWh",
              axisLineColor: "rgba(255,255,255,0.1)",
              fontColor: "#D8D8D8",
              fontSize: 12,
              titleFontColor: "#9FA6AF",
              titleOffsetX: 16,
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
      accessUserOverview: {
        // 用户
        accessTotal: 0,
        respondTotal: 0,
      },
      accessDeviceOverview: {
        // 设备
        accessTotal: 0,
        respondTotal: 0,
      },
      responsivenessOverview: {
        // 响应
        adjustableReview: 0,
        intradayResponse: 0,
        maxResponse: 0,
      },
    };
  },
  methods: {
    showToolTips(type) {
      this.isShowTooltips = true
      switch(type) {
        case 10:
          this.toolTipsContent = '提前1个自然日邀约，提前通知时间2小时以内，其中不通知响应为实时响应。'
          this.toolTipsTitle = '快速响应'
          break
        case 20:
          this.toolTipsContent = '提前1个自然日邀约，日内通知响应,最小提前通知时间2小时。'
          this.toolTipsTitle = '日内响应'
          break
        case 30:
          this.toolTipsContent = '提前1个自然日及以上邀约与通知。'
          this.toolTipsTitle = '中长期响应'
      }
    },
    logout() {
      uni.clearStorageSync();
      uni.redirectTo({
        url: "/pages/login/index",
      });
    },
    // 统一方法便于刷新
    getData() {
      this.queryData();
    },
    // 查询资源总览数据
    async queryData() {
      this.isEmpty = false;
      const { resultCode, resultData } = await queryResourceOverview();
      if (!resultCode) {
        const {
          accessUserOverview,
          accessDeviceOverview,
          responsivenessOverview,
          annualResponse,
        } = resultData;
        this.accessUserOverview = accessUserOverview;
        this.accessDeviceOverview = accessDeviceOverview;
        this.responsivenessOverview = responsivenessOverview;
        if (annualResponse.length) {
          this.buildChart(annualResponse);
        } else {
          const res = {
            categories: [""],
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
          };
          setTimeout(() => {
            this.chartData = JSON.parse(JSON.stringify(res));
          }, 500);
        }
      }
    },

    buildChart(data) {
      const xAxisData = [];
      const responseData = [];
      const userData = [];
      data.forEach((item) => {
        xAxisData.push(item.startMoth);
        responseData.push(item.responseLoad);
        userData.push(item.userNumber);
      });
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
            index: 1,
            type: "line",
            lineType: "solid",
            color: "#2fc25b",
            textSize: 1,
            pointShape: "none",
            data: userData,
          },
        ],
      };
      console.log(res);
      setTimeout(() => {
        this.chartData = JSON.parse(JSON.stringify(res));
      }, 500);
    },
  },
  onReady() {
    this.queryData();
  },
};
</script>

<style lang="scss" scoped>
.tool-tip {
  position: absolute;
  background: red;
  width: 500rpx;
  /* height: 160rpx; */
  background: #071B2D;
  border-radius: 16rpx;
  padding: 16rpx 24rpx;
  font-size: 24rpx;
  left: 40rpx;
  top: 40rpx;
  z-index: 9999;
  &-title {
    font-size: 28rpx;
    font-family: MicrosoftYaHei;
    color: #00C8FF;
    line-height: 38rpx;
  }
  &-content {
    color: #9FA6AF;
    line-height: 32rpx;
    margin-top: 14rpx;
  }
}
.lists {
  .ul {
    display: flex;
    justify-content: space-between;
    position: relative;
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
    height: 400rpx;
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
.bottom {
  margin-top: 28rpx;
  .btn {
    width: 440rpx;
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
