<template>
  <div class="box_subject">
        <el-card class="all_list">
          <el-form :model="queryForm" :inline="true">
            <el-form-item label="渠道" class="queryFormItem">
              <el-select class="queryFormInput"  
              filterable
              clearable
              reserve-keyword
              placeholder="请选择渠道" v-model="queryForm.channelId">
                <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="订单号"  class="queryFormItem">
                <el-input class="queryFormInput" style="width:150px;" v-model="queryForm.orderId" placeholder="请输入订单号" ></el-input>
              </el-form-item>
              <el-form-item label="联系人手机号"  class="queryFormItem">
                <el-input class="queryFormInput" style="width:150px;" v-model="queryForm.contactNum" placeholder="请输入联系人手机号" ></el-input>
              </el-form-item>
              <el-form-item label="是否点击" >
                <el-select 
                clearable
                reserve-keyword 
                class="queryFormInput"  placeholder="请输入" v-model="queryForm.statusClick">
                  <el-option v-for="item in statusClick" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否提交预订单" >
                <el-select 
                clearable
                reserve-keyword 
                class="queryFormInput"  placeholder="请输入" v-model="queryForm.statusPreorder">
                  <el-option v-for="item in statusPreorder" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="是否提交订单" >
                <el-select 
                clearable
                reserve-keyword 
                class="queryFormInput"  placeholder="请输入" v-model="queryForm.statusOrder">
                  <el-option v-for="item in statusOrder" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="联通订单状态" >
                <el-select 
                clearable
                reserve-keyword 
                class="queryFormInput"  placeholder="请输入" v-model="queryForm.statusNotify">
                  <el-option v-for="item in statusNotify" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
              <el-button size="medium" type="primary" icon="el-icon-search" @click="getZopOrders">查询</el-button>
              <el-button size="medium" type="primary" @click="toImportOrders">导入渠道订单</el-button>
              <el-button size="medium" type="primary" >导出</el-button>
          </el-form>
          <el-table   :data="zopOrders" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="(p, key) in table_column_zop_order" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
              <template slot-scope="scope">
                <div v-if="p.prop == 'opts'">
                    <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  @click="copyOrderUrl(scope.row)">复制订单</el-button>
                    <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  >实名链接</el-button>
                </div>
                <div v-else v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </el-card> 
        <el-dialog title="创建订单" :visible.sync="createOrderDlgShowed" width="450px" @close="closeCreateOrderDlgShowedDlg">
          <el-form label-width="110px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadFileForOrdersImport" :on-remove="removeFileForOrdersImport">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
            <!-- <el-form-item label="渠道" class="queryFormItem">
              <el-select class="queryFormInput"  
              filterable
              clearable
              reserve-keyword
              placeholder="请选择渠道" v-model="createOrderForm.channelId">
                <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
              </el-form-item>
            <el-form-item label="联系人">
              <el-input style="width:300px;"  v-model="createOrderForm.contactName" placeholder="请输入" ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input style="width:300px;"  v-model="createOrderForm.descreption" placeholder="请输入备注" ></el-input>
            </el-form-item> -->
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="closeCreateOrderDlgShowedDlg" :disabled="btnDisabled">取 消</el-button>
            <el-button type="primary" :disabled="btnDisabled" @click="okImportOrder">确 定</el-button>
          </span>  
        </el-dialog> 
        <el-main class="el-loading" v-loading="loading" element-loading-background="transparent"
            element-loading-text="加载中" > 
        </el-main>
  </div>
</template>

