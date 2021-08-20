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
    },
    getProduct2Change: params =>{
        return API.POST('/bigflow/manage/v1.0/card/product2change', params)
    },
    changeProduct: params =>{
        return API.POST('/bigflow/manage/v1.0/card/updateProduct', params)
    },
    getComunPlanTypes2Change: params =>{
        return API.POST('/bigflow/manage/v1.0/card/communPlanTypes', params)
    },
    changeCommunPlanType: params =>{
        return API.POST('/bigflow/manage/v1.0/card/communPlan', params)
    },
    expiredateextend: params =>{
        return API.POST('/bigflow/manage/v1.0/card/expiredateextend', params)
    },
    getPdCodes: params =>{
        return API.GET('/bigflow/manage/v1.0/flowpools/pdcode', params)
    },
    addFlowPool: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/add', params)
    },
    addFlowPoolOrder: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/order', params)
    },
    updateFlowPoolUse: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/updateuse', params)
    },
    movePool: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/move', params)
    },
    movePoolIccidsBetween: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/move/iccidbetween', params)
    },
    stock2Channel: params =>{
        return API.POST('/bigflow/manage/v1.0/bigflowcardstocks/tochannel', params)
    }

    

    

    
}