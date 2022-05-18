<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
          <el-form-item label="ICCID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="iccid"></el-input>
        </el-form-item>   
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="cardStatus">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流量池" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择流量池" v-model="poolId">
            <el-option v-for="item in pools" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          <!-- <el-button size="medium" type="primary" icon="el-icon-search" @click="queryFlowCardStocks">搜索</el-button> -->
        </el-form-item>
        <el-form-item label="账户池" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择账户池" v-model="amountPoolId">
            <el-option v-for="item in amountPools" :key="item.id" :label="item.poolName" :value="item.id"></el-option>
          </el-select>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="queryFlowCardStocks">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowCardStock-cardDistribution'}" @click="openPoolCardImortDlg">卡片划拨</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowCardStock-distributionForIccid'}" @click="openMovePoolByIccidsDlg">首尾ICCID划拨</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowCardStock-distributionForIccid'}" @click="openMovePoolDlg">迁移卡池</el-button>
      </div>
      <!-- 列表区域 -->
      <!-- <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div> -->
      <el-table  :data="flowCardStocks" border max-height="1000" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
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

    <el-dialog title="迁移卡池" :visible.sync="showMovePoolDlg" width="450px" @close="closeMovePoolDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="movePoolForm"  label-width="110px">
        <el-form-item label="池类型">
          <el-radio-group v-model="movePoolForm.optType" @change="optTypeMoveChangeItem">
            <el-radio :label='0'>账户池</el-radio>
            <el-radio :label='1'>流量池</el-radio>
          </el-radio-group>
        </el-form-item> 
        <el-form-item v-if="movePoolForm.optType == 1" label="流量池">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入流量池" v-model="movePoolForm.poolId">
            <el-option v-for="item in pools" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="movePoolForm.optType == 0" label="账户池">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入流量池" v-model="movePoolForm.poolId">
            <el-option v-for="item in amountPools" :key="item.id" :label="item.poolName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超量是否关停">
          <el-select 
          class="queryFormInput"  placeholder="请输入超量是否关停" v-model="movePoolForm.useLimitStatus">
            <el-option v-for="item in useLimitStatus" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因">
          <el-input style="width:300px;" v-model="movePoolForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）超量是否关停是指卡有自身套餐情况下，用量超限后的操作指示</p>
            <p>2）变更原因请认真填写。</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMovePoolDlg" :disabled="btnEnable">取 消</el-button>
        
        <el-button type="primary" v-if="movePoolForm.optType == 1" @click="okMovePoolPool" :disabled="btnEnable">确 定</el-button>
        <el-button type="primary" v-if="movePoolForm.optType == 0" @click="okMoveAmountPool" :disabled="btnEnable">确 定</el-button>
      </span>   
    </el-dialog>

    <el-dialog title="首尾ICCID划拨" :visible.sync="showMovePoolByIccidsDlg" width="450px" @close="closeMovePoolByIccidsDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="movePoolByIccidsForm"  label-width="110px">
        <el-form-item label="池类型">
          <el-radio-group v-model="movePoolByIccidsForm.optType" @change="optTypeIccidChangeItem">
            <el-radio :label='0'>账户池</el-radio>
            <el-radio :label='1'>流量池</el-radio>
          </el-radio-group>
        </el-form-item> 
        <el-form-item v-if="movePoolByIccidsForm.optType == 1" label="流量池">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入流量池" v-model="movePoolByIccidsForm.poolId">
            <el-option v-for="item in pools" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item  v-if="movePoolByIccidsForm.optType == 0" label="账户池">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入流量池" v-model="movePoolByIccidsForm.poolId">
            <el-option v-for="item in amountPools" :key="item.id" :label="item.poolName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首iccid(19位)">
          <el-input style="width:300px;" v-model="movePoolByIccidsForm.iccidStart" placeholder="请输入首iccid" ></el-input>
        </el-form-item>
        <el-form-item label="尾iccid(19位)">
          <el-input style="width:300px;" v-model="movePoolByIccidsForm.iccidEnd" placeholder="请输入尾iccid" ></el-input>
        </el-form-item>
        <el-form-item label="超量是否关停">
          <el-select 
          class="queryFormInput"  placeholder="请输入超量是否关停" v-model="movePoolByIccidsForm.useLimitStatus">
            <el-option v-for="item in useLimitStatus" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因">
          <el-input style="width:300px;" v-model="movePoolByIccidsForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）超量是否关停是指卡有自身套餐情况下，用量超限后的操作指示</p>
            <p>2）变更原因请认真填写。</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMovePoolByIccidsDlg" :disabled="btnEnable">取 消</el-button>
        <el-button v-if="movePoolByIccidsForm.optType == 1"  type="primary" @click="okMovePoolByIccids" :disabled="btnEnable">确 定</el-button>
        <el-button v-if="movePoolByIccidsForm.optType == 0"  type="primary" @click="okMoveAmountPoolByIccids" :disabled="btnEnable">确 定</el-button>
      </span>   
    </el-dialog>


    <el-dialog title="卡片划拨" :visible.sync="showPoolCardImortDlg" width="450px" @close="closePoolCardImortDlg">
      <el-form :model="poolCardImortForm"  label-width="110px">
        <el-form-item label="池类型">
          <el-radio-group v-model="poolCardImortForm.optType" @change="optTypeCardChangeItem">
            <el-radio :label='0'>账户池</el-radio>
            <el-radio :label='1'>流量池</el-radio>
          </el-radio-group>
        </el-form-item> 
        <el-form-item v-if="poolCardImortForm.optType === 1" label="流量池">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入流量池" v-model="poolCardImortForm.poolId">
            <el-option v-for="item in pools" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="poolCardImortForm.optType === 0" label="账户池">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请选择账户池" v-model="poolCardImortForm.poolId">
            <el-option v-for="item in amountPools" :key="item.id" :label="item.poolName" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="超量是否关停">
          <el-select class="queryFormInput"  clearable placeholder="超量是否关停" v-model="poolCardImortForm.useLimitStatus">
            <el-option v-for="item in useLimitStatus" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因"> 
          <el-input style="width:300px;"  v-model="poolCardImortForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
        <el-form  label-width="120px">
            <el-upload class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadFile" :on-remove="removeUploadedFile">
            <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
        </el-form>
      </el-form>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="closePoolCardImortDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" v-if="poolCardImortForm.optType === 1" @click="okPoolCardImort" :disabled="btnEnable">确 定</el-button>
        <el-button type="primary" v-if="poolCardImortForm.optType === 0" @click="okAmountPoolCardImort" :disabled="btnEnable">确 定</el-button>
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
    showPoolCardImortDlg:false, 
    poolCardImortForm:{
      optType:1
    },
    btnEnable:false,
    showMovePoolByIccidsDlg:false, 
    movePoolByIccidsForm:{
      optType:1
    },
    file2Upload : null,
    iccids2Opt:'',
    showMovePoolDlg:false,  
    movePoolForm:{
      optType:1
    },
    useLimitStatus:[
        {value: 1, name:"不关停"},
        {value: 2, name:"关停"}
    ],
    loading: false,
    iccid:'',
    cardStatus:'',
    saleChannel:'',
    channels:[],
    poolId:'',
    amountPoolId:'',
    pools:[],
    amountPools:[],
    statusOptions:[
        {label:'录入', value:1},
        {label:'可销售', value:2},
        {label:'已开卡', value:3},
        {label:'已激活', value:6},
        {label:'已注销', value:7},
        {label:'已销毁', value:9}
    ],
    flowCardStocks:[],
      page: 0,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 200, sortable: true },
        { prop: 'phoneNumber', label: 'IMSI', width: 200, sortable: true },
        { prop: 'statusName', label: '库存状态', width: 120, sortable: true },
        { prop: 'poolName', label: '池名称', width: 280, sortable: true },
        { prop: 'amountPoolName', label: '账户池名称', width: 280, sortable: true },
        { prop: 'gmtPool', label: '加入池时间', width: 180, sortable: true },
        // { prop: 'useLimitStatus', label: '限量关停', width: 80, sortable: true },
        { prop: 'gmtStock', label: '入库时间', width: 180, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllAmountPools()
      this.getAllPools()
      this.getAllChannels()
      this.queryFlowCardStocks()
  },
  watch: {},
  methods: {
    getAllAmountPools:function(){
        this.loading = true
        let params = {}
        params.nameLike = null
        params.channelId = null
        params.page = 0
        params.pageSize = 100000
        apiBigflow.getAmountPools(params).then(res=>{
            if(res.resultCode == 0){
              let noAmountPool = {
                id:-1,
                poolName:'移出账户池'
              }
              this.amountPools.push(noAmountPool)
              for(let i = 0; i < res.data.length; i++){
                this.amountPools.push(res.data[i])
              }
                
            }else{
            }
        })
    },
    optTypeMoveChangeItem(e){
      this.movePoolForm.optType=e
    },
    optTypeCardChangeItem(e){
      this.poolCardImortForm.optType=e
    },
    optTypeIccidChangeItem(e){
      this.movePoolByIccidsForm.optType=e
    },
    removeUploadedFile(file,fileList){
        this.poolCardImortForm.fileToken = ''
        this.file2Upload = null
    },
    uploadFile (item) {
        let params = new FormData()
        params.append('file', item.file)
        this.file2Upload = item.file
        apiBigflow.uploadFile(params).then(res=>{
            if(res.resultCode == 0){
               this.poolCardImortForm.fileToken = res.data
            }
        })
    },
    openPoolCardImortDlg:function(){
        this.showPoolCardImortDlg = true
    },  
    closePoolCardImortDlg:function(){
        this.showPoolCardImortDlg = false
    },  
    okAmountPoolCardImort:function(){
      let that = this
        // importPoolCards
        if(this.poolCardImortForm.fileToken == undefined || this.poolCardImortForm.fileToken == ''){
            alert('请先上传要操作的excel文件')
            return
        }
        
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = new FormData()
            params.append('file', this.file2Upload)
            params.append('poolId', this.poolCardImortForm.poolId)
            // params.append('useLimitStatus', this.poolCardImortForm.useLimitStatus)
            params.append('reason', this.poolCardImortForm.reason)
            // params.append('fileToken', this.poolCardImortForm.fileToken)
            apiBigflow.fileAmountPoolMove(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowCardStocks()
                    that.showPoolCardImortDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    okPoolCardImort:function(){
        let that = this
        // importPoolCards
        if(this.poolCardImortForm.fileToken == undefined || this.poolCardImortForm.fileToken == ''){
            alert('请先上传要操作的excel文件')
            return
        }
        
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = new FormData()
            params.append('file', this.file2Upload)
            params.append('poolId', this.poolCardImortForm.poolId)
            params.append('useLimitStatus', this.poolCardImortForm.useLimitStatus)
            params.append('reason', this.poolCardImortForm.reason)
            params.append('fileToken', this.poolCardImortForm.fileToken)
            apiBigflow.importPoolCards(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowCardStocks()
                    that.showPoolCardImortDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    openMovePoolByIccidsDlg:function(){
        // if(this.iccids2Opt == ''){
        //     alert("请选择要操作的卡")
        //     return
        // }
        this.showMovePoolByIccidsDlg = true
    },  
    closeMovePoolByIccidsDlg :function(){
        this.showMovePoolByIccidsDlg = false
    }, 
    okMoveAmountPoolByIccids:function(){
      // moveAmountPoolbetweenIccids
      if(this.movePoolByIccidsForm.iccidStart == undefined || this.movePoolByIccidsForm.iccidStart == null || this.movePoolByIccidsForm.iccidStart == ''){
        this.$message.error('iccid开始不能为空')
        return
      }
      if(this.movePoolByIccidsForm.iccidEnd == undefined || this.movePoolByIccidsForm.iccidEnd == null || this.movePoolByIccidsForm.iccidEnd == ''){
        this.$message.error('iccid结束不能为空')
        return
      }
      if(this.movePoolByIccidsForm.poolId == undefined || this.movePoolByIccidsForm.poolId == null || this.movePoolByIccidsForm.poolId == ''){
        this.$message.error('账户池不能为空')
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
            params.iccidStart = this.movePoolByIccidsForm.iccidStart
            params.iccidEnd = this.movePoolByIccidsForm.iccidEnd
            params.reason = this.movePoolByIccidsForm.reason
            params.poolId = this.movePoolByIccidsForm.poolId
            params.useLimitStatus = this.movePoolByIccidsForm.useLimitStatus
            apiBigflow.moveAmountPoolbetweenIccids(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowCardStocks()
                    that.showMovePoolByIccidsDlg = false
                    this.$message.success('操作成功')
                }else{
                    this.$message.success('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    okMovePoolByIccids:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccidStart = this.movePoolByIccidsForm.iccidStart
            params.iccidEnd = this.movePoolByIccidsForm.iccidEnd
            params.reason = this.movePoolByIccidsForm.reason
            params.poolId = this.movePoolByIccidsForm.poolId
            params.useLimitStatus = this.movePoolByIccidsForm.useLimitStatus

            apiBigflow.movePoolIccidsBetween(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowCardStocks()
                    that.showMovePoolByIccidsDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    closeMovePoolDlg:function(){
        this.showMovePoolDlg = false
    } ,
    okMoveAmountPool:function(){
      let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccid = this.iccids2Opt
            params.reason = this.movePoolForm.reason
            params.amountPoolId2Moving = this.movePoolForm.poolId
            apiBigflow.moveAmountPoolByIccid(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowCardStocks()
                    that.showMovePoolDlg = false
                    this.$message.success('操作成功')
                }else{
                    this.$message.error('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    okMovePoolPool:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.movePoolForm.reason
            params.poolId = this.movePoolForm.poolId
            params.useLimitStatus = this.movePoolForm.useLimitStatus
            apiBigflow.movePool(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowCardStocks()
                    that.showMovePoolDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },   
    openMovePoolDlg:function(){
        if(this.iccids2Opt == ''){
            alert("请选择要操作的卡")
            return
        }
        this.showMovePoolDlg = true
    },
    getAllPools:function(){
        let params = {}
        apiBigflow.getAllPools(params).then(res=>{
            if(res.resultCode == 0){
                // this.pools = res.data
                let noPool = {
                  value:-1,
                  name:'移出流量池'
                }
                this.pools.push(noPool)
                for(let i = 0; i < res.data.length; i++){
                  this.pools.push(res.data[i])
                }
            }
        })
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
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryFlowCardStocks:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        params.pageSize = this.pageSize
        if(this.iccid != '')
            params.iccidLike = this.iccid
        if(this.cardStatus != '')
            params.status = this.cardStatus
        if(this.saleChannel != '')
            params.channelId = this.saleChannel
        if(this.poolId != '')
            params.poolId = this.poolId
        if(this.amountPoolId != '')
            params.amountPoolId = this.amountPoolId
        apiBigflow.getFlowCardStock(params).then(res=>{
        if(res.resultCode == 0){
            this.flowCardStocks = res.data
            this.total = res.rowNum
            this.loading = false
          }
        })
    },
    handleSelectionChange (val) {
      this.iccids2Opt = ''
      if(val.length > 0){
          for(let i = 0; i < val.length; i++){
              this.iccids2Opt = this.iccids2Opt + val[i].iccid +','
          }
          this.iccids2Opt =this.iccids2Opt.substr(0,this.iccids2Opt.length -1 );
      }
    },
    handleSizeChange (newPage) {
      this.pageSize = newPage;
      this.queryFlowCardStocks()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryFlowCardStocks()
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
