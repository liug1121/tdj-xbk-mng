import * as API from './'
// 渠道
export default {
  // 渠道列表
  apiChannelsList: params => {
    return API.POST('boss/v1.0/channels', params)
  },
  // 渠道新增
  apiChannelsAdd: params => {
    return API.POST('boss/v1.0/channels/add', params)
  },
  // 根据渠道id获取公众号二维码
  apiChannelsQrcode: params => {
    return API.POST('boss/v1.0/channels/qrcode', params)
  },
  // 获取所有渠道
  apiChannelsAllList: params => {
    return API.GET('boss/v1.0/channels/all', params)
  },
  // 渠道卡查询
  apiChannelsCards: params => {
    return API.POST('boss/v1.0/channels/cards', params)
  },
  // 渠道-渠道卡分配
  apiChannelsCardsDistribute: params => {
    return API.POST('boss/v1.0/channels/cards/distribute', params)
  },
  // 渠道-渠道卡分配-文件导入
  apiChannelsCardsDistributeFile: params => {
    return API.POST('boss/v1.0/channels/cards/distribute/fileimport', params)
  },
  // 1023 渠道-分配渠道
  apiChannelsCardsUpload: (channelId, params) => {
    return API.POST(`boss/v1.0/channels/cards/distribute/upload?channelId=${channelId}`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 按首尾分配渠道
  apiChannelsCardsDistributeIccid: params => {
    return API.POST('boss/v1.0/channels/cards/distribute/iccids', params)
  },
  // 接首尾条件导出
  apiChannelsCardDownload: (params) => {
    const channelId = params.channelId
    const iccidStart = params.iccidStart
    const iccidEnd = params.iccidEnd
    return API.GET(`/boss/v1.0/channels/card/download/${channelId}/${iccidStart}/${iccidEnd}`)
  },
  // 渠道-渠道详情查询
  apiChannelsDetails: params => {
    return API.POST('boss/v1.0/channels/details', params)
  },
  // 渠道-修改渠道
  apiChannelsModify: params => {
    return API.POST('boss/v1.0/channels/modify', params)
  },
  // 渠道-渠道套餐查询
  apiChannelsPackages: params => {
    return API.POST('boss/v1.0/channels/packages', params)
  },
  // 商品查询
  apiGoodsList: params => {
    return API.POST('boss/v1.0/goods', params)
  },
  // 渠道-新增渠道套餐
  apiChannelsPackagesAdd: params => {
    return API.POST('boss/v1.0/channels/packages/add', params)
  },
  // 渠道-修改渠道商品
  apiChannelsGoodsModify: params => {
    return API.POST('boss/v1.0/channels/goods/modify', params)
  },
  // 渠道-修改渠道套餐状态
  apiChannelsPackagesStatusModify: params => {
    return API.POST('boss/v1.0/channels/packages/status/modify', params)
  },
  // 渠道-修改渠道状态
  apiChannelsStatusModify: params => {
    return API.POST('boss/v1.0/channels/status/modify', params)
  },
  // 归属地boss/v1.0/provinces
  apiProvincesList: params => {
    return API.GET('boss/v1.0/provinces', params)
  },
  // 套餐查询
  apiPackagesList: params => {
    return API.POST('boss/v1.0/packages', params)
  }
}