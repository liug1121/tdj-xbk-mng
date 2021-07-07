<template>
  <!-- 通信计划 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryCardInfoRef" :model="querySignalForm">
        <el-form-item label="蜂窝账号" class="queryFormItem">
          <el-select class="queryFormInput" v-model="querySignalForm.fwAccount" filterable placeholder="请输入蜂窝账号关键词">
            <el-option v-for="item in areaOptions" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通信计划名称" class="queryFormItem">
          <el-input class="queryFormInput" v-model="querySignalForm.planName" placeholder="请输入通信计划名称"></el-input>
        </el-form-item>
        <el-form-item label="通信计划ID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="querySignalForm.planId" placeholder="请输入通信计划ID"></el-input>
        </el-form-item>
        <el-form-item label="计划别名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="querySignalForm.planNickName" placeholder="请输入计划别名"></el-input>
        </el-form-item>
        <el-form-item label="运营商账户ID" class="queryFormItem">
          <el-select class="queryFormInput" v-model="querySignalForm.unionAccount" filterable placeholder="请输入运营商账户ID关键词">
            <el-option v-for="item in areaOptions" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getSignalList()">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addSignPlan">添加</el-button>
        <el-button size="medium" type="primary" icon="el-icon-upload2" @click="importData">批量导入</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download">导出</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table :data="signalList" border max-height="550" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop =='areaCL'">
              <span v-if="scope.row.area === 0">省内</span>
              <span v-else>全国</span>
            </div>
            <div v-if="p.prop == 'canRecvMsgCL'">
              <i v-if="scope.row.canRecvMsg === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>
            <div v-if="p.prop == 'canSendMsgCL'">
              <i v-if="scope.row.canSendMsg === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>

            <div v-if="p.prop == 'canRecvVoiceCL'">
              <i v-if="scope.row.canRecvVoice === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>
            <div v-if="p.prop == 'canSendVoiceCL'">
              <i v-if="scope.row.canSendVoice === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>

            <div v-if="p.prop == 'canProvinceFastCL'">
              <i v-if="scope.row.canProvinceFast === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>
            <div v-if="p.prop == 'canProvinceMiddleCL'">
              <i v-if="scope.row.canProvinceMiddle === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>

            <div v-if="p.prop == 'canCountryFastCL'">
              <i v-if="scope.row.canCountryFast === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>
            <div v-if="p.prop == 'canCountryMiddleCL'">
              <i v-if="scope.row.canCountryMiddle === 1" class="el-icon-s-opportunity" style="color:#F8E409"></i>
              <i v-else class="el-icon-s-opportunity"></i>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button size="mini" type="primary" plain @click="signPlanEdit(scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" plain>停用</el-button>
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
    <!-- 新增 -->
    <addSignPlan ref="addModal" @addSuccess="addSuccess" :honeycombList="honeycombList"></addSignPlan>
    <!-- 导入 -->
    <ImportModal ref="ImportModal" @InportModalSuccess="InportModalSuccess" :fwAccountOptions="fwAccountOptions"></ImportModal>
    <!-- 编辑 -->
    <el-dialog title="修改通信计划" :visible.sync="editVisible" width="1040px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
      <editSignPlan :list="chooseList" @editSignPlanSuccess="editSignPlanSuccess" :honeycombList="honeycombList"></editSignPlan>
    </el-dialog>
  </div>
</template>

<script>
import addSignPlan from "./addSignPlan"
import editSignPlan from "./editSignPlan"
import ImportModal from "./ImportModal"
import API from 'api/baseSet'
export default {
  name: 'signPlan',
  data () {
    return {
      // 通信列表
      signalList: [],
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
      // 表格 label 字段名称
      table_column: [
        { prop: 'fwAccount', label: '蜂窝平台', width: 200, fixed: 'left' },
        { prop: 'planName', label: '通信计划', width: 200 },
        { prop: 'planCode', label: '通信计划码', width: 200 },
        // { prop: 'planId', label: '通信计划ID', width: 150 },
        { prop: 'id', label: '编码', width: 150 },
        { prop: 'planNickName', label: '计划别名', width: 150 },
        { prop: 'areaCL', label: '区域', width: 150 },
        { prop: 'canRecvMsgCL', label: '收短信(mt)', width: 100 },
        { prop: 'canSendMsgCL', label: '发短信(mo)', width: 100 },
        { prop: 'canRecvVoiceCL', label: '语音呼入(mt)', width: 110 },
        { prop: 'canSendVoiceCL', label: '语音呼出(mo)', width: 110 },
        { prop: 'canProvinceFastCL', label: '省内高速流量', width: 110 },
        { prop: 'canProvinceMiddleCL', label: '省内中速流量', width: 110 },
        { prop: 'canCountryFastCL', label: '全国高速流量', width: 110 },
        { prop: 'canCountryMiddleCL', label: '全国中速流量', width: 110 },
        { prop: 'unionAccount', label: '运营商账户ID', width: 110 },
        { prop: 'comment', label: '备注', width: 100 },
        { prop: 'description', label: '描述', width: 250 },
        { prop: 'operation', label: '操作', width: 150, fixed: 'right' }
      ],
      querySignalForm: {
        fwAccount: null,
        planId: null,
        planName: null,
        planNickName: null,
        unionAccount: null
      },
      // 区域
      areaOptions: [
        { label: "全国", value: 1 },
        { label: "省内", value: 0 }
      ],
      // 蜂窝平台
      honeycombList: [],
      fwAccountOptions: [
        { label: "测试1", value: 0 },
        { label: "测试2", value: 1 },
        { label: "测试3", value: 2 },
        { label: "测试4", value: 3 }
      ],
      chooseList: {},
      editVisible: false
    }
  },
  components: {
    addSignPlan,
    // 导入 组件
    ImportModal,
    editSignPlan
  },
  mounted () {
    this.getSignalList()
    this.getHoneycombList()
  },
  methods: {
    // todo 获取列表 未完成
    getSignalList () {
      let querySignalForm = this.querySignalForm;
      let params = Object.assign(
        this.queryInfo,
        querySignalForm
      );
      API.apiPlansList(params).then(res => {
        if (res.resultCode === 0) {
          if (res.data.length !== null) {
            this.signalList = res.data
            this.total = res.rowNum
            console.log(this.signalList)
          }
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getSignalList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage - 1
      this.getSignalList()
    },
    // 获取蜂窝平台数据
    getHoneycombList () {
      const data = {
        pageSize: 1000
      }
      API.apiFwAccountList(data).then(res => {
        if (res.resultCode === 0) {
          this.honeycombList = res.data
          // console.log(this.honeycombList)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    signPlanEdit (row) {
      this.chooseList = row
      console.log(this.chooseList);
      this.editVisible = true
    },
    editSignPlanSuccess (data) {
      API.apiPlansModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('编辑成功！')
          this.getSignalList()
          this.editVisible = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 

    // 
    addSignPlan () {
      this.$refs.addModal.dialogVisible = true;
    },
    addSuccess () {
      // console.log(JSON.stringify(this.$refs.addModal.addForm));
      const data = JSON.stringify(this.$refs.addModal.addForm)
      API.apiPlansAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getSignalList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    importData () {
      this.$refs.ImportModal.dialogVisible = true;
    },
    // 导入组件，成功后
    InportModalSuccess (param, account) {
      API.apiPlansImport(param, account).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('导入成功！')
          this.getSignalList()
        } else {
          this.$message.error('导入失败')
        }
      })
    }
  }
}
</script>

<style scoped>
</style>