(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-998406ca"],{"365c":function(e,r,t){"use strict";t.d(r,"b",(function(){return n})),t.d(r,"a",(function(){return l}));t("d3b7");var o=t("bc3a"),a=t.n(o);a.a.defaults.timeout=5e5,a.a.defaults.headers.post["Content-Type"]="application/json",a.a.interceptors.request.use((function(e){return e.headers.token=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),a.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var n=function(e,r){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return a.a.post(e,r,t).then((function(e){return e.data}))},l=function(e,r){return a.a.get(e,{params:r}).then((function(e){return e.data}))}},f180:function(e,r,t){"use strict";t.r(r);var o=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",{staticClass:"box_subject"},[t("el-card",{staticClass:"all_list"},[t("el-form",{ref:"queryFlowOrderForm",attrs:{inline:!0,model:e.queryFlowOrderForm}},[t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"订单编号"}},[t("el-input",{staticClass:"queryFormInput",attrs:{placeholder:"请输入订单编号"},model:{value:e.queryFlowOrderForm.orderId,callback:function(r){e.$set(e.queryFlowOrderForm,"orderId",r)},expression:"queryFlowOrderForm.orderId"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"姓名"}},[t("el-input",{staticClass:"queryFormInput",attrs:{placeholder:"请输入姓名"},model:{value:e.queryFlowOrderForm.name,callback:function(r){e.$set(e.queryFlowOrderForm,"name",r)},expression:"queryFlowOrderForm.name"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"电话"}},[t("el-input",{staticClass:"queryFormInput",attrs:{placeholder:"请输入电话"},model:{value:e.queryFlowOrderForm.phone,callback:function(r){e.$set(e.queryFlowOrderForm,"phone",r)},expression:"queryFlowOrderForm.phone"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"地址"}},[t("el-input",{staticClass:"queryFormInput",attrs:{placeholder:"请输入地址"},model:{value:e.queryFlowOrderForm.address,callback:function(r){e.$set(e.queryFlowOrderForm,"address",r)},expression:"queryFlowOrderForm.address"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"入库时间"}},[t("el-date-picker",{staticStyle:{width:"135px"},attrs:{type:"date",placeholder:"开始日期","value-format":"yyyy-MM-dd"},on:{change:e.startTimeChange},model:{value:e.queryFlowOrderForm.startDate,callback:function(r){e.$set(e.queryFlowOrderForm,"startDate",r)},expression:"queryFlowOrderForm.startDate"}}),t("span",{staticClass:"time-line"},[e._v("-")]),t("el-date-picker",{staticStyle:{width:"135px"},attrs:{type:"date",placeholder:"结束日期","value-format":"yyyy-MM-dd"},on:{change:e.endTimeChange},model:{value:e.queryFlowOrderForm.endDate,callback:function(r){e.$set(e.queryFlowOrderForm,"endDate",r)},expression:"queryFlowOrderForm.endDate"}})],1),t("el-form-item",{staticClass:"queryFormItem"},[t("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:e.queryFlowOrder}},[e._v("查询")])],1)],1),t("div",{staticClass:"button_content"},[t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"xbkFlowOrder-export"},expression:"{indentity:'xbkFlowOrder-export'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-download"},on:{click:e.exportCardInfo}},[e._v("导出")])],1),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.orderList,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}}},e._l(e.table_column,(function(r,o){return t("el-table-column",{key:o,attrs:{prop:r.prop,label:r.label,width:r.width,align:"center",fixed:!!r.fixed&&r.fixed,"show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(o){return["addressCL"===r.prop?t("div",[e._v(" "+e._s(o.row.province)+e._s(o.row.city)+e._s(o.row.address)+" ")]):t("div",[t("div",{domProps:{innerHTML:e._s(o.row[r.prop])}})])]}}],null,!0)})})),1),t("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[10,20,30],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1)],1)},a=[],n=(t("b0c0"),t("365c")),l={apiFlowOrderList:function(e){return n["b"]("regiestercard/v1.0/manage/registercards",e)},apiRegistercardsExport:function(e){return n["b"]("regiestercard/v1.0/manage/registercards/export",e)}},s={name:"signPlan",data:function(){return{orderList:[],page:1,pageSize:10,total:0,table_column:[{prop:"order_id",label:"订单编号",width:200,fixed:"left"},{prop:"create_time",label:"日期",width:180},{prop:"name",label:"姓名",width:80},{prop:"phone",label:"电话",width:120},{prop:"addressCL",label:"发货地址"}],queryFlowOrderForm:{address:null,endDate:null,name:null,orderId:null,phone:null,startDate:null,page:0,pageSize:10},loading:!1}},mounted:function(){this.getOrdersList()},methods:{getOrdersList:function(){var e=this,r=this.queryFlowOrderForm;this.loading=!0,l.apiFlowOrderList(r).then((function(r){0===r.resultCode&&(e.orderList=r.data,e.total=r.rowNum,e.loading=!1)}))},handleSizeChange:function(e){this.queryFlowOrderForm.pageSize=e,this.getOrdersList()},handleCurrentChange:function(e){this.queryFlowOrderForm.page=e-1,this.getOrdersList()},queryFlowOrder:function(){""===this.queryFlowOrderForm.address&&(this.queryFlowOrderForm.address=null),""===this.queryFlowOrderForm.phone&&(this.queryFlowOrderForm.phone=null),""===this.queryFlowOrderForm.orderId&&(this.queryFlowOrderForm.orderId=null),""===this.queryFlowOrderForm.name&&(this.queryFlowOrderForm.name=null),""===this.queryFlowOrderForm.startDate&&(this.queryFlowOrderForm.startDate=null),""===this.queryFlowOrderForm.endDate&&(this.queryFlowOrderForm.endDate=null),this.getOrdersList()},startTimeChange:function(){this.queryFlowOrderForm.startDate="".concat(this.queryFlowOrderForm.startDate," 00:00:00")},endTimeChange:function(){this.queryFlowOrderForm.endDate="".concat(this.queryFlowOrderForm.endDate," 23:59:59")},exportCardInfo:function(){}}},i=s,d=t("2877"),u=Object(d["a"])(i,o,a,!1,null,"286b526c",null);r["default"]=u.exports}}]);
//# sourceMappingURL=chunk-998406ca.d832bc6f.js.map