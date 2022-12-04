<template>
  <!-- 我的任务 刘珍利  -->
  <div class="box_subject">
    <div class="button_content">
        <!-- <el-button class="upload-btn" size="medium"  slot="trigger" type="primary"  @click="refresh"
        >刷新页面</el-button> -->
      </div>
    <el-card class="all_list">
      <!-- 卡库存 List 区域 -->
      <el-form :model="alertQueryForm" :inline="true">
         <el-form-item label="处理状态" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择" v-model="alertQueryForm.status">
            <el-option v-for="item in alertStatus" :key="item.value" :label="item.name" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="refresh">查询</el-button>
      </el-form>
      <el-table v-loading="loading" :data="alerts" border max-height="600px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop =='target_local_file_pathCL'">
              <a :href="scope.row.target_local_file_path">{{scope.row.target_local_file_path}}</a>
            </div>
            <div v-if="p.prop == 'statusName' || p.prop == 'opts'">
              <div v-if="p.prop == 'statusName'">
                <span v-if="scope.row.status === 0">未处理</span>
                <span v-if="scope.row.status === 1">已处理</span>
              </div>
              <div v-if="p.prop == 'opts' && scope.row.status === 0">
                <el-button  type="text" size="small" @click="toDo(scope.row.id)">处理</el-button>
              </div>
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-dialog title="告警处理" :visible.sync="alertDoDlgShowed" width="450px" @close="alertDoDlgShowed = false">
      <!-- 内容主体区域 -->  
      <el-form :model="doAlertForm"  label-width="110px">
        <el-form-item label="备注">
          <el-input style="width:300px;" v-model="doAlertForm.comment" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="alertDoDlgShowed = false">取 消</el-button>
        <el-button type="primary" @click="okAlertDo">确 定</el-button>
      </span>  
    </el-dialog> 
  </div>
</template>

<script>
import API from 'api/tasks'
export default {
  data () {
    return {
      alertDoDlgShowed: false,
      doAlertForm:{
        comment:'',
        alertId:-1
      },
      alertQueryForm:{
        status :0
      },
      alertStatus:[
        {name:'未处理', value:0},
        {name:'已处理', value:1}
      ],
      // 列表显示
      alerts: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格
      table_column: [
        { prop: 'poolName', label: '池名称', width: 300 },
        { prop: 'cycle_id', label: '账期', width: 155},
        { prop: 'threshold', label: '告警阀值', width: 80 },
        { prop: 'alert_msg', label: '告警内容', width: 200 },
        { prop: 'create_time', label: '告警时间', width: 80 },
        { prop: 'statusName', label: '当前状态', width: 300 },
        { prop: 'operator', label: '操作人', width: 80 },
        { prop: 'comment', label: '备注说明', width: 155 },
        { prop: 'done_time', label: '操作时间', width: 155 },
        { prop: 'opts', label: '操作', width: 155 }
      ],
      loading: false
    };
  },
  mounted () {
    // this.getTaskslist()
    this.getAlerts()
  },
  methods: {
    okAlertDo:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {}
            params.comment = that.doAlertForm.comment
            params.alertId = that.doAlertForm.alertId 
            API.apiAlertDo(params).then(res=>{
                if(res.resultCode == 0){
                    that.getAlerts()
                    that.$message.success('操作成功')
                    that.alertDoDlgShowed = false
                }else{
                    that.$message.error('操作失败:' + res.resultInfo)
                }
            })
        }).catch(() => {
        }); 
    },
    toDo:function(alertId){
        this.alertDoDlgShowed = true
        this.doAlertForm.alertId = alertId
    },
    refresh(){
      this.getAlerts()
    },
    //获取分页列表
    getAlerts(){
      let params={}
      params.status = this.alertQueryForm.status
      params.page = this.page
      params.pageSize = this.pageSize
      this.loading = true
      // 获取后台数据
      API.apiAlerts(params).then(res => {
        if (res.resultCode === 0) {
          this.alerts = res.data
        //   console.log(this.taskslist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })

    },
    // getTaskslist () {
    //   // 获取查询字段
    //   let params = Object.assign(
    //     this.queryInfo
    //   );
    //   this.loading = true
    //   // 获取后台数据
    //   API.apiTasks(params).then(res => {
    //     if (res.resultCode === 0) {
    //       this.taskslist = res.data
    //       console.log(this.taskslist);
    //       this.total = res.rowNum
    //       this.loading = false
    //     } else {
    //       this.$message.error(res.resultInfo)
    //     }
    //   })
    // },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.pageSize = newSize
      this.getAlerts()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.page = newPage
      this.getAlerts()
    }
  }
};
</script>
<style scoped>
.time-line {
  display: inline-block;
  width: 20px;
  text-align: center;
}
.el-table__body-wrapper is-scrolling-left {
  max-height: 487px !important;
}
</style>
