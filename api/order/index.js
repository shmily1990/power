import http from '@/request/index.js'

export function acceptBill(data) { // 确认接单
	return http.post('/api/erp/Bill/AcceptBill', data)
}
export function getOrderList(data) { // 工单list
	return http.post('/api/erp/Bill/QueryBillInfoByStatus', data)
}
export function getOrderDetail(data) { // 工单详情
	return http.post('/api/erp/Bill/QueryAcceptBillInfos', data)
}
export function getCheckBillDealInfo(data) { // 工单待处理详情
	return http.post('/api/erp/CheckBill/GetCheckBillDealInfo', data)
}

export function constructionSubmit(data) { //施工单提交
	return http.post('/api/erp/Mobile/ConstructionSubmit', data)
}

export function constructionDetail(data) { //施工单查看
	return http.post('/api/erp/Mobile/ConstructionDetail', data)
}

export function complateExamineBill(data) { //验收单提交
	return http.post('/api/erp/Examine/ComplateExamineBill', data)
}
export function queryExamineBillResultInfo(data) { //验收单查看
	return http.post('/api/erp/Examine/QueryExamineBillResultInfo', data)
}

export function selectEquipment(data) { //设备台帐工单--（查询编号设备类型、属性）
	return http.post('/api/erp/Mobile/AccountNumber', data)
}
export function submitEquipment(data) { //设备台帐工单--（提交）
	return http.post('/api/erp/Mobile/AccountSubmit', data)
}
export function viewEquipment(data) { //设备台帐工单--（查看）
	return http.post('/api/erp/Mobile/AccountDetail', data)
}
export function saveDealCheckBillMobile(data) { //巡检工单--（提交）
	return http.post('api/erp/CheckBill/SaveDealCheckBillMobile', data)
}
export function getCheckBillResultInfo(data) { //巡检工单--（查看）
	return http.post('api/erp/CheckBill/GetCheckBillResultInfo', data)
}
export function businessSupportComplateBill(data) { //商务支持工单提交
	return http.post('api/erp/Bill/ComplateBill', data)
}

