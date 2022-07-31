<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="用户名">
           <el-input size="small"  placeholder="请输入用户名" v-model="queryName"></el-input>
                <!-- <el-select 
                filterable
                clearable
                reserve-keyword
                class="queryFormInput"   placeholder="请选择用户名" v-model="queryName">
                    <el-option v-for="item in allManagers" :key="item.id" :label="item.name" :value="item.name"></el-option>
                </el-select> -->
            </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryManagers">查询</el-button>
      </el-form>
      <el-form  :inline="true">
            <div class="button_content">
                <el-button size="medium" type="primary" icon="el-icon-edit" @click="showAddMangerDlg" 
                >新增管理员</el-button>
            </div>
      </el-form>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="managers" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
              <div v-if="p.prop == 'operations'">
                <el-button  size="mini" type="warning" plain @click="editManager(scope.row, 0)" >编辑</el-button>
                <el-button  size="mini" type="warning" plain @click="roleSel(scope.row)" >分配角色</el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog title="用户信息" :visible.sync="managerDlgShow" width="430px" @close="managerDlgClose">
      <el-form  label-width="120px">
        <el-form-item label="登录名">
          <el-input size="small"  placeholder="请输入登录名" v-model="manager2Edit.user_name"></el-input>
        </el-form-item>
        <el-form-item label="用户名">
          <el-input size="small"  placeholder="请输入用户名" v-model="manager2Edit.name"></el-input>
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input size="small"  placeholder="请输入登录密码" v-model="manager2Edit.pwd"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input size="small"  placeholder="请输入电话" v-model="manager2Edit.phone"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="managerDlgClose">取 消</el-button>
        <el-button type="primary" @click="managerDlgOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="角色信息" :visible.sync="roleDlgShow" width="430px" >
      <el-table ref="roleSelTable" v-loading="loading"  :data="roles" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleRoleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in role_table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="roleSelDlgClose">取 消</el-button>
        <el-button type="primary" @click="roleSelDlgOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增管理员" :visible.sync="addManagerDlgShow" width="430px" >
      <el-form  :model="addManager" label-width="120px">
        <el-form-item label="用户名">
          <el-input size="small"  placeholder="请输入用户名" v-model="addManager.userName"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input size="small"  placeholder="请输入姓名" v-model="addManager.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input size="small"  placeholder="请输入密码" v-model="addManager.pwd"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"   placeholder="请选择角色" v-model="addManager.roleId">
            <el-option v-for="item in allRoles" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddMangerDlg">取 消</el-button>
        <el-button type="primary" @click="addManagerClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import apiSystem from './../../api/system'
