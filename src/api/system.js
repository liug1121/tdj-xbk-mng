import * as API from './'
export default {
    getAllSysFunctions: params =>{
        return API.GET('boss/v1.0/system/functions', params)
    },
    getAllSysRoles: params =>{
        return API.GET('boss/v1.0/system/roles', params)
    },
    getAllSysRoleFunctions: params =>{
        return API.GET('boss/v1.0/system/roleFunctions', params)
    },
    getSysManagerRoles: params =>{
        return API.POST('boss/v1.0/system/managerRoles', params)
    },
    getAllSysManagers: params =>{
        return API.POST('boss/v1.0/system/managers', params)
    },
    editManger: params =>{
        return API.POST('boss/v1.0/system/managers/edit', params)
    },
    editMangerRoles: params =>{
        return API.POST('boss/v1.0/system/managerRoles/edit', params)
    },
    getRoleFunctions: params =>{
        return API.POST('boss/v1.0/system/role/functions', params)
    },
    editRoleFunctions: params =>{
        return API.POST('boss/v1.0/system/role/functions/modify', params)
    },
    addRole: params =>{
        return API.POST('boss/v1.0/system/roles/add', params)
    },
    editRole: params =>{
        return API.POST('boss/v1.0/system/roles/modify', params)
    },
    removeRole: params =>{
        return API.POST('boss/v1.0/system/roles/remove', params)
    },
    addManager: params =>{
        return API.POST('boss/v1.0/system/managers/add', params)
    },
    getPushLogs: params =>{
        return API.POST('boss/v1.0/gateway/pushLogs', params)
    },
    getPushInfos: params =>{
        return API.POST('boss/v1.0/gateway/pushinfo/all', params)
    } ,
    addPushInfo: params =>{
        return API.POST('boss/v1.0/gateway/pushInfo/add', params)
    },
    modifyPushInfo: params =>{
        return API.POST('boss/v1.0/gateway/pushInfo/modify', params)
    },
    removePushInfo: params =>{
        return API.POST('boss/v1.0/gateway/pushInfo/remove', params)
    } ,
    getPushStaticsInfo: params =>{
        return API.POST('boss/v1.0/gateway/pushinfo/statics', params)
    } 

    
}