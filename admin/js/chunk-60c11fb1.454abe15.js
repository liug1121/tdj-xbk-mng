(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60c11fb1"],{"04d3":function(e,o,t){"use strict";var n=t("365c");o["a"]={apiCleartypesList:function(e){return n["b"]("boss/v1.0/cleartypes",e)},apiCleartypesAdd:function(e){return n["b"]("boss/v1.0/cleartypes/add",e)},apiFwAccountAdd:function(e){return n["b"]("boss/v1.0/fw/account/add",e)},apiFwAccountModify:function(e){return n["b"]("boss/v1.0/fw/account/modify",e)},apiFwAccountStatus:function(e){return n["b"]("boss/v1.0/fw/account/status",e)},apiFwAccountList:function(e){return n["b"]("boss/v1.0/fw/accounts",e)},apiPackagesList:function(e){return n["b"]("boss/v1.0/packages",e)},apiPackagesAdd:function(e){return n["b"]("boss/v1.0/packages/add",e)},apiPackagesModify:function(e){return n["b"]("boss/v1.0/packages/modify",e)},apiPackagesStop:function(e){return n["b"]("boss/v1.0/packages/stop",e)},apiPackagesTypesAdd:function(e){return n["b"]("boss/v1.0/packagetypes/add",e)},apiProductsTypes:function(e){return n["b"]("boss/v1.0/pruducttypes",e)},apiPayplansList:function(e){return n["b"]("boss/v1.0/payplans",e)},apiPayplansAdd:function(e){return n["b"]("boss/v1.0/payplans/add",e)},apiPayplansImport:function(e){return n["b"]("boss/v1.0/payplans/import",e)},apiPlansList:function(e){return n["b"]("boss/v1.0/plans",e)},apiPlansAdd:function(e){return n["b"]("boss/v1.0/plans/add",e)},apiPlansModify:function(e){return n["b"]("boss/v1.0/plans/modify",e)},apiPlansImport:function(e,o){var t=o;return n["b"]("boss/v1.0/plans/import?fwAccount=".concat(t),e,{headers:{"content-type":"multipart/form-data"}})},apiProductsList:function(e){return n["b"]("boss/v1.0/products",e)},apiProductsAdd:function(e){return n["b"]("boss/v1.0/products/add",e)},apiProvincesList:function(e){return n["a"]("boss/v1.0/provinces",e)},apiGoodsList:function(e){return n["b"]("boss/v1.0/goods",e)},apiGoodsAdd:function(e){return n["b"]("boss/v1.0/goods/add",e)},apiPackageCardfeeAdd:function(e){return n["b"]("boss/v1.0/package/cardfee/add",e)},apiPackagePayfeeAdd:function(e){return n["b"]("boss/v1.0/package/payfee/add",e)},apiGoodsModify:function(e){return n["b"]("boss/v1.0/goods/modify",e)},apiGoodsStatusModify:function(e){return n["b"]("boss/v1.0/goods/status/modify",e)}}},"365c":function(e,o,t){"use strict";t.d(o,"b",(function(){return r})),t.d(o,"a",(function(){return i}));t("d3b7");var n=t("bc3a"),a=t.n(n);a.a.defaults.timeout=5e5,a.a.defaults.headers.post["Content-Type"]="application/json",a.a.interceptors.request.use((function(e){return e.headers.token=window.sessionStorage.getItem("token"),e}),(function(e){return Promise.reject(e)})),a.a.interceptors.response.use((function(e){return e}),(function(e){return Promise.reject(e)}));var r=function(e,o){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return a.a.post(e,o,t).then((function(e){return e.data}))},i=function(e,o){return a.a.get(e,{params:o}).then((function(e){return e.data}))}},"4d38":function(e,o,t){"use strict";t.r(o);var n=function(){var e=this,o=e.$createElement,t=e._self._c||o;return t("div",{staticClass:"box_subject"},[t("el-card",{staticClass:"all_list"},[t("el-form",{ref:"queryHoneycombRef",attrs:{inline:!0},model:{value:e.queryHoneycombForm,callback:function(o){e.queryHoneycombForm=o},expression:"queryHoneycombForm"}},[t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"帐户ID"}},[t("el-input",{staticClass:"queryFormInput",attrs:{placeholder:"请输入帐户ID"},model:{value:e.queryHoneycombForm.account,callback:function(o){e.$set(e.queryHoneycombForm,"account",o)},expression:"queryHoneycombForm.account"}})],1),t("el-form-item",{staticClass:"queryFormItem",attrs:{label:"帐户名"}},[t("el-input",{staticClass:"queryFormInput",attrs:{placeholder:"请输入帐户名"},model:{value:e.queryHoneycombForm.accountName,callback:function(o){e.$set(e.queryHoneycombForm,"accountName",o)},expression:"queryHoneycombForm.accountName"}})],1),t("el-form-item",{staticClass:"queryFormItem"},[t("el-button",{attrs:{type:"primary",size:"mini",icon:"el-icon-search"},on:{click:function(o){return e.getHoneycombList()}}},[e._v("查询")])],1)],1),t("div",{staticClass:"button_content"},[t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"xbkHoneyComb-add"},expression:"{indentity:'xbkHoneyComb-add'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-plus"},on:{click:e.addHoneycombShow}},[e._v("添加")]),t("el-button",{directives:[{name:"permission",rawName:"v-permission",value:{indentity:"xbkHoneyComb-export"},expression:"{indentity:'xbkHoneyComb-export'}"}],attrs:{size:"medium",type:"primary",icon:"el-icon-download"}},[e._v("导出")])],1),t("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],attrs:{data:e.honeycombList,border:"","max-height":"550",align:"center","cell-style":{height:"38px",padding:0}}},e._l(e.table_column,(function(o,n){return t("el-table-column",{key:n,attrs:{prop:o.prop,label:o.label,width:o.width,align:"center",fixed:!!o.fixed&&o.fixed,"show-overflow-tooltip":!0},scopedSlots:e._u([{key:"default",fn:function(n){return["canLBSCL"==o.prop?t("div",[!0===n.row.canLBS?t("span",[e._v("是")]):t("span",[e._v("否")])]):e._e(),"netWorkProvinceCL"==o.prop?t("div",[!0===n.row.netWorkProvince?t("span",[e._v("是")]):t("span",[e._v("否")])]):e._e(),"statusCL"==o.prop?t("div",[0==n.row.status?t("span",[e._v("停用")]):1==n.row.status?t("span",[e._v("启用")]):t("span")]):e._e(),"operation"==o.prop?t("div",[t("el-button",{attrs:{size:"mini",type:"primary",plain:""},on:{click:function(o){return e.channelEdit(n.$index,n.row)}}},[e._v("编辑")]),1===n.row.status?t("el-button",{attrs:{size:"mini",type:"danger",plain:""},on:{click:function(o){return e.handleDelete(n.row,0)}}},[e._v("停用")]):0===n.row.status?t("el-button",{attrs:{size:"mini",type:"warning",plain:""},on:{click:function(o){return e.handleDelete(n.row,1)}}},[e._v("启用")]):e._e(),t("el-button",{attrs:{size:"mini"}},[e._v("测试")])],1):t("div",[t("div",{domProps:{innerHTML:e._s(n.row[o.prop])}})])]}}],null,!0)})})),1),t("el-pagination",{attrs:{"current-page":e.page,"page-sizes":[10,20,30],"page-size":e.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:e.total},on:{"size-change":e.handleSizeChange,"current-change":e.handleCurrentChange}})],1),t("el-dialog",{attrs:{title:e.honeycombTitle,visible:e.dialogVisible,width:"720px","before-close":e.handleClose,top:"5vh"},on:{"update:visible":function(o){e.dialogVisible=o}}},[t("el-form",{ref:"addHoneycombRef",attrs:{inline:!0,model:e.addHoneycombForm,rules:e.addHoneycombRules,"label-width":"110px"}},[t("el-form-item",{attrs:{label:"账号id",prop:"fwAccount"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入账号id"},model:{value:e.addHoneycombForm.fwAccount,callback:function(o){e.$set(e.addHoneycombForm,"fwAccount",o)},expression:"addHoneycombForm.fwAccount"}})],1),t("el-form-item",{attrs:{label:"opedId",prop:"openId"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入opedId"},model:{value:e.addHoneycombForm.openId,callback:function(o){e.$set(e.addHoneycombForm,"openId",o)},expression:"addHoneycombForm.openId"}})],1),t("el-form-item",{attrs:{label:"APP密钥",prop:"appSecret"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入APP密钥"},model:{value:e.addHoneycombForm.appSecret,callback:function(o){e.$set(e.addHoneycombForm,"appSecret",o)},expression:"addHoneycombForm.appSecret"}})],1),t("el-form-item",{attrs:{label:"APPID",prop:"appId"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入APPID"},model:{value:e.addHoneycombForm.appId,callback:function(o){e.$set(e.addHoneycombForm,"appId",o)},expression:"addHoneycombForm.appId"}})],1),t("el-form-item",{attrs:{label:"运营商id",prop:"unionAccount"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入运营商id"},model:{value:e.addHoneycombForm.unionAccount,callback:function(o){e.$set(e.addHoneycombForm,"unionAccount",o)},expression:"addHoneycombForm.unionAccount"}})],1),t("el-form-item",{attrs:{label:"LBS定位",prop:"canLBS"}},[t("el-select",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请选择LBS定位"},model:{value:e.addHoneycombForm.canLBS,callback:function(o){e.$set(e.addHoneycombForm,"canLBS",o)},expression:"addHoneycombForm.canLBS"}},e._l(e.isOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"归属地",prop:"area"}},[t("el-select",{staticStyle:{width:"217px"},attrs:{size:"small",filterable:"",clearable:"",placeholder:"请选择归属地"},model:{value:e.addHoneycombForm.area,callback:function(o){e.$set(e.addHoneycombForm,"area",o)},expression:"addHoneycombForm.area"}},e._l(e.provincesList,(function(e){return t("el-option",{key:e.provinceId,attrs:{label:e.provinceName,value:e.provinceId}})})),1)],1),t("el-form-item",{attrs:{label:"省内流量",prop:"netWorkProvince"}},[t("el-select",{staticStyle:{width:"217px"},attrs:{size:"small",clearable:"",placeholder:"请选择省内流量"},model:{value:e.addHoneycombForm.netWorkProvince,callback:function(o){e.$set(e.addHoneycombForm,"netWorkProvince",o)},expression:"addHoneycombForm.netWorkProvince"}},e._l(e.isOptions,(function(e){return t("el-option",{key:e.value,attrs:{label:e.label,value:e.value}})})),1)],1),t("el-form-item",{attrs:{label:"开户公司全称",prop:"openCompanyName"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入开户公司全称"},model:{value:e.addHoneycombForm.openCompanyName,callback:function(o){e.$set(e.addHoneycombForm,"openCompanyName",o)},expression:"addHoneycombForm.openCompanyName"}})],1),t("el-form-item",{attrs:{label:"开户公司简称",prop:"openCompanyDesc"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入开户公司简称"},model:{value:e.addHoneycombForm.openCompanyDesc,callback:function(o){e.$set(e.addHoneycombForm,"openCompanyDesc",o)},expression:"addHoneycombForm.openCompanyDesc"}})],1),t("el-form-item",{attrs:{label:"账户名称",prop:"accountName"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入账户名称"},model:{value:e.addHoneycombForm.accountName,callback:function(o){e.$set(e.addHoneycombForm,"accountName",o)},expression:"addHoneycombForm.accountName"}}),t("div",{staticClass:"sub-title",staticStyle:{"margin-top":"10px","line-height":"20px"}},[e._v("对应账户+地区+省份"),t("br"),e._v(" 例如：taojiaming-高校四-吉林")])],1),t("el-form-item",{attrs:{label:"登陆账号",prop:"account"}},[t("el-input",{staticStyle:{width:"217px"},attrs:{size:"small",placeholder:"请输入登陆账号"},model:{value:e.addHoneycombForm.account,callback:function(o){e.$set(e.addHoneycombForm,"account",o)},expression:"addHoneycombForm.account"}})],1)],1),t("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[t("el-button",{on:{click:e.closeButton}},[e._v("取 消")]),t("el-button",{attrs:{type:"primary"},on:{click:function(o){return e.uploadIt()}}},[e._v("确 定")])],1)],1)],1)},a=[],r=(t("7db0"),t("04d3")),i={name:"honeycomb",components:{},data:function(){return{honeycombList:[],page:1,pageSize:10,total:0,table_column:[{prop:"fwAccount",label:"账户ID",width:180,fixed:"left"},{prop:"openCompanyName",label:"开户公司全称",width:150},{prop:"openCompanyDesc",label:"开户公司简称",width:150},{prop:"openId",label:"openId",width:160},{prop:"unionAccount",label:"运营商账户ID",width:150},{prop:"appId",label:"APPID",width:140},{prop:"appSecret",label:"APP秘钥",width:280},{prop:"canLBSCL",label:"LBS定位",width:80},{prop:"area",label:"归属地",width:80},{prop:"netWorkProvinceCL",label:"省内流量",width:80},{prop:"account",label:"登陆账号",width:150},{prop:"accountName",label:"账户名",width:150},{prop:"date",label:"时间",width:160},{prop:"statusCL",label:"状态",width:80},{prop:"operation",label:"操作",width:210,fixed:"right"}],isOptions:[{label:"是",value:!0},{label:"否",value:!1}],provincesList:[],queryHoneycombForm:{account:null,accountName:null,page:0,pageSize:10},chooseList:{},editVisible:!1,honeycombTitle:"新增蜂窝平台账号",dialogVisible:!1,addHoneycombForm:{id:null,account:null,accountName:null,appId:null,appSecret:null,area:null,canLBS:null,fwAccount:null,netWorkProvince:null,openId:null,unionAccount:null,openCompanyName:null,openCompanyDesc:null},addHoneycombRules:{fwAccount:[{required:!0,message:"请输入账号id",trigger:"blur"}],openId:[{required:!0,message:"请输入opedId",trigger:"blur"}],unionAccount:[{required:!0,message:"请输入运营商id",trigger:"blur"}],appId:[{required:!0,message:"请输入APPID",trigger:"blur"}],appSecret:[{required:!0,message:"请输入APP密钥",trigger:"blur"}],canLBS:[{required:!0,message:"请选择定位",trigger:"blur"}],area:[{required:!0,message:"请选择归属地",trigger:"blur"}],netWorkProvince:[{required:!0,message:"请选择是否是省内流量",trigger:"blur"}],account:[{required:!0,message:"请输入登陆账号",trigger:"blur"}],accountName:[{required:!0,message:"请输入账户名称",trigger:"blur"}]},loading:!1}},mounted:function(){this.getHoneycombList(),this.username=this.$store.state.userinfo.username,this.getProvincesList()},methods:{getHoneycombList:function(){var e=this,o=this.queryHoneycombForm;this.loading=!0,r["a"].apiFwAccountList(o).then((function(o){0===o.resultCode?(e.honeycombList=o.data,e.total=o.rowNum,e.loading=!1):e.$message.error(o.resultInfo)}))},handleSizeChange:function(e){this.queryHoneycombForm.pageSize=e,this.getHoneycombList()},handleCurrentChange:function(e){this.queryHoneycombForm.page=e-1,this.getHoneycombList()},getProvincesList:function(){var e=this;r["a"].apiProvincesList().then((function(o){0===o.resultCode?e.provincesList=o.data:e.$message.error(o.resultInfo)}))},addHoneycombShow:function(){this.dialogVisible=!0,this.honeycombTitle="新增蜂窝平台账号",this.addHoneycombForm.id=null},channelEdit:function(e,o){this.dialogVisible=!0,this.honeycombTitle="编辑蜂窝平台账号",this.addHoneycombForm.id=o.id,this.addHoneycombForm.accountId=o.accountId,this.addHoneycombForm.openId=o.openId,this.addHoneycombForm.unionAccount=o.unionAccount,this.addHoneycombForm.appId=o.appId,this.addHoneycombForm.appSecret=o.appSecret,this.addHoneycombForm.canLBS=o.canLBS,this.addHoneycombForm.area=o.area,this.addHoneycombForm.netWorkProvince=o.netWorkProvince,this.addHoneycombForm.version=o.version,this.addHoneycombForm.account=o.account,this.addHoneycombForm.accountName=o.accountName,this.addHoneycombForm.fwAccount=o.fwAccount,this.addHoneycombForm.openCompanyName=o.openCompanyName,this.addHoneycombForm.openCompanyDesc=o.openCompanyDesc;var t=this.provincesList.find((function(e){return e.provinceName===o.area}));this.addHoneycombForm.area=t.provinceId},uploadIt:function(){var e=this;this.$refs.addHoneycombRef.validate((function(o){o&&(e.addHoneycombForm.id?e.editPackageSuccess():e.addHoneycombSuccess())}))},addHoneycombSuccess:function(){var e=this,o=JSON.stringify(this.addHoneycombForm);r["a"].apiFwAccountAdd(o).then((function(o){0===o.resultCode?(e.$message.success("添加成功！"),e.getHoneycombList(),e.dialogVisible=!1,e.$refs.addHoneycombRef.resetFields()):e.$message.error(o.resultInfo)}))},editPackageSuccess:function(){var e=this,o=JSON.stringify(this.addHoneycombForm);r["a"].apiFwAccountModify(o).then((function(o){0===o.resultCode?(e.$message.success("编辑成功！"),e.getHoneycombList(),e.dialogVisible=!1,e.$refs.addHoneycombRef.resetFields(),e.addHoneycombForm.id=null):e.$message.error(o.resultInfo)}))},closeButton:function(){this.dialogVisible=!1,this.$refs.addHoneycombRef.resetFields()},handleClose:function(){this.dialogVisible=!1,this.$refs.addHoneycombRef.resetFields()},handleDelete:function(e,o){var t=this;this.$confirm("您确认要此操作, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){var n={id:e.id,status:o};r["a"].apiFwAccountStatus(n).then((function(e){0===e.resultCode?(t.$message.success("停用成功！"),t.getHoneycombList()):t.$message.error(e.resultInfo)}))})).catch((function(){}))}}},s=i,c=t("2877"),l=Object(c["a"])(s,n,a,!1,null,"bed44214",null);o["default"]=l.exports},"7db0":function(e,o,t){"use strict";var n=t("23e7"),a=t("b727").find,r=t("44d2"),i="find",s=!0;i in[]&&Array(1)[i]((function(){s=!1})),n({target:"Array",proto:!0,forced:s},{find:function(e){return a(this,e,arguments.length>1?arguments[1]:void 0)}}),r(i)}}]);
//# sourceMappingURL=chunk-60c11fb1.454abe15.js.map