<template>
  <!-- 苏宁大流量卡 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryFlowOrderForm" :model="queryFlowOrderForm">
        <el-form-item label="订单编号" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryFlowOrderForm.orderId" placeholder="请输入订单编号"></el-input>
        </el-form-item>
        <el-form-item label="姓名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryFlowOrderForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryFlowOrderForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="地址" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryFlowOrderForm.address" placeholder="请输入地址"></el-input>
        </el-form-item>
        <el-form-item label="入库时间" class="queryFormItem">
          <el-date-picker v-model="queryFlowOrderForm.startDate" style="width:135px" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker v-model="queryFlowOrderForm.endDate" style="width:135px" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryFlowOrder">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" @click="exportCardInfo">导出</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table v-loading="loading" :data="orderList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop ==='addressCL'">
              {{scope.row.province}}{{scope.row.city}}{{scope.row.address}}
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
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
import API from 'api/flowOrder'
export default {
  name: 'signPlan',
  data () {
    return {
      // 订单列表
      orderList: [],
      // 获取用户列表的参数对象
      page: 1,
      pageSize: 10,
      // 总数据条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'order_id', label: '订单编号', width: 200, fixed: 'left' },
        { prop: 'create_time', label: '日期', width: 180 },
        { prop: 'name', label: '姓名', width: 80 },
        { prop: 'phone', label: '电话', width: 120 },
        { prop: 'addressCL', label: '发货地址' }
      ],
      // 查询字段
      queryFlowOrderForm: {
        address: null,
        endDate: null,
        name: null,
        orderId: null,
        phone: null,
        startDate: null,
        page: 0,
        pageSize: 10
      },
      loading: false
    }
  },
  mounted () {
    // 获取 订单列表
    this.getOrdersList();
  },
  methods: {
    // 获取列表
    getOrdersList () {
      let params = this.queryFlowOrderForm
      this.loading = true
      API.apiFlowOrderList(params).then(res => {
        if (res.resultCode === 0) {
          this.orderList = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          // this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryFlowOrderForm.pageSize = newSize
      this.getOrdersList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryFlowOrderForm.page = newPage - 1
      this.getOrdersList()
    },
    queryFlowOrder () {
      if (this.queryFlowOrderForm.address === '') {
        this.queryFlowOrderForm.address = null
      }
      if (this.queryFlowOrderForm.phone === '') {
        this.queryFlowOrderForm.phone = null
      }
      if (this.queryFlowOrderForm.orderId === '') {
        this.queryFlowOrderForm.orderId = null
      }
      if (this.queryFlowOrderForm.name === '') {
        this.queryFlowOrderForm.name = null
      }
      if (this.queryFlowOrderForm.startDate === '') {
        this.queryFlowOrderForm.startDate = null
      }
      if (this.queryFlowOrderForm.endDate === '') {
        this.queryFlowOrderForm.endDate = null
      }
      this.getOrdersList();
    },
    startTimeChange () {
      this.queryFlowOrderForm.startDate = `${this.queryFlowOrderForm.startDate} 00:00:00`
      console.log(this.queryFlowOrderForm.startDate)
    },
    endTimeChange () {
      this.queryFlowOrderForm.endDate = `${this.queryFlowOrderForm.endDate} 23:59:59`
      console.log(this.queryFlowOrderForm.endDate)
    },

    //导出  还未做
    exportCardInfo () {
      // API.apiRegistercardsExport(this.queryFlowOrderForm).then(res => {
      //   if (!res) {
      //     return
      //   }
      //   this.$message.success('请前往“我的任务”中查询')
      // })
    }
  }
}
</script>

<style scoped>
</style>
