<template>
	<view class="box">
		<u-sticky bgColor="#00B0F0">
			<u-tabs :list="tabList" @change="tabChange" :scrollable="false" :activeStyle="{color:'#fff' }"
				:inactiveStyle="{ color:'#fff'  }" lineColor="#fff"></u-tabs>
		</u-sticky>
		<view v-show="activeIndex===0">
			<DetailInfos :detailInfo="detailInfo"></detailInfos>

		</view>
		<view v-show="activeIndex===1">
			<uni-card :isFull="true" class="card-box clearbgc" v-for="(item,key) of arrayList" :key="key"
				@click.stop="viewDeviceItem(key)">
				<view class="top-title">
					<text>{{ item.typeName  || '' }}</text>
					<text class="syNumber">{{ item.number || '' }}</text>
				</view>
				<view class="content-box">
					<text class="name">数元设备编号</text>
					<text class="value">{{ item.number|| item.syNumber || '' }}</text>
				</view>
				<view class="content-box">
					<text class="name">客户设备编号</text>
					<text class="value">{{ item.customerNumber || '' }}</text>
				</view>
				<view class="content-box">
					<text class="name">客户设备名称</text>
					<text class="value">{{ item.customerDeviceName || ''  }}</text>
				</view>
				<view class="content-box">
					<text class="name">设备类型信息</text>
					<text class="value">{{ item.typeName || item.deviceTypeName || '' }}</text>
				</view>
				<view class="content-box">
					<text class="name">设备类型编号</text>
					<text class="value">{{ item.typeNo || item.typeNumber || '' }}</text>
				</view>
				<view class="btn" v-if="!isEdit">
					<u-button shape="circle" color="#00B0F0" plain @click.stop="editDevice(key)" type="primary"
						text="编辑">
					</u-button>
					<u-button shape="circle" plain color="red" @click.stop="deleteDevice(key)" type="primary" text="删除">
					</u-button>
				</view>
			</uni-card>
			<u-empty v-if="arrayList.length===0" mode="data" icon="http://cdn.uviewui.com/uview/empty/data.png">
			</u-empty>
		</view>
		<view class="submit-btn" :class="{ toFixed : lengthNo }">
			<u-button v-if="!isEdit && isAcceptBill" :throttleTime="2000" :loading="loading" color="#00B0F0"
				type="primary" @click="confirmReceipt" style="width: 90%;" text="确认接单"></u-button>
			<view v-else-if="!isEdit">
				<view class="custom-style">
					<u-button v-if="activeIndex===1" plain :throttleTime="2000" @click="addDevice" color="#00B0F0"
						type="primary" style="width: 90%;" text="新建"></u-button>
				</view>
				<u-button :throttleTime="2000" :loading="loading" color="#00B0F0" type="primary" @click="submitData"
					style="width: 90%;" text="提交"></u-button>
			</view>
		</view>
		<!-- 选择设备 -->
		<u-picker @cancel="deviceShow=false" confirmColor="#00B0F0" @confirm="bindPickerChange" :show="deviceShow"
			keyName="typeName" :columns="[deviceColumns]"></u-picker>

		<!-- 确认接单 -->
		<u-modal :show="show" title="提示" @confirm="acceptBill" @cancel="cancel" :showCancelButton="true"
			@close="show=false" :showConfirmButton="true">
			<template slot="default">
				<text>确认接单么？</text>
			</template>
		</u-modal>

		<!-- 删除 -->
		<u-modal :show="deletDialog" title="提示" @confirm="deleteConfirm" @cancel="deletDialog=false"
			:showCancelButton="true" @close="deletDialog=false" :showConfirmButton="true" :closeOnClickOverlay="true">
			<template slot="default">
				<text>确认要删除么？</text>
			</template>
		</u-modal>
	</view>
</template>

<script>
	import {
		acceptBill,
		getOrderDetail,
		submitEquipment,
		selectEquipment,
		viewEquipment // 预览
	} from '@/api/order/index.js'
	import {
		domain
	} from '@/static/config.js'
