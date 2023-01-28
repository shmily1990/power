<template>
	<view class="equipment-box">
		<view class="equipment-item" v-for="(val,index) of deviceList" :key="index+1" @click="goEquipmentDetail(val,index)">
			<view class="title">
				<text class="title-name">{{ val.deviceTypeName || '' }}{{ v.syNumber || '' }}</text>
				<text class="title-status">已巡检</text>
			</view>
			<view class="info">
				<view class="info-text">
					<text class="title">数元设备编号</text>
					<text class="number">{{ val.syNumber || '' }}</text>
				</view>
				<view class="info-text">
					<text class="title">客户设备编号</text>
					<text class="number">{{ val.customerNumber || '' }}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型信息</text>
					<text class="number">{{ val.deviceTypeName || '' }}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型编号</text>
					<text class="number">{{ val.typeNumber || '' }}</text>
				</view>
			</view>
			<u-divider />
		</view>
		<u-no-network />
	</view>
</template>

<script>
	export default {
		onLoad(option) {
			const that = this
			that.eventChannel = this.getOpenerEventChannel();
			that.eventChannel.on('deviceData', function(data) {
				that.deviceList=data
			})
		},
		data() {
			return {
				deviceList: [],
				eventChannel: null
			}
		},
		methods: {
			goEquipmentDetail(val,index) { // 动态字段界面
				const that = this
				uni.navigateTo({
							url: "/pages/orders/viewOrder/components/equipmentDetailSee",
							success(res) {
								const val= that.deviceList[index]
								const data = {
									...val
								}
								res.eventChannel.emit('equipmentData', data)
							},
							fail(e) {
								console.log(e);
							}
						})
					}

			}
		}
</script>

<style lang="scss" scoped>
	.equipment-box {
		line-height: 2.2;

		.equipment-item {
			background-color: #fff;
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

	}

	.submit-btn {
		margin: 0 auto;
		width: 90%;
	}
</style>
