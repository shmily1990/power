<template>
	<view>
		<view class="update-passord">
			<uni-forms :modelValue="formData" :rules="rules" labelWidth="200rpx" ref="form">
				<uni-forms-item label="原始密码" name="passWord">
					<uni-easyinput type="password" v-model="formData.passWord" trim="all" placeholder="请输入"
						:inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="新的密码" name="oldPassword">
					<uni-easyinput type="password" v-model="formData.oldPassword" trim="all" placeholder="请输入"
						:inputBorder="false" />
				</uni-forms-item>
				<uni-forms-item label="确认新的密码" name="newPassword">
					<uni-easyinput type="password" v-model="formData.newPassword" trim="all" placeholder="请输入"
						:inputBorder="false" />
				</uni-forms-item>
			</uni-forms>
		</view>
		<view class="submit-btn">
			<u-button color="#00B0F0" type="primary" :throttleTime="2000" text="提交" @click="submitData">
			</u-button>
		</view>
		<!-- 退出提示框 -->
		<u-modal :show="show" title="提示" @confirm="confirm" @close="show=false" :showConfirmButton="true">
			<template slot="default">
				<text>密码修改成功，请重新登录！</text>
			</template>
		</u-modal>
		<u-no-network />
	</view>
</template>

<script>
	import {
		updatePassword
	} from "@/api/login/index.js"
	export default {
		onReady() {
			// 需要在onReady中设置规则
			// this.$refs.form.setRules(this.rules)
		},
		data() {
			return {
				show: false,
				formData: {
					passWord: '',
					oldPassword: '',
					newPassword: ''
				},
				rules: {
					passWord: {
						rules: [{
							required: true,
							errorMessage: '请输入原始密码',
						}]
					},
					oldPassword: {
						rules: [{
							required: true,
							errorMessage: '请输入新密码',
						}]
					},
					newPassword: {
						rules: [{
							required: true,
							errorMessage: '请确认新密码',
						}]
					}
				}
			}
		},
		methods: {
			submitData() {
				if (this.formData.newPassword !== this.formData.oldPassword) {
					uni.showToast({
						title: "新密码填写不一致！",
						icon: 'none'
					})
					return false
				}
				this.$refs.form.validate().then(async res => {

					const loginName = uni.getStorageSync('userInfo').loginName
					const passWord = this.formData.newPassword
					try {
						const {
							resultCode
						} = await updatePassword({
							loginName,
							passWord
						})
						if (resultCode === 0) {
							this.show = true
						}
					} catch (e) {
						console.log(e);
					}
					console.log('表单数据信息：', res);
				}).catch(err => {
					uni.showToast({
						title: "请先填写必填项数据！",
						icon: 'none'
					})
				})
			},
			confirm() {
				uni.reLaunch({
					url: '/pages/login/index'
				})
			}

		}
	}
</script>

<style lang="scss" scoped>
	.update-passord {
		background-color: #fff;
		padding: 20rpx;

		.submit-btn {
			width: 90%;
			margin: 20rpx auto;
		}
	}
</style>
