<template>
	<view class="box">
		<u-sticky bgColor="#00B0F0">
			<u-tabs :list="tabList" @change="tabChange" :scrollable="false" :activeStyle="{color:'#fff' }"
				:inactiveStyle="{ color:'#fff'  }" lineColor="#fff"></u-tabs>
		</u-sticky>
		<view v-show="activeIndex===0">
			<DetailInfos :detailInfo="detailInfo" :orderType="1"></detailInfos>
		</view>
		<view class="submit-btn" :class="{ toFixed : activeIndex===1 }">
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
		businessSupportComplateBill,
		getOrderDetail
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
		components: {
			DetailInfos
		},
		onShow() {
			this.getOrderDetail()
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
				loading: false,
				selectData: {},
				activeIndex: 0,
				detailInfo: {},
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
			async submitData() {
				this.loading = true
				try {
					const paramsData = {
						billID: this.selectData.billID
					}
					const {
						resultCode
					} = await businessSupportComplateBill(paramsData)
					if (resultCode === 0) {
						this.loading = false
						uni.showToast({
							title: "提交成功！"
						})
						uni.navigateBack()
					} else {
						this.loading = false
					}
				} catch (e) {
					console.log(e);
					this.loading = false
				}
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
						width: 190rpx;
						flex-shrink: 0;
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

	.toFixed {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.submit-btn {
		margin: 20rpx auto;
		width: 90%;
	}
</style>
