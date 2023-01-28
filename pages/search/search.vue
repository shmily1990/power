<template>
	<view class="search-box">
		<search-view :is-focus="false" :theme="themeClass" :show-want="true" :orderList="orderList"
		:hot-list="searchStyleList" @getSearchText="getSearchText" :billStatus="searchData.billStatus" :isFocus="true"></search-view>
	</view>
</template>

<script>
	import SearchView from '../../components/search/search.vue'
	import {
		getOrderList
	} from '@/api/order/index.js'
	export default {
		components: {
			SearchView
		},
		onLoad(option) {
			const that=this
			this.userInfo = uni.getStorageSync('userInfo') || {}
			this.eventChannel = this.getOpenerEventChannel();
			this.eventChannel.on('getOrderList', function(data) {
				that.searchData={...that.searchData,...data}
			})
		},
		onShow() {
			if(this.searchData.code){
				this.getOrderList()
			}
		},
		data() {
			return {
				searchData:{
						isOwner:false,
						billType:0,
						billStatus:10,
						day:0,
						code:'',
						searchStyle:1,
						pageCount:100
				},				
				userInfo:null,
				eventChannel:null,
				orderList:[],
				themeClass: 'block',
				searchStyleList: ['工单编号','合同编号']	//初始化推荐列表
			}
		},
		methods: {
			async getOrderList() { //获取列表
				try {
					const userID=this.userInfo.userID || 0
					const searchData={ ...this.searchData,maxBillID:0 }
					const {
						resultCode,
						resultData: {
							queryBillInfos,
							totol
						}
					} = await getOrderList(searchData)
					if (resultCode === 0 && queryBillInfos && queryBillInfos.length>0) {
						this.orderList=queryBillInfos || []
						
					}else{
						this.orderList=[]
					}
				} catch (e) {
					console.log(e);
				}
			},
			getSearchText(data) {
				const { searchStyle=1,code='' } = data
				this.searchData.searchStyle=searchStyle
				this.searchData.code=code
				if(code.length>=6){
					this.getOrderList()
				}
			}
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
		height: 100vh;
	}
</style>
