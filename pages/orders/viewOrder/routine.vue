<template>
	<view>
		<view class="" v-for="(v,idx) of arrayData" :key="v.title">
			<view class="top-title">
				<text>{{ v.title }}</text>
			</view>
			<uni-card :isFull="true" class="card-box">
				<uni-forms labelPosition="left" labelWidth="400rpx">
					<view class="forms-item" v-for="(item,index) of v.list" :key="item.ecp_id">
						<uni-forms-item :label="item.ecp_name" required>
							<u-switch v-model="item.ebp_result" active-color="#5ad87d" inactiveColor="red"
								:inactive-value="0" :active-value="1"></u-switch>
						</uni-forms-item>
						<view class="forms-item-box" v-if="!item.ebp_result">
							<uni-forms-item label="异常备注" labelWidth="300rpx">
								<u-textarea border="surround" v-model="item.ebp_remark" placeholder="请输入备注信息" count
									maxlength="500">
								</u-textarea>
							</uni-forms-item>
							<uni-forms-item label="异常图片" name="ebp_PICTURE_URL">
								<u-upload @afterRead="((file, lists, name)=>afterRead(file,index,idx))"
									:fileList="item.ebp_PICTURE_URL" @delete="(e)=>deletePic(e,index,idx)" multiple>
								</u-upload>
							</uni-forms-item>
						</view>
					</view>
				</uni-forms>
			</uni-card>

		</view>
		<view class="submit-btn">
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
		data() {
			return {
				eventChannel: null,
				arrayData: []
			}
		},
		onLoad(option) {
			const that = this
			that.eventChannel = this.getOpenerEventChannel();
			that.eventChannel.on('checkProjectData', function(data) {
				const newData=[...data]
				newData.forEach(val=>{
					const list=val.list
					list.forEach(val=>{
						val.ebp_remark= val.ebp_remark  || ''
					})
				})
				that.arrayData = data
			})
		},
		methods: {
			//start
			// 删除图片
			deletePic(event, findex, idx) {
				const {
					index
				} = event
				this.arrayData[idx].list[findex].ebp_PICTURE_URL.splice(index, 1)

			}, // 新增图片
			async afterRead(event, index, idx) {
				try {
					this.isPreview = true
					const imageList = event.file
					const images = await this.uploadImgPush(imageList) || []
					let ebp_PICTURE_URL = this.arrayData[idx].list[index].ebp_PICTURE_URL
					if (ebp_PICTURE_URL.length > 0) {
						this.arrayData[idx].list[index].ebp_PICTURE_URL = [...ebp_PICTURE_URL, ...images]
					} else { //没有上传过图片
						this.arrayData[idx].list[index].ebp_PICTURE_URL = [...images]
					}
				} catch (e) {
					console.log(e);
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
				const that = this
				const routineData = [...this.arrayData]
				const arrayData = that.arrayData
				that.eventChannel.emit('routineFunction', {
					isHandle: true,
					arrayData

				});
				uni.navigateBack()

			}

		}
	}
</script>

<style lang="scss" scoped>
	.top-title {
		font-size: 36rpx;
		color: $uni-text-color;
		font-weight: 700;
		padding: 22rpx 0 22rpx 22rpx;
	}

	::v-deep .card-box {
		.uni-card {
			margin: 25rpx 0 !important;
			background-color: #fff;
		}

		.uni-forms .uni-forms-item {
			justify-content: space-between;

			.uni-forms-item__content {
				box-sizing: border-box;
				display: flex;
				justify-content: flex-end;
			}
		}

		.forms-item {
			.forms-item-box {
				display: flex;
				flex-direction: column;

				.uni-forms-item {
					display: flex;
					flex-direction: column;

					van-field {
						width: 100%;
						border: 2rpx solid #cccccc30;
					}
				}
			}
		}
	}

	.submit-btn {
		width: 90%;
		margin: 20rpx auto;


	}
</style>
