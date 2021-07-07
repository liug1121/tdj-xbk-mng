<template>
  <!--  蜂窝帐号 刘珍利 2020-06-24 列表、查询 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" v-model="queryHoneycombForm" ref="queryHoneycombRef">
        <el-form-item label="帐户ID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryHoneycombForm.account" placeholder="请输入帐户ID"></el-input>
        </el-form-item>
        <el-form-item label="帐户名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryHoneycombForm.accountName" placeholder="请输入帐户名"></el-input>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="getHoneycombList()">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addHoneycombShow">添加</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download">导出</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table v-loading="loading" :data="honeycombList" border max-height="550" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop == 'canLBSCL'">
              <span v-if="scope.row.canLBS === true">是</span>
              <span v-else>否</span>
            </div>
            <div v-if="p.prop == 'netWorkProvinceCL'">
              <span v-if="scope.row.netWorkProvince === true">是</span>
              <span v-else>否</span>
            </div>
            <div v-if="p.prop == 'statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
              <span v-else></span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button size="mini" type="primary" plain @click="channelEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button v-if="scope.row.status === 1" size="mini" type="danger" plain @click="handleDelete(scope.row,0)">停用</el-button>
              <el-button v-else-if="scope.row.status === 0" size="mini" type="warning" plain @click="handleDelete(scope.row,1)">启用</el-button>
              <el-button size="mini">测试</el-button>
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
    <!-- 新增/编辑 弹出模态框 -->
    <el-dialog :title="honeycombTitle" :visible.sync="dialogVisible" width="720px" :before-close="handleClose" top="5vh">
      <el-form :inline="true" ref="addHoneycombRef" :model="addHoneycombForm" :rules="addHoneycombRules" label-width="110px">
        <el-form-item label="账号id" prop="fwAccount">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.fwAccount" placeholder="请输入账号id"></el-input>
        </el-form-item>
        <el-form-item label="opedId" prop="openId">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.openId" placeholder="请输入opedId"></el-input>
        </el-form-item>
        <el-form-item label="APP密钥" prop="appSecret">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.appSecret" placeholder="请输入APP密钥"></el-input>
        </el-form-item>
        <el-form-item label="APPID" prop="appId">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.appId" placeholder="请输入APPID"></el-input>
        </el-form-item>
        <el-form-item label="运营商id" prop="unionAccount">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.unionAccount" placeholder="请输入运营商id"></el-input>
        </el-form-item>
        <el-form-item label="LBS定位" prop="canLBS">
          <el-select size="small" style="width:217px;" v-model="addHoneycombForm.canLBS" placeholder="请选择LBS定位">
            <el-option v-for="item in isOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="归属地" prop="area">
          <el-select size="small" style="width:217px;" filterable v-model="addHoneycombForm.area" clearable placeholder="请选择归属地">
            <el-option v-for="item in provincesList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="省内流量" prop="netWorkProvince">
          <el-select size="small" style="width:217px;" v-model="addHoneycombForm.netWorkProvince" clearable placeholder="请选择省内流量">
            <el-option v-for="item in isOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开户公司全称" prop="openCompanyName">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.openCompanyName" placeholder="请输入开户公司全称"></el-input>
        </el-form-item>
        <el-form-item label="开户公司简称" prop="openCompanyDesc">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.openCompanyDesc" placeholder="请输入开户公司简称"></el-input>
        </el-form-item>
        <el-form-item label="账户名称" prop="accountName">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.accountName" placeholder="请输入账户名称"></el-input>
          <div class="sub-title" style="margin-top:10px;line-height:20px;">对应账户+地区+省份<br>
            例如：taojiaming-高校四-吉林</div>
        </el-form-item>
        <el-form-item label="登陆账号" prop="account">
          <el-input size="small" style="width:217px;" v-model="addHoneycombForm.account" placeholder="请输入登陆账号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeButton">取 消</el-button>
        <el-button type="primary" @click="uploadIt()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from 'api/baseSet'
