import * as API from './'
export default {
    getCardOrders: params => {
        return API.POST('/bigflow/manage/v1.0/card/orders', params)
      },

    getAllChannels: params =>{
        return API.GET('/bigflow/manage/v1.0/channels', params)
    },
    getAllPackages: params =>{
        return API.GET('/bigflow/manage/v1.0/packages', params)
    }
    ,
    getAllPools: params =>{
        return API.GET('/bigflow/manage/v1.0/pools', params)
    },
    getCardInfos:params =>{
        return API.POST('/bigflow/manage/v1.0/card/infos', params)
    },
    getVoiceRecords:params =>{
        return API.POST('/bigflow/manage/v1.0/voice/records', params)
    },
    getFlowPools:params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools', params)
    },
    getFlowCardStock:params =>{
        return API.POST('/bigflow/manage/v1.0/cardstockpool', params)
    },
    getFlowPoolBills:params =>{
        return API.POST('/bigflow/manage/v1.0/flowpoolbills', params)
    },
    getCardChanges:params =>{
        return API.POST('/bigflow/manage/v1.0/cardchanges', params)
    },
    getBigflowStocks:params =>{
        return API.POST('/bigflow/manage/v1.0/bigflowcardstocks', params)
    },
    getAccessWechats:params =>{
        return API.POST('/bigflow/manage/v1.0/accessWechats', params)
    },
    getProducts:params =>{
        return API.POST('/bigflow/manage/v1.0/bigflowproducts', params)
    },
    getAllSysFunctions: params =>{
        return API.GET('/bigflow/manage/v1.0/system/functions', params)
    },
    getAllSysRoles: params =>{
        return API.GET('/bigflow/manage/v1.0/system/roles', params)
    },
    getAllSysRoleFunctions: params =>{
        return API.GET('/bigflow/manage/v1.0/system/roleFunctions', params)
    },
    getAllSysManagerRoles: params =>{
        return API.GET('/bigflow/manage/v1.0/system/managerRoles', params)
    },
    getAllSysManagers: params =>{
        return API.GET('/bigflow/manage/v1.0/system/managers', params)
    },
    changeCardStatus: params =>{
        return API.POST('/bigflow/manage/v1.0/card/changeCardStatus', params)
    },
    unbindCard: params =>{
        return API.POST('/bigflow/manage/v1.0/card/untying', params)
    },
    dosClear: params =>{
        return API.POST('/bigflow/manage/v1.0/card/dosClear', params)
    },
    dosChange: params =>{
        return API.POST('/bigflow/manage/v1.0/card/dosChange', params)
    }
}