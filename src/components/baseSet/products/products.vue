<template>
  <!--  产品 刘珍利 2020-6-18 已完成 -->
  <div class="box_subject">
    <el-tabs v-model="activeName" @tab-click="handleClick" type="border-card" style="margin:15px">
      <el-tab-pane label="全国流量" name="flow" style="padding: 15px !important;">
        <!-- 按钮区域 -->
        <el-row :gutter="20" style="margin-bottom:10px;">
          <el-col :span="8">
            <el-input size="medium" placeholder="请输入名称" v-model="queryInfoFlow.productName" clearable @clear="_getFlowList">
              <el-button slot="append" icon="el-icon-search" @click="_getFlowList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addDialogShow">添加</el-button>
          </el-col>
        </el-row>
        <!-- table表格区域 -->
        <el-table v-loading="loading" :data="flowList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
          <el-table-column v-for="(p, key) in flowList_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
            <template slot-scope="scope">
              <div v-if="p.prop == 'areaTypeCL'">
                <span v-if="scope.row.areaType == 0">省内</span>
                <span v-else>全国</span>
              </div>
              <div v-if="p.prop == 'operation'">
              </div>
              <div v-else>
                <div v-html="scope.row[p.prop]" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="Flowpage" :page-sizes="[10, 20, 30]" :page-size="FlowpageSize" layout="total, sizes, prev, pager, next, jumper"
          :total="totalFlow">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="省内流量" name="IntraProvincial" style="padding: 15px !important;">
        <!-- 按钮区域 -->
        <el-row :gutter="20" style="margin-bottom:10px;">
          <el-col :span="8">
            <el-input size="medium" placeholder="请输入名称" v-model="queryInfoFlowSN.productName" clearable @clear="_getshortMessageList">
              <el-button slot="append" icon="el-icon-search" @click="_getshortMessageList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addDialogShow">添加</el-button>
          </el-col>
        </el-row>
        <!-- table表格区域 -->
        <el-table v-loading="loading" :data="FlowSNList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
          <el-table-column v-for="(p, key) in FlowSNList_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
            <template slot-scope="scope">
              <div v-if="p.prop == 'operation'">
              </div>
              <div v-else>
                <div v-html="scope.row[p.prop]" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2" :current-page="pageFlowSN" :page-sizes="[10, 20, 30]" :page-size="pageSizeFlowSN"
          layout="total, sizes, prev, pager, next, jumper" :total="totalSms">
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="语音" name="voice" style="padding: 15px !important;">
        <!-- 按钮区域 -->
        <el-row :gutter="20" style="margin-bottom:10px;">
          <el-col :span="8">
            <el-input size="medium" placeholder="请输入名称" v-model="queryInfoVoice.productName" clearable @clear="_getVoiceList">
              <el-button slot="append" icon="el-icon-search" @click="_getVoiceList"></el-button>
            </el-input>
          </el-col>
          <el-col :span="4">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addDialogShow">添加</el-button>
          </el-col>
        </el-row>
        <!-- table表格区域 -->
        <el-table v-loading="loading" :data="voiceList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
          <el-table-column v-for="(p, key) in voiceList_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
            <template slot-scope="scope">
              <div v-if="p.prop == 'operation'">
              </div>
              <div v-else>
                <div v-html="scope.row[p.prop]" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页区域 -->
        <el-pagination @size-change="handleSizeChange1" @current-change="handleCurrentChange1" :current-page="pageVoice" :page-sizes="[10, 20, 30]" :page-size="pageSizeVoice"
          layout="total, sizes, prev, pager, next, jumper" :total="totalVoice">
        </el-pagination>
      </el-tab-pane>
    </el-tabs>

    <!-- 新增弹出框 组件 -->
    <add-products ref="addBasicProductModal" @addflowSuccess="addflowSuccess" @addVoiceSuccess="addVoiceSuccess" @addSmsSuccess="addSmsSuccess" :areaOptions="areaOptions"></add-products>
  </div>
</template>

