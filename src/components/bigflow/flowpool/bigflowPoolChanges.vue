<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
          <el-form-item label="流量池" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable   
          reserve-keyword
           placeholder="请选择流量池" v-model="poolId">
            <el-option v-for="item in pools" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item> 
        <el-form-item label="操作时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="optStartDate">  
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="optEndDate">
          </el-date-picker>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryFlowPoolBills">搜索</el-button>
      </el-form>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table  :data="flowPoolBills" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
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
    loading: false,
    optStartDate:'',
    optEndDate:'',
    poolId:'',
    pools:[],
    flowPoolBills:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'targetType', label: '类型', width: 200, fixed: 'left', sortable: true },
        { prop: 'targetId', label: '流量池', width: 190, fixed: 'left', sortable: true },
        { prop: 'field', label: '变更字段', width: 200, sortable: true },
        { prop: 'value', label: '当前取值', width: 150, sortable: true },
        { prop: 'oldValue', label: '变更前值', width: 300, sortable: true },
        { prop: 'status', label: '状态', width: 200, sortable: true },
        { prop: 'reason', label: '修改说明', width: 180, sortable: true },
        { prop: 'operator', label: '操作者', width: 180, sortable: true },
        { prop: 'gmtCreate', label: '操作时间', width: 180, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllPools()
      this.queryFlowPoolBills()
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
    
    startTimeChange () {
      this.optStartDate = `${this.optStartDate}`
    },
    endTimeChange () {
      this.optEndDate = `${this.optEndDate}`
    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryFlowPoolBills:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        if(this.poolId != '')
            params.targetId = this.poolId
        if(this.optStartDate != '')
            params.gmtCreateStart = this.optStartDate
        if(this.optEndDate != '')
            params.gmtCreateEnd = this.optEndDate
        apiBigflow.getFlowPoolBills(params).then(res=>{
        if(res.resultCode == 0){
            this.flowPoolBills = res.data
            this.total = res.rowNum
            this.loading = false
          }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryFlowPoolBills()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryFlowPoolBills()
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
