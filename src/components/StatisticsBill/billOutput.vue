<template>
  <!-- 输出 2021-01月 刘珍利  -->
  <div class="box_subject">
     <el-row :gutter="20">
    <el-col :span="7">
      <div class="heraderTop">
        <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 0}" @click="treeSelect(0)">学霸卡渠道</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 1}" @click="treeSelect(1)">大流量卡渠道</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':treeSelectedType == 2}" @click="treeSelect(2)">子账户</div>
          <!-- <el-button class="upload-btn" size="medium" icon="el-icon-download" slot="trigger" type="primary" @click="exportButton" 
          v-permission="{indentity:'xbkBillOutput-export'}">导出</el-button> -->
        </div>
      </div >
      <xbChannelTree v-if="treeSelectedType == 0" ref="xbChannerTreeRef" @channelChick="xbChannelChick" @getChannelId="getXbChannelId" style="max-height:680px;overflow: auto"></xbChannelTree>
        <channelTree v-else ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
    </el-col>
    <el-col :span="17">
    <el-card class="all_list">
      <!-- 按钮 -->
      <div class="heraderTop">
        <div class="button_content">
          <el-button class="upload-btn" size="medium" icon="el-icon-download" slot="trigger" type="primary" @click="exportButton" 
          v-permission="{indentity:'xbkBillOutput-export'}">导出</el-button>
        </div>
        <!-- 查询区域 -->
        <el-form :inline="true" ref="queryBillFormRef" :model="queryBillForm" class="queryForm">
          <!-- <el-form-item label="运营商ID" class="queryFormItem">
            <el-select style="width:140px" size="small" v-model="queryBillForm.unionId" clearable filterable placeholder="请输入运营商ID关键词">
              <el-option v-for="item in UnionidsOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="子账户" class="queryFormItem">
            <el-select style="width:140px" size="small" v-model="queryBillForm.subAccount" clearable filterable placeholder="请输入子账户关键词">
              <el-option v-for="item in subAccountOptions" :key="item" :label="item" :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="渠道" class="queryFormItem">
            <el-select style="width:140px" size="small" v-model="queryBillForm.channelId" clearable filterable placeholder="请输入子账户关键词">
              <el-option v-for="item in channels" :key="item.channelId" :label="item.channelName" :value="item.channelId">
              </el-option>
            </el-select>
            <!-- <channelSelect v-model="queryBillForm.channelId" style="width:120px !important" @channelSelectId="channelSelectId"></channelSelect> -->
          </el-form-item>
          <el-form-item label="账期" class="queryFormItem">
            <el-date-picker style="width:140px" v-model="queryBillForm.cycleId" type="month" placeholder="选择账期" value-format="yyyyMM">
            </el-date-picker>
          </el-form-item>
          <!-- <el-form-item label="用量" class="queryFormItem">
            <el-select style="width:112px" size="small" v-model="queryBillForm.usageType" clearable filterable placeholder="请选择用量">
              <el-option v-for="item in usageTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="queryBillButton">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
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
          <!-- <el-table-column label="二级渠道" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.channels.length >= 2"></span>
              {{scope.row.channels[1]}}
            </template>
          </el-table-column>
          <el-table-column label="三级渠道" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.channels.length >= 3"></span>
              {{scope.row.channels[2]}}
            </template>
          </el-table-column>
          <el-table-column label="四级渠道" width="120">
            <template slot-scope="scope">
              <span v-if="scope.row.channels.length >= 4"></span>
              {{scope.row.channels[3]}}
            </template>
          </el-table-column> -->
        </el-table-column>
      </el-table>
      <!-- 分页 区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    </el-col>
    </el-row>
  </div>
</template>

<script>
// import channelSelect from './../sale/channelSelect'
import channelTree from "./channelTree"
import xbChannelTree from "./xbChannelTree"
import API from 'api/StatisticsBill'
export default {
  components: {
    // channelSelect,
    channelTree,
    xbChannelTree
  },
  data () {
    return {
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
      loading: false
    }
  },

  mounted () {
    this.getUnionidsOptions()
    this.getsubAccountOptions()
    this.getBillList()
    // this.getChannelNames()
  },
  methods: {
    treeSelect:function(type){
      this.treeSelectedType = type
    },
    xbChannelChick (channel) {
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getXbChannelId (channelsID, channelName,allSubNodes) {
      this.queryBillForm = {}
      this.queryBillForm.channelName = channelName
      this.channels = allSubNodes
      this.getBillList()
    },
    channelChick (channel) {
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName,allSubNodes) {
      this.queryBillForm = {}
      this.queryBillForm.channelName = channelName
      this.channels = allSubNodes
      this.getBillList()
    },
    // getChannelNames(){
    //   API.apiChannelNames().then(res => {
    //     if (res.resultCode === 0) {
    //       this.channelNames = res.data
    //     } else {
    //       this.$message.error(res.resultInfo)
    //     }
    //   })
    // },
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
  width: 90px;
  text-align: center;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
</style>