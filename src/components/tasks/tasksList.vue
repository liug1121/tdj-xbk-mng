<template>
  <!-- 我的任务 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="taskslist" border max-height="600px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop =='target_local_file_pathCL'">
              <a :href="scope.row.target_local_file_path">{{scope.row.target_local_file_path}}</a>
            </div>
            <div v-if="p.prop == 'result_infoCL'">
              <span v-if="scope.row.result_info === 'success'">成功</span>
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
  </div>
</template>

<script>
import API from 'api/tasks'
export default {
  data () {
    return {
      // 列表显示
      taskslist: [],
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格
      table_column: [
        { prop: 'create_time', label: '创建时间', width: 155, fixed: 'left' },
        { prop: 'id', label: 'id', width: 80 },
        { prop: 'params', label: '参数信息', width: 200 },
        { prop: 'result_infoCL', label: '结果信息', width: 80 },
        { prop: 'target_local_file_pathCL', label: '下载文件地址', width: 300 },
        { prop: 'source_local_file_path', label: '原文件路径', width: 300 },
        { prop: 'type', label: '类型', width: 80 },
        { prop: 'uuid', label: 'uuid', width: 155 }
      ],
      loading: false
    };
  },
  mounted () {
    this.getTaskslist()
  },
  methods: {
    //获取分页列表
    getTaskslist () {
      // 获取查询字段
      let params = Object.assign(
        this.queryInfo
      );
      this.loading = true
      // 获取后台数据
      API.apiTasks(params).then(res => {
        if (res.resultCode === 0) {
          this.taskslist = res.data
          console.log(this.taskslist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getTaskslist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage - 1
      this.getTaskslist()
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
