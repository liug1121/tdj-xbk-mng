import * as API from './'
// 基础设置
export default {
  // 省份boss/v1.0/provinces
  apiProvincesList: params => {
    return API.GET('boss/v1.0/provinces', params)
  },
  // 获取城市
  apiPoisCitiesList: params => {
    return API.POST('boss/v1.0/pois/cities', params)
  },
  // 获取区县
  apiPoisDistrictsList: params => {
    return API.POST('boss/v1.0/pois/districts', params)
  },
  // boss新增lbs黑名单
  apiLbsAdd: params => {
    return API.POST('boss/v1.0/lbs/add', params)
  },
  // boss查询lbs黑名单
  apiLbsBlacks: params => {
    return API.POST('boss/v1.0/lbs/blacks', params)
  },
  // lbs卡明细查询
  apiLbsDetails: params => {
    return API.POST('boss/v1.0/lbs/card/details', params)
  },
  // boss删除lbs黑名单
  apiLbsDelete: params => {
    return API.POST('boss/v1.0/lbs/delete', params)
  },
  apiLbsDeleteGroup: params =>{
    return API.POST('boss/v1.0/lbs/group/remove', params)
  },
  apiLbsGroupModify: params =>{
    return API.POST('boss/v1.0/lbs/group/modify', params)
  },
  // boss新增lbs组
  apiLbsGroupAdd: params => {
    return API.POST('boss/v1.0/lbs/group/add', params)
  },
  // boss lbs组卡明细查询
  apiLbsGroupCardDetails: params => {
    return API.POST('boss/v1.0/lbs/group/card/details', params)
  },
  // lbs组状态明细查询
  apiLbsGroupDetails: params => {
    return API.POST('boss/v1.0/lbs/group/details', params)
  },
  // boss lbs组状态修改
  apiLbsGroupStatusModify: params => {
    return API.POST('boss/v1.0/lbs/group/status/modify', params)
  },
  // boss查询lbs组
  apiLbsGroups: params => {
    return API.POST('boss/v1.0/lbs/groups', params)
  },
  // boss修改lbs黑名单
  apiLbsModify: params => {
    return API.POST('boss/v1.0/lbs/modify', params)
  },
  // boss修改lbs黑名单状态
  apiLbsStatusModify: params => {
    return API.POST('boss/v1.0/lbs/status/modify', params)
  },

  apiGroupCards:params =>{
    return API.POST('boss/v1.0/lbs/group/cards', params)
  },
  apiCardScanPools:params =>{
    return API.GET('boss/v1.0/card/scan/pool/all', params)
  },
  apiAddCardScanPool:params=>{
    return API.POST('boss/v1.0/card/scan/pool/add', params)
  },
  apiRemoveCardScanPool:params=>{
    return API.POST('boss/v1.0/card/scan/pool/delete', params)
  },
  apiCardScanPoolImeis:params=>{
    return API.POST('boss/v1.0/card/scan/pool/details', params)
  },
  apiRemoveCardScanPoolImei:params=>{
    return API.POST('boss/v1.0/card/scan/pool/details/delete', params)
  },
  apiImportPoolImeisUpload: (params, groupId) => {
    return API.POST(`boss/v1.0/card/scan/pool/detail/upload`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 黑名单卡明细导出
  apiLbsGroupCardDownload: (groupId, iccid) => {
    const groupId1 = groupId
    const iccid1 = iccid
    return API.GET(`boss/v1.0/lbs/group/card/download/${groupId1}/${iccid1}`)
  },
  apiLbsCardsUpload: (params, groupId) => {
    return API.POST(`boss/v1.0/lbs/card/import`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 导入黑名单卡
  apiLbsGroupCardUpload: (params) => {
    return API.POST(`boss/v1.0/lbs/group/card/upload`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // LBS导出
  apiLBSDownload: (params) => {
    const iccid = params.iccid
    const channelId = params.channelId
    const startTime = params.startTime
    const endTime = params.endTime
    const provinceId = params.provinceId
    const cityId = params.cityId
    const lbsStatus = params.lbsStatus
    return API.GET(`boss/v1.0/lbs/card/download?iccid=${iccid}&channelId=${channelId}&startTime=${startTime}&endTime=${endTime}&provinceId=${provinceId}&cityId=${cityId}&lbsStatus=${lbsStatus}`)
  }
}