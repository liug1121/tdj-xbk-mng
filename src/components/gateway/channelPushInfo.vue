<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true" :model="queryPushInfo">
        <!-- <el-form-item label="iccid" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="queryPushLog.iccid"></el-input>
        </el-form-item>    
        <el-form-item label="开始时间" class="queryFormItem" >
            
          <el-input class="queryFormInput" clearable placeholder="请输入开始时间" style="width:150px" v-model="queryPushLog.startDate"></el-input>
        </el-form-item> 
        <el-form-item label="结束时间" class="queryFormItem" >
           
          <el-input class="queryFormInput" clearable placeholder="请输入结束时间" style="width:150px" v-model="queryPushLog.endDate"></el-input>
        </el-form-item> 
        <el-form-item label="推送状态" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择推送状态" v-model="queryPushLog.status">
            <el-option v-for="item in allStatus" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryPushLogClick">查询</el-button> -->
      </el-form>

      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" @click="addPushInfoClick">添加</el-button>
        
      </div>
      
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="pushInfos" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-if="p.prop == 'operation'">
              <el-button  size="mini" type="danger" plain @click="toEditClick(scope.row)">编辑</el-button>
            </div>
              <div v-else v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <el-dialog title="新增配置" :visible.sync="showAddPushInfoDlg" width="450px" @close="closeAddPushInfoDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="addPushInfo"  label-width="110px">
        <el-form-item label="推送名称">
          <el-input style="width:300px;" v-model="addPushInfo.channelName" placeholder="请输入推送名称" ></el-input>
        </el-form-item>
        <el-form-item label="推送地址">
          <el-input style="width:300px;" v-model="addPushInfo.pushUrl" placeholder="请输推送地址" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddPushInfoDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okAddPushInfo" :disabled="btnEnable">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改配置" :visible.sync="showEditPushInfoDlg" width="450px" @close="closeEditPushInfoDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="editPushInfo"  label-width="110px">
        <el-form-item label="推送名称">
          <el-input style="width:300px;" v-model="pushName2Edit" placeholder="请输入推送名称" readonly></el-input>
        </el-form-item>
        <el-form-item label="推送地址">
          <el-input style="width:300px;" v-model="pushUrl2Edit" placeholder="请输推送地址" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditPushInfoDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okEditPushInfo" :disabled="btnEnable">确 定</el-button>
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
    showEditPushInfoDlg:false,
    editPushInfo:{},
    pushId2Edit:-1,
    pushName2Edit:'',
    pushUrl2Edit:'',
    btnEnable:false,
    showAddPushInfoDlg:false,
    addPushInfo:{},
    page: 0,
    pageSize: 10,
    total: 0,
        
    loading: false,
    pushInfos:[],
    queryPushInfo:{},
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'channelName', label: '渠道名称', width: 200, fixed: 'left', sortable: true },
        { prop: 'pushUrl', label: '推送链接', width: 390, fixed: 'left', sortable: true },
        { prop: 'operation', label: '操作', width: 390, fixed: 'left', sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
    this.queryPushInfos()
  },
  watch: {},
  methods: {

      closeEditPushInfoDlg:function(){
          this.showEditPushInfoDlg = false
      }, 
      okEditPushInfo:function(){


        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {}
            params.pushId = this.pushId2Edit
            params.pushUrl = this.pushUrl2Edit
            apiSystem.modifyPushInfo(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryPushInfos()
                    alert('修改成功')
                }
            })
        }).catch(() => {
        }); 
        
      },
      toEditClick:function(row){
        this.pushId2Edit = row.id
        this.pushName2Edit = row.channelName
        this.pushUrl2Edit = row.pushUrl

        this.showEditPushInfoDlg = true
      },
      addPushInfoClick:function(){
          this.showAddPushInfoDlg = true
      },
      closeAddPushInfoDlg:function(){
          this.showAddPushInfoDlg = false
      }, 
      okAddPushInfo:function(){

        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {}
            params.name = this.addPushInfo.channelName
            params.url = this.addPushInfo.pushUrl
            apiSystem.addPushInfo(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryPushInfos()
                    alert('新增成功')
                }
            })
        }).catch(() => {
        }); 
        
      },
      queryPushInfoClick:function(){
          this.queryPushInfos()
      },

      queryPushInfos:function(){
        let params = {}
        
        apiSystem.getPushInfos(params).then(res=>{
            if(res.resultCode == 0){
                this.pushInfos = res.data
            }
        })
      },
      startTimeChange () {
        // this.queryPushLog.startDate = `${this.queryPushLog.startDate}`
      },
      endTimeChange () {
        // this.queryPushLog.endDate = `${this.queryPushLog.endDate}`
      },
      handleSizeChange (newPage) {
        // this.page = newPage;
        // this.queryPushLogs()
      },
      handleCurrentChange (newPage) {
        // this.page = newPage;
        // this.queryPushLogs()
      }
  }
};
</script>
<style scoped>
</style>