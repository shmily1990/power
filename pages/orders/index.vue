<template>
	<view class="box">
		<u-sticky bgColor="#00B0F0">
			<u-tabs :list="tabList" @change="tabChange" :scrollable="false" :activeStyle="{color:'#fff' }"
				:inactiveStyle="{ color:'#fff'  }" lineColor="#fff"></u-tabs>
			<view class="search-box">
				<view class="item" @click="searchData(1)">
					<text>查找</text>
					<u-icon name="search" color="#00B0F0" size="20"></u-icon>
				</view>
				<view class="item" @click="searchData(2)">
					<text>筛选</text>
					<u-icon name="hourglass-half-fill" color="#00B0F0" size="20"></u-icon>
				</view>
			</view>
		</u-sticky>
		<view class="tag-box">
			<u-tag v-for="(item,key) of tagList" :key="item.key" :text="item.name" bgColor="#c9c9c9" color="#fff"
				borderColor="#c9c9c9" plain shape="circle" closable @close="closedTag(key,item)"></u-tag>
		</view>
		<scroll-view :scroll-y="true" class="scroll-Y">
			<info-text :orderList="orderList" :billStatus="billStatus"></info-text>
			<u-loadmore :status="status" v-if="orderList.length>0" :loading-text="loadingText" dashed line
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" color="#ccc" lineColor="#ccc" />
		</scroll-view>
		<u-empty v-if="orderList.length===0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
		</u-empty>
		<u-no-network />
	</view>
</template>

<script>
	import {
		getOrderList
	} from '@/api/order/index.js'
	import InfoText from './components/InfoText.vue'
	export default {
		onLoad() {
			this.userInfo = uni.getStorageSync('userInfo') || {}
		},
		components: {
			InfoText
		},
		data() {
			return {
				billStatus: 10,
				userInfo: {},
				orderList: [],
				tagList: [],
				screenData: {},
				status: 'loadmore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '我也是有底线的',
				tabList: [{
						name: '待确认',
						badge: {
							value: 0,
						}
					},
					{
						name: '处理中'
					},
					{
						name: '已完成'
					}
				]
			}
		},
		onReachBottom() { // 下一页
			this.getOrderListNext()
			console.log('触底了');
		},
		onPullDownRefresh() { // 下拉刷新
			this.orderList = []
			this.getOrderList()
			console.log('刷新');
		},
		onShow() {
			this.orderList = []
			this.getOrderList()
		},
		computed: {
			maxBillID: {
				get() {
					const orderList = [...this.orderList] || []
					return (orderList.map(val => val.billID).sort((a, b) => b - a))[0] || 0
				},
				set(val) { //重新获取列表数据
					this.orderList = []
				}
			}
		},
		methods: {
			async getOrderList() { //获取列表
				try {
					this.status = 'loading';
					// const userID = this.userInfo.userID || 0
					let isOwner = this.screenData.isOwner ? Boolean(this.screenData.isOwner.value) : true
					const billStatus = this.billStatus
					const day = this.screenData.day && this.screenData.day.value || 0
					const billType = this.screenData.billType && this.screenData.billType.value || 0
					const {
						resultCode,
						resultData: {
							queryBillInfos,
							total
						}
					} = await getOrderList({
						billStatus,
						// userID,
						isOwner,
						day,
						billType,
						maxBillID: this.maxBillID,
						pageCount: 10
					})
					if (resultCode === 0) {
						if (billStatus === 10) {
							this.tabList[0].badge.value = total || 0
						}
						if (queryBillInfos && queryBillInfos.length > 0) {
							this.orderList = [...this.orderList, ...queryBillInfos] || []
						}
					}
					this.status = 'nomore';
				} catch (e) {
					this.status = 'nomore';
					console.log(e);
				}
			},
			closedTag(index) { //关闭标签
				const flag = this.tagList[index].name == '处理人(全部)'
				flag ? this.screenData.isOwner.value = 1 : this.tagList[index].value = 0
				this.maxBillID = 0
				this.tagList.splice(index, 1)
				this.getOrderList()
			},
			getOrderListNext() { // 下一页
				this.getOrderList()
			},
			tabChange(e) { // 切换tab
				switch (e.index) {
					case 0:
						this.billStatus = 10
						this.orderList = []
						this.getOrderList()
						break;
					case 1:
						this.billStatus = 20
						this.orderList = []
						this.getOrderList()
						break;
					case 2:
						this.billStatus = 30
						this.orderList = []
						this.getOrderList()
						break;
					default:
						break;
				}
			},
			searchData(type) { // 查找/筛选
				const that = this
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/search/search",
						success(res) {
							let billStatus = that.billStatus
							const screenData = {
								...that.screenData
							}
							let keys = Object.keys(screenData) || []
							if (keys.length > 0) {
								const isOwner = screenData.isOwner ? Boolean(screenData.isOwner.value) : true
								const billType = screenData['billType'].value || 0
								const day = screenData['day'].value || 0
								res.eventChannel.emit('getOrderList', {
									isOwner,
									billStatus,
									billType,
									day
								})
							} else {
								res.eventChannel.emit('getOrderList', {
									isOwner: true,
									billStatus,
									billType: 0,
									day: 0

								})
							}

						}
					})
				} else {
					uni.navigateTo({
						url: "/pages/screen/screen",
						events: {
							sendScreenData: function(data) { // 界面接收到数据
								that.tagList = []
								that.orderList = []
								const {
									isOwner,
									billType,
									day
								} = data
								if (billType.value !== 0) {
									that.tagList.push(billType)
								}
								if (day.value !== 0) {
									that.tagList.push(day)
								}
								if (!isOwner.value) {
									that.tagList.unshift({
										...isOwner,
										name: '处理人(全部)'
									})
								}

								that.screenData = data
								console.log('this.screenData====', that.screenData);
							}
						},
						success(res) { // 向界面发出数据
							res.eventChannel.emit('tagsList', that.screenData)
						}
					})
				}
			},
			close(e) {
				console.log(e);
			}

		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .tag-box {
		display: flex;
		flex-wrap: wrap;
	}

	::v-deep.box {
		.nav-color {
			background-color: #00B0F0;
		}

		.tab-color {
			color: #fff !important;
		}

		.search-box {
			height: 80rpx;
			background-color: rgba(255, 255, 255, 1);
			color: $uni-text-color;
			display: flex;
			font-size: 28rpx;

			.item {
				display: flex;
				flex: 1;
				justify-content: space-evenly;
				align-items: center;
			}
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
					}
				}
			}


		}

	}
</style>
