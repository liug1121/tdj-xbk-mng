import * as API from './'
// 基础设置
export default {
  // 基础设置-流量清零方式查询
  apiCleartypesList: params => {
    return API.POST('boss/v1.0/cleartypes', params)
  },
  // 基础设置-流量清零方式新增
  apiCleartypesAdd: params => {
    return API.POST('boss/v1.0/cleartypes/add', params)
  },
  // 基础设置-蜂窝账号新增
  apiFwAccountAdd: params => {
    return API.POST('boss/v1.0/fw/account/add', params)
  },
  // 基础设置-蜂窝账号修改
  apiFwAccountModify: params => {
    return API.POST('boss/v1.0/fw/account/modify', params)
  },
  // 基础设置-蜂窝账号状态修改
  apiFwAccountStatus: params => {
    return API.POST('boss/v1.0/fw/account/status', params)
  },
  // 基础设置-蜂窝账号查询
  apiFwAccountList: params => {
    return API.POST('boss/v1.0/fw/accounts', params)
  },
  // 套餐查询
  apiPackagesList: params => {
    return API.POST('boss/v1.0/packages', params)
  },
  // 基础设置-套餐新增
  apiPackagesAdd: params => {
    return API.POST('boss/v1.0/packages/add', params)
  },
  // 基础设置-套餐修改
  apiPackagesModify: params => {
    return API.POST('boss/v1.0/packages/modify', params)
  },
  // 基础设置-套餐停用
  apiPackagesStop: params => {
    return API.POST('boss/v1.0/packages/stop', params)
  },
  // 基础设置-套餐类型新增
  apiPackagesTypesAdd: (params) => {
    return API.POST('boss/v1.0/packagetypes/add', params)
  },
  // 基础设置-套餐类型查询
  apiProductsTypes: params => {
    return API.POST('boss/v1.0/pruducttypes', params)
  },
  // 基础设置-资费计划计划查询
  apiPayplansList: params => {
    return API.POST('boss/v1.0/payplans', params)
  },
  // 基础设置-新增资费计划计划
  apiPayplansAdd: params => {
    return API.POST('boss/v1.0/payplans/add', params)
  },
  // 基础设置-资费计划导入
  apiPayplansImport: params => {
    return API.POST('boss/v1.0/payplans/import', params)
  },
  // 基础设置-通讯计划查询
  apiPlansList: params => {
    return API.POST('boss/v1.0/plans', params)
  },
  // 基础设置-通讯计划新增
  apiPlansAdd: params => {
    return API.POST('boss/v1.0/plans/add', params)
  },
  // 基础设置-通讯计划编辑
  apiPlansModify: params => {
    return API.POST('boss/v1.0/plans/modify', params)
  },
  // 基础设置-通讯计划导入
  apiPlansImport: (params, fwAccount) => {
    const account = fwAccount
    return API.POST(`boss/v1.0/plans/import?fwAccount=${account}`, params, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    })
  },
  // 产品
  apiProductsList: params => {
    return API.POST('boss/v1.0/products', params)
  },
  // 产品新增
  apiProductsAdd: params => {
    return API.POST('boss/v1.0/products/add', params)
  },
  // 归属地boss/v1.0/provinces
  apiProvincesList: params => {
    return API.GET('boss/v1.0/provinces', params)
  },
  // 商品查询
  apiGoodsList: params => {
    return API.POST('boss/v1.0/goods', params)
  },

  // 商品新增
  apiGoodsAdd: params => {
    return API.POST('boss/v1.0/goods/add', params)
  },
  // 新增卡费套餐
  apiPackageCardfeeAdd: params => {
    return API.POST('boss/v1.0/package/cardfee/add', params)
  },
  // 新增充值套餐
  apiPackagePayfeeAdd: params => {
    return API.POST('boss/v1.0/package/payfee/add', params)
  },
  // 商品编辑
  apiGoodsModify: params => {
    return API.POST('boss/v1.0/goods/modify', params)
  },

  // 商品修改状态
  apiGoodsStatusModify: params => {
    return API.POST('boss/v1.0/goods/status/modify', params)
  },
}