<template>
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 0}" @click="tabSelect(0)">库存分配</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 1}" @click="tabSelect(1)">大流量卡渠道产品</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':selectedTab == 2}" @click="tabSelect(2)">出账规则管理</div>
        </div>
        <el-card v-if="selectedTab == 2">
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showAddFlowPool">添加规则</el-button>
          </div>
          <el-table v-loading="loading" :data="channelBillingFeeConfigs" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column_channelBillingFeeConfig" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" >
              <template slot-scope="scope">
                    <div v-if="p.prop == 'opts'">
                      <el-button type="text" size="small" @click="okEditChannelFeeConfig(scope.row)">编辑</el-button>
                      <el-button type="text" size="small" @click="okRemoveChannelFeeConfig(scope.row)">删除</el-button>
                    </div>
                    <div v-else v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-card v-if="selectedTab == 1">
          <el-form :inline="true" ref="queryChannelRef" :model="queryChannelProductForm">
              <el-form-item label="产品编码">
                <el-input style="width:300px;" v-model="queryChannelProductForm.productCode" placeholder="请输入产品编码" ></el-input>
              </el-form-item>
              <el-button size="medium" type="primary" @click="queryChannelProducts">查询</el-button>
          </el-form>
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showProductDlg = true">添加</el-button>
          </div>
          <el-table v-loading="loading" :data="channelProducts" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column_product" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" >
              <template slot-scope="scope">
                  <div v-if="p.prop == 'channelName'">
                    <span>{{selectedChannelName}}</span>
                  </div>
                  <div v-else>
                      <div v-if="p.prop == 'opts'">
                        <!-- @click="okShowBigflowProductEdit(scope.row)" -->
                        
                        <el-button type="text" size="small" v-if="scope.row.statusName == '下架状态'" @click="okChangeProductStatus(scope.row, 0)">上架</el-button>
                        <el-button type="text" size="small" v-if="scope.row.statusName == '上架状态'" @click="okChangeProductStatus(scope.row, 1)">下架</el-button>
                        <el-button type="text" size="small" @click="okRemoveProduct(scope.row)">删除</el-button>
                        <!-- <el-button type="text" size="small" @click="okDeleteFengwo(scope.row)">删除</el-button> -->
                      </div>
                      <div v-else v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
          <el-pagination @size-change="handleProductSizeChange" @current-change="handleProductCurrentChange" :current-page="productPage" :page-sizes="[10,20,30]" :page-size="productPageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="productTotal">
            </el-pagination>
        </el-card>
        <el-card v-if="selectedTab == 0">
          <el-form :inline="true" ref="queryChannelRef" :model="queryChannelCardForm">
              <el-form-item label="ICCID">
                <el-input style="width:300px;" v-model="queryChannelCardForm.iccid" placeholder="请输入iccid" ></el-input>
              </el-form-item>
              <el-form-item label="卡号码">
                <el-input style="width:300px;" v-model="queryChannelCardForm.phone" placeholder="请输入iccid" ></el-input>
              </el-form-item>
              <el-form-item label="卡状态">
                  <el-select 
                    filterable
                    clearable
                    reserve-keyword
                    placeholder="请选择卡状态" v-model="queryChannelCardForm.status">
                        <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                <!-- <el-input style="width:300px;" v-model="queryChannelCardForm.status" placeholder="请输入卡状态" ></el-input> -->
              </el-form-item>
              <el-button size="medium" type="primary" @click="queryChannelCards">查询</el-button>
          </el-form>
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" >分配渠道</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showDistrubuteBetween">首尾分配渠道</el-button>
          </div>
          <el-table v-loading="loading" :data="channelStocks" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                  <div v-if="p.prop == 'channelName'">
                    <span>{{selectedChannelName}}</span>
                  </div>
                  <div v-else>
                      <div v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
           <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
      </el-col>
    </el-row>
    <el-dialog title="渠道分配" :visible.sync="showDistrubuteDlg" width="500px" @close="hideDistrubuteBetween">
      <el-form :model="distrubuteForm"  label-width="130px">
          <el-form-item label="分配渠道">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入父渠道" v-model="distrubuteForm.channelId">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.name" :value="item.channelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首ICCID（19位）">
          <el-input style="width:300px;"  v-model="distrubuteForm.iccidStart" placeholder="请输入首ICCID" ></el-input>
        </el-form-item>
        <el-form-item label="尾ICCID（19位）">
          <el-input style="width:300px;"  v-model="distrubuteForm.iccidEnd" placeholder="请输入联系人尾ICCID" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）注意：请输入19位数的ICCID，每次分配不能超过2万张卡</p>

          <p>2）系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行分配渠道</p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDistrubuteBetween">取 消</el-button>
        <el-button type="primary" @click="okDistrubuteBetween">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="新增大流量产品" :visible.sync="showProductDlg" width="500px" @close="showProductDlg = false">
      <el-form :model="productForm"  label-width="130px"> 
          <el-form-item label="产品名">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入产品名" v-model="productForm.productCode">
            <el-option v-for="item in productCodes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="产品状态">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入产品状态" v-model="productForm.status">
            <el-option v-for="item in productStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showProductDlg = false">取 消</el-button>
        <el-button type="primary" @click="okAddChannelProduct">确 定</el-button>
      </span>  
    </el-dialog>
    <el-dialog title="渠道出账管理" :visible.sync="showChannelFeeConfigDlg" width="500px" @close="showChannelFeeConfigDlg = false">
      <el-form :model="channelBillingConfigForm"  label-width="130px"> 
        <el-form-item label="流量出账类型">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入出账类型" v-model="channelBillingConfigForm.payType">
            <el-option v-for="item in payTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省内单价(元/G)" >
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.provinceUnitPrice" placeholder="请输入省内流量单价" ></el-input>
        </el-form-item>
        <el-form-item label="全国单价(元/G)">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.countryUnitPrice" placeholder="请输入全国流量单价" ></el-input>
        </el-form-item>
        <el-form-item label="卡费出账类型">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入出账类型卡费出账类型" v-model="channelBillingConfigForm.cardFeePayType">
            <el-option v-for="item in cardFeePayTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开始月数">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.cardFeeMonthFrom" placeholder="请输入开始月数" ></el-input>
        </el-form-item>
        <el-form-item label="总月数">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^?\d.]/g,'')" v-model="channelBillingConfigForm.cardFeeMonths" placeholder="请输入总月数" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChannelFeeConfigDlg = false">取 消</el-button>
        <el-button type="primary" @click="okChannelFeeConfig">确 定</el-button>
      </span>  
    </el-dialog>
  </div>
