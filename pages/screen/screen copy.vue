<template>
	<view>
		<view class="screen-box">
			<u-divider />
			<view class="screen-item">
				<view class="item-title">
					<text>处理人</text>
				</view>
				<view class="item-content">
					<view class="item-users" :class="[isOwner===index ? 'bgc':'']" v-for="(user,index) in userList"
						:key="index+2" @click="clickUserItem(index,1)">
						<text class="title">{{ user }}</text>
					</view>
				</view>
			</view>
			<u-divider />
			<view class="screen-item">
				<view class="item-title">
					<text>创建时间</text>
				</view>
				<view class="item-content">
					<view class="item-users" :class="[day.includes(user)? 'bgc':'']"
						v-for="(user,index) in timeLIst" :key="user" @click="clickUserItem(index,2)">
						<text class="title">{{ user }}</text>
					</view>
				</view>
			</view>
			<u-divider />
			<view class="screen-item">
				<view class="item-title">
					<text>工单类型</text>
				</view>
				<view class="item-content">
					<view class="item-users" :class="[billType.includes(user) ? 'bgc':'']"
						v-for="(user,index) in orderTypes" :key="user" @click="clickUserItem(index,3)">
						<text class="title">{{ user }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="submit-btn">
			<u-button color="#c9c9c9" type="primary" :throttleTime="2000" text="重置" @click="resetData"></u-button>
			<u-button color="#00B0F0" type="primary" :throttleTime="2000" text="确定" @click="orderStatusConfirm">
			</u-button>
		</view>
		<u-no-network />
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			console.log('onLoad---');
			const that=this
			this.eventChannel = this.getOpenerEventChannel();
			this.eventChannel.on('tagsList', function(data) {
				console.log(data);
				if (data) {
					const {
						isOwner,
						day,
						billType
					} = data
					that.isOwner = isOwner || 0
					that.day = day || ['全部']
					that.billType = billType || ['全部']
				}
			})
		},
		onShow() {
			console.log('onShow--');
		},
		data() {
			return {
				eventChannel: null,
				isOwner: 0,
				day: ['全部'],
				billType: ['全部'],
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
				]
			}
		},
		methods: {
			resetData() {
				this.isOwner = 0
				this.day = ['全部']
				this.billType = ['全部']
			},
			clickUserItem(index, flag) {
				switch (flag) {
					case 1:
						this.isOwner = index
						break;
					case 2:
						const timeItem = this.timeLIst[index]
						const deleteTimeIndex = this.day.findIndex(val => val === timeItem)
						const allIndex = this.day.findIndex(val => val === '全部')
						if (timeItem === '全部') {
							this.day = []
							this.day.push(timeItem)
						} else {
							deleteTimeIndex !== -1 ? this.day.splice(deleteTimeIndex, 1) : this.day.push(
								timeItem)
							if (this.day.length >= 2 && allIndex !== -1) {
								this.day.splice(allIndex, 1)
							}
							if (this.day.length === 4 && allIndex == -1) {
								this.day = []
								this.day.push('全部')
							}
							if (this.day.length === 0) {
								this.day = []
								this.day.push('全部')
							}
						}
						break;
					case 3:
						const orderItem = this.orderTypes[index]
						const deleteOrderIndex = this.billType.findIndex(val => val === orderItem)
						const orderAllIndex = this.billType.findIndex(val => val === '全部')
						if (orderItem === '全部') {
							this.billType = []
							this.billType.push(orderItem)
						} else {
							deleteOrderIndex !== -1 ? this.billType.splice(deleteOrderIndex, 1) : this.billType.push(
								orderItem)
							if (this.billType.length >= 2 && orderAllIndex !== -1) {
								this.billType.splice(orderAllIndex, 1)
							}
							if (this.billType.length === 4 && orderAllIndex == -1) {
								this.billType = []
								this.billType.push('全部')
							}
							if (this.billType.length === 0) {
								this.billType = []
								this.billType.push('全部')
							}
						}
						break;
					default:
						break;
				}

			},
			orderStatusConfirm() {
				const isOwner = this.isOwner
				const day = this.day
				const billType = this.billType
				this.eventChannel.emit('sendScreenData', {
					isOwner,
					day,
					billType
				});
				uni.navigateBack()

			}
		}
	}
</script>

<style lang="scss" scoped>
	.screen-box {
		background-color: #fff;
		padding: 20rpx;

		.screen-item {
			display: flex;
			flex-direction: column;
			font-size: 24rpx;

			.item-title {
				font-size: 28rpx;
			}

			.item-content {
				display: flex;
				flex-wrap: wrap;

				.item-users {
					width: 22%;
					height: 60rpx;
					background-color: $uni-bg-color-select;
					color: #fff;
					line-height: 60rpx;
					text-align: center;
					border-radius: 30rpx;
					margin-right: 20rpx;
					margin-top: 20rpx;
				}

				.bgc {
					background-color: #00B0F0;
				}
			}

		}
	}


	::v-deep .submit-btn {
		margin: 20rpx auto;
		width: 100%;
		display: flex;
		justify-content: space-between;

		.u-button {
			width: 43%;
		}
	}

	// ::v-deep .submit-btn {
	// 	margin-bottom: 20rpx;
	// 	display: flex;
	// 	justify-content: space-evenly;

	// 	.reset,
	// 	.btn {
	// 		width: 300rpx;
	// 		margin-top: 30rpx;
	// 		border: none;
	// 		border-radius: 35rpx;
	// 	}

	// 	.btn {
	// 		background-color: $uni-color-primary;
	// 	}

	// 	.reset {
	// 		background-color: $uni-bg-color-select;
	// 	}
	// }
</style>
