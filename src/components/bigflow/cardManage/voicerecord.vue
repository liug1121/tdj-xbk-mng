<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="ICCID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="iccid"></el-input>
        </el-form-item> 
        <el-form-item label="MSISDN" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入msisdn" style="width:150px" v-model="msisdn"></el-input>
        </el-form-item>
        <el-form-item label="APN" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入msisdn" style="width:150px" v-model="apn"></el-input>
        </el-form-item>
        <el-form-item label="账期" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入msisdn" style="width:150px" v-model="cycleId"></el-input>
        </el-form-item>
        <el-form-item label="话单类型" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入msisdn" style="width:150px" v-model="voiceType"></el-input>
        </el-form-item>
        <el-form-item label="创建时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="createStartDate">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="createEndDate">
          </el-date-picker>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryVoiceRecords">搜索</el-button>
      </el-form>
      
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="voiceRecords" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
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
// import editCardInfo from './../../cardInfo/editCardInfo'
// import channelSelect from './../../sale/channelSelect'
export default {
  components: {
    // editCardInfo,
    // channelSelect
  },
  data () {
    return {
    loading: false,
    iccid:'',
    msisdn:'',
    apn:'' ,
    cycleId:'' ,
    voiceType :'',
    createStartDate:'',
    createEndDate:'',
    voiceTypes:[],
    voiceRecords:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 200, fixed: 'left', sortable: true },
        { prop: 'phone', label: 'MSISDN', width: 190, fixed: 'left', sortable: true },
        { prop: 'type', label: '话单类型', width: 200, sortable: true },
        { prop: 'usedName', label: '用量', width: 150, sortable: true },
        { prop: 'fwId', label: '话单ID', width: 300, sortable: true },
        { prop: 'cycleId', label: '账期', width: 200, sortable: true },
        { prop: 'apn', label: 'APN', width: 180, sortable: true },
        { prop: 'gmtStart', label: '开始时间', width: 180, sortable: true },
        { prop: 'gmtEnd', label: '结束时间', width: 180, sortable: true },
        { prop: 'gmtCreate', label: '创建时间', width: 300 }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.queryVoiceRecords()
  },
  watch: {},
  methods: {
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryVoiceRecords:function(){
        let params = {}
        params.page = this.page
        if(this.iccid != '')
            params.iccid = this.iccid
        if(this.msisdn != '')
            params.phone = this.msisdn
        if(this.voiceType != '')
            params.type = this.voiceType 
        if(this.apn != '')
            params.apn = this.apn
        if(this.cycleId != '')
            params.cycleId = this.cycleId
        if(this.createStartDate != '')
            params.gmtCreateStart = this.createStartDate
        if(this.createEndDate != '')
            params.gmtCreateEnd = this.createEndDate
        apiBigflow.getVoiceRecords(params).then(res=>{
            if(res.resultCode == 0){
              this.voiceRecords = res.data
              this.total = res.rowNum
          }
        })
    },
    
    startTimeChange () {
      this.createStartDate = `${this.createStartDate}`
    },
    endTimeChange () {
      this.createEndDate = `${this.createEndDate}`
    },
    handleSelectionChange (val) {
      
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryVoiceRecords()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryVoiceRecords()
    },
  }
};
</script>
<style scoped>
</style>
