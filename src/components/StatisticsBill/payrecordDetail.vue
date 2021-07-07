<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 列表区域 -->
      <el-table v-loading="loading" :data="PayRecordsDetailList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop =='opt_typeCL'">
              <div v-if="scope.row.opt_type === 0">未处理</div>
              <div v-if="scope.row.opt_type === 1">拒绝</div>
              <div v-if="scope.row.opt_type === 2">审核已经完成</div>
              <div v-if="scope.row.opt_type === 3">财务审核已经完成</div>
              <div v-if="scope.row.opt_type === 4">已经退款</div>
            </div>
            <div v-if="p.prop == 'create_timeCL'">
              {{scope.row.create_time.split(' ')[0]}}
            </div>
            <div v-if="p.prop == 'create_time1CL'">
              {{scope.row.create_time.split(' ')[1]}}
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import API from 'api/StatisticsBill'
export default {
  data () {
    return {
      // 卡信息列表
      PayRecordsDetailList: [],
      // 列表，标题、字段
      table_column: [
        { prop: 'create_timeCL', label: '日期', width: 150 },
        { prop: 'create_time1CL', label: '时间', width: 100 },
        { prop: 'flow_id', label: '审核id', width: 100 },
        { prop: 'opt_typeCL', label: '操作状态', width: 120 },
        { prop: 'operator', label: '操作员', width: 240 },
        { prop: 'price', label: '金额', width: 120 },
        { prop: 'desc', label: '备注' }
      ],
      loading: false
    };
  },
  mounted () {
    this.getPayRecordsDetailList()
  },
  methods: {
    //获取 列表
    getPayRecordsDetailList () {
      const data = {
        flowId: sessionStorage.getItem('flowId')
      }
      this.loading = true
      API.apiFlowDetail(data).then(res => {
        if (res.resultCode === 0) {
          this.PayRecordsDetailList = res.data
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
};
</script>
