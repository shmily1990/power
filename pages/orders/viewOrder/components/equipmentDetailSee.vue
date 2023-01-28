<template>
	<view class="equipment-box">
		<view class="equipment-item">
			<view class="title">
				<text class="title-name">{{ registerForm.deviceTypeName }} {{ registerForm.syNumber }}</text>
				<text class="title-status">已巡检</text>
			</view>
			<view class="info">
				<view class="info-text">
					<text class="title">数元设备编号</text>
					<text class="number">{{ registerForm.syNumber || '无'}}</text>
				</view>
				<view class="info-text">
					<text class="title">客户设备编号</text>
					<text class="number"> {{ registerForm.customerNumber || '无'}}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型信息</text>
					<text class="number"> {{ registerForm.deviceTypeName || '无' }}</text>
				</view>
				<view class="info-text">
					<text class="title">设备类型编号</text>
					<text class="number"> {{ registerForm.typeNumber || '无'}}</text>
				</view>
			</view>
		</view>
		<view class="form-data">
			<uni-forms :model="registerForm" labelWidth="250rpx" :border="true" ref="form" validate-trigger="bind"
				label-position="left">
				<view v-for="(attribute,index) of registerForm.attributes" :key="index+1">
					<uni-forms-item :label="attribute.attributeName" :name="['attributes',index,'attributeValue']"
						:key="attribute.attributeType">
						<text
							v-if="attribute.attributeType!=40">{{ registerForm.attributes[index].attributeValue }}</text>
						<!-- 上传 -->
						<u-upload v-else :deletable="false"
							:maxCount="registerForm.attributes[index].attributeValue.length"
							:fileList="registerForm.attributes[index].attributeValue" multiple>
						</u-upload>
					</uni-forms-item>

				</view>
			</uni-forms>

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
					if (val.attributeType == 40) {
						if (typeof val.attributeValue === 'string') {
							val.attributeValue = val.attributeValue.split(',').map(val => {
								return {
									url: val
								}
							})
						}

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
			padding: 0 20rpx;
			border-top: 2rpx #eee solid;
			border-bottom: 2rpx #eee solid;
			.uni-forms-item {
				align-items: center;
			}
		}

	}

	.submit-btn {
		margin: 20rpx auto;
	}
</style>
