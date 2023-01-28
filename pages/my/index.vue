<template>
	<view>
		<view class="top">
			<view class="top-content">
				<text class="logo">数元电力</text>
				<view class="info">
					<text>{{ userInfoData.userName || '' }}</text>
					<text class="mar">{{ userInfoData.phone || '' }}</text>
				</view>
			</view>
		</view>
		<view class="center-text">
			<uni-list>
				<uni-list-item showArrow clickable @click="goUpdatePasswordView">
					<template v-slot:header>
						<uni-icons color="#00B0F0" type="locked" size="30"></uni-icons>
					</template>
					<template v-slot:body>
						<text class="text">修改密码</text>
					</template>

				</uni-list-item>

				<uni-list-item showArrow>
					<template v-slot:header>
						<uni-icons color="#00B0F0" type="info" size="30"></uni-icons>
					</template>
					<template v-slot:body>
						<text class="text">版权归属杭州数元电力有限公司</text>
					</template>

				</uni-list-item>

			</uni-list>

		</view>
		<view class="submit-btn">
			<u-button color="#00B0F0" type="primary" :throttleTime="2000" text="退出登录" @click="loginOut">
			</u-button>
		</view>
		<!-- 退出提示框 -->
		<u-modal :show="show" title="提示" @confirm="confirm" @cancel="show=false" :showCancelButton="true"
			@close="show=false" :showConfirmButton="true" :closeOnClickOverlay="true">
			<template slot="default">
				<text>退出将不能享受权益，确认退出么？</text>
			</template>
		</u-modal>

		<u-no-network />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				userInfoData: {}
			}
		},
		onLoad() {
			this.userInfoData = uni.getStorageSync('userInfo') || {}
		},
		methods: {
			goUpdatePasswordView() {
				uni.navigateTo({
					url: "/pages/my/updatePassword"
				})
			},
			confirm() { // 做退出操作
				this.show = false
				uni.redirectTo({
					url: "/pages/login/index"
				})
			},
			loginOut() {
				this.show = true
			}
		}
	}
</script>

<style lang="scss" scoped>
	.top {
		min-height: 264rpx;
		background-color: $uni-bg-color;
		color: #fff;

		.top-content {
			padding: 60rpx 0 0 40rpx;

			.logo {
				font-size: 64rpx;
			}

			.info {
				display: flex;
				align-items: center;
				margin-top: 30rpx;

				.mar {
					margin-left: 20rpx;
				}
			}
		}

	}

	.center-text {
		color: $uni-text-color;
		background-color: #fff;

		.text {
			display: flex;
			align-items: center;
			margin-left: 100rpx;
			font-size: 28rpx;
		}
	}

	.submit-btn {
		width: 90%;
		margin: 20rpx auto;
	}
</style>
