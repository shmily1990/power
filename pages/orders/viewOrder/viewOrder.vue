<template>
	<view class="box">
		<u-sticky bgColor="#00B0F0">
			<u-tabs :list="tabList" @change="tabChange" :scrollable="false" :activeStyle="{color:'#fff' }"
				:inactiveStyle="{ color:'#fff'  }" lineColor="#fff"></u-tabs>
		</u-sticky>
		<view v-show="activeIndex===0">
			<DetailInfos :detailInfo="detailInfo"></detailInfos>
		</view>
		<!-- 编辑/新增 -->
		<view v-show="activeIndex===1 && selectData.billStatus!==30">
			<uni-card :isFull="true" class="card-box">
				<uni-forms :modelValue="formData" :rules="rules" labelWidth="250rpx" :border="true" ref="form"
					validate-trigger="bind" label-position="left">
					<uni-forms-item label="站内温度" name="ebi_temperature" required>
						<uni-easyinput type="digit" @blur="replaceDecimal(1)" :disabled="isEdit"
							v-model="formData.ebi_temperature" placeholder="请输入" :inputBorder="false" />
					</uni-forms-item>
					<uni-forms-item label="站内湿度" name="ebi_humidity" required>
						<uni-easyinput type="digit" @blur="replaceDecimal(2)" :disabled="isEdit"
							v-model="formData.ebi_humidity" placeholder="请输入" :inputBorder="false" />
					</uni-forms-item>

					<uni-forms-item label="常规巡检" required>
						<view class="equipment-status" @click="goRoutine(0)">
							<text class="info success" v-if="routineIsHandle">已处理</text>
							<text class="info wait" v-else>未处理</text>
							<u-icon name="arrow-right" size="20"></u-icon>
						</view>
					</uni-forms-item>
					<uni-forms-item label="设备巡检" required>
						<view class="equipment-status" @click="goRoutine(1)">
							<text class="info success" v-if="deviceIsHandle">已处理</text>
							<text class="info wait" v-else>未处理</text>
							<u-icon name="arrow-right" size="20"></u-icon>
						</view>
					</uni-forms-item>
					<view class="forms-item">
						<uni-forms-item label="缺陷备注" labelWidth="300rpx">
							<u-textarea :disabled="isEdit" border="surround" v-model="formData.ebi_remark"
								placeholder="请输入备注信息" count maxlength="500">
							</u-textarea>
						</uni-forms-item>
					</view>
					<view class="forms-item">
						<uni-forms-item label="缺陷上报">
							<u-upload @afterRead="afterRead" v-if="!isEdit" :fileList="formData.ebi_ATTACH_URL"
								@delete="deletePic" multiple></u-upload>

							<u-upload @afterRead="afterRead" v-else :fileList="formData.ebi_ATTACH_URL"
								:maxCount="formData.ebi_ATTACH_URL.length" :deletable="false"></u-upload>
						</uni-forms-item>
					</view>
				</uni-forms>
			</uni-card>
		</view>

		<!-- 查看 -->
		<view v-if="activeIndex===1 && selectData.billStatus===30">
			<OrderSee :formData="formData" :routineData="routineView" :deviceData="billDeviceView"></OrderSee>
		</view>
		<view class="submit-btn">
			<u-button v-if="!isEdit && isAcceptBill" :throttleTime="2000" :loading="loading" color="#00B0F0"
				type="primary" @click="confirmReceipt" style="width: 90%;" text="确认接单"></u-button>
			<u-button v-else-if="!isEdit" :throttleTime="2000" :loading="loading" color="#00B0F0" type="primary"
				@click="submitData" style="width: 90%;" text="提交"></u-button>
		</view>
		<!-- 确认接单 -->
		<u-modal :show="show" title="提示" @confirm="acceptBill" @cancel="cancel" :showCancelButton="true"
			@close="show=false" :showConfirmButton="true">
			<template slot="default">
				<text>确认接单么？</text>
			</template>
		</u-modal>
		<u-no-network />
	</view>
