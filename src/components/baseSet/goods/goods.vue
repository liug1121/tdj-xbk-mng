<template>
  <!-- 套餐 刘珍利 2020-06-23 已完成  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryForm" :model="queryGoods">
        <el-form-item label="商品名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryGoods.goodName" placeholder="请输入套餐名"></el-input>
        </el-form-item>
        <!-- <el-form-item label="商品编号" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryGoods.packageId" placeholder="请输入套餐编号"></el-input>
        </el-form-item> -->
        <!-- <el-form-item label="商品类型" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryGoods.packageType" placeholder="请选择套餐类型">
            <el-option v-for="item in packageTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="流量区域" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryGoods.netWorkArea" filterable placeholder="请输入流量关键词">
            <el-option v-for="item in queryFlowList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="全国流量" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryGoods.networkTotal" filterable placeholder="请输入流量关键词">
            <el-option v-for="item in queryFlowList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="省内流量" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryGoods.smsTotal" filterable placeholder="请输入短信关键词">
            <el-option v-for="item in queryFlowSNList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
        <!-- <el-form-item label="语音" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryGoods.voiceTotal" filterable placeholder="请输入语音关键词">
            <el-option v-for="item in queryOviceList" :key="item.id" :label="item.productName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->

        <!-- <el-form-item label="用量清算方式" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryGoods.clearType" placeholder="请选择用量清算方式">
            <el-option v-for="item in usageClearingMethodOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getGoodsList()">查询</el-button>
        </el-form-item>
      </el-form>

      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addProduct">新增</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download" @click="exportPackage">导出</el-button>
      </div>
      <!-- 表格区域 -->
      <el-table v-loading="loading" :data="GoodsList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column prop="name" label="商品名" width="220" fixed="left">
        </el-table-column>
        <el-table-column prop="id" label="商品编号" width="100">
        </el-table-column>
        <el-table-column prop="type" label="商品类型" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">套餐</span>
            <span v-else-if="scope.row.type === 1">加油包</span>
            <span v-else-if="scope.row.type === 2">卡费</span>
            <span v-else-if="scope.row.type === 3">充值</span>
          </template>
        </el-table-column>
        <el-table-column label="流量(MB)" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">{{scope.row.pkg.net_total}}</span>
            <span v-else-if="scope.row.type === 1">{{scope.row.addedPackage.net_total}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用量区域" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">
              <span v-if="scope.row.pkg.area_type === 0">省内</span>
              <span v-if="scope.row.pkg.area_type === 1">全国</span>
            </span>
            <span v-else-if="scope.row.type === 1">
              <span v-if="scope.row.addedPackage.area_type === 0">省内</span>
              <span v-if="scope.row.addedPackage.area_type === 1">全国</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="语音(分钟)" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">{{scope.row.pkg.voice_total}}</span>
            <span v-else-if="scope.row.type === 1">{{scope.row.addedPackage.voice_total}}</span>
          </template>
        </el-table-column>
        <el-table-column label="商品价格" width="100" prop="price">
        </el-table-column>
        <el-table-column label="用量清零周期(月)" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">{{scope.row.pkg.clear_cycle}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品有效期(月)" width="100">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">{{scope.row.pkg.valid_month}}</span>
          </template>
        </el-table-column>
        <el-table-column label="用量清算方式" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 0">
              <span v-if="scope.row.pkg.billing_type === 0">自然月</span>
              <span v-if="scope.row.pkg.billing_type === 1">27号</span>
            </span>
            <span v-else-if="scope.row.type === 1">
              <span v-if="scope.row.addedPackage.billing_type === 0">自然月</span>
              <span v-if="scope.row.addedPackage.billing_type === 1">27号</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="自动续期" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.payType === 0">否</span>
            <span v-if="scope.row.payType === 1">是</span>
            <span v-if="scope.row.payType === null"> - </span>
          </template>
        </el-table-column>
        <el-table-column prop="description" label="商品说明" width="150">
        </el-table-column>
        <el-table-column label="状态" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">下架</span>
            <span v-else-if="scope.row.status === 1">上架</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" plain @click="goEdit(scope.row)">编辑</el-button>
            <el-button v-if="scope.row.status ===0" size="mini" type="warning" plain @click="deactivation(scope.row.id,1)">上架</el-button>
            <el-button v-else size="mini" type="danger" plain @click="deactivation(scope.row.id,0)">下架</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

      <!-- 新增 弹框 -->
      <addGoods ref="addPackageRef" @addPackageSuccess="addPackageSuccess" :packageTypeOptions="packageTypeOptions" :usageClearingMethodOptions="usageClearingMethodOptions" :statusOptions="statusOptions"
        :addPackageOptions="addPackageOptions" :automaticOptions="automaticOptions" :netWorkAreaOptions="netWorkAreaOptions" :queryFlowList="queryFlowList" :queryOviceList="queryOviceList"
        :queryFlowSNList="queryFlowSNList" :packageTypeList="packageTypeList">
      </addGoods>
      <!-- 编辑 弹框 -->
      <el-dialog title="修改商品" :visible.sync="editVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
        <el-form ref="editFormRef" :model="editForm" :rules="editRules" label-width="110px">
          <el-form-item label="商品名" prop="name">
            <el-input v-model="editForm.name" placeholder="请输入商品名"></el-input>
          </el-form-item>
          <el-form-item label="商品价格" prop="price">
            <el-input v-model="editForm.price" placeholder="请输入销售价格"></el-input>
          </el-form-item>
          <el-form-item label="商品说明" prop="description">
            <el-input v-model="editForm.description" placeholder="请输入商品说明"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer" style="text-align: right;display: block;margin-right: 10px;">
          <el-button @click="editVisible = false">取 消</el-button>
          <el-button type="primary" @click="editIt()">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import addGoods from "./addGoods";
import API from 'api/baseSet'
export default {
  components: {
    addGoods
  },
  data () {
    return {
      // 获取套餐列表
      GoodsList: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 套餐类型
      packageTypeOptions: [
        { label: '套餐', value: 0 },
        { label: '加油包', value: 1 },
        { label: '卡费', value: 2 },
        { label: '充值', value: 3 },
      ],
      // 用量清算方式
      usageClearingMethodOptions: [
        { label: '自然月', value: 0 },
        { label: '27号', value: 1 }
      ],
      // 状态
      statusOptions: [
        { label: "未上架", value: 0 },
        { label: "已上架", value: 1 }
      ],
      // 用量区域
      netWorkAreaOptions: [
        { label: "省内", value: 0 },
        { label: "全国", value: 1 }
      ],
      // 加油包类型
      addPackageOptions: [
        { label: "省内流量", value: 0 },
        { label: "全国流量", value: 1 },
        { label: "语音", value: 3 },
      ],
      // 自动续期
      automaticOptions: [
        { label: "否", value: 0 },
        { label: "是", value: 1 }
      ],
      // 查询 字段
      queryGoods: {
        codes: null,
        goodName: null,
        packageClearTypeIds: null,
        packageTypeIds: null,
        price: null,
        typeIds: null,
        page: 0,
        pageSize: 10
      },
      // 全国流量 list
      queryFlowList: [],
      // 语音 list
      queryOviceList: [],
      // 短信 list
      queryFlowSNList: [],
      chooseList: {},
      editVisible: false,
      username: "",
      packageTypeList: [],
      editForm: {
        id: null,
        name: null,
        price: null,
        description: null
      },
      editRules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        // price: [{ required: true, message: "请输入价格", trigger: "blur" }]
      },
      loading: false
    };
  },
  mounted () {
    // 获取 商品列表
    this.getGoodsList();
    // 获取 全国流量 list
    this.getQueryFlowList()
    // 获取 语音 list
    this.getQueryOviceList()
    // 获取 省内流量 list
    this.getQueryFlowSNList()
    // 获取 套餐类型
    this._basicPackageTypeList()
  },
  methods: {
    //获取分页列表
    getGoodsList () {
      let params = this.queryGoods
      this.loading = true
      API.apiGoodsList(params).then(res => {
        if (res.resultCode === 0) {
          this.GoodsList = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryGoods.pageSize = newSize
      this.getGoodsList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryGoods.page = newPage - 1
      this.getGoodsList()
    },
    // 获取套餐类型
    _basicPackageTypeList () {
      API.apiProductsTypes().then(res => {
        if (res.resultCode === 0) {
          this.packageTypeList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取 全国流量 list
    getQueryFlowList () {
      const params = {
        productName: null,
        areaType: null,
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 20,
        size: null,
        type: 0
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
    // 获取 省内 list
    getQueryFlowSNList () {
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
          this.queryFlowSNList = res.data
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
      this.editForm.id = row.id
      this.editForm.name = row.name
      this.editForm.description = row.description
      this.editForm.price = Number(row.price)
      this.editVisible = true;
    },
    // 上架、下架
    deactivation (id, status) {
      const data = {
        id: id,
        status: status
      }
      console.log(data);
      API.apiGoodsStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getGoodsList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 添加成功
    addPackageSuccess (data) {
      // console.log(JSON.stringify(this.$refs.addPackageRef.addForm));
      // const data = JSON.stringify(this.$refs.addPackageRef.addForm)
      // console.log(data);
      API.apiGoodsAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getGoodsList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    editVisibleclose () {
      this.editVisible = false
    },
    // 导出 按钮
    exportPackage () {
      // const fileNames = '套餐'
      // this.$axios.get('api/products/excel', {
      //   params: this.queryGoods,
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
    editIt () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        // console.log(JSON.stringify(this.editForm))
        const data = {
          description: this.editForm.description,
          id: this.editForm.id,
          name: this.editForm.name,
          price: Number(this.editForm.price)
        }
        this.editPackageSuccess(data)
        this.$refs.editFormRef.resetFields()
      })
    },
    // 编辑成功之后，刷新页面
    editPackageSuccess (data) {
      API.apiGoodsModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('编辑成功！')
          this.getGoodsList()
          this.editVisible = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // editVisible () {
    //   this.$emit('editVisibleclose')
    //   this.$refs.editFormRef.resetFields()
    // }
  }
};
</script>
<style scoped>
</style>
