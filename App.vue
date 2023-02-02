<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
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
  background-color: #f2f2f2;
}
checkbox.round .wx-checkbox-input,
checkbox.round .uni-checkbox-input {
  background-color: transparent;
  border-color: #6d7278;
  width: 36rpx;
  height: 36rpx;
}

checkbox.round[checked] .wx-checkbox-input,
checkbox.round.checked .uni-checkbox-input {
  background-color: #0060a9;
  border-color: transparent;
  color: #ffffff;
}

/*每个页面公共css */
</style>
