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
    getAllServiceInfo: params =>{
        return API.GET('/bigflow/manage/v1.0/serviceinfos', params)
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
    batchExpiredateExtend: params =>{
        return API.POST('/bigflow/manage/v1.0/card/expiredate/batchextend', params)
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
    modifyFlowPoolStatus: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/status/modify', params)
    },
    removeFlowPool:params =>{
        return API.POST('/bigflow/manage/v1.0/pools/remove', params)
    },
    movePool: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/move', params)
    },
    movePoolIccidsBetween: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/move/iccidbetween', params)
    },
    stock2Channel: params =>{
        return API.POST('/bigflow/manage/v1.0/bigflowcardstocks/tochannel', params)
    },
    getAllProduct2Change: params =>{
        return API.POST('/bigflow/manage/v1.0/order/products2change', params)
    } ,
    moveOrderByIccidsBetween: params =>{
        return API.POST('/bigflow/manage/v1.0/order/move/iccidbetween', params)
    },
    uploadFile: (params) => {
      return API.POST('/bigflow/manage/v1.0/order/file/upload', params, {
        headers: {
          'content-type': 'multipart/form-data'
        }
      })
    },
    file2ExpiredateExtend: (params, reason, extendTime) => {
        return API.POST(`/bigflow/manage/v1.0/card/expiredate/file2Extend?extendTime=${extendTime}&reason=${reason}`, params, {
          headers: {
            'content-type': 'multipart/form-data'
          }
        })
      },
    importOrder2Channel: params =>{
        return API.POST('/bigflow/manage/v1.0/order/channel/import', params)
    },
    importPoolCards: params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/card/import', params)
    },
    importStockCards: params =>{
        return API.POST('/bigflow/manage/v1.0/stock/card/import', params)
    },
    moveStockCards: params =>{
        return API.POST('/bigflow/manage/v1.0/stock/card/move', params)
    },
    moveStockCards2Channel: params =>{
        return API.POST('/bigflow/manage/v1.0/stock/card/channel/move', params)
    },
    file2CardUsageCheck: (params) => {
        return API.POST('/bigflow/manage/v1.0/card/useage/check/file', params, {
            headers: {
            'content-type': 'multipart/form-data'
            }
        })
    },
    file2OrdersDelete: (params) => {
        return API.POST('/bigflow/manage/v1.0/order/file/delete', params, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
    } ,
    getSaleChannels: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/salechannels', params)
    }, 
    getSalePersons: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/salepersons', params)
    },
    addSaleChannel: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/add', params)
    },
    getChannelStocks: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/stocks', params)
    }
    
}