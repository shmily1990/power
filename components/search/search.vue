<template name="search">
  <view>
    <view class="search">
      <template>
        <u-search
          placeholder="输入最少6位业务编号"
          v-model="searchText"
          @custom="searchStart"
          focus
          @search="searchStart"
        ></u-search>
      </template>
    </view>
    <view :class="'wanted-' + theme" v-if="showWant">
      <view class="header">指定搜索方式</view>
      <view class="list">
        <view
          v-for="(item, index) in hotList"
          :key="index"
          :class="[hotIndex === index ? 'bgc' : '']"
          @click="wayIndex(index)"
          >{{ item }}</view
        >
      </view>
    </view>
    <view :class="'wanted-' + theme" v-if="searchText && searchText.length > 0">
      <view class="header">搜索结果</view>
      <view class="box">
        <view
          class="item"
          v-for="(item, index) in orderList"
          :key="index"
          @click.stop="clickDetail(item)"
        >
          <text>{{ item.billCode }}</text>
          <view class="footer">
            <text class="mar-r">{{ hotList[hotIndex] }}</text>
            <text>{{ billStatusName }}</text>
          </view>
        </view>
      </view>
      <view style="width: 100%; background-color: #fff">
        <u-empty
          v-if="orderList.length === 0"
          mode="data"
          icon="http://cdn.uviewui.com/uview/empty/data.png"
        >
        </u-empty>
      </view>
    </view>
    <view
      :class="'s-' + theme"
      v-else-if="hList.length > 0 && searchText.length === 0"
    >
      <view class="header">
        历史记录
        <image
          src="../../static/zy-search/delete.svg"
          mode="aspectFit"
          @click="delhistory"
        ></image>
      </view>
      <view class="list">
        <uni-list :border="true">
          <uni-list-item
            v-for="(item, index) in hList"
            :key="index"
            @click="keywordsClick(item)"
            :title="item"
            clickable
          />
        </uni-list>
      </view>
    </view>
    <!-- 		<view :class="'wanted-' + theme" v-if="showWant">
			<view class="header">猜你想搜的</view>
			<view class="list">
				<view v-for="(item,index) in hotList" :key="index" @click="keywordsClick(item)">{{item}}</view>
			</view>
		</view> -->
  </view>
</template>

