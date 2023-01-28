<template>
	<view class="equipment-box">
		<view class="equipment-item">
			<view class="title">
				<text class="title-name">{{ registerForm.edt_name }} {{ registerForm.ebd_sy_number }}</text>
				<text class="title-status">{{ registerForm.isView  ? '已巡检' :'未巡检' }}</text>
			</view>
			<view class="info">
				<view class="info-text">
					<text class="title">数元设备编号</text>
					<text class="number">{{ registerForm.ebd_sy_number || '无'}}</text>
				</view>
				<view class="info-text">
					<text class="title">客户设备编号</text>
					<text class="number"> {{ registerForm.ebd_device_number || '无'}}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型信息</text>
					<text class="number"> {{ registerForm.edt_name || '无' }}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型编号</text>
					<text class="number"> {{ registerForm.ebd_type_number || '无'}}</text>
				</view>
			</view>
			<u-divider />

		</view>
		<view class="form-data">
			<uni-forms :model="registerForm" labelWidth="250rpx" :border="true" ref="form" validate-trigger="bind"
				label-position="left">
				<view v-for="(attribute,index) of registerForm.attributes" :key="attribute.eda_id">
					<uni-forms-item :label="attribute.eda_name" :required="attribute.ete_must ? true :false"
						:name="['attributes',index,'value']" :key="attribute.eda_type"
						:rules="[{required : attribute.ete_must ? true :false, errorMessage: '数据项必填'}]">
						<!-- input -->
						<uni-easyinput v-model="registerForm.attributes[index].value" v-if="attribute.eda_type===10">
						</uni-easyinput>
						<!-- 单选 -->
						<uni-data-checkbox v-else-if="attribute.eda_type===20" selectedColor="#00B0F0"
							selectedTextColor="#00B0F0" @change="(e)=>radioChange(e,index)"
							v-model="registerForm.attributes[index].value" :multiple="false"
							:localdata="attribute.rangesList"></uni-data-checkbox>
						<!-- 复选框 -->
						<uni-data-checkbox v-else-if="attribute.eda_type===30" selectedColor="#00B0F0"
							selectedTextColor="#00B0F0" @change="(e)=>checkBoxChange(e,index)"
							v-model="registerForm.attributes[index].value" :multiple="true"
							:localdata="attribute.rangesList"></uni-data-checkbox>
						<!-- 上传 -->
						<u-upload v-else-if="attribute.eda_type===40"
							@afterRead="((file, lists, name)=>afterRead(file,index))"
							:fileList="registerForm.attributes[index].value" @delete="(e)=>deletePic(e,index)" multiple>
						</u-upload>
						<!-- 日期 -->
						<uni-datetime-picker v-else-if="attribute.eda_type===50" :border="false" type="datetime"
							@change="(e)=>changeDate(e,index)" placeholder="请选择"
							v-model="registerForm.attributes[index].value" />
					</uni-forms-item>
				</view>
			</uni-forms>

		</view>
		<view class="submit-btn">
			<u-button :throttleTime="2000" color="#00B0F0" type="primary" @click="submitData" text="提交"></u-button>
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
			that.eventChannel = this.getOpenerEventChannel();
			that.eventChannel.on('equipmentData', function(data) {
				const datas = {
					...data
				}
				datas.attributes = datas.attributes.map(val => {
					if (val.eda_type === 20 || val.eda_type === 30) {
						val.rangesList.forEach(attribute => {
							attribute.text = attribute.ear_value
							attribute.value = attribute.ear_value
						})
					}

					return val
				})
				that.registerForm = JSON.parse(JSON.stringify(datas))
			})
		},
		data() {
			return {
				equipmentData: {},
				eventChannel: null,
				registerForm: {
					attributes: []
				}

			}
		},
		methods: {
			// start
			radioChange(e, index) { // 单选按钮
				const newVal = {
					...this.registerForm.attributes[index]
				}
				newVal.value = e.detail.value
				this.registerForm.attributes.splice(index, 1, newVal)
			},
			checkBoxChange(e, index) {
				const newVal = {
					...this.registerForm.attributes[index]
				}
				newVal.value = e.detail.value
				this.registerForm.attributes.splice(index, 1, newVal)
			},
			// 删除图片
			deletePic(event, idx) {
				const {
					index
				} = event
				this.registerForm.attributes[idx].value.splice(index, 1)

			}, // 新增图片
			async afterRead(event, index) {
				console.log(event);
				try {
					uni.showLoading({
						title: '上传中',
						mask: true
					})
					this.isPreview = true
					const imageList = event.file
					const images = await this.uploadImgPush(imageList) || []
					const currentRow = {
						...this.registerForm.attributes[index]
					}
					let workImage = this.registerForm.attributes[index].value
					if (workImage.length > 0) {
						const imgData = [...workImage, ...images]
						currentRow.value = imgData
						this.registerForm.attributes.splice(index, 1, currentRow)
					} else { //没有上传过图片
						currentRow.value = [...images]
						this.registerForm.attributes.splice(index, 1, currentRow)
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
			changeDate(e, index) {
				const currentRow = {
					...this.registerForm.attributes[index]
				}
				currentRow.value = e
				this.registerForm.attributes.splice(index, 1, currentRow)
			},
			submitData() {
				const that = this
				this.$refs['form'].validate().then(res => {
					this.eventChannel.emit('equipmentFunction', {
						isView: true,
						...that.registerForm
					});
					uni.navigateBack()
				}).catch(err => {
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
		background-color: #fff;
		line-height: 2.2;

		.equipment-item {
			padding: 0 20rpx;
			font-size: 28rpx;

			.title {
				display: flex;
				justify-content: space-between;
				align-items: center;
				font-size: 36rpx;
			}

			.info {
				.info-text {
					display: flex;
					align-items: center;

					.title {
						font-size: 28rpx;
						color: $uni-text-color-name;
					}

					.number {
						margin-left: 30rpx;
					}
				}
			}
		}

		::v-deep .form-data {
			padding: 20rpx;

			.uni-forms-item {
				align-items: center;
			}
		}

	}

	.submit-btn {
		margin: 20rpx auto;
	}
</style>
