<template>
	<view class="equipment-box">
		<view class="form-data">
			<uni-forms :modelValue="registerForm" labelWidth="250rpx" :border="true" ref="form" label-position="left">
				<uni-forms-item label="数元设备编号">{{ deviceItem.number || deviceItem.syNumber }}</uni-forms-item>
				<uni-forms-item label="设备类型">{{ deviceItem.typeName || deviceItem.deviceTypeName }}</uni-forms-item>
				<uni-forms-item label="设备类型编号">{{ deviceItem.typeNo || deviceItem.typeNumber}}</uni-forms-item>
				<uni-forms-item label="客户设备编码" :required="!disable" name="customerNumber">
					<uni-easyinput v-if="!disable" v-model="registerForm.customerNumber" :inputBorder="false">
					</uni-easyinput>
					<text v-else>{{ registerForm.customerNumber }}</text>
				</uni-forms-item>
				<uni-forms-item label="客户设备名称" :required="!disable" name="customerDeviceName">
					<uni-easyinput v-if="!disable" v-model="registerForm.customerDeviceName" :inputBorder="false">
					</uni-easyinput>
					<text v-else>{{ registerForm.customerDeviceName }}</text>
				</uni-forms-item>
				<view v-for="(attribute,index) of registerForm.attributeList" :key="attribute.attributeId">
					<!-- 查看 -->
					<uni-forms-item v-if="disable && attribute.formType!=40" :label="attribute.attributeName">
						<text>{{ registerForm.attributeList[index].attributeValue }}</text>
					</uni-forms-item>
					<uni-form-item v-else-if="disable && attribute.formType==40" :label="attribute.attributeName">
						<u-upload :maxCount="registerForm.attributeList[index].attributeValue.length" :deletable="false"
							disabled :fileList="registerForm.attributeList[index].attributeValue">
						</u-upload>
					</uni-form-item>
					<!-- 编辑/新增 -->
					<uni-forms-item v-else-if="!disable" :label="attribute.attributeName"
						:required="attribute.must ? true :false" :name="['attributeList',index,'attributeValue']"
						:key="attribute.attributeName"
						:rules="[{required : attribute.must ? true :false, errorMessage: '数据项必填'}]">
						<!-- input -->
						<uni-easyinput v-if="attribute.formType===10 && !disable" :inputBorder="false"
							v-model="registerForm.attributeList[index].attributeValue">
						</uni-easyinput>
						<!-- 单选 -->
						<template v-else-if="attribute.formType===20">
							<uni-data-checkbox :disabled="disable" selectedColor="#00B0F0" selectedTextColor="#00B0F0"
								@change="(e)=>radioChange(e,index)"
								v-model="registerForm.attributeList[index].attributeValue" :multiple="false"
								:localdata="attribute.list"></uni-data-checkbox>
						</template>
						<!-- 复选框 -->
						<view class="" v-else-if="attribute.formType===30">
							<uni-data-checkbox :disabled="disable" selectedColor="#00B0F0" selectedTextColor="#00B0F0"
								@change="(e)=>checkBoxChange(e,index)"
								v-model="registerForm.attributeList[index].attributeValue" :multiple="true"
								:localdata="attribute.list"></uni-data-checkbox>
							</u-checkbox-group>
						</view>
						<!-- 上传 -->
						<u-upload v-else-if="attribute.formType===40" :disabled="disable"
							@afterRead="((file, lists, name)=>afterRead(file,index))"
							:fileList="registerForm.attributeList[index].attributeValue"
							@delete="(e)=>deletePic(e,index)" multiple>
						</u-upload>
						<uni-datetime-picker :disabled="disable" v-else-if="attribute.formType===50" :border="false"
							type="datetime" placeholder="请选择"
							v-model="registerForm.attributeList[index].attributeValue" />
					</uni-forms-item>
				</view>
			</uni-forms>
		</view>
		<view class="submit-btn" v-if="!disable">
			<u-button color="#00B0F0" type="primary" @click="submitData" text="提交"></u-button>
		</view>
		<u-no-network />
	</view>
</template>

