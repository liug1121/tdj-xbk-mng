(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32cad350"],{"159b":function(e,t,n){var o=n("da84"),l=n("fdbc"),i=n("17c2"),s=n("9112");for(var r in l){var a=o[r],c=a&&a.prototype;if(c&&c.forEach!==i)try{s(c,"forEach",i)}catch(u){c.forEach=i}}},"17c2":function(e,t,n){"use strict";var o=n("b727").forEach,l=n("a640"),i=l("forEach");e.exports=i?[].forEach:function(e){return o(this,e,arguments.length>1?arguments[1]:void 0)}},"365c":function(e,t,n){"use strict";n.d(t,"b",(function(){return i})),n.d(t,"a",(function(){return s}));n("d3b7");var o=n("bc3a"),l=n.n(o);l.a.defaults.timeout=5e5,l.a.defaults.headers.post["Content-Type"]="application/json",l.a.interceptors.request.use((function(e){return e.headers.token=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),l.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var i=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return l.a.post(e,t,n).then((function(e){return e.data}))},s=function(e,t){return l.a.get(e,{params:t}).then((function(e){return e.data}))}},"68d4":function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"box_subject"},[n("el-card",{staticClass:"all_list"},[n("el-form",{attrs:{inline:!0}}),n("div",{staticClass:"button_content"},[n("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-edit"},on:{click:e.toAddRoleClick}},[e._v("新增角色")])],1),n("div",{staticClass:"cardNos"},[n("div",{staticClass:"cardNosList"}),n("div",{staticClass:"cardNosNumber"},[e._v("选中"),n("span",{staticClass:"red"},[e._v("0")]),e._v("条数据")])]),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.roles,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleSelectionChange}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.table_column,(function(t,o){return n("el-table-column",{key:o,attrs:{prop:t.prop,label:t.label,width:t.width,align:"center",fixed:!!t.fixed&&t.fixed,sortable:t.sortable},scopedSlots:e._u([{key:"default",fn:function(o){return[n("div",{domProps:{innerHTML:e._s(o.row[t.prop])}}),"operations"==t.prop?n("div",[n("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(t){return e.functionSel(o.row)}}},[e._v("设置角色功能")]),n("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(t){return e.removeRole(o.row)}}},[e._v("删除角色")])],1):e._e()]}}],null,!0)})}))],2)],1),n("el-dialog",{attrs:{title:"角色功能",visible:e.functionDlgShow,width:"630px"},on:{"update:visible":function(t){e.functionDlgShow=t}}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"functionSelTable",attrs:{data:e.roleMenus,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleRoleFunctionsSelectionChange,select:e.onRoleFunctionsSelect,"select-all":e.onRoleFunctionsSelectAll}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.function_column,(function(t,o){return n("el-table-column",{key:o,attrs:{prop:t.prop,label:t.label,width:t.width,align:"center",fixed:!!t.fixed&&t.fixed,sortable:t.sortable},scopedSlots:e._u([{key:"default",fn:function(o){return[n("div",{domProps:{innerHTML:e._s(o.row[t.prop])}}),"setting"==t.prop&&o.row["opts"]?n("div",[n("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(t){return e.optSelDlgOpen(o.row)}}},[e._v("设置功能")])],1):e._e()]}}],null,!0)})}))],2),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.functionSelDlgClose}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.editRoleFunctionOk}},[e._v("确 定")])],1)],1),n("el-dialog",{attrs:{title:"设置操作",visible:e.optSelDlgShow,width:"630px"},on:{"update:visible":function(t){e.optSelDlgShow=t}}},[n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"optSelTable",attrs:{data:e.selectedMenu.opts,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleOptSelectionChange,select:e.onOptsSelect,"select-all":e.onOptsSelectAll}},[n("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.opt_column,(function(t,o){return n("el-table-column",{key:o,attrs:{prop:t.prop,label:t.label,width:t.width,align:"center",fixed:!!t.fixed&&t.fixed,sortable:t.sortable},scopedSlots:e._u([{key:"default",fn:function(o){return[n("div",{domProps:{innerHTML:e._s(o.row[t.prop])}})]}}],null,!0)})}))],2),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.optSelDlgClose}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.optSelDlgOk}},[e._v("确 定")])],1)],1),n("el-dialog",{attrs:{title:"角色",visible:e.roleDlgShow,width:"430px"},on:{"update:visible":function(t){e.roleDlgShow=t}}},[n("el-form",{attrs:{model:e.roleInfo,"label-width":"120px"}},[n("el-form-item",{attrs:{label:"角色名称"}},[n("el-input",{attrs:{size:"small",placeholder:"请输入角色名称"},model:{value:e.roleInfo.roleName,callback:function(t){e.$set(e.roleInfo,"roleName",t)},expression:"roleInfo.roleName"}})],1)],1),n("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[n("el-button",{on:{click:e.closeRoleDlg}},[e._v("取 消")]),n("el-button",{attrs:{type:"primary"},on:{click:e.editRoleClick}},[e._v("确 定")])],1)],1)],1)},l=[],i=(n("b0c0"),n("159b"),n("4de4"),n("d81d"),n("8593")),s={components:{},data:function(){return{loading:!1,roles:[],selectedRow:{},roleFunctions:[],roleMenus:[],roleOpts:[],selectedMenu:{},roleFunctions2Edit:[],functionDlgShow:!1,roleDlgShow:!1,optSelDlgShow:!1,roleInfo:{},operating:!1,optOperating:!1,page:1,pageSize:10,total:0,table_column:[{prop:"name",label:"角色名称",width:300,fixed:"left"},{prop:"operations",label:"操作",width:300}],function_column:[{prop:"plateformTypeName",label:"平台类型",width:200},{prop:"functionName",label:"菜单名",width:200},{prop:"setting",label:"功能",width:100}],opt_column:[{prop:"functionName",label:"操作",width:200}]}},mounted:function(){},created:function(){this.queryAllRoles()},watch:{},updated:function(){this.refreshRoleFunctionsSelected(),this.refreshOptsSelected()},methods:{removeRole:function(e){var t=this,n=e.id;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var e={};e.roleId=n,i["a"].removeRole(e).then((function(e){0==e.resultCode?(t.queryAllRoles(),alert("删除成功")):alert("删除失败:"+e.resultInfo)}))})).catch((function(){}))},toAddRoleClick:function(){this.roleInfo={},this.roleDlgShow=!0},toEditRoleClick:function(e){this.roleInfo={},roleInfo.id=e.id,roleInfo.roleName=e.name,this.roleDlgShow=!0},closeRoleDlg:function(){this.roleDlgShow=!1},editRoleClick:function(){if(""==this.roleInfo.id||void 0==this.roleInfo.id){if(""==this.roleInfo.roleName||void 0==this.roleInfo.roleName)return void alert("角色名称不能为空");var e=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.addRole(e.roleInfo.roleName,(function(t){e.roleDlgShow=!1,e.queryAllRoles(),alert("新增成功")}),(function(e){alert("新增失败:"+e.resultInfo)}))})).catch((function(){}))}},refreshRoleFunctionsSelected:function(){var e=this;this.roleMenus.forEach((function(t){1==t.has&&e.$refs.functionSelTable.toggleRowSelection(t,!0)}))},refreshOptsSelected:function(){var e=this;void 0!=this.selectedMenu.opts&&this.selectedMenu.opts.forEach((function(t){1==t.has&&e.$refs.optSelTable.toggleRowSelection(t,!0)}))},functionSel:function(e){this.selectedRow=e,this.functionDlgShow=!0;var t=e.id;this.getRoleFunctions(t)},functionSelDlgClose:function(){this.functionDlgShow=!1},optSelDlgOpen:function(e){this.selectedMenu=e,this.optSelDlgShow=!0,this.operating=!0},optSelDlgClose:function(){this.optSelDlgShow=!1},optSelDlgOk:function(){var e=this.selectedMenu.opts.filter((function(e){return e.has}));void 0!=e&&e.length>0?this.$refs.functionSelTable.toggleRowSelection(this.selectedMenu,!0):this.$refs.functionSelTable.toggleRowSelection(this.selectedMenu,!1),this.optSelDlgClose()},handleSelectBranchCom:function(e){},addRole:function(e,t,n){var o={};o.roleName=e,i["a"].addRole(o).then((function(e){0==e.resultCode?null!=t&&void 0!=t&&t(e):null!=n&&void 0!=n&&n(e)}))},getRoleFunctions:function(e){var t=this;this.loading=!0;var n={};n.roleId=e,i["a"].getRoleFunctions(n).then((function(e){0==e.resultCode&&(t.roleFunctions=e.data,t.roleMenus=t.roleFunctions.filter((function(e){return 0==e.type})),t.roleOpts=t.roleFunctions.filter((function(e){return 1==e.type})),t.roleMenus.forEach((function(e){var n=[];t.roleOpts.forEach((function(t){e.function_id==t.parentId&&n.push(t)})),n.length>0&&(e.opts=n)})),t.loading=!1)}))},editRoleFunctionOk:function(){this.loading=!0;var e=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.editRoleFunctions((function(t){var n=e.selectedRow.id;e.getRoleFunctions(n),e.loading=!1,alert("修改成功")}),(function(t){e.loading=!1,alert("修改失败")}))})).catch((function(){}))},editRoleFunctions:function(e,t){var n=this.selectedRow.id,o={};o.roleId=n;var l=[];l=this.roleMenus.filter((function(e){return e.has})),l.forEach((function(e){if(void 0!=e.opts){var t=e.opts.filter((function(e){return e.has}));t.forEach((function(e){l.push(e)}))}}));var s=l.map((function(e){return e.function_id}));o.functionIds=s,i["a"].editRoleFunctions(o).then((function(n){0==n.resultCode?null!=e&&void 0!=e&&e(n):null!=t&&void 0!=t&&t(n)}))},queryAllRoles:function(){var e=this;this.loading=!0;var t={};i["a"].getAllSysRoles(t).then((function(t){0==t.resultCode&&(e.roles=t.data,e.total=t.rowNum,e.loading=!1)}))},handleSelectionChange:function(e){},onRoleFunctionsSelectAll:function(e){this.onRoleFunctionsSelect(e,null)},onRoleFunctionsSelect:function(e,t){this.roleMenus.forEach((function(t){t.has=!1,e.forEach((function(e){t.function_id==e.function_id&&(t.has=!0)}))}))},handleRoleFunctionsSelectionChange:function(e){},onOptsSelect:function(e,t){var n=this,o=this;this.selectedMenu.opts.forEach((function(t){t.has=!1,n.selectedMenu.has=!1,e.forEach((function(e){t.function_id==e.function_id&&(t.has=!0,o.selectedMenu.has=!0)}))}))},onOptsSelectAll:function(e){this.onOptsSelect(e,null)},handleOptSelectionChange:function(e){},handleSizeChange:function(e){this.page=e,this.queryAllRoles()},handleCurrentChange:function(e){this.page=e,this.queryAllRoles()}}},r=s,a=n("2877"),c=Object(a["a"])(r,o,l,!1,null,"6967358f",null);t["default"]=c.exports},8593:function(e,t,n){"use strict";var o=n("365c");t["a"]={getAllSysFunctions:function(e){return o["a"]("boss/v1.0/system/functions",e)},getAllSysRoles:function(e){return o["a"]("boss/v1.0/system/roles",e)},getAllSysRoleFunctions:function(e){return o["a"]("boss/v1.0/system/roleFunctions",e)},getSysManagerRoles:function(e){return o["b"]("boss/v1.0/system/managerRoles",e)},getAllSysManagers:function(e){return o["b"]("boss/v1.0/system/managers",e)},editManger:function(e){return o["b"]("boss/v1.0/system/managers/edit",e)},editMangerRoles:function(e){return o["b"]("boss/v1.0/system/managerRoles/edit",e)},getRoleFunctions:function(e){return o["b"]("boss/v1.0/system/role/functions",e)},editRoleFunctions:function(e){return o["b"]("boss/v1.0/system/role/functions/modify",e)},addRole:function(e){return o["b"]("boss/v1.0/system/roles/add",e)},removeRole:function(e){return o["b"]("boss/v1.0/system/roles/remove",e)},addManager:function(e){return o["b"]("boss/v1.0/system/managers/add",e)},getPushLogs:function(e){return o["b"]("boss/v1.0/gateway/pushLogs",e)},getPushInfos:function(e){return o["a"]("boss/v1.0/gateway/pushinfo/all",e)},addPushInfo:function(e){return o["b"]("boss/v1.0/gateway/pushInfo/add",e)},modifyPushInfo:function(e){return o["b"]("boss/v1.0/gateway/pushInfo/modify",e)}}},a640:function(e,t,n){"use strict";var o=n("d039");e.exports=function(e,t){var n=[][e];return!!n&&o((function(){n.call(null,t||function(){throw 1},1)}))}},d81d:function(e,t,n){"use strict";var o=n("23e7"),l=n("b727").map,i=n("1dde"),s=i("map");o({target:"Array",proto:!0,forced:!s},{map:function(e){return l(this,e,arguments.length>1?arguments[1]:void 0)}})}}]);
//# sourceMappingURL=chunk-32cad350.50872778.js.map