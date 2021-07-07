<template>
  <!-- 资费计划 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addPaymentPlan">添加</el-button>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryPaymentPlan">查询</el-button>
        <el-button size="medium" type="primary" icon="el-icon-upload2">批量导入</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table :data="payplansList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop == 'operation'">
              <el-button size="mini">编辑</el-button>
              <el-button size="mini" type="danger">停用</el-button>
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
    <addPaymentPlan ref="addPaymentPlanRefs" @addSuccess="addSuccess"></addPaymentPlan>
    <!-- 查询弹出框 -->
    <el-dialog title="查询" :visible.sync="queryPaymentPlanDialogVisible" width="430px">
      <el-form ref="queryCardInfoRef" :model="queryPaymentPlanForm" label-width="100px">
        <el-form-item label="蜂窝账号">
          <el-select v-model="queryPaymentPlanForm.fwAccount" filterable placeholder="请输入蜂窝账号关键词" style="width:100%">
            <el-option v-for="item in areaOptions" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属地">
          <el-select v-model="queryPaymentPlanForm.area" filterable placeholder="请输入归属地关键词" style="width:100%">
            <el-option v-for="item in areaOptions" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资费计划名称">
          <el-input v-model="queryPaymentPlanForm.payName" placeholder="请输入资费计划名称"></el-input>
        </el-form-item>
        <el-form-item label="资费价格">
          <el-input v-model="queryPaymentPlanForm.price" placeholder="请输入资费价格"></el-input>
        </el-form-item>
        <el-form-item label="用量区域">
          <el-select style="width:100%;" v-model="queryPaymentPlanForm.areaCanUse" placeholder="请选择用量区域">
            <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="套内用量">
          <el-input v-model="queryPaymentPlanForm.total" placeholder="请输入套内用量"></el-input>
        </el-form-item>
        <el-form-item label="启用时间">
          <el-date-picker style="width:135px" v-model="queryPaymentPlanForm.date" type="date" placeholder="开始日期">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:135px" v-model="queryPaymentPlanForm.date" type="date" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="停用时间">
          <el-date-picker style="width:135px" v-model="queryPaymentPlanForm.stopDate" type="date" placeholder="开始日期">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:135px" v-model="queryPaymentPlanForm.stopDate" type="date" placeholder="结束日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="queryPaymentPlanDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getPayplansList()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import addPaymentPlan from "./addPaymentPlan"
import API from 'api/baseSet'
export default {
  name: 'signPlan',
  data () {
    return {
      // 列表
      payplansList: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'fwAccount', label: '蜂窝账号', width: 100, fixed: 'left' },
        { prop: 'area', label: '归属地', width: 150 },
        { prop: 'payName', label: '资费计划名称', width: 200, },
        { prop: 'price', label: '资费价格', width: 150 },
        { prop: 'areaCanUse', label: '用量区域', width: 150 },
        { prop: 'total', label: '套内用量', width: 100 },
        { prop: 'date', label: '启用时间', width: 250 },
        { prop: 'stopDate', label: '停用时间', width: 250 },
        { prop: 'operation', label: '操作', width: 145, fixed: 'right' }
      ],
      queryPaymentPlanDialogVisible: false,
      queryPaymentPlanForm: {
        area: null,
        areaCanUse: null,
        date: null,
        fwAccount: null,
        payName: null,
        price: null,
        stopDate: null,
        total: null,
        page: 0,
        pageSize: 10
      },
      // 区域
      areaOptions: [
        { label: "全国", value: "01" },
        { label: "省内", value: "02" }
      ],
    }
  },
  components: { addPaymentPlan },
  mounted () {
    this.getPayplansList()
  },
  methods: {
    //获取资费计划列表
    getPayplansList () {
      let params = this.queryPaymentPlanForm
      API.apiPayplansList(params).then(res => {
        if (res.resultCode === 0) {
          if (res.data.length !== null) {
            this.payplansList = res.data
            console.log(this.payplansList)
            this.total = res.rowNum
            this.queryPaymentPlanDialogVisible = false
          }
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryPaymentPlanForm.pageSize = newSize
      this.getPayplansList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryPaymentPlanForm.page = newPage - 1
      this.getPayplansList()
    },
    queryPaymentPlan () {
      this.queryPaymentPlanDialogVisible = true
    },
    addPaymentPlan () {
      this.$refs.addPaymentPlanRefs.dialogVisible = true;
    },
    addSuccess () {
      const data = JSON.stringify(this.$refs.addPaymentPlanRefs.addForm)
      API.apiPayplansAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getPayplansList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
