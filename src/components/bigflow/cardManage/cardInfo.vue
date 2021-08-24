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
        <el-button size="medium" type="primary" icon="el-icon-download" 
        v-permission="{indentity:'bigflowCardInfo-changeStatus'}" @click="openChangeStatusDlg">卡状态变更</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-unbind'}" @click="openUnbindDlg">解绑</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-flowClear'}" @click="openDosClearDlg">可用量清零</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-flowChange'}" @click="openDosChangeDlg">可用量变更</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-productChange'}" @click="openChangeProductDlg">变更卡套餐</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-planChange'}" @click="openChangeCommonTypeDlg">变更卡通讯计划</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-validityExtend'}" @click="openExpireDateExtendDlg">有效期延长</el-button>
        <el-button size="medium" type="primary" icon="el-icon-edit" 
        v-permission="{indentity:'bigflowCardInfo-validityExtend'}" @click="openFile2CheckDlg">与CMP进行用量核查</el-button>
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


    <el-dialog title="卡状态变更" :visible.sync="showChangeStatusDlg" width="450px" @close="closeChangeStatusDlg">
      <!-- 内容主体区域 -->
      <el-form :model="changeStatusForm"  label-width="110px">
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择卡状态" v-model="changeStatusForm.chargeStatus">
            <el-option v-for="item in statusForOpt" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="changeStatusForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChangeStatusDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okChangeStatus" :disabled="btnEnable">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="解绑" :visible.sync="showUnbindDlg" width="450px" @close="closeUnbindDlg">
      <!-- 内容主体区域 -->
      <el-form :model="unbindForm"  label-width="110px">
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="unbindForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeUnbindDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okUnbind" :disabled="btnEnable">确 定</el-button>
      </span> 
    </el-dialog>

    <el-dialog title="可用量清零" :visible.sync="showDosClearDlg" width="450px" @close="closeDosClearDlg">
      <!-- 内容主体区域 -->
      <el-form :model="dosClearForm"  label-width="110px">
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="dosClearForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDosClearDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okDosClear" :disabled="btnEnable">确 定</el-button>
      </span> 
    </el-dialog>

    <el-dialog title="变更可用量" :visible.sync="showDosChangeDlg" width="450px" @close="closeDosChangeDlg">
      <!-- 内容主体区域 -->
      <el-form :model="dosChangeForm"  label-width="110px">
        <el-form-item label="高速可用量">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\d]/g,'')" v-model.number="dosChangeForm.chargeHighDoseG" placeholder="请输入高速可用量" ></el-input>
        </el-form-item>
        <el-form-item label="中速可用量">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\d]/g,'')" v-model.number="dosClearForm.chargeMediumDoseG" placeholder="请输入中速可用量" ></el-input>
        </el-form-item>
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="dosClearForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <div class="notice">
        <p>1）变更以G为单位，例如：输入1，代表1G</p>
        <p>2）变更逻辑：在原来基础上加上变更的用量。 例如：原来有10G，变更1G，最后会变成11G</p>
        <p>输入负数就是减： 输入-1，就会变成9G。</p>
        <p>3）必填参数如果不需要变更，输入0即可</p>
      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDosChangeDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okDosChange" :disabled="btnEnable">确 定</el-button>
      </span> 
    </el-dialog>

    <el-dialog title="变更卡套餐" :visible.sync="showChangeProductDlg" width="450px" @close="closeChangeProductDlg">
      <!-- 内容主体区域 -->
      <el-form :model="changeProductForm"  label-width="110px">
        <el-form-item label="变更套餐">
          <el-select class="queryFormInput"  clearable placeholder="请选择套餐" v-model="changeProductForm.updateProductCode">
            <el-option v-for="item in products2Change" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="changeProductForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChangeProductDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okChangeProduct" :disabled="btnEnable">确 定</el-button>
      </span> 
    </el-dialog>

    <el-dialog title="变更通讯计划" :visible.sync="showChangeCommonTypeDlg" width="450px" @close="closeChangeCommonTypeDlg">
      <!-- 内容主体区域 -->
      <el-form :model="changeCommonTypeForm"  label-width="110px">
        <el-form-item label="变更通讯计划">
          <el-select class="queryFormInput"  clearable placeholder="请选择通讯计划" v-model="changeCommonTypeForm.communPlanType">
            <el-option v-for="item in communPlanTypes2Change" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="changeCommonTypeForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeChangeCommonTypeDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okChangeCommonType" :disabled="btnEnable">确 定</el-button>
      </span> 
    </el-dialog>

    <el-dialog title="延长有效期" :visible.sync="showExpireDateExtendDlg" width="450px" @close="closeExpireDateExtendDlg">
      <!-- 内容主体区域 --> 
      <el-form :model="expireDateExtendForm"  label-width="110px">
        <el-form-item label="操作类型">
          <el-select class="queryFormInput"  clearable placeholder="请选择操作类型" v-model="optType">
            <el-option v-for="item in optTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-upload v-if="optType == 2" class="unload-demo" accept=".xls, .xlsx" action="#"  :http-request="uploadFile" :on-remove="removeUploadedFile">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-form-item label="时长（月）">
          <el-input style="width:300px;" onkeyup="value=value.replace(/[^\d]/g,'')" v-model="expireDateExtendForm.extendTime" placeholder="请输入时长" ></el-input>
        </el-form-item>
        <el-form-item label="原因">
          <el-input style="width:300px;" v-model="expireDateExtendForm.reason" placeholder="请输入调整原因" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeExpireDateExtendDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okExpireDateExtend" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 

    <el-dialog title="延长有效期" :visible.sync="showFile2CheckDlg" width="450px" @close="closeFile2CheckDlg">
        <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="file2CheckFiles" :http-request="uploadFile2CheckFile" :on-remove="removeUploadedFile2Check">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFile2CheckDlg" :disabled="btnEnable">取 消</el-button>
        <el-button type="primary" @click="okFile2Check" :disabled="btnEnable">确 定</el-button>
      </span>  
    </el-dialog> 
  </div> 
