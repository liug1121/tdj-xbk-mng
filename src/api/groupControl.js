import * as API from './'
// 基础设置
export default {
  // 获取群控tree
  apiTreeList: params => {
    return API.GET('groupControl/v1.0/groupcontrol/manage/school/groupcontrolinfos', params)
  },
  // 根据手机号查询学校管理员
  apiGroupcontrolManagerPhone: params => {
    return API.POST('groupControl/v1.0/groupcontrol/managers/manager', params)
  },
  // 获取受控组管理员信息
  apiGroupcontrolList: params => {
    const groupId = params
    return API.GET(`groupControl/v1.0/groupcontrol/manage/groupmamnagers/${groupId}`, params)
  },
  // 新增受控组
  apiGroupcontrolAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/add', params)
  },
  // 获取组织管理员信息
  apiSchoolmamnagersList: params => {
    const organizationId = params
    return API.GET(`groupControl/v1.0/groupcontrol/manage/schoolmamnagers/${organizationId}`, params)
  },
  // 新增组织
  apiOrganizationAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/organization/add', params)
  },
  // 获取组织学生信息
  apiOrganizationStudentsList: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/organization/students', params)
  },
  // 删除管理员
  apiGroupcontrolManagerDel: params => {
    const managerId = params
    return API.GET(`groupControl/v1.0/groupcontrol/manage/manager/delete/${managerId}`, params)
  },
  // 修改管理员信息
  apiManagerModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/manager/modify', params)
  },
  // 修改管理员状态
  apiManagerStatusModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/manager/status/modify', params)
  },
  // 修改受控组状态 有效/失效
  apiGroupcontrolManageStatusModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/status/modify', params)
  },
  // 获取群控组学生信息
  apiGroupcontrolStudentsList: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/students', params)
  },
  // 设置学生 受控不受控 状态
  apiGroupcontrolStudentStatusModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/student/status/modify', params)
  },
  // 批量设置学生 受控不受控 状态
  apiGroupcontrolStudentStatusBatchmodify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/student/status/batchmodify', params)
  },

  // 获取学校全部策略
  apiGroupcontrolManageStrategys: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/strategys', params)
  },
  // 新增
  apiGroupcontrolManageStrategyAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/stragegy/add', params)
  },
  // 修改策略信息
  apiGroupcontrolManageStrategyModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/stragegys/modify', params)
  },
  // 修改策略明细
  apiGroupcontrolManageStrategyDetailModify: params => {
    return API.POST('groupControl/v1.0/groupcontrol/manage/stragegy/detail/modify', params)
  },
  // 删除策略
  apiGroupcontrolStrategyDel: params => {
    const stragegyId = params
    return API.GET(`groupControl/v1.0/groupcontrol/manage/strategy/delete/${stragegyId}`, params)
  },
  // 删除策略明细
  apiGroupcontrolStrategyDetailDel: params => {
    const stragegyDetailId = params
    return API.GET(`groupControl/v1.0/groupcontrol/manage/strategy/detail/delete/${stragegyDetailId}`, params)
  },
  // 群控-获取群控组策略
  apiGroupcontrolManageStrategy: params => {
    const groupId = params
    return API.GET(`groupControl/v1.0/groupcontrol/manage/strategy/${groupId}`, params)
  },
  // 新增群控组策略
  apiControlgroupsStragegyAdd: params => {
    return API.POST('groupControl/v1.0/groupcontrol/managers/controlgroups/stragegy/add', params)
  },
  // 删除群控组策略
  apiControlgroupsStragegyDel: params => {
    return API.POST('groupControl/v1.0/groupcontrol/managers/controlgroups/stragegy/delete', params)
  },
}