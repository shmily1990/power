<template>
	<view class="">
		<uni-card :isFull="true" v-for="v in orderList" :key="v.billID" class="card-box" @click="goDetail(v)">
			<view class="top-title">
				<text>{{ v.beginTime || ''}}</text>
				<text>{{ v.billType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">工单编号</text>
				<text class="value">{{ v.billCode || '' }}</text>
			</view>
			<view class="content-box"  v-if="v.billType!=='商务支持工单'">
				<text class="name">合同编号</text>
				<text class="value">{{ v.contractCode || '' }}</text>
			</view>
			<view class="content-box"  v-if="v.billType!=='商务支持工单'">
				<text class="name">项目名称</text>
				<text class="value">{{ v.entryName || '' }}</text>
			</view>
			<view class="content-box" v-if="v.billType!=='设备台账工单' &&  v.billType!=='商务支持工单'">
				<text class="name">服务类型</text>
				<text class="value">{{ v.serviceType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">开始时间</text>
				<text class="value">{{ v.beginTime || ''  }}</text>
			</view>
			<view class="content-box">
				<text class="name">结束时间</text>
				<text class="value">{{ v.endTime || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">计划工时</text>
				<text class="value">{{ v.planHour || '' }}</text>
			</view>
			<view class="content-box" v-if="v.billType!=='商务支持工单'">
				<text class="name">客户场站</text>
				<text class="value">{{ v.customerStation || '' }}</text>
			</view>
			<view class="content-box" v-if="v.billType!=='商务支持工单'">
				<text class="name">区域地址</text>
				<text class="value">{{ v.areaAddress || '' }}</text>
			</view>
			<view class="content-box" v-if="v.billType!=='商务支持工单'">
				<text class="name">详细地址</text>
				<text class="value" @click.stop="addressToast">{{ v.addressDetail || '' }}</text>
			</view>
			<view class="content-box" v-if="v.billType!=='商务支持工单'">
				<text class="name">联系信息</text>
				<text class="value"
					@click.stop="callPhone(v.contactPhone )">{{ v.contactName ||'' }}{{ v.contactPhone ||'' }}</text>
			</view>
			<view class="content-box">
				<text class="name">作业人员</text>
				<text class="value">{{ v.workNames || '' }}</text>
			</view>
		</uni-card>
	</view>

</template>

<script>
	export default {
		props: {
			billStatus: {
				type: Number,
				require: true
			},
			orderList: {
				type: Array,
				default: () => []
			}
		},
		methods: {
			callPhone(phone) {
				if (phone) {
					uni.makePhoneCall({
						phoneNumber: phone,
						success(e) {
							console.log(e);
						}
					})
				}
			},
			addressToast() {
				uni.showToast({
					title: "暂未维护场站经纬度信息",
					icon: 'none'
				})
			},
			goDetail(item) { // 跳转详情
				const {
					billID,
					billType
				} = item
				const billStatus = this.billStatus
				let strParams = `?billID=${billID}&billStatus=${billStatus}`
				switch (billType) {
					case '巡检工单':
						uni.navigateTo({
							url: "/pages/orders/viewOrder/viewOrder" + strParams
						})
						break;
					case '施工工单':
						uni.navigateTo({
							url: "/pages/orders/construction" + strParams
						})
						break;
					case '验收工单':
						uni.navigateTo({
							url: "/pages/orders/check" + strParams
						})
						break;
					case '设备台账工单':
						uni.navigateTo({
							url: "/pages/billEquipment/billEquipment" + strParams
						})
						break;
					case '商务支持工单':
						uni.navigateTo({
							url: "/pages/orders/businessSupport" + strParams
						})
						break;	
					default:
						break;
				}
			}

		}
	}
</script>

<style>
</style>
