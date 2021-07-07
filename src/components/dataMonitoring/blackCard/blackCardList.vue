<template>
  <!-- 黑名单卡 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <div class="heraderTop">
        <div class="button_content">
          <el-button size="medium" type="primary" icon="el-icon-plus" @click="addShow">新增</el-button>
        </div>
        <!-- 查询区域 -->
        <el-form :inline="true" ref="queryBlackCardFormRef" :model="queryBlackCardFormModel" class="queryForm">
          <el-form-item label="组分类" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryBlackCardFormModel.groupId" placeholder="请选择组分类">
              <el-option v-for="item in blackCardlist" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="状态" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryBlackCardFormModel.status" placeholder="请选择状态">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="getBlackCardlist()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="blackCardlist" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}" @row-dblclick='handledbClick'>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop =='statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button v-if="scope.row.status == 1" size="mini" type="danger" plain @click="deactivation(scope.row,0)">停用</el-button>
              <el-button v-if="scope.row.status == 0" size="mini" type="warning" plain @click="deactivation(scope.row,1)">启用</el-button>
              <el-button size="mini" type="primary" plain @click="importData(scope.row)">导入卡</el-button>
              <!-- <el-button size="mini" type="danger" plain>删除</el-button> -->
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
      <!-- 新增对话框 -->
      <el-dialog title="新增" :visible.sync="addDialogVisible" width="430px" @close="addDialogClosed">
        <!-- 内容主体区域 -->
        <el-form :model="addForm" ref="addFormRef" label-width="90px">
          <el-form-item label="组分类">
            <el-input style="width:300px;" v-model="addForm.name" placeholder="请输入组分类"></el-input>
          </el-form-item>
          <el-form-item label="定位间隔">
            <el-input style="width:300px;" v-model.number="addForm.lbsRate" placeholder="请输入定位间隔"></el-input>
          </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 导入 -->
      <ImportModal ref="ImportModal" :groupId="groupId" @InportModalSuccess="InportModalSuccess"></ImportModal>
    </el-card>
  </div>
</template>

<script>
import API from 'api/dataMoniting'
import ImportModal from "./ImportModal"
export default {
  components: {
    // 导入 组件
    ImportModal
  },
  data () {
    return {
      // 列表显示
      blackCardlist: [],
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
      // 表格
      table_column: [
        { prop: 'groupName', label: '组分类', },
        { prop: 'cardTotalNum', label: '卡数', width: 150 },
        { prop: 'lbsRate', label: '定位间隔', width: 150 },
        { prop: 'statusCL', label: '状态', width: 150 },
        { prop: 'operation', label: '操作', width: 200 }
      ],
      // 处理策略
      statusOptions: [
        { label: "使用", value: 1 },
        { label: "停用", value: 0 }
      ],
      // 省份
      provinceOptions: [],
      // 查询表字段
      queryBlackCardFormModel: {
        groupId: null,
        status: null
      },
      addDialogVisible: false,
      addForm: {
        name: '',
        lbsRate: ''
      },
      groupId: '',
      loading: false
    };
  },
  mounted () {
    this.getBlackCardlist()
    this.getprovinceOptions()
  },
  methods: {
    handledbClick (row, event, column) {
      console.log(row.groupId)
      const groupId = row.groupId
      sessionStorage.setItem('groupId', groupId)
      this.$router.push({
        path: 'blackGroupDetails',
        query: { groupId: groupId }
      })
    },
    //获取分页列表
    getBlackCardlist () {
      // 获取查询字段
      let queryBlackCardFormModel = this.queryBlackCardFormModel;
      let params = Object.assign(
        this.queryInfo,
        queryBlackCardFormModel
      );
      this.loading = true
      // 获取后台数据
      API.apiLbsGroups(params).then(res => {
        if (res.resultCode === 0) {
          this.blackCardlist = res.data
          console.log(this.blackCardlist);
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
      this.getBlackCardlist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage - 1
      this.getBlackCardlist()
    },
    // 获取省份
    getprovinceOptions () {
      const params = {
        page: 0,
        pageSize: 100
      }
      API.apiProvincesList(params).then(res => {
        if (res.resultCode === 0) {
          this.provinceOptions = res.data
          console.log(this.provinceOptions);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addShow () {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addUser () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.addForm)
        console.log(data);
        API.apiLbsGroupAdd(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('添加成功！')
            this.getBlackCardlist()
            this.addDialogVisible = false
            this.$refs.addFormRef.resetFields()
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      })
    },
    // 操作状态
    deactivation (row, type) {
      const data = {
        groupId: row.groupId,
        status: type
      }
      API.apiLbsGroupStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getBlackCardlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 导入弹框
    importData ($item) {
      console.log($item);
      this.groupId = $item.groupId
      this.$refs.ImportModal.dialogVisible = true;
    },
    // 导入组件，成功后
    InportModalSuccess (param) {
      API.apiLbsGroupCardUpload(param, this.groupId).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('导入成功！')
          this.getBlackCardlist()
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
