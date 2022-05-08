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
    getFlowPoolsDetails:params =>{
        return API.POST('/bigflow/manage/v1.0/pools/static', params)
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
    addProducts:params =>{
        return API.POST('/bigflow/manage/v1.0/bigflowproducts/add', params)
    },
    modifyProducts:params =>{
        return API.POST('/bigflow/manage/v1.0/bigflowproducts/modify', params)
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
    fileExpiredateextend: (params, reason, extendTime) => {
        return API.POST(`/bigflow/manage/v1.0/card/file/expiredateextend?extendTime=${extendTime}&reason=${reason}`, params, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
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
    updateFlowPoolExpire:params =>{
        return API.POST('/bigflow/manage/v1.0/flowpools/expire/modify', params)
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
    getChannelProducts: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/products', params)
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
        return API.POST('/bigflow/manage/v1.0/flowpools/card/import', params, {
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
    },

    // file2OrdersDelete: (params) => {
    //     return API.POST('/bigflow/manage/v1.0/order/file/delete', params, {
    //         headers: {
    //           'content-type': 'multipart/form-data'
    //         }
    //       })
    // } ,


    importStockCards: params =>{
        return API.POST('/bigflow/manage/v1.0/stock/card/import', params,{
            headers: {
              'content-type': 'multipart/form-data'
            }
          })
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
    cardUsageCheck: params =>{
        return API.POST('/bigflow/manage/v1.0/card/useage/check', params)
    },
    file2CardUsageRefresh: (params) => {
        return API.POST('/bigflow/manage/v1.0/card/useage/refresh/file', params, {
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
    },
    distributeChannelCardsBetween: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/stocks/distrubute', params)
    },
    addSaleChannelManager: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/manager/add', params)
    },
    getFengwoConfigs: params =>{
        return API.POST('/bigflow/manage/v1.0/fengwo/accounts', params)
    },
    getFengwoConfigs: params =>{
        return API.POST('/bigflow/manage/v1.0/fengwo/accounts', params)
    },
    addFengwoConfigs: params =>{
        return API.POST('/bigflow/manage/v1.0/fengwo/add', params)
    },
    modifyFengwoConfigs: params =>{
        return API.POST('/bigflow/manage/v1.0/fengwo/modify', params)
    },
    removeFengwoConfigs: params =>{
        return API.POST('/bigflow/manage/v1.0/fengwo/remove', params)
    },
    addChannelProduct: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/products/add', params)
    },
    changeChannelProductStatus: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/products/status', params)
    },
    removeChannelProductStatus: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/products/remove', params)
    },
    
    getFengwoProvinces: params =>{
        return API.GET('/bigflow/manage/v1.0/fengwo/provinces', params)
    },
    getProductCodes: params =>{
        return API.GET('/bigflow/manage/v1.0/product/codes', params)
    },
    getChannelBillingFeeConfigs: params =>{
        return API.POST('boss/v1.0/card/billing/channel/configs', params)
    } ,
    addChannelBillingFeeConfig: params =>{
        return API.POST('boss/v1.0/card/billing/channel/config/add', params)
    },
    modifyChannelBillingFeeConfig: params =>{
        return API.POST('boss/v1.0/card/billing/channel/config/modify', params)
    }
    ,
    removeChannelBillingFeeConfig: params =>{
        return API.POST('boss/v1.0/card/billing/channel/config/remove', params)
    },
    getChannelCardStatics: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/statics', params)
    },
    getStopedCardNumForChannels: params =>{
        return API.GET('/bigflow/manage/v1.0/lbs/statics/channels', params)
    },
    getSharingPoolNumForChannels: params =>{
        return API.GET('/bigflow/manage/v1.0/sharingpool/statics/channels', params)
    },
    getImeiNumForChannels: params =>{
        return API.GET('/bigflow/manage/v1.0/imei/statics/channels', params)
    },
    getCardStatusNumForChannels: params =>{
        return API.POST('/bigflow/manage/v1.0/card/statics/channels', params)
    },
    getCardNumForChannels: params =>{
        return API.POST('/bigflow/manage/v1.0/card/cardNum/statics/channels', params)
    },
    getCardDataUsageForChannels: params =>{
        return API.POST('/bigflow/manage/v1.0/card/datausage/statics/channels', params)
    },
    modifyChannel: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/modify', params)
    },
    getChannelImeiConfig: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/imeiconfig', params)
    },
    removeChannelImeiConfig: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/imei/remove', params)
    },
    getImeiGroups: params =>{
        return API.GET('/bigflow/manage/v1.0/lbs/imei/groups', params)
    },
    getCardLbsStaticsForChannels: params =>{
        return API.POST('/bigflow/manage/v1.0/card/cardNum/lbs/statics/channels', params)
    },
    exportChannelStatics: params =>{
        return API.POST('/bigflow/manage/v1.0/channels/statics/export', params)
    },
    addSaleChannelMailConfig: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/mail/configs/add', params)
    },
    modifySaleChannelMailConfig: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/mail/configs/modify', params)
    },
    removeSaleChannelMailConfig: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/mail/configs/remove', params)
    },
    getSaleChannelMailConfig: params =>{
        return API.POST('/bigflow/manage/v1.0/salechannel/mail/configs', params)
    },
    getPoolMailConfigs: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/mails', params)
    }, 
    addPoolMail: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/alert/config/add', params)
    }, 
    getPoolAlertInfos: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/alert/configs', params)
    }, 
    removePoolAlertInfo: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/alert/config/remove', params)
    },
    modifyPoolAlertInfo: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/alert/config/modify', params)
    },
    modifyPledgeReturnStatus: params =>{
        return API.POST('/saler/v1.0/orders/pledge/return/modify', params)
    },
    testFengwoAccount: params =>{
        return API.POST('/bigflow/manage/v1.0/fengwoaccount/test', params)
    },
    removeManger: params =>{
        return API.POST('boss/v1.0/system/managers/remove', params)
    },
    modifyManger: params =>{
        return API.POST('boss/v1.0/system/managers/modify', params)
    },
    modifyPool: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/modify', params)
    },
    testSms: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/alert/configs/test/sms', params)
    },
    testMail: params =>{
        return API.POST('/bigflow/manage/v1.0/pools/alert/configs/test/mail', params)
    },
    getCardMonthUsageDetails: params =>{
        return API.POST('/bigflow/manage/v1.0/card/usage/month/detail', params)
    },
    addAmountPool: params =>{
        return API.POST('/bigflow/manage/v1.0/amountPool/add', params)
    },
    getAmountPools: params =>{
        return API.POST('/bigflow/manage/v1.0/amountPool/pools', params)
    },
    removeAmountPool: params =>{
        return API.POST('/bigflow/manage/v1.0/amountPool/remove', params)
    }
}