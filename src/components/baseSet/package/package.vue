<template>
  <!-- 套餐 刘珍利 2020-06-23 已完成  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryForm" :model="queryPackage">
        <el-form-item label="套餐名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPackage.packageName" placeholder="请输入套餐名"></el-input>
        </el-form-item>
        <el-form-item label="套餐显示名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPackage.packageNickName" placeholder="请输入套餐显示名"></el-input>
        </el-form-item>
        <el-form-item label="套餐编号" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPackage.packageId" placeholder="请输入套餐编号"></el-input>
        </el-form-item>
        <el-form-item label="套餐类型" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPackage.packageType" placeholder="请选择套餐类型">
            <el-option v-for="item in packageTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流量区域" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPackage.netWorkArea" filterable placeholder="请输入流量关键词">
            <el-option v-for="item in queryFlowList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="流量" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPackage.networkTotal" filterable placeholder="请输入流量关键词">
            <el-option v-for="item in queryFlowList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="语音" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPackage.voiceTotal" filterable placeholder="请输入语音关键词">
            <el-option v-for="item in queryOviceList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="短信" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPackage.smsTotal" filterable placeholder="请输入短信关键词">
            <el-option v-for="item in querySmsList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原始价格" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPackage.orignPrice" placeholder="请输入原始价格"></el-input>
        </el-form-item>
        <el-form-item label="销售价格" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPackage.salePrice" placeholder="请输入销售价格"></el-input>
        </el-form-item>
        <el-form-item label="用量清算方式" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPackage.clearType" placeholder="请选择用量清算方式">
            <el-option v-for="item in usageClearingMethodOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getPackageList()">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addProduct">新增</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download" @click="exportPackage">导出</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table v-loading="loading" :data="setMealList" border max-height="410" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop == 'clearTypeCL'">
              <span v-if="scope.row.clearType == 1">27号</span>
              <span v-else-if="scope.row.clearType == 0">自然月</span>
            </div>
            <div v-if="p.prop == 'packageTypeCL'">
              <span v-if="scope.row.packageType == 0">套餐</span>
              <span v-else-if="scope.row.packageType == 1">加油包</span>
              <span v-else></span>
            </div>
            <div v-if="p.prop == 'packageNickNameCL'">
              <span v-if="scope.row.packageNickName == null">
                <span v-if="scope.row.netWorkArea == 0">
                  语音{{scope.row.voiceTotal}} + 短信{{scope.row.smsTotal}} + 省内流量{{scope.row.networkTotal}}
                </span>
                <span v-else>语音{{scope.row.voiceTotal}} + 短信{{scope.row.smsTotal}} + 全国流量{{scope.row.networkTotal}}</span>
              </span>
              <span v-else>{{scope.row.packageNickName}}</span>
            </div>
            <div v-if="p.prop == 'networkTotalCL'">
              <span v-if="scope.row.networkTotal == 'null'">0</span>
              <span v-else>{{scope.row.networkTotal}}</span>
            </div>
            <div v-if="p.prop == 'voiceTotalCL'">
              <span v-if="scope.row.voiceTotal == 'null'">0</span>
              <span v-else>{{scope.row.voiceTotal}}</span>
            </div>
            <div v-if="p.prop == 'smsTotalCL'">
              <span v-if="scope.row.smsTotal == 'null'">0</span>
              <span v-else>{{scope.row.smsTotal}}</span>
            </div>
            <div v-if="p.prop == 'netWorkAreaCL'">
              <span v-if="scope.row.netWorkArea == 0">省内</span>
              <span v-else>全国</span>
            </div>
            <div v-if="p.prop == 'statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
              <span v-else></span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button size="mini" type="primary" plain @click="goEdit(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.status === 1" size="mini" type="danger" plain @click="deactivation(scope.row)">停用</el-button>
              <el-button v-else-if="scope.row.status === 0" size="mini" type="warning" plain>已停</el-button>
              <div v-else></div>
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

      <!-- 新增 弹框 -->
      <addPackage ref="addPackageRef" @addPackageSuccess="addPackageSuccess" :packageTypeList="packageTypeList" :usageClearingMethodOptions="usageClearingMethodOptions" :packageTypeOptions="packageTypeOptions"
        :netWorkAreaOptions="netWorkAreaOptions" :queryFlowList="queryFlowList" :queryOviceList="queryOviceList" :querySmsList="querySmsList">
      </addPackage>
      <!-- 编辑 弹框 -->
      <el-dialog title="修改套餐" :visible.sync="editVisible" width="715px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
        <editPackage ref="editModal" :list="chooseList" :packageTypeList="packageTypeList" :usageClearingMethodOptions="usageClearingMethodOptions" :packageTypeOptions="packageTypeOptions" :queryFlowList="queryFlowList"
          :queryOviceList="queryOviceList" :querySmsList="querySmsList" @editPackageSuccess="editPackageSuccess" :netWorkAreaOptions="netWorkAreaOptions">
        </editPackage>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import addPackage from "./addPackage";