<script>
import addProducts from './addProducts'
import API from 'api/baseSet'
export default {
  name: 'products',
  components: {
    'add-products': addProducts
  },
  data () {
    return {
      activeName: 'flow',
      flowList: [],
      // 获取用户列表的参数对象
      queryInfoFlow: {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10,
        size: null,
        type: 0
      },
      Flowpage: 1,
      FlowpageSize: 10,
      totalFlow: 0,
      flowList_column: [
        { prop: 'id', label: '编号', width: 100 },
        { prop: 'name', label: '名称' },
        { prop: 'size', label: '包大小(MB)', width: 150 },
        { prop: 'areaTypeCL', label: '区域', width: 100 }
      ],
      voiceList: [],
      // 获取用户列表的参数对象
      queryInfoVoice: {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10,
        size: null,
        type: 2
      },
      pageVoice: 1,
      pageSizeVoice: 10,
      totalVoice: 0,
      voiceList_column: [
        { prop: 'id', label: '编号', width: 100 },
        { prop: 'name', label: '名称' },
        { prop: 'size', label: '包大小(MB)', width: 150 }
      ],
      FlowSNList: [],
      // 获取用户列表的参数对象
      queryInfoFlowSN: {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10,
        size: null,
        type: 1
      },
      pageFlowSN: 1,
      pageSizeFlowSN: 10,
      totalSms: 0,
      FlowSNList_column: [
        { prop: 'id', label: '编号', width: 100 },
        { prop: 'name', label: '名称' },
        { prop: 'size', label: '包大小(分钟)', width: 150 }
      ],
      queryDialogVisible: false,
      // 区域
      areaOptions: [
        { label: "全国", value: 1 },
        { label: "省内", value: 2 }
      ],
      loading: false
    }
  },
  mounted () {
    this._getFlowList()
    this._getVoiceList()
    this._getshortMessageList()
    this.getProductsList()
  },
  methods: {
    handleClick (tab, event) {
      // console.log(tab, event);
      const ActiveName = tab.name
      // console.log(ActiveName)
    },
    // 获取基础产品列表
    getProductsList () {

    },
    // 获取流量列表
    _getFlowList () {
      let params = this.queryInfoFlow
      this.loading = true
      API.apiProductsList(params).then(res => {
        if (res.resultCode === 0) {
          this.flowList = res.data
          this.totalFlow = res.rowNum
          this.loading = false
          console.log(this.flowList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      // console.log(newSize)
      this.queryInfoFlow.pageSize = newSize
      this._getFlowList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      // console.log(newPage)
      this.queryInfoFlow.page = newPage - 1
      this._getFlowList()
    },

    // 获取语音列表
    _getVoiceList () {
      let params = this.queryInfoVoice
      this.loading = true
      API.apiProductsList(params).then(res => {
        if (res.resultCode === 0) {
          this.voiceList = res.data
          console.log(this.voiceList)
          this.totalVoice = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange1 (newSize) {
      // console.log(newSize)
      this.queryInfoVoice.pageSize = newSize
      this._getVoiceList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange1 (newPage) {
      this.queryInfoVoice.page = newPage - 1
      this._getVoiceList()
    },

    // 获取省内列表
    _getshortMessageList () {
      let params = this.queryInfoFlowSN
      this.loading = true
      API.apiProductsList(params).then(res => {
        if (res.resultCode === 0) {
          this.FlowSNList = res.data
          console.log(this.FlowSNList)
          this.totalSms = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange2 (newSize) {
      this.queryInfoFlowSN.pageSize = newSize
      this._getshortMessageList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange2 (newPage) {
      this.queryInfoFlowSN.page = newPage - 1
      this._getshortMessageList()
    },

    // 点击添加 button
    addDialogShow () {
      this.$refs.addBasicProductModal.dialogVisible = true;
    },

    // 流量新增提交 
    addflowSuccess (data) {
      API.apiProductsAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this._getFlowList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addVoiceSuccess (data) {
      API.apiProductsAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this._getVoiceList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addSmsSuccess (data) {
      API.apiProductsAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this._getshortMessageList()
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
