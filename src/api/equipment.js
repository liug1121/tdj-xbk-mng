import * as API from './'

export default {
  // 基站列表
  apiBasestationList: params => {
    return API.GET('device/v1.0/device/basestation/all', params)
  },
  // 获取列表
  apiDevicesList: params => {
    return API.POST('device/v1.0/devices', params)
  },
  // 修改设备锁定状态
  apiDeviceStatusModify: params => {
    return API.POST('device/v1.0/device/status/modify', params)
  },
  // 修改设备
  apiDeviceModify: params => {
    return API.POST('device/v1.0/modify', params)
  },
  //  设备管理-根据设备查询基站信息
  apiDeviceBasestations: params => {
    return API.POST('device/v1.0/device/basestations', params)
  },
  //  设备管理-重启
  apiDeviceReboot: params => {
    return API.POST('device/v1.0/device/reboot', params)
  },
  //  设备管理-刷新
  apiDeviceRefresh: params => {
    return API.POST('device/v1.0/device/refresh', params)
  },
  // 渠道商品
  apichannelsPackagesList: params => {
    return API.POST('boss/v1.0/channels/packages', params)
  },
  // 获取设备渠道
  apiChannelDevice: params => {
    return API.GET('device/v1.0/channels/device', params)
  },
  // 刷新所有设备
  apiDeviceRefreshall: params => {
    return API.GET('device/v1.0/devices/refreshall', params)
  }
}