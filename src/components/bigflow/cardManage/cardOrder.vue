<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="订单编号" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入订单编号" style="width:150px" v-model="orderId"></el-input>
        </el-form-item>
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
        <el-form-item label="下单时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="orderStartDate">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="orderEndDate">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="channel" @change="handleSelectBranchCom">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryCardOrders">查询</el-button>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" 
        v-permission="{indentity:'bigflowCardOrder-export'}">导出</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardOrder-createAndDistribution'}">创建订单并分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardOrder-distribution'}" @click="openMoveOrderDlg">首尾分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardOrder-exportFor'}">按首尾条件导出</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="cardOrders" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
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
    <el-dialog title="渠道分配" :visible.sync="showMoveOrderDlg" width="450px" @close="closeMoveOrderDlg">

      <el-form :model="moveOrderForm"  label-width="110px">
        <el-form-item label="买家姓名">
          <el-input style="width:300px;"  v-model="moveOrderForm.name" placeholder="请输入买家姓名" ></el-input>
        </el-form-item>
        <el-form-item label="分配渠道">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请选择分配渠道" v-model="moveOrderForm.saleChannel" @change="handleSelectChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="销售员">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"   placeholder="请选择销售员" v-model="moveOrderForm.salePerson2">
            <el-option v-for="item in salePersons" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首ICCID">
          <el-input style="width:300px;"  v-model="moveOrderForm.iccidStart" placeholder="请输入首ICCID" ></el-input>
        </el-form-item>
        <el-form-item label="尾ICCID">
          <el-input style="width:300px;"  v-model="moveOrderForm.iccidEnd" placeholder="请输入尾ICCID" ></el-input>
        </el-form-item>
        <!-- <el-form-item label="预充值套餐">
          <el-select class="queryFormInput"  clearable placeholder="请选择预充值套餐" v-model="moveOrderForm.productCode">
            <el-option v-for="item in products2Change" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item> -->
        <el-form-item label="赠送流量（MB）">
          <el-input style="width:300px;"  v-model="moveOrderForm.giveUsage" onkeyup="value=value.replace(/[^\d]/g,'')" placeholder="请输入赠送流量" ></el-input>
        </el-form-item>
        <el-form-item label="赠送用量类型">
          <el-select class="queryFormInput"  clearable placeholder="赠送用量类型" v-model="moveOrderForm.giveUsageType">
            <el-option v-for="item in giveTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeMoveOrderDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okMoveOrder" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'
