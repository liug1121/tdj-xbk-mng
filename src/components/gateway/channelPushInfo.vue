<template>
  <div class="box_subject">
    <el-card class="all_list">
      <el-col :span="5">
        <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 0}" @click="treeSelect(0)">学霸卡</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 1}" @click="treeSelect(1)">大流量</div>
        </div>
        <xbChannelTree v-if="treeSelectedType == 0" ref="xbChannerTreeRef" @channelChick="xbChannelChick" @getChannelId="getXbChannelId" style="max-height:680px;overflow: auto"></xbChannelTree>
        <channelTree v-else-if="treeSelectedType == 1" ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="19">
        <el-form  :inline="true" :model="queryPushInfo">
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
              <el-button  size="mini" type="danger" plain @click="toDeleteClick(scope.row)">删除</el-button>
            </div>
              <div v-else v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      </el-col>
      <!-- 查询区域 -->
    </el-card>

    <el-dialog title="新增配置" :visible.sync="showAddPushInfoDlg" width="450px" @close="closeAddPushInfoDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="addPushInfo"  label-width="110px">
        <!-- <el-form-item label="类型" >
            <el-select style="width:200px"  size="small" v-model="addPushInfo.type" clearable filterable placeholder="请输入子账户关键词" >
              <el-option v-for="item in types" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item> -->
        <!-- <el-form-item label="推送名称">
          <el-input style="width:300px;" v-model="addPushInfo.channelName" placeholder="请输入推送名称" ></el-input>
        </el-form-item> -->
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
import channelTree from "./channelTree"
import xbChannelTree from "./xbChannelTree"
import apiSystem from './../../api/system'
export default {
  components: {
    channelTree,
    xbChannelTree
  },
  data () {
    return {
    selectedChannelId:null,
    treeSelectedType:0,
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
        // { prop: 'channelName', label: '渠道名称', width: 200, fixed: 'left', sortable: true },
        { prop: 'pushUrl', label: '推送链接', width: 450, fixed: 'left', sortable: true },
        { prop: 'operation', label: '操作', width: 440, fixed: 'left', sortable: true }
      ],
      types: [
        { label: "学霸卡", value: 0 },
        { label: "大流量卡", value: 1 }
      ],
    };
  },
  mounted () {

  },
  created(){
    // this.queryPushInfos()
  },
  watch: {},
  methods: {

    treeSelect:function(type){
      this.treeSelectedType = type
    },

    xbChannelChick (channel) {
    },
    getUnChannelsList:function(){
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getXbChannelId (channelsID, channelName,allSubNodes) {
      this.selectedChannelId = channelsID
      this.queryPushInfos()
    },
    channelChick (channel) {
      
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName,allSubNodes) {
      this.selectedChannelId = channelsID
      this.queryPushInfos()
    },

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
      toDeleteClick:function(row){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {}
            params.pushId = row.id
            apiSystem.removePushInfo(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryPushInfos()
                    alert('删除成功')
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
        if(this.selectedChannelId == null || this.selectedChannelId == undefined || this.selectedChannelId == ''){
              this.$message.error('请选择相应的渠道')
              return 
            }
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
            params.channelId = this.selectedChannelId
            params.type = this.treeSelectedType
            // params.name = this.addPushInfo.channelName
            params.url = this.addPushInfo.pushUrl
            
            // if(params.type == null || params.type == undefined || params.type == ''){
            //   this.$message.error('请选择相应的类型')
            //   return 
            // }
            if(params.url == null || params.url == undefined || params.url == ''){
              this.$message.error('请输入推送地址')
              return 
            }
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
        params.channelId = this.selectedChannelId
        params.type = this.treeSelectedType
        apiSystem.getPushInfos(params).then(res=>{
            if(res.resultCode == 0){
                this.pushInfos = res.data
            }
        })
      },
      startTimeChange () {
      },
      endTimeChange () {
      },
      handleSizeChange (newPage) {
      },
      handleCurrentChange (newPage) {
      }
  }
};
</script>
<style scoped>
.tree-tab-unselected {
  display:inline-block;
  background:silver;
  color:white;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  border-radius:5px;
  width: 40px;
  font-size: 5px;
  text-align: center;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
</style>