import { stringify } from 'querystring'
	import DetailInfos from '../orders/components/DetailInfo'

	export default {
		onLoad(data) {
			data.billID = Number(data.billID)
			data.billStatus = Number(data.billStatus)
			this.selectData = data
			if (this.selectData.billStatus === 10) this.tabList = [] // 如果是待确认状态就删除一个tab
		},
		components: {
			DetailInfos
		},
		onShow() {
			this.getOrderDetail()
			this.isEdit ? this.viewEquipment() : ''
			if (this.deviceList.length === 0 && !this.isEdit) this.selectEquipment()
		},
		computed: {
			isEdit() {
				return this.selectData.billStatus === 30 ? true : false
			},
			isAcceptBill() { // 接单
				return this.selectData.billStatus === 10 ? true : false
			},
			lengthNo() { // 是否显示新建按钮
				return this.arrayList.length === 0 && this.activeIndex === 1 ? true : false
			},
			deviceColumns() {
				return [...this.deviceList]
			}

		},
		watch: {
			viewData() { //设备picker数据
				let deviceList = JSON.parse(JSON.stringify(this.viewData.deviceList)) || []
				this.deviceList = deviceList || []
			}

		},
		data() {
			return {
				deviceShow: false,
				deleteIndex: undefined,
				deletDialog: false,
				deviceList: [],
				viewData: {},
				arrayList: [
					// PC字段根移动端不一致
					// {
					// 	deviceTypeName: '', //设备类型
					// 	typeNumber: '', //设备类型编号
					// 	syNumber: '', // 数元设备编号，系统自动生成
					// 	customerNumber: '', //客户设备编号
					// 	customerDeviceName: '', //客户设备名称
					// },
				],
				registerForm: {
					attributes: [],
				},
				show: false,
				loading: false,
				selectData: {},
				activeIndex: 0,
				detailInfo: {},
				tabList: [{
						name: '工单信息'
					},
					{
						name: '工单处理'
					}
				]
			}
		},

		methods: {
			addDevice() { // 点击获取数元设备编码
				this.deviceShow = true
				this.selectEquipment()
			},
			deleteDevice(index) {
				this.deleteIndex = index
				this.deletDialog = true
			},
			viewDeviceItem(index) { // 查看某个设备数据
				if (this.isEdit) {
					const deviceItem = {
						...this.arrayList[index],
						index
					}
					uni.navigateTo({
						url: "/pages/billEquipment/editDevices",
						success(res) { // 向界面发出数据
							console.log('发送了数据---', deviceItem);
							res.eventChannel.emit('deviceItem', deviceItem)
						}
					})

				}
			},
			deleteConfirm() {
				if (typeof this.deleteIndex === 'number') {
					this.arrayList.splice(this.deleteIndex, 1)
					this.deleteIndex = undefined
					this.deletDialog = false
				}

			},
			editDevice(index) { // 编辑
				const that = this
				const deviceItem = {
					...this.arrayList[index],
					index
				}
				uni.navigateTo({
					url: "/pages/billEquipment/editDevices",
					events: {
						getDeviceItem: function(data) { // 界面接收到数据
							console.log('收到了数据');
							if (typeof data.index === 'number') { // edit
								that.arrayList.splice(data.index, 1, data)
							} else { // add
								that.arrayList.push(data)
							}

						}
					},
					success(res) { // 向界面发出数据
						console.log('发送了数据---', deviceItem);
						res.eventChannel.emit('deviceItem', deviceItem)
					}
				})
			},
			bindPickerChange: function(e) { //新增/编辑
				const that = this
				let deviceItem = JSON.parse(JSON.stringify(e.value[0]))
				const number = this.viewData.number
				deviceItem.number = number
				that.deviceShow = false
				uni.navigateTo({
					url: "/pages/billEquipment/editDevices",
					events: {
						getDeviceItem: function(data) { // 界面接收到数据
							if (data.index) { // edit
								that.arrayList.splice(data.index, 1, data)
							} else { // add
								that.arrayList.push(data)
							}
						}
					},
					success(res) { // 向界面发出数据
						res.eventChannel.emit('deviceItem', deviceItem)
					}
				})
			},
			tabChange(e) { // 切换tab
				this.activeIndex = e.index
			},
			cancel() {
				this.show = false
				this.loading = false
			},
			confirmReceipt() {
				this.show = true
				this.loading = true
			},
			async acceptBill() { // 确认接单
				try {
					const billID = this.selectData.billID
					const {
						resultCode
					} = await acceptBill({
						billID
					})
					if (resultCode === 0) {
						uni.showToast({
							title: "接单成功！",
						})
						uni.navigateBack()
						this.loading = false
						this.show = false
					} else {
						this.show = false
						this.loading = false
					}
				} catch (e) {
					this.loading = false
					this.show = false
					console.log(e);
				}
			},
			async getOrderDetail() { //基础数据
				try {
					const selectData = {
						...this.selectData
					}
					const {
						resultCode,
						resultData
					} = await getOrderDetail(selectData)
					if (resultCode === 0) {
						this.detailInfo = resultData
					} else {
						this.detailInfo = {}
					}
				} catch (e) {
					console.log(e);
				}
			},
			async selectEquipment() { // 设备数据
				try {
					const {
						resultCode,
						resultData
					} = await selectEquipment()
					if (resultCode === 0 && resultData) {
						const {
							type,
							attribute,
							number
						} = resultData
						const viewData = {
							deviceList: [],
							number
						}
						for (let i = 0; i < type.length; i++) {
							const devicItem = type[i];
							devicItem.attributeList = []
							for (let j = 0; j < attribute.length; j++) {
								const attributeItem = attribute[j];
								switch (attributeItem.formType) {
									case 10:
										attributeItem.attributeValue = ''
										break;
									case 20:
										attributeItem.attributeValue = ''
										break;
									case 30:
										attributeItem.attributeValue = []
										break;
									case 40:
										attributeItem.attributeValue = []
										break;
									case 50:
										attributeItem.attributeValue = ''
										break;

								}
								if (devicItem.typeId === attributeItem.typeId) {
									devicItem.attributeList.push(attributeItem)
								}
							}
							viewData.deviceList.push(devicItem)
						}
						this.viewData = viewData
					}
				} catch (e) {
					console.log(e);
				}
			},
			async viewEquipment() { // 查看
				try {
					const {
						resultCode,
						resultData
					} = await viewEquipment({
						billId: this.selectData.billID
					})
					if (resultCode === 0) {
						this.arrayList = resultData.data
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			async submitData() {
				if (this.arrayList.length === 0 || !this.arrayList) {
					uni.$u.toast('请至少添加一条设备数据！')
					return
				}
				this.loading = true
				try {
					const device = [] // 设备台帐
					const attribute = [] //静态属性
					for (let i = 0; i < this.arrayList.length; i++) {
						const deviceItem = this.arrayList[i]
						const attributeList = this.arrayList[i].attributeList || [] // 设备下属性
						const syNumber = deviceItem.number // 数元设备编码
						const customerNumber = deviceItem.customerNumber //客户设备编码
						const customerDeviceName = deviceItem.customerDeviceName //客户设备名称
						const deviceType = deviceItem.typeId //设备类型
						const typeNumber = deviceItem.typeNo //设备类型编号
						device.push({
							syNumber,
							customerNumber,
							customerDeviceName,
							deviceType,
							typeNumber
						})
						if (attributeList && attributeList.length > 0) {
							for (let j = 0; j < attributeList.length; j++) {
								const {
									attributeId,
									attributeType,
									attributeName,
									attributeValue,
									formType,
									must
								} = attributeList[j]
								if (formType === 30) { // 多选
									attributeValue = attributeValue.join(',')
								}
								if (formType === 40) { // 图片
									attributeValue = attributeValue.map(v => v.url).join(',')
								}
								attribute.push({
									attributeId,
									attributeType,
									attributeName,
									attributeValue,
									formType,
									syNumber,
									attributeMust: must
								})
							}
						}
					}
					const paramsData = {
						device,
						attribute,
						billId: this.selectData.billID
					}
					const {
						resultCode
					} = await submitEquipment(paramsData)
					if (resultCode === 0) {
						this.loading = false
						uni.showToast({
							title: "修改成功！",
						})
						uni.navigateBack()
					} else {
						this.loading = false
					}
				} catch (e) {
					console.log(e);
					this.loading = false
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;

	}

	.custom-style {
		margin-bottom: 10rpx;
	}

	::v-deep.box {
		// height: 100vh;

		.nav-color {
			background-color: #00B0F0;
		}

		.tab-color {
			color: #fff !important;
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
						word-break: break-all;
					}
				}

				.content-log {
					.value {
						margin-left: 30rpx;
						color: $uni-text-color;
					}
				}

				.forms-item {
					.uni-forms-item.is-direction-left {
						flex-direction: column;
					}
				}
			}


		}

		.clearbgc {
			margin-bottom: 30rpx;

			.uni-card {
				.top-title {
					font-size: 32rpx;
					color: $uni-text-color;
					display: flex;
					justify-content: normal;

					.syNumber {
						margin-left: 20rpx;
					}
				}

				.btn {
					display: flex;
					justify-content: space-between;
					align-items: center;
					width: 100%;

					.u-button {
						width: 42%;
						height: 60rpx;
					}
				}
			}
		}

	}

	.submit-btn {
		margin: 20rpx auto;
		width: 90%;
	}

	.toFixed {
		position: fixed;
		bottom: 0;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
