export default {
  nav_menu_data: [
    {
      icon: 'el-icon-s-home',
      title: '首页',
      path: '/main'
    },
    {
      icon: 'el-icon-watch',
      title: '我的任务',
      path: '/tasks',
      type: 0
    },
    {
      icon: 'el-icon-postcard',
      title: '卡信息',
      path: '/cardInfo',
      type: 0
    },
    {
      icon: 'el-icon-bank-card',
      title: '卡库存',
      path: '/cardStock',
      type: 0
    },
    {
      icon: 'el-icon-shopping-cart-full',
      title: '订单',
      path: '/order',
      type: 0
    },
    {
      icon: 'el-icon-shopping-cart-full',
      title: '苏宁大流量卡',
      path: '/flowOrder',
      type: 0
    },
    {
      icon: 'el-icon-connection',
      title: '销售渠道',
      path: '/sale',
      type: 0,
      children: [
        {
          icon: 'el-icon-s-help',
          title: '渠道管理',
          path: '/channelList',
          type: 0
        },
        {
          icon: 'el-icon-s-help',
          title: '库存分配',
          path: '/inventoryAllocation',
          type: 0
        },
        // {
        //   icon: 'el-icon-s-help',
        //   title: '渠道套餐/商品配置',
        //   path: '/channelPackageConfiguration'
        // },
        {
          icon: 'el-icon-s-help',
          title: '渠道商品配置',
          path: '/channelGoodsList',
          type: 0
        }
      ]
    },
    {
      icon: 'el-icon-data-line',
      title: '数据监控',
      path: '/dataMonitoring',
      type: 0,
      children: [
        {
          icon: 'el-icon-s-help',
          title: 'LBS记录',
          path: '/LBSRecordList',
          type: 0
        },
        {
          icon: 'el-icon-s-help',
          title: '黑名单配置',
          path: '/blacklistRecordList',
          type: 0
        },
        {
          icon: 'el-icon-s-help',
          title: '黑名单卡',
          path: '/blackCardList',
          type: 0
        }
      ]
    },
    {
      icon: 'el-icon-receiving',
      title: '设备管理',
      path: '/equipment',
      type: 0,
      usingInDevice: 1
    },
    {
      icon: 'el-icon-receiving',
      title: '基站列表管理',
      path: '/basestation',
      type: 0
    },
    {
      icon: 'el-icon-s-operation',
      title: '推送配置',
      path: '/amountUsed',
      type: 0,
      children: [
        {
          icon: 'el-icon-s-help',
          title: '推送配置',
          path: '/pushList',
          type: 0
        },
        {
          icon: 'el-icon-s-help',
          title: '推送监控',
          path: '/pushMonitorList',
          type: 0
        }
      ]
    },
    {
      icon: 'el-icon-data-line',
      title: '账单/统计',
      path: '/StatisticsBill',
      type: 0,
      children: [
        {
          icon: 'el-icon-s-help',
          title: '支付记录',
          path: '/payrecords',
          type: 0
        },
        {
          icon: 'el-icon-s-help',
          title: '输入',
          path: '/billInput',
          type: 0
        },
        {
          icon: 'el-icon-s-help',
          title: '输出',
          path: '/billOutput',
          type: 0
        }
      ]
    },
    {
      icon: 'el-icon-school',
      title: '群控',
      path: '/groupControl',
      type: 1,
      all: true,
      children: [
        {
          icon: 'el-icon-s-help',
          title: '组织及人员管理',
          path: '/organizationAndPersonnellList',
          type: 1,
          all: true
        },
        {
          icon: 'el-icon-s-help',
          title: '策略管理',
          path: '/strategyList',
          type: 1,
          all: true
        }
      ]
    },
    {
      icon: "el-icon-setting",
      title: "基础设置",
      path: "/baseSet",
      type: 0,
      children: [
        {
          icon: "el-icon-orange",
          title: "产品",
          path: "/products",
          type: 0,
        },
        {
          icon: "el-icon-s-goods",
          title: "商品",
          path: "/goods",
          type: 0,
        },
        {
          icon: "el-icon-s-goods",
          title: "公众号接入",
          path: "/accesswechat",
          type: 0,
        },
        // {
        //   icon: "el-icon-s-goods",
        //   title: "套餐",
        //   path: "/package",
        // },
        {
          icon: "el-icon-s-goods",
          title: "套餐类型",
          path: "/packageType",
          type: 0,
        },
        {
          icon: "el-icon-s-goods",
          title: "套餐清零设置",
          path: "/clearSetting",
          type: 0,
        },
        {
          icon: "el-icon-orange",
          title: "蜂窝帐号",
          path: "/honeycomb",
          type: 0,
        },
        {
          icon: "el-icon-phone",
          title: "通信计划",
          path: "/signPlan",
          type: 0,
        },
        // {
        //   icon: "el-icon-phone",
        //   title: "资费计划",
        //   path: "/PaymentPlan",
        // }
      ]
    }
  ]
}
