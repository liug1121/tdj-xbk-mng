<template>
  <div class="box_subject">
    <el-card class="all_list">
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
        v-permission="{indentity:'bigflowFlowPool-orderProduct'}">订购套餐</el-button>
        
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-useChange'}">调整用量</el-button>
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
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
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
    flowPools:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'poolId', label: '池ID', width: 200, fixed: 'left', sortable: true },
        { prop: 'poolName', label: '池名称', width: 190, fixed: 'left', sortable: true },
        { prop: 'statusName', label: '状态', width: 200, sortable: true },
        { prop: 'num', label: '总卡片数', width: 150, sortable: true },
        { prop: 'saleChannelName', label: '渠道', width: 300, sortable: true },
        { prop: 'productCodeName', label: '当前套餐', width: 200, sortable: true },
        { prop: 'flowHighDoseName', label: '可用量', width: 180, sortable: true },
        { prop: 'flowHighUsedName', label: '当月已使用', width: 180, sortable: true },
        { prop: 'surplusUsedName', label: '剩余总流量', width: 180, sortable: true },
        { prop: 'expireDate', label: '有效期', width: 300 },
        { prop: 'gmtCreate', label: '创建时间', width: 300 }
        
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
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryFlowPools()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryFlowPools()
    },
  }
};
</script>
<style scoped>
</style>