<script>
export default {
  name: "searchView",
  props: {
    billStatus: {
      type: Number,
      require: true,
    },
    orderList: {
      type: Array,
      default: () => [],
    },
    isFocus: {
      //是否自动获取焦点
      type: Boolean,
      default: false,
    },
    theme: {
      //选择块级显示还是圆形显示
      type: String,
      default: "block",
    },
    showWant: {
      //是否展示推荐菜单
      type: Boolean,
      default: false,
    },
    hotList: {
      //推荐列表数据
      type: Array,
      default() {
        return [];
      },
    },
    speechEngine: {
      //语音引擎=>讯飞:iFly,百度:'baidu'
      type: String,
      default: "baidu",
    },
  },
  computed: {
    billStatusName() {
      switch (this.billStatus) {
        case 10:
          return "待确认";
        case 20:
          return "处理中";
        case 30:
          return "已完成";
        default:
          break;
      }
    },
  },
  data() {
    return {
      hotIndex: 0,
      searchText: "", //搜索关键词
      hList: uni.getStorageSync("search_cache"), //历史记录
    };
  },
  methods: {
    clickDetail(item) {
      let billID = item.billID;
      let billType = item.billType;
      let strParams = `?billID=${billID}&billStatus=${this.billStatus}`;
      switch (billType) {
        case "巡检工单":
          uni.navigateTo({
            url: "/pages/orders/viewOrder/viewOrder" + strParams,
          });
          break;
        case "施工工单":
          uni.navigateTo({
            url: "/pages/orders/construction" + strParams,
          });
          break;
        case "验收工单":
          uni.navigateTo({
            url: "/pages/orders/check" + strParams,
          });
          break;
        case "设备台账工单":
          uni.navigateTo({
            url: "/pages/billEquipment/billEquipment" + strParams,
          });
          break;
        default:
          break;
      }
    },
    searchStart: function () {
      //触发搜索
      let _this = this;
      if (_this.searchText == "") {
        uni.showToast({
          title: "请输入关键字",
          icon: "none",
          duration: 1000,
        });
      } else {
        const searchStyle = this.hotIndex === 0 ? 1 : 2;
        _this.$emit("getSearchText", {
          code: _this.searchText,
          searchStyle,
        });
        uni.getStorage({
          key: "search_cache",
          success(res) {
            let list = res.data;
            if (list.length === 10) {
              for (let item of list) {
                if (item == _this.searchText) {
                  return;
                }
              }
              list.pop();
              list.unshift(_this.searchText);
            } else {
              for (let item of list) {
                if (item == _this.searchText) {
                  return;
                }
              }
              list.unshift(_this.searchText);
            }
            _this.hList = list;
            uni.setStorage({
              key: "search_cache",
              data: _this.hList,
            });
          },
          fail() {
            _this.hList = [];
            _this.hList.push(_this.searchText);
            uni.setStorage({
              key: "search_cache",
              data: _this.hList,
            });
            _this.$emit("getSearchText", {
              code: _this.searchText,
              searchStyle,
            });
          },
        });
      }
    },
    wayIndex(index) {
      // 指定搜索方式
      this.hotIndex = index;
      const searchStyle = this.hotIndex === 0 ? 1 : 2;
      this.$emit("getSearchText", {
        code: this.searchText,
        searchStyle,
      });
    },
    keywordsClick(item, index) {
      //关键词搜索与历史搜索
      this.searchText = item;
      this.searchStart();
    },
    delhistory() {
      //清空历史记录
      this.hList = [];
      uni.setStorage({
        key: "search_cache",
        data: [],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.u-empty {
  width: 100%;
}

.box {
  padding: 22rpx;
  color: $uni-text-color;

  .item {
    display: flex;
    justify-content: space-between;
    border-bottom: 2rpx solid #dcdfe6;
    height: 72rpx;
    line-height: 72rpx;
    margin-bottom: 20rpx;

    .mar-r {
      margin-right: 30rpx;
    }
  }
}

uni-list-item {
  width: 100vw;

  color: $uni-text-color;

  .info {
    margin: 0 30rpx;
  }
}

::v-deep .search {
  width: 640rpx;
  padding-top: 30rpx;
  margin: 0 auto;
  font-size: 28rpx;

  .uni-easyinput__content {
    border-radius: 20rpx;
  }

  .voice-icon {
    width: 36rpx;
    height: 36rpx;
    padding: 16rpx 20rpx 16rpx 0;
    position: absolute;
    left: 16rpx;
    top: 4rpx;
    z-index: 10;
  }

  .search-icon {
    width: 36rpx;
    height: 36rpx;
    padding: 16rpx 20rpx 16rpx 0;
    position: absolute;
    right: 0;
    top: 30rpx;
    z-index: 10;
  }
}

.s-block {
  margin-top: 30rpx;

  .header {
    font-size: 32rpx;
    padding: 30rpx;
    position: relative;

    image {
      width: 36rpx;
      height: 36rpx;
      padding: 10rpx;
      position: absolute;
      right: 40rpx;
      top: 24rpx;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    view {
      width: 48%;
      color: #8a8a8a;
      font-size: 28rpx;
      box-sizing: border-box;
      text-align: center;
      padding: 20rpx 0;
      border-top: 2rpx solid #fff;
      border-left: 2rpx solid #fff;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      background-color: #f7f7f7;
      margin-right: 10rpx;
      margin-bottom: 10rpx;
    }
  }
}

.s-circle {
  margin-top: 30rpx;

  .header {
    font-size: 32rpx;
    padding: 30rpx;
    border-bottom: 2rpx solid #f9f9f9;
    position: relative;

    image {
      width: 36rpx;
      height: 36rpx;
      padding: 10rpx;
      position: absolute;
      right: 40rpx;
      top: 24rpx;
    }
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30rpx 20rpx;

    view {
      padding: 8rpx 30rpx;
      margin: 20rpx 30rpx 0 0;
      font-size: 28rpx;
      color: #8a8a8a;
      background-color: #f7f7f7;
      box-sizing: border-box;
      text-align: center;
      border-radius: 20rpx;
    }
  }
}

.wanted-block {
  margin-top: 30rpx;

  .header {
    font-size: 32rpx;
    padding: 30rpx;
  }

  .list {
    display: flex;
    flex-wrap: wrap;

    view {
      width: 47%;
      color: #8a8a8a;
      font-size: 28rpx;
      box-sizing: border-box;
      text-align: center;
      padding: 20rpx 0;
      border-top: 2rpx solid #fff;
      border-left: 2rpx solid #fff;
      background-color: #f7f7f7;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 30rpx;
    }

    .bgc {
      width: 47%;
      color: #fff;
      font-size: 28rpx;
      box-sizing: border-box;
      text-align: center;
      padding: 20rpx 0;
      border-top: 2rpx solid #fff;
      border-left: 2rpx solid #fff;
      background-color: $uni-bg-color;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-right: 20rpx;
      margin-bottom: 20rpx;
      border-radius: 30rpx;
    }
  }
}

.wanted-circle {
  margin-top: 30rpx;

  .header {
    font-size: 32rpx;
    padding: 30rpx;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
    padding: 0 30rpx 20rpx;

    view {
      padding: 8rpx 30rpx;
      margin: 20rpx 30rpx 0 0;
      font-size: 28rpx;
      color: #8a8a8a;
      background-color: #f7f7f7;
      box-sizing: border-box;
      text-align: center;
      border-radius: 20rpx;
    }
  }
}
</style>
