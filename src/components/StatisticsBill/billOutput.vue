<template>
  <!-- 输出 2021-01月 刘珍利  -->
  <div class="box_subject">
     <el-row :gutter="20">
    <el-col :span="5">
      <div class="heraderTop">
        <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 0}" @click="treeSelect(0)">学霸卡</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 1}" @click="treeSelect(1)">大流量</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 2}" @click="treeSelect(2)">子账户</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 3}" @click="treeSelect(3)">无渠道</div>
        </div>
      </div >
      <xbChannelTree v-if="treeSelectedType == 0" ref="xbChannerTreeRef" @channelChick="xbChannelChick" @getChannelId="getXbChannelId" style="max-height:680px;overflow: auto"></xbChannelTree>
        <channelTree v-else-if="treeSelectedType == 1" ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
    </el-col>
    <el-col :span="19">
    <el-card class="all_list">
      <!-- 按钮 -->
      <div class="heraderTop">
        <div class="button_content">
          <el-button class="upload-btn" size="medium" icon="el-icon-download" slot="trigger" type="primary" @click="exportButton" 
          v-permission="{indentity:'xbkBillOutput-export'}">导出</el-button>
        </div>
        <!-- 查询区域 -->
        <el-form :inline="true" ref="queryBillFormRef" :model="queryBillForm" class="queryForm">
          <el-form-item label="ICCID" class="queryFormItem">
            <el-input style="width:150px" class="queryFormInput" v-model="queryBillForm.iccid" placeholder="请输入iccid"></el-input>
          </el-form-item>
          <el-form-item label="子账户" class="queryFormItem">
            <el-select style="width:150px" size="small" v-model="queryBillForm.subAccount" clearable filterable placeholder="请输入子账户关键词">
              <el-option v-for="item in subAccountOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道" class="queryFormItem" v-if="treeSelectedType != 3">
            <el-select style="width:100px" size="small" v-model="queryBillForm.channelId" clearable filterable placeholder="请输入子账户关键词">
              <el-option v-for="item in channels" :key="item.channelId" :label="item.channelName" :value="item.channelId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="账期" class="queryFormItem">
            <el-date-picker style="width:100px" v-model="queryBillForm.cycleId" type="month" placeholder="选择账期" value-format="yyyyMM">
            </el-date-picker>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="queryBillButton">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!-- <div class="heraderTop" v-if="treeSelectedType == 3">
        <div class="button_content">
          <el-button class="upload-btn" size="medium" slot="trigger" type="primary" 
          v-permission="{indentity:'xbkBillOutput-export'}" @click="showDistributeChannel">分配渠道</el-button>
        </div>
      </div> -->
      <!-- 表格 -->
      <el-table v-loading="loading" :data="billList" style="width: 100%">
        <el-table-column label="CMP账单数据">
          <el-table-column prop="iccid" label="SIM卡" width="180">
          </el-table-column>
          <el-table-column prop="union_id" label="蜂窝账号" width="200">
          </el-table-column>
          <el-table-column prop="sub_account" label="子账户" width="170">
          </el-table-column>
          <el-table-column label="CMP出账（用量）">
            <el-table-column prop="data_usage" label="流量（MB）" width="150">
            </el-table-column>
            <el-table-column prop="sms_mo" label="短信MO量（条）" width="150">
            </el-table-column>
          </el-table-column>
          <el-table-column prop="voice_mo" label="通话MO总量（分:秒）" width="120">
          </el-table-column>
          <el-table-column prop="voice_mt" label="通话MT总量（分:秒）" width="120">
          </el-table-column>
        </el-table-column>
        <el-table-column label="卡管理平台数据">
          <el-table-column prop="cycle_id" label="账期" width="70">
          </el-table-column>
          <el-table-column prop="card_status" label="实名状态" width="80">
          </el-table-column>
          <el-table-column label="渠道" width="200">
            <template slot-scope="scope">
              <span v-if="scope.row.channels.length >= 1"></span>
              {{scope.row.channels[0]}}
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
      <!-- 分页 区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    </el-col>
    </el-row>
    <el-dialog title="分配渠道" :visible.sync="showDistributeChannelDlg" width="450px" @close="hideDistributeChannelDlg">
      <el-form :model="distributeChannelForm"  label-width="110px">
        <el-form-item label="类型">
          <el-select style="width:100px" size="small" v-model="distributeChannelForm.type" clearable filterable placeholder="请输入类型">
              <el-option v-for="item in distributeTypes" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
          <el-form-item label="渠道名称" v-if="distributeChannelForm.type == 0">
          <el-select style="width:200px"  size="small" v-model="distributeChannelForm.channelId" clearable filterable placeholder="请输入子账户关键词" >
              <el-option v-for="item in allXbChannels" :key="item.channelId" :label="item.channelName" :value="item.channelId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道名称" v-else-if="distributeChannelForm.type == 1">
            <el-select style="width:200px"  size="small" v-model="distributeChannelForm.channelId" clearable filterable placeholder="请输入子账户关键词" >
              <el-option v-for="item in allBigflowChannels" :key="item.channelId" :label="item.channelName" :value="item.channelId">
              </el-option>
            </el-select>
          </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDistributeChannelDlg">取 消</el-button>
        <el-button type="primary" @click="okDistributeChannel">确 定</el-button>
      </span>  
    </el-dialog>
  </div>
