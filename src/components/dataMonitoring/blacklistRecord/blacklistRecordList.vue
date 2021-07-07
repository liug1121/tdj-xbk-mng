<template>
  <!-- 黑名单配置 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryBlacklistFormRef" :model="queryBlacklistFormModel">
        <el-form-item label="省份" class="queryFormItem">
          <el-select class="queryFormInput" filterable clearable v-model="queryBlacklistFormModel.provinceId" placeholder="请输入省份" @change="provinceChange">
            <el-option v-for="item in provinceOptions" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" class="queryFormItem">
          <el-select class="queryFormInput" filterable clearable v-model="queryBlacklistFormModel.cityId" placeholder="请输入城市名">
            <el-option v-for="item in PoisCitiesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="频率(小时)" class="queryFormItem">
          <el-input class="queryFormInput" v-model.number="queryBlacklistFormModel.lbsRate" clearable placeholder="请输入定位频率"></el-input>
        </el-form-item>
        <el-form-item label="动作" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryBlacklistFormModel.doType" clearable placeholder="请选择动作">
            <el-option v-for="item in strategyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryBlackButton">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addBlackShow">新增</el-button>
      </div>
      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="blacklist" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop =='statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
            </div>
            <div v-if="p.prop == 'doTypeCL'">
              <span v-if="scope.row.doType == 1">监控</span>
              <span v-else-if="scope.row.doType == 2">关停</span>
              <span v-else-if="scope.row.doType == 3">限速</span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button size="mini" @click="BlackEdit(scope.row)">编辑</el-button>
              <el-button v-if="scope.row.status == 1" size="mini" type="danger" plain @click="deactivation(scope.row,0)">停用</el-button>
              <el-button v-if="scope.row.status == 0" size="mini" type="warning" plain @click="deactivation(scope.row,1)">启用</el-button>
              <el-button size="mini" type="danger" plain @click="pushDel(scope.row)">删除</el-button>
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

      <!-- 新增/编辑的对话框 -->
      <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" width="430px" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" ref="addFormRef" label-width="90px">
          <el-form-item label="省份">
            <el-select style="width:300px;" v-model="addForm.provinceId" placeholder="请选择省份" @change="provinceChange">
              <el-option v-for="item in provinceOptions" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市">
            <el-select style="width:300px;" v-model="addForm.cityId" placeholder="请选择城市名">
              <el-option v-for="item in PoisCitiesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="频率(小时)">
            <el-input style="width:300px;" v-model.number="addForm.lbsRate" placeholder="请输入定位频率"></el-input>
          </el-form-item>
          <el-form-item label="动作">
            <el-select style="width:300px;" v-model="addForm.doType" placeholder="请选择动作">
              <el-option v-for="item in strategyOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import API from 'api/dataMoniting'
export default {
  components: {
  },
  data () {
    return {
      // 列表显示
      blacklist: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格
      table_column: [
        { prop: 'province', label: '省份', width: 150 },
        { prop: 'city', label: '城市', width: 180 },
        { prop: 'doTypeCL', label: '动作', width: 80 },
        { prop: 'lbsRate', label: '定位频率', width: 80 },
        { prop: 'createTime', label: '创建时间' },
        { prop: 'statusCL', label: '状态', width: 80 },
        { prop: 'operation', label: '操作', width: 220 }
      ],
      // 动作
      strategyOptions: [
        { label: "监控", value: 1 },
        { label: "关停", value: 2 },
        { label: "限速", value: 3 }
      ],
      // 省份
      provinceOptions: [],
      PoisCitiesList: [],
      // 查询表字段
      queryBlacklistFormModel: {
        cityId: null,
        doType: null,
        lbsRate: null,
        provinceId: null,
        page: 0,
        pageSize: 10
      },
      addDialogVisible: false,
      dialogTitle: null,
      addForm: {
        cityId: '',
        doType: '',
        lbsRate: '',
        provinceId: ''
      },
      loading: false
    };
  },
  mounted () {
    this.getBlacklist()
    this.getprovinceOptions()
  },
  methods: {
    //获取分页列表
    getBlacklist () {
      // 获取查询字段
      let params = this.queryBlacklistFormModel;
      this.loading = true
      // 获取后台数据
      API.apiLbsBlacks(params).then(res => {
        if (res.resultCode === 0) {
          this.blacklist = res.data
          console.log(this.blacklist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryBlacklistFormModel.pageSize = newSize
      this.getBlacklist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryBlacklistFormModel.page = newPage - 1
      this.getBlacklist()
    },
    queryBlackButton () {
      if (this.queryBlacklistFormModel.cityId === '') {
        this.queryBlacklistFormModel.cityId = null
      }
      if (this.queryBlacklistFormModel.doType === '') {
        this.queryBlacklistFormModel.doType = null
      }
      if (this.queryBlacklistFormModel.lbsRate === '') {
        this.queryBlacklistFormModel.lbsRate = null
      }
      if (this.queryBlacklistFormModel.provinceId === '') {
        this.queryBlacklistFormModel.provinceId = null
      }
      this.getBlacklist()
    },
    // 获取省份
    getprovinceOptions () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provinceOptions = res.data
          console.log(this.provinceOptions);
          const provinceId = this.provinceOptions[0].provinceId
          this.getPoisCitiesList(provinceId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听省份id
    provinceChange (vId) {
      let obj = {};
      obj = this.provinceOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.provinceId === vId; // 筛选出匹配数据
      });
      // console.log(obj.provinceId);
      // console.log(obj.provinceName); // 这边的name就是对应label
      this.getPoisCitiesList(obj.provinceId)
    },
    // 获取需市
    getPoisCitiesList (provinceId) {
      const data = {
        provinceId: provinceId
      }
      API.apiPoisCitiesList(data).then(res => {
        if (res.resultCode === 0) {
          this.PoisCitiesList = res.data
          console.log(this.PoisCitiesList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addBlackShow () {
      this.addDialogVisible = true
      this.dialogTitle = '新增'
      this.addForm.id = null
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    BlackEdit (row) {
      this.addDialogVisible = true
      this.dialogTitle = '编辑'
      this.addForm.cityId = row.cityId
      this.addForm.doType = row.doType
      this.addForm.lbsRate = row.lbsRate
      this.addForm.provinceId = row.provinceId
      this.addForm.id = row.id
      this.getPoisCitiesList(row.provinceId)
    },
    addUser () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.addForm)
        if (!this.addForm.id) {
          // console.log('新增');
          console.log(data);
          API.apiLbsAdd(data).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('添加成功！')
              this.getBlacklist()
              this.addDialogVisible = false
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        } else {
          // console.log('编辑');
          const data = {
            id: this.addForm.id,
            cityId: this.addForm.cityId,
            doType: this.addForm.doType,
            lbsRate: this.addForm.lbsRate,
            provinceId: this.addForm.provinceId
          }
          console.log(data);
          API.apiLbsModify(data).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('编辑成功！')
              this.getBlacklist()
              this.addDialogVisible = false
              this.$refs.addFormRef.resetFields()
              this.addForm.id = null
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        }

      });
    },
    // 操作状态
    deactivation (row, type) {
      const data = {
        id: row.id,
        status: type
      }
      API.apiLbsStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getBlacklist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 删除
    pushDel (row) {
      const data = {
        id: row.id
      }
      API.apiLbsDelete(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('删除成功！')
          this.getBlacklist()
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
