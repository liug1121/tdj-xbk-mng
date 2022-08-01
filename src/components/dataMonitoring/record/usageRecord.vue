<template>
  <div class="box_subject">
    <el-card class="all_list">
     <el-form :inline="true" ref="queryLBSlistFormRef" :model="queryForm">
        <el-form-item label="ICCID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryForm.iccid" clearable placeholder="请输入ICCID" style="width:202px"></el-input>
        </el-form-item>
        <!-- <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="queryForm.channelId">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="话单日期" class="queryFormItem">
          <el-date-picker style="width:140px" v-model="queryForm.recordDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd"  @change="recordDateChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getUsageRecords"
          >查询</el-button>
        </el-form-item>
      </el-form>
      <el-table v-loading="loading" :data="usageRecords" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
        </el-table-column>
      </el-table>
      <!-- 分页 区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[200,100,30,20,10]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
// import API from 'api/dataMoniting'
import apiBigflow from 'api/bigflow'
// import channelSelect from './../../sale/channelSelect'
export default {
//   components: {
//     channelSelect
//   },
  data () {
    return {
      queryForm:{
        iccid:"",
        channelId:"",
        recordDate:''
      },
      loading:false,
      page:0,
      pageSize:200,
      total:1000000000,
      channels:[],
      usageRecords:[],
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 180 },
        { prop: 'phone', label: '号码', width: 150 },
        { prop: 'file_name', label: 'IMEI',width: 150 },
        { prop: 'channelName', label: '渠道',width: 150 },
        { prop: 'used', label: '用量', width: 80 },
        { prop: 'gmt_start', label: '开始时间', width: 180 },
        { prop: 'gmt_end', label: '结束时间', width: 180 },
        { prop: 'cycle_id', label: '账期', width: 80 },
        { prop: 'apn', label: 'APN', width: 80 },
        { prop: 'gmt_create', label: '话单时间', width: 180 }
      ],
    };
  },
  created () {
    // this.getAllChannels()
    this.getUsageRecords()
  },
  mounted () {
    
  },
  methods: {
    getUsageRecords:function(){
        let params = {}
        params.iccid = this.queryForm.iccid
        params.channelId = this.queryForm.channelId
        params.recordDate = this.queryForm.recordDate
        params.page = this.page
        params.pageSize = this.pageSize
        this.loading = true
        apiBigflow.getUsageRecords(params).then(res=>{
            if(res.resultCode == 0){
                this.usageRecords = res.data
            }else{
                this.$message.error('查询失败')
            }
            this.loading = false
        })
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
            }
        })
    },
    recordDateChange:function(){

    },
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.getUsageRecords()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.page = newPage - 1
      this.getUsageRecords()
    },
  }
};
</script>
<style scoped>

</style>