<template>
  <div class="box_subject">
    <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':listType == 0}" @click="listTypeSel(0)">流量池</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':listType == 1}" @click="listTypeSel(1)">池用量明细</div>
        </div>
    <el-card class="all_list" v-if="listType == 1">
      <el-form  :inline="true">
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="类型" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择类型" v-model="detailType">
            <el-option v-for="item in detailTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          </el-form-item>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="okQueryFlowPoolsDetail">搜索</el-button>
      </el-form>
      <!-- 列表区域 -->
      <el-table v-loading="loading" :data="poolDetails" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_detail" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination v-if="detailType == 1" @size-change="handleDetailSizeChange" @current-change="handleDetailCurrentChange" :current-page="detailPage" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-card class="all_list" v-if="listType == 0">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="卡状态" class="queryFormItem">
            <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="status">
            <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
          <el-button size="medium" type="primary" icon="el-icon-search" @click="queryFlowPools">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-add'}" @click="openAddFlowPoolDlg">增加</el-button>

        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-orderProduct'}" @click="openOrderDlg">订购套餐</el-button>
        
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-useChange'}" @click="openUpdateuseDlg">调整用量</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-useChange'}" @click="openUpdateExpireDlg">调整有效期</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="flowPools" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            
            <div v-if="p.prop == 'operation'">
              <el-button v-permission="{indentity:'bigflowFlowPool-sotp'}" type="text" size="small" @click="stopPool(scope.row.poolId)" v-if="scope.row.status=='open'">停用</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-start'}" type="text" size="small" @click="openPool(scope.row.poolId)" v-else>启用</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-detail'}" type="text" size="small" >用量明细</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-delete'}" type="text" size="small" @click="removePool(scope.row.poolId)">删除</el-button>
            </div>
            <div v-else>
              <div v-if="p.prop == 'lastPer'">
                <div v-if="scope.row.lastPer <=10" class="usagePer">
                  {{scope.row.lastPer}}%
                </div>
                <div v-else>
                  {{scope.row.lastPer}}%
                </div>
                
              </div>
              <div v-else v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </el-card>

    <el-dialog title="添加流量池" :visible.sync="showAddFlowPoolDlg" width="450px" @close="closeAddFlowPoolDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="addFlowPoolForm"  label-width="110px">
          <el-form-item label="流量池编号">
          <el-input style="width:300px;" v-model="addFlowPoolForm.poolId" placeholder="请输入流量池编号" ></el-input>
        </el-form-item>
        <el-form-item label="流量池名称">
          <el-input style="width:300px;"  v-model="addFlowPoolForm.poolName" placeholder="请输入流量池名称" ></el-input>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入调整原因" v-model="addFlowPoolForm.saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡的默认限量">
            <el-select 
            filterable
          clearable
          reserve-keyword
            class="queryFormInput"  placeholder="请输入卡的默认限量" v-model="addFlowPoolForm.cardDefaultPdCode">
            <el-option v-for="item in getPdCodes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddFlowPoolDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okAddFlowPool" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="流量池订购套餐" :visible.sync="showOrderDlg" width="450px" @close="closeOrderDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="addOrderForm"  label-width="110px">
        <el-form-item label="订购套餐">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入订购套餐" v-model="addOrderForm.productCode">
            <el-option v-for="item in getPdCodes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因">
          <el-input style="width:300px;" v-model="addOrderForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）订购套餐为立即生效，会复盖之前的可用量及有效时间；</p>

            <p>2）加油包用量是当月有效，27号清0；</p>

            <p>3）变更原因请认真填写；</p>

            <p>4）订购成功后，并不会启用流量池，如需要请手动启用。</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrderDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okOrderPool" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="调整用量" :visible.sync="showUpdateuseDlg" width="450px" @close="closeUpdateuseDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="updateuseForm"  label-width="110px">
        <el-form-item label="高速可用量">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="updateuseForm.flowHighDose" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
        <el-form-item label="变更原因">
          <el-input style="width:300px;" v-model="updateuseForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）变更以G为单位，例如：输入1，代表1G</p>

            <p>2）变更逻辑：在原来基础上加上变更的用量。</p>

            <p>例如：原来有10G，变更1G，最后会变成11G</p>

            <p>输入负数就是减： 输入-1，就会变成9G。</p>

            <p>3）必填参数如果不需要变更，输入0即可</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateuseDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okUpdateuse" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 
    <el-dialog title="调整用量" :visible.sync="showUpdateExpireDlg" width="450px" @close="closeUpdateExpireDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="updateExpireForm"  label-width="110px">
        <el-form-item label="月数">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="updateExpireForm.expire" placeholder="请输入要调整的月数" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>单位为月，可为负</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateExpireDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okUpdateExpire" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
    detailType:null,
    poolDetails:[],
    listType:0,
    treeSelectedType:0,
    showUpdateExpireDlg:false,
    showUpdateuseDlg:false,
    updateuseForm:{},
    updateExpireForm:[],
    showOrderDlg:false,
    addOrderForm:{},
    poolId:'',
    pdCodes:[],
    showAddFlowPoolDlg:false, 
    addFlowPoolForm:{},
    btnEnable: false,
    loading: false,
    status:'',
    saleChannel:'',
    channels:[],
    statusTypes:[
        {label:'可用', value:'open'},
        {label:'不可用', value:'close'}
    ],
    detailTypes:[
      {label:'月累计', value:'0'},
      {label:'天累计', value:'1'}
    ],
    flowPools:[],
    detailPage:0,
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'poolId', label: '池ID', width: 100, sortable: true },
        { prop: 'poolName', label: '池名称', width: 100, sortable: true },
        { prop: 'statusName', label: '状态', width: 80, sortable: true },
        { prop: 'num', label: '总卡片数', width: 80, sortable: true },
        { prop: 'saleChannelName', label: '渠道', width: 150, sortable: true },
        { prop: 'productCodeName', label: '当前套餐', width: 80, sortable: true },
        { prop: 'flowHighDoseName', label: '可用量', width: 80, sortable: true },
        { prop: 'flowHighUsedName', label: '当月已使用', width: 80, sortable: true },
        { prop: 'flowHightotalUsedName', label: '累计已使用', width: 80, sortable: true },
        { prop: 'surplusUsedName', label: '剩余总流量', width: 80, sortable: true },
        { prop: 'lastPer', label: '剩余比率', width: 80, sortable: true },
        { prop: 'expireDate', label: '有效期', width: 100 },
        { prop: 'gmtCreate', label: '创建时间', width: 100 },
        { prop: 'operation', label: '操作', width: 100}
        
      ],
      
      table_column_detail: [
        { prop: 'date', label: '时间', width: 200},
        { prop: 'channelName', label: '渠道', width: 300},
        { prop: 'pool_name', label: '池名称', width: 250},
        { prop: 'pool_id', label: '池ID', width: 200},
        { prop: 'flow_usage', label: '用量', width: 200},
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllChannels()
      this.queryFlowPools()
      this.getPdCodes()
  },
  watch: {},
  methods: {
    
    listTypeSel:function(type){
      this.listType = type
    },
    treeSelect:function(type){
      this.treeSelectedType = type
      // this.queryBillForm.subFwAccounts = null
      // this.subAccountView = false
      // this.treeSelectedType = type
      // if(type == 2){
      //   this.subAccountView = true
      // }
      // if(type == 3){
      //   this.getUnChannelsList()
      // }
    },
    removePool:function(poolId){
      // removeFlowPool
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.btnEnable = true
          let params = {}
          params.poolId = poolId
          apiBigflow.removeFlowPool(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openPool:function(poolId){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.btnEnable = true
          let params = {}
          params.poolId = poolId
          params.status = 1
          apiBigflow.modifyFlowPoolStatus(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    stopPool:function(poolId){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.btnEnable = true
          let params = {}
          params.poolId = poolId
          params.status = 0
          apiBigflow.modifyFlowPoolStatus(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openUpdateExpireDlg:function(){
      if(this.poolId == ""){
            alert('请先选择要操作的流量池')
            return
        }
        if(this.poolId.indexOf(',') != -1){
            alert('一次只能操作一个流量池')
            return
        }
        this.showUpdateExpireDlg = true
    },
      openUpdateuseDlg:function(){
          if(this.poolId == ""){
            alert('请先选择要操作的流量池')
            return
        }
        if(this.poolId.indexOf(',') != -1){
            alert('一次只能操作一个流量池')
            return
        }
        this.showUpdateuseDlg = true
      }, 
      closeUpdateExpireDlg:function(){
          this.showUpdateExpireDlg = false
      },
      closeUpdateuseDlg:function(){
          this.showUpdateuseDlg = false
      },
      okUpdateExpire:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.poolId = this.poolId
            params.expireMonth2Modify = this.updateExpireForm.expire
            apiBigflow.updateFlowPoolExpire(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showUpdateExpireDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
      },
      okUpdateuse:function(){
          let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.flowHighDose = this.updateuseForm.flowHighDose
            params.reason = this.updateuseForm.reason
            params.poolId = this.poolId
            apiBigflow.updateFlowPoolUse(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showUpdateuseDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
      },
    openOrderDlg:function(){
        if(this.poolId == ""){
            alert('请先选择要操作的流量池')
            return
        }
        if(this.poolId.indexOf(',') != -1){
            alert('一次只能操作一个流量池')
            return
        }
        this.showOrderDlg = true
    },  
    closeOrderDlg:function(){
        this.showOrderDlg = false
    },
    okOrderPool:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.productCode = this.addOrderForm.productCode
            params.reason = this.addOrderForm.reason
            params.poolId = this.poolId
            apiBigflow.addFlowPoolOrder(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showOrderDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openAddFlowPoolDlg:function(){
        this.showAddFlowPoolDlg = true
    },
    closeAddFlowPoolDlg:function(){
        this.showAddFlowPoolDlg = false
    },
    okAddFlowPool:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.poolName = this.addFlowPoolForm.poolName
            params.poolId = this.addFlowPoolForm.poolId
            params.saleChannel = this.addFlowPoolForm.saleChannel
            params.cardDefaultPdCode = this.addFlowPoolForm.cardDefaultPdCode
            apiBigflow.addFlowPool(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showAddFlowPoolDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    
    getPdCodes:function(){
        let params = {}
        apiBigflow.getPdCodes(params).then(res=>{
            if(res.resultCode == 0){
                this.getPdCodes = res.data
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
    queryFlowPools:function(){
        this.loading = true
        let params = {}
        console.log('queryFlowPools:' + this.page)
        params.page = this.page
        if(this.status != '')
            params.status = this.status
        if(this.saleChannel != '')
            params.saleChannel = this.saleChannel
        apiBigflow.getFlowPools(params).then(res=>{
        if(res.resultCode == 0){
            this.flowPools = res.data
            this.total = res.rowNum
            this.loading = false
          }
        })
    },
    okQueryFlowPoolsDetail:function(){
      this.detailPage = 0
      this.queryFlowPoolsDetail()
    },
    queryFlowPoolsDetail:function(){
        this.loading = true
        
        let params = {}
        console.log(this.detailPage)
        params.page = this.detailPage
        params.type = this.detailType
        params.channelId = this.saleChannel
        apiBigflow.getFlowPoolsDetails(params).then(res=>{
        if(res.resultCode == 0){
            this.poolDetails = res.data
            this.total = res.rowNum
            this.loading = false
          }else{
            this.loading = false
            this.$message.success(res.resultInfo)
          }
        })
    },
    handleSelectionChange (val) {
        this.poolId = ''
      if(val.length > 0){
          for(let i = 0; i < val.length; i++){
              this.poolId = this.poolId + val[i].poolId +','
          }
          this.poolId =this.poolId.substr(0,this.poolId.length -1);
      }
    },
    handleDetailSizeChange (newPage) {
      console.log('newPage:' + this.detailPage)
      this.detailPage = newPage;
      this.queryFlowPoolsDetail()
    },
    handleDetailCurrentChange (newPage) {
      console.log('newPage1:' + this.detailPage)
      this.detailPage = newPage;
      this.queryFlowPoolsDetail()
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryFlowPools()
    },
    handleCurrentChange (newPage) {
      console.log('newPage2:' + this.detailPage)
      this.page = newPage;
      this.queryFlowPools()
    },
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
  width: 150px;
  font-size: 5px;
  text-align: center;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
.usagePer{
  color: red;
}
</style>
