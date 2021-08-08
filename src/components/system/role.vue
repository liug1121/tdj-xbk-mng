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
    </el-card>
    <el-dialog title="角色功能" :visible.sync="functionDlgShow" width="630px" >
      <el-table ref="functionSelTable" v-loading="loading"  :data="roleMenus" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" 
      @selection-change="handleRoleFunctionsSelectionChange" @select='onRoleFunctionsSelect' @select-all="onRoleFunctionsSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in function_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
              <div v-if="p.prop == 'setting' && scope.row['opts']">
                <el-button  size="mini" type="warning" plain @click="optSelDlgOpen(scope.row)">设置功能</el-button>
              </div>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="functionSelDlgClose">取 消</el-button>
        <el-button type="primary" @click="editRoleFunctionOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="设置操作" :visible.sync="optSelDlgShow" width="630px" >
      <el-table ref="optSelTable" v-loading="loading"  :data="selectedMenu.opts" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" 
      @selection-change="handleOptSelectionChange" @select='onOptsSelect' @select-all="onOptsSelectAll">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in opt_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="optSelDlgClose">取 消</el-button>
        <el-button type="primary" @click="optSelDlgOk">确 定</el-button>
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
    roleMenus:[],
    roleOpts:[],
    selectedMenu:{},
    roleFunctions2Edit:[],
    functionDlgShow:false,
    roleDlgShow:false,
    optSelDlgShow:false,
    roleInfo:{},
    operating:false,
    optOperating:false,
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
        { prop: 'functionName', label: '菜单名', width: 200},
        { prop: 'setting', label: '功能', width: 100}
      ],
      opt_column: [
        { prop: 'functionName', label: '操作', width: 200}
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
     this.refreshOptsSelected()
  },
  methods: {
    removeRole:function(role){
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
        this.roleMenus.forEach(roleMenu => {
            if (roleMenu.has == true) {    
                this.$refs.functionSelTable.toggleRowSelection(roleMenu, true) 
            }
        })
    },
    refreshOptsSelected:function(){
        if(this.selectedMenu.opts != undefined){
            this.selectedMenu.opts.forEach(opt => {
            if (opt.has == true) {    
                this.$refs.optSelTable.toggleRowSelection(opt, true) 
            }
        })
        }
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
    optSelDlgOpen:function(row){
        this.selectedMenu = row
        this.optSelDlgShow = true
        this.operating = true
    },
    optSelDlgClose:function(){
        this.optSelDlgShow = false
    },
    optSelDlgOk:function(){
        let opts = this.selectedMenu.opts.filter(opt=> opt.has)
        if(opts != undefined && opts.length > 0){
            this.$refs.functionSelTable.toggleRowSelection(this.selectedMenu, true)
        }else{
            this.$refs.functionSelTable.toggleRowSelection(this.selectedMenu, false)
        }
        this.optSelDlgClose() 
    },
    handleSelectBranchCom:function(item){
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
                this.roleMenus = this.roleFunctions.filter(one=>{
                    if(one.type == 0)
                        return true
                    return false
                })
                
                this.roleOpts = this.roleFunctions.filter(one=>{
                    if(one.type == 1)
                        return true
                    return false
                })
                this.roleMenus.forEach(menu=>{
                    let opts = []
                    this.roleOpts.forEach(roleOpt=>{
                        if(menu.function_id == roleOpt.parentId)
                            opts.push(roleOpt)
                    })
                    if(opts.length > 0)
                        menu.opts = opts
                })
                this.loading = false
            }
        })
    },
    editRoleFunctionOk:function(){
      this.loading = true
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.editRoleFunctions(res=>{
            let roleId = that.selectedRow.id
            that.getRoleFunctions(roleId)
            that.loading = false
            alert('修改成功')
        }, res=>{
            that.loading = false
            alert('修改失败')
        })
        
      }).catch(() => {
      });
    },
    editRoleFunctions:function(mSuccess, mError){
        let roleId = this.selectedRow.id
        let params = {}
        params.roleId = roleId
        let functions2Edit = []
        functions2Edit = this.roleMenus.filter(roleMenu=> roleMenu.has)
        functions2Edit.forEach(roleMenu2Edit=>{
            if(roleMenu2Edit.opts != undefined){
                let opts2Edit = roleMenu2Edit.opts.filter(opt=> opt.has)
                opts2Edit.forEach(opt2Edit=>{
                    functions2Edit.push(opt2Edit)
                })
            }
        })
        
        let functionIds = functions2Edit.map(fun2Edit=>{
            return fun2Edit.function_id
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
    onRoleFunctionsSelectAll(rows){
        this.onRoleFunctionsSelect(rows, null)
    },
    onRoleFunctionsSelect(rows, row){
        // console.log("rows:" + JSON.stringify(rows))
        this.roleMenus.forEach(roleMenu=>{
            roleMenu.has = false
            rows.forEach(row=>{
                if(roleMenu.function_id == row.function_id){
                        roleMenu.has = true;
                }
            })
        }) 
    },
    handleRoleFunctionsSelectionChange (val) {
    },
    onOptsSelect(rows, row){
        console.log('rows:' + JSON.stringify(rows))
        let that = this
        this.selectedMenu.opts.forEach(opt=>{
            opt.has = false
            this.selectedMenu.has = false
            rows.forEach(row=>{
                if(opt.function_id == row.function_id){
                    opt.has = true
                    that.selectedMenu.has = true
                }
            })
        })  
    },
    onOptsSelectAll(rows){
        this.onOptsSelect(rows, null)
    },
    handleOptSelectionChange(val){
        
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
