(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-86ba8992"],{"365c":function(e,o,t){"use strict";t.d(o,"b",(function(){return n})),t.d(o,"a",(function(){return r}));t("d3b7");var l=t("bc3a"),a=t.n(l);a.a.defaults.timeout=5e5,a.a.defaults.headers.post["Content-Type"]="application/json",a.a.interceptors.request.use((function(e){return e.headers.token=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),a.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var n=function(e,o){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return a.a.post(e,o,t).then((function(e){return e.data}))},r=function(e,o){return a.a.get(e,{params:o}).then((function(e){return e.data}))}},"5f02":function(e,o,t){"use strict";t("99af");var l=t("365c");o["a"]={getCardOrders:function(e){return l["b"]("/bigflow/manage/v1.0/card/orders",e)},getAllChannels:function(e){return l["a"]("/bigflow/manage/v1.0/channels",e)},getAllPackages:function(e){return l["a"]("/bigflow/manage/v1.0/packages",e)},getAllPools:function(e){return l["a"]("/bigflow/manage/v1.0/pools",e)},getAllServiceInfo:function(e){return l["a"]("/bigflow/manage/v1.0/serviceinfos",e)},getCardInfos:function(e){return l["b"]("/bigflow/manage/v1.0/card/infos",e)},getVoiceRecords:function(e){return l["b"]("/bigflow/manage/v1.0/voice/records",e)},getFlowPools:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools",e)},getFlowCardStock:function(e){return l["b"]("/bigflow/manage/v1.0/cardstockpool",e)},getFlowPoolBills:function(e){return l["b"]("/bigflow/manage/v1.0/flowpoolbills",e)},getCardChanges:function(e){return l["b"]("/bigflow/manage/v1.0/cardchanges",e)},getBigflowStocks:function(e){return l["b"]("/bigflow/manage/v1.0/bigflowcardstocks",e)},getAccessWechats:function(e){return l["b"]("/bigflow/manage/v1.0/accessWechats",e)},getProducts:function(e){return l["b"]("/bigflow/manage/v1.0/bigflowproducts",e)},getAllSysFunctions:function(e){return l["a"]("/bigflow/manage/v1.0/system/functions",e)},getAllSysRoles:function(e){return l["a"]("/bigflow/manage/v1.0/system/roles",e)},getAllSysRoleFunctions:function(e){return l["a"]("/bigflow/manage/v1.0/system/roleFunctions",e)},getAllSysManagerRoles:function(e){return l["a"]("/bigflow/manage/v1.0/system/managerRoles",e)},getAllSysManagers:function(e){return l["a"]("/bigflow/manage/v1.0/system/managers",e)},changeCardStatus:function(e){return l["b"]("/bigflow/manage/v1.0/card/changeCardStatus",e)},unbindCard:function(e){return l["b"]("/bigflow/manage/v1.0/card/untying",e)},dosClear:function(e){return l["b"]("/bigflow/manage/v1.0/card/dosClear",e)},dosChange:function(e){return l["b"]("/bigflow/manage/v1.0/card/dosChange",e)},getProduct2Change:function(e){return l["b"]("/bigflow/manage/v1.0/card/product2change",e)},changeProduct:function(e){return l["b"]("/bigflow/manage/v1.0/card/updateProduct",e)},getComunPlanTypes2Change:function(e){return l["b"]("/bigflow/manage/v1.0/card/communPlanTypes",e)},changeCommunPlanType:function(e){return l["b"]("/bigflow/manage/v1.0/card/communPlan",e)},expiredateextend:function(e){return l["b"]("/bigflow/manage/v1.0/card/expiredateextend",e)},batchExpiredateExtend:function(e){return l["b"]("/bigflow/manage/v1.0/card/expiredate/batchextend",e)},getPdCodes:function(e){return l["a"]("/bigflow/manage/v1.0/flowpools/pdcode",e)},addFlowPool:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools/add",e)},addFlowPoolOrder:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools/order",e)},updateFlowPoolUse:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools/updateuse",e)},movePool:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools/move",e)},movePoolIccidsBetween:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools/move/iccidbetween",e)},stock2Channel:function(e){return l["b"]("/bigflow/manage/v1.0/bigflowcardstocks/tochannel",e)},getAllProduct2Change:function(e){return l["b"]("/bigflow/manage/v1.0/order/products2change",e)},moveOrderByIccidsBetween:function(e){return l["b"]("/bigflow/manage/v1.0/order/move/iccidbetween",e)},uploadFile:function(e){return l["b"]("/bigflow/manage/v1.0/order/file/upload",e,{headers:{"content-type":"multipart/form-data"}})},file2ExpiredateExtend:function(e,o,t){return l["b"]("/bigflow/manage/v1.0/card/expiredate/file2Extend?extendTime=".concat(t,"&reason=").concat(o),e,{headers:{"content-type":"multipart/form-data"}})},importOrder2Channel:function(e){return l["b"]("/bigflow/manage/v1.0/order/channel/import",e)},importPoolCards:function(e){return l["b"]("/bigflow/manage/v1.0/flowpools/card/import",e)},importStockCards:function(e){return l["b"]("/bigflow/manage/v1.0/stock/card/import",e)},moveStockCards:function(e){return l["b"]("/bigflow/manage/v1.0/stock/card/move",e)},moveStockCards2Channel:function(e){return l["b"]("/bigflow/manage/v1.0/stock/card/channel/move",e)},file2CardUsageCheck:function(e){return l["b"]("/bigflow/manage/v1.0/card/useage/check/file",e,{headers:{"content-type":"multipart/form-data"}})},file2OrdersDelete:function(e){return l["b"]("/bigflow/manage/v1.0/order/file/delete",e,{headers:{"content-type":"multipart/form-data"}})}}},e60b:function(e,o,t){"use strict";t.r(o);var l=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"box_subject"},[t("el-card",{staticClass:"all_list"},[t("el-form",{attrs:{inline:!0}},[t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"卡状态"}},[t("el-select",{staticClass:"queryFormInput",attrs:{clearable:"",placeholder:"请选择卡状态"},model:{value:e.status,callback:function(o){e.status=o},expression:"status"}},e._l(e.statusTypes,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"渠道"}},[t("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请选择渠道"},model:{value:e.saleChannel,callback:function(o){e.saleChannel=o},expression:"saleChannel"}},e._l(e.channels,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1),t("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-search"},on:{click:e.queryFlowPools}},[e._v("搜索")])],1)],1),t("div",{staticClass:"button_content"},[t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"bigflowFlowPool-add"},expression:"{indentity:'bigflowFlowPool-add'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-edit"},on:{click:e.openAddFlowPoolDlg}},[e._v("增加")]),t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"bigflowFlowPool-orderProduct"},expression:"{indentity:'bigflowFlowPool-orderProduct'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-edit"},on:{click:e.openOrderDlg}},[e._v("订购套餐")]),t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"bigflowFlowPool-useChange"},expression:"{indentity:'bigflowFlowPool-useChange'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-edit"},on:{click:e.openUpdateuseDlg}},[e._v("调整用量")])],1),t("div",{staticClass:"cardNos"},[t("div",{staticClass:"cardNosList"}),t("div",{staticClass:"cardNosNumber"},[e._v("选中"),t("span",{staticClass:"red"},[e._v("0")]),e._v("条数据")])]),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.flowPools,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleSelectionChange}},[t("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.table_column,(function(o,l){return t("el-table-column",{key:l,attrs:{prop:o.prop,label:o.label,width:o.width,align:"center",fixed:!!o.fixed&&o.fixed,sortable:o.sortable},scopedSlots:e._u([{key:"default",fn:function(l){return[t("div",{domProps:{innerHTML:e._s(l.row[o.prop])}})]}}],null,!0)})}))],2),t("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[10,20,30],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:"添加流量池",visible:e.showAddFlowPoolDlg,width:"450px"},on:{"update:visible":function(o){e.showAddFlowPoolDlg=o},close:e.closeAddFlowPoolDlg}},[t("el-form",{attrs:{model:e.addFlowPoolForm,"label-width":"110px"}},[t("el-form-item",{attrs:{label:"流量池编号"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入流量池编号"},model:{value:e.addFlowPoolForm.poolId,callback:function(o){e.$set(e.addFlowPoolForm,"poolId",o)},expression:"addFlowPoolForm.poolId"}})],1),t("el-form-item",{attrs:{label:"流量池名称"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入流量池名称"},model:{value:e.addFlowPoolForm.poolName,callback:function(o){e.$set(e.addFlowPoolForm,"poolName",o)},expression:"addFlowPoolForm.poolName"}})],1),t("el-form-item",{attrs:{label:"渠道"}},[t("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请输入调整原因"},model:{value:e.addFlowPoolForm.saleChannel,callback:function(o){e.$set(e.addFlowPoolForm,"saleChannel",o)},expression:"addFlowPoolForm.saleChannel"}},e._l(e.channels,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"卡的默认限量"}},[t("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请输入卡的默认限量"},model:{value:e.addFlowPoolForm.cardDefaultPdCode,callback:function(o){e.$set(e.addFlowPoolForm,"cardDefaultPdCode",o)},expression:"addFlowPoolForm.cardDefaultPdCode"}},e._l(e.getPdCodes,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{disabled:e.btnEnable},on:{click:e.closeAddFlowPoolDlg}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary",disabled:e.btnEnable},on:{click:e.okAddFlowPool}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"流量池订购套餐",visible:e.showOrderDlg,width:"450px"},on:{"update:visible":function(o){e.showOrderDlg=o},close:e.closeOrderDlg}},[t("el-form",{attrs:{model:e.addOrderForm,"label-width":"110px"}},[t("el-form-item",{attrs:{label:"订购套餐"}},[t("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请输入订购套餐"},model:{value:e.addOrderForm.productCode,callback:function(o){e.$set(e.addOrderForm,"productCode",o)},expression:"addOrderForm.productCode"}},e._l(e.getPdCodes,(function(e){return t("el-option",{key:e.value,attrs:{label:e.name,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"变更原因"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入变更原因"},model:{value:e.addOrderForm.reason,callback:function(o){e.$set(e.addOrderForm,"reason",o)},expression:"addOrderForm.reason"}})],1)],1),t("span",[t("p",[e._v("1）订购套餐为立即生效，会复盖之前的可用量及有效时间；")]),t("p",[e._v("2）加油包用量是当月有效，27号清0；")]),t("p",[e._v("3）变更原因请认真填写；")]),t("p",[e._v("4）订购成功后，并不会启用流量池，如需要请手动启用。")])]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{disabled:e.btnEnable},on:{click:e.closeOrderDlg}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary",disabled:e.btnEnable},on:{click:e.okOrderPool}},[e._v("确 定")])],1)],1),t("el-dialog",{attrs:{title:"调整用量",visible:e.showUpdateuseDlg,width:"450px"},on:{"update:visible":function(o){e.showUpdateuseDlg=o},close:e.closeUpdateuseDlg}},[t("el-form",{attrs:{model:e.updateuseForm,"label-width":"110px"}},[t("el-form-item",{attrs:{label:"高速可用量"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{onkeyup:"value=value.replace(/[^\\d]/g,'')",placeholder:"请输入变更原因"},model:{value:e.updateuseForm.flowHighDose,callback:function(o){e.$set(e.updateuseForm,"flowHighDose",o)},expression:"updateuseForm.flowHighDose"}})],1),t("el-form-item",{attrs:{label:"变更原因"}},[t("el-input",{staticStyle:{width:"300px"},attrs:{placeholder:"请输入变更原因"},model:{value:e.updateuseForm.reason,callback:function(o){e.$set(e.updateuseForm,"reason",o)},expression:"updateuseForm.reason"}})],1)],1),t("span",[t("p",[e._v("1）变更以G为单位，例如：输入1，代表1G")]),t("p",[e._v("2）变更逻辑：在原来基础上加上变更的用量。")]),t("p",[e._v("例如：原来有10G，变更1G，最后会变成11G")]),t("p",[e._v("输入负数就是减： 输入-1，就会变成9G。")]),t("p",[e._v("3）必填参数如果不需要变更，输入0即可")])]),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{attrs:{disabled:e.btnEnable},on:{click:e.closeUpdateuseDlg}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary",disabled:e.btnEnable},on:{click:e.okUpdateuse}},[e._v("确 定")])],1)],1)],1)},a=[],n=t("5f02"),r={components:{},data:function(){return{showUpdateuseDlg:!1,updateuseForm:{},showOrderDlg:!1,addOrderForm:{},poolId:"",pdCodes:[],showAddFlowPoolDlg:!1,addFlowPoolForm:{},btnEnable:!1,loading:!1,status:"",saleChannel:"",channels:[],statusTypes:[{label:"可用",value:"open"},{label:"不可用",value:"close"}],flowPools:[],page:1,pageSize:10,total:0,table_column:[{prop:"poolId",label:"池ID",width:200,fixed:"left",sortable:!0},{prop:"poolName",label:"池名称",width:190,fixed:"left",sortable:!0},{prop:"statusName",label:"状态",width:200,sortable:!0},{prop:"num",label:"总卡片数",width:150,sortable:!0},{prop:"saleChannelName",label:"渠道",width:300,sortable:!0},{prop:"productCodeName",label:"当前套餐",width:200,sortable:!0},{prop:"flowHighDoseName",label:"可用量",width:180,sortable:!0},{prop:"flowHighUsedName",label:"当月已使用",width:180,sortable:!0},{prop:"surplusUsedName",label:"剩余总流量",width:180,sortable:!0},{prop:"expireDate",label:"有效期",width:300},{prop:"gmtCreate",label:"创建时间",width:300}]}},mounted:function(){},created:function(){this.getAllChannels(),this.queryFlowPools(),this.getPdCodes()},watch:{},methods:{openUpdateuseDlg:function(){""!=this.poolId?-1==this.poolId.indexOf(",")?this.showUpdateuseDlg=!0:alert("一次只能操作一个流量池"):alert("请先选择要操作的流量池")},closeUpdateuseDlg:function(){this.showUpdateuseDlg=!1},okUpdateuse:function(){var e=this,o=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){o.btnEnable=!0;var t={};t.flowHighDose=e.updateuseForm.flowHighDose,t.reason=e.updateuseForm.reason,t.poolId=e.poolId,n["a"].updateFlowPoolUse(t).then((function(e){0==e.resultCode?(o.queryFlowPools(),o.showUpdateuseDlg=!1,alert("操作成功")):alert("操作失败:"+e.resultInfo),o.btnEnable=!1}))})).catch((function(){}))},openOrderDlg:function(){""!=this.poolId?-1==this.poolId.indexOf(",")?this.showOrderDlg=!0:alert("一次只能操作一个流量池"):alert("请先选择要操作的流量池")},closeOrderDlg:function(){this.showOrderDlg=!1},okOrderPool:function(){var e=this,o=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){o.btnEnable=!0;var t={};t.productCode=e.addOrderForm.productCode,t.reason=e.addOrderForm.reason,t.poolId=e.poolId,n["a"].addFlowPoolOrder(t).then((function(e){0==e.resultCode?(o.queryFlowPools(),o.showOrderDlg=!1,alert("操作成功")):alert("操作失败:"+e.resultInfo),o.btnEnable=!1}))})).catch((function(){}))},openAddFlowPoolDlg:function(){this.showAddFlowPoolDlg=!0},closeAddFlowPoolDlg:function(){this.showAddFlowPoolDlg=!1},okAddFlowPool:function(){var e=this,o=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){o.btnEnable=!0;var t={};t.poolName=e.addFlowPoolForm.poolName,t.poolId=e.addFlowPoolForm.poolId,t.saleChannel=e.addFlowPoolForm.saleChannel,t.cardDefaultPdCode=e.addFlowPoolForm.cardDefaultPdCode,n["a"].addFlowPool(t).then((function(e){0==e.resultCode?(o.queryFlowPools(),o.showAddFlowPoolDlg=!1,alert("操作成功")):alert("操作失败:"+e.resultInfo),o.btnEnable=!1}))})).catch((function(){}))},getPdCodes:function(){var e=this,o={};n["a"].getPdCodes(o).then((function(o){0==o.resultCode&&(e.getPdCodes=o.data)}))},getAllChannels:function(){var e=this,o={};n["a"].getAllChannels(o).then((function(o){0==o.resultCode&&(e.channels=o.data,e.total=o.rowNum)}))},handleSelectBranchCom:function(e){},queryFlowPools:function(){var e=this;this.loading=!0;var o={};o.page=this.page,""!=this.status&&(o.status=this.status),""!=this.saleChannel&&(o.saleChannel=this.saleChannel),n["a"].getFlowPools(o).then((function(o){0==o.resultCode&&(e.flowPools=o.data,e.total=o.rowNum,e.loading=!1)}))},handleSelectionChange:function(e){if(this.poolId="",e.length>0){for(var o=0;o<e.length;o++)this.poolId=this.poolId+e[o].poolId+",";this.poolId=this.poolId.substr(0,this.poolId.length-1)}},handleSizeChange:function(e){this.page=e,this.queryFlowPools()},handleCurrentChange:function(e){this.page=e,this.queryFlowPools()}}},s=r,i=t("2877"),d=Object(i["a"])(s,l,a,!1,null,"4c5b211d",null);o["default"]=d.exports}}]);
//# sourceMappingURL=chunk-86ba8992.451b0a80.js.map