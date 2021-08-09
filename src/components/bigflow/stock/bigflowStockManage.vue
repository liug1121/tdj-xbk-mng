<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="卡号码" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入卡号码" style="width:150px" v-model="phoneNumber"></el-input>
        </el-form-item>  
        <el-form-item label="ICCID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入iccid" style="width:150px" v-model="iccid"></el-input>
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
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="cardStatus">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="导单时间" class="queryFormItem">
          <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
          v-model="startDateTime">   
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
          v-model="endDateTime">
          </el-date-picker>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="queryBigflowStocks">查询</el-button>
        </el-form-item>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" 
        v-permission="{indentity:'bigflowStockMng-export'}">导出</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-import'}">导入</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-moveNet'}">迁移网路</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-distributeForChannel'}">分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-distributeForHeadAndTail'}">首尾分配渠道</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowStockMng-exportFor'}">按首尾条件导出</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="bigflowStocks" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
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
    statusOptions:[
        {label:'录入', value:1},
        {label:'可销售', value:2},
        {label:'已开卡', value:3},
        {label:'已激活', value:6},
        {label:'已注销', value:7},
        {label:'已销毁', value:9}
    ],
    startDateTime:'',
    endDateTime:'',
    phoneNumber:'',
    iccid:'',
    saleChannel:'',
    cardStatus  :'',
    channels:[],
    bigflowStocks:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'phoneNumber', label: '卡号码', width: 200, fixed: 'left', sortable: true },
        { prop: 'iccid', label: 'ICCID', width: 190, fixed: 'left', sortable: true },
        { prop: 'status', label: '档位', width: 200, sortable: true },
        { prop: 'statusName', label: '卡状态', width: 150, sortable: true },
        { prop: 'serviceName', label: '蜂窝平台账户', width: 300, sortable: true },
        { prop: 'channelName', label: '渠道名称', width: 200, sortable: true },
        { prop: 'salePerson', label: '销售员', width: 180, sortable: true },
        { prop: 'typeName', label: '类型', width: 180, sortable: true },
        { prop: 'provinceName', label: '归属地', width: 180, sortable: true },
        { prop: 'gmtCreate', label: '入库时间', width: 180, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.getAllChannels()
      this.queryBigflowStocks()
  },
  watch: {},
  methods: {
    startTimeChange () {
      this.startDateTime = `${this.startDateTime}`
    },
    endTimeChange () {
      this.endDateTime = `${this.endDateTime}`
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
    queryBigflowStocks:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        if(this.startDateTime != '')
            params.gmtCreateStart = this.startDateTime
        if(this.endDateTime != '')
            params.gmtCreateEnd = this.endDateTime
        if(this.phoneNumber != '')
            params.phoneNumber = this.phoneNumber
        if(this.iccid != '')
            params.iccid = this.iccid
        if(this.saleChannel != '')
            params.channelId = this.saleChannel
        if(this.cardStatus != '')
            params.status = this.cardStatus
        apiBigflow.getBigflowStocks(params).then(res=>{
            if(res.resultCode == 0){
                this.bigflowStocks = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryBigflowStocks()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryBigflowStocks()
    },
  }
};
</script>
<style scoped>
</style>