</template>

<script>
	import {
		acceptBill,
		getOrderDetail,
		getCheckBillDealInfo,
		saveDealCheckBillMobile,
		getCheckBillResultInfo
	} from '@/api/order/index.js'
	import {
		domain
	} from '@/static/config.js'
	import OrderSee from './components/OrderSee'
	import DetailInfos from '../components/DetailInfo'
	export default {
		components: {
			OrderSee,
			DetailInfos
		},
		onLoad(data) {
			data.billID = Number(data.billID)
			data.billStatus = Number(data.billStatus)
			this.selectData = data
			if (this.selectData.billStatus === 10) this.tabList = [] // 如果是待确认状态就删除一个tab
		},
		data() {
			return {
				checkDeviceLists: [],
				resultData: {},
				show: false,
				loading: false,
				detailInfo: {},
				activeIndex: 0,
				selectData: {},
				routineData: {}, // 常规巡检
				deviceData: {}, // 设备巡检
				routineView: [], // 常规巡检see
				billDeviceView: [], //设备巡检see
				equipmentData: {},
				formData: {
					ebi_temperature: '',
					ebi_humidity: '',
					ebi_remark: '',
					ebi_ATTACH_URL: []
				},
				rules: {
					ebi_temperature: {
						rules: [{
							required: true,
							errorMessage: '站内温度必填',
						}]
					},
					ebi_humidity: {
						rules: [{
							required: true,
							errorMessage: '站内湿度度必填',
						}]
					}
				},
				tabList: [{
						name: '工单信息'
					},
					{
						name: '工单处理'
					}
				]
			}
		},
		computed: {
			isEdit() { //查看
				return this.selectData.billStatus === 30 ? true : false
			},
			isAcceptBill() { // 接单
				return this.selectData.billStatus === 10 ? true : false
			},
			routineIsHandle() {
				return (this.routineData && this.routineData.isHandle) || false
			},
			deviceIsHandle() {
				return (this.deviceData && this.deviceData.isHandle) || false
			}
		},
		async mounted() {
			await this.getOrderDetail()
			this.detailInfo.billStatus === '处理中' ? await this.getCheckBillDealInfo() : ''
			if (this.selectData.billStatus === 30) this.getCheckBillResultInfo()
		},

		methods: {
			async getCheckBillResultInfo() { // 查看数据
				try {
					const billID = this.selectData.billID
					const {
						resultCode,
						resultData
					} = await getCheckBillResultInfo({
						billID
					})
					if (resultCode === 0) {
						const data = {
							...resultData
						}
						data.inspectInfo.ebi_ATTACH_URL = data.inspectInfo.ebi_ATTACH_URL.split(',').map(val => {
							return {
								url: val
							}
						})
						// 基础界面
						this.formData = {
							...data.inspectInfo
						}
						// 巡检项目
						const checkProjects = [...resultData.checkProjectResult] || []
						const temporary = {}
						const checkProjectData = []
						checkProjects.forEach(val => {
							temporary[val.code_name] = []
						})
						resultData.checkProjectResult.forEach(val => {
							let key = val.code_name
							if (Object.hasOwn(temporary, key)) {
								temporary[key].push(val)
							}
						})
						for (const [key, value] of Object.entries(temporary)) {
							let obj = {}
							value = value.map(val => {
								if (val.ebp_PICTURE_URL && val.ebp_PICTURE_URL.length > 0) {
									val.ebp_PICTURE_URL = val.ebp_PICTURE_URL.split(',').map(val => {
										return {
											url: val
										}
									})
								}
								return val
							})
							obj.title = value[0].code_name
							obj.list = value
							checkProjectData.push(obj)
						}
						this.routineView = checkProjectData
						// 巡检设备
						const deveiceData = []
						const billDevice = resultData.billDevice
						billDevice.forEach(val => {
							if (val.typeDatas && val.typeDatas.length > 0) {
								deveiceData.push(...val.typeDatas)
							}
						})
						this.billDeviceView = deveiceData




					}
				} catch (e) {
					console.log(e);
				}
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
			async getCheckBillDealInfo() { // 待处理处数据
				try {
					const billID = this.selectData.billID
					const {
						resultCode,
						resultData
					} = await getCheckBillDealInfo({
						billID
					})
					if (resultCode === 0) {
						const resultDatas = resultData || []
						// 组合巡检设备 start
						const checkProjects = resultDatas.checkProjects && [...resultDatas.checkProjects] || []
						const temporary = {}
						const checkProjectData = []
						checkProjects.forEach(val => {
							temporary[val.ecp_sort_id] = []
						})
						resultDatas.checkProjects.forEach(val => {
							let key = val.ecp_sort_id
							if (Object.hasOwn(temporary, key)) {
								temporary[key].push(val)
							}
						})
						for (const [key, value] of Object.entries(temporary)) {
							let obj = {}
							value = value.map(val => {
								val.ebp_result = 1
								val.ebp_PICTURE_URL = []
								return val
							})
							obj.title = value[0].code_name
							obj.list = value
							checkProjectData.push(obj)
						}
						resultData.checkProjectData = checkProjectData
						//全部数据
						this.resultData = resultData
						//处理设备结构
						this.checkDeviceList()
					}
				} catch (e) {
					console.log(e);
				}
			},
			// 设备list(组合数据)
			checkDeviceList() {
				try {
					let checkDevices = new Map()
					let checkDeviceLists = []
					let checkDevicesData = this.resultData && this.resultData.checkDevices && [...this.resultData
						.checkDevices
					] || [] // 设备list
					let deviceAttributes = this.resultData && this.resultData.deviceAttributes && [...this.resultData
						.deviceAttributes
					] || [] // 设备下的动态字段
					let attributeRanges = this.resultData && this.resultData.attributeRanges && [...this.resultData
						.attributeRanges
					] || [] // 设备下的动态字段的选项
					if (checkDevicesData.length > 0) {
						checkDevicesData.map(val => {
							if (checkDevices.has(val.ebd_device_type)) {
								checkDevices.get(val.ebd_device_type).push(val)
							} else {
								checkDevices.set(val.ebd_device_type, [val])
							}
						})

					}
					for (const [, val] of checkDevices) {
						checkDeviceLists.push(val)
					}
					// 动态字段
					checkDeviceLists.forEach(item => {
						deviceAttributes.forEach(attrItem => {
							switch (attrItem.eda_type) {
								case 10:
									attrItem.value = ''
									break;
								case 20:
									attrItem.value = ''
									break;
								case 30:
									attrItem.value = []
									break;
								case 40:
									attrItem.imageList = []
									attrItem.value = []
									break;
								case 50:
									attrItem.value = ''
									break;

								default:
									break;
							}
							if (attrItem.ete_type_id === item[0].ebd_device_type) {
								item.map(v => {
									if (v.attributes) {
										v.attributes.push(attrItem)
									} else {
										v.attributes = [attrItem]
									}
									return v
								})
							}
						})
					})
					// 动态字段下属性
					checkDeviceLists.forEach((item) => {
						const attributes = item[0].attributes // 每次取第一条数据，切记
						attributeRanges.forEach(attrItem => {
							attributes.forEach(attributeItem => {
								if (attributeItem.eda_id === attrItem.ear_attribute_id) {
									if (attributeItem.rangesList) {
										attributeItem.rangesList.push(attrItem)
									} else {
										attributeItem.rangesList = [attrItem]
									}

								}
							})
						})
					})
					this.checkDeviceLists = checkDeviceLists
				} catch (error) {
					console.log(error);
				}
			},
			// 删除图片
			deletePic(event) {
				const {
					index
				} = event
				this.formData.ebi_ATTACH_URL.splice(index, 1)

			}, // 新增图片
			async afterRead(event) {
				try {
					this.isPreview = true
					const imageList = event.file
					const images = await this.uploadImgPush(imageList) || []
					let workImage = this.formData.ebi_ATTACH_URL
					if (workImage.length > 0) {
						ebi_ATTACH_URL
						this.formData.ebi_ATTACH_URL = [...workImage, ...images]
					} else { //没有上传过图片
						this.formData.ebi_ATTACH_URL = [...images]
					}
				} catch (e) {
					console.log(e);
				}
			},
			uploadFilePromise(filePath) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: domain + '/api/erp/Files/UploadImageMobile',
						filePath,
						name: 'file',
						success: (res) => {
							if (res.statusCode === 200) {
								const result = JSON.parse(res.data)
								if (result.resultCode === 0) {
									resolve(result.resultData)
								}
							}
						}
					})
				})
			},
			async uploadImgPush(imageList) {
				try {
					let images = []
					for (let i = 0; i < imageList.length; i++) {
						const currentImg = imageList[i]
						const asyncImg = await this.uploadFilePromise(currentImg.url)
						images.push(asyncImg)
					}
					images = images.map(val => {
						return {
							url: domain + '/' + val.url
						}
					})
					return images
				} catch (e) {
					console.log(e);
				}
			},

			submitData() {
				this.$refs['form'].validate().then(async res => {
					if (!this.routineIsHandle) {
						uni.showToast({
							title: "请先处理常规巡检数据！",
							icon: 'none'
						})
						return false
					}
					if (!this.deviceIsHandle) {
						uni.showToast({
							title: "请先处理设备巡检数据！",
							icon: 'none'
						})
						return false
					}

					try {
						const checkProjects = []
						const checkProjectData = JSON.parse(JSON.stringify(this.routineData.arrayData))
						checkProjectData.forEach(val => {
							if (val.list) {
								checkProjects.push(...val.list)
							}
						})
						if (!checkProjects || checkProjects.length === 0 || checkProjects.some(val =>
								typeof val.ebp_result === 'object')) {
							uni.showToast({
								title: "'请先完善巡检项目【结果】，再提交！'",
								icon: 'none'
							})
							return false;
						}
						// 处理巡检项目数据
						for (let i = 0; i < checkProjects.length; i++) {
							const currentData = checkProjects[i];
							currentData.ebp_category = currentData.ecp_sort_id
							currentData.ebp_project = currentData.ecp_id
							currentData.ebp_PICTURE_URL = currentData.ebp_PICTURE_URL && currentData
								.ebp_PICTURE_URL.map(val => val.url)
								.join(',') || ''
							currentData.ebp_bill_id = this.selectData.billID

						}
						console.log('巡检项目----', checkProjects);
						// 处理设备信息数据
						const deviceDataForm = []
						const deviceList = this.deviceData.equipmentData
						for (let i = 0; i < deviceList.length; i++) {
							const device = deviceList[i]; // 单条设备数据
							const attributeList = device.attributes
							for (let k = 0; k < attributeList.length; k++) {
								const attribute = attributeList[k]; // 单个属性
								const deviceData = {}
								deviceData.ebav_device_id = device.ebd_id // 设备ID
								deviceData.ebav_attribute_type = attribute.eda_type //属性表单类型ID
								deviceData.ebav_attribute = attribute.eda_name //属性
								if (attribute.eda_type == 40) {
									deviceData.ebav_value = attribute.value.map(v => v.url).join(',')
								} else {

									deviceData.ebav_value = typeof attribute.value === 'object' ? attribute
										.value.join('') : attribute.value
								}
								deviceDataForm.push(deviceData)
							}
						}
						console.log('巡检设备数据----', deviceDataForm);

						//完整数据
						const formData = {
							ebi_temperature: this.formData.ebi_temperature,
							ebi_humidity: this.formData.ebi_humidity,
							ebi_ATTACH_URL: this.formData.ebi_ATTACH_URL.map(v => v.url).join(','),
							ebi_remark: this.formData.ebi_remark,
							ebi_bill_id: this.selectData.billID,
							billCheckProjects: checkProjects,
							billDeviceAttributeValues: deviceDataForm
						}

						this.loading = true
						const {
							resultCode
						} = await saveDealCheckBillMobile(formData)
						if (resultCode === 0) {
							uni.showToast({
								title: "提交成功！",
							})
							uni.navigateBack()
						} else {
							this.loading = false
						}

					} catch (e) {
						this.loading = false
						console.log(e);
					}
					console.log('表单数据信息：', res);
				}).catch(err => {
					this.loading = false
					uni.showToast({
						title: "请先完善表单信息！",
						icon: 'none'
					})
					return false
				})
			},
			successImage(e) {
				console.log(e);
			},
			goRoutine(flag) {
				const that = this // 页面通信，注意this指向
				if (!flag) { //常规巡检
					if (that.routineData.isHandle) {
						if (!that.routineData.arrayData || that.routineData.arrayData.length === 0) {
							uni.showToast({
								title: "请先确保常规巡检数据正确，在操作！",
								icon: 'none'
							})
							return
						}
					} else {
						if (!that.resultData.checkProjectData || that.resultData.checkProjectData.length === 0) {
							uni.showToast({
								title: "请先确保常规巡检数据正确，在操作！",
								icon: 'none'
							})
							return
						}
					}
					uni.navigateTo({
						url: "/pages/orders/viewOrder/routine",
						events: {
							// 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
							routineFunction: function(data) {
								that.routineData = data
								console.log('this.routineData====', that.routineData);
							}
						},
						fail(e) {
							console.log(e);
						},
						success(res) {
							const checkProjectData = that.routineData && that.routineData.isHandle ? [...that
								.routineData.arrayData
							] : that.resultData.checkProjectData || []
							res.eventChannel.emit('checkProjectData', checkProjectData)
						}
					})
				} else { //设备巡检
					if (that.deviceData.isHandle) {
						if (!that.deviceData.equipmentData || that.deviceData.equipmentData.length === 0) {
							uni.showToast({
								title: "请先确保巡检设备数据正确，在操作！",
								icon: 'none'
							})
							return
						}
					} else {
						if (!that.checkDeviceLists || that.checkDeviceLists.length === 0) {
							uni.showToast({
								title: "请先确保巡检设备数据正确，在操作！",
								icon: 'none'
							})
							return
						}
					}
					uni.navigateTo({
						url: "/pages/orders/viewOrder/equipment/equipment",
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
							const checkDeviceLists = that.deviceData && that.deviceData.isHandle ? [...that
								.deviceData.equipmentData
							] : [...that.checkDeviceLists]
							res.eventChannel.emit('deviceData', checkDeviceLists)
						}
					})
				}
			},
			replaceDecimal(flag) { // 替换小数
				if (flag === 1) {
					this.formData.ebi_temperature = this.formData.ebi_temperature.replace(/^(\-)*(\d+)\.(\d).*$/,
						'$1$2.$3')
				} else {
					this.formData.ebi_humidity = this.formData.ebi_humidity.replace(/^(\-)*(\d+)\.(\d).*$/, '$1$2.$3')
				}

			}

		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;

	}

	::v-deep.box {
		.nav-color {
			background-color: $uni-textf-color;
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
						flex-shrink: 0;
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

				.equipment-status {
					height: 100%;
					display: flex;
					justify-content: flex-end;
					text-align: right;
					align-items: center;

					.info {
						margin-right: 20rpx;
					}

					.wait {
						color: $uni-text-color-grey;
					}

					.success {
						color: $uni-textf-color;
					}
				}
			}


		}

	}

	.submit-btn {
		margin: 20rpx auto;
		width: 90%;
	}
</style>
