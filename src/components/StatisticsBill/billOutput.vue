<template>
  <!-- 输出 2021-01月 刘珍利  -->
  <div class="box_subject">
    
     <el-row :gutter="20">
    <el-col :span="7">
      
      <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 4}" @click="treeSelect(4)">账单</div>
      <div class="heraderTop">
        
        <div class="button_content">
          <!-- <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 3}" @click="treeSelect(4)">渠道账单</div> -->
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 0}" @click="treeSelect(0)">学霸卡</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 1}" @click="treeSelect(1)">大流量</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 2}" @click="treeSelect(2)">子账户</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 3}" @click="treeSelect(3)">无渠道</div>
        </div>
      </div >
      <xbChannelTree v-if="treeSelectedType == 0" ref="xbChannerTreeRef" @channelChick="xbChannelChick" @getChannelId="getXbChannelId" style="max-height:680px;overflow: auto"></xbChannelTree>
        <channelTree v-else-if="treeSelectedType == 1 || treeSelectedType == 4" ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
        <fwAccountTree v-else-if="treeSelectedType == 2" ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getFwAccount" style="max-height:680px;overflow: auto"></fwAccountTree>
    </el-col>
    
    <el-col :span="17">
    
    <el-card class="all_list">
      <!-- 按钮 -->
      <div class="button_content" v-if="treeSelectedType != 4">
          <el-button class="upload-btn" size="medium" icon="el-icon-download" slot="trigger" type="primary" @click="exportButton" 
          v-permission="{indentity:'xbkBillOutput-export'}">导出</el-button>
          <el-button class="upload-btn" size="medium" icon="el-icon-download" slot="trigger" type="primary" @click="refreshCardsChannels" 
          v-permission="{indentity:'xbkBillOutput-export'}">重新刷新卡渠道</el-button>
        </div>

       <div v-if="treeSelectedType == 4">
         <el-form :inline="true" ref="queryBillFormRef" :model="queryBillForm" class="queryForm">
          <el-form-item label="账期" class="queryFormItem">
            <el-date-picker style="width:120px" v-model="queryBillForm.cycleId" type="month" placeholder="选择账期" value-format="yyyyMM"  >
            </el-date-picker>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="queryCardCompare">查询</el-button>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" @click="toBillOutputDlg">一键出账</el-button>
          </el-form-item>
        </el-form>
        <el-table   v-loading="loading" :data="compareStatics" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column"  :prop="p.prop"  :label="p.label" :key="key" align="center" :width="p.width" :fixed="p.fixed?p.fixed:false" >
              <template slot-scope="scope">     
                <div v-if="p.prop == 'opts'">
                  <el-button type="text" size="small" v-if="scope.row.dataUsageCountryFee !='没有设置出账规则'" @click="toInputCardFeeDlg(scope.row)">卡费</el-button> 
                  <el-button type="text" size="small" v-if="scope.row.dataUsageCountryFee !='没有设置出账规则'" @click="toDownload(scope.row)">导出</el-button> 
                </div>
                <div v-else v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
       </div>
        
      <div v-else>
        <div class="heraderTop">
        <!-- 查询区域 -->
        <el-form :inline="true" ref="queryBillFormRef" :model="queryBillForm" class="queryForm">
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
      </div>
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


    <el-dialog title="录入卡费" :visible.sync="inputCardFeeDlgShowed" width="450px" @close="closeInputCardFeeDlg">
      <el-form :model="cardFeeForm"  label-width="110px">
        <el-form-item label="卡费">
          <el-input style="width:300px;" v-model="cardFeeForm.cardFee" placeholder="请输入卡费" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeInputCardFeeDlg">取 消</el-button>
        <el-button type="primary" @click="okInputCardFee">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="出账方式" :visible.sync="billOutputTypeDlgShowed" width="450px" @close="billOutputTypeDlgShowed = false">
      <el-form :model="billOutputTypeForm"  label-width="110px">
        <el-select style="width:200px"  size="small" v-model="billOutputTypeForm.type" clearable placeholder="请输入出账方式" >
          <el-option v-for="item in billOutputTypes" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="billOutputTypeDlgShowed = false">取 消</el-button>
        <el-button type="primary" @click="okBillOutput">确 定</el-button>
      </span>  
    </el-dialog>
  </div>
</template>

