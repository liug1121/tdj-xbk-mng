(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b764b65"],{"159b":function(e,t,a){var n=a("da84"),r=a("fdbc"),o=a("17c2"),l=a("9112");for(var s in r){var i=n[s],c=i&&i.prototype;if(c&&c.forEach!==o)try{l(c,"forEach",o)}catch(d){c.forEach=o}}},"17c2":function(e,t,a){"use strict";var n=a("b727").forEach,r=a("a640"),o=r("forEach");e.exports=o?[].forEach:function(e){return n(this,e,arguments.length>1?arguments[1]:void 0)}},"25b4":function(e,t,a){"use strict";a.r(t);var n,r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"box_subject"},[a("el-card",{staticClass:"all_list"},[a("el-form",{attrs:{inline:!0}},[a("el-form-item",{attrs:{label:""}},[a("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请选择用户名"},model:{value:e.queryName,callback:function(t){e.queryName=t},expression:"queryName"}},e._l(e.allManagers,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.name}})})),1)],1),a("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-search"},on:{click:e.queryManagers}},[e._v("查询")])],1),a("el-form",{attrs:{inline:!0}},[a("div",{staticClass:"button_content"},[a("el-button",{attrs:{size:"medium",type:"primary",icon:"el-icon-edit"},on:{click:e.showAddMangerDlg}},[e._v("新增管理员")])],1)]),a("div",{staticClass:"cardNos"},[a("div",{staticClass:"cardNosList"}),a("div",{staticClass:"cardNosNumber"},[e._v("选中"),a("span",{staticClass:"red"},[e._v("0")]),e._v("条数据")])]),a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.managers,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.table_column,(function(t,n){return a("el-table-column",{key:n,attrs:{prop:t.prop,label:t.label,align:"center",fixed:!!t.fixed&&t.fixed,sortable:t.sortable},scopedSlots:e._u([{key:"default",fn:function(n){return[a("div",{domProps:{innerHTML:e._s(n.row[t.prop])}}),"operations"==t.prop?a("div",[a("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(t){return e.editManager(n.row,0)}}},[e._v("编辑")]),a("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(t){return e.roleSel(n.row)}}},[e._v("分配角色")])],1):e._e()]}}],null,!0)})}))],2)],1),a("el-dialog",{attrs:{title:"用户信息",visible:e.managerDlgShow,width:"430px"},on:{"update:visible":function(t){e.managerDlgShow=t},close:e.managerDlgClose}},[a("el-form",{attrs:{"label-width":"120px"}},[a("el-form-item",{attrs:{label:"登录名"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入登录名"},model:{value:e.manager2Edit.user_name,callback:function(t){e.$set(e.manager2Edit,"user_name",t)},expression:"manager2Edit.user_name"}})],1),a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入用户名"},model:{value:e.manager2Edit.name,callback:function(t){e.$set(e.manager2Edit,"name",t)},expression:"manager2Edit.name"}})],1),a("el-form-item",{attrs:{label:"登录密码"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入登录密码"},model:{value:e.manager2Edit.pwd,callback:function(t){e.$set(e.manager2Edit,"pwd",t)},expression:"manager2Edit.pwd"}})],1),a("el-form-item",{attrs:{label:"电话"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入电话"},model:{value:e.manager2Edit.phone,callback:function(t){e.$set(e.manager2Edit,"phone",t)},expression:"manager2Edit.phone"}})],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.managerDlgClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.managerDlgOk}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"角色信息",visible:e.roleDlgShow,width:"430px"},on:{"update:visible":function(t){e.roleDlgShow=t}}},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"roleSelTable",attrs:{data:e.roles,border:"","max-height":"600",align:"center","cell-style":{height:"38px",padding:0}},on:{"selection-change":e.handleRoleSelectionChange}},[a("el-table-column",{attrs:{type:"selection",width:"55"}}),e._l(e.role_table_column,(function(t,n){return a("el-table-column",{key:n,attrs:{prop:t.prop,label:t.label,align:"center",fixed:!!t.fixed&&t.fixed,sortable:t.sortable},scopedSlots:e._u([{key:"default",fn:function(n){return[a("div",{domProps:{innerHTML:e._s(n.row[t.prop])}})]}}],null,!0)})}))],2),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.roleSelDlgClose}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.roleSelDlgOk}},[e._v("确 定")])],1)],1),a("el-dialog",{attrs:{title:"新增管理员",visible:e.addManagerDlgShow,width:"430px"},on:{"update:visible":function(t){e.addManagerDlgShow=t}}},[a("el-form",{attrs:{model:e.addManager,"label-width":"120px"}},[a("el-form-item",{attrs:{label:"用户名"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入用户名"},model:{value:e.addManager.userName,callback:function(t){e.$set(e.addManager,"userName",t)},expression:"addManager.userName"}})],1),a("el-form-item",{attrs:{label:"姓名"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入姓名"},model:{value:e.addManager.name,callback:function(t){e.$set(e.addManager,"name",t)},expression:"addManager.name"}})],1),a("el-form-item",{attrs:{label:"密码"}},[a("el-input",{attrs:{size:"small",placeholder:"请输入密码"},model:{value:e.addManager.pwd,callback:function(t){e.$set(e.addManager,"pwd",t)},expression:"addManager.pwd"}})],1),a("el-form-item",{attrs:{label:"角色"}},[a("el-select",{staticClass:"queryFormInput",attrs:{filterable:"",clearable:"","reserve-keyword":"",placeholder:"请选择角色"},model:{value:e.addManager.roleId,callback:function(t){e.$set(e.addManager,"roleId",t)},expression:"addManager.roleId"}},e._l(e.allRoles,(function(e){return a("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})})),1)],1)],1),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("el-button",{on:{click:e.closeAddMangerDlg}},[e._v("取 消")]),a("el-button",{attrs:{type:"primary"},on:{click:e.addManagerClick}},[e._v("确 定")])],1)],1)],1)},o=[],l=a("ade3"),s=(a("159b"),a("b0c0"),a("8593")),i={components:{},data:function(){return{addManagerDlgShow:!1,addManager:{},queryName:"",loading:!1,managers:[],allManagers:[],roles:[],allRoles:[],managerDlgShow:!1,roleDlgShow:!1,manager2Edit:{},managerRoles2Modify:[],selectedManager:{},page:1,pageSize:10,total:0,table_column:[{prop:"user_name",label:"登录名",width:200,fixed:"left"},{prop:"name",label:"用户名",width:300},{prop:"phone",label:"电话",width:300},{prop:"roleInfo",label:"角色",width:300},{prop:"operations",label:"操作",width:300}],role_table_column:[{prop:"roleName",label:"角色名称",width:300}]}},mounted:function(){},created:function(){this.queryAllManagers(),this.getAllSysRoles()},watch:{},updated:function(){this.refreshRolesSelected()},toggleSelection:function(e){},methods:(n={queryManagers:function(){this.queryManagers()},closeAddMangerDlg:function(){this.addManagerDlgShow=!1},showAddMangerDlg:function(){this.addManagerDlgShow=!0},refreshRolesSelected:function(){var e=this;this.roles.forEach((function(t){1==t.has&&e.$refs.roleSelTable.toggleRowSelection(t,!0)}))},addManagerClick:function(){var e=this.addManager.userName;if(""!==e&&void 0!=e){var t=this.addManager.name;if(""!==t&&void 0!=t){var a=this.addManager.pwd;if(""!==a&&void 0!=a){var n=this.addManager.roleId;if(""!==n&&void 0!=n){var r={};r.userName=e,r.name=t,r.pwd=a,r.roleId=n;var o=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){s["a"].addManager(r).then((function(e){0==e.resultCode?(o.queryAllManagers(),alert("添加成功")):alert("添加失败:"+e.resultInfo)}))})).catch((function(){}))}else alert("角色不能为空")}else alert("密码不能为空")}else alert("姓名不能为空")}else alert("用户名不能为空")},getAllSysRoles:function(){var e=this,t={};s["a"].getAllSysRoles(t).then((function(t){0==t.resultCode&&(e.allRoles=t.data)}))},getManagerRoles:function(e){var t=this;this.loading=!0;var a={};a.managerId=e,s["a"].getSysManagerRoles(a).then((function(e){0==e.resultCode&&(t.roles=e.data,t.loading=!1)}))},doEditManagerRoles:function(e,t,a){var n={};n.managerId=e;var r=[];this.managerRoles2Modify.forEach((function(e){r.push(e.roleId)})),n.roleIds=r,s["a"].editMangerRoles(n).then((function(e){0==e.resultCode?null!=t&&void 0!=t&&t(e):null!=a&&void 0!=a&&a(e)}))},doEditManager:function(e,t){var a={};a.id=this.manager2Edit.id,a.userName=this.manager2Edit.user_name,a.pwd=this.manager2Edit.pwd,a.name=this.manager2Edit.name,a.phone=this.manager2Edit.phone,s["a"].editManger(a).then((function(a){0==a.resultCode?null!=e&&void 0!=e&&e(a):null!=t&&void 0!=t&&t(a)}))},managerDlgOk:function(){var e=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.doEditManager((function(t){e.managerDlgShow=!1,alert("修改成功")}),(function(e){alert("修改失败")}))})).catch((function(){}))},managerDlgClose:function(){this.managerDlgShow=!1},editManager:function(e,t){this.manager2Edit=e,this.managerDlgShow=!0},roleSel:function(e){this.roleDlgShow=!0,this.selectedManager=e,this.getManagerRoles(e.id)},roleSelDlgClose:function(){this.roleDlgShow=!1},roleSelDlgOk:function(){var e=this.selectedManager.id,t=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){t.doEditManagerRoles(e,(function(e){t.roleDlgShow=!1,t.queryAllManagers(),alert("权限修改成功")}),(function(e){alert("权限修改失败")}))})).catch((function(){}))},handleSelectBranchCom:function(e){}},Object(l["a"])(n,"queryManagers",(function(){var e=this;this.loading=!0;var t={};t.name=this.queryName,s["a"].getAllSysManagers(t).then((function(t){0==t.resultCode&&(e.managers=t.data,e.total=t.rowNum,e.loading=!1)}))})),Object(l["a"])(n,"queryAllManagers",(function(){var e=this;this.loading=!0;var t={};s["a"].getAllSysManagers(t).then((function(t){0==t.resultCode&&(e.managers=t.data,e.allManagers=t.data,e.total=t.rowNum,e.loading=!1)}))})),Object(l["a"])(n,"handleSelectionChange",(function(e){})),Object(l["a"])(n,"handleRoleSelectionChange",(function(e){this.managerRoles2Modify=e})),Object(l["a"])(n,"handleSizeChange",(function(e){this.page=e,this.queryAllManagers()})),Object(l["a"])(n,"handleCurrentChange",(function(e){this.page=e,this.queryAllManagers()})),n)},c=i,d=a("2877"),u=Object(d["a"])(c,r,o,!1,null,"45c62994",null);t["default"]=u.exports},"365c":function(e,t,a){"use strict";a.d(t,"b",(function(){return o})),a.d(t,"a",(function(){return l}));a("d3b7");var n=a("bc3a"),r=a.n(n);r.a.defaults.timeout=5e5,r.a.defaults.headers.post["Content-Type"]="application/json",r.a.interceptors.request.use((function(e){return e.headers.token=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),r.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var o=function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.a.post(e,t,a).then((function(e){return e.data}))},l=function(e,t){return r.a.get(e,{params:t}).then((function(e){return e.data}))}},8593:function(e,t,a){"use strict";var n=a("365c");t["a"]={getAllSysFunctions:function(e){return n["a"]("boss/v1.0/system/functions",e)},getAllSysRoles:function(e){return n["a"]("boss/v1.0/system/roles",e)},getAllSysRoleFunctions:function(e){return n["a"]("boss/v1.0/system/roleFunctions",e)},getSysManagerRoles:function(e){return n["b"]("boss/v1.0/system/managerRoles",e)},getAllSysManagers:function(e){return n["b"]("boss/v1.0/system/managers",e)},editManger:function(e){return n["b"]("boss/v1.0/system/managers/edit",e)},editMangerRoles:function(e){return n["b"]("boss/v1.0/system/managerRoles/edit",e)},getRoleFunctions:function(e){return n["b"]("boss/v1.0/system/role/functions",e)},editRoleFunctions:function(e){return n["b"]("boss/v1.0/system/role/functions/modify",e)},addRole:function(e){return n["b"]("boss/v1.0/system/roles/add",e)},editRole:function(e){return n["b"]("boss/v1.0/system/roles/modify",e)},removeRole:function(e){return n["b"]("boss/v1.0/system/roles/remove",e)},addManager:function(e){return n["b"]("boss/v1.0/system/managers/add",e)},getPushLogs:function(e){return n["b"]("boss/v1.0/gateway/pushLogs",e)},getPushInfos:function(e){return n["b"]("boss/v1.0/gateway/pushinfo/all",e)},addPushInfo:function(e){return n["b"]("boss/v1.0/gateway/pushInfo/add",e)},modifyPushInfo:function(e){return n["b"]("boss/v1.0/gateway/pushInfo/modify",e)},removePushInfo:function(e){return n["b"]("boss/v1.0/gateway/pushInfo/remove",e)},getPushStaticsInfo:function(e){return n["b"]("boss/v1.0/gateway/pushinfo/statics",e)}}},a640:function(e,t,a){"use strict";var n=a("d039");e.exports=function(e,t){var a=[][e];return!!a&&n((function(){a.call(null,t||function(){throw 1},1)}))}},ade3:function(e,t,a){"use strict";function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}a.d(t,"a",(function(){return n}))}}]);
//# sourceMappingURL=chunk-0b764b65.92155506.js.map