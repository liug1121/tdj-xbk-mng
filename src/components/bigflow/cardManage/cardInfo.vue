<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="ICCID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="iccid"></el-input>
        </el-form-item>  
        <el-form-item label="MSISDN" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入msisdn" style="width:150px" v-model="msisdn"></el-input>
        </el-form-item>
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="cardStatus">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="认证状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择认证状态" v-model="authStatus">
            <el-option v-for="item in allAuthStatus" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="共享池" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="poolId">
            <el-option v-for="item in pools" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="当前套餐" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择套餐" v-model="packageCode">
            <el-option v-for="item in packages" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通讯计划" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入msisdn" style="width:150px" v-model="planCode"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="channel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="开卡时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="openCardStartDate">  
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="openCardEndDate">
          </el-date-picker>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryCardInfos">查询</el-button>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" >卡状态变更</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" >解绑</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" >可用量清零</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" >可用量变更</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" >变更卡套餐</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" >变更卡通讯计划</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" >有效期延长</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="cardInfos" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'

export default {
  components: {

  },
  data () {
    return {
        loading: false,
        iccid:'',
        msisdn:'',
        cardStatus:'',
        statusOptions:[
            { label: "未激活", value: "willActivat" },
            { label: "已消户", value: 'close' },
            { label: "卡启用", value: 'open' },
            { label: "卡停用", value: 'stopusing' },
            { label: "永久停用", value: 'forever_stopusing' }
        ],
        authStatus:'' ,
        allAuthStatus:[
            {label:'未认证', value:'uncertified'},
            {label:'已认证', value:'authedSuccess'},
            {label:'认证失败', value:'authedFail'},
            {label:'取消实名', value:'close'}
        ],
        poolId:'',
        pools:[] ,
        packageCode:'',
        packages:[],
        planCode:'',
        channel:'',
        channels:[] ,
        openCardStartDate:'',
        openCardEndDate:'',

      cardInfos:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 200, fixed: 'left', sortable: true },
        { prop: 'phoneNumber', label: 'MSISDN', width: 190, fixed: 'left', sortable: true },
        { prop: 'statusName', label: '卡状态', width: 200, sortable: true },
       { prop: 'flowHighDose', label: '高速可用量', width: 150, sortable: true },
        { prop: 'flowHighUsed', label: '高速已用量', width: 110, sortable: true },
        { prop: 'flowMediumDose', label: '中速可用量', width: 200, sortable: true },
        { prop: 'flowMediumUsed', label: '中速已用量', width: 180, sortable: true },
        { prop: 'communPlanName', label: '通讯计划名称', width: 110, sortable: true },
        { prop: 'productCodeName', label: '当前套餐', width: 180, sortable: true },
        { prop: 'authStatusName', label: '认证状态', width: 300 },
        { prop: 'gmtActivate', label: '开卡时间', width: 180 },
        { prop: 'usedStartDate', label: '用量开始日期', width: 110 },
        { prop: 'clearDate', label: '用量清算日期', width: 160, sortable: true },
        { prop: 'expireDate', label: '套餐有效期 ', width: 160 },
        { prop: 'nextProductName', label: '未生效套餐', width: 160 },
        { prop: 'zone', label: '用量区域 ', width: 160 },
        { prop: 'poolName', label: '共享池 ', width: 160 },
        { prop: 'channelName', label: '渠道 ', width: 160 },
        { prop: 'gmtCreate', label: '首次绑定时间 ', width: 160 },
        { prop: 'deviceNameNew', label: '设备名称 ', width: 160 }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllPackages()
      this.getAllChannels()
      this.getAllPools()
      this.queryCardInfos()
  },
  watch: {},
  methods: {
    queryCardInfos:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        if(this.iccid != '')
            params.iccidLike = this.iccid
        if(this.msisdn != '')
            params.phoneNumberLike = this.msisdn
        if(this.cardStatus != '')
            params.status = this.cardStatus
        if(this.authStatus != '')
            params.authStatus = this.authStatus
        if(this.poolId != '')
            params.poolId = this.poolId
        if(this.packageCode != '')
            params.productCode = this.packageCode
        if(this.planCode != '')
            params.communPlan = this.planCode
        if(this.channel != '')
            params.channelId = this.channel
        if(this.openCardStartDate != ''){}
            params.gmtActivateStart = this.openCardStartDate
        if(this.openCardEndDate != '')
            params.gmtActivateEnd = this.openCardEndDate
        apiBigflow.getCardInfos(params).then(res=>{
            if(res.resultCode == 0){
                this.cardInfos = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    getAllPools:function(){
        let params = {}
        apiBigflow.getAllPools(params).then(res=>{
            if(res.resultCode == 0){
                this.pools = res.data
            }
        })
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
            }
        })
    },
    getAllPackages:function(){
        let params = {}
        apiBigflow.getAllPackages(params).then(res=>{
            if(res.resultCode == 0){
              this.packages = res.data
          }
        })
    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    startTimeChange () {
      this.openCardStartDate = `${this.openCardStartDate}`
    },
    endTimeChange () {
      this.openCardEndDate = `${this.openCardEndDate}`
    },
    handleSelectionChange (val) {
      
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryCardInfos()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryCardInfos()
    },
  }
};
</script>
<style scoped>
</style>