export default {
  name: 'honeycomb',
  components: {
  },
  data () {
    return {
      // 蜂窝列表
      honeycombList: [],
      // 获取用户列表的参数对象
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'fwAccount', label: '账户ID', width: 180, fixed: 'left' },
        { prop: 'openCompanyName', label: '开户公司全称', width: 150 },
        { prop: 'openCompanyDesc', label: '开户公司简称', width: 150 },
        { prop: 'openId', label: 'openId', width: 160 },
        { prop: 'unionAccount', label: '运营商账户ID', width: 150 },
        { prop: 'appId', label: 'APPID', width: 140 },
        { prop: 'appSecret', label: 'APP秘钥', width: 280 },
        { prop: 'canLBSCL', label: 'LBS定位', width: 80 },
        { prop: 'area', label: '归属地', width: 80 },
        { prop: 'netWorkProvinceCL', label: '省内流量', width: 80 },
        // { prop: 'version', label: '版本', width: 50 },
        { prop: 'account', label: '登陆账号', width: 150 },
        { prop: 'accountName', label: '账户名', width: 150 },
        { prop: 'date', label: '时间', width: 160 },
        { prop: 'statusCL', label: '状态', width: 80 },
        { prop: 'operation', label: '操作', width: 210, fixed: 'right' }
      ],
      isOptions: [
        { label: "是", value: true },
        { label: "否", value: false },
      ],
      provincesList: [],
      queryHoneycombForm: {
        account: null,
        accountName: null,
        page: 0,
        pageSize: 10
      },
      chooseList: {},
      editVisible: false,
      honeycombTitle: '新增蜂窝平台账号',
      // 模态框 隐藏
      dialogVisible: false,
      // form 表单字段
      addHoneycombForm: {
        id: null,
        account: null,
        accountName: null,
        appId: null,
        appSecret: null,
        area: null,
        canLBS: null,
        fwAccount: null,
        netWorkProvince: null,
        openId: null,
        unionAccount: null,
        openCompanyName: null,
        openCompanyDesc: null
      },
      // 字段验证
      addHoneycombRules: {
        fwAccount: [{ required: true, message: "请输入账号id", trigger: "blur" }],
        openId: [{ required: true, message: "请输入opedId", trigger: "blur" }],
        unionAccount: [{ required: true, message: "请输入运营商id", trigger: "blur" }],
        appId: [{ required: true, message: "请输入APPID", trigger: "blur" }],
        appSecret: [{ required: true, message: "请输入APP密钥", trigger: "blur" }],
        canLBS: [{ required: true, message: "请选择定位", trigger: "blur" }],
        area: [{ required: true, message: "请选择归属地", trigger: "blur" }],
        netWorkProvince: [{ required: true, message: "请选择是否是省内流量", trigger: "blur" }],
        account: [{ required: true, message: "请输入登陆账号", trigger: "blur" }],
        accountName: [{ required: true, message: "请输入账户名称", trigger: "blur" }]
      },
      loading: false
    }
  },
  mounted () {
    this.getHoneycombList()
    this.username = this.$store.state.userinfo.username
    this.getProvincesList()
  },
  methods: {
    // 获取列表 honeycombList
    getHoneycombList () {
      let params = this.queryHoneycombForm
      this.loading = true
      API.apiFwAccountList(params).then(res => {
        if (res.resultCode === 0) {
          this.honeycombList = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryHoneycombForm.pageSize = newSize
      this.getHoneycombList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryHoneycombForm.page = newPage - 1
      this.getHoneycombList()
    },
    // 获取归属地
    getProvincesList () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provincesList = res.data
          // console.log(this.provincesList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击新增
    addHoneycombShow () {
      this.dialogVisible = true
      this.honeycombTitle = '新增蜂窝平台账号'
      this.addHoneycombForm.id = null
    },
    // 点击编辑
    channelEdit (index, row) {
      this.dialogVisible = true
      this.honeycombTitle = '编辑蜂窝平台账号'
      this.addHoneycombForm.id = row.id
      this.addHoneycombForm.accountId = row.accountId
      this.addHoneycombForm.openId = row.openId
      this.addHoneycombForm.unionAccount = row.unionAccount
      this.addHoneycombForm.appId = row.appId
      this.addHoneycombForm.appSecret = row.appSecret
      this.addHoneycombForm.canLBS = row.canLBS
      this.addHoneycombForm.area = row.area
      this.addHoneycombForm.netWorkProvince = row.netWorkProvince
      this.addHoneycombForm.version = row.version
      this.addHoneycombForm.account = row.account
      this.addHoneycombForm.accountName = row.accountName
      this.addHoneycombForm.fwAccount = row.fwAccount
      this.addHoneycombForm.openCompanyName = row.openCompanyName
      this.addHoneycombForm.openCompanyDesc = row.openCompanyDesc
      var obj = this.provincesList.find(function (x) {
        return x.provinceName === row.area
      })
      this.addHoneycombForm.area = obj.provinceId
    },
    uploadIt () {
      this.$refs.addHoneycombRef.validate(valid => {
        if (!valid) return
        if (!this.addHoneycombForm.id) {
          // console.log('新增');
          this.addHoneycombSuccess()
        } else {
          // console.log('编辑');
          this.editPackageSuccess()
        }
      });
    },
    // 新增成功
    addHoneycombSuccess () {
      const data = JSON.stringify(this.addHoneycombForm)
      console.log(data);
      API.apiFwAccountAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getHoneycombList()
          this.dialogVisible = false;
          this.$refs.addHoneycombRef.resetFields()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    editPackageSuccess () {
      const data = JSON.stringify(this.addHoneycombForm)
      console.log(data);
      API.apiFwAccountModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('编辑成功！')
          this.getHoneycombList()
          this.dialogVisible = false;
          this.$refs.addHoneycombRef.resetFields()
          this.addHoneycombForm.id = null
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    closeButton () {
      this.dialogVisible = false;
      this.$refs.addHoneycombRef.resetFields()
    },
    handleClose () {
      this.dialogVisible = false;
      this.$refs.addHoneycombRef.resetFields()
    },

    // 停用
    handleDelete (row, type) {
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          id: row.id,
          status: type
        }
        console.log(data);
        API.apiFwAccountStatus(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('停用成功！')
            this.getHoneycombList()
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      });
    },
  }
}
</script>

<style scoped>
</style>