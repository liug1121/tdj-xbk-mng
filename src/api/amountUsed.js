import * as API from './'
// 基础设置
export default {
  // 新增渠道推送配置信息
  apiPushAdd: params => {
    return API.POST('boss/v1.0/push/add', params)
  },
  // 删除渠道推送配置信息
  apiPushDelete: params => {
    return API.POST('boss/v1.0/push/delete', params)
  },
  // 获取渠道推送配置信息
  apiPushInfo: params => {
    return API.POST('boss/v1.0/push/info', params)
  },
  // 修改渠道推送配置信息
  apiPushModify: params => {
    return API.POST('boss/v1.0/push/modify', params)
  },
  // 渠道推送配置信息 启用
  apiPushStart: params => {
    return API.POST('boss/v1.0/push/start', params)
  },
  // 渠道推送配置信息 停用
  apiPushStop: params => {
    return API.POST('boss/v1.0/push/stop', params)
  },
  // 获取渠道推送统计信息
  apiPushStatics: params => {
    return API.POST('boss/v1.0/push/statics', params)
  },
}