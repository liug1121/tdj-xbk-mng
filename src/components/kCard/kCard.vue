<template>
  <div class="box_subject">
        <el-card class="all_list">
          <el-form :model="queryForm" :inline="true">
            <el-form-item label="渠道" class="queryFormItem">
              <el-select class="queryFormInput"  
              filterable
              clearable
              reserve-keyword
              placeholder="请选择渠道" v-model="queryForm.channelId">
                <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="订单号"  class="queryFormItem">
                <el-input class="queryFormInput" style="width:150px;" v-model="queryForm.orderId" placeholder="请输入订单号" ></el-input>
              </el-form-item>
              <el-button size="medium" type="primary" icon="el-icon-search" @click="getZopOrders">查询</el-button>
              <el-button size="medium" type="primary" >导出</el-button>
          </el-form>
          <el-table   :data="zopOrders" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="(p, key) in table_column_zop_order" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
              <template slot-scope="scope">
                <div v-if="p.prop == 'opts'">
                    <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  @click="copyOrderUrl(scope.row)">查看并复制订单链接</el-button>
                    <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  >查看实名链接</el-button>
                </div>
                <div v-else v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
        </el-card> 
  </div>
</template>

<script>
import apiBigflow from './../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
        page:0,
        pageSize:10,
        zopOrders:[],
        channels:[],
        queryForm:{
            channelId:'',
            orderId:''
        },
        table_column_zop_order:[
            { prop: 'third_order_id', label: '订单号', width: 100, sortable: true },
            { prop: 'contact_num', label: '联系人手机号', width: 100, sortable: true },
            // { prop: 'order_url', label: '订单链接', width: 100, sortable: true },
            { prop: 'phone_num', label: '卡号', width: 100, sortable: true },
            { prop: 'status_clicked', label: '是否点击', width: 100, sortable: true },
            { prop: 'status_clicked_time', label: '点击时间', width: 100, sortable: true },
            { prop: 'status_pre_order', label: '是否预订单', width: 100, sortable: true },
            { prop: 'status_pre_order_time', label: '预订单时间', width: 100, sortable: true },
            { prop: 'status_order', label: '是否提交订单', width: 100, sortable: true },
            { prop: 'status_order', label: '订单时间', width: 100, sortable: true },
            { prop: 'order_notify_order_state', label: '订单状态', width: 100, sortable: true },
            { prop: 'order_data_short_url', label: '实名链接', width: 100, sortable: true },
            { prop: 'order_notify_order_state', label: '订单状态', width: 100, sortable: true },
            { prop: 'order_notify_time', label: '订单状态变更时间', width: 100, sortable: true },
            { prop: 'opts', label: '操作', width: 100, sortable: true ,fixed: 'right'}
        ],
    };
  },
  mounted () {

  },
  created(){
     this.getAllChannels()
     this.getZopOrders()
  },
  watch: {},
  methods: {
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
            }
        })
    },
    getZopOrders:function(){
        let params = {}
        params.channelId = this.queryForm.channelId
        params.orderId = this.queryForm.orderId
        params.page = 0
        params.pageSize = 100
        // console.log(JSON.stringify(params))
        apiBigflow.getZopOrders(params).then(res=>{
            if(res.resultCode == 0){
                this.zopOrders = res.data
            }
        })
    },
    copyOrderUrl:function(orderInfo){
      // this.dataProcessing(val)
      let that = this
      this.$copyText(orderInfo.order_url).then(function (e) {
        that.$message.success('订单链接已复制到剪贴板：' + orderInfo.order_url )
      }, function (e) {
        that.$message.error('复制内容到剪贴板失败' )
      })
    }
  }
};
</script>
<style scoped>
</style>
