<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true" :model="queryPushLog">
        <el-form-item label="iccid" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="queryPushLog.iccid"></el-input>
        </el-form-item>    
        <el-form-item label="开始时间" class="queryFormItem" >
            <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange"  v-model="queryPushLog.startDate">
          </el-date-picker>
          <!-- <el-input class="queryFormInput" clearable placeholder="请输入开始时间" style="width:150px" v-model="queryPushLog.startDate"></el-input> -->
        </el-form-item> 
        <el-form-item label="结束时间" class="queryFormItem" >
            <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="endTimeChange"  v-model="queryPushLog.endDate">
          </el-date-picker>
          <!-- <el-input class="queryFormInput" clearable placeholder="请输入结束时间" style="width:150px" v-model="queryPushLog.endDate"></el-input> -->
        </el-form-item> 
        <el-form-item label="推送状态" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择推送状态" v-model="queryPushLog.status">
            <el-option v-for="item in allStatus" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="queryPushLog.channelId">
            <el-option v-for="item in pushInfos" :key="item.id" :label="item.channelName" :value="item.channelId"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryPushLogClick">查询</el-button>
      </el-form>
      
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="pushLogs" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
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
import apiSystem from './../../api/system'
export default {
  components: {

  },
  data () {
    return {
    page: 0,
    pageSize: 10,
    total: 0,
        
    loading: false,
    pushLogs:[],
    pushInfos:[],
    queryPushLog:{},
    allStatus:[
        {value:1, name:"推送成功"},
        {value:-1, name:"推送失败"}
    ],
      
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
          
        { prop: 'channelName', label: '渠道', width: 200, fixed: 'left', sortable: true },
        { prop: 'iccid', label: 'iccid', width: 200, fixed: 'left', sortable: true },
        { prop: 'duration', label: '耗时(毫秒)', width: 100, fixed: 'left', sortable: true },
        { prop: 'statusName', label: '状态', width: 100, sortable: true },
        { prop: 'createTime', label: '推送时间', width: 200, sortable: true },
        { prop: 'data', label: '推送信息', width: 300, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
    this.queryPushLogs()
    this.queryPushInfos()
  },
  watch: {},
  methods: {
      queryPushInfos:function(){
        let params = {}
        
        apiSystem.getPushInfos(params).then(res=>{
            if(res.resultCode == 0){
                this.pushInfos = res.data
            }
        })
      },
      queryPushLogClick:function(){
          this.queryPushLogs()
      },

      queryPushLogs:function(){
        this.loading = true
        let params = {}
        params.iccid = this.queryPushLog.iccid
        params.startDate = this.queryPushLog.startDate
        params.endDate = this.queryPushLog.endDate
        params.status = this.queryPushLog.status
        params.channelId = this.queryPushLog.channelId
        params.page = this.page
        params.pageSize = this.pageSize
        apiSystem.getPushLogs(params).then(res=>{
            if(res.resultCode == 0){
                this.pushLogs = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
      },
      startTimeChange () {
        this.queryPushLog.startDate = `${this.queryPushLog.startDate}`
      },
      endTimeChange () {
        this.queryPushLog.endDate = `${this.queryPushLog.endDate}`
      },
      handleSizeChange (newPage) {
        this.page = newPage;
        this.queryPushLogs()
      },
      handleCurrentChange (newPage) {
        this.page = newPage;
        this.queryPushLogs()
      }
  }
};
</script>
<style scoped>
</style>