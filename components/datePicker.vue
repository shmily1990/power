<template>
  <view class="uni-list-cell-db">
    <picker
      mode="multiSelector"
      :value="dateTime"
      @change="changeDateTime"
      :disabled="disabled"
      @columnchange="changeDateTimeColumn"
      :range="dateTimeArray"
    >
      <view class="lableBox">
        <view class="choose-value uni-input">{{ timeStr }}</view>
      </view>
    </picker>
    <!-- <view v-if="!timeStr" class="noDateBlock">请选择日期</view> -->
  </view>
</template>

<script>
/**
 * 组件使用说明：timeValue属性获取时间的值，初始化绑定的时候需要格式成2021-02-03 12:22这种格式回显数据
 * disabled属性设置是否可以启用或者禁用选择器
 * <datapicker :timeValue.sync="value" :disabled="false"/>
 *
 * */
const { dateTimePicker, getMonthDay } = require("@/utils/date.js");

console.log(dateTimePicker, getMonthDay, "----");
export default {
  data() {
    return {
      dateTime: null,
      dateTimeArray: null,
      startYear: 2000,
      endYear: 2100,
      timeStr: "",
    };
  },
  props: {
    timeValue: [String, Number],
    disabled: [Boolean],
  },
  mounted() {
    this.initTime();
  },
  watch: {
    timeValue(val, old) {
      this.timeStr = val;
      !old && this.initTime();
    },
  },
  methods: {
    initTime() {
      // console.log(888);
      // 获取完整的年月日 时分秒，以及默认显示的数组
      let obj = dateTimePicker(
        this.startYear,
        this.endYear,
        this.timeValue || ""
      );
      this.dateTimeArray = obj.dateTimeArray;
      this.dateTime = obj.dateTime;
      this.timeStr = !this.timeValue
        ? "请选择日期"
        : (this.timeValue && this.timeValue.replace(/-/g, ".")) ||
          this.createTimeStr(this.dateTimeArray, this.dateTime);
      console.log(this.timeValue, "333", obj);
    },

    changeDateTime(e, type) {
      console.log("eeeeee", e);
      this.dateTime = e.detail.value;
      this.timeStr = this.createTimeStr(this.dateTimeArray, this.dateTime);
      this.$emit("update:timeValue", this.timeStr);
      //ios时间不能用'-'解析成时间戳
    },
    /*年,月切换时重新更新计算*/
    changeDateTimeColumn(e, type) {
      let { column, value } = e.detail;
      if (column == 0 || column == 1) {
        //直接修改数组下标视图不更新,用深拷贝之后替换数组

        let dateTime = JSON.parse(JSON.stringify(this.dateTime));
        let dateTimeArray = JSON.parse(JSON.stringify(this.dateTimeArray));
        dateTime[column] = value;
        dateTimeArray[2] = getMonthDay(
          dateTimeArray[0][dateTime[0]],
          dateTimeArray[1][dateTime[1]]
        );
        this.dateTime = dateTime;
        this.dateTimeArray = dateTimeArray;
      }
    },
    // 格式化后的时间
    createTimeStr(dateTimeArray, dateTime) {
      let timeStr =
        dateTimeArray[0][dateTime[0]] +
        "." +
        dateTimeArray[1][dateTime[1]] +
        "." +
        dateTimeArray[2][dateTime[2]] +
        " " +
        dateTimeArray[3][dateTime[3]] +
        ":" +
        dateTimeArray[4][dateTime[4]];
      return timeStr;
    },
  },
};
</script>

<style lang="scss" scoped>
.choose-value {
  color: #19d8ff;
  font-size: 24rpx;
}
</style>