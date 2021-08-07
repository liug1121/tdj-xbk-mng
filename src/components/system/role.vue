<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" @click="toAddRoleClick">新增角色</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="roles" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
              <div v-if="p.prop == 'operations'">
                <el-button  size="mini" type="warning" plain @click="functionSel(scope.row)">设置角色功能</el-button>
                <el-button  size="mini" type="warning" plain @click="removeRole(scope.row)">删除角色</el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </el-card>
    <el-dialog title="角色功能" :visible.sync="functionDlgShow" width="630px" >
      <el-table ref="functionSelTable" v-loading="loading"  :data="roleFunctions" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleRoleFunctionsSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in function_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="functionSelDlgClose">取 消</el-button>
        <el-button type="primary" @click="editRoleFunctionOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="角色" :visible.sync="roleDlgShow" width="430px" >
      <el-form  :model="roleInfo" label-width="120px">
        <el-form-item label="角色名称">
          <el-input size="small"  placeholder="请输入角色名称" v-model="roleInfo.roleName"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeRoleDlg">取 消</el-button>
        <el-button type="primary" @click="editRoleClick">确 定</el-button>
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
    loading: false,
    roles:[],
    selectedRow:{},
    roleFunctions:[],
    roleFunctions2Edit:[],
    functionDlgShow:false,
    roleDlgShow:false,
    roleInfo:{},
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'name', label: '角色名称', width: 300, fixed: 'left'},
        { prop: 'operations', label: '操作', width: 300}
      ],
      function_column: [
          
        { prop: 'plateformTypeName', label: '平台类型', width: 200},
        { prop: 'functionName', label: '功能名称', width: 200},
        { prop: 'typeName', label: '类型', width: 100}
      ]
    };
    
  },
  mounted () {

  },
  created(){
      this.queryAllRoles()
  },
  watch: {},
  updated(){
     this.refreshRoleFunctionsSelected() 
  },
  methods: {
    removeRole:function(role){
        console.log(JSON.stringify(role))
        let that = this
        let roleId = role.id
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {}
            params.roleId = roleId
            apiSystem.removeRole(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryAllRoles()
                    alert('删除成功')
                }else{
                    alert('删除失败:' + res.resultInfo)
                }
            })
        }).catch(() => {
        });
    },
    toAddRoleClick:function(){
        this.roleInfo = {}
        this.roleDlgShow = true
    },
    toEditRoleClick:function(role){
        this.roleInfo = {}
        roleInfo.id = role.id
        roleInfo.roleName = role.name
        this.roleDlgShow = true

    },
    closeRoleDlg:function(){
       this.roleDlgShow = false 
    },
    editRoleClick:function(){
        if(this.roleInfo.id == '' || this.roleInfo.id == undefined){
            if(this.roleInfo.roleName == '' || this.roleInfo.roleName == undefined){
                alert('角色名称不能为空')
                return
            }
            let that = this
            this.$confirm('您确认要此操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                that.addRole(that.roleInfo.roleName, res=>{
                    that.roleDlgShow = false
                    that.queryAllRoles()
                    alert('新增成功')
                }, res=>{
                    alert('新增失败:' + res.resultInfo)
                })
            }).catch(() => {
            });
        }else{
            //TODO edit
        }

    },
    refreshRoleFunctionsSelected:function(){
        this.roleFunctions.forEach(roleFunction => {
            if (roleFunction.has == true) {    
                this.$refs.functionSelTable.toggleRowSelection(roleFunction, true) 
            }
        })
    },
    functionSel:function(role){
        this.selectedRow = role
        this.functionDlgShow = true;
        let roleId = role.id
        this.getRoleFunctions(roleId)
    },
    functionSelDlgClose:function(){
        this.functionDlgShow = false;
    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    addRole:function(roleName, mSuccess, mError){
        let params = {}
        params.roleName = roleName
        apiSystem.addRole(params).then(res=>{
            if(res.resultCode == 0){
                if(mSuccess != null && mSuccess != undefined)
                    mSuccess(res)
            }else{
                if(mError != null && mError != undefined)
                    mError(res)
            }
        })
    },
    getRoleFunctions:function(roleId){
        this.loading = true
        let params = {}
        params.roleId = roleId
        apiSystem.getRoleFunctions(params).then(res=>{
            if(res.resultCode == 0){
                this.roleFunctions = res.data
                this.loading = false
            }
        })
    },
    editRoleFunctionOk:function(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.editRoleFunctions(res=>{
            alert('修改成功')
        }, res=>{
            alert('修改失败')
        })
        
      }).catch(() => {
      });
    },
    editRoleFunctions:function(mSuccess, mError){
        let roleId = this.selectedRow.id
        let params = {}
        params.roleId = roleId
        let functionIds = []
        this.roleFunctions2Edit.forEach(one=>{
            functionIds.push(one.function_id)
        })
        params.functionIds = functionIds
        apiSystem.editRoleFunctions(params).then(res=>{
            if(res.resultCode == 0){
                if(mSuccess != null && mSuccess != undefined)
                    mSuccess(res)
            }else{
                if(mError != null && mError != undefined)
                    mError(res)
            }
        })
    },
    queryAllRoles:function(){
        this.loading = true
        let params = {}
    //     params.page = this.page
    //     if(this.id != '')
    //         params.channelId = this.id
    //     if(this.name != '')
    //         params.name = this.name
    //     if(this.appId != '')
    //         params.appId = this.appId
        apiSystem.getAllSysRoles(params).then(res=>{
            if(res.resultCode == 0){
                this.roles = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange:function(val){

    },
    handleRoleFunctionsSelectionChange (val) {
        this.roleFunctions2Edit = val;
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryAllRoles()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryAllRoles()
    },
  }
};
</script>
<style scoped>
</style>