import editPackage from "./editPackage";
import API from 'api/baseSet'
export default {
  components: {
    addPackage,
    editPackage
  },
  data () {
    return {
      // 获取套餐列表
      setMealList: [],
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
      // 套餐表
      table_column: [
        { prop: 'packageName', label: '套餐名', width: 150, fixed: 'left' },
        { prop: 'packageNickNameCL', label: '套餐显示名', width: 300 },
        { prop: 'packageCode', label: '套餐编码', width: 80 },
        { prop: 'packageTypeCL', label: '套餐类型', width: 100 },
        // { prop: 'packageTypeName', label: '包类型', width: 80 },
        { prop: 'networkTotalCL', label: '流量', width: 80 },
        { prop: 'netWorkAreaCL', label: '用量区域', width: 80 },
        { prop: 'voiceTotalCL', label: '语音', width: 80 },
        { prop: 'smsTotalCL', label: '短信', width: 80 },
        { prop: 'orignPrice', label: '原始价格', width: 80 },
        { prop: 'salePrice', label: '销售价格', width: 80 },
        { prop: 'clearPeriod', label: '用量清零周期', width: 110 },
        { prop: 'validDuration', label: '产品有效期', width: 100 },
        { prop: 'clearTypeCL', label: '用量清算方式', width: 110 },
        { prop: 'description', label: '产品说明', width: 250 },
        { prop: 'statusCL', label: '状态', width: 80 },
        { prop: 'operation', label: '操作', width: 180, fixed: 'right' }
      ],
      // 套餐类型
      packageTypeList: [],
      // 用量清算方式
      usageClearingMethodOptions: [
        { label: '自然月', value: 0 },
        { label: '27号', value: 1 }
      ],
      // 包类型
      packageTypeOptions: [
        { label: "流量", value: 0 },
        { label: "语音", value: 1 },
        { label: "短信", value: 2 }
      ],
      // 用量区域
      netWorkAreaOptions: [
        { label: "省内", value: 0 },
        { label: "全国", value: 1 }
      ],
      // 查询 字段
      queryPackage: {
        addPackageType: null,
        channelId: null,
        channelName: null,
        clearType: null,
        description: null,
        netWorkArea: null,
        networkTotal: null,
        orignPrice: null,
        packageId: null,
        packageName: null,
        packageNickName: null,
        packageType: null,
        packageTypeName: null,
        salePrice: null,
        smsTotal: null,
        validMoth: null,
        voiceTotal: null
      },
      // 流量 list
      queryFlowList: [],
      // 语音 list
      queryOviceList: [],
      // 短信 list
      querySmsList: [],
      chooseList: {},
      editVisible: false,
      username: "",
      loading: false
    };
  },
  mounted () {
    // 获取 套餐列表
    this.getPackageList();
    // 获取 流量 list
    this.getQueryFlowList()
    // 获取 语音 list
    this.getQueryOviceList()
    // 获取 短信 list
    this.getQquerySmsList()
    // 获取 套餐类型
    this._basicPackageTypeList()
  },
  methods: {
    //获取分页列表
    getPackageList () {
      let queryPackage = this.queryPackage;
      let params = Object.assign(
        this.queryInfo,
        queryPackage
      );
      this.loading = true
      API.apiPackagesList(params).then(res => {
        if (res.resultCode === 0) {
          this.setMealList = res.data
          console.log(this.setMealList)
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
      this.getPackageList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage - 1
      this.getPackageList()
    },
    // 获取套餐类型
    _basicPackageTypeList () {
      API.apiProductsTypes().then(res => {
        if (res.resultCode === 0) {
          this.packageTypeList = res.data.reverse()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取 流量 list
    getQueryFlowList () {
      const params = {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 20,
        size: null,
        type: 1
      }
      API.apiProductsList(params).then(res => {
        if (res.resultCode === 0) {
          this.queryFlowList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取 语音 list
    getQueryOviceList () {
      const params = {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 20,
        size: null,
        type: 2
      }
      API.apiProductsList(params).then(res => {
        if (res.resultCode === 0) {
          this.queryOviceList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取 短信 list
    getQquerySmsList () {
      const params = {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 20,
        size: null,
        type: 3
      }
      API.apiProductsList(params).then(res => {
        if (res.resultCode === 0) {
          this.querySmsList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击新增
    addProduct () {
      this.$refs.addPackageRef.dialogVisible = true;
    },
    // 点击编辑
    goEdit (row) {
      console.log(row);
      this.chooseList = row;
      this.editVisible = true;
    },
    // 停用
    deactivation (row) {
      const data = {
        packageId: row.packageId,
        type: row.packageType
      }
      console.log(data);
      API.apiPackagesStop(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getPackageList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 启用
    enable (row) {
      // const enable = {
      //   id: row.id,
      //   type: '1'
      // }
      // console.log(JSON.stringify(deactivation));
    },
    // 添加成功
    addPackageSuccess () {
      // console.log(JSON.stringify(this.$refs.addPackageRef.addForm));
      const data = JSON.stringify(this.$refs.addPackageRef.addForm)
      API.apiPackagesAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getPackageList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 编辑成功之后，刷新页面
    editPackageSuccess (data) {
      API.apiPackagesModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('编辑成功！')
          this.getPackageList()
          this.editVisible = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 导出 按钮
    exportPackage () {
      // const fileNames = '套餐'
      // this.$axios.get('api/products/excel', {
      //   params: this.queryPackage,
      //   responseType: 'arraybuffer'
      // }).then((response) => {
      //   //创建一个blob对象,file的一种
      //   let blob = new Blob([response.data], { type: 'application/x-xls' })
      //   let link = document.createElement('a')
      //   link.href = window.URL.createObjectURL(blob)
      //   link.download = fileNames + '.xls'
      //   link.click()
      // })
    }
  }
};
</script>
<style scoped>
</style>