</template>

<script>
import apiBigflow from './../../../api/bigflow'

export default {
  components: {

  },
  data () {
    return {
        showFile2CheckDlg:false,
        file2CheckFiles:[],
        showExpireDateExtendDlg:false,
        expireDateExtendForm:{},

        showChangeCommonTypeDlg :false,
        changeCommonTypeForm:{},
        communPlanTypes2Change:[],

        showChangeProductDlg :false,
        changeProductForm:{},
        products2Change:[],


        iccids2Opt:'',
        showChangeStatusDlg:false,
        changeStatusForm:{},

        showUnbindDlg:false,
        unbindForm:{},

        showDosClearDlg:false,
        dosClearForm:{},

        showDosChangeDlg:false, 
        dosChangeForm:{},

        loading: false,
        btnEnable:false,
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
        statusForOpt:[
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
        optTypes:[
            {value:'0', name:'已勾选的卡'},
            {value:'1', name:'已查询出的全部卡'},
            {value:'2', name:'文件导入'}
        ],
        optType:'',
        uploadedFile:null,
        uploadedFile2CheckFile:null,
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
    openFile2CheckDlg:function(){
        this.file2CheckFiles = []
        this.uploadedFile2CheckFile = null
        this.showFile2CheckDlg = true
    }, 
    closeFile2CheckDlg:function(){
        this.showFile2CheckDlg = false
    },  
    okFile2Check:function(){
        if(this.uploadedFile2CheckFile == null){
            alert('请先上传文件')
            return
        }
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = new FormData()
        params.append('file', this.uploadedFile2CheckFile)
        apiBigflow.file2CardUsageCheck(params).then(res=>{
            if(res.resultCode == 0){
                that.queryCardInfos()
                alert('操作成功,请在任务：' + res.data + "中查询处理结果")
            }else{
                alert('操作失败:' + res.resultInfo)
            }
            that.btnEnable = false
        })
        }).catch(() => {
        }); 
    }, 
    removeUploadedFile2Check:function(file,fileList){
        this.uploadedFile2CheckFile = null
    }, 
    uploadFile2CheckFile:function(item){
        this.uploadedFile2CheckFile = item.file
    },
    removeUploadedFile(file,fileList){
        this.uploadedFile = null
    },
    uploadFile (item) {
        this.uploadedFile = item.file
    },
    openExpireDateExtendDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        this.showExpireDateExtendDlg = true
    },
    closeExpireDateExtendDlg:function(){
        this.showExpireDateExtendDlg = false
    }, 
    okExpireDateExtend:function(){
        // let params = this.createQueryParams()
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            if(that.optType == 0){
                if(this.iccids2Opt == ''){
                    alert('iccid必须填')
                    return
                }
                that.btnEnable = true
                let params = {}
                params.iccids = this.iccids2Opt
                params.reason = this.expireDateExtendForm.reason
                params.extendTime = this.expireDateExtendForm.extendTime
                apiBigflow.expiredateextend(params).then(res=>{
                    if(res.resultCode == 0){
                        that.queryCardInfos()
                        alert('操作成功')
                    }else{
                        alert('操作失败:' + res.resultInfo)
                    }
                    that.btnEnable = false
                })
            }else if(that.optType == 1){
                let params = this.createQueryParams()
                params.reason = this.expireDateExtendForm.reason
                params.extendTime = this.expireDateExtendForm.extendTime
                apiBigflow.batchExpiredateExtend(params).then(res=>{
                    if(res.resultCode == 0){
                        that.queryCardInfos()
                        alert('操作成功,请在任务：' + res.data + "中查询处理结果")
                    }else{
                        alert('操作失败:' + res.resultInfo)
                    }
                    that.btnEnable = false
                })
            }else if(that.optType == 2){
                let params = new FormData()
                params.append('file', this.uploadedFile)
                let reason = this.expireDateExtendForm.reason
                let extendTime = this.expireDateExtendForm.extendTime
                apiBigflow.file2ExpiredateExtend(params, reason, extendTime).then(res=>{
                    if(res.resultCode == 0){
                        that.queryCardInfos()
                        alert('操作成功,请在任务：' + res.data + "中查询处理结果")
                    }else{
                        alert('操作失败:' + res.resultInfo)
                    }
                    that.btnEnable = false
                })
            }
            
        }).catch(() => {
        }); 
    },
    openChangeCommonTypeDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        if(this.iccids2Opt == ''){
            alert('iccid必须填')
            return
        }
        if(this.iccids2Opt.length > 20){
            alert('一次只能操作一张卡')
            return
        }
        this.getCommunPlanTypes2Change(this.iccids2Opt)
        this.showChangeCommonTypeDlg = true
    },  
    closeChangeCommonTypeDlg:function(){
        this.showChangeCommonTypeDlg = false
    }, 
    okChangeCommonType:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.changeCommonTypeForm.reason
            params.communPlanType = this.changeCommonTypeForm.communPlanType
            apiBigflow.changeCommunPlanType(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardInfos()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },

    openChangeProductDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        if(this.iccids2Opt == ''){
            alert('iccid必须填')
            return
        }
        if(this.iccids2Opt.length > 20){
            alert('一次只能操作一张卡')
            return
        }
        this.showChangeProductDlg = true
        this.getProduct2Change(this.iccids2Opt)
    },
    closeChangeProductDlg:function(){
        this.showChangeProductDlg = false
    },
    okChangeProduct:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.changeProductForm.reason
            params.updateProductCode = this.changeProductForm.updateProductCode
            apiBigflow.changeProduct(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardInfos()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    getCommunPlanTypes2Change:function(iccid){
        let params = {}
        params.iccid = iccid
        apiBigflow.getComunPlanTypes2Change(params).then(res=>{
            if(res.resultCode == 0){
              this.communPlanTypes2Change = res.data
          }
        })
    },
    getProduct2Change:function(iccid){
        let params = {}
        params.iccid = iccid
        apiBigflow.getProduct2Change(params).then(res=>{
            if(res.resultCode == 0){
              this.products2Change = res.data
          }
        })
    },
    openDosChangeDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        if(this.iccids2Opt == ''){
            alert('iccid必须填')
            return
        }
        this.showDosChangeDlg = true
    },  
    closeDosChangeDlg :function(){
        this.showDosChangeDlg = false
    },
    okDosChange:function(){
       let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.dosChangeForm.reason
            params.chargeHighDoseG = this.dosChangeForm.chargeHighDoseG
            params.chargeMediumDoseG = this.dosChangeForm.chargeMediumDoseG
            apiBigflow.dosChange(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardInfos()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        }); 
    },
    openDosClearDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        if(this.iccids2Opt == ''){
            alert('iccid必须填')
            return
        }
        this.showDosClearDlg = true
    },
    closeDosClearDlg :function(){
        this.showDosClearDlg = false
    },
    okDosClear:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.dosClearForm.reason
            apiBigflow.dosClear(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardInfos()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    closeUnbindDlg:function(){
        this.showUnbindDlg = false
    },
    okUnbind:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.unbindForm.reason
            apiBigflow.unbindCard(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardInfos()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    openUnbindDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        if(this.iccids2Opt == ''){
            alert('iccid必须填')
            return
        }
        this.showUnbindDlg = true
    },


    openChangeStatusDlg:function(){
        this.optType = ''
        this.uploadedFile = null
        if(this.iccids2Opt == ''){
            alert('iccid必须填')
            return
        }
        this.showChangeStatusDlg = true
    },
    closeChangeStatusDlg:function(){
        this.showChangeStatusDlg = false
    },
    okChangeStatus:function(){
        let that = this
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            that.btnEnable = true
            let params = {}
            params.iccids = this.iccids2Opt
            params.reason = this.changeStatusForm.reason
            params.chargeStatus = this.changeStatusForm.chargeStatus
            apiBigflow.changeCardStatus(params).then(res=>{
                if(res.resultCode == 0){
                    that.queryCardInfos()
                    alert('操作成功')
                }else{
                    alert('操作失败:' + res.resultInfo)
                }
                that.btnEnable = false
            })
        }).catch(() => {
        });
    },
    createQueryParams:function(){
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
        return params
    },
    queryCardInfos:function(){
        this.loading = true
        let params = this.createQueryParams()
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
      this.iccids2Opt = ''
      if(val.length > 0){
          for(let i = 0; i < val.length; i++){
              this.iccids2Opt = this.iccids2Opt + val[i].iccid +','
          }
          this.iccids2Opt =this.iccids2Opt.substr(0,this.iccids2Opt.length -1 );
      }
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
