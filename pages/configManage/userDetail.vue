<template>
  <view class="user-detail">
    <card>
      <view class="card-head">
        <u-icon
          label="用户响应情况"
          name="clock"
          color="#ffffff"
          label-color="#ffffff"
          label-size="16"
          size="24"
        ></u-icon>
      </view>
      <view class="card-conent">
        <view class="event-info">
          <view class="label-value">
            <text class="title">事件名称</text>
            <view class="value">
              <text class="count">event8888</text>
              <text class="unit">kw</text>
            </view>
          </view>
          <view class="label-value">
            <text class="title">调控指标</text>
            <view class="value">
              <text class="count">2000</text>
              <text class="unit">kw</text>
            </view>
          </view>
          <view class="label-value">
            <text class="title">开始时间</text>
            <view class="value">
              <text class="count">2023-01-02 15:30</text>
            </view>
          </view>
          <view class="label-value">
            <text class="title">持续时间</text>
            <view class="value">
              <text class="count" style="width: 132rpx">60</text>
              <text class="unit">分钟</text>
            </view>
          </view>
        </view>
      </view>
    </card>
  </view>
</template>

<script>
import card from "@/components/card";
export default {
  options: {
    styleIsolation: "shared",
  },
  data() {
    return {
      radiolist: [
        {
          name: "全部",
          disabled: false,
        },
        {
          name: "参与",
          disabled: false,
        },
        {
          name: "不参与",
          disabled: false,
        },
        {
          name: "未响应",
          disabled: false,
        },
      ],
      data: [
        {
          name: "正在邀约",
          value: 230,
          unit: "条",
          icon: "icon-iconJSC_1_2",
        },
        {
          name: "当年完成",
          value: 319,
          unit: "条",
          icon: "icon-iconJSC_2_2",
        },
        {
          name: "总完成",
          value: 821,
          unit: "条",
          icon: "icon-iconJSC_2_2",
        },
      ],
    };
  },
  components: {
    card,
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.user-manage {
  width: 100%;
}
</style>