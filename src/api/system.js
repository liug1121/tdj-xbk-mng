import * as API from './'
export default {
    getAllSysFunctions: params =>{
        return API.GET('/boss/v1.0/system/functions', params)
    },
    getAllSysRoles: params =>{
        return API.GET('/boss/v1.0/system/roles', params)
    },
    getAllSysRoleFunctions: params =>{
        return API.GET('/boss/v1.0/system/roleFunctions', params)
    },
    getSysManagerRoles: params =>{
        return API.POST('/boss/v1.0/system/managerRoles', params)
    },
    getAllSysManagers: params =>{
        return API.GET('/boss/v1.0/system/managers', params)
    },
    editManger: params =>{
        return API.POST('/boss/v1.0/system/managers/edit', params)
    },
    editMangerRoles: params =>{
        return API.POST('/boss/v1.0/system/managerRoles/edit', params)
    }

    
    
}