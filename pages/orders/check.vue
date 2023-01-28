<template>
	<view class="box">
		<u-sticky bgColor="#00B0F0">
			<u-tabs :list="tabList" @change="tabChange" :scrollable="false" :activeStyle="{color:'#fff' }"
				:inactiveStyle="{ color:'#fff'  }" lineColor="#fff"></u-tabs>
		</u-sticky>
		<view v-show="activeIndex===0">
			<DetailInfos :detailInfo="detailInfo"></detailInfos>
		</view>
		<view v-show="activeIndex===1">
			<uni-card :isFull="true" class="card-box">
				<uni-forms :model="formData" :rules="rules" labelWidth="250rpx" :border="true" ref="form"
					validate-trigger="bind" label-position="top">
					<uni-forms-item label="项目验收单" name="workImage" required>
						<u-upload @afterRead="afterRead" v-if="!isEdit" :disabled="isEdit"
							:fileList="formData.workImage" @delete="deletePic" multiple></u-upload>

						<u-upload v-else :maxCount="formData.workImage.length" :deletable="false"
							:fileList="formData.workImage" @delete="deletePic" multiple></u-upload>

					</uni-forms-item>
				</uni-forms>
			</uni-card>
		</view>
		<view class="submit-btn">
			<u-button v-if="!isEdit && isAcceptBill" :throttleTime="2000" :loading="loading" color="#00B0F0"
				type="primary" @click="confirmReceipt" style="width: 90%;" text="确认接单"></u-button>
			<u-button v-else-if="!isEdit" :throttleTime="2000" :loading="loading" color="#00B0F0" type="primary"
				@click="submitData" style="width: 90%;" text="提交"></u-button>
		</view>
		<!-- 确认接单 -->
		<u-modal :show="show" title="提示" @confirm="acceptBill" @cancel="cancel" :showCancelButton="true"
			@close="show=false" :showConfirmButton="true">
			<template slot="default">
				<text>确认接单么？</text>
			</template>
		</u-modal>
		<u-no-network />
	</view>
</template>

<script>
	import {
		acceptBill,
		getOrderDetail,
		complateExamineBill,
		queryExamineBillResultInfo
	} from '@/api/order/index.js'
	import {
		domain
	} from '@/static/config.js'
	import DetailInfos from './components/DetailInfo'
	export default {
		onLoad(data) {
			data.billID = Number(data.billID)
			data.billStatus = Number(data.billStatus)
			this.selectData = data
			if (this.selectData.billStatus === 10) this.tabList = [] // 如果是待确认状态就删除一个tab
		},
		components:{
			DetailInfos
		},
		onShow() {
			if (!this.isPreview) {
				this.getOrderDetail()
			}
			this.isEdit ? this.queryExamineBillResultInfo() : ''
		},
		computed: {
			isEdit() { //查看
				return this.selectData.billStatus === 30 ? true : false
			},
			isAcceptBill() { // 接单
				return this.selectData.billStatus === 10 ? true : false
			}
		},
		data() {
			return {
				show: false,
				isPreview: false, // 是否在操作图片，防止出发onShow方法
				loading: false,
				selectData: {},
				activeIndex: 0,
				detailInfo: {},
				formData: {
					workImage: []
				},
				rules: {
					workImage: {
						rules: [{
							required: true,
							errorMessage: '请上传图片',
						}]
					}
				},
				tabList: [{
						name: '工单信息'
					},
					{
						name: '工单处理'
					}
				]
			}
		},

		methods: {
			tabChange(e) { // 切换tab
				this.activeIndex = e.index
			},
			cancel() {
				this.show = false
				this.loading = false
			},
			confirmReceipt() {
				this.show = true
				this.loading = true
			},
			async acceptBill() { // 确认接单
				try {
					const billID = this.selectData.billID
					const {
						resultCode
					} = await acceptBill({
						billID
					})
					if (resultCode === 0) {
						uni.showToast({
							title: "接单成功！",
						})
						uni.navigateBack()
						this.loading = false
						this.show = false
					} else {
						this.show = false
						this.loading = false
					}
				} catch (e) {
					this.loading = false
					this.show = false
					console.log(e);
				}
			},
			async getOrderDetail() { //基础数据
				try {
					const selectData = {
						...this.selectData
					}
					const {
						resultCode,
						resultData
					} = await getOrderDetail(selectData)
					if (resultCode === 0) {
						this.detailInfo = resultData
					} else {
						this.detailInfo = {}
					}
				} catch (e) {
					console.log(e);
				}
			},
			async queryExamineBillResultInfo() { // 详情
				try {
					const billId = this.selectData.billID
					const {
						resultCode,
						resultData
					} = await queryExamineBillResultInfo({
						billId
					})
					if (resultCode === 0) {
						let workImage = []
						if (resultData.imgUrl && resultData.imgUrl.length > 10) {
							let images = resultData.imgUrl.split(',')
							images = images.map(val => {
								return {
									url:  val.replace(/\\/g,'/')
								}
							})
							workImage = [...images]
						}
						this.formData = {
							...resultData,
							workImage
						}
					}
				} catch (e) {
					console.log(e);
				}
			},
			// 删除图片
			deletePic(event) {
				const {
					index
				} = event
				this.formData.workImage.splice(index, 1)

			}, // 新增图片
			async afterRead(event) {
				try {
					this.isPreview = true
					const imageList = event.file
					const images = await this.uploadImgPush(imageList) || []
					let workImage = this.formData.workImage
					if (workImage.length > 0) {
						this.formData.workImage = [...workImage, ...images]
					} else { //没有上传过图片
						this.formData.workImage = [...images]
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
				this.$refs['form'].validate().then(async res => {
					this.loading = true
					try {
						const imgUrl = this.formData.workImage.map(val => val.url).join(',')
						const paramsData = {
							imgUrl,
							billId: this.selectData.billID
						}
						const {
							resultCode
						} = await complateExamineBill(paramsData)
						if (resultCode === 0) {
							this.loading = false
							uni.showToast({
								title: "修改成功！",
							})
							uni.navigateBack()
						} else {
							this.loading = false
						}
					} catch (e) {
						console.log(e);
						this.loading = false
					}
				}).catch(err => {
					this.loading = false
					uni.showToast({
						title: "请先完善表单信息！",
						icon: 'none'
					})
					return false
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;

	}

	::v-deep.box {
		.nav-color {
			background-color: #00B0F0;
		}

		.tab-color {
			color: #fff !important;
		}


		.card-box {
			.uni-card {
				margin: 25rpx 0 !important;
				background-color: #fff;

				.top-title,
				.content-box {
					line-height: 2.2;
				}

				.top-title {
					font-size: 32rpx;
					color: $uni-text-color;
					display: flex;
					justify-content: space-between;
				}

				.content-box {
					display: flex;

					.name {
						color: $uni-text-color-name;
					}

					.value {
						margin-left: 30rpx;
						color: $uni-text-color;
						word-break: break-all;
					}
				}

				.content-log {
					.value {
						margin-left: 30rpx;
						color: $uni-text-color;
					}
				}

				.forms-item {
					.uni-forms-item.is-direction-left {
						flex-direction: column;
					}
				}
			}


		}

	}

	.submit-btn {
		margin: 20rpx auto;
		width: 90%;
	}
</style>
