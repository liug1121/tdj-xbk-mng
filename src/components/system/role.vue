<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" >新增角色</el-button>
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
              </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </el-card>
    <el-dialog title="角色功能" :visible.sync="functionDlgShow" width="430px" >
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
    // id:'',
    // name:'',
    // appId:'',
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'platformName', label: '平台类型', width: 200, fixed: 'left'},
        { prop: 'name', label: '角色名称', width: 300, fixed: 'left'},
        { prop: 'id', label: 'ID', width: 300, fixed: 'left'},
        { prop: 'operations', label: '操作', width: 300}
      ],
      function_column: [
        { prop: 'functionName', label: '功能名称', width: 200}
        // { prop: 'function_id', label: '', width: 300, fixed: 'left'},
        // { prop: 'id', label: 'ID', width: 300, fixed: 'left'},
        // { prop: 'operations', label: '操作', width: 300}
      ]


    //   private Integer id;
	// private Integer role_id;
	// private Integer function_id;
	// private Boolean has = false;
	// private String functionName;
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
