import * as API from './'

export default {
  // 获取卡信息列表
  apiCardInfoList: params => {
    return API.POST('boss/v1.0/cards', params)
  },
  // 获取卡详情
  apiCardInfoDetail: params => {
    const cardNo = params
    return API.GET(`boss/v1.0/cards/details/${cardNo}`, params)
  },
  // 编辑选中
  apiCardInfoEdit: params => {
    return API.POST('boss/v1.0/cards/details/modify', params)
  },
  // 卡信息-卡记账明细查询
  apiDetailsBillingchanges: params => {
    return API.POST('boss/v1.0/cards/details/billingchanges', params)
  },
  // 卡信息-月账单
  apiDetailsBillings: params => {
    return API.POST('boss/v1.0/cards/details/billings', params)
  },
  // 卡信息-上网记录
  apiDetailsNetworkdetails: params => {
    return API.POST('boss/v1.0/cards/details/net', params)
  },
  // 卡信息-套餐变更记录
  apiDetailsPakcagechanges: params => {
    return API.POST('boss/v1.0/cards/details/pakcagechanges', params)
  },
  // 卡信息-通讯计划变更记录
  apiDetailsPhoneplanchanges: params => {
    return API.POST('boss/v1.0/cards/details/phoneplanchanges', params)
  },
  // 卡信息-认证流水
  apiDetailsReals: params => {
    return API.POST('boss/v1.0/cards/details/reals', params)
  },

  // 卡信息-卡消费记录查询
  // apiDetailsUserpays: params => {
  //   return API.POST('boss/v1.0/cards/details/userpays', params)
  // },
  // 卡信息-卡通话记录明细查询
  apiDetailsVoicedetails: params => {
    return API.POST('boss/v1.0/cards/details/voice', params)
  },
  // 套餐查询
  apiPackagesList: params => {
    return API.POST('boss/v1.0/packages', params)
  },
  // 解绑
  apiCardsUnbind: params => {
    return API.POST('boss/v1.0/cards/unbind', params)
  },
  // 调整余额
  apiAccountBalanceModify: params => {
    return API.POST('boss/v1.0/cardbalance/accountbalance/modify', params)
  },
  // 清空可用量
  apiUsagebalanceClear: params => {
    return API.POST('boss/v1.0/cardbalance/usagebalance/clear', params)
  },
  // 调整用量额度
  apiUsagebalanceModify: params => {
    return API.POST('boss/v1.0/cardbalance/usagebalance/modify', params)
  },
  // 修改实名状态
  apiRealstatusModify: params => {
    return API.POST('boss/v1.0/student/realstatus/modify', params)
  },
  // 学生套餐
  apiStudentBalances: params => {
    return API.POST('boss/v1.0/student/balances', params)
  },
  // 要更改的套餐
  apiStudentPackages: params => {
    return API.POST('boss/v1.0/student/packages', params)
  },
  // 删除学生全部套餐
  apiStudentPackagesDelete: params => {
    return API.POST('boss/v1.0/student/packages/delete', params)
  },
  // 更改套餐
  apiStudentPackagesChange: params => {
    return API.POST('boss/v1.0/student/packages/change', params)
  },
  // 删除学生套餐
  apiStudentPackagesRemove: params => {
    return API.POST('boss/v1.0/student/packages/remove', params)
  },
  // 基础设置-蜂窝账号查询
  apiFwAccountList: params => {
    return API.POST('boss/v1.0/fw/accounts', params)
  },
  // 导出
  apiCardsExport: params => {
    return API.POST('boss/v1.0/cards/export', params)
  },
}