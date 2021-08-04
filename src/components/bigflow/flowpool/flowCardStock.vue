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
          <el-button size="medium" type="primary" icon="el-icon-search" @click="queryFlowCardStocks">搜索</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="flowCardStocks" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
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
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
    loading: false,
    iccid:'',
    cardStatus:'',
    saleChannel:'',
    channels:[],
    poolId:'',
    pools:[],
    statusOptions:[
        {label:'录入', value:1},
        {label:'可销售', value:2},
        {label:'已开卡', value:3},
        {label:'已激活', value:6},
        {label:'已注销', value:7},
        {label:'已销毁', value:9}
    ],
    flowCardStocks:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 200, fixed: 'left', sortable: true },
        { prop: 'phoneNumber', label: 'IMSI', width: 190, fixed: 'left', sortable: true },
        { prop: 'statusName', label: '库存状态', width: 200, sortable: true },
        { prop: 'poolName', label: '池名称', width: 150, sortable: true },
        { prop: 'gmtPool', label: '加入池时间', width: 300, sortable: true },
        { prop: 'useLimitStatus', label: '限量关停', width: 200, sortable: true },
        { prop: 'gmtStock', label: '入库时间', width: 180, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllPools()
      this.getAllChannels()
      this.queryFlowCardStocks()
  },
  watch: {},
  methods: {
    getAllPools:function(){
        let params = {}
        apiBigflow.getAllPools(params).then(res=>{
            if(res.resultCode == 0){
                this.pools = res.data
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
        if(this.iccid != '')
            params.iccidLike = this.iccid
        if(this.cardStatus != '')
            params.status = this.cardStatus
        if(this.saleChannel != '')
            params.channelId = this.saleChannel
        if(this.poolId != '')
            params.poolId = this.poolId
        apiBigflow.getFlowCardStock(params).then(res=>{
        if(res.resultCode == 0){
            this.flowCardStocks = res.data
            this.total = res.rowNum
            this.loading = false
          }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
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
</style>
