import * as API from './'

export default {
  // 获取卡库存-卡库存查询
  apiCardsStocks: params => {
    return API.POST('boss/v1.0/cards/stocks', params)
  },
  // 导入
  apiCardInfoDetail: params => {
    return API.POST('boss/v1.0/cards/stocks/import', params)
  },
  // 基础设置-蜂窝账号查询
  apiFwAccountList: params => {
    return API.POST('boss/v1.0/fw/accounts', params)
  },
  // 停用、启用
  apiCardStatusModify: params => {
    return API.POST('boss/v1.0/cards/status/modify', params)
  },
  // 导入卡
  apiCardsUploadAdd: (cardType, fwAccount, stockType, params) => {
    return API.POST(`boss/v1.0/cards/upload/add?cardType=${cardType}&fwAccount=${fwAccount}&stockType=${stockType}`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
}