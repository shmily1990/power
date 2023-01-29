<template>
  <view class="resource-all">
    <view class="lists">
      <view class="item user-item">
        <text class="big iconfont icon-login-zu"></text>
        <view class="item-wrap">
          <text class="big title"> 接入用户总览</text>
          <view class="ul">
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>接入用户</view>
                <view class="num">232</view>
              </view>
            </view>
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>响应用户</view>
                <view class="num">230</view>
              </view>
            </view>
          </view>
        </view>

        <!---->
      </view>
      <view class="item equip-item">
        <text class="big iconfont icon-login-zu"></text>
        <view class="item-wrap">
          <text class="big title"> 接入设备总览</text>
          <view class="ul">
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>接入设备</view>
                <view class="num">232</view>
              </view>
            </view>
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>响应设备</view>
                <view class="num">230</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="item response-item">
        <view class="item-wrap">
          <text class="big title iconfont icon-login-zu"> 接入设备总览</text>
          <view class="ul">
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>可调负荷</view>
                <view class="num">266 <text>kW</text></view>
              </view>
            </view>
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>日内响应</view>
                <view class="num">230<text>kW</text></view>
              </view>
            </view>
            <view class="li">
              <text class="iconfont icon-login-zu"></text>
              <view class="txt">
                <view>最大响应</view>
                <view class="num">230<text>kW</text></view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="item chartbox">
       <view class="item-wrap">
         <view class="top">
            <text class="big title iconfont icon-login-zu"> 年度响应统计</text>
            <view class="legnd"><i>响应负荷</i><i>用户数量</i></view>
         </view>
          <!-- <qiun-data-charts type="column" :chartData="opts" /> -->
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      opts: {
        categories: ["2016", "2017", "2018", "2019", "2020", "2021"],
        series: [
          {
            name: "目标值",
            data: [35, 36, 31, 33, 13, 34],
          },
          {
            name: "完成量",
            data: [18, 27, 21, 24, 6, 28],
          },
        ],
      },
      chartData: {
        categories: ["g", "gg", "ggg"],
        series: [
          {
            name: "",
            data: [2, 2, 4],
            textColor: "#747E85",
            textSize: "12",
          },
        ],
      },
    };
  },
  methods: {
    getServerData() {
      //模拟从服务器获取数据时的延时
      setTimeout(() => {
        //模拟服务器返回数据，如果数据格式和标准格式不同，需自行按下面的格式拼接
        let res = {
          categories: ["2018", "2019", "2020", "2021", "2022", "2023"],
          series: [
            {
              name: "目标值",
              data: [35, 36, 31, 33, 13, 34],
            },
            {
              name: "完成量",
              data: [18, 27, 21, 24, 6, 28],
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
  .item {
    background: rgba(0, 142, 181, 0.15);
    border-radius: 16px;
    padding: 30rpx 36rpx;
    box-sizing: border-box;
    display: flex;
    margin-top: 20rpx;
    .big {
      font-size: 32rpx;
      color: #fff;
      margin-right: 18rpx;
      font-weight: bold;
      display: block;
      &.iconfont {
        font-size: 48rpx;
        margin-top: 10rpx;
      }
    }
    .item-wrap {
      flex: 1;
      .big {
        &.iconfont {
          font-size: 40rpx;

          &::before {
            margin-right: 18rpx;
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
              font-size: 28rpx;
              color: #19d8ff;
              margin-top: 18rpx;
            }
          }
        }
      }
    }
    .item-title {
      font-weight: bold;
      color: #fff;
      .iconfont {
        font-size: 42rpx;
        &::before {
          margin-right: 18rpx;
        }
      }
    }
  }
  .response-item {
    .item-wrap {
      .ul {
        .li {
          .iconfont {
            font-size: 40rpx;
          }
          .txt {
            .num {
              text {
                color: rgba(255, 255, 255, 0.8);
                font-size: 24rpx;
                margin-left: 10rpx;
                display: inline-block;
              }
            }
          }
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
  .chartbox {
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
}
</style>