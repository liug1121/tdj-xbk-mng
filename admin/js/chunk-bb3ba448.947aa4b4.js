(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb3ba448"],{"365c":function(e,a,t){"use strict";t.d(a,"b",(function(){return r})),t.d(a,"a",(function(){return o}));t("d3b7");var n=t("bc3a"),l=t.n(n);l.a.defaults.timeout=5e5,l.a.defaults.headers.post["Content-Type"]="application/json",l.a.interceptors.request.use((function(e){return e.headers.token=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),l.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var r=function(e,a){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.a.post(e,a,t).then((function(e){return e.data}))},o=function(e,a){return l.a.get(e,{params:a}).then((function(e){return e.data}))}},"5f02":function(e,a,t){"use strict";t("99af");var n=t("365c");a["a"]={getCardOrders:function(e){return n["b"]("/bigflow/manage/v1.0/card/orders",e)},getAllChannels:function(e){return n["a"]("/bigflow/manage/v1.0/channels",e)},getAllPackages:function(e){return n["a"]("/bigflow/manage/v1.0/packages",e)},getAllPools:function(e){return n["a"]("/bigflow/manage/v1.0/pools",e)},getAllServiceInfo:function(e){return n["a"]("/bigflow/manage/v1.0/serviceinfos",e)},getCardInfos:function(e){return n["b"]("/bigflow/manage/v1.0/card/infos",e)},getVoiceRecords:function(e){return n["b"]("/bigflow/manage/v1.0/voice/records",e)},getFlowPools:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools",e)},getFlowCardStock:function(e){return n["b"]("/bigflow/manage/v1.0/cardstockpool",e)},getFlowPoolBills:function(e){return n["b"]("/bigflow/manage/v1.0/flowpoolbills",e)},getCardChanges:function(e){return n["b"]("/bigflow/manage/v1.0/cardchanges",e)},getBigflowStocks:function(e){return n["b"]("/bigflow/manage/v1.0/bigflowcardstocks",e)},getAccessWechats:function(e){return n["b"]("/bigflow/manage/v1.0/accessWechats",e)},getProducts:function(e){return n["b"]("/bigflow/manage/v1.0/bigflowproducts",e)},getAllSysFunctions:function(e){return n["a"]("/bigflow/manage/v1.0/system/functions",e)},getAllSysRoles:function(e){return n["a"]("/bigflow/manage/v1.0/system/roles",e)},getAllSysRoleFunctions:function(e){return n["a"]("/bigflow/manage/v1.0/system/roleFunctions",e)},getAllSysManagerRoles:function(e){return n["a"]("/bigflow/manage/v1.0/system/managerRoles",e)},getAllSysManagers:function(e){return n["a"]("/bigflow/manage/v1.0/system/managers",e)},changeCardStatus:function(e){return n["b"]("/bigflow/manage/v1.0/card/changeCardStatus",e)},unbindCard:function(e){return n["b"]("/bigflow/manage/v1.0/card/untying",e)},dosClear:function(e){return n["b"]("/bigflow/manage/v1.0/card/dosClear",e)},dosChange:function(e){return n["b"]("/bigflow/manage/v1.0/card/dosChange",e)},getProduct2Change:function(e){return n["b"]("/bigflow/manage/v1.0/card/product2change",e)},changeProduct:function(e){return n["b"]("/bigflow/manage/v1.0/card/updateProduct",e)},getComunPlanTypes2Change:function(e){return n["b"]("/bigflow/manage/v1.0/card/communPlanTypes",e)},changeCommunPlanType:function(e){return n["b"]("/bigflow/manage/v1.0/card/communPlan",e)},expiredateextend:function(e){return n["b"]("/bigflow/manage/v1.0/card/expiredateextend",e)},batchExpiredateExtend:function(e){return n["b"]("/bigflow/manage/v1.0/card/expiredate/batchextend",e)},getPdCodes:function(e){return n["a"]("/bigflow/manage/v1.0/flowpools/pdcode",e)},addFlowPool:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools/add",e)},addFlowPoolOrder:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools/order",e)},updateFlowPoolUse:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools/updateuse",e)},movePool:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools/move",e)},movePoolIccidsBetween:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools/move/iccidbetween",e)},stock2Channel:function(e){return n["b"]("/bigflow/manage/v1.0/bigflowcardstocks/tochannel",e)},getAllProduct2Change:function(e){return n["b"]("/bigflow/manage/v1.0/order/products2change",e)},moveOrderByIccidsBetween:function(e){return n["b"]("/bigflow/manage/v1.0/order/move/iccidbetween",e)},uploadFile:function(e){return n["b"]("/bigflow/manage/v1.0/order/file/upload",e,{headers:{"content-type":"multipart/form-data"}})},file2ExpiredateExtend:function(e,a,t){return n["b"]("/bigflow/manage/v1.0/card/expiredate/file2Extend?extendTime=".concat(t,"&reason=").concat(a),e,{headers:{"content-type":"multipart/form-data"}})},importOrder2Channel:function(e){return n["b"]("/bigflow/manage/v1.0/order/channel/import",e)},importPoolCards:function(e){return n["b"]("/bigflow/manage/v1.0/flowpools/card/import",e)},importStockCards:function(e){return n["b"]("/bigflow/manage/v1.0/stock/card/import",e)},moveStockCards:function(e){return n["b"]("/bigflow/manage/v1.0/stock/card/move",e)},moveStockCards2Channel:function(e){return n["b"]("/bigflow/manage/v1.0/stock/card/channel/move",e)},file2CardUsageCheck:function(e){return n["b"]("/bigflow/manage/v1.0/card/useage/check/file",e,{headers:{"content-type":"multipart/form-data"}})},file2OrdersDelete:function(e){return n["b"]("/bigflow/manage/v1.0/order/file/delete",e,{headers:{"content-type":"multipart/form-data"}})}}},"607e":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("div",{staticClass:"box_subject"},[t("el-card",{staticClass:"all_list"},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"支付订单号"}},[t("el-input",{staticClass:"queryFormInput",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入支付订单号"},model:{value:e.payOutId,callback:function(a){e.payOutId=a},expression:"payOutId"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"卡号码"}},[t("el-input",{staticClass:"queryFormInput",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入卡号码"},model:{value:e.phoneNumber,callback:function(a){e.phoneNumber=a},expression:"phoneNumber"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"ICCID"}},[t("el-input",{staticClass:"queryFormInput",staticStyle:{width:"150px"},attrs:{clearable:"",placeholder:"请输入iccid"},model:{value:e.iccid,callback:function(a){e.iccid=a},expression:"iccid"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"卡状态"}},[t("el-select",{staticClass:"queryFormInput",attrs:{clearable:"",placeholder:"请选择卡状态"},model:{value:e.cardStatus,callback:function(a){e.cardStatus=a},expression:"cardStatus"}},e._l(e.statusOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"渠道"}},[t("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请选择渠道"},model:{value:e.saleChannel,callback:function(a){e.saleChannel=a},expression:"saleChannel"}},e._l(e.channels,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"消费类型"}},[t("el-select",{staticClass:"queryFormInput",attrs:{clearable:"",placeholder:"请选择消费类型"},model:{value:e.typeName,callback:function(a){e.typeName=a},expression:"typeName"}},e._l(e.typeNames,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"充值时间"}},[t("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"开始日期","value-format":"yyyy-MM-dd"},on:{change:e.startTimeChange},model:{value:e.changeStartDateTime,callback:function(a){e.changeStartDateTime=a},expression:"changeStartDateTime"}}),t("span",{staticClass:"time-line"},[e._v("-")]),t("el-date-picker",{staticStyle:{width:"140px"},attrs:{type:"date",placeholder:"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.endTimeChange},model:{value:e.changeEndDateTime,callback:function(a){e.changeEndDateTime=a},expression:"changeEndDateTime"}}),t("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-search"},on:{click:e.queryCardChanges}},[e._v("查询")])],1)],1),t("div",{staticClass:"button_content"},[t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"bigflowCardChange-export"},expression:"{indentity:'bigflowCardChange-export'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-download",disabled:""}},[e._v("导出")])],1),t("div",{staticClass:"cardNos"},[t("div",{staticClass:"cardNosList"}),t("div",{staticClass:"cardNosNumber"},[e._v("选中"),t("span",{staticClass:"red"},[e._v("0")]),e._v("条数据")])]),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.cardChanges,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.table_column,(function(a,n){return t("el-table-column",{key:n,attrs:{prop:a.prop,label:a.label,width:a.width,align:"center",fixed:!!a.fixed&&a.fixed,sortable:a.sortable},scopedSlots:e._u([{key:"default",fn:function(n){return[t("div",{domProps:{innerHTML:e._s(n.row[a.prop])}})]}}],null,!0)})}))],2),t("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[10,20,30],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},l=[],r=t("5f02"),o={components:{},data:function(){return{loading:!1,channels:[],payOutId:"",phoneNumber:"",iccid:"",cardStatus:"",saleChannel:"",typeName:"",changeStartDateTime:"",changeEndDateTime:"",statusOptions:[{label:"支付成功",value:1},{label:"已退款",value:2}],typeNames:[{label:"套餐购买",value:"package_purchase"},{label:"增值包",value:"value_added_package"},{label:"语音包购买",value:"voice_added_package"},{label:"短信包购买",value:"sms_added_package"},{label:"流量包购买",value:"flow_added_package"},{label:"余额充值",value:"balance_recharge"},{label:"套餐变更",value:"package_update"},{label:"流量超限扣费",value:"FLOW_OVERRUN_DEDUCTIONS"},{label:"短信超限扣费",value:"SMS_OVERRUN_DEDUCTIONS"},{label:"语音超限扣费",value:"VOICE_OVERRUN_DEDUCTIONS"},{label:"返还超限扣费",value:"RETURN_FLOW_OVERRUN_DEDUCTIONS"},{label:"返还短信超限扣费",value:"RETURN_SMS_OVERRUN_DEDUCTIONS"},{label:"冻结金额扣费记账",value:"FREEZE_DEDUCT"},{label:"卡扣费记账",value:"CARD_ACTIVED_DEDUCT"}],cardChanges:[],page:1,pageSize:10,total:0,table_column:[{prop:"id",label:"流水ID",width:200,fixed:"left",sortable:!0},{prop:"typeName",label:"消费类型",width:190,fixed:"left",sortable:!0},{prop:"amount",label:"消费金额",width:200,sortable:!0},{prop:"productCodeName",label:"产品",width:150,sortable:!0},{prop:"phoneNumber",label:"卡号码",width:300,sortable:!0},{prop:"iccid",label:"ICCID",width:200,sortable:!0},{prop:"cardTypeName",label:"卡类型",width:180,sortable:!0},{prop:"statusName",label:"状态",width:180,sortable:!0},{prop:"payOutId",label:"支付订单号",width:180,sortable:!0},{prop:"saleChannelName",label:"渠道",width:180,sortable:!0},{prop:"salePoint",label:"销售网点",width:180,sortable:!0},{prop:"salePersonName",label:"销售员",width:180,sortable:!0},{prop:"payOrderId",label:"订单编号",width:180,sortable:!0},{prop:"supplierName",label:"运营商",width:180,sortable:!0},{prop:"chargeSceneName",label:"首充/续充",width:180,sortable:!0},{prop:"gmtCharge",label:"销售时间",width:180,sortable:!0}]}},mounted:function(){},created:function(){this.getAllChannels(),this.queryCardChanges()},watch:{},methods:{startTimeChange:function(){this.changeStartDateTime="".concat(this.changeStartDateTime)},endTimeChange:function(){this.changeEndDateTime="".concat(this.changeEndDateTime)},getAllChannels:function(){var e=this,a={};r["a"].getAllChannels(a).then((function(a){0==a.resultCode&&(e.channels=a.data,e.total=a.rowNum)}))},handleSelectBranchCom:function(e){},queryCardChanges:function(){var e=this;this.loading=!0;var a={};a.page=this.page,""!=this.payOutId&&(a.payOutId=this.payOutId),""!=this.phoneNumber&&(a.phoneNumber=this.phoneNumber),""!=this.iccid&&(a.iccid=this.iccid),""!=this.cardStatus&&(a.status=this.cardStatus),""!=this.saleChannel&&(a.saleChannel=this.saleChannel),""!=this.typeName&&(a.type=this.typeName),""!=this.changeStartDateTime&&(a.gmtChargeStart=this.changeStartDateTime),""!=this.changeEndDateTime&&(a.gmtChargeEnd=this.changeEndDateTime),r["a"].getCardChanges(a).then((function(a){0==a.resultCode&&(e.cardChanges=a.data,e.total=a.rowNum,e.loading=!1)}))},handleSelectionChange:function(e){},handleSizeChange:function(e){this.page=e,this.queryCardChanges()},handleCurrentChange:function(e){this.page=e,this.queryCardChanges()}}},i=o,s=t("2877"),c=Object(s["a"])(i,n,l,!1,null,"971c8038",null);a["default"]=c.exports}}]);
//# sourceMappingURL=chunk-bb3ba448.947aa4b4.js.map