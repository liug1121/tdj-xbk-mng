<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="支付订单号" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入支付订单号" style="width:150px" v-model="payOutId"></el-input>
        </el-form-item>    
        <el-form-item label="卡号码" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入卡号码" style="width:150px" v-model="phoneNumber"></el-input>
        </el-form-item> 
        <el-form-item label="ICCID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="iccid"></el-input>
        </el-form-item>   
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="cardStatus">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消费类型" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择消费类型" v-model="typeName">
            <el-option v-for="item in typeNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="changeStartDateTime">   
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="changeEndDateTime">
          </el-date-picker>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="queryCardChanges">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" 
        v-permission="{indentity:'bigflowCardChange-export'}" disabled>导出</el-button>
      </div>
      <!-- 列表区域 -->
      <!-- <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div> -->
      <el-table  :data="cardChanges" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30,100,200]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-main class="el-loading" v-loading="loading" element-loading-background="transparent"
        element-loading-text="加载中" > 
    </el-main>
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
    channels:[],
    payOutId:'',
    phoneNumber:''  ,
    iccid:''  ,
    cardStatus:''  ,
    saleChannel:'' ,   
    typeName:''  ,
    changeStartDateTime:''  ,
    changeEndDateTime:'',
    statusOptions:[
        {label:'支付成功', value:1},
        {label:'已退款', value:2}
    ],
    typeNames:[
        {label:'套餐购买',value:'package_purchase'},
        {label:'增值包',value:'value_added_package'},
        {label:'语音包购买',value:'voice_added_package'},
        {label:'短信包购买',value:'sms_added_package'},
        {label:'流量包购买',value:'flow_added_package'},
        {label:'余额充值',value:'balance_recharge'},
        {label:'套餐变更',value:'package_update'},
        {label:'流量超限扣费',value:'FLOW_OVERRUN_DEDUCTIONS'},
        {label:'短信超限扣费',value:'SMS_OVERRUN_DEDUCTIONS'},
        {label:'语音超限扣费',value:'VOICE_OVERRUN_DEDUCTIONS'},
        {label:'返还超限扣费',value:'RETURN_FLOW_OVERRUN_DEDUCTIONS'},
        {label:'返还短信超限扣费',value:'RETURN_SMS_OVERRUN_DEDUCTIONS'},
        {label:'冻结金额扣费记账',value:'FREEZE_DEDUCT'},
        {label:'卡扣费记账',value:'CARD_ACTIVED_DEDUCT'}
    ],
    cardChanges:[],
      page: 0,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'id', label: '流水ID', width: 80, sortable: true },
        { prop: 'typeName', label: '消费类型', width: 50, sortable: true },
        { prop: 'amountYuan', label: '消费金额', width: 80, sortable: true },
        { prop: 'productCodeName', label: '产品', width: 50, sortable: true },
        { prop: 'phoneNumber', label: '卡号码', width: 120, sortable: true },
        { prop: 'iccid', label: 'ICCID', width: 180, sortable: true },
        { prop: 'cardTypeName', label: '卡类型', width: 60, sortable: true },
        { prop: 'statusName', label: '状态', width: 60, sortable: true },
        { prop: 'payOutId', label: '支付订单号', width: 100, sortable: true },
        { prop: 'saleChannelName', label: '渠道', width: 100, sortable: true },
        { prop: 'salePoint', label: '销售网点', width: 60, sortable: true },
        { prop: 'salePersonName', label: '销售员', width: 50, sortable: true },
        { prop: 'payOrderId', label: '订单编号', width: 80, sortable: true },
        { prop: 'supplierName', label: '运营商', width: 80, sortable: true },
        { prop: 'chargeSceneName', label: '首充/续充', width: 50, sortable: true },
        { prop: 'gmtCharge', label: '销售时间', width: 100, sortable: true },
        { prop: 'scene', label: '备注', width: 100, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
    //   this.getAllPools()
      this.getAllChannels()
      this.queryCardChanges()
  },
  watch: {},
  methods: {
    startTimeChange () {
      this.changeStartDateTime = `${this.changeStartDateTime}`
    },
    endTimeChange () {
      this.changeEndDateTime = `${this.changeEndDateTime}`
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
                this.total = res.rowNum
            }
        })
    },
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryCardChanges:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        params.pageSize = this.pageSize
        if(this.payOutId != '')
            params.payOutId = this.payOutId
        if(this.phoneNumber != '')
            params.phoneNumber = this.phoneNumber
        if(this.iccid != '')
            params.iccid = this.iccid
        if(this.cardStatus != '')
            params.status = this.cardStatus
        if(this.saleChannel != '')
            params.saleChannel = this.saleChannel
        if(this.typeName != '')
            params.type = this.typeName
        if(this.changeStartDateTime != '')
            params.gmtChargeStart = this.changeStartDateTime
        if(this.changeEndDateTime != '')
            params.gmtChargeEnd = this.changeEndDateTime
        apiBigflow.getCardChanges(params).then(res=>{
            if(res.resultCode == 0){
                this.cardChanges = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.pageSize = newPage;
      this.queryCardChanges()
    },
    handleCurrentChange (newPage) {
      this.page = newPage - 1;
      this.queryCardChanges()
    },
  }
};
</script>
<style scoped>
.el-button {
  color:#145297;
    background-color: transparent;
    border-color: transparent;
}
</style>