<script>
// import channelSelect from './../sale/channelSelect'
import channelTree from "./channelTree"
import xbChannelTree from "./xbChannelTree"
import fwAccountTree from "./fwAccountTree"
import API from 'api/StatisticsBill'
import apiXbChannel from 'api/channels'
import apiBigflowChannel from 'api/bigflow'
export default {
  components: {
    // channelSelect,
    channelTree,
    xbChannelTree,
    fwAccountTree
  },
  data () {
    return {
      billOutputTypeDlgShowed:false,
      billOutputTypeForm:{
        type:0
      },
      billOutputTypes:[
        {
          id:0,
          name:'全部渠道出账'
        },
        {
          id:1,
          name:'所选渠道及子渠道'
        }
      ],
      defaultDate: new Date(),
      table_column:[ 
        { prop: 'cycleId', label: '帐期', width: 70 },
        { prop: 'channelName', label: '渠道', width: 126 },
        { prop: 'cardNum', label: '有用量卡数量', width: 70 },
        { prop: 'cardNumHasNotUsage', label: '无用量卡数量', width: 70 },
        { prop: 'price', label: '单价', width: 70 },
        { prop: 'billType', label: '出账类型', width: 80 },
        // { prop: 'packageName', label: '套餐名', width: 100 },
        // { prop: 'packageFee', label: '套餐出账金额', width: 70 },
        { prop: 'amountPoolBillFee', label: '当月无用量卡费用', width: 100 },
        { prop: 'usageArea', label: '用量区域', width: 70 },
        { prop: 'dataUsageCountry', label: '总用量', width: 100 },
        { prop: 'dataUsageCountryFee', label: '流量结算金额', width: 100 },
        // { prop: 'dataUsageProvince', label: '省内总用量', width: 100 },
        // { prop: 'dataUsageProvinceFee', label: '省内总', width: 70 },
        { prop: 'cardFee', label: '卡费总金额', width: 100 },
        { prop: 'fee', label: '出账金额汇总', width: 100 },
        { prop: 'amountLast', label: '上月结余', width: 100 },
        { prop: 'addedAmount', label: '本月充值', width: 100 },
        { prop: 'amount', label: '本月结余', width: 100 },
        // { prop: 'payedRecords', label: '充值记录', width: 400 },
        { prop: 'opts', label: '操作', width: 100 ,fixed: 'right' }
      ],
      compareStatics:[],
      subAccountView:false,
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
      totalDataUsage:"0",
      dataUsageCountry:"",
      dataUsageProvince:"",
      cardFee:"",
      dataUsageFee:"",
      fee:"",
      dataUsageCountry:"",
      dataUsageCountry:"",
      channels:[],
      UnionidsOptions: [],
      subAccountOptions: [],
      inputCardFeeDlgShowed:false,
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
      loading: false,
      cardFeeForm:{
        cardFee:0.00,
        channelId:'',
        cycleId:'',
        id:null
      }
    }
  },

  mounted () {
    this.queryBillForm.cycleId = this.formatTimer(new Date())
    this.getUnionidsOptions()
    this.getsubAccountOptions()
    this.getBillList()
    this.getXbChannels()
    this.getBigflowChannels()
    // this.getCompareStatics()
    // this.getChannelNames()
  },
  methods: {
    toBillOutputDlg:function(){
      this.billOutputTypeDlgShowed = true
    },
    okBillOutput:function(){
  //     private List<String> channelIds;
	// private Integer billOutputType;
	// private String cycleId;
      // apiBillOutput
      if(this.queryBillForm.cycleId == undefined || this.queryBillForm.cycleId == '' || this.queryBillForm.cycleId == null){
        this.$message.error('账单账期不能为空')
        return
      }
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.billOutputType = this.billOutputTypeForm.type
        params.cycleId = this.queryBillForm.cycleId
        params.channelIds = this.queryBillForm.channelIds 
        API.apiBillOutput(params).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('操作成功，请稍后在任务：' + res.data + '中进行下载')
            this.clearInputCardFeeForm()
            this.inputCardFeeDlgShowed = false
            this.getCompareStatics()
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      }); 
      this.billOutputTypeDlgShowed = false
    },
    formatTimer: function(date) {
          // let date = new Date(value);
          let y = date.getFullYear();
          let MM = date.getMonth() + 1;
          MM = MM < 10 ? "0" + MM : MM;
          let d = date.getDate();
          d = d < 10 ? "0" + d : d;
          let h = date.getHours();
          h = h < 10 ? "0" + h : h;
          let m = date.getMinutes();
          m = m < 10 ? "0" + m : m;
          let s = date.getSeconds();
          s = s < 10 ? "0" + s : s;
          return y + "" + MM ;
        },
    clearInputCardFeeForm:function(){
      this.cardFeeForm ={
        cardFee:0.00,
        channelId:'',
        cycleId:''
      }
    },
    closeInputCardFeeDlg:function(){
      this.clearInputCardFeeForm()
      this.inputCardFeeDlgShowed = false
    },
    okInputCardFee:function(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = this.cardFeeForm
        API.apiModifyChannelCardFee(params).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('录入成功')
            this.clearInputCardFeeForm()
            this.inputCardFeeDlgShowed = false
            this.getCompareStatics()
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      }); 
    },
    toDownload:function(row){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.channelId = row.channelId
        params.cycleId = row.cycleId
        this.loading = true
        API.apiDownloadChannelBill(params).then(res => {
        if (res.resultCode === 0) {
          console.log(JSON.stringify(res))
          this.$message.success('导出成功，稍后请在任务中查看，任务编号：' + res.data)
        } else {
          this.$message.error(res.resultInfo)
        }
        this.loading = false
      })
      }).catch(() => {
      }); 
    },
    toInputCardFeeDlg:function(row){
      this.inputCardFeeDlgShowed = true
      this.cardFeeForm.channelId = row.channelId
      this.cardFeeForm.cycleId = row.cycleId
      this.cardFeeForm.cardFee = row.cardFee
    },
    queryCardCompare:function(){
      this.getCompareStatics()
    },
      // apiCompareStaticsList
    getCompareStatics:function(){
      let params = {}
      console.log('sss' + JSON.stringify(this.queryBillForm.channelIds ))
      params.channelIds = this.queryBillForm.channelIds 
      params.cycle = this.queryBillForm.cycleId
      if(params.cycle == undefined || params.cycle == ''){
        this.$message.error('请先选择账期')
        return
      }
      // if(params.cycle == undefined || params.cycle == ''){
      //   let nowCycle = (new Date()).Format("yyyyMM") 
      //   params.cycle = nowCycle
      //   this.queryBillForm.cycleId = nowCycle
      // }
      console.log('sdsds' + JSON.stringify(params))
      this.loading = true
      API.apiCompareStaticsList(params).then(res => {
        if (res.resultCode === 0) {
          this.compareStatics = res.data
          // this.allXbChannels = Object.values(res.data).map(function (e) {
          //   return {
          //     channelId: e.channelId,
          //     channelName: e.channelName,
          //     manager: e.manager,
          //     parentChannelId: e.parentChannelId
          //   }
          // })
          
        } else {
          this.$message.error(res.resultInfo)
        }
        this.loading = false
      })
    },
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
      }).catch(() => {
      }); 

    },
    treeSelect:function(type){
      this.queryBillForm.subFwAccounts = null
      this.subAccountView = false
      this.treeSelectedType = type
      if(type == 2){
        this.subAccountView = true
      }
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
    getFwAccount:function(fwAccountID, fwAccountName,allSubNodes){
      if(allSubNodes.length > 1)
        return
      let subAccouts = []
      for(let i = 0; i < allSubNodes.length; i++){
        subAccouts.push(allSubNodes[i].channelId)
      }
      this.queryBillForm.subFwAccounts = subAccouts
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
      let queryCycle = this.formatTimer(new Date())
      if(this.queryBillForm.cycleId != undefined && this.queryBillForm.cycleId !='')
          queryCycle = this.queryBillForm.cycleId
      this.queryBillForm = {}
      this.queryBillForm.cycleId = queryCycle
      console.log('***')
      this.channels = allSubNodes
      console.log(JSON.stringify(this.channels))
      let channelIds = []
      for(let i = 0; i < this.channels.length; i++){
        channelIds.push(this.channels[i].channelId)
      }
      this.queryBillForm.channelIds = channelIds
      this.getBillList()
      this.getCompareStatics()
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
          let data = res.data
          this.billList = data.records
          this.totalDataUsage = data.dataUsage
          this.dataUsageCountry = data.dataUsageCountry
          this.dataUsageProvince = data.dataUsageProvince
          this.cardFee = data.cardFee
          this.dataUsageFee = data.dataUsageFee
          this.fee = data.fee
          this.dataUsageCountry = data.dataUsageCountry
          this.dataUsageCountry = data.dataUsageCountry
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
    refreshCardsChannels:function(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        API.apiRefreshCardCompareChannels(params).then(res => {
          if (!res) {
            return
          }
          this.$message.success(`请前往“我的任务”中查询，id值为${res.data}`)
        })
        }).catch(() => {
        });
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
      this.subAccountView = false
      this.queryBillForm.subFwAccounts = null
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
.total-usage{
  margin: 10px;
  font-size: 15px;
  color: #6ab3fc;
  font-weight: bolder;
}
.statics-item{
  display:inline-block;
  margin: 10px;
  margin-right: 50px;
  font-size: 15px;
  color: #6ab3fc;
  width: 400px;
}
</style>