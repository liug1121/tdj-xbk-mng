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
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryCardOrders">查询</el-button>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" >导出</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download" >创建订单并分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download" >首尾分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-download" >按首尾条件导出</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
          <ul>
            <!-- <li v-fo r="(item,index) in cardNos" :key="index">{{item}}</li> -->
          </ul>
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="cardOrders" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
            <!-- <div v-if="p.prop =='orderTypeZS'">
              <div v-if="scope.row.cardStatus === 1">已激活</div>
              <div v-if="scope.row.cardStatus === 0">未激活</div>
              <div v-if="scope.row.cardStatus === 3">已停用</div>
            </div>
            <div v-if="p.prop == 'currentPackagePayTypeCL'">
              <div v-if="scope.row.currentPackagePayType === 0">否</div>
              <div v-if="scope.row.currentPackagePayType === 1">是</div>
            </div>
            <div v-if="p.prop == 'nextPackagePayTypeCL'">
              <div v-if="scope.row.nextPackagePayType === 0">否</div>
              <div v-if="scope.row.nextPackagePayType === 1">是</div>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button type="text" size="small" @click="goDetail(scope.row)">详情</el-button>
              <el-button type="text" size="small" @click="unbindCard(scope.row.cardNo)">解绑</el-button>
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div> -->
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
import editCardInfo from './../../cardInfo/editCardInfo'
import channelSelect from './../../sale/channelSelect'
export default {
  components: {
    editCardInfo,
    channelSelect
  },
  data () {
    return {

        cardStatus:'',
        orderStartDate:'',
        orderEndDate:'',
        orderId:'',
        iccid:'',
        msisdn:'',
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

    //   private Integer page;
	// private String orderIdlike;
	// private Integer status;
	// private String iccidlike;
	// private String phoneNumber;
	// private String saleChannel;
	// private String dateStart;
	// private String dateEnd;
	// private String gmtCreateStart;
	// private String gmtCreateEnd;
      this.queryCardOrders()
  },
  watch: {},
  methods: {
    queryCardOrders:function(){
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
        // params.saleChannel;
      if(this.orderStartDate != '')
        params.gmtCreateStart = this.orderStartDate
      if(this.orderEndDate != '')
	    params.gmtCreateEnd = this.orderEndDate
	//   params.gmtCreateStart;
	//   params.gmtCreateEnd;
      apiBigflow.getCardOrders(params).then(res => {
          if(res.resultCode == 0){
              this.cardOrders = res.data
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
    handleSizeChange (newSize) {
      
    },
    handleCurrentChange (newPage) {
      
    },
  }
};
</script>
<style scoped>
</style>
