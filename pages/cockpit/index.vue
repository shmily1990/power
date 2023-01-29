<template>
  <view>
    <!-- <view
      class="view-box"
      :style="{
        backgroundImage: `url(${imgBgURL})`,
        backgroundSize: 'cover',
      }"
    > -->
    <view
      class="view-box"
      :style="{
        backgroundImage: `url(${imgBgURL})`,
        backgroundSize: 'cover',
      }"
    >
      <CommTab :tabMenu="tabMenu">
        <template slot="tab0">
          <resourceAll />
        </template>
        <template slot="tab1">
          <resourceScatter />
        </template>
        <template slot="tab2">
          <regulatoryAbility />
        </template>
      </CommTab>
    </view>
    <u-no-network />
  </view>
</template>

<script>
import { getUserInfo } from "@/api/login/index.js";
import imgBgURL from "@/static/images/cockpit/bg.png";
import CommTab from "@/components/tab.vue";
import resourceAll from "./resourceAll.vue";
import regulatoryAbility from "./regulatoryAbility.vue";
import resourceScatter from "./resourceScatter.vue";
export default {
  components: {
    CommTab,
    resourceAll,
    resourceScatter,
    regulatoryAbility,
  },
  data() {
    return {
      imgBgURL,
      tabMenu: [
        {
          name: "资源总览",
          iconfont: "icon-iconJSC_active_ZYZL",
        },
        {
          name: "资源分布",
          iconfont: "icon-iconJSC_inactive_ZYFB",
        },
        {
          name: "调控能力",
          iconfont: "icon-iconJSC_inactive_TKNL",
        },
      ],
    };
  },
  onLoad() {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.view-box {
  padding: 40rpx 60rpx;
  width: 100%;
  min-height: 100vh;
  color: $uni-text-color;
  flex-wrap: wrap;
  box-sizing: border-box;
}
</style>