<script>
	import {
		domain
	} from '@/static/config.js'
	export default {
		onLoad(option) {
			const that = this
			this.eventChannel = this.getOpenerEventChannel();
			this.eventChannel.on('deviceItem', function(data) {
				if (data.attributes) that.disable = true
				const attributes = data.attributeList || data.attributes || []
				console.log('收到了数据--', data);
				let attributeList = [...attributes] || []
				if (typeof data.index === 'undefined') { // 编辑/新增
					attributeList = attributeList.map(val => {
						if (val.formType === 20 || val.formType === 30) {
							val.list.forEach(attribute => {
								attribute.text = attribute.attributeValue
								attribute.value = attribute.attributeValue
							})
						}

						return val
					})
					that.deviceItem = {
						...data,
						customerNumber: '',
						customerDeviceName: ''
					}
					that.registerForm.attributeList = attributeList || []
				} else { // 查看
					if (that.disable) {
						attributeList = attributeList.map(val => {
							val.formType = val.attributeType
							if (val.formType == 40) {
								val.attributeValue = val.attributeValue.split(',').map(val => {
									return {
										url: val
									}
								})
							}
							return val
						})
					}
					data.attributeList = attributeList
					that.deviceItem = data
					that.registerForm = data
				}
				console.log('设备修改/新增界面获取到了参数', data)

			})
		},
		onReady() {
			// 需要在onReady中设置规则
			this.$refs.form.setRules(this.rules)
		},
		data() {
			return {
				disable: false,
				eventChannel: null,
				deviceItem: {
					attributeList: []
				},
				rules: {
					customerNumber: {
						rules: [{
							required: true,
							errorMessage: '请输入客户设备编码',
						}]
					},
					customerDeviceName: {
						rules: [{
							required: true,
							errorMessage: '请输入客户设备名称',
						}]
					}
				},
				registerForm: {
					customerNumber: '',
					customerDeviceName: '',
					attributeList: []
				}

			}
		},
		methods: {
			radioChange(e, index) { // 单选按钮
				this.registerForm.attributeList[index].attributeValue = e.detail.value
			},
			checkBoxChange(e, index) {
				this.registerForm.attributeList[index].attributeValue = e.detail.value
			},
			// 删除图片
			deletePic(event, idx) {
				const {
					index
				} = event
				this.registerForm.attributeList[idx].attributeValue.splice(index, 1)

			}, // 新增图片
			async afterRead(event, index) {
				try {
					uni.showLoading({
						title: '上传中',
						mask: true
					})
					this.isPreview = true
					const imageList = event.file
					const images = await this.uploadImgPush(imageList) || []
					let workImage = this.registerForm.attributeList[index].attributeValue
					if (workImage.length > 0) {
						this.registerForm.attributeList[index].attributeValue = [...workImage, ...images]
					} else { //没有上传过图片
						this.registerForm.attributeList[index].attributeValue = [...images]
					}
					uni.hideLoading();
				} catch (e) {
					console.log(e);
					uni.hideLoading();
				}
			},
			uploadFilePromise(filePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: domain + '/api/erp/Files/UploadImageMobile',
						filePath,
						name: 'file',
						success: (res) => {
							if (res.statusCode === 200) {
								const result = JSON.parse(res.data)
								if (result.resultCode === 0) {
									resolve(result.resultData)
								}
							}
						}
					})
				})
			},
			async uploadImgPush(imageList) {
				try {
					let images = []
					for (let i = 0; i < imageList.length; i++) {
						const currentImg = imageList[i]
						const asyncImg = await this.uploadFilePromise(currentImg.url)
						images.push(asyncImg)
					}
					images = images.map(val => {
						return {
							url: domain + '/' + val.url
						}
					})
					return images
				} catch (e) {
					console.log(e);
				}
			},

			submitData() {
				this.$refs['form'].validate().then(res => {
					const data = {
						...this.deviceItem,
						...this.registerForm
					}
					this.eventChannel.emit('getDeviceItem', data);
					uni.navigateBack()
				}).catch(err => {
					console.log(err);
					uni.showToast({
						title: "请先填写必填项数据！",
						icon: 'none'
					})
					return false
				})
			},

		}
	}
</script>

<style lang="scss" scoped>
	.equipment-box {
		line-height: 2.2;

		::v-deep .form-data {
			padding: 20rpx;
			background-color: #fff;

			.uni-forms-item {
				align-items: center;

				.u-checkbox-group {
					flex-wrap: wrap;
				}

				.u-checkbox {
					margin: 5rpx;
				}
			}
		}

	}

	.submit-btn {
		width: 90%;
		margin: 20rpx auto;
	}
</style>