export default {
  components: {

  },
  data () {
    return {
    addManagerDlgShow:false,
    addManager:{},
    queryName:'',
    loading: false,
    managers:[],
    allManagers:[],
    roles:[],
    allRoles:[],
    managerDlgShow:false,
    roleDlgShow:false,
    manager2Edit:{},
    managerRoles2Modify:[],
    selectedManager:{},
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'user_name', label: '登录名', width: 200, fixed: 'left'},
        { prop: 'name', label: '用户名', width: 300},
        { prop: 'channelNames', label: '渠道', width: 300},
        { prop: 'phone', label: '电话', width: 300},
        { prop: 'roleInfo', label: '角色', width: 300},
        { prop: 'operations', label: '操作', width: 300}
      ],
      role_table_column:[
        { prop: 'roleName', label: '角色名称', width: 300},  
      ]
    };
  },
  mounted () {

  },
  created(){
      this.queryAllManagers()
      this.getAllSysRoles()
  },
  watch: {},
  updated(){
     this.refreshRolesSelected() 
  },
  toggleSelection (rows) {

  },
  methods: {
    queryManagers:function(){
        this.queryManagers()
    },
    closeAddMangerDlg:function(){
        this.addManagerDlgShow = false
    },
    showAddMangerDlg:function(){
        this.addManagerDlgShow = true
    },
    refreshRolesSelected:function(){
        this.roles.forEach(role => {
            if (role.has == true) {    
                this.$refs.roleSelTable.toggleRowSelection(role, true) 
            }
        })
    },
    addManagerClick:function(){
        let userName = this.addManager.userName
        if(userName === '' || userName == undefined){
            alert('用户名不能为空')
            return
        }
        let nickName = this.addManager.name
        if(nickName === '' || nickName == undefined){
            alert('姓名不能为空')
            return
        }
        let pwd = this.addManager.pwd
        if(pwd === '' || pwd == undefined){
            alert('密码不能为空')
            return
        }
        let roleId = this.addManager.roleId
        if(roleId === '' || roleId == undefined){
            alert('角色不能为空')
            return
        }

        let params = {}
        params.userName = userName
        params.name = nickName
        params.pwd = pwd
        params.roleId = roleId
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            apiSystem.addManager(params).then(res=>{
            if(res.resultCode == 0){
                that.queryAllManagers()
                alert('添加成功')
            }else{
                alert('添加失败:' + res.resultInfo)
            }
        })   
        }).catch(() => {
        });
    },
    getAllSysRoles:function(){
        let params = {}
        apiSystem.getAllSysRoles(params).then(res=>{
            if(res.resultCode == 0){
                this.allRoles = res.data
            }
        })
    },
    getManagerRoles:function(managerId){
        this.loading = true
        let params = {}
        params.managerId = managerId
        apiSystem.getSysManagerRoles(params).then(res=>{
            if(res.resultCode == 0){
                this.roles = res.data
                this.loading = false
            }
        })
    },
    doEditManagerRoles:function(managerId, mSuccess, mError){
        let params = {}
        params.managerId = managerId
        let roleIds = []
        this.managerRoles2Modify.forEach(one=>{
            roleIds.push(one.roleId)
        })
        params.roleIds = roleIds
        apiSystem.editMangerRoles(params).then(res=>{
            if(res.resultCode == 0){
                if(mSuccess != null && mSuccess != undefined)
                    mSuccess(res)
            }else{
                if(mError != null && mError != undefined)
                    mError(res)
            }
        })
    },
    doEditManager:function(mSuccess, mError){
        let params = {}
        params.id = this.manager2Edit.id
        params.userName = this.manager2Edit.user_name
        params.pwd = this.manager2Edit.pwd
        params.name = this.manager2Edit.name
        params.phone = this.manager2Edit.phone
        apiSystem.editManger(params).then(res=>{
            if(res.resultCode == 0){
                if(mSuccess != null && mSuccess != undefined)
                    mSuccess(res)
            }else{
                if(mError != null && mError != undefined)
                    mError(res)
            }
        })
    },
    managerDlgOk:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.doEditManager(res=>{
            that.managerDlgShow = false
            alert('修改成功')
        }, error=>{
            alert('修改失败')
        })
        
      }).catch(() => {
      });
        
    },
    managerDlgClose:function(){
        this.managerDlgShow = false
    },
    editManager:function(row, type){
        this.manager2Edit = row
        this.managerDlgShow = true
    },
    roleSel:function(row){
        this.roleDlgShow = true
        this.selectedManager = row
        this.getManagerRoles(row.id)
    },
    roleSelDlgClose:function(){
        this.roleDlgShow = false
    },
    roleSelDlgOk:function(){
        let managerId = this.selectedManager.id
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
        }).then(() => {
                that.doEditManagerRoles(managerId, res=>{
                that.roleDlgShow = false
                that.queryAllManagers()
                alert('权限修改成功')
            }, res=>{
                alert('权限修改失败')
            })
        }).catch(() => {
        });

    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryManagers:function(){
        this.loading = true
        let params = {}
        params.name = this.queryName
        apiSystem.getAllSysManagers(params).then(res=>{
            if(res.resultCode == 0){
                this.managers = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    queryAllManagers:function(){
        this.loading = true
        let params = {}
        apiSystem.getAllSysManagers(params).then(res=>{
            if(res.resultCode == 0){
                this.managers = res.data
                this.allManagers = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleRoleSelectionChange (val) {
        this.managerRoles2Modify = val
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryAllManagers()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryAllManagers()
    },
  }
};
</script>
<style scoped>
</style>