import editCardInfo from './../../cardInfo/editCardInfo'
import channelSelect from './../../sale/channelSelect'
export default {
  components: {
    editCardInfo,
    channelSelect
  },
  data () {
    return {
        showMoveOrderDlg:false, 
        moveOrderForm:{}, 
        btnEnable:false,
        cardStatus:'',
        orderStartDate:'',
        orderEndDate:'',
        orderId:'',
        iccid:'',
        msisdn:'',
        channel:'',
        salePersons:[],
        loading: false,

    statusOptions: [
        { label: "已录入", value: 1 },
        { label: "已发货", value: 2 },
        { label: "已激活", value: 3 },
        { label: "已驳回", value: 4 },
        { label: "已开卡", value: 5 },
        { label: "已销毁", value: 6 },
        { label: "支付成功", value: 30 }
      ],
    giveTypes:[{
        value:1,
        name:'包含套餐'
    },
    {
        value:2,
        name:'不包含套餐'
    }],
    channels:[],
      products2Change:[],
      cardOrders: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'orderId', label: '订单编号', width: 200, fixed: 'left', sortable: true },
        { prop: 'productName', label: '卡套餐', width: 190, fixed: 'left', sortable: true },
        { prop: 'iccid', label: 'ICCID', width: 200, sortable: true },
        { prop: 'phoneNumber', label: 'MSISDN', width: 150, sortable: true },
        { prop: 'name', label: '买家姓名', width: 110, sortable: true },
        { prop: 'saleChannelName', label: '渠道名称', width: 200, sortable: true },
        { prop: 'salePoint', label: '销售网点', width: 180, sortable: true },
        { prop: 'salePerson', label: '销售员', width: 110, sortable: true },
        { prop: 'supplierName', label: '供应账户', width: 180, sortable: true },
        { prop: 'statusName', label: '订单状态', width: 300 },
        { prop: 'giveUsage', label: '赠送用量', width: 180 },
        { prop: 'giveUsageType', label: '赠送用量类型', width: 110 },
        { prop: 'gmtCreate', label: '下单时间', width: 160, sortable: true },
        { prop: 'gmtActive', label: '激活时间', width: 160 }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllChannels()
      this.queryCardOrders()
      this.getProducts2Change()
  },
  watch: {},
  methods: {
    openMoveOrderDlg:function(){
        this.showMoveOrderDlg = true
    }, 
    closeMoveOrderDlg:function(){
        this.showMoveOrderDlg = false
    },
    okMoveOrder:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.name = this.moveOrderForm.name
            params.saleChannel = this.moveOrderForm.saleChannel
            params.salePerson2 = this.moveOrderForm.salePerson2
            params.iccidStart = this.moveOrderForm.iccidStart
            params.iccidEnd = this.moveOrderForm.iccidEnd
            params.productCode = this.moveOrderForm.productCode
            params.giveUsage = this.moveOrderForm.giveUsage
            params.giveUsageType = this.moveOrderForm.giveUsageType
            apiBigflow.moveOrderByIccidsBetween(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardOrders()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    getChannelSalePersions:function(channelId){
        let seletedChannels = this.channels.filter(channel=>{
            return channel.value === channelId
        })
        // console.log('seletedChannel:' + JSON.stringify(seletedChannels))
        this.salePersons = []
        seletedChannels.forEach(seletedChannel => {
            let salePoints = seletedChannel.children
            // console.log('salePoints:' + JSON.stringify(salePoints))
            let salePersons = []
            if(salePoints != undefined && 
                salePoints != null && salePoints.length > 0){
                salePoints.forEach(salePoint=>{
                    let salePersonsInPoint = salePoint.children
                    this.salePersons.push.apply(this.salePersons, salePersonsInPoint)
                })
                
            }
        });
        // console.log('salePersons:' + JSON.stringify(this.salePersons))
    },
    handleSelectBranchCom:function(item){
        // console.log('handleSelectBranchCom:' + item)
        this.getChannelSalePersions(item)
    },
    handleSelectChannel:function(item){
        this.getProducts2Change(item)
        this.getChannelSalePersions(item)
    },
    getProducts2Change:function(saleChannel){
        let params = {}
        params.saleChannel = saleChannel
        // console.log('params.saleChannel:' + params.saleChannel)
        apiBigflow.getAllProduct2Change(params).then(res=>{
            if(res.resultCode == 0){
              this.products2Change = res.data
            //   console.log('products2Change:' + JSON.stringify(this.products2Change))
          }
        })
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
              this.channels = res.data
            //   console.log('****' + this.channels.length )
          }
        })
    },
    queryCardOrders:function(){
      this.loading = true
      let params = {}
      params.page = this.page
      if(this.orderId != '')
        params.orderIdlike = this.orderId
      if(this.cardStatus != '')
        params.status = this.cardStatus
      if(this.iccid != '')
        params.iccidlike = this.iccid
      if(this.msisdn != '')
        params.phoneNumber = this.msisdn
      if(this.orderStartDate != '')
        params.gmtCreateStart = this.orderStartDate
      if(this.orderEndDate != '')
        params.gmtCreateEnd = this.orderEndDate
      if(this.channel != '') 
        params.saleChannel = this.channel
      apiBigflow.getCardOrders(params).then(res => {
          if(res.resultCode == 0){
              this.cardOrders = res.data
              this.total = res.rowNum
              this.loading = false
          }
      })
    },
    startTimeChange () {
      this.orderStartDate = `${this.orderStartDate}`
    },
    endTimeChange () {
      this.orderEndDate = `${this.orderEndDate}`
    },
    handleSelectionChange (val) {
      
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryCardOrders()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryCardOrders()
    },
  }
};
</script>
<style scoped>
</style>
