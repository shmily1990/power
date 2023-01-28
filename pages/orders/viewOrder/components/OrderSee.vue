<template>
	<uni-card :isFull="true" class="card-box">
			<uni-forms :modelValue="formData"  labelWidth="250rpx" :border="true" ref="form"
				validate-trigger="bind" label-position="left">
				<uni-forms-item label="站内温度" name="ebi_temperature">
					<text class="text-view">{{ formData.ebi_temperature  }}</text>
				</uni-forms-item>
				<uni-forms-item label="站内湿度" name="ebi_humidity">
					<text class="text-view">{{ formData.ebi_humidity }}</text>
				</uni-forms-item>
	
				<uni-forms-item label="常规巡检">
					<view class="equipment-status" @click="goRoutine(0)">
						<text  class="info success">查看</text>
					</view>
				</uni-forms-item>
				<uni-forms-item label="设备巡检">
					<view class="equipment-status" @click="goRoutine(1)">
						<text  class="info success">查看</text>
					</view>
				</uni-forms-item>
				<view class="forms-item">
					<uni-forms-item label="缺陷备注" labelWidth="300rpx">
						<u-textarea disabled border="surround" v-model="formData.ebi_remark" count
							maxlength="500">
						</u-textarea>
					</uni-forms-item>
				</view>
				<view class="forms-item">
					<uni-forms-item label="缺陷上报">
						<u-upload @afterRead="afterRead" :fileList="formData.ebi_ATTACH_URL"
							:maxCount="formData.ebi_ATTACH_URL.length" :deletable="false"></u-upload>
					</uni-forms-item>
				</view>
			</uni-forms>
		</uni-card>
</template>

<script>
	export default {
		props:{
			formData:{
				type:Object,
				default:()=>{},
				require:true
			},
			routineData:{
				type:Array,
				default:()=>[],
				require:true
			},
			deviceData:{
				type:Array,
				default:()=>[],
				require:true
			}
		},
		methods:{
			goRoutine(flag) {
				const that = this // 页面通信，注意this指向
				if (!flag) { //常规巡检
					uni.navigateTo({
						url: "/pages/orders/viewOrder/components/routineSee",
						fail(e) {
							console.log(e);
						},
						success(res) {
							res.eventChannel.emit('checkProjectData',  that.routineData)
						}
					})
				} else { //设备巡检
					uni.navigateTo({
						url: "/pages/orders/viewOrder/components/equipmentSee",
						events: {
							equipmentFunction: function(data) {
								that.deviceData = data
								console.log('this.deviceData====', that.deviceData);
							}
						},
						fail(e) {
							console.log(e);
						},
						success(res) {
							res.eventChannel.emit('deviceData', that.deviceData)
						}
					})
				}
			}
		}
	}
</script>
<style lang="scss" scoped>
	.text-view {
		height: 72rpx;
		display: flex;
		align-items: center;
	}
</style>