<script>
import apiBigflow from './../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
      fileForImportOrders:'',
      loading:false,
      btnDisabled:false,
      createOrderDlgShowed:false,
      createOrderForm:{
        channelId:'',
        orderNum:1,
        descreption:''
      },
        page:0,
        pageSize:10,
        total: 0,
        zopOrders:[],
        channels:[],
        queryForm:{
            channelId:'',
            orderId:'',
            contactNum:'',
            statusClick:'',
            statusPreorder:'',
            statusOrder:'',
            statusNotify:''
        },
        statusClick:[
          // {label:'全部', value:null},
          {label:'未点击', value:0},
          {label:'已点击', value:1},
        ],
        statusPreorder:[
          // {label:'全部', value:null},
          {label:'未提交', value:0},
          {label:'已提交', value:1},
        ],
        statusOrder:[
          // {label:'全部', value:null},
          {label:'未提交', value:0},
          {label:'已提交', value:1},
        ],
        statusNotify:[
          // {label:'全部', value:null},
          {label:'已激活', value:'1'},
          {label:'退单', value:'2'},
          {label:'转套餐(要根据产品id判断是否为享有特权的套餐)', value:'3'},
          {label:'销户(激活后),', value:'4'},
          {label:'首充数据同步', value:'6'},
          {label:'开户完成', value:'C1'},
           {label:'发货', value:'E0'}
        ],
        // 1：激活，2：退单(激活前)，3:转套餐(要根据产品id判断是否为享有特权的套餐)，4：销户(激活后),6:首充数据同步，C1：开户完成，E0：发货
        table_column_zop_order:[
            { prop: 'third_order_id', label: '订单号', width: 100, sortable: true },
            { prop: 'union_order', label: '联通订单号', width: 100, sortable: true },
            { prop: 'contact_num', label: '联系人手机号', width: 100, sortable: true },
            { prop: 'description', label: '备注', width: 100, sortable: true },
            { prop: 'phone_num', label: '卡号', width: 100, sortable: true },
            { prop: 'address', label: '地址', width: 100, sortable: true },
            { prop: 'order_phone_number', label: '订购号码', width: 100, sortable: true },
            { prop: 'statusName', label: '订单状态', width: 100, sortable: true },
            { prop: 'short_url', label: '联通实名短链接', width: 100, sortable: true }
        ],
    };
  },
  mounted () {

  },
  created(){
     this.getAllChannels()
     this.getZopOrders()
  },
  watch: {},
  methods: {
    uploadFileForOrdersImport:function(item){
      this.fileForImportOrders = item.file
    },
    removeFileForOrdersImport:function(){
      this.fileForImportOrders = ''
    },
    handleSizeChange (newPage) {
      this.pageSize = newPage;
      this.getZopOrders()
    },
    handleCurrentChange (newPage) {
        console.log('newPage:' + newPage)
      this.page = newPage;
      this.getZopOrders()
    },
    closeCreateOrderDlgShowedDlg:function(){
      this.createOrderDlgShowed = false
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
            }
        })
    },
    getZopOrders:function(){
        let params = {}
        params.channelId = this.queryForm.channelId
        params.orderId = this.queryForm.orderId
        params.contactNum = this.queryForm.contactNum
        params.statusClick = this.queryForm.statusClick
        params.statusOrder = this.queryForm.statusOrder
        params.statusNotify = this.queryForm.statusNotify
        params.page = 0
        params.pageSize = 100
        // console.log(JSON.stringify(params))
        this.loading = true
        apiBigflow.getZopOrders(params).then(res=>{
            if(res.resultCode == 0){
                this.zopOrders = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    copyOrderUrl:function(orderInfo){
      // this.dataProcessing(val)
      let that = this
      this.$copyText(orderInfo.order_url).then(function (e) {
        that.$message.success('订单链接已复制到剪贴板：' + orderInfo.order_url )
      }, function (e) {
        that.$message.error('复制内容到剪贴板失败' )
      })
    },
    toImportOrders:function(){
      this.createOrderDlgShowed = true
    },
    okImportOrder:function(){
      if(this.fileForImportOrders === ''){
        this.$message.error('订单文件不能为空' )
        return
      }
      this.$confirm('确认要操作？')
        .then(() => {
          let params = new FormData()
          params.append('file', this.fileForImportOrders)
          this.loading = true
          apiBigflow.importZopOrders(params).then(res => {
            if (res.resultCode === 0) {
              this.loading = false
              this.$message.success('导入订单成功，请在任务' + res.data + '中查看导入结果')
              this.getZopOrders()
              this.createOrderDlgShowed = false
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        })
        .catch(() => {
        });
    }
  }
};
</script>
<style scoped>
</style>
