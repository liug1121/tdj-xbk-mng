<template>
  <div class="box_subject">
    <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':listType == 0}" @click="listTypeSel(0)">账户池</div>
          <div v-permission="{indentity:'bigflowFlowPool-start'}"  class="tree-tab-unselected" :class="{' tree-selected':listType == 1}" @click="listTypeSel(1)">充值记录</div>
        </div>
        <el-card class="all_list" v-if="listType===1">
          <el-form :model="payedQueryForm" :inline="true">
            <el-form-item label="渠道" class="queryFormItem">
              <el-select class="queryFormInput"  
              filterable
              clearable
              reserve-keyword
              placeholder="请选择渠道" v-model="payedQueryForm.channelId">
                <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
              </el-select>
              </el-form-item>
              <el-form-item label="账户池名称"  class="queryFormItem">
      
                <el-input class="queryFormInput" style="width:150px;" v-model="payedQueryForm.poolName" placeholder="请输入流量池名称" ></el-input>
              </el-form-item>
              <el-form-item label="开始时间" class="queryFormItem">
                <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
                v-model="payedQueryForm.startDate">  
                </el-date-picker>
                <span class="time-line">-</span>
                <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
                v-model="payedQueryForm.endDate">
                </el-date-picker>
            </el-form-item>
              <el-button size="medium" type="primary" icon="el-icon-search" @click="toQueryPoolBills">查询</el-button>
              <el-button size="medium" type="primary"  @click="toExportPoolBills">导出</el-button>
              
          </el-form>
          <el-table   :data="poolBills" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column v-for="(p, key) in table_column_amount_bill" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
              <template slot-scope="scope">
                <div  v-html="scope.row[p.prop]" />
              </template>
            </el-table-column>
          </el-table>
          <el-pagination :current-page="poolBillPage" :page-sizes="[10,20,30]" :page-size="poolBillPageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="poolBillTotal" @size-change="handlePoolBillSizeChange" @current-change="handlePoolBillCurrentChange">
          </el-pagination>
        </el-card>
      <el-card class="all_list" v-if="listType===0">
      <el-form  :inline="true" :model="queryPoolForm" >
        <el-form-item label="账户名称" class="queryFormItem">
            <el-input class="queryFormInput" v-model="queryPoolForm.nameLike" clearable placeholder="请输入账户名称" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道"  v-model="queryPoolForm.channelId">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryPools">搜索</el-button>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" v-permission="{indentity:'bigflowFlowPool-start'}"  @click="showAddPoolDlg">添加</el-button>
        <!-- <el-button size="medium" type="primary" icon="el-icon-edit" @click="showAddAmountDlg">充值</el-button> -->
        <!-- <el-button size="medium" type="primary" icon="el-icon-edit" @click="openOrderPackageDlg">套餐订购</el-button> -->
        <el-button size="medium" type="primary" icon="el-icon-edit" v-permission="{indentity:'bigflowFlowPool-start'}"  @click="openEditExpireDlg">调整有效期</el-button>
      </div>
      <el-table   :data="pools" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in pool_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'opts'">
                
              <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  @click="showAddAmountDlg(scope.row.id)">充值</el-button>
              <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  @click="openOrderPackageDlg(scope.row.id)">套餐订购</el-button>
              <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  v-if="scope.row.status==='已启用'" @click="changeStatus(scope.row.id, 0)">停用</el-button>
              <el-button type="text" size="small"  v-permission="{indentity:'bigflowFlowPool-start'}"  v-else @click="changeStatus(scope.row.id, 1)">启用</el-button>
              <el-button type="text" size="small" v-permission="{indentity:'bigflowFlowPool-start'}"  @click="openAmountDetailsDlg(scope.row.id)">账单明细</el-button>
              <el-button type="text" size="small" v-permission="{indentity:'bigflowFlowPool-start'}"  @click="okRemovePool(scope.row.id)">删除</el-button>
              <el-button type="text" size="small" v-permission="{indentity:'bigflowFlowPool-start'}"  @click="openlertListDlg(scope.row.id)">告警设置</el-button>
              <el-button type="text" size="small" v-permission="{indentity:'bigflowFlowPool-start'}"  @click="showEditPoolDlg(scope.row)">编辑</el-button>
            </div>
            <div v-else v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 --> 
      <el-pagination :current-page="currentPage" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total" @size-change="handleRecordsSizeChange" @current-change="handleRecordsCurrentChange">
      </el-pagination>
      </el-card>

      <el-dialog title="账户池" :visible.sync="editPoolDlgShowed" width="450px" @close="closeEditPoolDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="poolForm"  label-width="110px">
        <el-form-item label="池名称">
          <el-input style="width:300px;"  v-model="poolForm.name" placeholder="请输入流量池名称" ></el-input>
        </el-form-item>
        <el-form-item label="信用额度(元)">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="poolForm.creditAmount" placeholder="请输入充值金额" ></el-input>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请选择渠道" v-model="poolForm.channelId">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditPoolDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okEditPoolDlg"  :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="账户充值" :visible.sync="addAmountDlgShowed" width="450px" @close="closeAddAmountDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="poolAddAmountForm"  label-width="110px">
        <el-form-item label="充值金额(元)">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="poolAddAmountForm.addedAmount" placeholder="请输入充值金额" ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:300px;"   v-model="poolAddAmountForm.comment" placeholder="请输入备注" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddAmountDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary"  :disabled="btnEnable" @click="okAddAmountDlg">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="套餐订购" :visible.sync="orderPackageDlgShowed" width="450px" @close="closeOrderPackageDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="orderPackageForm"  label-width="110px">
        <el-form-item label="套餐">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请选择套餐" v-model="orderPackageForm.packageId">
            <el-option v-for="item in poolPackages" :key="item.product_code" :label="item.product_name" :value="item.product_code"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrderPackageDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okOrderPackage"  :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="有效期" :visible.sync="editExpireDlgShowed" width="450px" @close="closeEditExpireDlg">
      <el-form :model="editExpireForm"  label-width="110px">
        <el-form-item label="有效期（月）">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="editExpireForm.month" placeholder="请输入充值金额" ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="editExpireForm.comment" placeholder="请输入备注" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditExpireDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="告警策略列表" :visible.sync="alertListDlgShowed" width="650px" @close="closelertListDlg">
      <el-button size="medium" type="primary" icon="el-icon-edit" @click="openEditAlertDlg">添加</el-button>
      <el-table   :data="alertInfos" border max-height="600" align="center"  :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_alertInfos" :prop="p.prop" :width="p.width" :label="p.label" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'operation'">
              <el-button  type="text" size="small" @click="removeAmountPoolAlertInfo(scope.row.id)">删除</el-button>
              <el-button  type="text" size="small" @click="modifyEditAlertDlg(scope.row)">修改</el-button>
            </div>
            <div v-else>
              <div v-if="p.prop == 'threshold'">
                <div v-if="scope.row.thresholdType == 0">
                    <div v-if="scope.row.threshold > 0">可用量少于{{scope.row.threshold}}%</div>
                    <div v-else>账户池停用</div>
                </div>
                <div v-if="scope.row.thresholdType == 1">
                    <div v-if="scope.row.threshold > 0">可用量少于{{scope.row.threshold}}元</div>
                    <div v-else>账户池停用</div>
                </div>
              </div>
              <div v-else v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog> 

    <el-dialog title="告警设置" :visible.sync="editAlertShowed" width="450px" @close="closeEditAlertDlg">
      
      <el-form :model="alertForm"  label-width="110px">
        <el-form-item label="邮箱地址">
          <el-input style="width:300px;"  v-model="alertForm.address" placeholder="请输入邮箱" @blur="sendEmail"></el-input>
          <el-button type="primary" @click="sendTestMail(alertForm.address)" >发送测试邮件</el-button>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input style="width:300px;"  v-model="alertForm.phone" placeholder="请输入手机号码" @blur="sendPhone"></el-input>
          <el-button type="primary" @click="sendTestSms(alertForm.phone)">发送测试短信</el-button>
        </el-form-item>
        <el-form-item label="阀值类型">
          <el-radio-group  v-model="alertForm.thresholdType" @change="optTypeMoveChangeItem">
            <el-radio :label='0'>百分比</el-radio>
            <el-radio :label='1'>余量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="百分比" v-if="alertForm.thresholdType == 0">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入阀值" v-model="alertForm.alertThreshold">
            <el-option v-for="item in alertThresholds" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="剩余量"  v-if="alertForm.thresholdType == 1">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入阀值" v-model="alertForm.alertThreshold">
            <el-option v-for="item in alertLastThresholds" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送次数">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入发送次数" v-model="alertForm.alertTime">
            <el-option v-for="item in alertTimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditAlertDlg">取 消</el-button>
        <el-button type="primary" @click="okModifyAlertMail">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="账单明细" :visible.sync="amountDetailsDlgShowed" width="800px" @close="closeAmountDetailsDlg">
      <el-table   :data="amountDetails" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_amounts" :prop="p.prop" :label="p.label" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div  v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
    </el-dialog> 
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
      poolBills:[],
      payedQueryForm:{
      channelId:null,
      startDate:null,
      endDate:null,
      poolName:null

    },
      listType:0,
        poolPackages:[],
        queryPoolForm:{},
        amountDetails:[
        ],
        alertForm:{
            address:'',
            id:'',
            alertThreshold:'',
            alertTime:'',
            phone:''
        },
        editAlertShowed:false,
        alertInfos:[
        ],
        amountDetailsDlgShowed:false,

        alertListDlgShowed:false,
        editExpireDlgShowed:false,
        editExpireForm:{},
        orderPackageDlgShowed:false,
        orderPackageForm:{},
        addAmountDlgShowed:false,
        poolAddAmountForm:{},
        poolForm:{
           poolId:'',
           name:'',
           creditAmount:'',
           channelId:''
        },
        editPoolDlgShowed:false,
        btnEnable:false,
        pageSize:10,
        poolBillPageSize:10,
        currentPage:0,
        poolBillPage:1,
        poolBillTotal:0,
        total:0,
        loading:false,
        channels:[
        ],
        pools:[
        ],
        pool_column: [
        { prop: 'poolName', label: '名称', width: 100, sortable: true },
        { prop: 'status', label: '状态', width: 100, sortable: true },
        { prop: 'num', label: '总卡片数', width: 50, sortable: true },
        { prop: 'saleChannelName', label: '渠道', width: 150, sortable: true },
        { prop: 'productCodeName', label: '当前套餐', width: 100, sortable: true },
        { prop: 'amount', label: '账户金额(元)', width: 80, sortable: true },
        { prop: 'creditAmount', label: '信用额度(元)', width: 80, sortable: true },
        { prop: 'usedAmount', label: '流量已用金额(元)', width: 80, sortable: true },
        { prop: 'poolFlowUsed', label: '当月已用量(G)', width: 80, sortable: true },
        { prop: 'billFee', label: '连续出账卡费(元)', width: 80, sortable: true },
        { prop: 'lastAmount', label: '余额(元)', width: 80, sortable: true },
        // { prop: 'lastPer', label: '余额比例(%)', width: 80, sortable: true },
        { prop: 'expireDate', label: '有效期', width: 100 },
        { prop: 'amountChanges', label: '充值记录', width: 300 },
        { prop: 'opts', label: '操作', width: 100 }
      ],
      table_column_alertInfos:[
        { prop: 'mailAddress', label: '邮箱地址', width: 100, sortable: true },
        { prop: 'phone', label: '手机号码', width: 100, sortable: true },
        { prop: 'threshold', label: '阀值', width: 150, sortable: true },
        { prop: 'times', label: '告警次数', width: 100, sortable: true },
        { prop: 'operation', label: '操作', width: 100, sortable: true }
      ],
    //   账期、可用额度、信用额度、账单金额，生成日期
      table_column_amounts:[
          { prop: 'cycleId', label: '账期', width: 100, sortable: true },
        //   { prop: 'amount', label: '可用额度', width: 100, sortable: true },
        //   { prop: 'creditAmount', label: '信用额度', width: 100, sortable: true },
          { prop: 'usedAmount', label: '账单金额(元)', width: 100, sortable: true },
          { prop: 'date', label: '生成日期', width: 100, sortable: true },
          { prop: 'billStatus', label: '出账状态', width: 100, sortable: true }
      ],
      table_column_amount_bill:[
        { prop: 'amount_name', label: '池名称', width: 100, sortable: true },
        { prop: 'channel_name', label: '渠道名称', width: 100, sortable: true },
        { prop: 'amount', label: '充值金额（元）', width: 100, sortable: true },
        { prop: 'bill_date', label: '充值日期', width: 100, sortable: true },
        { prop: 'operator', label: '操作人', width: 100, sortable: true },
      ],
      alertThresholds:[
        {label:'余额少于5%', value:'5'},
        {label:'余额少于10%', value:'10'},
        {label:'余额少于20%', value:'20'},
        {label:'余额少于30%', value:'30'},
        {label:'余额少于40%', value:'40'},
        {label:'余额少于50%', value:'50'}
      ],
      alertLastThresholds:[
        {label:'余额少于1000元', value:'1000'},
        {label:'余额少于2000元', value:'2000'},
        {label:'余额少于5000元', value:'5000'},
        {label:'余额少于6000元', value:'6000'},
        {label:'余额少于8000元', value:'8000'},
        {label:'余额少于10000元', value:'10000'},
        {label:'余额少于20000元', value:'20000'},
        {label:'余额少于30000元', value:'30000'},
        {label:'余额少于50000元', value:'50000'}
      ],
      alertTimes:[
        {label:'1次', value:'1'},
        {label:'5次', value:'5'},
        {label:'10次', value:'10'}
      ]
    };
  },
  mounted () {

  },
  created(){
     this.getAllChannels()
     this.getAllPools()
     this.getAmountPoolProducts()
     this.getPoolBills()
  },
  watch: {},
  methods: {
    toExportPoolBills:function(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let params = this.payedQueryForm
          apiBigflow.exportAmountPoolBills(params).then(res=>{
                if(res.resultCode == 0){
                    this.$message.success('导出任务提交成功，请在任务：' + res.data + '中查看')
                }else{
                    this.$message.success('导出失败失败')
                }

            })
        }).catch(() => {
        });
    },
    toQueryPoolBills:function(){
      this.poolBillPage = 1
      this.getPoolBills()
    },
    getPoolBills:function(){
      let params = this.payedQueryForm
      params.page = this.poolBillPage
      params.pageSize = this.poolBillPageSize
      apiBigflow.getAmountPoolBills(params).then(res=>{
            if(res.resultCode == 0){
                this.poolBills = res.data
                this.poolBillTotal = res.rowNum
            }
        })
    },
    startTimeChange () {
      this.payedQueryForm.startDate = `${this.payedQueryForm.startDate}`
    },
    endTimeChange () {
      this.payedQueryForm.endDate = `${this.payedQueryForm.endDate}`
    },
    listTypeSel:function(selType){
      this.listType = selType
    },
      sendPhone:function(){
      var regPhone =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]||17[0|1|2|3|5|6|7|8|9]||19[0|1|2|3|5|6|7|8|9])\d{8}$/
        if (this.alertForm.phone != '' && !regPhone.test(this.alertForm.phone)) {
            this.$message({
                message: '手机格式不正确',
                type: 'error'
            })
            this.alertForm.phone = ''
        }
    },
      sendEmail: function() {
        // var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        var regEmail =/^(\w+([-.][A-Za-z0-9]+)*){3,18}@\w+([-.][A-Za-z0-9]+)*\.\w+([-.][A-Za-z0-9]+)*$/
        if (this.alertForm.address != '' && !regEmail.test(this.alertForm.address)) {
            this.$message({
                message: '邮箱格式不正确',
                type: 'error'
            })
            this.alertForm.address = ''
        }
    },
      removeAmountPoolAlertInfo:function(id){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let params = {}
          params.id = id
          apiBigflow.removeAmountPoolAlertInfo(params).then(res=>{
                if(res.resultCode == 0){
                    this.$message.success('删除成功')
                    this.getPoolAlertInfos()
                }else{
                    this.$message.success('删除失败')
                }

            })
        }).catch(() => {
        });
    },
      getPoolAlertInfos:function(){
      let params = {}
      console.log('getPoolAlertInfos:' + JSON.stringify(this.alertForm))
      params.amountPoolId = this.alertForm.amountPoolId
      apiBigflow.getAmountPoolAlertInfos(params).then(res=>{
            if(res.resultCode == 0){
                this.alertInfos = res.data
            }
        })
    },
      okModifyAlertMail:function(){
            if(this.alertForm.amountPoolId == null || this.alertForm.amountPoolId == undefined || this.alertForm.amountPoolId == ''){
                this.$message.error('请先选择账户池')
                return
            }
            
            if(this.alertForm.address == '' && this.alertForm.phone == ''){
                this.$message.error('邮箱和手机号码不能全为空')
                return
            }
            if(this.alertForm.alertThreshold == null || this.alertForm.alertThreshold == undefined || this.alertForm.alertThreshold == ''){
                this.$message.error('告警阀值不能为空')
                return
            }
            if(this.alertForm.alertTime == null || this.alertForm.alertTime == undefined || this.alertForm.alertTime == ''){
                this.$message.error('告警次数不能为空')
                return
            }
            this.$confirm('您确认要此操作, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                if(this.alertForm.id == '' || this.alertForm.id == undefined){
                    let params = {}
                    params.amountPoolId = this.alertForm.amountPoolId
                    params.mailAddress = this.alertForm.address
                    params.phone = this.alertForm.phone
                    params.alertThreshold = this.alertForm.alertThreshold
                    params.alertTimes = this.alertForm.alertTime
                    params.thresholdType = this.alertForm.thresholdType
                    apiBigflow.addAmountPoolAlertConfig(params).then(res=>{
                        if(res.resultCode == 0){
                            // that.queryFlowPools()
                            this.$message.success('添加成功')
                            this.getPoolAlertInfos()
                            this.alertForm.address = ''
                            this.alertForm.id = ''
                            this.alertForm.alertThreshold = ''
                            this.alertForm.alertTime = ''
                            this.alertForm.phone = ''
                            this.editAlertShowed = false
                            
                        }else{
                            this.$message.success('添加失败')
                        }
                    })
                }else{
                    let params = {}
                    params.id = this.alertForm.id
                    params.amountPoolId = this.alertForm.amountPoolId
                    // params.mailId = this.alertMailForm.address
                    params.mailAddress = this.alertForm.address
                    params.phone = this.alertForm.phone
                    params.alertThreshold = this.alertForm.alertThreshold
                    params.alertTimes = this.alertForm.alertTime
                    params.thresholdType = this.alertForm.thresholdType
                    apiBigflow.modifyPoolAlertInfo(params).then(res=>{
                        if(res.resultCode == 0){
                            this.$message.success('修改成功')
                            this.getPoolAlertInfos()
                            this.alertForm.address = ''
                            this.alertForm.id = ''
                            this.alertForm.alertThreshold = ''
                            this.alertForm.alertTime = ''
                            this.alertForm.phone = ''
                            this.editAlertShowed = false
                        }else{
                            this.$message.success('修改失败')
                        }
                    })
                }
                
                }).catch(() => {
                });
            },
      sendTestSms:function(phone){
        let params = {}
        params.phone = phone
        apiBigflow.testSms(params).then(res=>{
                if(res.resultCode == 0){
                    this.$message.success('发送成功')
                }else{
                    this.$message.error('发送失败')
                }

            })
        },
      sendTestMail:function(mailAddress){
        let params = {}
        params.mailAddress = mailAddress
        apiBigflow.testMail(params).then(res=>{
                if(res.resultCode == 0){
                    this.$message.success('发送成功')
                }else{
                    this.$message.error('发送失败')
                }

            })
        },
      optTypeMoveChangeItem(e){
        this.alertForm.thresholdType = e
        },
      changeStatus:function(poolId, status){
          this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            this.loading = true
            let params = {}
            params.poolId = poolId
            params.status = status
          apiBigflow.modifyAmountPoolStatus(params).then(res=>{
            if(res.resultCode == 0){
                this.getAllPools()
            }
            this.loading = false
        })
        }).catch(() => {
        });

