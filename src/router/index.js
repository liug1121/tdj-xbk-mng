import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home.vue"
const routerPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/test',
      component: (resolve) => require(['components/groupControl/strategy/test.vue'], resolve)
    },
    { path: '/home', component: Home },
    {
      path: '/login',
      name: 'login',
      component: (resolve) => require(['components/login.vue'], resolve),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/index',
      name: 'index',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '学霸卡后台'
      },
      children: [
        {
          path: '/tasks',
          name: '我的任务',
          component: (resolve) => require(['components/tasks/tasksList.vue'], resolve),
          meta: {
            title: '我的任务'
          }
        },
        {
          path: '/main',
          name: '首页',
          component: (resolve) => require(['components/indexNew.vue'], resolve),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/cardInfo',
          name: '卡信息',
          component: (resolve) => require(['components/cardInfo/cardInfo.vue'], resolve),
          meta: {
            title: '卡信息'
          }
        },
        {
          path: '/cardDetail',
          name: '卡详情',
          component: (resolve) => require(['components/cardInfo/cardDetail.vue'], resolve),
          meta: {
            title: '卡详情'
          }
        },
        {
          path: '/cardStock',
          name: '卡库存',
          component: (resolve) => require(['components/cardStock/cardStock.vue'], resolve),
          meta: {
            title: '卡库存'
          }
        },
        {
          path: '/order',
          name: '订单',
          component: (resolve) => require(['components/order/order.vue'], resolve),
          meta: {
            title: '订单'
          }
        },
        {
          path: '/flowOrder',
          name: '苏宁大流量卡',
          component: (resolve) => require(['components/flowOrder/flowOrder.vue'], resolve),
          meta: {
            title: '苏宁大流量卡'
          }
        },
        {
          path: '/equipment',
          name: '设备管理',
          component: (resolve) => require(['components/equipment/equipmentList.vue'], resolve),
          meta: {
            title: '设备管理'
          }
        },
        {
          path: '/basestation',
          name: '基站列表管理',
          component: (resolve) => require(['components/equipment/basestation.vue'], resolve),
          meta: {
            title: '基站列表管理'
          }
        }
      ]
    },
    {
      path: '/sale',
      name: '销售渠道',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '销售渠道'
      },
      children: [
        {
          path: '/channelList',
          name: '渠道管理',
          component: (resolve) => require(['components/sale/channelList/channelList.vue'], resolve),
          meta: { title: '渠道管理' },
        },
        {
          path: '/channelDetail',
          name: '渠道管理详情',
          component: (resolve) => require(['components/sale/channelList/channelDetail.vue'], resolve),
          meta: { title: '渠道管理详情' },
        },
        {
          path: '/inventoryAllocation',
          name: '库存分配',
          component: (resolve) => require(['components/sale/inventoryAllocation/inventoryAllocation.vue'], resolve),
          meta: { title: '库存分配' },
        },
        // {
        //   path: '/channelPackageConfiguration',
        //   name: '渠道套餐/商品配置',
        //   component: (resolve) => require(['components/sale/channelPackageConfiguration/channelPackageConfiguration.vue'], resolve),
        //   meta: { title: '渠道套餐/商品配置' },
        // },
        {
          path: '/channelGoodsList',
          name: '渠道套餐/商品配置',
          component: (resolve) => require(['components/sale/channelGoods/channelGoodsList.vue'], resolve),
          meta: { title: '渠道套餐/商品配置' },
        }
      ]
    },
    {
      path: '/dataMonitoring',
      name: '数据监控',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '数据监控'
      },
      children: [
        {
          path: '/LBSRecordList',
          name: 'LBS记录',
          component: (resolve) => require(['components/dataMonitoring/LBSRecord/LBSRecordList.vue'], resolve),
          meta: { title: 'LBS记录' },
        },
        {
          path: '/blacklistRecordList',
          name: '黑名单配置',
          component: (resolve) => require(['components/dataMonitoring/blacklistRecord/blacklistRecordList.vue'], resolve),
          meta: { title: '黑名单配置' },
        },
        {
          path: '/blackCardList',
          name: '黑名单卡',
          component: (resolve) => require(['components/dataMonitoring/blackCard/blackCardList.vue'], resolve),
          meta: { title: '黑名单卡' },
        },
        {
          path: '/blackGroupDetails',
          name: '黑名单卡组明细',
          component: (resolve) => require(['components/dataMonitoring/blackCard/blackGroupDetails.vue'], resolve),
          meta: { title: '黑名单卡组明细' },
        },
        {
          path: '/blackCardDetails',
          name: '黑名单卡明细',
          component: (resolve) => require(['components/dataMonitoring/blackCard/blackCardDetails.vue'], resolve),
          meta: { title: '黑名单卡明细' },
        }
      ]
    },
    {
      path: '/amountUsed',
      name: '推送配置',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '推送配置'
      },
      children: [
        {
          path: '/pushList',
          name: '用量推送',
          component: (resolve) => require(['components/amountUsed/pushList.vue'], resolve),
          meta: { title: '用量推送' },
        },
        {
          path: '/pushMonitorList',
          name: '推送监控',
          component: (resolve) => require(['components/amountUsed/pushMonitorList.vue'], resolve),
          meta: { title: '推送监控' },
        }
      ]
    },
    {
      path: '/groupControl',
      name: '群控',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '群控'
      },
      children: [
        {
          path: '/organizationAndPersonnellList',
          name: '组织架构及人员管理',
          component: (resolve) => require(['components/groupControl/organizationAndPersonnel/organizationAndPersonnellList.vue'], resolve),
          meta: { title: '组织架构及人员管理' },
        },
        {
          path: '/strategyList',
          name: '策略管理',
          component: (resolve) => require(['components/groupControl/strategy/strategyList.vue'], resolve),
          meta: { title: '策略管理' },
        }
      ]
    },
    {
      path: '/StatisticsBill',
      name: '账单/统计',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '账单/统计'
      },
      children: [
        {
          path: '/payrecords',
          name: '支付记录',
          component: (resolve) => require(['components/StatisticsBill/payrecords.vue'], resolve),
          meta: { title: '支付记录' },
        },
        {
          path: '/payrecordDetail',
          name: '退款审核详情',
          component: (resolve) => require(['components/StatisticsBill/payrecordDetail.vue'], resolve),
          meta: { title: '退款审核详情' },
        },
        {
          path: '/billInput',
          name: '输入',
          component: (resolve) => require(['components/StatisticsBill/billInput.vue'], resolve),
          meta: { title: '输入' },
        },
        {
          path: '/billOutput',
          name: '输出',
          component: (resolve) => require(['components/StatisticsBill/billOutput.vue'], resolve),
          meta: { title: '输出' },
        }
      ]
    },
    {
      path: '/baseSet',
      name: '基础设置',
      component: (resolve) => require(['components/index.vue'], resolve),
      meta: {
        title: '基础设置'
      },
      children: [
        {
          path: '/products',
          name: '产品',
          component: (resolve) => require(['components/baseSet/products/products.vue'], resolve),
          meta: { title: '产品' },
        },
        {
          path: '/goods',
          name: '商品',
          component: (resolve) => require(['components/baseSet/goods/goods.vue'], resolve),
          meta: { title: '商品' },
        },
        // {
        //   path: '/package',
        //   name: '套餐',
        //   component: (resolve) => require(['components/baseSet/package/package.vue'], resolve),
        //   meta: { title: '套餐' },
        // },
        {
          path: '/accesswechat',
          name: '公众号接入',
          component: (resolve) => require(['components/baseSet/accesswechat/accesswechatList.vue'], resolve),
          meta: { title: '公众号接入' },
        },
        {
          path: '/packageType',
          name: '套餐类型',
          component: (resolve) => require(['components/baseSet/packageType/packageType.vue'], resolve),
          meta: { title: '套餐类型' },
        },
        {
          path: '/clearSetting',
          name: '套餐清零设置',
          component: (resolve) => require(['components/baseSet/clearSetting/clearSetting.vue'], resolve),
          meta: { title: '套餐清零设置' },
        },
        {
          path: '/honeycomb',
          name: '蜂窝帐号',
          component: (resolve) => require(['components/baseSet/honeycomb/honeycomb.vue'], resolve),
          meta: { title: '蜂窝帐号' },
        },
        {
          path: '/signPlan',
          name: '通信计划',
          component: (resolve) => require(['components/baseSet/signPlan/signPlan.vue'], resolve),
          meta: { title: '通信计划' },
        },
        {
          path: '/PaymentPlan',
          name: '资费计划',
          component: (resolve) => require(['components/baseSet/PaymentPlan/PaymentPlan.vue'], resolve),
          meta: { title: '资费计划' },
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转而来
  // next 是一个函数，表示放行
  //     next()  放行    next('/login')  强制跳转\
  if (to.path === '/login' || to.path === '/') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
