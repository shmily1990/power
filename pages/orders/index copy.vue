<template>
	<view class="box">
		<u-sticky bgColor="#00B0F0">
			<u-tabs :list="tabList" @change="tabChange" :scrollable="false" :activeStyle="{color:'#fff' }"
				:inactiveStyle="{ color:'#fff'  }" lineColor="#fff"></u-tabs>
			<view class="search-box">
				<view class="item" @click="clickItem(1)">
					<text>查找</text>
					<u-icon name="search" color="#00B0F0" size="20"></u-icon>
				</view>
				<view class="item" @click="clickItem(2)">
					<text>筛选</text>
					<u-icon name="hourglass-half-fill" color="#00B0F0" size="20"></u-icon>
				</view>
			</view>
		</u-sticky>
		<view class="tag-box">
			<u-tag v-for="(item,key) of tagList" :key="key+1" :text="item.text" bgColor="#c9c9c9" color="#fff"
				borderColor="#c9c9c9" plain shape="circle" closable @close="closedTag(key)"></u-tag>
		</view>
		<scroll-view :scroll-y="true" class="scroll-Y">
			<uni-card :isFull="true" v-for="v in data" :key="v+''" class="card-box" @click="goDetail()">
				<view class="top-title">
					<text>2021-11-10 11:00:00----{{v}}</text>
					<text>施工工单/验收工单</text>
				</view>
				<view class="content-box">
					<text class="name">工单编号</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">合同编号</text>
					<text class="value">SYHT220001</text>
				</view>
				<view class="content-box">
					<text class="name">服务类型</text>
					<text class="value">维修、保养</text>
				</view>
				<view class="content-box">
					<text class="name">开始时间</text>
					<text class="value">2022-4-26 14:00</text>
				</view>
				<view class="content-box">
					<text class="name">结束时间</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">计划工时</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">客户场站</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">区域地址</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">详细地址</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">联系信息</text>
					<text class="value">SYGD20220412105916</text>
				</view>
				<view class="content-box">
					<text class="name">作业人员</text>
					<text class="value">SYGD20220412105916</text>
				</view>
			</uni-card>
			<u-loadmore :status="status" v-if="data.length>0" :loading-text="loadingText" dashed line
				:loadmore-text="loadmoreText" :nomore-text="nomoreText" color="#ccc" lineColor="#ccc" />
		</scroll-view>
		<u-empty v-if="data.length===0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
		</u-empty>
		<u-no-network />
	</view>
</template>

<script>
	import {
		getOrderList
	} from '@/api/order/index.js'
	export default {
		data() {
			return {
				tagList: [],
				userList: [
					'我的',
					'全部'
				],
				timeLIst: [
					'全部',
					'最近7天',
					'最近10天',
					'最近30天',
					'最近90天',
				],
				orderTypes: [
					'全部',
					'施工工单',
					'验收工单',
					'巡检工单',
					'设备台帐工单',
				],
				screenData: {},
				status: 'loadmore',
				loadingText: '努力加载中',
				loadmoreText: '轻轻上拉',
				nomoreText: '我也是有底线的',
				data: [1, 2, 3, 4],
				active: '',
				tabList: [{
						name: '待确认',
						badge: {
							value: 5,
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
			this.status = 'loading';
			setTimeout(() => {
				this.status = 'nomore';
			}, 3000)
			console.log('触底了');
		},
		onPullDownRefresh() { // 下拉刷新
			console.log('刷新');
		},
		onShow() {
				this.getOrderList()
		},
		components:{
			maxBillID(){
				const orderList=[...this.orderList]||[]
				return orderList.map(val=>val.billID).sort()[0]  || 0
			}
		},
		methods: {
			async getOrderList(pageCount=10) { //获取列表
				try {
					const {
						isOwner=0,
						day=[0],
						billType=[0]
					} = this.screenData || {}
					
					const res = await getOrderList({isOwner,day,billType,maxBillID:this.maxBillID,pageCount})
					console.log(res);
				} catch (e) {
					console.log(e);
					//TODO handle the exception
				}
			},
			closedTag(index) { //关闭标签
				// flag  1 ：工单类型  2：创建时间 3：处理人
				const {
					billType,
					day,
					isOwner
				} = this.screenData
				const tagItem = this.tagList[index]
				switch (tagItem.flag) {
					case 1:
						const orderNameIndex = billType.findIndex(val => val === tagItem.text)
						this.screenData.billType.splice(orderNameIndex, 1)
						break;
					case 2:
						const timeNameIndex = day.findIndex(val => val === tagItem.text)
						this.screenData.day.splice(timeNameIndex, 1)
						break;
					case 3:
						this.screenData.isOwner = 0
						break;
					default:
						break;
				}
				this.tagList.splice(index, 1)
			},
			tabChange(e) {
				console.log(e);
			},
			onChange(val) {
				console.log(val);
			},
			clickItem(type) {
				/*
				type:
					1:查找
					2:筛选
				*/
				const that = this
				if (type === 1) {
					uni.navigateTo({
						url: "/pages/search/search"
					})
				} else {
					uni.navigateTo({
						url: "/pages/screen/screen",
						events: {
							sendScreenData: function(data) {
								const tags = data
								const {
									billType,
									day
								} = data
								let tagList = []
								// 如果晒选条件不是【全部】，才展示tag，否则就是默认的搜索
								const allOrderIndex = billType.findIndex(v => v === '全部')
								const allTimeIndex = day.findIndex(v => v === '全部')
								if (allOrderIndex == -1) {
									let orderTagList = billType.map(val => {
										return {
											text: val,
											flag: 1
										}
									})
									tagList = [...orderTagList]
								}
								if (allTimeIndex == -1) {
									let timeTagList = day.map(val => {
										return {
											text: val,
											flag: 2
										}
									})
									tagList = [...tagList, ...timeTagList]
								}
								tags.isOwner ? tagList.unshift({
									text: '处理人(全部)',
									flag: 3
								}) : ''
								that.tagList = tagList
								that.screenData = data
								console.log('this.screenData====', that.screenData);
							}
						},
						success(res) {
							// 通过eventChannel向被打开页面传送数据
							// const tagList=
							res.eventChannel.emit('tagsList', that.screenData)
						}
					})
				}
			},
			goDetail(v) { // 跳转详情
				// uni.navigateTo({ // 施工工单界面
				// 	url:"/pages/orders/waitConfirm"
				// })
				uni.navigateTo({ // 接单界面
					url: "/pages/orders/waitConfirm"
				})
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

				// van-icon {
				// 	color: $uni-textf-color;
				// 	font-size: 40rpx;
				// 	font-weight: 700;
				// }
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
