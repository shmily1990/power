<template>
  <view class="event-manage">
    <template v-if="!modalTitle">
      <overview :data="data" />
      <u-search
        placeholder="搜索"
        v-model="searchText"
        :showAction="false"
        @search="queryData"
      ></u-search>
      <eventInfo
        name="待执行"
        fontClass="icon-iconPZGL_YYGL_3-0-title"
        @eventSelect="handleSelect"
        :eventList="waitExcuteData"
      />
      <eventInfo
        name="执行中"
        fontClass="icon-iconPZGL_SJGL_3-0-title"
        @eventSelect="handleSelect"
        :eventList="excutingData"
      />
      <eventInfo
        name="历史事件"
        fontClass="icon-iconPZGL_SJGL_4-0-title"
        @eventSelect="handleSelect"
        :eventList="historyData"
      />
      <view class="bottom" v-if="loginUserInfo.userType != 30">
        <text @click="add" class="btn">新建事件</text>
      </view>
    </template>
    <eventDetail v-if="modalTitle == 'detail'" @onback="modalTitle = ''" :eventInfo="eventInfo" />
    <addEvent v-if="modalTitle == 'add'" @onback="modalTitle = ''"></addEvent>
  </view>
</template>

<script>
import overview from "@/components/overview";
import eventInfo from "./component/eventInfo.vue";
import eventDetail from "./eventDetail.vue";
import addEvent from "./addEvent.vue";
import { queryEventTotal, queryEventByStatusWithPage } from "@/api/event/index.js";
import { uniScrollTop } from "@/utils/common.js";
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      data: [
        {
          name: "待执行",
          value: 0,
          unit: "条",
          icon: "icon-iconPZGL_SJGL_1-1",
        },
        {
          name: "执行中",
          value: 0,
          unit: "条",
          icon: "icon-iconPZGL_SJGL_1-2",
        },
        {
          name: "当年完成",
          value: 0,
          unit: "条",
          icon: "icon-iconPZGL_SJGL_1-3",
        },
      ],
      searchText: "",
      showEventDetail: false, //默认不显示祥情，点击列表时才显示祥情
      modalTitle: "",
      waitExcuteData: [],
      excutingData: [],
      historyData: [],
      eventInfo: {}
    };
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ])
  },
  components: {
    overview,
    eventInfo,
    eventDetail,
    addEvent,
  },
  onReady() {
    // 查询概览
    this.queryOverview()
    // 查询列表
    this.queryData()

  },
  watch: {
    modalTitle(val) {
      if (val === '') {
        // 查询概览
        this.queryOverview()
        // 查询列表
        this.queryData()
      }
    }
  },
  mounted() {},
  methods: {
    async queryOverview() {
      const { resultCode, resultData } = await queryEventTotal()
      if (!resultCode) {
        const { waitExcuteTotal, excutingTotal, yearExcutedTotal } = resultData
        this.data = [
          {
            name: "待执行",
            value: waitExcuteTotal,
            unit: "条",
            icon: "icon-iconPZGL_SJGL_1-1",
          },
          {
            name: "执行中",
            value: excutingTotal,
            unit: "条",
            icon: "icon-iconPZGL_SJGL_1-2",
          },
          {
            name: "当年完成",
            value: yearExcutedTotal,
            unit: "条",
            icon: "icon-iconPZGL_SJGL_1-3",
          },
        ]
      }
    },
    // 查询列表
    async queryData() {
      const params = {
        eventName: this.searchText,
        maxEventId: 0,
        pageCount: 999
      }
      const { resultCode, resultData } = await queryEventByStatusWithPage(params)
      if (!resultCode) {
        this.waitExcuteData = [], // 待执行1
        this.excutingData = [], // 执行中2
        this.historyData = [], // 历史3、4
        resultData.forEach(event => {
          switch(event.status) {
            case 1:
              this.waitExcuteData.push(event)
              break
            case 2:
              this.excutingData.push(event)
              break
            default:
              this.historyData.push(event)
          }
        })
      }
    },
    // 点击列表传参数操作
    handleSelect(val) {
      this.eventInfo = val
      this.modalTitle = "detail";
      uniScrollTop();
    },
    // 添加事件
    add() {
      this.modalTitle = "add";
      uniScrollTop();
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
