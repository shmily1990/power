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
						:key="index+1" @click="clickUserItem(index,1)">
						<text class="title">{{ user.name }}</text>
					</view>
				</view>
			</view>
			<u-divider />
			<view class="screen-item">
				<view class="item-title">
					<text>创建时间</text>
				</view>
				<view class="item-content">
					<view class="item-users" :class="[day===index? 'bgc':'']"
						v-for="(time,index) in timeList" :key="index+2" @click="clickUserItem(index,2)">
						<text class="title">{{ time.name }}</text>
					</view>
				</view>
			</view>
			<u-divider />
			<view class="screen-item">
				<view class="item-title">
					<text>工单类型</text>
				</view>
				<view class="item-content">
					<view class="item-users" :class="[billType===index ? 'bgc':'']"
						v-for="(order,index) in orderTypes" :key="index+3" @click="clickUserItem(index,3)">
						<text class="title">{{ order.name }}</text>
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
					that.isOwner = isOwner.value ? 0 :  isOwner.index
					that.day = day.value ? day.index : 0
					that.billType = billType.value? billType.index : 0
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
				day: 0,
				billType: 0,
				userList: [
					{
						name:'我的',
						value:1
					},
					{
						name:'全部',
						value:0
					}
					
				],
				timeList: [
					{
						name:'全部',
						value:0
					},
					{
						name:'最近7天',
						value:7
					},
					{
						name:'最近30天',
						value:30
					},
					{
						name:'最近90天',
						value:90
					}
				],
				orderTypes: [
					{
						name:'全部',
						value:0
					},
					{
						name:'施工工单',
						value:10
					},
					{
						name:'验收工单',
						value:20
					},
					{
						name:'巡检工单',
						value:30
					},
					{
						name:'设备台帐工单',
						value:40
					},
					{
						name:'商务支持工单',
						value:50
					}
				]
			}
		},
		methods: {
			resetData() {
				this.isOwner = 0
				this.day =0
				this.billType = 0
			},
			clickUserItem(index, flag) {
				switch (flag) {
					case 1:
						this.isOwner = index
						break;
					case 2:
						this.day=index
						break;
					case 3:
						this.billType=index
						break;
					default:
						break;
				}

			},
			orderStatusConfirm() {
				const isOwner = {...this.userList[this.isOwner],index:this.isOwner}
				const day = { ...this.timeList[this.day],index:this.day}
				const billType = { ...this.orderTypes[this.billType],index:this.billType }
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
