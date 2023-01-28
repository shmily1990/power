<template>
	<view class="">
		<uni-card :isFull="true" class="card-box" v-if="!isBusinessSupport">
			<view class="top-title">
				<text>工单信息</text>
			</view>
			<view class="content-box">
				<text class="name">工单编号</text>
				<text class="value">{{ detailInfo.billCode || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">工单类型</text>
				<text class="value">{{ detailInfo.billType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">工单状态</text>
				<text class="value">{{ detailInfo.billStatus || ''  }}</text>
			</view>
			<view class="content-box" v-if="detailInfo.billType==='巡检工单'">
				<text class="name">常规巡检</text>
				<text class="value">{{ checkSort || ''  }}</text>
			</view>
			<view class="content-box">
				<text class="name">合同编号</text>
				<text class="value">{{ detailInfo.contractCode || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">项目名称</text>
				<text class="value">{{ detailInfo.entryName || '' }}</text>
			</view>
			<view class="content-box" v-if="detailInfo.billType!=='设备台账工单'">
				<text class="name">服务类型</text>
				<text class="value">{{ detailInfo.serviceType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">开始时间</text>
				<text class="value">{{ detailInfo.beginTime || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">结束时间</text>
				<text class="value">{{ detailInfo.endTime || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">计划工时</text>
				<text class="value">{{ detailInfo.planHour || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">客户场站</text>
				<text class="value">{{ detailInfo.customerStation || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">建筑类型</text>
				<text class="value">{{ detailInfo.bulidType || '' }}</text>
			</view>

			<view class="content-box">
				<text class="name">电压类型</text>
				<text class="value">{{ detailInfo.voltageType || '' }}</text>
			</view>

			<view class="content-box">
				<text class="name">区域地址</text>
				<text class="value">{{ detailInfo.areaAddress || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">详细地址</text>
				<text class="value" @click.stop="addressToast">{{ detailInfo.addressDetail || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">联系信息</text>
				<text class="value" @click.stop="callPhone(detailInfo.contactPhone )">{{ detailInfo.contactName ||'' }}{{ detailInfo.contactPhone ||'' }}</text>
			</view>
			<view class="content-box">
				<text class="name">作业人员</text>
				<text class="value">{{ detailInfo.workNames || '' }}</text>
			</view>
		</uni-card>
		<uni-card :isFull="true" class="card-box" v-else>
			<view class="top-title">
				<text>工单信息</text>
			</view>
			<view class="content-box">
				<text class="name">工单编号</text>
				<text class="value">{{ detailInfo.billCode || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">工单类型</text>
				<text class="value">{{ detailInfo.billType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">工单状态</text>
				<text class="value">{{ detailInfo.billStatus || ''  }}</text>
			</view>
			<view class="content-box">
				<text class="name">客户名称</text>
				<text class="value">{{ detailInfo.customerName || ''  }}</text>
			</view>
			<view class="content-box">
				<text class="name">客户地址</text>
				<text class="value">{{ detailInfo.customerAddress || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">联系人名称</text>
				<text class="value">{{ detailInfo.contactName || '' }}</text>
			</view>
			<view class="content-box" v-if="detailInfo.billType!=='设备台账工单'">
				<text class="name">联系人电话</text>
				<text class="value">{{ detailInfo.contactPhone || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">电压类型</text>
				<text class="value">{{ detailInfo.voltageType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">建筑类型</text>
				<text class="value">{{ detailInfo.bulidType || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">未来服务名称</text>
				<text class="value">{{ detailInfo.serverName || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">需要支持</text>
				<text class="value">{{ detailInfo.support || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">拜访记录</text>
				<text class="value">{{ detailInfo.record || '' }}</text>
			</view>
		
			<view class="content-box">
				<text class="name">开始时间</text>
				<text class="value">{{ detailInfo.beginTime || '' }}</text>
			</view>
		
			<view class="content-box">
				<text class="name">结束时间</text>
				<text class="value">{{ detailInfo.endTime || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">计划工时</text>
				<text class="value"> {{ detailInfo.planHour || '' }}</text>
			</view>
			<view class="content-box">
				<text class="name">作业人员</text>
				<text class="value">{{ detailInfo.workNames || '' }}</text>
			</view>
		</uni-card>
		
		<uni-card :isFull="true" class="card-box">
			<view class="top-title">
				<view>操作记录</view>
			</view>
			<view class="" v-for="v of taskInfo" :key="v +''" style="margin-bottom: 20rpx;">
				<view class="content-log">
					<text class="name" :selectable="true"> 操作类型 </text>
					<text class="value" :selectable="true"> {{ v.remark }}</text>
				</view>
				<view class="content-log">
					<text class="name">操作时间 </text>
					<text class="value">{{ v.date }}</text>
				</view>
				<view class="content-log">
					<text class="name">操作人员</text>
					<text class="value">{{ v.name }}</text>
				</view>
				<u-divider />

			</view>

		</uni-card>


	</view>
</template>

<script>
	export default {
		props: {
			detailInfo: {
				type: Object,
				default: () => {}
			},
			orderType:{ // 工单类型判断 1:商务支持工单
				type:Number
			}
		},
		computed:{
			taskInfo() { // 操作记录
				return this.detailInfo.taskInfo || []
			},
			checkSort() { // 常规巡检
				return this.detailInfo.checkSort && this.detailInfo.checkSort.join(',') || ''
			},
			isBusinessSupport(){ // 是否商务支持工单
				return this.orderType===1
			}
		},
		methods:{
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
			}
		}
	}
</script>

<style>
</style>
