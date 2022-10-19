<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="卡号码" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入卡号码" style="width:150px" v-model="phoneNumber"></el-input>
        </el-form-item>  
        <el-form-item label="ICCID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="iccid"></el-input>
        </el-form-item>   
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  style="width:250px"
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="cardStatus">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="导单时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="startDateTime">   
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="endDateTime">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="蜂窝帐号" class="queryFormItem" >
          <el-select 
           filterable
           clearable
           reserve-keyword
           class="queryFormInput"  placeholder="请选择蜂窝帐号" v-model="fengwoAccount" style="width:250px">
            <el-option v-for="item in fengwoAccounts" :key="item.account_id" :label="item.account_name" :value="item.account_id"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="toQUeryBigflowStocks">查询</el-button>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" 
        v-permission="{indentity:'bigflowStockMng-export'}" @click="toExport">导出</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-import'}" @click="openCardImportDlg">导入</el-button>
        <!-- <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-moveNet'}" @click="openCardMoveDlg">迁移网路</el-button> -->
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-distributeForChannel'}" @click="openMoveCard2ChannelDlg">分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-distributeForHeadAndTail'}" @click="openStock2ChannelDlg">首尾分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-exportFor'}" disabled>按首尾条件导出</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-exportFor'}" @click="openCardResetDlg">批量退库存</el-button>
      </div>
      <!-- 列表区域 -->
      <!-- <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div> -->
      <el-table :data="bigflowStocks" border max-height="1000" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,100,200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog title="渠道分配" :visible.sync="showStock2ChannelDlg" width="450px" @close="closeStock2ChannelDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="stock2ChannelForm"  label-width="110px">
        <el-form-item label="分配渠道">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入渠道" v-model="stock2ChannelForm.channelId">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首iccid(19位)">
          <el-input style="width:300px;" v-model="stock2ChannelForm.iccidStart" placeholder="请输入首iccid" ></el-input>
        </el-form-item>
        <el-form-item label="尾iccid(19位)">
          <el-input style="width:300px;" v-model="stock2ChannelForm.iccidEnd" placeholder="请输入尾iccid" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）注意：请输入19位数的ICCID，每次分配不能超过2万张卡</p>
            <p>2）系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行分配渠道</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeStock2ChannelDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okStock2Channel" :disabled="btnEnable">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量退库存" :visible.sync="showCardResetDlg" width="450px" @close="closeCardResetDlg">
      <el-form   label-width="110px">
        <el-form  label-width="120px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadCardResetFile" :on-remove="removeUploadCardResetFile">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form>
      </el-form>
      <span>
          <p>1、<a href='http://xbk.xuebaka.cn/download/template/movecard-stock.xlsx'>下载模板后</a>，填写数据。ICCID、卡号为必须字段，卡号可以带86。</p>
      </span>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCardResetDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okCardReset" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog>

     <el-dialog title="文件导入" :visible.sync="showCardImportDlg" width="450px" @close="closeCardImportDlg">
      <el-form :model="cardImportForm"  label-width="110px">
        <el-form-item label="蜂窝平台账户"> 
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入蜂窝平台账户" v-model="cardImportForm.serviceName">
            <el-option v-for="item in serviceInfos" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select class="queryFormInput"  clearable placeholder="类型" v-model="cardImportForm.type">
            <el-option v-for="item in types" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡品类型">
          <el-select class="queryFormInput"  clearable placeholder="类型" v-model="cardImportForm.productType">
            <el-option v-for="item in productTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form  label-width="120px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadFile" :on-remove="removeUploadedFile">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form>
      </el-form>
      <span>
          <p>1、<a href='http://xbk.xuebaka.cn/download/template/xbcard-stock.xlsx'>下载模板后</a>，填写数据。ICCID、卡号为必须字段，卡号可以带86。</p>

            <p>2、如果数据存在则做更新操作，只会更新：级别与状态两个字段，请注意。</p>

            <p>3、如果需要迁移网格，请使用迁移网络功能。</p>

            <p>4、卡号码状态对应编码 1:录入2:可销售5:已分配3:已开卡6:已激活7:已注销9:已销毁。</p>
      </span>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCardImportDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okCardImport" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="迁移网络" :visible.sync="showCardMoveDlg" width="450px" @close="closeCardMoveDlg">
      <el-form :model="cardMoveForm"  label-width="110px">
        <el-form-item label="蜂窝平台账户"> 
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入蜂窝平台账户" v-model="cardMoveForm.serviceName">
            <el-option v-for="item in serviceInfos" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form  label-width="120px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadMoveCardFile" :on-remove="removeUploadedMoveCardFile">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form>
        
      </el-form>
      <span>
          <p>1）下载模板后，填写数据。ICCID、卡号 字段为必填。</p>

            <p>2）提交后会先修改卡库存表网格数据；</p>

            <p>3）发起任务去检查本次更新的卡与蜂窝平台的配置是否一致</p>
      </span>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeCardMoveDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okCardMove" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="分配渠道" :visible.sync="showMoveCard2ChannelDlg" width="450px" @close="closeMoveCard2ChannelDlg">
      <el-form :model="moveCard2ChannelForm"  label-width="110px">
        <el-form-item label="分配渠道">  
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入渠道" v-model="moveCard2ChannelForm.channelId">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form  label-width="120px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadMoveStockCard2ChannelFile" :on-remove="removeUploadedMoveStockCard2ChannelFile">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form>
      </el-form>
      <span>
          <p>1）1）下载模板后，填写数据。ICCID 字段为必填。</p>
      </span>
        <!-- <el-form-item label="蜂窝平台账户">  
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入蜂窝平台账户" v-model="cardMoveForm.serviceName">
            <el-option v-for="item in serviceInfos" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form  label-width="120px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadMoveCardFile" :on-remove="removeUploadedMoveCardFile">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form>
        
      </el-form>
      <span>
          <p>1）1）下载模板后，填写数据。ICCID 字段为必填。</p>

           
      </span> -->
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMoveCard2ChannelDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okMoveCard2Channel" :disabled="btnEnable">确 定</el-button>
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
    uploadedFile: '',
    showCardResetDlg:false,
    productType:-1,
    file2Upload:null,
    showMoveCard2ChannelDlg:false, 
    moveCard2ChannelForm:{},
    showCardMoveDlg:false,  
    cardMoveForm:{},
    showCardImportDlg:false,
    cardImportForm:{},
    btnEnable:false,
    showStock2ChannelDlg:false, 
    stock2ChannelForm:{},
    loading: false,
    serviceInfos:[],
    types:[
        {value:'bigflow',name:'大流量卡'},
        {value:'bigflow',name:'学霸卡'}
    ],
    productTypes:[
      {value:0, name:'消费电子级物联网卡_三合一'},
      {value:1, name:'消费电子级物联网卡_二合一'},
      {value:2, name:'消费电子级物联网卡_普通'},
      {value:3, name:'消费电子级物联网贴片卡'},
      {value:4, name:'车规级物联网贴片卡'},
      {value:5, name:'工业级物联网卡_普通'},
      {value:6, name:'工业级物联网贴片卡'},
      {value:7, name:'工业级物联网卡_Nano'},
      {value:8, name:'工业级物联网卡_Micro'}
    ],
    statusOptions:[
        {label:'录入', value:1},
        {label:'可销售', value:2},
        {label:'已开卡', value:3},
        {label:'已激活', value:6},
        {label:'已注销', value:7},
        {label:'已销毁', value:9}
    ],
    fengwoAccount:'',
    fengwoAccounts:[
    ],
    startDateTime:'',
    endDateTime:'',
    phoneNumber:'',
    iccid:'',
    saleChannel:'',
    cardStatus  :'',
    channels:[],
    bigflowStocks:[],
      page: 0,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'phoneNumber', label: '卡号码', width: 200, sortable: true },
        { prop: 'iccid', label: 'ICCID', width: 220, sortable: true },
        // { prop: 'productTypeName', label: '卡品类', width: 80, sortable: true },
        // { prop: 'status', label: '档位', width: 50, sortable: true },
        { prop: 'statusName', label: '卡状态', width: 100, sortable: true },
        { prop: 'serviceName', label: '蜂窝平台账户', width: 120, sortable: true },
        { prop: 'channelName', label: '渠道名称', width: 150, sortable: true },
        // { prop: 'salePerson', label: '销售员', width: 50, sortable: true },
        { prop: 'typeName', label: '类型', width: 120, sortable: true },
        { prop: 'provinceName', label: '归属地', width: 120, sortable: true },
        { prop: 'gmtCreate', label: '入库时间', width: 120, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllChannels()
      this.queryBigflowStocks()
      this.getAllServiceInfo()
      this.getFengwoAccounts()
  },
  watch: {},
  methods: {
    toQUeryBigflowStocks:function(){
      this.page = 0
      this.queryBigflowStocks()
    },
    closeCardResetDlg:function(){
      this.showCardResetDlg = false
    },  
    okCardReset:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          that.btnEnable = true
          let params = new FormData()
          params.append('file', this.cardResetFile)
          apiBigflow.file2CardReset(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryBigflowStocks()
                    that.showCardResetDlg = false
                    alert('操作成功，请在任务管理中查询执行结果，任务编号：' + res.data)
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
      }).catch(() => {
      });
    },
    toExport:function(){
      // exportBigflowStocks
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
      }).then(() => {
          that.btnEnable = true
          let params = {}
          params.page = this.page
          params.pageSize = this.pageSize
          if(this.startDateTime != '')
              params.gmtCreateStart = this.startDateTime
          if(this.endDateTime != '')
              params.gmtCreateEnd = this.endDateTime
          if(this.phoneNumber != '')
              params.phoneNumber = this.phoneNumber
          if(this.iccid != '')
              params.iccid = this.iccid
          if(this.saleChannel != '')
              params.channelId = this.saleChannel
          if(this.cardStatus != '')
              params.status = this.cardStatus
          if(this.fengwoAccount != '')
              params.fengwoAccount = this.fengwoAccount
          apiBigflow.exportBigflowStocks(params).then(res=>{
              if(res.resultCode == 0){
                  that.queryBigflowStocks()
                  that.showMoveCard2ChannelDlg = false
                  // alert('操作成功')
                  this.$message.success('导出成功，请在我的任务：' + res.data +'查看并下载导出的文件')
              }else{
                  this.$message.error('导出失败，失败原因：' + res.resultInfo)
              }
              that.btnEnable = false
          })
      }).catch(() => {
      }); 
    },
    getFengwoAccounts:function(){
      // getFengwoConfigs
      let params = {}
      params.page=0
      params.pageSize=10000
        apiBigflow.getAllFengwoConfigs(params).then(res=>{
            if(res.resultCode == 0){
                this.fengwoAccounts = res.data
            }
        })
    },
    openMoveCard2ChannelDlg:function(){
        this.showMoveCard2ChannelDlg = true
    }, 
    closeMoveCard2ChannelDlg:function(){
        this.showMoveCard2ChannelDlg = false
    }, 
    okMoveCard2Channel:function(){
        if(this.moveCard2ChannelForm.fileToken == undefined || this.moveCard2ChannelForm.fileToken == ''){
            alert('请先上传要操作的excel文件')
            return
        }
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            console.log('sdsd111')
            that.btnEnable = true
            let params = new FormData()
            params.append('file', this.uploadedFile)
            params.append('channelId', this.moveCard2ChannelForm.channelId)
            params.append('fileToken', this.moveCard2ChannelForm.fileToken)
            console.log('sdsd')
            apiBigflow.moveStockCards2Channel(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryBigflowStocks()
                    that.showMoveCard2ChannelDlg = false
                    this.$message.error('操作成功')
                }else{
                    this.$message.error('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    openCardMoveDlg:function(){
        this.showCardMoveDlg = true
    },
    closeCardMoveDlg:function(){
        this.showCardMoveDlg = false
    }, 
    okCardMove:function(){
        if(this.cardMoveForm.fileToken == undefined || this.cardMoveForm.fileToken == ''){
            alert('请先上传要操作的excel文件')
            return
        }
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.serviceName = this.cardMoveForm.serviceName
            params.fileToken = this.cardMoveForm.fileToken
            apiBigflow.moveStockCards(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryBigflowStocks()
                    that.showCardMoveDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    removeUploadedMoveStockCard2ChannelFile(file,fileList){
        this.moveCard2ChannelForm.fileToken = ''
    },
    uploadMoveStockCard2ChannelFile (item) {
        let params = new FormData()
        this.uploadedFile = item.file
        params.append('file', item.file)
        apiBigflow.uploadFile(params).then(res=>{
            if(res.resultCode == 0){
               this.moveCard2ChannelForm.fileToken = res.data
            }
        })
    },
    removeUploadedMoveCardFile(file,fileList){
        this.cardMoveForm.fileToken = ''
    },
    uploadMoveCardFile (item) {
        let params = new FormData()
        params.append('file', item.file)
        apiBigflow.uploadFile(params).then(res=>{
            if(res.resultCode == 0){
               this.cardMoveForm.fileToken = res.data
            }
        })
    },
    removeUploadedFile(file,fileList){
      this.file2Upload  = null
      this.cardImportForm.fileToken = ''
    },
    removeUploadCardResetFile(file,fileList){
      this.cardResetFile = null
    },
    uploadCardResetFile(item){
      this.cardResetFile = item.file
    },
    uploadFile (item) {
      
        let params = new FormData()
        params.append('file', item.file)
        this.file2Upload = item.file
        apiBigflow.uploadFile(params).then(res=>{
            if(res.resultCode == 0){
               this.cardImportForm.fileToken = res.data
            }
        })
    },
      closeCardImportDlg:function(){
          this.showCardImportDlg = false
      }, 
      okCardImport:function(){
        //   importPoolCards
        if(this.cardImportForm.fileToken == undefined || this.cardImportForm.fileToken == ''){
            this.$message.success('请先上传要操作的excel文件')
            return
        }
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = new FormData()
            params.append('file', this.file2Upload)
            params.append('serviceName', this.cardImportForm.serviceName)
            params.append('type', this.cardImportForm.type)
            params.append('fileToken', this.cardImportForm.fileToken)
            params.append('productType', this.cardImportForm.productType)
            apiBigflow.importStockCards(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryBigflowStocks()
                    that.showCardImportDlg = false
                    this.$message.success('操作成功，请在任务管理中查询执行结果，任务编号：' + res.data)
                }else{
                    this.$message.success('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
      }, 
      openCardImportDlg:function(){
          this.showCardImportDlg = true
          },
      openStock2ChannelDlg:function(){
          this.showStock2ChannelDlg = true
      },  
      openCardResetDlg:function(){
        this.showCardResetDlg = true
      },  
      closeStock2ChannelDlg:function(){
          this.showStock2ChannelDlg = false
      },    
      okStock2Channel:function(){
         let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccidStart = this.stock2ChannelForm.iccidStart
            params.iccidEnd = this.stock2ChannelForm.iccidEnd
            params.channelId = this.stock2ChannelForm.channelId
            apiBigflow.stock2Channel(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryBigflowStocks()
                    that.showStock2ChannelDlg = false
                    this.$message.success('操作成功，' + res.data.infos)
                }else{
                    this.$message.error('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
      },  
    startTimeChange () {
      this.startDateTime = `${this.startDateTime}`
    },
    endTimeChange () {
      this.endDateTime = `${this.endDateTime}`
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
                this.total = res.rowNum
            }
        })
    },
    getAllServiceInfo:function(){
        let params = {}
        apiBigflow.getAllServiceInfo(params).then(res=>{
            if(res.resultCode == 0){
                this.serviceInfos = res.data
            }
        })
    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryBigflowStocks:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        params.pageSize = this.pageSize
        if(this.startDateTime != '')
            params.gmtCreateStart = this.startDateTime
        if(this.endDateTime != '')
            params.gmtCreateEnd = this.endDateTime
        if(this.phoneNumber != '')
            params.phoneNumber = this.phoneNumber
        if(this.iccid != '')
            params.iccid = this.iccid
        if(this.saleChannel != '')
            params.channelId = this.saleChannel
        if(this.cardStatus != '')
            params.status = this.cardStatus
        if(this.fengwoAccount != '')
            params.fengwoAccount = this.fengwoAccount
        apiBigflow.getBigflowStocks(params).then(res=>{
            if(res.resultCode == 0){
                this.bigflowStocks = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.pageSize = newPage;
      this.queryBigflowStocks()
    },
    handleCurrentChange (newPage) {
      this.page = newPage ;
      this.queryBigflowStocks()
    },
  }
};
</script>
<style scoped>
.el-button {
  color:#145297;
    background-color: transparent;
    border-color: transparent;
}
</style>
