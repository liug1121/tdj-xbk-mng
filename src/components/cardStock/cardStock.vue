<template>
  <!-- 卡库存 2020-06月 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryCardStockFormRef" :model="queryCardStockFormModel">
        <el-form-item label="卡号码" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryCardStockFormModel.cardNo" clearable placeholder="请输入卡号码" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="ICCID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryCardStockFormModel.iccid" clearable placeholder="请输入ICCID" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="档位" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardStockFormModel.level" clearable placeholder="请选择档位">
            <el-option v-for="item in gearPositionOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardStockFormModel.status" clearable placeholder="请选择卡状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡类型" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardStockFormModel.cardType" clearable placeholder="请选择卡类型">
            <el-option v-for="item in cardTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库时间" class="queryFormItem">
          <el-date-picker style="width:140px" v-model="queryCardStockFormModel.stockInDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px" v-model="queryCardStockFormModel.stockOutDate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryCardStock">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- button 区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" @click="exportCardStock">导出</el-button>
        <el-button class="upload-btn" size="medium" icon="el-icon-upload2" slot="trigger" type="primary" @click="openImportModal">导入</el-button>
      </div>
      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="cardStockList" border max-height="550px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop == 'cardTypeCL'">
              <span v-if="scope.row.cardType == 0">学霸卡</span>
              <span v-else>大流量卡</span>
            </div>
            <div v-if="p.prop == 'storeNameCL'">
              <span v-if="scope.row.storeName === 'null'">-</span>
              <span v-else>{{scope.row.storeName}}</span>
            </div>
            <div v-if="p.prop == 'statusCL'">
              <div v-if="scope.row.status === 1">在用</div>
              <div v-if="scope.row.status === 0">可用</div>
              <div v-if="scope.row.status === 50">停用</div>
            </div>
            <!-- 操作 -->
            <div v-if="p.prop == 'operation'">
              <el-button v-if="scope.row.status === 50" size="mini" type="warning" plain @click="deactivation(scope.row, 0)">启用</el-button>
              <el-button v-else size="mini" type="danger" plain @click="deactivation(scope.row, 50)">停用</el-button>
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

      <!-- 导入组件 -->
      <ImportModal ref="ImportModal" @ImportModalSuccess="ImportModalSuccess" :cardTypeOptions="cardTypeOptions" :honeycombOptions="honeycombOptions"></ImportModal>
    </el-card>
  </div>
</template>

<script>
// 刘珍利 2020-6月 注释
import ImportModal from "components/cardStock/ImportModal"
import API from 'api/cardStock'
export default {
  components: {
    // 导入 组件
    ImportModal
  },
  data () {
    return {
      // 列表显示
      cardStockList: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格
      table_column: [
        { prop: 'cardNo', label: '卡号码', width: 120, fixed: 'left' },
        { prop: 'iccid', label: 'ICCID', width: 180 },
        { prop: 'level', label: '档位', width: 70 },
        { prop: 'fwAccount', label: '蜂窝平台账号' },
        { prop: 'storeNameCL', label: '仓位名称', width: 120 },
        { prop: 'cardTypeCL', label: '卡类型', width: 80 },
        { prop: 'statusCL', label: '卡状态', width: 80 },
        { prop: 'area', label: '归属地', width: 150 },
        { prop: 'stockInDate', label: '入库时间', width: 220 },
        { prop: 'operation', label: '操作', width: 130, fixed: 'right' }
      ],
      // 卡状态
      statusOptions: [
        { label: "可用", value: 0 },
        { label: "在用", value: 1 },
        { label: "已停用", value: 50 }
      ],
      // 蜂窝平台 导入
      honeycombOptions: [],
      // 档位
      gearPositionOptions: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 }
      ],
      // 卡类型
      cardTypeOptions: [
        { label: "学霸卡", value: 0 },
        { label: "大流量", value: 1 }
      ],
      // 查询表字段
      queryCardStockFormModel: {
        cardNo: null,
        cardType: null,
        iccid: null,
        level: null,
        status: null,
        stockInDate: null,
        stockOutDate: null,
        page: 0,
        pageSize: 10
      },
      loading: false
    };
  },
  mounted () {
    this.getCardStockList()
    this.gethoneycombOptions()
  },
  methods: {
    //获取 卡库存 列表
    getCardStockList () {
      let params = this.queryCardStockFormModel;
      this.loading = true
      API.apiCardsStocks(params).then(res => {
        if (res.resultCode === 0) {
          this.cardStockList = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryCardStockFormModel.pageSize = newSize
      this.getCardStockList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryCardStockFormModel.page = newPage - 1
      this.getCardStockList()
    },
    startTimeChange () {
      this.queryCardStockFormModel.stockInDate = `${this.queryCardStockFormModel.stockInDate} 00:00:00`
    },
    endTimeChange () {
      this.queryCardStockFormModel.stockOutDate = `${this.queryCardStockFormModel.stockOutDate} 23:59:59`
    },
    // 查询按钮
    queryCardStock () {
      if (this.queryCardStockFormModel.cardNo === '') {
        this.queryCardStockFormModel.cardNo = null
      }
      if (this.queryCardStockFormModel.cardType === '') {
        this.queryCardStockFormModel.cardType = null
      }
      if (this.queryCardStockFormModel.iccid === '') {
        this.queryCardStockFormModel.iccid = null
      }
      if (this.queryCardStockFormModel.level === '') {
        this.queryCardStockFormModel.level = null
      }
      if (this.queryCardStockFormModel.status === '') {
        this.queryCardStockFormModel.status = null
      }
      if (this.queryCardStockFormModel.stockInDate === '') {
        this.queryCardStockFormModel.stockInDate = null
      }
      if (this.queryCardStockFormModel.stockOutDate === '') {
        this.queryCardStockFormModel.stockOutDate = null
      }
      this.getCardStockList()
    },
    // 获取蜂窝平台信息
    gethoneycombOptions () {
      const params = {
        page: 0,
        pageSize: 1000
      }
      API.apiFwAccountList(params).then(res => {
        if (res.resultCode === 0) {
          this.honeycombOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 导出 按钮
    exportCardStock () {
      // const fileNames = '卡存库'
      // this.$axios.get('api/inventories/excel', {
      //   params: this.queryCardStockFormModel,
      //   responseType: 'arraybuffer'
      // }).then((response) => {
      //   //创建一个blob对象,file的一种
      //   let blob = new Blob([response.data], { type: 'application/x-xls' })
      //   let link = document.createElement('a')

      //   link.href = window.URL.createObjectURL(blob)
      //   link.download = fileNames + '.xls'
      //   link.click()
      // })
    },

    // 停用/启用
    deactivation (row, type) {
      const data = {
        iccid: row.iccid,
        status: type
      }
      API.apiCardStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getCardStockList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击 导入 按钮 导入模态框 弹出 
    openImportModal () {
      this.$refs.ImportModal.dialogVisible = true;
    },
    // 导入组件，成功后
    ImportModalSuccess (cardType, fwAccount, stockType, param) {
      API.apiCardsUploadAdd(cardType, fwAccount, stockType, param).then(res => {
        if (res.resultCode === 0) {
          this.$message.success(`已导入，如果无数据，可在“我的任务”中查看，id值为${res.data}，导入结果信息！`)
          this.getCardStockList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
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
