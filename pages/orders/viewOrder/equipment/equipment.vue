<template>
	<view class="equipment-box">
		<view class="equipment-item" v-for="(v,index) of deviceList" :key="v.ebd_id"
			@click="goEquipmentDetail(v,index)">
			<view class="title">
				<text class="title-name">{{ v.edt_name || '' }}{{ v.ebd_sy_number || '' }}</text>
				<text class="title-status" v-if="!v.isView">未巡检</text>
				<text class="title-status" v-else>已巡检</text>
			</view>
			<view class="info">
				<view class="info-text">
					<text class="title">数元设备编号</text>
					<text class="number">{{ v.ebd_sy_number || '' }}</text>
				</view>
				<view class="info-text">
					<text class="title">客户设备编号</text>
					<text class="number">{{ v.ebd_device_number || '' }}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型信息</text>
					<text class="number">{{ v.edt_name || '' }}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型编号</text>
					<text class="number">{{ v.ebd_type_number || '' }}</text>
				</view>
			</view>
			<u-divider />
		</view>
		<view class="submit-btn" @click="submitData">
			<u-button color="#00B0F0" type="primary" text="提交"></u-button>
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
				if (Object.prototype.toString.call(data[0]) === '[object Array]') {
					for (let [key, value] of Object.entries(data)) {
						that.deviceList.push(...value)
					}
				} else {
					that.deviceList = data
				}
			})
		},
		data() {
			return {
				deviceList: [],
				eventChannel: null
			}
		},
		methods: {
			goEquipmentDetail(val, index) { // 动态字段界面
				const that = this
				uni.navigateTo({
					url: "/pages/orders/viewOrder/equipment/equipmentDetail",
					events: {
						equipmentFunction: function(data) {
							const index = data.index
							that.deviceList.splice(index, 1, data)
						}
					},
					fail(e) {
						console.log(e);
					},
					success(res) {
						val.index = index
						const data = {
							...val
						}
						res.eventChannel.emit('equipmentData', data)
					},
					fail(e) {
						console.log(e);
					}
				})
			},
			submitData() {
				if (this.deviceList.some(val => !val.isView)) {
					uni.showToast({
						title: "请先巡检完所有设备再提交！",
						icon: 'none'
					})
					return
				}
				const equipmentData = this.deviceList
				this.eventChannel.emit('equipmentFunction', {
					isHandle: true,
					equipmentData
				});
				uni.navigateBack()

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