</template>

<script>
// import channelSelect from './../sale/channelSelect'
import channelTree from "./channelTree"
import xbChannelTree from "./xbChannelTree"
import API from 'api/StatisticsBill'
import apiXbChannel from 'api/channels'
import apiBigflowChannel from 'api/bigflow'
export default {
  components: {
    // channelSelect,
    channelTree,
    xbChannelTree
  },
  data () {
    return {
      allXbChannels:[],
      allBigflowChannels:[],
      showDistributeChannelDlg:false,
      distributeChannelForm:{},
      treeSelectedType:0,
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      billList: [],
      channels:[],
      UnionidsOptions: [],
      subAccountOptions: [],
      queryBillForm: {
        channelId: null,
        channelName:null,
        cycleId: null,
        unionId: null,
        usageType: null,
        subAccount: null,
        page: 0,
        pageSize: 10
      },
      // 用量
      usageTypeOptions: [
        { label: "无用量", value: 0 },
        { label: "有用量", value: 1 }
      ],
      distributeTypes: [
        { label: "学霸卡", value: 0 },
        { label: "大流量卡", value: 1 }
      ],
      loading: false
    }
  },

  mounted () {
    this.getUnionidsOptions()
    this.getsubAccountOptions()
    this.getBillList()
    this.getXbChannels()
    this.getBigflowChannels()
    // this.getChannelNames()
  },
  methods: {
    getXbChannels:function(){
      apiXbChannel.apiChannelsAllList().then(res => {
        if (res.resultCode === 0) {
          this.allXbChannels = Object.values(res.data).map(function (e) {
            return {
              channelId: e.channelId,
              channelName: e.channelName,
              manager: e.manager,
              parentChannelId: e.parentChannelId
            }
          })
          
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    getBigflowChannels:function(){
      let params = {}
      params.page=1
      apiBigflowChannel.getSaleChannels(params).then(res => {
        if (res.resultCode === 0) {
          this.allBigflowChannels = Object.values(res.data).map(function (e) {
            return {
              channelId: e.channelId,
              channelName: e.name,
              manager: e.manager,
              parentChannelId: e.parentChannelId
            }
          })
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    showDistributeChannel:function(){
      this.showDistributeChannelDlg = true
    },
    hideDistributeChannelDlg:function(){
      this.showDistributeChannelDlg = false
    },
    okDistributeChannel:function(){

      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // let params = {}
        // params.name = this.addChannelForm.name
        // params.parentId = this.addChannelForm.parentId
        // params.contactMobile = this.addChannelForm.phone
        // params.contactName = this.addChannelForm.salePerson
        // params.password = this.addChannelForm.pwd

        // params.channelId = localStorage.getItem('channelId');
        // apiBigflow.addSaleChannel(params).then(res => {
        //     if (res.resultCode === 0) {
        //       this.$message.success('添加成功！')
        //       this.$refs.channerTreeRef.getChannelTree()
        //       this.hideAddChannelDlg()
        //     } else {
        //       this.$message.error(res.resultInfo)
        //     }
        //   })
      }).catch(() => {
      }); 

    },
    treeSelect:function(type){
      this.treeSelectedType = type
      if(type == 3){
        this.getUnChannelsList()
      }
    },
    xbChannelChick (channel) {
    },
    getUnChannelsList:function(){
      this.queryBillForm = {}
      let channelIds = []
      channelIds.push('-1')
      this.queryBillForm.channelIds = channelIds
      this.getBillList()
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getXbChannelId (channelsID, channelName,allSubNodes) {
      this.queryBillForm = {}
      this.channels = allSubNodes
      let channelIds = []
      for(let i = 0; i < this.channels.length; i++){
        channelIds.push(this.channels[i].channelId)
      }
      this.queryBillForm.channelIds = channelIds
      this.getBillList()
    },
    channelChick (channel) {
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName,allSubNodes) {
      console.log('***')
      this.queryBillForm = {}
      console.log('***')
      this.channels = allSubNodes
      console.log(JSON.stringify(this.channels))
      let channelIds = []
      for(let i = 0; i < this.channels.length; i++){
        channelIds.push(this.channels[i].channelId)
      }
      this.queryBillForm.channelIds = channelIds
      this.getBillList()
    },

    // 获取蜂窝平台信息
    getUnionidsOptions () {
      API.apiUnionidsList().then(res => {
        if (res.resultCode === 0) {
          this.UnionidsOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取子账户
    getsubAccountOptions () {
      API.apisubAccountList().then(res => {
        if (res.resultCode === 0) {
          this.subAccountOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取列表
    getBillList () {
      let params = this.queryBillForm
      this.loading = true
      API.apiBillList(params).then(res => {
        if (res.resultCode === 0) {
          this.billList = res.data
          for (let i = 0; i < this.billList.length; i++) {
            this.billList[i].channels.reverse()
          }
          console.log(this.billList);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryBillForm.pageSize = newSize
      this.getBillList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryBillForm.page = newPage - 1
      this.getBillList()
    },
    // 导出
    exportButton () {
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        API.apiBillExport(this.queryBillForm).then(res => {
          if (!res) {
            return
          }
          this.$message.success(`请前往“我的任务”中查询，id值为${res.data}`)
        })
        }).catch(() => {
        });
    },
    // 渠道
    channelSelectId (channelSelectId) {
      this.queryBillForm.channelId = channelSelectId
      // console.log(channelSelectId);
    },
    // 查询
    queryBillButton () {
      if (this.queryBillForm.channelId === '') {
        this.queryBillForm.channelId = null
      }
      if (this.queryBillForm.unionId === '') {
        this.queryBillForm.unionId = null
      }
      if (this.queryBillForm.cycleId === '') {
        this.queryBillForm.cycleId = null
      }
      if (this.queryBillForm.subAccount === '') {
        this.queryBillForm.subAccount = null
      }
      if (this.queryBillForm.usageType === '') {
        this.queryBillForm.usageType = null
      }
      this.queryBillForm.channelIds = null
      if(this.queryBillForm.channelId != null){
        let channelIds = []
        channelIds.push(this.queryBillForm.channelId )
        this.queryBillForm.channelIds = channelIds
      }
      if(this.treeSelectedType == 3){
        let channelIds = []
        channelIds.push('-1')
        this.queryBillForm.channelIds = channelIds
      }
      this.getBillList()
    }
  }
}
</script>

<style scoped>
/* .tree-tab-selected {
  display:inline-block;
  background:#6ab3fc;
  color: white;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  border-radius:5px;
  width: 90px;
  text-align: center;
} */
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