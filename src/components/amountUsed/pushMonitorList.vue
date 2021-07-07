<template>
  <!-- 推送监控 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryMonitorFormRef" :model="queryMonitorlistFormModel">
        <el-form-item label="推送地址" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryMonitorlistFormModel.pushUrl" placeholder="请输入推送地址"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <channelSelect v-model="queryMonitorlistFormModel.channelId" style="width:120px !important" @channelSelectId="channelSelectId"></channelSelect>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getMonitorlist()">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="Monitorlist" border min-height="500px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'totalPushCL'">
              <span v-if="scope.row.totalPush == null">{{scope.row.totalSuccessPush + scope.row.totalFaildPush}}</span>
              <span v-else>{{scope.row.totalPush}}</span>
            </div>
            <div v-if="p.prop == 'SuccessFaildPush'">
              {{scope.row.totalSuccessPush}}/{{scope.row.totalFaildPush}}
            </div>
            <div v-if="p.prop =='SuccessRate'">
              <span>{{(Math.round(scope.row.totalSuccessPush / (scope.row.totalSuccessPush + scope.row.totalFaildPush) * 10000) / 100.00)+"%"}}</span>
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
import API from 'api/amountUsed'
import channelSelect from './../sale/channelSelect'
export default {
  components: {
    channelSelect
  },
  data () {
    return {
      // 列表显示
      Monitorlist: [],
      page: 1,
      pageSize: 10,
      total: 0,
      // 表格
      table_column: [
        { prop: 'channelName', label: '渠道', width: 250, fixed: 'left', sortable: true },
        { prop: 'pushUrl', label: '推送地址' },
        { prop: 'totalPushCL', label: '总推送量', width: 100 },
        { prop: 'SuccessFaildPush', label: '成功/失败', width: 100 },
        { prop: 'SuccessRate', label: '成功率', width: 100 },
        { prop: 'responseTime', label: '响应时间', width: 100, sortable: true }
      ],
      // 查询表字段
      queryMonitorlistFormModel: {
        pushUrl: null,
        channelId: null,
        page: 0,
        pageSize: 10
      },
      loading: false
    };
  },
  mounted () {
    this.getMonitorlist()
    // const aa = (Math.round(11.1 / 20 * 10000) / 100.00) + "%"
    // console.log(aa);
  },
  methods: {
    // 渠道
    channelSelectId (channelSelectId) {
      this.queryMonitorlistFormModel.channelId = channelSelectId
      // console.log(channelSelectId);
    },
    //获取分页列表
    getMonitorlist () {
      // 获取查询字段
      let params = this.queryMonitorlistFormModel
      this.loading = true
      // 获取后台数据
      API.apiPushStatics(params).then(res => {
        if (res.resultCode === 0) {
          this.Monitorlist = res.data
          console.log(this.Monitorlist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryMonitorlistFormModel.pageSize = newSize
      this.getPushlist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryMonitorlistFormModel.page = newPage
      this.getPushlist()
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
