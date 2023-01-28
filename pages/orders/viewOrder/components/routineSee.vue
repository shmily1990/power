<template>
	<view>
		<view class="" v-for="(v,idx) of arrayData" :key="v.title">
			<view class="top-title">
				<text>{{ v.title }}</text>
			</view>
			<uni-card :isFull="true" class="card-box">
				<uni-forms labelPosition="left" labelWidth="400rpx">
					<view class="forms-item" v-for="(item,index) of v.list" :key="item.ecp_id">
						<uni-forms-item :label="item.ebp_project_name">
							<u-switch v-model="item.ebp_result" disabled active-color="#5ad87d" inactiveColor="red"
								:inactive-value="0" :active-value="1"></u-switch>
						</uni-forms-item>
						<view class="forms-item-box" v-if="!item.ebp_result">
							<uni-forms-item label="异常备注" labelWidth="300rpx">
								<u-textarea border="surround" disabled v-model="item.ebp_remark" count maxlength="500">
								</u-textarea>
							</uni-forms-item>
							<uni-forms-item label="异常图片" name="ebp_PICTURE_URL">
								<u-upload :deletable="false" :maxCount="item.ebp_PICTURE_URL.length"
									:fileList="item.ebp_PICTURE_URL"></u-upload>
							</uni-forms-item>
						</view>
					</view>
				</uni-forms>
			</uni-card>
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
				console.log(data);
				that.arrayData = data
			})
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
