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
    }
}