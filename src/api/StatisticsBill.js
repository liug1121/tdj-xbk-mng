import * as API from './'

export default {
  // 基础设置-蜂窝账号查询
  apiFwAccountList: params => {
    return API.POST('boss/v1.0/fw/accounts', params)
  },
  // 运营商
  apiUnionidsList: params => {
    return API.GET('boss/v1.0/cards/compare/unionids', params)
  },
  // 子账号查询
  apisubAccountList: params => {
    return API.GET('boss/v1.0/cards/compare/subaccount', params)
  },
  // 获取统计输出列表
  apiBillList: params => {
    return API.POST('boss/v1.0/cards/compare/list', params)
  },
  // 导入卡
  apiBillUploadAdd: (fwAccount, cycle, params) => {
    return API.POST(`boss/v1.0/cards/compare?cycle=${cycle}&fwAccount=${fwAccount}`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 导出
  apiBillExport: params => {
    return API.POST('boss/v1.0/cards/compare/export', params)
  },
  // ------------- 支付记录------------
  // 查询支付记录
  apiPayRecordsList: params => {
    return API.POST('boss/v1.0/pay/payrecords', params)
  },
  // 创建申核流量
  apiFlowAdd: params => {
    return API.POST('boss/v1.0/flow/add', params)
  },
  // 创建审核流程明细
  apiFlowDetailAdd: params => {
    return API.POST('boss/v1.0/flow/detail/add', params)
  },
  // 查询审核流程明细
  apiFlowDetail: params => {
    return API.POST('boss/v1.0/flow/details', params)
  },
  // 查询审核流程
  apiFlowQuery: params => {
    return API.POST('boss/v1.0/flow/query', params)
  },
  // 渠道商品
  apichannelsPackagesList: params => {
    return API.POST('boss/v1.0/channels/packages', params)
  },
}