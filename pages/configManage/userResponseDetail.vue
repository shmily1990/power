<template>
  <view class="user-response-detail">
    <uni-card :isShadow="true" mode="basic" class="page-card">
      <view class="card-head">
        <u-icon
          label="电管家某某用户"
          name="clock"
          color="#ffffff"
          label-color="#ffffff"
          label-size="16"
          size="24"
        ></u-icon>
      </view>
      <view class="card-content">
        <view class="user-card"></view>
        <view class="device"></view>
        <view class="connet-info"></view>
      </view>
    </uni-card>
    <view class="bottom">
      <view class="back">
        <u-icon name="clock" color="#ffffff" size="24"></u-icon>
        <text>返回</text>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
</style>
