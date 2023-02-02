<template>
  <view class="event-manage">
    <overview :data="data" />
    <u-search
      placeholder="搜索"
      v-model="searchText"
      :showAction="false"
    ></u-search>
    <eventInfo name="待执行" />
    <eventInfo name="执行中" />
    <eventInfo name="历史事件" />
    <view class="bottom">
      <text class="btn">新建事件</text>
    </view>
  </view>
</template>

<script>
import overview from "@/components/overview";
import eventInfo from "./component/eventInfo.vue";
// import card from "@/components/card";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      data: [
        {
          name: "待执行",
          value: 230,
          unit: "家",
          icon: "icon-iconJSC_1_2",
        },
        {
          name: "执行中",
          value: 319,
          unit: "个",
          icon: "icon-iconJSC_2_2",
        },
        {
          name: "当年完成",
          value: 821,
          unit: "kw",
          icon: "icon-iconJSC_2_2",
        },
      ],
      searchText: "",
      eventList: [],
      exculed: "",
    };
  },
  components: {
    overview,
    eventInfo,
  },
  onLoad() {
    this.getEventList();
  },
  onReady() {
    this.getEventList();
  },
  methods: {
    getEventList() {
      this.eventList = [
        {
          order: "W01",
          name: "event7789",
          quota: 2000,
          startTime: "2022-10-02 13:00:00",
          cxsj: 60,
          des: "22年这是放的描述",
        },
        {
          order: "W02",
          name: "event7789",
          quota: 2000,
          startTime: "2022-10-02 13:00:00",
          cxsj: 60,
          des: "22年这是放的描述",
        },
        {
          order: "W03",
          name: "event7789",
          quota: 2000,
          startTime: "2022-10-02 13:00:00",
          cxsj: 60,
          des: "22年这是放的描述",
        },
        {
          order: "W04",
          name: "event7789",
          quota: 2000,
          startTime: "2022-10-02 13:00:00",
          cxsj: 60,
          des: "22年这是放的描述",
        },
      ];
      console.log(777);
    },
  },
};
</script>

<style lang="scss" scoped>
.event-manage {
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
}
</style>
