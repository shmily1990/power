<script>
export default {
  onLaunch: function () {
    let token = uni.getStorageSync("token");
    if (!token) {
      //不存在则跳转至登录页
      uni.switchTab({
        url: "/pages/cockpit/index",
      });
    }
  },
  onShow: function () {},
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@import "uview-ui/index.scss";
@import "@/assets/iconfonts/iconfont.css";
@import "@/assets/styles/global.scss";
page {
  background: linear-gradient(90deg, #102d58 0%, #144e6d 100%);
}
checkbox.round .wx-checkbox-input,
checkbox.round .uni-checkbox-input {
  background-color: transparent;
  border-color: #6d7278;
  width: 36rpx;
  height: 36rpx;
}

checkbox.round[checked] .wx-checkbox-input,
checkbox.round.checked .uni-checkbox-input,
checkbox.round.partChoose .wx-checkbox-input,
checkbox.round.partChoose .uni-checkbox-input {
  background-color: #0060a9;
  border-color: transparent;
  color: #ffffff;
}
checkbox.round.partChoose .wx-checkbox-input::before,
checkbox.round.partChoose .uni-checkbox-input::before {
  content: "";
  position: absolute;
  z-index: 1;
  background-color: #0060a9;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}
checkbox.round.partChoose .wx-checkbox-input::after,
checkbox.round.partChoose .uni-checkbox-input::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 20%;
  z-index: 2;
  transform: translateY(-50%);
  background-color: #ffffff;
  width: 60%;
  height: 4rpx;
}

/*每个页面公共css */
</style>
