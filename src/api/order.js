import * as API from './'

export default {
  // 获取订单列表
  apiProvincesList: params => {
    return API.POST('boss/v1.0/orders', params)
  },
  // 开卡
  apiOrderOpenCard: params => {
    return API.POST('boss/v1.0/order/opencard', params)
  },
  // 发货boss/v1.0/order/sendcard
  apiOrderSendCard: params => {
    return API.POST('boss/v1.0/order/sendcard', params)
  },
  // 套餐查询
  // apiPackagesList: params => {
  //   return API.POST('boss/v1.0/packages', params)
  // },
  // 商品套餐
  apichannelsPackagesList: params => {
    return API.POST('boss/v1.0/channels/packages', params)
  },
  // 商品查询
  apiGoodsList: params => {
    return API.POST('boss/v1.0/goods', params)
  },
  // 预开户
  apiPlansImport: (param, channelIdN, commentN, contactN, goodIdN, priceN) => {
    const channelId = channelIdN
    const comment = commentN
    const contact = contactN
    const goodId = goodIdN
    const price = priceN
    return API.POST(`boss/v1.0/orders/preorder/import?channelId=${channelId}&comment=${comment}&contact=${contact}&goodId=${goodId}&price=${price}`, param, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
}