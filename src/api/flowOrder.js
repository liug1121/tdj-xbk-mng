import * as API from './'

export default {
  // 获取订单列表
  apiFlowOrderList: params => {
    return API.POST('regiestercard/v1.0/manage/registercards', params)
  },
  // 导出
  apiRegistercardsExport: params => {
    return API.POST('regiestercard/v1.0/manage/registercards/export', params)
  },
}