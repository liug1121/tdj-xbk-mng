import * as API from './'

export default {
  // 获取登录
  apiTasks: params => {
    return API.POST('boss/v1.0/tasks', params)
  },
  apiAlerts: params => {
    return API.POST('boss/v1.0/poolalertsys/infos', params)
  },
  apiAlertDo: params => {
    return API.POST('boss/v1.0/poolalertsys/status/modify', params)
  },
  apiSalecard: params => {
    return API.POST('salecard/cardusedreports?page=1&dataType=day&dateStart=2020-12-25&dateEnd=2020-12-25&reportType=channel', params)
  }
}