// modifyAmountPoolStatus
      },
      okOrderPackage:function(poolId){
         if(this.orderPackageForm.poolId == undefined || this.orderPackageForm.poolId==null){
              this.$message.error('池信息不能为空')
              return
          }
          if(this.orderPackageForm.packageId == undefined || this.orderPackageForm.packageId==null){
              this.$message.error('套餐信息不能为空')
              return
          }
          this.$confirm('您确认要此操作, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.loading = true
                let params={}
                this.loading = true
                params.poolId = this.orderPackageForm.poolId
                params.packageId  = this.orderPackageForm.packageId
                    apiBigflow.modifyAmountPoolPackage(params).then(res=>{
                        if(res.resultCode == 0){
                            this.getAllPools()
                            this.loading = false
                        }else{
                            this.loading = false
                        }
                        this.orderPackageDlgShowed = false
                    })
                }).catch(() => {
                });
      },

      getAmountPoolProducts:function(){
          let params={}
          apiBigflow.getAmountPoolProducts(params).then(res=>{
            if(res.resultCode == 0){
                this.poolPackages = res.data
                // this.loading = false
            }else{
                // this.loading = false
            }
        })
      },
    closeEditPoolDlg: function(){
        this.editPoolDlgShowed = false
    },
    showAddPoolDlg: function(){
        this.poolForm = {}
        this.editPoolDlgShowed = true
    },
    showEditPoolDlg: function(pool){
        this.poolForm.poolId = pool.id
        this.poolForm.name = pool.poolName
        this.poolForm.creditAmount = pool.creditAmount
        this.poolForm.channelId = pool.saleChannelId
        this.editPoolDlgShowed = true
    },
    closeAddAmountDlg:function(){
        this.addAmountDlgShowed = false
    },
    showAddAmountDlg:function(poolId){
        this.poolAddAmountForm = {}
        this.addAmountDlgShowed = true
        this.poolAddAmountForm.poolId = poolId
    },

    addAmount:function(){
        this.loading = true
        let params = {}
        params.poolId = this.poolAddAmountForm.poolId
        params.addedAmount = this.poolAddAmountForm.addedAmount
        params.comment = this.poolAddAmountForm.comment
        apiBigflow.addAmount(params).then(res=>{
            if(res.resultCode == 0){
                this.getAllPools()
            }
            this.loading = false
        })
    },
    okAddAmountDlg:function(){
        if(this.poolAddAmountForm.poolId == undefined || this.poolAddAmountForm.poolId == null){
            this.$message.error('池信息不能为空')
            return
        }
        if(this.poolAddAmountForm.addedAmount == undefined || this.poolAddAmountForm.addedAmount == null){
            this.$message.error('充值金额不能为空')
            return
        }
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.addAmount()
          this.addAmountDlgShowed = false
        }).catch(() => {
        });
    },
    closeOrderPackageDlg:function(){
        this.orderPackageDlgShowed = false
    },
    openOrderPackageDlg:function(poolId){
        this.orderPackageForm.poolId = poolId
        this.orderPackageDlgShowed = true
    },
    closeEditExpireDlg:function(){
        this.editExpireDlgShowed=false
    },
    openEditExpireDlg:function(){
        this.editExpireDlgShowed = true
    },
    closelertListDlg:function(){
        this.alertListDlgShowed = false
    },
    openlertListDlg:function(amountPoolId){
        this.alertListDlgShowed = true
        this.alertForm.amountPoolId = amountPoolId
        this.getPoolAlertInfos()
    },
    closeEditAlertDlg:function(){
        this.editAlertShowed = false
    },
    openEditAlertDlg:function(){
        let selecedAmountPoolId = this.alertForm.amountPoolId;
        this.alertForm = {
            thresholdType:0,
            address:'',
            phone:'',
            amountPoolId:selecedAmountPoolId

        }
        this.editAlertShowed = true
    },
    modifyEditAlertDlg:function(row){
      this.alertForm.id = row.id
      this.alertForm.address = row.mailAddress
      this.alertForm.phone = row.phone
      this.alertForm.alertThreshold = row.threshold
      this.alertForm.alertTime = row.times
      this.alertForm.thresholdType = row.thresholdType
        this.editAlertShowed = true
    },
    closeAmountDetailsDlg:function(){
        this.amountDetailsDlgShowed = false
    },
    openAmountDetailsDlg:function(poolId){
        let params = {}
        params.poolId = poolId
        apiBigflow.getAmountPoolBillDetails(params).then(res=>{
            if(res.resultCode == 0){
                this.amountDetails = res.data
            }
        })
        this.amountDetailsDlgShowed = true
    },
    getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
            }
        })
    },
    addPool:function(){
        this.loading = true
        let params = {}
        params.name = this.poolForm.name
        params.channelId = this.poolForm.channelId
        params.creditAmount = this.poolForm.creditAmount
        apiBigflow.addAmountPool(params).then(res=>{
            if(res.resultCode == 0){
                // this.channels = res.data
                this.getAllPools()
            }
            this.loading = false
        })
    },

    okRemovePool:function(poolId){
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          this.removeAmountPool(poolId)
        }).catch(() => {
        });
    },
    modifyAmountPool:function(){
        this.loading = true
        let params = {}
        params.poolId = this.poolForm.poolId
        params.name= this.poolForm.name
        params.creditAmount = this.poolForm.creditAmount
        params.channelId = this.poolForm.channelId
        apiBigflow.modifyAmountPool(params).then(res=>{
            if(res.resultCode == 0){
                this.getAllPools()
                this.loading = false
            }else{
                this.loading = false
            }
        })
    },

    removeAmountPool:function(poolId){
        this.loading = true
        let params = {}
        params.poolId = poolId
        apiBigflow.removeAmountPool(params).then(res=>{
            if(res.resultCode == 0){
                this.getAllPools()
                this.loading = false
            }else{
                this.$message.error(res.resultInfo)
                this.loading = false
            }
        })
    },
    getAllPools:function(){
        this.loading = true
        let params = {}
        params.nameLike = this.queryPoolForm.nameLike
        params.channelId = this.queryPoolForm.channelId
        params.page = this.currentPage 
        params.pageSize = this.pageSize
        apiBigflow.getAmountPools(params).then(res=>{
            if(res.resultCode == 0){
                this.pools = res.data
                this.total = res.rowNum
                this.loading = false
            }else{
                this.loading = false
            }
        })
    },
    queryPools:function(){
        this.currentPage = 0
        this.getAllPools()
    },
    okEditPoolDlg:function(){
        // this.poolForm.channelId
        if(this.poolForm.name == null || this.poolForm.name == undefined || this.poolForm.name == ''){
            this.$message.error('池名称不能为空')
            return
        }
        if(this.poolForm.creditAmount == null || this.poolForm.creditAmount == undefined){
            this.$message.error('池信用额度不能为空')
            return
        }
        if(this.poolForm.channelId == null || this.poolForm.channelId == undefined || this.poolForm.channelId == ''){
            this.$message.error('池渠道不能为空')
            return
        }
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          if(this.poolForm.poolId != undefined && this.poolForm.poolId != null){
              this.modifyAmountPool()
          }else{
              this.addPool()
          }
          this.closeEditPoolDlg()
        }).catch(() => {
        });
    },
     handleRecordsSizeChange (newPage) {
      this.pageSize = newPage;
      this.getAllPools()
    },
    handleRecordsCurrentChange (newPage) {
        console.log('newPage:' + newPage)
      this.currentPage = newPage -1;
      this.getAllPools()
    },
    handlePoolBillSizeChange (newPage) {
      this.poolBillPageSize = newPage;
      this.getPoolBills()
    },
    handlePoolBillCurrentChange (newPage) {
        console.log('newPage:' + newPage)
      this.poolBillPage = newPage;
      this.getPoolBills()
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
.tree-tab-unselected {
  display:inline-block;
  background:silver;
  color:white;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  border-radius:5px;
  width: 150px;
  font-size: 5px;
  text-align: center;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
</style>
