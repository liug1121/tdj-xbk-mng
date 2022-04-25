<template>
  <div class="box_subject">
    <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 0}" @click="tabSelect(0)">蜂窝账户配置</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 1}" @click="tabSelect(1)">公众号接入</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 2}" @click="tabSelect(2)">大流量卡产品</div>
    </div>
    <el-card class="all_list" v-if="selectedTab == 2">
      <el-form  :inline="true">
        <el-form-item label="产品编码" class="queryFormItem"  :model="queryBigflowProductForm">
          <el-input class="queryFormInput" clearable placeholder="请输入产品编码" style="width:120px" v-model="queryBigflowProductForm.productCode"></el-input>
        </el-form-item>  
        <el-form-item label="产品名称" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入产品名称" style="width:120px" v-model="queryBigflowProductForm.productName"></el-input>
        </el-form-item>  
        <el-form-item label="产品类型">
          <el-select style="width:120px;" v-model="queryBigflowProductForm.productType" clearable placeholder="请选择产品类型">
            <el-option v-for="item in bigflowProductTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用类型">
          <el-select style="width:120px;" v-model="queryBigflowProductForm.useType" clearable placeholder="请选择使用类型">
            <el-option v-for="item in bigflowProductUseTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select style="width:120px;" v-model="queryBigflowProductForm.status" clearable placeholder="请选择状态">
            <el-option v-for="item in bigflowProductsStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="okQueryBigflowProducts">查询</el-button>
      </el-form>
      <div class="button_content">
          <el-button size="medium" type="primary" @click="okShowBigflowProductAdd">添加</el-button>
      </div>
      <el-table v-loading="loading" :data="bigflowProducts" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_bigflow_product" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'opts'">
              <el-button type="text" size="small" @click="okShowBigflowProductEdit(scope.row)">编辑</el-button>
              <!-- <el-button type="text" size="small" @click="okDeleteFengwo(scope.row)">删除</el-button> -->
            </div>
            <div v-else v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleBigflowProductSizeChange" @current-change="handleBigflowProductCurrentChange" :current-page="bigflowProductPage" :page-sizes="[10,20,30]" :page-size="bigflowProductPageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="bigflowProductTotal">
      </el-pagination>
    </el-card>
    <el-card class="all_list" v-if="selectedTab == 0">
      <el-form  :inline="true">
        <el-form-item label="账户名" class="queryFormItem"  :model="queryFengwoForm">
          <el-input class="queryFormInput" clearable placeholder="请输入账户名" style="width:150px" v-model="queryFengwoForm.account"></el-input>
        </el-form-item>  
        <el-form-item label="账户id" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入账户id" style="width:150px" v-model="queryFengwoForm.accountId"></el-input>
        </el-form-item>  
        <el-button size="medium" type="primary" icon="el-icon-search" @click="okQueryFengwo">查询</el-button>
      </el-form>
      <div class="button_content">
          <el-button size="medium" type="primary" @click="okShowFengwoAdd">添加</el-button>
    </div>
      <el-table v-loading="loading" :data="fengwoConfigs" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_fengwo" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'opts'">
              <el-button type="text" size="small" @click="okShowFengwoEdit(scope.row)">编辑</el-button>
              <el-button type="text" size="small" @click="okDeleteFengwo(scope.row)">删除</el-button>
            </div>
            <div v-else v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleFengwoSizeChange" @current-change="handleFengwoCurrentChange" :current-page="fengwoPage" :page-sizes="[10,20,30]" :page-size="fengwoPageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="fengwoTotal">
      </el-pagination>
    </el-card>
    <el-card class="all_list" v-if="selectedTab == 1">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="接入码" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入接入码" style="width:150px" v-model="id"></el-input>
        </el-form-item>  
        <el-form-item label="名称" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入名称" style="width:150px" v-model="name"></el-input>
        </el-form-item>  
        <el-form-item label="APPID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输APPID" style="width:150px" v-model="appId"></el-input>
        </el-form-item>  
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryAccessWechats">查询</el-button>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowAccessWechat-add'}" disabled>添加</el-button>
      </div>
      <!-- 列表区域 -->
      <!-- <div class="cardNos">
        <div class="cardNosList">
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div> -->
      <el-table  :data="accessWechats" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="添加蜂窝帐号" :visible.sync="addFengwoDlgShow" width="430px" @close="addFengwoDlgShow = false">
        <!-- 内容主体区域 -->
        <el-form :model="addFengwoForm" ref="addFormRef" label-width="90px">
          <el-form-item label="账户ID">
            <el-input style="width:250px;" v-model="addFengwoForm.accountId" placeholder="请输入账户id"></el-input>
          </el-form-item>
          <el-form-item label="OPENID">
            <el-input style="width:250px;" v-model="addFengwoForm.openId" placeholder="请输入账户openId"></el-input>
          </el-form-item>
          <el-form-item label="APPID">
            <el-input style="width:250px;" v-model="addFengwoForm.appId" placeholder="请输入账户APPID"></el-input>
          </el-form-item>
          <el-form-item label="APP密钥">
            <el-input style="width:250px;" v-model="addFengwoForm.appSecret" placeholder="请输入账户APP密钥"></el-input>
          </el-form-item>
          <el-form-item label="运营商帐号">
            <el-input style="width:250px;" v-model="addFengwoForm.cmpCarrierNo" placeholder="请输入运营商帐号ID"></el-input>
          </el-form-item>
          <el-form-item label="LBS定位">
            <el-select style="width:250px;" v-model="addFengwoForm.addrFun" placeholder="请选择LBS定位">
              <el-option v-for="item in lbsAddrFuns" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属地">
            <el-select style="width:250px;" v-model="addFengwoForm.province" placeholder="请选择归属地">
              <el-option v-for="item in provinces" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省内流量">
            <el-select style="width:250px;" v-model="addFengwoForm.localFlow" placeholder="请选择是否省内流量">
              <el-option v-for="item in flowTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登陆帐号">
            <el-input style="width:250px;" v-model="addFengwoForm.loginAccountId" placeholder="请输入登录帐号"></el-input>
          </el-form-item>
          <el-form-item label="账户名">
            <el-input style="width:250px;" v-model="addFengwoForm.accountName" placeholder="请输入登录帐号"></el-input>
          </el-form-item>
          <el-form-item label="版本">
            <el-input style="width:250px;" v-model="addFengwoForm.version" placeholder="请输入版本号"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addFengwoDlgShow = false">取 消</el-button>
          <el-button type="primary" @click="okAddFengwo">确 定</el-button>
        </span>
      </el-dialog>
      <el-dialog title="编辑蜂窝帐号" :visible.sync="editFengwoDlgShow" width="430px" @close="editFengwoDlgShow = false">
        <!-- 内容主体区域 -->
        <el-form :model="editFengwoForm" label-width="90px">
          <!-- <el-form-item label="账户ID" prop="accountId">
            <el-input style="width:250px;" v-model="editFengwoForm.accountId" placeholder="请输入账户id"></el-input>
          </el-form-item> -->
          <el-form-item label="OPENID">
            <el-input style="width:250px;" v-model="editFengwoForm.openId" placeholder="请输入账户openId"></el-input>
          </el-form-item>
          <el-form-item label="APPID">
            <el-input style="width:250px;" v-model="editFengwoForm.appId" placeholder="请输入账户APPID"></el-input>
          </el-form-item>
          <el-form-item label="APP密钥">
            <el-input style="width:250px;" v-model="editFengwoForm.appSecret" placeholder="请输入账户APP密钥"></el-input>
          </el-form-item>
          <el-form-item label="运营商帐号">
            <el-input style="width:250px;" v-model="editFengwoForm.cmpCarrierNo" placeholder="请输入运营商帐号ID"></el-input>
          </el-form-item>
          <el-form-item label="LBS定位">
            <el-select style="width:250px;" v-model="editFengwoForm.addrFun" placeholder="请选择LBS定位">
              <el-option v-for="item in lbsAddrFuns" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="归属地">
            <el-select style="width:250px;" v-model="editFengwoForm.province" placeholder="请选择归属地">
              <el-option v-for="item in provinces" :key="item.value" :label="item.name" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="省内流量">
            <el-select style="width:250px;" v-model="editFengwoForm.localFlow" placeholder="请选择是否省内流量">
              <el-option v-for="item in flowTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="登陆帐号">
            <el-input style="width:250px;" v-model="editFengwoForm.loginAccountId" placeholder="请输入登录帐号"></el-input>
          </el-form-item>
          <el-form-item label="账户名">
            <el-input style="width:250px;" v-model="editFengwoForm.accountName" placeholder="请输入登录帐号"></el-input>
          </el-form-item>
          <el-form-item label="版本">
            <el-input style="width:250px;" v-model="editFengwoForm.version" placeholder="请输入版本号"></el-input>
          </el-form-item>
          <el-form-item label="连通性测试">
            <el-input style="width:250px;" v-model="editFengwoForm.testIccid" placeholder="请输入要测试的iccid"></el-input>
            <div @click="testFengwoAccount">点击测试</div>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editFengwoDlgShow = false">取 消</el-button>
          <el-button type="primary" @click="okEditFengwo">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="维护产品" :visible.sync="bigflowProductDlgShow" width="430px" @close="bigflowProductDlgShow = false">
        <!-- 内容主体区域 -->
        <el-form :model="addBigflowProductForm" label-width="90px">
          <el-form-item label="产品名">
            <el-input style="width:250px;" v-model="addBigflowProductForm.productName" placeholder="请输入产品名"></el-input>
          </el-form-item>
          <el-form-item label="显示名">
            <el-input style="width:250px;" v-model="addBigflowProductForm.viewName" placeholder="请输入显示名"></el-input>
          </el-form-item>
          <el-form-item label="产品编码">
            <el-input style="width:250px;" v-model="addBigflowProductForm.productCode" placeholder="请输入产品编码"></el-input>
          </el-form-item>
          <el-form-item label="产品类型">
            <el-select style="width:120px;" v-model="addBigflowProductForm.productType" clearable placeholder="请选择产品类型" @change="productTypeChange"> 
              <el-option v-for="item in bigflowProductTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="有效天数" v-if="addBigflowProductForm.productType=='daymeal'">
            <el-input style="width:250px;" v-model="addBigflowProductForm.days" placeholder="请输入有效天数" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="产品有效期(月)" v-if="productTypeSelected == 'setmeal'">
            <el-input style="width:250px;" v-model="addBigflowProductForm.expireTime" placeholder="请输入原始价" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="清零周期(月)" v-if="productTypeSelected == 'setmeal_q'">
            <el-input style="width:250px;" v-model="addBigflowProductForm.useExpire" placeholder="请输入原始价" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <!-- <el-form-item label="原始价">
            <el-input style="width:250px;" v-model="addBigflowProductForm.originalPrice" placeholder="请输入原始价" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item> -->
          <el-form-item label="使用类型">
            <el-select style="width:120px;" v-model="addBigflowProductForm.useType" clearable placeholder="请选择使用类型">
              <el-option v-for="item in bigflowProductUseTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="清算方式" v-if="addBigflowProductForm.productType!='daymeal'">
            <el-select style="width:120px;" v-model="addBigflowProductForm.clearType" clearable placeholder="请选择用量清算方式">
              <el-option v-for="item in clearTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="用量区域">
            <el-select style="width:120px;" v-model="addBigflowProductForm.zone" clearable placeholder="请选择用量区域">
              <el-option v-for="item in zoonTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="原始价">
            <el-input style="width:250px;" v-model="addBigflowProductForm.originalPrice" placeholder="请输入原始价" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="销售价">
            <el-input style="width:250px;" v-model="addBigflowProductForm.price" placeholder="请输入销售价" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="高速用量(M)">
            <el-input style="width:250px;" v-model="addBigflowProductForm.highUse" placeholder="请输入高速用量（M）" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="中速用量(M)">
            <el-input style="width:250px;" v-model="addBigflowProductForm.mediumUse" placeholder="请输入中速用量（M）" onkeyup="value=value.replace(/[^?\d.]/g,'')"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-select style="width:120px;" v-model="addBigflowProductForm.status" clearable placeholder="请选择状态">
              <el-option v-for="item in bigflowProductsStatus" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="产品说明">
            <el-input style="width:250px;" v-model="addBigflowProductForm.memo" placeholder="请输入产品说明"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="bigflowProductDlgShow = false">取 消</el-button>
          <el-button type="primary" @click="okBigflowProduct">确 定</el-button>
        </span>
      </el-dialog>
      <el-main class="el-loading" v-loading="loading" element-loading-background="transparent"
        element-loading-text="加载中" > 
    </el-main>
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
    bigflowProductDlgType:'add',
    productTypeSelected:'',
    addBigflowProductForm:{},
    bigflowProductDlgShow:false,
    bigflowProducts:[],
    queryBigflowProductForm:{},
    editFengwoDlgShow:false,
    editFengwoForm:{
      accountId:null,
      openId: null,
      appId: null,
      appSecret: null,
      cmpCarrierNo: null,
      addrFun: null,
      province: null,
      localFlow: null,
      loginAccountId: null,
      accountName: null,
      version: null,
      id: null},
    addFengwoForm:[],
    addFengwoDlgShow:false,
    fengwoConfigs:[],
    queryFengwoForm:{},
    selectedTab:0,
    loading: false,
    accessWechats:[],
    id:'',
    name:'',
    appId:'',
    fengwoPage:1,
    bigflowProductPage:1,
    bigflowProductPageSize:10,
    fengwoPageSize:10,
      page: 1,
      pageSize: 10,
      // 列表总条数
      fengwoTotal:0,
      bigflowProductTotal:0,
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'id', label: '接入码', width: 100, sortable: true },
        { prop: 'name', label: '名称', width: 100, sortable: true },
        { prop: 'status', label: '类型', width: 80, sortable: true },
        { prop: 'appId', label: 'AppId', width: 280, sortable: true },
        { prop: 'mchId', label: '商户ID', width: 180, sortable: true },
        { prop: 'status', label: '状态', width: 80, sortable: true },
        { prop: 'memo', label: '备注说明', width: 300, sortable: true }
      ],
      table_column_fengwo:[
        { prop: 'accountId', label: '账户ID', width: 100, sortable: true },
        { prop: 'openId', label: 'openId', width: 100, sortable: true },
        { prop: 'cmpCarrierNo', label: '运营商ID', width: 100, sortable: true },
        { prop: 'appId', label: 'APPID', width: 100, sortable: true },
        { prop: 'appSecret', label: 'APP密钥', width: 100, sortable: true },
        { prop: 'addrFun', label: 'LBS定位', width: 50, sortable: true },
        { prop: 'provinceName', label: '归属地', width: 100, sortable: true },
        { prop: 'localFlow', label: '省内流量', width: 50, sortable: true },
        { prop: 'loginAccountId', label: '登录帐号', width: 100, sortable: true },
        { prop: 'accountName', label: '账户名', width: 100, sortable: true },
        { prop: 'gmtCreate', label: '时间', width: 100, sortable: true },
        { prop: 'opts', label: '操作', width: 100, sortable: true }
      ],
      table_column_bigflow_product:[
        { prop: 'productCode', label: '产品编码', width: 100, sortable: true },
        { prop: 'productName', label: '产品名', width: 100, sortable: true },
        { prop: 'viewName', label: '显示名', width: 100, sortable: true },
        { prop: 'originalPrice', label: '原始价', width: 80, sortable: true },
        { prop: 'price', label: '销售价', width: 80, sortable: true },
        { prop: 'highUseName', label: '高速用量', width: 100, sortable: true },
        { prop: 'mediumUseName', label: '中速用量', width: 100, sortable: true },
        { prop: 'productTypeName', label: '产品类型', width: 100, sortable: true },
        { prop: 'useTypeName', label: '使用类型', width: 50, sortable: true },
        { prop: 'useExpire', label: '用量清零周期', width: 50, sortable: true },
        { prop: 'expireTime', label: '产品有效期', width: 50, sortable: true },
        { prop: 'statusName', label: '状态', width: 50, sortable: true },
        { prop: 'clearTypeName', label: '用量清算周期', width: 50, sortable: true },
        { prop: 'zoneName', label: '用量区域', width: 50, sortable: true },
        // { prop: 'gmtCreate', label: '创建时间', width: 100, sortable: true },
        { prop: 'memo', label: '产品说明', width: 100, sortable: true },
        { prop: 'opts', label: '操作', width: 100, sortable: true }
      ],
      lbsAddrFuns:[
        { name: "是", id: 'true' },
        { name: "否", id: 'false' }],
      provinces:[{ name: "11", id: '11' }],
      flowTypes:[
        { name: "是", id: 'true' },
        { name: "否", id: 'false' }],
      bigflowProductTypes:[
        { name: "自然日套餐", id: 'daymeal' },
        { name: "月套餐", id: 'setmeal' },
        { name: "包量套餐", id: 'setmeal_q' },
        { name: "首月赠送套餐", id: 'givesetmeal' },
        { name: "加油包", id: 'incrementpackage' },
      ],
      bigflowProductUseTypes:[
        { name: "卡", id: 'card' },
        { name: "卡池", id: 'pool' }
      ],
      bigflowProductsStatus:[
        { name: "上架状态", id: '1' },
        { name: "上架不显示", id: '3' },
        { name: "下架状态", id: '2' }
      ],
      clearTypes:[
        { name: "自然月", id: 'month' },
        { name: "27号", id: '27' },
        { name: "自然日", id: 'day' },
      ],
      zoonTypes:[
        { name: "省内", id: 'province' },
        { name: "全国", id: 'all' }
      ]
      
    };
  },
  mounted () {

  },
  created(){
      this.queryAccessWechats()
      this.queryFengwo()
      this.getFengwoProvince()
      this.getProducts()
  },
  watch: {},
  methods: {
    productTypeChange:function(productType) {
      this.productTypeSelected = productType
    },
    okBigflowProduct:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        if(this.addBigflowProductForm.productName == undefined || this.addBigflowProductForm.productName == null || this.addBigflowProductForm.productName == ''){
          this.$message.error('产品名不能为空')
          return
        }
        if(this.addBigflowProductForm.viewName == undefined || this.addBigflowProductForm.viewName == null || this.addBigflowProductForm.viewName == ''){
          this.$message.error('显示名不能为空')
          return
        }
        if(this.addBigflowProductForm.productType == undefined || this.addBigflowProductForm.productType == null || this.addBigflowProductForm.productType == ''){
          this.$message.error('产品类型不能为空')
          return
        }
        
        if(this.addBigflowProductForm.useExpire == undefined || this.addBigflowProductForm.useExpire == null || this.addBigflowProductForm.useExpire == ''){
          if(this.productTypeSelected == 'setmeal_q'){
            this.$message.error('清零周期不能为空')
            return
          }
        }
        if(this.addBigflowProductForm.expireTime == undefined || this.addBigflowProductForm.expireTime == null || this.addBigflowProductForm.expireTime == ''){
          if(this.productTypeSelected == 'setmeal'){
            this.$message.error('产品有效期不能为空')
            return
          }
          
        }
        if(this.addBigflowProductForm.useType == undefined || this.addBigflowProductForm.useType == null || this.addBigflowProductForm.useType == ''){
          this.$message.error('使用类型不能为空')
          return
        }
        if(this.addBigflowProductForm.productType=='daymeal'){
          this.addBigflowProductForm.clearType ='day'
        }
        if(this.addBigflowProductForm.clearType == undefined || this.addBigflowProductForm.clearType == null || this.addBigflowProductForm.clearType == ''){
          this.$message.error('用量清算方式不能为空')
          return
        }
        if(this.addBigflowProductForm.originalPrice == undefined || this.addBigflowProductForm.originalPrice == null || this.addBigflowProductForm.originalPrice == ''){
          this.$message.error('原始价格不能为空')
          return
        }
        if(this.addBigflowProductForm.price == undefined || this.addBigflowProductForm.price == null || this.addBigflowProductForm.price == ''){
          this.$message.error('销售价格不能为空')
          return
        }
        if(this.addBigflowProductForm.highUse == undefined || this.addBigflowProductForm.highUse == null || this.addBigflowProductForm.highUse == ''){
          this.$message.error('高速用量不能为空')
          return
        }
        if(this.addBigflowProductForm.mediumUse == undefined || this.addBigflowProductForm.mediumUse == null || this.addBigflowProductForm.mediumUse == ''){
          this.$message.error('中速用量不能为空')
          return
        }
        if(this.addBigflowProductForm.status == undefined || this.addBigflowProductForm.status == null || this.addBigflowProductForm.status == ''){
          this.$message.error('中速用量不能为空')
          return
        }
        if(this.addBigflowProductForm.productType=='daymeal' && 
        (this.addBigflowProductForm.days == undefined || this.addBigflowProductForm.days == null || this.addBigflowProductForm.days == '')){
          this.$message.error('自然日套餐，有效期天数不能为空')
          return
        }

        console.log(JSON.stringify(this.addBigflowProductForm))
        params.productName =this.addBigflowProductForm.productName
        params.viewName =this.addBigflowProductForm.viewName
        params.productCode =this.addBigflowProductForm.productCode
        params.productType =this.addBigflowProductForm.productType
        params.useType =this.addBigflowProductForm.useType
        params.clearType =this.addBigflowProductForm.clearType
        params.zone =this.addBigflowProductForm.zone
        params.originalPrice =this.addBigflowProductForm.originalPrice
        params.price =this.addBigflowProductForm.price
        params.highUseM = this.addBigflowProductForm.highUse
        params.status =this.addBigflowProductForm.status
        params.memo =this.addBigflowProductForm.memo
        params.mediumUseM = this.addBigflowProductForm.mediumUse
        params.expireTime =this.addBigflowProductForm.expireTime
        params.useExpire =this.addBigflowProductForm.useExpire
        params.days = this.addBigflowProductForm.days
        if(this.bigflowProductDlgType == 'add'){
          apiBigflow.addProducts(params).then(res=>{
              if(res.resultCode == 0){
                  that.queryFengwo()
                  this.$message.success('添加成功')
                  this.bigflowProductDlgShow = false
                  this.getProducts()
              }else{
                  this.$message.error('添加失败')
              }
          })
        }else if(this.bigflowProductDlgType == 'edit'){
          console.log(JSON.stringify(this.addBigflowProductForm))
          params.id = this.addBigflowProductForm.id
          apiBigflow.modifyProducts(params).then(res=>{
              if(res.resultCode == 0){
                  that.queryFengwo()
                  this.$message.success('添加成功')
                  this.bigflowProductDlgShow = false
                  this.getProducts()
              }else{
                  this.$message.error('添加失败')
              }
          })
        }
        
      }).catch(() => {
      })
    },
    okShowBigflowProductAdd:function(){
      this.bigflowProductDlgType = 'add'
      this.bigflowProductDlgShow = true
    },
    getProducts:function(){
      let params = {}
      params.page = this.bigflowProductPage
      params.productCode = this.queryBigflowProductForm.productCode
      params.productNameLike = this.queryBigflowProductForm.productName
      params.productType = this.queryBigflowProductForm.productType
      params.useType = this.queryBigflowProductForm.useType
      params.status = this.queryBigflowProductForm.status
      apiBigflow.getProducts(params).then(res=>{
          if(res.resultCode == 0){
              this.bigflowProducts = res.data
              this.bigflowProductTotal = res.rowNum
          }else{
              this.$message.success('查询平台产品失败')
          }
      })
    },

    // 
    okQueryBigflowProducts:function(){
      this.getProducts()
    },
    getFengwoProvince:function(){
      let params = {}
      apiBigflow.getFengwoProvinces(params).then(res=>{
          if(res.resultCode == 0){
              this.provinces = res.data
          }else{
              this.$message.success('查询蜂窝帐号归属省份配置失败')
          }
      })
    },
    okDeleteFengwo:function(row){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.accountId = row.accountId
        apiBigflow.removeFengwoConfigs(params).then(res=>{
          if(res.resultCode == 0){
              that.queryFengwo()
              this.$message.success('删除成功')
          }else{
              this.$message.success('删除失败')
          }
      })
      }).catch(() => {
      });
    },
    okShowBigflowProductEdit:function(row){
      this.bigflowProductDlgType = 'edit'
      this.bigflowProductDlgShow = true
      this.addBigflowProductForm = row
    },
    okShowFengwoEdit:function(row){
      this.editFengwoForm.id = row.id
      this.editFengwoForm.accountId = row.accountId
      this.editFengwoForm.openId = row.openId
      this.editFengwoForm.appId = row.appId
      this.editFengwoForm.appSecret = row.appSecret
      this.editFengwoForm.cmpCarrierNo = row.cmpCarrierNo
      this.editFengwoForm.addrFun = row.addrFun
      this.editFengwoForm.province = row.province
      this.editFengwoForm.localFlow = row.localFlow
      this.editFengwoForm.loginAccountId = row.loginAccountId
      this.editFengwoForm.accountName = row.accountName
      this.editFengwoForm.version = row.version
      this.editFengwoDlgShow = true
    },
    testFengwoAccount:function(){
      let params = {}
      params.openId = this.editFengwoForm.openId
      params.appId = this.editFengwoForm.appId
      params.secret = this.editFengwoForm.appSecret
      params.iccid = this.editFengwoForm.testIccid
      params.version = this.editFengwoForm.version
      apiBigflow.testFengwoAccount(params).then(res=>{
          if(res.resultCode == 0){
              this.$message.success(res.data)
          }else{
              this.$message.success('测试失败')
          }
      })
    },
    okEditFengwo:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
  if(this.editFengwoForm.accountId == undefined || this.editFengwoForm.accountId == null || this.editFengwoForm.accountId == ''){
    this.$message.error('蜂窝帐号id不能为空')
    return
  }
  if(this.editFengwoForm.openId == undefined || this.editFengwoForm.openId == null || this.editFengwoForm.openId == ''){
    this.$message.error('openid不能为空')
    return
  }
  if(this.editFengwoForm.appId == undefined || this.editFengwoForm.appId == null || this.editFengwoForm.appId == ''){
    this.$message.error('appId不能为空')
    return
  }
  if(this.editFengwoForm.appSecret == undefined || this.editFengwoForm.appSecret == null || this.editFengwoForm.appSecret == ''){
    this.$message.error('app密钥不能为空')
    return
  }
  if(this.editFengwoForm.cmpCarrierNo == undefined || this.editFengwoForm.cmpCarrierNo == null || this.editFengwoForm.cmpCarrierNo == ''){
    this.$message.error('运营商帐号不能为空')
    return
  }
  if(this.editFengwoForm.addrFun == undefined || this.editFengwoForm.addrFun == null || this.editFengwoForm.addrFun == ''){
    this.$message.error('lbs定位类型不能为空')
    return
  }
  if(this.editFengwoForm.province == undefined || this.editFengwoForm.province == null || this.editFengwoForm.province == ''){
    this.$message.error('归属地不能为空')
    return
  }
  if(this.editFengwoForm.localFlow == undefined || this.editFengwoForm.localFlow == null || this.editFengwoForm.localFlow == ''){
    this.$message.error('是否省内流量不能为空')
    return
  }
  if(this.editFengwoForm.loginAccountId == undefined || this.editFengwoForm.loginAccountId == null || this.editFengwoForm.loginAccountId == ''){
    this.$message.error('登陆帐号不能为空')
    return
  }
  if(this.editFengwoForm.accountName == undefined || this.editFengwoForm.accountName == null || this.editFengwoForm.accountName == ''){
    this.$message.error('登陆名不能为空')
    return
  }
      let params = {}
      params.id = this.editFengwoForm.id
      params.accountId = this.editFengwoForm.accountId
      params.openId = this.editFengwoForm.openId
      params.appId = this.editFengwoForm.appId
      params.appSecret = this.editFengwoForm.appSecret
      params.cmpCarrierNo = this.editFengwoForm.cmpCarrierNo
      params.addrFun = this.editFengwoForm.addrFun
      params.province = this.editFengwoForm.province
      params.localFlow = this.editFengwoForm.localFlow
      params.loginAccountId = this.editFengwoForm.loginAccountId
      params.accountName = this.editFengwoForm.accountName
      params.version = this.editFengwoForm.version
      apiBigflow.modifyFengwoConfigs(params).then(res=>{
          if(res.resultCode == 0){
              that.queryFengwo()
              that.editFengwoDlgShow = false
              this.$message.success('修改成功')
          }else{
              this.$message.success('修改失败')
          }
      })
      }).catch(() => {
      });
    },
    okAddFengwo:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
  if(this.addFengwoForm.accountId == undefined || this.addFengwoForm.accountId == null || this.addFengwoForm.accountId == ''){
    this.$message.error('蜂窝帐号id不能为空')
    return
  }
  if(this.addFengwoForm.openId == undefined || this.addFengwoForm.openId == null || this.addFengwoForm.openId == ''){
    this.$message.error('openid不能为空')
    return
  }
  if(this.addFengwoForm.appId == undefined || this.addFengwoForm.appId == null || this.addFengwoForm.appId == ''){
    this.$message.error('appId不能为空')
    return
  }
  if(this.addFengwoForm.appSecret == undefined || this.addFengwoForm.appSecret == null || this.addFengwoForm.appSecret == ''){
    this.$message.error('app密钥不能为空')
    return
  }
  if(this.addFengwoForm.cmpCarrierNo == undefined || this.addFengwoForm.cmpCarrierNo == null || this.addFengwoForm.cmpCarrierNo == ''){
    this.$message.error('运营商帐号不能为空')
    return
  }
  if(this.addFengwoForm.addrFun == undefined || this.addFengwoForm.addrFun == null || this.addFengwoForm.addrFun == ''){
    this.$message.error('lbs定位类型不能为空')
    return
  }
  if(this.addFengwoForm.province == undefined || this.addFengwoForm.province == null || this.addFengwoForm.province == ''){
    this.$message.error('归属地不能为空')
    return
  }
  if(this.addFengwoForm.localFlow == undefined || this.addFengwoForm.localFlow == null || this.addFengwoForm.localFlow == ''){
    this.$message.error('是否省内流量不能为空')
    return
  }
  if(this.addFengwoForm.loginAccountId == undefined || this.addFengwoForm.loginAccountId == null || this.addFengwoForm.loginAccountId == ''){
    this.$message.error('登陆帐号不能为空')
    return
  }
  if(this.addFengwoForm.accountName == undefined || this.addFengwoForm.accountName == null || this.addFengwoForm.accountName == ''){
    this.$message.error('登陆名不能为空')
    return
  }
      let params = {}
      params.accountId = this.addFengwoForm.accountId
      params.openId = this.addFengwoForm.openId
      params.appId = this.addFengwoForm.appId
      params.appSecret = this.addFengwoForm.appSecret
      params.cmpCarrierNo = this.addFengwoForm.cmpCarrierNo
      params.addrFun = this.addFengwoForm.addrFun
      params.province = this.addFengwoForm.province
      params.localFlow = this.addFengwoForm.localFlow
      params.loginAccountId = this.addFengwoForm.loginAccountId
      params.accountName = this.addFengwoForm.accountName
      params.version = this.addFengwoForm.version
      apiBigflow.addFengwoConfigs(params).then(res=>{
          if(res.resultCode == 0){
              that.queryFengwo()
              that.addFengwoDlgShow = false
              this.$message.success('添加成功')
          }else{
              this.$message.success('添加失败')
          }
      })
      }).catch(() => {
      });
    },
    okShowFengwoAdd:function(){
      this.addFengwoDlgShow = true
    },
    okQueryFengwo:function(){
      this.queryFengwo()
    },
    queryFengwo:function(){
      this.loading = true
        let params = {}
        params.accountNameLike = this.queryFengwoForm.account
        params.accountId = this.queryFengwoForm.accountId
        params.page = this.fengwoPage
        apiBigflow.getFengwoConfigs(params).then(res=>{
            if(res.resultCode == 0){
                this.fengwoConfigs = res.data
                this.fengwoTotal = res.rowNum
                this.loading = false
            }
        })
    },
    tabSelect:function(tabType){
      this.selectedTab = tabType
    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryAccessWechats:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        if(this.id != '')
            params.channelId = this.id
        if(this.name != '')
            params.name = this.name
        if(this.appId != '')
            params.appId = this.appId
        apiBigflow.getAccessWechats(params).then(res=>{
            if(res.resultCode == 0){
                this.accessWechats = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryAccessWechats()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryAccessWechats()
    },
    handleBigflowProductSizeChange:function(newPage){
      this.bigflowProductPage = newPage
      this.getProducts()
    },
    handleFengwoSizeChange:function(newPage){
      this.fengwoPage = newPage
      this.queryFengwo()
    },
    handleBigflowProductCurrentChange:function(newPage){
      this.bigflowProductPage = newPage
      this.getProducts()
    },
    handleFengwoCurrentChange :function(newPage){
      this.fengwoPage = newPage
      this.queryFengwo()
    }
  }
};
</script>
<style scoped>
.tree-tab-unselected {
  display:inline-block;
  background:silver;
  color:white;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  border-radius:5px;
  width: 100px;
  font-size: 5px;
  text-align: center;
  color:#145297;
  background-color: transparent;
  border-color: transparent;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
.el-button {
  color:#145297;
    background-color: transparent;
    border-color: transparent;
}
</style>
