<template>
  <div class="box_subject">
    <div class="button_content">
          <div class="tree-tab-unselected" :class="{' tree-selected':listType == 0}" @click="listTypeSel(0)">流量池</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':listType == 1}" @click="listTypeSel(1)">池用量明细</div>
          <div class="tree-tab-unselected" :class="{' tree-selected':listType == 2}" @click="listTypeSel(2)">流量池充值记录</div>
        </div>
    <el-card class="all_list" v-if="listType == 2">
      <el-form :model="payedQueryForm" :inline="true">
         <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="payedQueryForm.channel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
           </el-select>
          </el-form-item>
          <el-form-item label="流量池名称"  class="queryFormItem">
  
            <el-input class="queryFormInput" style="width:150px;" v-model="payedQueryForm.poolName" placeholder="请输入流量池名称" ></el-input>
          </el-form-item>
          <el-form-item label="开始时间" class="queryFormItem">
            <el-date-picker style="width:140px"  type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange" 
            v-model="payedQueryForm.gmtCreateStart">  
            </el-date-picker>
            <span class="time-line">-</span>
            <el-date-picker style="width:140px"  type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange" 
            v-model="payedQueryForm.gmtCreateEnd">
            </el-date-picker>
        </el-form-item>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="toQueryPoolBills">查询</el-button>
      </el-form>
      <el-table   :data="poolBills" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_flowpool_bills" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination  @size-change="handlePoolBillsSizeChange" @current-change="handlePoolBillsCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-card class="all_list" v-if="listType == 1">
      <el-form  :inline="true">
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道" v-model="saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          </el-form-item>
          <el-form-item label="类型" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择类型" v-model="detailType">
            <el-option v-for="item in detailTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
          </el-form-item>
          <el-button size="medium" type="primary" icon="el-icon-search" @click="okQueryFlowPoolsDetail">搜索</el-button>
      </el-form>
      <!-- 列表区域 -->
      <el-table   :data="poolDetails" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_detail" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination v-if="detailType == 1" @size-change="handleDetailSizeChange" @current-change="handleDetailCurrentChange" :current-page="detailPage" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <el-card class="all_list" v-if="listType == 0">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="卡状态" class="queryFormItem">
            <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="status">
            <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
          <el-button size="medium" type="primary" icon="el-icon-search" @click="queryFlowPools">搜索</el-button>
        </el-form-item>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-add'}" @click="openAddFlowPoolDlg">增加</el-button>

        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-orderProduct'}" @click="openOrderDlg">订购套餐</el-button>
        
        <!-- <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-useChange'}" @click="openUpdateuseDlg">调整用量</el-button> -->
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-useChange'}" @click="openUpdateExpireDlg">调整有效期</el-button>
      </div>
      <!-- 列表区域 -->
      <!-- <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div> -->
      <el-table   :data="flowPools" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            
            <div v-if="p.prop == 'operation'">
              <el-button v-permission="{indentity:'bigflowFlowPool-sotp'}" type="text" size="small" @click="toAddFlowAmount(scope.row.poolId)">充流量</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-sotp'}" type="text" size="small" @click="openAmountDetails(scope.row.poolId)">账单明细</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-sotp'}" type="text" size="small" @click="stopPool(scope.row.poolId)" v-if="scope.row.status=='open'">停用</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-start'}" type="text" size="small" @click="openPool(scope.row.poolId)" v-else>启用</el-button>
              <!-- <el-button v-permission="{indentity:'bigflowFlowPool-detail'}" type="text" size="small" >用量明细</el-button> -->
              <el-button v-permission="{indentity:'bigflowFlowPool-delete'}" type="text" size="small" @click="removePool(scope.row.poolId)">删除</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-delete'}" type="text" size="small" @click="showAlertMailList(scope.row.poolId)">告警设置</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-delete'}" type="text" size="small" @click="toEditPool(scope.row)">编辑</el-button>
            </div>
            <div v-else>
              <div v-if="p.prop == 'lastPer'">
                <div v-if="scope.row.lastPer <=10" class="usagePer">
                  {{scope.row.lastPer}}%
                </div>
                <div v-else>
                  {{scope.row.lastPer}}%
                </div>
                
              </div>
              <div v-else v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="账单明细" :visible.sync="amountDetailsDlgShowed" width="800px" @close="amountDetailsDlgShowed = false">
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
      <!-- 分页区域 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </el-card>

    <el-dialog title="添加流量池" :visible.sync="showAddFlowPoolDlg" width="450px" @close="closeAddFlowPoolDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="addFlowPoolForm"  label-width="110px">
          <el-form-item label="流量池编号">
          <el-input style="width:300px;" v-model="addFlowPoolForm.poolId" placeholder="请输入流量池编号" ></el-input>
        </el-form-item>
        <el-form-item label="流量池名称">
          <el-input style="width:300px;"  v-model="addFlowPoolForm.poolName" placeholder="请输入流量池名称" ></el-input>
        </el-form-item>
        <el-form-item label="渠道">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入调整原因" v-model="addFlowPoolForm.saleChannel">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="卡的默认限量">
            <el-select 
            filterable
          clearable
          reserve-keyword
            class="queryFormInput"  placeholder="请输入卡的默认限量" v-model="addFlowPoolForm.cardDefaultPdCode">
            <el-option v-for="item in getPdCodes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddFlowPoolDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okAddFlowPool" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="编辑流量池" :visible.sync="showEditFlowPoolDlg" width="450px" @close="showEditFlowPoolDlg = false">
      <!-- 内容主体区域 --> 
      <el-form :model="editFlowPoolForm"  label-width="110px">
        <el-form-item label="流量池名称">
          <el-input style="width:300px;"  v-model="editFlowPoolForm.poolName" placeholder="请输入流量池名称" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEditFlowPoolDlg = false" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okEditFlowPool" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="流量池订购套餐" :visible.sync="showOrderDlg" width="450px" @close="closeOrderDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="addOrderForm"  label-width="110px">
        <el-form-item label="订购套餐">
          <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入订购套餐" v-model="addOrderForm.productCode">
            <el-option v-for="item in getPdCodes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="变更原因">
          <el-input style="width:300px;" v-model="addOrderForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）订购套餐为立即生效，会复盖之前的可用量及有效时间；</p>

            <p>2）加油包用量是当月有效，27号清0；</p>

            <p>3）变更原因请认真填写；</p>

            <p>4）订购成功后，并不会启用流量池，如需要请手动启用。</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrderDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okOrderPool" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="充流量" :visible.sync="showUpdateuseDlg" width="450px" @close="closeUpdateuseDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="updateuseForm"  label-width="110px">
        <el-form-item label="高速可用量">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="updateuseForm.flowHighDose" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
        <el-form-item label="充值金额(元)">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="updateuseForm.addedAmount" placeholder="请输入充值金额" ></el-input>
        </el-form-item>
        <el-form-item label="变更原因">
          <el-input style="width:300px;" v-model="updateuseForm.reason" placeholder="请输入变更原因" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）变更以G为单位，例如：输入1，代表1G</p>

            <p>2）变更逻辑：在原来基础上加上变更的用量。</p>

            <p>例如：原来有10G，变更1G，最后会变成11G</p>

            <p>输入负数就是减： 输入-1，就会变成9G。</p>

            <p>3）必填参数如果不需要变更，输入0即可</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateuseDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okUpdateuse" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 
    <el-dialog title="调整用量" :visible.sync="showUpdateExpireDlg" width="450px" @close="closeUpdateExpireDlg">
      <!-- 内容主体区域 -->  
      <el-form :model="updateExpireForm"  label-width="110px">
        <el-form-item label="月数">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')" v-model="updateExpireForm.expire" placeholder="请输入要调整的月数" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>单位为月，可为负</p>
      </span>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUpdateExpireDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okUpdateExpire" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="告警邮箱列表" :visible.sync="alertMailListDlgVisible" width="650px" @close="hideAlertMailListDlg">
      <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowFlowPool-add'}" @click="showAlertEditDlg">添加</el-button>
      <el-table   :data="alertInfos" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_alertInfos" :prop="p.prop" :width="p.width"  :label="p.label" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            
            <div v-if="p.prop == 'operation'">
              <el-button v-permission="{indentity:'bigflowFlowPool-sotp'}" type="text" size="small" @click="removePoolAlertInfo(scope.row.id)">删除</el-button>
              <el-button v-permission="{indentity:'bigflowFlowPool-start'}" type="text" size="small" @click="toModifyPoolAlertInfo(scope.row)">修改</el-button>
            </div>
            <div v-else>
              <div v-if="p.prop == 'threshold'">
                <div v-if="scope.row.thresholdType == 0">
                  <div v-if="scope.row.threshold > 0">可用量少于{{scope.row.threshold}}%</div>
                  <div v-else>流量池停用</div>
                </div>
                <div v-if="scope.row.thresholdType == 1">
                  <div v-if="scope.row.threshold > 0">可用量少于{{scope.row.threshold}}G</div>
                  <div v-else>流量池停用</div>
                </div>
                
              </div>
              <div v-else v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      
      
    </el-dialog> 




   <el-dialog title="告警邮箱" :visible.sync="alertMailEditDlgVisible" width="450px" @close="hideAlertMailEditDlg">
      
      <el-form :model="alertMailForm"  label-width="110px">
        <el-form-item label="邮箱地址">
          <el-input style="width:300px;"  v-model="alertMailForm.address" placeholder="请输入邮箱" @blur="sendEmail"></el-input>
          <el-button type="primary" @click="sendTestMail(alertMailForm.address)" >发送测试邮件</el-button>
          <!-- <el-select 
          filterable
          clearable
          reserve-keyword
          class="queryFormInput"  placeholder="请输入邮箱地址" v-model="alertMailForm.address">
            <el-option v-for="item in channelMailConfigs" :key="item.id" :label="item.user_name" :value="item.id"></el-option>
          </el-select>  -->
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input style="width:300px;"  v-model="alertMailForm.phone" placeholder="请输入手机号码" @blur="sendPhone"></el-input>
          <el-button type="primary" @click="sendTestSms(alertMailForm.phone)">发送测试短信</el-button>
        </el-form-item>
        <el-form-item label="阀值类型">
          <el-radio-group  v-model="alertMailForm.thresholdType" @change="optTypeMoveChangeItem">
          <el-radio :label='0'>百分比</el-radio>
          <el-radio :label='1'>余量</el-radio>
        </el-radio-group>
        </el-form-item>
        
        <el-form-item label="百分比阀值" v-if="alertMailForm.thresholdType == '0'">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入阀值类型" v-model="alertMailForm.alertThreshold">
            <el-option v-for="item in alertThresholds" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="余量阀值" v-if="alertMailForm.thresholdType == '1'">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入阀值类型" v-model="alertMailForm.alertThreshold">
            <el-option v-for="item in alertThresholdsLast" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="发送次数">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入发送次数" v-model="alertMailForm.alertTime">
            <el-option v-for="item in alertTimes" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>


      
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideAlertMailEditDlg">取 消</el-button>
        <el-button type="primary" @click="okModifyAlertMail">确 定</el-button>
      </span>  
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
      channel:null,
      gmtCreateStart:null,
      gmtCreateEnd:null,
      poolName:null

    },
    amountDetailsDlgShowed: false,
    amountDetails:[],
    showEditFlowPoolDlg: false,
    editFlowPoolForm:{
      poolId:'',
      poolName:''
    },
    
    alertInfos:[],
    channelMailConfigs:[],
    alertMailForm:{
      poolId:'',
      address:'',
      phone:'',
      id:'',
      alertThreshold:'',
      alertTime:'',
      thresholdType:0
    }, 
    alertMailListDlgVisible:false,
    alertMailEditDlgVisible:false,
    detailType:null,
    poolDetails:[],
    listType:0,
    treeSelectedType:0,
    showUpdateExpireDlg:false,
    showUpdateuseDlg:false,
    updateuseForm:{},
    updateExpireForm:[],
    showOrderDlg:false,
    addOrderForm:{},
    poolId:'',
    pdCodes:[],
    showAddFlowPoolDlg:false, 
    addFlowPoolForm:{},
    btnEnable: false,
    loading: false,
    status:'',
    saleChannel:'',
    channels:[],
    alertTimes:[
      {label:'1次', value:'1'},
      {label:'5次', value:'5'},
      {label:'10次', value:'10'}
    ],
    alertThresholdsLast:[
      {label:'余量少于100G', value:'100'},
      {label:'余量少于500G', value:'500'},
      {label:'余量少于1000G', value:'1000'},
      {label:'余量少于3000G', value:'3000'},
      {label:'余量少于5000G', value:'5000'},
      {label:'余量少于7000G', value:'7000'},
      {label:'余量少于10000G', value:'10000'},
    ],
    alertThresholds:[
      {label:'流量池停用', value:'0'},
      {label:'可用量少于5%', value:'5'},
      {label:'可用量少于10%', value:'10'},
      {label:'可用量少于20%', value:'20'},
      {label:'可用量少于30%', value:'30'},
      {label:'可用量少于40%', value:'40'},
      {label:'可用量少于50%', value:'50'}
    ],
    statusTypes:[
        {label:'可用', value:'open'},
        {label:'不可用', value:'close'}
    ],
    detailTypes:[
      {label:'月累计', value:'0'},
      {label:'天累计', value:'1'}
    ],
    flowPools:[],
    detailPage:0,
      page: 0,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
  
      table_column_alertInfos:[
        { prop: 'mailAddress', label: '邮箱地址', width: 100, sortable: true },
        { prop: 'phone', label: '手机号码', width: 100, sortable: true },
        { prop: 'threshold', label: '阀值', width: 150, sortable: true },
        { prop: 'times', label: '告警次数', width: 100, sortable: true },
        { prop: 'operation', label: '操作', width: 100, sortable: true }
        
      ],
      table_column: [
        // { prop: 'poolId', label: '池ID', width: 100, sortable: true },
        { prop: 'poolName', label: '池名称', width: 200, sortable: true },
        { prop: 'statusName', label: '状态', width: 60, sortable: true },
        { prop: 'num', label: '总卡片数', width: 60, sortable: true },
        // { prop: 'saleChannelName', label: '渠道', width: 150, sortable: true },
        { prop: 'productCodeName', label: '当前套餐', width: 80, sortable: true },
        { prop: 'amount', label: '账户余额', width: 80, sortable: true },
        { prop: 'flowHighDoseName', label: '可用量', width: 80, sortable: true },
        { prop: 'flowUsedName', label: '当月已使用', width: 80, sortable: true },
        { prop: 'flowHightotalUsedName', label: '累计已使用', width: 80, sortable: true },
        { prop: 'surplusUsedName', label: '剩余总流量', width: 80, sortable: true },
        // { prop: 'lastPer', label: '剩余比率', width: 80, sortable: true },
        { prop: 'expireDate', label: '有效期', width: 100 },
        { prop: 'payDetails', label: '可用量充值记录', width: 450, sortable: true },
        { prop: 'payAmountsDetails', label: '账户余额充值记录', width: 450, sortable: true },
        // { prop: 'gmtCreate', label: '创建时间', width: 100 },
        { prop: 'operation', label: '操作', width: 100, fixed: 'right'}
        
      ],
      
      table_column_detail: [
        { prop: 'date', label: '时间', width: 200},
        { prop: 'channelName', label: '渠道', width: 300},
        { prop: 'pool_name', label: '池名称', width: 250},
        { prop: 'pool_id', label: '池ID', width: 200},
        { prop: 'flow_usage', label: '用量', width: 200},
      ],
      table_column_amounts:[
        { prop: 'cycleId', label: '账期', width: 100, sortable: true },
          { prop: 'usedUsage', label: '本期总用量', width: 100, sortable: true },
          { prop: 'addedUsage', label: '本期充值总流量', width: 100, sortable: true },
          { prop: 'billStatus', label: '出账状态', width: 100, sortable: true }
      ],
      table_column_flowpool_bills:[
        { prop: 'poolName', label: '流量池名称', width: 100, sortable: true },
        { prop: 'addedflow', label: '充值流量（G）', width: 100, sortable: true },
        { prop: 'addedAmount', label: '金额', width: 100, sortable: true },
         { prop: 'payReason', label: '原因', width: 100, sortable: true },
        { prop: 'detailDateStr', label: '日期', width: 100, sortable: true }
      ]
    };
  },
  mounted () {

  },
  created(){
      this.getAllChannels()
      this.queryFlowPools()
      this.getPdCodes()
      this.toQueryPoolBills()
  },
  watch: {},
  methods: {
    startTimeChange () {
      this.payedQueryForm.gmtCreateStart = `${this.payedQueryForm.gmtCreateStart}`
    },
    endTimeChange () {
      this.payedQueryForm.gmtCreateEnd = `${this.payedQueryForm.gmtCreateEnd}`
    },
    toQueryPoolBills:function(){
      this.page = 0;
      this.queryPoolBills()
    },
    queryPoolBills:function(){
      let params = this.payedQueryForm
      params.page = this.page
      params.pageSize = this.pageSize
      console.log(JSON.stringify(this.payedQueryForm))
      apiBigflow.getPoolBills(params).then(res=>{
            if(res.resultCode == 0){
              this.poolBills = res.data
              this.total = res.rowNum
            }else{
                this.$message.error('查询失败:' + res.resultInfo)
            }

        })
    },
    toAddFlowAmount:function(poolId){
      this.poolId = poolId
      this.openUpdateuseDlg()
    },
    openAmountDetails:function(poolId){
      this.amountDetailsDlgShowed = true
      let params = {}
      params.poolId = poolId
      apiBigflow.getFlowSharingPoolBillDetails(params).then(res=>{
            if(res.resultCode == 0){
              this.amountDetails = res.data
            }else{
                this.$message.error('查询失败:' + res.resultInfo)
            }

        })
    },
    optTypeMoveChangeItem(e){
      this.alertMailForm.thresholdType = e
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
    sendEmail: function() {
        // var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        var regEmail =/^(\w+([-.][A-Za-z0-9]+)*){3,18}@\w+([-.][A-Za-z0-9]+)*\.\w+([-.][A-Za-z0-9]+)*$/
        if (this.alertMailForm.address != '' && !regEmail.test(this.alertMailForm.address)) {
            this.$message({
                message: '邮箱格式不正确',
                type: 'error'
            })
            this.alertMailForm.address = ''
        }
    },
    sendPhone:function(){
      var regPhone =/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9]||17[0|1|2|3|5|6|7|8|9])\d{8}$/
        if (this.alertMailForm.phone != '' && !regPhone.test(this.alertMailForm.phone)) {
            this.$message({
                message: '手机格式不正确',
                type: 'error'
            })
            this.alertMailForm.phone = ''
        }
    },
    toEditPool:function(pool){
      this.editFlowPoolForm.poolId = pool.poolId
      this.editFlowPoolForm.poolName = pool.poolName
      this.showEditFlowPoolDlg = true
    },
    okEditFlowPool :function(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let params = {}
          params.poolId = this.editFlowPoolForm.poolId
          params.poolName = this.editFlowPoolForm.poolName
          apiBigflow.modifyPool(params).then(res=>{
                if(res.resultCode == 0){
                    this.$message.success('修改成功')
                    this.showEditFlowPoolDlg = false
                    this.queryFlowPools()
                }else{
                    this.$message.error('修改失败')
                }

            })
        }).catch(() => {
        });
    },
    getPoolAlertInfos:function(poolId){
      let params = {}
      params.poolId = this.alertMailForm.poolId
      apiBigflow.getPoolAlertInfos(params).then(res=>{
            if(res.resultCode == 0){
                this.alertInfos = res.data
            }
        })
    },
    
    listTypeSel:function(type){
      this.listType = type
    },
    treeSelect:function(type){
      this.treeSelectedType = type
    },
    toModifyPoolAlertInfo:function(row){
      this.alertMailForm.id = row.id
      this.alertMailForm.address = row.mailAddress
      this.alertMailForm.phone = row.phone
      this.alertMailForm.alertThreshold = row.threshold
      this.alertMailForm.alertTime = row.times
      this.alertMailForm.thresholdType = row.thresholdType
      this.alertMailEditDlgVisible = true
    },
    removePoolAlertInfo:function(id){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          let params = {}
          params.id = id
          apiBigflow.removePoolAlertInfo(params).then(res=>{
                if(res.resultCode == 0){
                    this.$message.success('删除成功')
                    this.getPoolAlertInfos(this.alertMailForm.poolId)
                }else{
                    this.$message.success('删除失败')
                }

            })
        }).catch(() => {
        });
    },
    okModifyAlertMail:function(){
    if(this.alertMailForm.poolId == null || this.alertMailForm.poolId == undefined || this.alertMailForm.poolId == ''){
      this.$message.error('请先选择流量池')
      return
    }
    // if(this.alertMailForm.address == null || this.alertMailForm.address == undefined || this.alertMailForm.address == ''){
    //   this.$message.error('邮箱不能为空')
    //   return
    // }
    if(this.alertMailForm.address == '' && this.alertMailForm.phone == ''){
      this.$message.error('邮箱和手机号码不能全为空')
      return
    }
    if(this.alertMailForm.alertThreshold == null || this.alertMailForm.alertThreshold == undefined || this.alertMailForm.alertThreshold == ''){
      this.$message.error('告警阀值不能为空')
      return
    }
    if(this.alertMailForm.alertTime == null || this.alertMailForm.alertTime == undefined || this.alertMailForm.alertTime == ''){
      this.$message.error('告警次数不能为空')
      return
    }
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {

          if(this.alertMailForm.id == '' || this.alertMailForm.id == undefined){
            let params = {}
            params.poolId = this.alertMailForm.poolId
            params.mailAddress = this.alertMailForm.address
            params.phone = this.alertMailForm.phone
            params.alertThreshold = this.alertMailForm.alertThreshold
            params.alertTimes = this.alertMailForm.alertTime
            params.thresholdType = this.alertMailForm.thresholdType
            apiBigflow.addPoolMail(params).then(res=>{
                  if(res.resultCode == 0){
                      // that.queryFlowPools()
                      this.$message.success('添加成功')
                      this.getPoolAlertInfos(this.alertMailForm.poolId)
                      // this.alertMailForm.poolId = ''
                      this.alertMailForm.address = ''
                      this.alertMailForm.id = ''
                      this.alertMailForm.alertThreshold = ''
                      this.alertMailForm.alertTime = ''
                      this.alertMailEditDlgVisible = false
                      
                  }else{
                      this.$message.success('添加失败')
                  }
              })
          }else{
            let params = {}
            params.id = this.alertMailForm.id
            params.poolId = this.alertMailForm.poolId
            // params.mailId = this.alertMailForm.address
            params.mailAddress = this.alertMailForm.address
            params.phone = this.alertMailForm.phone
            params.alertThreshold = this.alertMailForm.alertThreshold
            params.alertTimes = this.alertMailForm.alertTime
            params.thresholdType = this.alertMailForm.thresholdType
            apiBigflow.modifyPoolAlertInfo(params).then(res=>{
                  if(res.resultCode == 0){
                      // that.queryFlowPools()
                      this.$message.success('添加成功')
                      this.getPoolAlertInfos(this.alertMailForm.poolId)
                      // this.alertMailForm.poolId = ''
                      this.alertMailForm.address = ''
                      this.alertMailForm.id = ''
                      this.alertMailForm.alertThreshold = ''
                      this.alertMailForm.alertTime = ''
                      this.alertMailEditDlgVisible = false
                      this.alertMailForm.id =''
                      
                  }else{
                      this.$message.success('添加失败')
                  }
              })
          }
          
        }).catch(() => {
        });
    },
    // addPoolMail
    hideAlertMailEditDlg:function(){
      this.alertMailEditDlgVisible = false
    },
    showAlertEditDlg:function(){
      this.alertMailEditDlgVisible = true
    },
    hideAlertMailListDlg:function(){
      this.alertMailListDlgVisible = false
    },
    showAlertMailList:function(poolId){
      this.alertMailListDlgVisible = true
      this.getPoolMailConfigs(poolId)
      this.alertMailForm.poolId = poolId
      this.getPoolAlertInfos(poolId)
    },
    getPoolMailConfigs:function(poolId){
      let params = {}
      params.poolId = poolId
      apiBigflow.getPoolMailConfigs(params).then(res=>{
            if(res.resultCode == 0){
               this.channelMailConfigs = res.data
            }else{
                alert('操作失败:' + res.resultInfo)
            }
            // that.btnEnable = false
        })
    },
    removePool:function(poolId){
      // removeFlowPool
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.btnEnable = true
          let params = {}
          params.poolId = poolId
          apiBigflow.removeFlowPool(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openPool:function(poolId){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.btnEnable = true
          let params = {}
          params.poolId = poolId
          params.status = 1
          apiBigflow.modifyFlowPoolStatus(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    stopPool:function(poolId){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          that.btnEnable = true
          let params = {}
          params.poolId = poolId
          params.status = 0
          apiBigflow.modifyFlowPoolStatus(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openUpdateExpireDlg:function(){
      if(this.poolId == ""){
            alert('请先选择要操作的流量池')
            return
        }
        if(this.poolId.indexOf(',') != -1){
            alert('一次只能操作一个流量池')
            return
        }
        this.showUpdateExpireDlg = true
    },
      openUpdateuseDlg:function(){
          if(this.poolId == ""){
            alert('请先选择要操作的流量池')
            return
        }
        if(this.poolId.indexOf(',') != -1){
            alert('一次只能操作一个流量池')
            return
        }
        this.showUpdateuseDlg = true
      }, 
      closeUpdateExpireDlg:function(){
          this.showUpdateExpireDlg = false
      },
      closeUpdateuseDlg:function(){
          this.showUpdateuseDlg = false
      },
      okUpdateExpire:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.poolId = this.poolId
            params.expireMonth2Modify = this.updateExpireForm.expire
            apiBigflow.updateFlowPoolExpire(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showUpdateExpireDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
      },
      okUpdateuse:function(){
          let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.flowHighDose = this.updateuseForm.flowHighDose
            params.reason = this.updateuseForm.reason
            params.poolId = this.poolId
            params.addedAmount = this.updateuseForm.addedAmount
            apiBigflow.updateFlowPoolUse(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showUpdateuseDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
      },
    openOrderDlg:function(){
        if(this.poolId == ""){
            alert('请先选择要操作的流量池')
            return
        }
        if(this.poolId.indexOf(',') != -1){
            alert('一次只能操作一个流量池')
            return
        }
        this.showOrderDlg = true
    },  
    closeOrderDlg:function(){
        this.showOrderDlg = false
    },
    okOrderPool:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.productCode = this.addOrderForm.productCode
            params.reason = this.addOrderForm.reason
            params.poolId = this.poolId
            apiBigflow.addFlowPoolOrder(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showOrderDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openAddFlowPoolDlg:function(){
        this.showAddFlowPoolDlg = true
    },
    closeAddFlowPoolDlg:function(){
        this.showAddFlowPoolDlg = false
    },
    okAddFlowPool:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.poolName = this.addFlowPoolForm.poolName
            params.poolId = this.addFlowPoolForm.poolId
            params.saleChannel = this.addFlowPoolForm.saleChannel
            params.cardDefaultPdCode = this.addFlowPoolForm.cardDefaultPdCode
            apiBigflow.addFlowPool(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryFlowPools()
                    that.showAddFlowPoolDlg = false
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    
    getPdCodes:function(){
        let params = {}
        apiBigflow.getPdCodes(params).then(res=>{
            if(res.resultCode == 0){
                this.getPdCodes = res.data
            }
        })
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
    queryFlowPools:function(){
        this.loading = true
        let params = {}
        console.log('queryFlowPools:' + this.page)
        params.page = this.page
        if(this.status != '')
            params.status = this.status
        if(this.saleChannel != '')
            params.saleChannel = this.saleChannel
        apiBigflow.getFlowPools(params).then(res=>{
        if(res.resultCode == 0){
            this.flowPools = res.data
            this.total = res.rowNum
            this.loading = false
          }
        })
    },
    okQueryFlowPoolsDetail:function(){
      this.detailPage = 0
      this.queryFlowPoolsDetail()
    },
    queryFlowPoolsDetail:function(){
        this.loading = true
        
        let params = {}
        console.log(this.detailPage)
        params.page = this.detailPage
        params.type = this.detailType
        params.channelId = this.saleChannel
        apiBigflow.getFlowPoolsDetails(params).then(res=>{
        if(res.resultCode == 0){
            this.poolDetails = res.data
            this.total = res.rowNum
            this.loading = false
          }else{
            this.loading = false
            this.$message.success(res.resultInfo)
          }
        })
    },
    handleSelectionChange (val) {
        this.poolId = ''
      if(val.length > 0){
          for(let i = 0; i < val.length; i++){
              this.poolId = this.poolId + val[i].poolId +','
          }
          this.poolId =this.poolId.substr(0,this.poolId.length -1);
      }
    },
    handlePoolBillsSizeChange (newPage) {
      console.log('newPage:' + this.detailPage)
      this.pageSize = newPage;
      this.queryPoolBills()
    },
    handlePoolBillsCurrentChange (newPage) {
      console.log('newPage1:' + this.detailPage)
      this.page = newPage;
      this.queryPoolBills()
    },
    handleDetailSizeChange (newPage) {
      console.log('newPage:' + this.detailPage)
      this.detailPage = newPage;
      this.queryFlowPoolsDetail()
    },
    handleDetailCurrentChange (newPage) {
      console.log('newPage1:' + this.detailPage)
      this.detailPage = newPage;
      this.queryFlowPoolsDetail()
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryFlowPools()
    },
    handleCurrentChange (newPage) {
      console.log('newPage2:' + this.detailPage)
      this.page = newPage;
      this.queryFlowPools()
    },
  }
};
</script>
<style scoped>
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
.usagePer{
  color: red;
}
.el-button {
  color:#145297;
    background-color: transparent;
    border-color: transparent;
}
</style>
