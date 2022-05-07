<template>
  <div class="box_subject">
      <el-card class="all_list">
      <el-form  :inline="true">
        <el-form-item label="账户名称" class="queryFormItem">
            <el-input class="queryFormInput" clearable placeholder="请输入账户名称" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <el-select class="queryFormInput"  
          filterable
          clearable
          reserve-keyword
           placeholder="请选择渠道">
            <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
          
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" >搜索</el-button>
      </el-form>
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-edit" @click="showEditPoolDlg">添加</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" @click="showAddAmountDlg">充值</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" @click="openOrderPackageDlg">套餐订购</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" @click="openEditExpireDlg">调整有效期</el-button>
      </div>
      <el-table   :data="pools" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in pool_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'opts'">
              <el-button type="text" size="small"  v-if="scope.row.status=='open'">停用</el-button>
              <el-button type="text" size="small"  v-else>启用</el-button>
              <el-button type="text" size="small" @click="openAmountDetailsDlg">账单明细</el-button>
              <el-button type="text" size="small" >删除</el-button>
              <el-button type="text" size="small" @click="openlertListDlg">告警设置</el-button>
              <el-button type="text" size="small" @click="showEditPoolDlg">编辑</el-button>
            </div>
            <div v-else v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination :current-page="currentPage" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
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
        <el-button type="primary"  :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="账户充值" :visible.sync="addAmountDlgShowed" width="450px" @close="closeAddAmountDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="poolAddAmountForm"  label-width="110px">
        <el-form-item label="充值金额(元)">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="poolAddAmountForm.addedAmount" placeholder="请输入充值金额" ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\-?\d.]/g,'')"   v-model="poolAddAmountForm.comment" placeholder="请输入备注" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddAmountDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary"  :disabled="btnEnable">确 定</el-button>
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
            <el-option v-for="item in poolPackages" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeOrderPackageDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary"  :disabled="btnEnable">确 定</el-button>
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
      <el-table   :data="alertInfos" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column_alertInfos" :prop="p.prop" :label="p.label" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'operation'">
              <el-button  type="text" size="small" >删除</el-button>
              <el-button  type="text" size="small" @click="openEditAlertDlg">修改</el-button>
            </div>
            <div v-else>
              <div v-if="p.prop == 'threshold'">
                <div v-if="scope.row.threshold > 0">可用量少于{{scope.row.threshold}}%</div>
                <div v-else>账户池停用</div>
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
          <el-button type="primary" @click="sendTestMail(alertMailForm.address)" >发送测试邮件</el-button>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input style="width:300px;"  v-model="alertForm.phone" placeholder="请输入手机号码" @blur="sendPhone"></el-input>
          <el-button type="primary" @click="sendTestSms(alertMailForm.phone)">发送测试短信</el-button>
        </el-form-item>
        <el-form-item label="阀值类型">
          <el-select 
          filterable
          clearable
          reserve-keyword 
          class="queryFormInput"  placeholder="请输入阀值类型" v-model="alertForm.alertThreshold">
            <el-option v-for="item in alertThresholds" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
        <el-button type="primary">确 定</el-button>
      </span>  
    </el-dialog>

    <el-dialog title="账单明细" :visible.sync="amountDetailsDlgShowed" width="650px" @close="closeAmountDetailsDlg">
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
    
  </div>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {
        amountDetails:[
            {cycleId:'202205'}
        ],
        alertForm:{},
        editAlertShowed:false,
        alertInfos:[
            {mailAddress:'sdsds'}
        ],
        amountDetailsDlgShowed:false,

        alertListDlgShowed:false,
        editExpireDlgShowed:false,
        editExpireForm:{},
        orderPackageDlgShowed:false,
        orderPackageForm:{},
        addAmountDlgShowed:false,
        poolAddAmountForm:{},
        poolForm:{},
        editPoolDlgShowed:false,
        btnEnable:false,
        pageSize:10,
        currentPage:0,
        total:0,
        channels:[
        ],
        pools:[
            {
               poolName: '账户池'
           }
        ],
        pool_column: [
        { prop: 'poolName', label: '名称', width: 100, sortable: true },
        { prop: 'status', label: '状态', width: 100, sortable: true },
        { prop: 'num', label: '总卡片数', width: 80, sortable: true },
        { prop: 'saleChannelName', label: '渠道', width: 150, sortable: true },
        { prop: 'productCodeName', label: '当前套餐', width: 80, sortable: true },
        { prop: 'amount', label: '账户金额', width: 80, sortable: true },
        { prop: 'creditAmount', label: '信用额度', width: 80, sortable: true },
        { prop: 'usedAmount', label: '已用金额', width: 80, sortable: true },
        { prop: 'lastAmount', label: '余额', width: 80, sortable: true },
        { prop: 'lastPer', label: '余额比例', width: 80, sortable: true },
        { prop: 'expireDate', label: '有效期', width: 100 },
        { prop: 'opts', label: '操作', width: 100 }
      ],
      table_column_alertInfos:[
        { prop: 'mailAddress', label: '邮箱地址', width: 100, sortable: true },
        { prop: 'phone', label: '手机号码', width: 100, sortable: true },
        { prop: 'threshold', label: '阀值', width: 100, sortable: true },
        { prop: 'times', label: '告警次数', width: 100, sortable: true },
        { prop: 'operation', label: '操作', width: 100, sortable: true }
      ],
    //   账期、可用额度、信用额度、账单金额，生成日期
      table_column_amounts:[
          { prop: 'cycleId', label: '账期', width: 100, sortable: true },
          { prop: 'amount', label: '可用额度', width: 100, sortable: true },
          { prop: 'creditAmount', label: '信用额度', width: 100, sortable: true },
          { prop: 'usedAmount', label: '账单额度', width: 100, sortable: true },
          { prop: 'date', label: '生成日期', width: 100, sortable: true }
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
     
  },
  watch: {},
  methods: {
    closeEditPoolDlg: function(){
        this.editPoolDlgShowed = false
    },
    showEditPoolDlg: function(){
        this.editPoolDlgShowed = true
    },
    closeAddAmountDlg:function(){
        this.addAmountDlgShowed = false
    },
    showAddAmountDlg:function(){
        this.addAmountDlgShowed = true
    },
    closeOrderPackageDlg:function(){
        this.orderPackageDlgShowed = false
    },
    openOrderPackageDlg:function(){
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
    openlertListDlg:function(){
        this.alertListDlgShowed = true
    },
    closeEditAlertDlg:function(){
        this.editAlertShowed = false
    },
    openEditAlertDlg:function(){
        this.editAlertShowed = true
    },
    closeAmountDetailsDlg:function(){
        this.amountDetailsDlgShowed = false
    },
    openAmountDetailsDlg:function(){
        this.amountDetailsDlgShowed = true
    }
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
