<template>
  <view class="event-manage">
    <template v-if="!modalTitle">
      <overview :data="data" />
      <u-search
        placeholder="搜索"
        v-model="searchText"
        :showAction="false"
      ></u-search>
      <eventInfo name="待执行" @eventSelect="handleSelect" />
      <eventInfo name="执行中" @eventSelect="handleSelect" />
      <eventInfo name="历史事件" @eventSelect="handleSelect" />
      <view class="bottom">
        <text @click="add" class="btn">新建事件</text>
      </view>
    </template>
    <eventDetail v-if="modalTitle == 'detail'" @onback="modalTitle = ''" />
    <addEvent v-if="modalTitle == 'add'" @onback="modalTitle = ''"></addEvent>
  </view>
</template>

<script>
import overview from "@/components/overview";
import eventInfo from "./component/eventInfo.vue";
import eventDetail from "./eventDetail.vue";
import addEvent from "./addEvent.vue";
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
      showEventDetail: false, //默认不显示祥情，点击列表时才显示祥情
      modalTitle: "",
    };
  },
  components: {
    overview,
    eventInfo,
    eventDetail,
    addEvent,
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
    // 点击列表传参数操作
    handleSelect(val) {
      console.log("1111", val);
      this.modalTitle = "detail";
    },
    // 添加事件
    add() {
      this.modalTitle = "add";
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
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
