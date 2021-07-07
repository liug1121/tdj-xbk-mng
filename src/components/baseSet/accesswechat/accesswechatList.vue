<template>
  <!-- 公众号接入 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <div class="heraderTop">
        <div class="button_content">
          <el-button size="medium" type="primary" icon="el-icon-plus" @click="addaccessWechatShow">新增</el-button>
        </div>
        <!-- 查询区域 -->
        <el-form :inline="true" ref="queryPushlistFormRef" :model="queryaccessWechatFormModel" class="queryForm">
          <el-form-item label="接入码" class="queryFormItem">
            <el-input class="queryFormInput" v-model="queryaccessWechatFormModel.pushUrl" placeholder="请输入接入码"></el-input>
          </el-form-item>
          <el-form-item label="渠道" class="queryFormItem">
            <channelSelect v-model="queryaccessWechatFormModel.channelId" style="width:120px !important" @channelSelectId="channelSelectId"></channelSelect>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="getPushlist()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="accessWechatList" border min-height="500px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop =='statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button size="mini" @click="pushEdit(scope.row)">编辑</el-button>
              <span style="margin-left:10px">删除</span>
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
    <!-- 新增/编辑的对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" width="430px" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="100px">
        <el-form-item label="接入码" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channelId" v-show="ChannelShow">
          <channelSelect v-model="addForm.channelId" @channelSelectId="channelSelectId"></channelSelect>
        </el-form-item>
        <el-form-item label="公众号名称" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
        <el-form-item label="appid" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
        <el-form-item label="AppSecret" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
        <el-form-item label="商户号" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
        <el-form-item label="支付密钥" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="pushUrl">
          <el-select size="small" style="width:100%;" v-model="addForm.pushUrl" clearable placeholder="请选择类型">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注说明" prop="pushUrl">
          <el-input size="small" v-model="addForm.pushUrl"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeButton">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from 'api/baseSet'
import channelSelect from './../../sale/channelSelect'
export default {
  components: {
    channelSelect
  },
  data () {
    return {
      // 列表显示
      accessWechatList: [],
      page: 1,
      pageSize: 10,
      total: 0,
      // 表格
      table_column: [
        { prop: '', label: '接入码', width: 180, fixed: 'left' },
        { prop: '', label: '公众号名称', width: 100 },
        { prop: '', label: 'appid', width: 100 },
        { prop: '', label: 'AppSecret', width: 100 },
        { prop: '', label: '商户号', width: 100 },
        { prop: '', label: '支付密匙', width: 100 },
        { prop: '', label: '类型', width: 100 },
        { prop: '', label: '渠道', width: 100 },
        { prop: '', label: '接入时间', width: 100 },
        { prop: '', label: '备注说明', width: 100 },
        { prop: 'operation', label: '操作' }
      ],
      // 查询表字段
      queryaccessWechatFormModel: {
        pushUrl: null,
        channelId: null,
        page: 0,
        pageSize: 10
      },
      addDialogVisible: false,
      dialogTitle: null,
      addForm: {
        pushUrl: '',
        channelId: ''
      },
      // 用量
      statusOptions: [
        { label: "主公众号", value: 0 },
        { label: "客户公众号", value: 1 }
      ],
      ChannelShow: true,
      loading: false
    };
  },
  mounted () {
    this.getPushlist()
  },
  methods: {
    // 渠道
    channelSelectId (channelSelectId) {
      this.queryaccessWechatFormModel.channelId = channelSelectId
      this.addForm.channelId = channelSelectId
    },
    //获取分页列表
    getPushlist () {
      // let params = this.queryaccessWechatFormModel
      // this.loading = true
      // // 获取后台数据
      // API.apiPushInfo(params).then(res => {
      //   if (res.resultCode === 0) {
      //     this.accessWechatList = res.data
      //     this.total = res.rowNum
      //     this.loading = false
      //   } else {
      //     this.$message.error(res.resultInfo)
      //   }
      // })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryaccessWechatFormModel.pageSize = newSize
      this.getPushlist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryaccessWechatFormModel.page = newPage
      this.getPushlist()
    },
    addaccessWechatShow () {
      this.addDialogVisible = true
      this.dialogTitle = '新增'
      this.ChannelShow = true
      this.addForm.id = null
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
      this.addForm.id = null
    },
    pushEdit (row) {
      this.addDialogVisible = true
      this.dialogTitle = '编辑'
      this.addForm.pushUrl = row.pushUrl
      this.addForm.channelId = row.channelId
      this.ChannelShow = false
      this.addForm.id = row.id
    },
    closeButton () {
      this.addForm.id = null
      this.addDialogVisible = false
      this.$refs.addFormRef.resetFields()
    },
    addUser () {
      this.$refs.addFormRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.addForm)
        if (!this.addForm.id) {
          // console.log('新增');
          API.apiPushAdd(data).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('添加成功！')
              this.getPushlist()
              this.addDialogVisible = false
              this.$refs.addFormRef.resetFields()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        } else {
          // console.log('编辑');
          const data = {
            pushUrl: this.addForm.pushUrl,
            id: this.addForm.id
          }
          API.apiPushModify(data).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('编辑成功！')
              this.getPushlist()
              this.addDialogVisible = false
              this.$refs.addFormRef.resetFields()
              this.addForm.id = null
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        }

      });
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