</template>

<script>
import channelTree from "./channelTree"
import apiBigflow from 'api/bigflow'
export default {
  name: 'channelList',
  components: {
    channelTree,
    // SelectTree
  },
  data () {
    return {
      channelBillingConfigForm:{
         id:null,
	       channelId:null,
	       provinceUnitPrice:null,
	       countryUnitPrice:null,
	       payType:null,
	       cardFeePayType:null,
	       cardFeeMonthFrom:null,
	       cardFeeMonths:null,
      },
      showChannelFeeConfigDlg:false,
      channelBillingFeeConfigs:[],
      productCodes:[],
      productForm:{},
      showProductDlg:false,
      queryChannelProductForm:{},
      selectedTab:0,
      showDistrubuteDlg:false,
      distrubuteForm:{},
      queryChannelCardForm:{},
      loading:false,
      channels:[],
      channelStocks:[],
      channelProducts:[],
      selecedChannelCode:'',
      selectedChannelName:'',
      productPage:1,
      productPageSize:10,
      productTotal:0,
      page: 1,
      pageSize: 20,
      total: 0,
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 200 },
        { prop: 'phoneNumber', label: '卡号码', width: 120 },
        { prop: 'status', label: '卡状态', width: 120 },
        { prop: 'channelName', label: '渠道', width: 120 },
        { prop: 'gmtStockDate', label: '划拨时间', width: 150 },
        { prop: 'salePoint', label: '网点', width: 50 },
        { prop: 'salePersonName', label: '销售员', width: 50 } 
      ],
      table_column_product: [
        { prop: 'productCode', label: '产品编码', width: 80 },
        { prop: 'productTypeName', label: '产品编码', width: 80 },
        { prop: 'viewName', label: '产品名', width: 100 },
        { prop: 'highUseName', label: '高速用量', width: 80 },
        { prop: 'mediumUseName', label: '中速用量', width: 80 },
        { prop: 'flowTotalDoseName', label: '可用总量', width: 80 },
        { prop: 'originalPrice', label: '原始价', width: 50 },
        { prop: 'price', label: '销售价', width: 50 },
        { prop: 'statusName', label: '状态', width: 50 },
        { prop: 'memo', label: '产品说明', width: 80 },
        { prop: 'opts', label: '操作', width: 120 }
      ],

      table_column_channelBillingFeeConfig:[
        { prop: 'payTypeName', label: '流量出账类型', width: 80 },
        { prop: 'provinceUnitPrice', label: '省内流量单价（元/G）', width: 120 },
        { prop: 'countryUnitPrice', label: '全国流量单价（元/G）', width: 120 },
        { prop: 'cardFeePayTypeName', label: '卡费出账类型', width: 120 },
        { prop: 'cardFeeMonthFrom', label: '卡费收取开始月份', width: 120 },
        { prop: 'cardFeeMonths', label: '卡费收取总月数', width: 120 },
         { prop: 'opts', label: '操作', width: 120 }
      ],
      statusTypes:[
        {label:'可销售', value:2},
        {label:'已激活', value:6}
    ],
    productStatus:[
      {label:'上架状态', value:1},
      {label:'下架状态', value:2},
    ],


    payTypes:[
      {name:'月套餐计费', value:1},
      {name:'实际用量计费', value:0},
      {name:'包量套餐计费', value:2}
    ],
    cardFeePayTypes:[
      {name:'根据实名状态，未实名的卡收取', value:0},
      {name:'根据用量状态，当月用量为0的卡收取', value:1},
      {name:'从N月开始收取1毛，连续收6个月或一直收取', value:2},
      {name:'不收卡费', value:3}
    ]
    }
  },

  mounted () {
    this.getChannels()
    this.getChannelStocks()
    this.getProductCodes()
    this.getChannelBillingFeeConfigs()
  },
  methods: {
    showAddFlowPool:function(){
      if(this.selecedChannelCode == null || this.selecedChannelCode == undefined || this.selecedChannelCode == ''){
        this.$message.success('请先选择要操作的渠道')
        return
      }
      if(this.channelBillingFeeConfigs.length > 0){
        this.$message.success('一个渠道只能有一个出账规则')
        return
      }
      this.showChannelFeeConfigDlg = true 
    },
    okEditChannelFeeConfig:function(row){
      console.log(row)
      this.channelBillingConfigForm = row
      this.showChannelFeeConfigDlg = true
    },
    okChannelFeeConfig:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        if(this.channelBillingConfigForm.id == null || this.channelBillingConfigForm.id == undefined){
            let params = this.channelBillingConfigForm
            params.channelId = this.selecedChannelCode
            apiBigflow.addChannelBillingFeeConfig(params).then(res=>{
              if(res.resultCode == 0){
                  that.getChannelBillingFeeConfigs()
                  that.showChannelFeeConfigDlg = false
                  this.$message.success('操作成功')
              }else{
                  this.$message.success('操作失败')
              }
          })
        }else{
            let params = this.channelBillingConfigForm
            apiBigflow.modifyChannelBillingFeeConfig(params).then(res=>{
              if(res.resultCode == 0){
                  that.getChannelBillingFeeConfigs()
                  that.showChannelFeeConfigDlg = false
                  this.$message.success('操作成功')
              }else{
                  this.$message.success('操作失败')
              }
          })
        }
      //   let params = {}
      //   params.id = row.id
      //   apiBigflow.removeChannelProductStatus(params).then(res=>{
      //     if(res.resultCode == 0){
      //         that.getChannelProducts()
      //         that.showProductDlg = false
      //         this.$message.success('操作成功')
      //     }else{
      //         this.$message.success('操作失败')
      //     }
      // })
      }).catch(() => {
      });
    },
    getChannelBillingFeeConfigs:function(){
      let params = {}
      params.channelId = this.selecedChannelCode
      console.log(JSON.stringify(params))
      apiBigflow.getChannelBillingFeeConfigs(params).then(res=>{
          if(res.resultCode == 0){
            this.channelBillingFeeConfigs = res.data
              // that.getChannelProducts()
              // that.showProductDlg = false
              // this.$message.success('操作成功')
          }else{
              this.$message.success('查询渠道出账类型失败')
          }
      })
    },
    // removeChannelBillingFeeConfig
    okRemoveChannelFeeConfig:function(row){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.id = row.id
        apiBigflow.removeChannelBillingFeeConfig(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelBillingFeeConfigs()
              this.$message.success('操作成功')
          }else{
              this.$message.success('操作失败')
          }
      })
      }).catch(() => {
      });
    },
    // getChannelBillingFeeConfigs
    okRemoveProduct:function(row){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.id = row.id
        apiBigflow.removeChannelProductStatus(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelProducts()
              that.showProductDlg = false
              this.$message.success('操作成功')
          }else{
              this.$message.success('操作失败')
          }
      })
      }).catch(() => {
      });
    },
    okChangeProductStatus:function(row, optType){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.page = 1
        params.merchId = this.selecedChannelCode
        params.id = row.id
        params.proxyPdCode = row.id
        if(optType == 0){ //上架
          params.value = 1
          params.status = 1
        }else if(optType == 1){//下架
          params.value = 2
          params.status = 2
        }
        console.log(JSON.stringify(params))
        apiBigflow.changeChannelProductStatus(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelProducts()
              that.showProductDlg = false
              this.$message.success('操作成功')
          }else{
              this.$message.success('操作失败')
          }
      })
      }).catch(() => {
      });
      
    },
    okAddChannelProduct:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
        let params = {}
        params.productCode = this.productForm.productCode
        params.status = this.productForm.status
        params.merchId = this.selecedChannelCode
        apiBigflow.addChannelProduct(params).then(res=>{
          if(res.resultCode == 0){
              that.getChannelProducts()
              that.showProductDlg = false
              this.$message.success('添加成功')
          }else{
              this.$message.success('添加失败')
          }
      })
      }).catch(() => {
      });
    },
    // 
    getProductCodes:function(){
      let params = {}
      apiBigflow.getProductCodes(params).then(res => {
        if (res.resultCode === 0) {
            this.productCodes = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    queryChannelProducts:function(){
      this.getChannelProducts()
    },
    getChannelProducts:function(){
      let params = {}
      params.page=this.productPage
      params.merchId = this.selecedChannelCode
      params.productCode = this.queryChannelProductForm.productCode
      apiBigflow.getChannelProducts(params).then(res => {
        if (res.resultCode === 0) {
            this.channelProducts = res.data
            this.productTotal = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    tabSelect:function(tabType){
      this.selectedTab = tabType
    },
    okDistrubuteBetween:function(){
        if(this.distrubuteForm.channelId == undefined || this.distrubuteForm.channelId == '' || this.distrubuteForm.channelId == null){
            this.$message.error('渠道名必须填写')
            return
        }
        if(this.distrubuteForm.iccidStart == undefined || this.distrubuteForm.iccidStart == '' || this.distrubuteForm.iccidStart == null){
            this.$message.error('首iccd必须填写')
            return
        }
        if(this.distrubuteForm.iccidEnd == undefined || this.distrubuteForm.iccidEnd == '' || this.distrubuteForm.iccidEnd == null){
            this.$message.error('尾iccd必须填写')
            return
        }
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.channelId = this.distrubuteForm.channelId
        params.iccidStart = this.distrubuteForm.iccidStart
        params.iccidEnd = this.distrubuteForm.iccidEnd
        params.type = 1
        apiBigflow.distributeChannelCardsBetween(params).then(res => {
            if (res.resultCode === 0) {
                this.channelStocks = res.data
                this.total = res.rowNum
            } else {
            this.$message.error(res.resultInfo)
            }
        })
      }).catch(() => {
      });
    },
    hideDistrubuteBetween:function(){
        this.showDistrubuteDlg = false
    },
    showDistrubuteBetween:function(){
        this.showDistrubuteDlg = true
    },
    queryChannelCards:function(){
        this.getChannelStocks()
    },
    handleProductSizeChange:function(newSize){

    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
    //   this.queryChannelForm.pageSize = newSize
    //   this.getChannelList(localStorage.getItem('channelId'))
    },
    handleProductCurrentChange:function(newPage){
      this.productPage = newPage
      this.getChannelProducts()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
        this.page = newPage
        this.getChannelStocks()
    //   this.queryChannelForm.page = newPage - 1
    //   this.getChannelList(localStorage.getItem('channelId'))
    },
    getChannelStocks:function(){
      let params = {}
      params.page=this.page
      params.channelId = this.selecedChannelCode
      params.iccidLike = this.queryChannelCardForm.iccid
      params.phoneNumberLike = this.queryChannelCardForm.phone
      params.status = this.queryChannelCardForm.status
      params.type = 1
      apiBigflow.getChannelStocks(params).then(res => {
        if (res.resultCode === 0) {
            this.channelStocks = res.data
            this.total = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })

    },
    getChannels () {
      let params = {}
      params.page=1
      apiBigflow.getSaleChannels(params).then(res => {
        if (res.resultCode === 0) {
            this.channels = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    
    channelChick (channel) {
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName) {
        this.selecedChannelCode = channelsID
        this.selectedChannelName = channelName
        this.getChannelStocks()
        this.getChannelBillingFeeConfigs()
        // this.getSalePerson()
    }
  }
}
</script>

<style scoped>
.box_subject {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
.hoverQrcodeBox {
  width: 150px;
}
.hoverQrcodeBoxNo {
  text-align: center;
}
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
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
</style>
