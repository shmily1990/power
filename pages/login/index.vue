<template>
  <view
    class="login-box"
    :style="{ backgroundImage: `url(${imageURL})`, backgroundSize: 'cover' }"
  >
    <view class="login-content">
      <view class="login-top">
        <image src="/static/logo.png" alt="" class="logo" />
        <view class="logo-text">
          <text class="company-name">电管家集团</text>
          <text class="platform-name">需求响应智能管控平台</text>
        </view>
      </view>
      <view class="form-box">
        <u-form :model="form" :rules="rules" ref="form">
          <u-form-item prop="loginName" class="form-item" :labelWidth="40">
            <u-input
              v-model="form.loginName"
              clearable
              placeholder="请输入帐号"
              color="#e6f1ff"
              border="none"
            >
              <template slot="prefix">
                <image src="/static/user.png" alt="" class="comImg" />
              </template>
            </u-input>
          </u-form-item>
          <u-form-item prop="loginPwd" class="form-item" :labelWidth="40">
            <u-input
              :password="showP"
              :clearable="false"
              v-model="form.loginPwd"
              placeholder="请输入密码"
              color="#e6f1ff"
              border="none"
            >
              <template slot="prefix">
                <image src="/static/pwd.png" alt="" class="comImg" />
              </template>
              <template slot="suffix">
                <u-icon
                  size="16"
                  @click="showP = !showP"
                  :name="showP ? 'eye-off' : 'eye-fill'"
                ></u-icon>
              </template>
            </u-input>
          </u-form-item>
          <view class="submit-btn">
            <u-button
              :throttleTime="2000"
              :loading="loading"
              :customStyle="loginBtn"
              @click="loginConfirm"
              color="rgba(230,241,255,0.2)"
              type="primary"
              text="登录"
            ></u-button>
          </view>
        </u-form>
      </view>
    </view>
    <view class="copy-right">
      <view class="copy-text"
        >Copyright © 2019-2022 powerkeeper All Rights Reserved.</view
      >
    </view>
    <u-no-network />
  </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import { login } from "@/api/login/index.js";
import loginBg from "@/static/login_bg.png";
import { pathToBase64 } from "image-tools";
export default {
  name: "login",
  onReady() {
    this.$refs.form.setRules(this.rules);
  },
  onShow() {
    uni.clearStorageSync();
  },
  data() {
    return {
      showP: true,
      rules: {
        loginName: {
          type: "string",
          required: true,
          message: "请输入帐号",
          trigger: ["blur", "change"],
        },
        loginPwd: {
          type: "string",
          required: true,
          message: "请输入密码",
          trigger: ["blur", "change"],
        },
      },
      form: {
        loginName: "",
        loginPwd: "",
      },
      imageURL: "",
      loading: false,
    };
  },
  onLoad() {
    this.getImage();
  },
  computed: {
    ...mapState([
      "loginUserInfo"
    ]),
  },
  methods: {
    // 获取base64背景图片
    getImage() {
      pathToBase64(loginBg).then((data) => {
        this.imageURL = data;
      });
    },
    // 用户登录
    loginConfirm() {
      this.$refs.form.validate().then(async (res) => {
        const { loginName, loginPwd } = this.form;
        this.loading = true;
        try {
          const res = await login({
            loginName,
            loginPwd,
          });
          this.loading = false;
          if (res.resultCode == 0) {
            uni.setStorageSync("token", res.userToken);
            uni.setStorageSync("userInfo", res);
            this.$store.commit('setLoginUserInfo', res)
            uni.switchTab({
              url: "/pages/cockpit/index",
            });
          }
        } catch (e) {
          this.loading = false;
        }
      });
      // uni.switchTab({
      //         url: "/pages/cockpit/index",
      //       });
    },
  }
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  .login-content {
    width: 90%;
    height: 500rpx;
    background-color: rgba(0, 38, 66, 0.94);
    border-radius: 16rpx;
    margin-top: 50%;
    padding: 36rpx 68rpx 54rpx;
    box-sizing: border-box;
    .login-top {
      display: flex;
      .logo {
        width: 80rpx;
        height: 80rpx;
      }
      .logo-text {
        border-left: 2rpx solid #fff;
        margin-left: 22rpx;
        padding-left: 22rpx;
        font-size: 28rpx;
        color: rgba(255, 255, 255, 0.4);
        font-weight: bold;
        .company-name {
          display: block;
        }
        .platform-name {
          color: #19d8ff;
          font-size: 36rpx;
        }
      }
    }
    .form-box {
      /deep/.u-form-item {
        border: 2rpx solid #6d7278;
        border-radius: 8rpx;
        height: 64rpx;
        margin-top: 40rpx;
        .u-form-item__body {
          padding: 0;
          .u-input__content__prefix-icon {
            width: 64rpx;
            height: 64rpx;
            border-right: 2rpx solid #6d7278;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .form-item {
        border: 2rpx solid #6d7278;
        border-radius: 8rpx;
      }

      .u-icon {
        padding: 0 30rpx;
      }
      .comImg {
        width: 28rpx;
        height: 34rpx;
      }
    }
    .submit-btn {
      width: 70%;
      margin: 52rpx auto 0;
      .u-button {
        border: 2px solid #9fa6af !important;
        border-radius: 8rpx !important;
        height: 64rpx;
        text {
          font-size: 36rpx !important;
          font-weight: bold;
        }
      }
    }
  }
  .copy-right {
    width: 80%;
    position: fixed;
    bottom: 112rpx;
    text-align: center;
    .copy-text {
      font-size: 24rpx;
      color: #969696;
    }
  }
}
</style>
