<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form ref="queryCardInfoRef" :inline="true" :model="queryCardInfoForm">
        <el-form-item label="卡号码" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryCardInfoForm.cardNo" clearable placeholder="请输入卡号码" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="ICCID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryCardInfoForm.iccid" clearable placeholder="请输入ICCID" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="学生姓名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryCardInfoForm.studentName" clearable placeholder="请输入学生姓名" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="联系方式" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryCardInfoForm.contactInfo" clearable placeholder="请输入联系方式" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="卡状态" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardInfoForm.cardStatus" clearable placeholder="请选择卡状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="时间" class="queryFormItem">
          <el-date-picker style="width:140px" v-model="queryCardInfoForm.orderStartDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px" v-model="queryCardInfoForm.orderEndDate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <channelSelect style="width:150px !important" @channelSelectId="channelSelectId"></channelSelect>
        </el-form-item>
        <el-form-item label="当前套餐" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardInfoForm.currentPackage" clearable filterable placeholder="请输入套餐关键词" @change="currentPackageChange">
            <el-option v-for="item in porductsListOptions" :key="item.packageId" :label="item.packageName" :value="item.packageId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="下月未生效套餐" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardInfoForm.nextPackage" clearable filterable placeholder="请输入套餐关键词" @change="nextPackageChange">
            <el-option v-for="item in porductsListOptions" :key="item.packageId" :label="item.packageName" :value="item.packageId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="蜂窝账号" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryCardInfoForm.fwAccount" clearable filterable placeholder="请输入蜂窝账号关键词" style="width:230px" @change="fwUnionAccount">
            <el-option v-for="item in fwUnionAccountOptions" :key="item.id" :label="item.fwAccount" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryCardInfo">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download" @click="exportCardInfo">导出</el-button>
        <!-- <el-button v-if="selectListNumber ==0" size="medium" type="primary" icon="el-icon-edit" disabled>编辑选中</el-button> -->
        <!-- <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="editSelected()">编辑选中</el-button> -->
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>调整余额</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="AccountBalanceShow">调整余额</el-button>
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>用量变更</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="UsagebalanceShow">用量变更</el-button>
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>套餐变更</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="PackagesChangeShow">套餐变量</el-button>
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>实名状态修改</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="RealstatusShow">实名状态修改</el-button>
      </div>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
          <ul>
            <!-- <li v-fo r="(item,index) in cardNos" :key="index">{{item}}</li> -->
          </ul>
        </div>
        <div class="cardNosNumber">选中<span class="red">{{selectListNumber}}</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="cardInfoList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop =='orderTypeZS'">
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
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>

    <!-- 批量编辑 弹出框 -->
    <editCardInfo ref="editModalRef" :cardNos="cardNos" :selectListNumber="selectListNumber" :porductsListOptions="porductsListOptions" :statusOptions="statusOptions" @editCardInfoSuccess="editCardInfoSuccess">
    </editCardInfo>

    <!-- 解绑 -->
    <el-dialog title="解绑" :visible.sync="UnbundlingDialogVisible" width="430px" @close="UnbundlingDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="UnbundlingForm" ref="UnbundlingFormRef" label-width="90px">
        <el-form-item label="解绑原因">
          <el-input style="width:300px;" v-model="UnbundlingForm.reason" placeholder="请输入解绑原因"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="UnbundlingDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="UnbundlingConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 调整余额 -->
    <el-dialog title="调整余额" :visible.sync="AccountBalanceDialog" width="450px" @close="AccountBalanceClose">
      <!-- 内容主体区域 -->
      <el-form :model="AccountBalanceForm" ref="AccountBalanceFormRef" label-width="110px">
        <el-form-item label="当前金额(元)">
          <el-input style="width:300px;" v-model="AccountBalanceForm.remaindCanUse" placeholder="请输入调整金额" disabled></el-input>
        </el-form-item>
        <el-form-item label="调整金额(元)">
          <el-input style="width:300px;" v-model.number="AccountBalanceForm.offBalance" placeholder="请输入调整金额" @change="offBalanceValue"></el-input>
        </el-form-item>
        <el-form-item label="调整后金额(元)">
          <el-input style="width:300px;" v-model="AccountBalanceForm.AdjustedBalance" disabled></el-input>
        </el-form-item>
        <el-form-item label="调整原因">
          <el-input style="width:300px;" v-model="AccountBalanceForm.comment" placeholder="请输入调整原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="notice">
        <p>调整卡余额，正数为增加值，负数为减少值，最低调整后余额为0</p>
      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="AccountBalanceClose">取 消</el-button>
        <el-button type="primary" @click="AccountBalanceConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改实名状态 -->
    <el-dialog title="修改实名状态" :visible.sync="RealstatusDialog" width="450px" @close="RealstatusClose">
      <!-- 内容主体区域 -->
      <el-form :model="RealstatusForm" ref="RealstatusRef" label-width="110px">
        <el-form-item label="实名状态">
          <el-select style="width:300px;" v-model="RealstatusForm.realStatus" clearable placeholder="请选择实名状态">
            <el-option v-for="item in realStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="调整原因">
          <el-input style="width:300px;" v-model="RealstatusForm.comment" placeholder="请输入调整原因"></el-input>
        </el-form-item> -->
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="RealstatusClose">取 消</el-button>
        <el-button type="primary" @click="RealstatusConfirm">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 用量变更 -->
    <el-dialog title="用量变更" :visible.sync="UsagebalanceDialog" width="450px" @close="UsagebalanceClose">
      <!-- 内容主体区域 -->
      <el-form :model="UsagebalanceForm" ref="UsagebalanceFormRef" label-width="110px">
        <el-form-item label="语音(分钟)">
          <el-input style="width:120px;" v-model.number="UsagebalanceForm.offVoiceBalance" placeholder="50/-50"></el-input>
          <div class="formValueData" v-if="UsagebalanceForm.voiceCanUse !== null">当前可用量：{{UsagebalanceForm.voiceCanUse}} 分钟</div>
          <div class="formValueData" v-else>当前可用量：0 分钟</div>
        </el-form-item>
        <el-form-item label="全国流量(M)">
          <el-input style="width:120px;" v-model.number="UsagebalanceForm.offContryDataBalance" placeholder="50/-50"></el-input>
          <div class="formValueData" v-if="UsagebalanceForm.netWork1CanUse !== null">当前可用量：{{UsagebalanceForm.netWork1CanUse}} M</div>
          <div class="formValueData" v-else>当前可用量：0 M</div>
        </el-form-item>
        <el-form-item label="省内流量(M)">
          <el-input style="width:120px;" v-model.number="UsagebalanceForm.offProvinceDataBalance" placeholder="50/-50"></el-input>
          <div class="formValueData" v-if="UsagebalanceForm.netWork2CanUse !== null">当前可用量：{{UsagebalanceForm.netWork2CanUse}} M</div>
          <div class="formValueData" v-else>当前可用量：0 M</div>
        </el-form-item>
        <el-form-item label="调整原因">
          <el-input style="width:300px;" v-model="UsagebalanceForm.comment" placeholder="请输入调整原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="notice">
        <p>调整卡用量，正数为增加值，负数为减少值</p>
      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="UsagebalanceClose">取 消</el-button>
        <el-button type="primary" @click="UsagebalanceConfirm">确 定</el-button>
        <el-button type="primary" @click="UsagebalanceClear">清空当前可用量</el-button>
      </span>
    </el-dialog>

    <!-- 套餐变量 -->
    <el-dialog title="套餐变量" :visible.sync="PackagesChangeDialog" width="420px" @close="PackagesChangeClose">
      <!-- 内容主体区域 -->
      <el-form :model="PackagesChangeForm" ref="PackagesChangeFormRef" label-width="80px">
        <el-form-item label="选择套餐">
          <el-select style="width:300px;" v-model="PackagesChangeForm.balanceId" clearable filterable placeholder="请输入套餐关键词" @change="studentPackageChange">
            <el-option v-for="item in studentPackageOptions" :key="item.balanceId" :label="item.packageName" :value="item.balanceId">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="fromDetail" v-show="studentPackageDetailShow">
          <div class="fromDetailItem">
            <div class="fromDetailItemText">语音：{{studentPackageDetail.voiceBalance}} 分钟/{{studentPackageDetail.clearCycle}}个月</div>
            <div class="fromDetailItemText" v-if="studentPackageDetail.payType === 1" style="color: red;text-align:right">自动续期</div>
            <div class="fromDetailItemText" v-else style="color: #66B1FF;text-align:right">非自动续期</div>
          </div>
          <div class="fromDetailItem" style="margin-bottom: 20px">
            <div class="fromDetailItemText">全国流量：{{studentPackageDetail.contryNetBalance}} MB/{{studentPackageDetail.clearCycle}}个月</div>
            <div class="fromDetailItemText">省内流量：{{studentPackageDetail.provinceNetBalance}} MB/{{studentPackageDetail.clearCycle}}个月</div>
          </div>
          <div class="fromDetailItem">
            <div class="fromDetailItemText">
              <p>生效时间</p>
              <p>{{studentPackageDetail.startDateTime}}</p>
            </div>
            <div class="fromDetailItemLine">至</div>
            <div class="fromDetailItemText">
              <p>失效时间</p>
              <p>{{studentPackageDetail.endDateTime}}</p>
            </div>
          </div>
        </div>
        <el-form-item label="变更套餐">
          <el-select style="width:300px;" v-model="PackagesChangeForm.packageId" clearable filterable placeholder="请输入套餐关键词" @change="changePackagesChange">
            <el-option v-for="item in ChangePackageOptions" :key="item.packageId" :label="item.packageName" :value="item.packageId">
            </el-option>
          </el-select>
        </el-form-item>
        <div class="fromDetail" v-show="changePackageDetailShow">
          <div class="fromDetailItem">
            <div class="fromDetailItemText">语音：{{changePackageDetail.voiceBalance}} 分钟</div>
            <div class="fromDetailItemText" v-if="changePackageDetail.payType === 1" style="color: red;text-align:right">自动续期</div>
            <div class="fromDetailItemText" v-else style="color: #66B1FF;text-align:right">非自动续期</div>
          </div>
          <div class="fromDetailItem">
            <div class="fromDetailItemText">全国流量：{{changePackageDetail.contryNetBalance}} MB/{{changePackageDetail.clearCycle}} 个月</div>
            <div class="fromDetailItemText">省内流量：{{changePackageDetail.provinceNetBalance}} MB/{{changePackageDetail.clearCycle}} 个月</div>
          </div>
          <div class="fromDetailItem">
            <div class="fromDetailItemText">套餐清零周期：{{changePackageDetail.clearCycle}}月</div>
            <div class="fromDetailItemText">套餐有效期：{{changePackageDetail.validMonth}}月</div>
          </div>
        </div>
        <el-form-item label="调整原因">
          <el-input style="width:300px;" v-model="PackagesChangeForm.comment" placeholder="请输入调整原因"></el-input>
        </el-form-item>
      </el-form>
      <div class="notice">
        <p>清零所有套餐时会清除所有套餐，卡可用量清零，并关停卡</p>
      </div>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="PackagesChangeClose">取 消</el-button>
        <el-button type="primary" @click="PackagesChangeConfirm">确 定</el-button>
        <el-button v-show="!removeShow" type="primary" @click="allPackageClear">清除所有套餐</el-button>
        <el-button v-show="removeShow" type="warning" @click="allPackageClearRemove">清除所选套餐</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import API from 'api/cardInfo'
import editCardInfo from './editCardInfo'
import channelSelect from './../sale/channelSelect'
export default {
  components: {
    editCardInfo,
    channelSelect
  },
  data () {
    return {
      // 卡信息列表
      cardInfoList: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'cardNo', label: '卡号码', width: 120, fixed: 'left', sortable: true },
        { prop: 'iccid', label: 'ICCID', width: 190, fixed: 'left', sortable: true },
        { prop: 'studentName', label: '学生姓名', width: 110, sortable: true },
        { prop: 'contactInfo', label: '家长手机号', width: 150, sortable: true },
        { prop: 'orderTypeZS', label: '卡状态', width: 90, sortable: true },
        { prop: 'channelName', label: '渠道名称', width: 200, sortable: true },
        { prop: 'unionAccount', label: '蜂窝账号', width: 180, sortable: true },
        { prop: 'realStatus', label: '实名状态', width: 110, sortable: true },
        { prop: 'realDateTime', label: '实名时间', width: 180, sortable: true },
        { prop: 'packageNickName', label: '当前有效套餐', width: 300 },
        { prop: 'currentPackagePayTypeCL', label: '当前套餐是否自动续期', width: 180 },
        { prop: 'currentPackageStartDateTime', label: '套餐计费开始时间', width: 160 },
        { prop: 'currentPackageEndDateTime', label: '套餐计费结束时间', width: 160, sortable: true },
        { prop: 'validMonth', label: '套餐有效期(月)', width: 120 },
        { prop: 'clearCycle', label: '套餐清零周期(月)', width: 130 },
        { prop: 'nextPackageName', label: '下一未生效套餐', width: 300 },
        { prop: 'nextPackagePayTypeCL', label: '下个套餐是否自动续期', width: 180 },
        { prop: 'operation', label: '操作', width: 100, fixed: 'right' }
      ],
      // 卡状态
      statusOptions: [
        { label: "未激活", value: 0 },
        { label: "已激活", value: 1 },
        { label: "已停用", value: 3 }
      ],
      // 查询字段
      queryCardInfoForm: {
        cardNo: null,
        iccid: null,
        studentName: null,
        contactInfo: null,
        cardStatus: null,
        channelId: null,
        currentPackage: null,
        nextPackage: null,
        fwAccount: null,
        province: null,
        orderEndDate: null,
        orderStartDate: null,
        page: 0,
        pageSize: 10
      },
      // 查询 套餐列表
      porductsListOptions: [],
      // 批量编辑
      editCardInfoVisible: false,
      selectListNumber: 0,
      cardNos: [],
      studentIds: [],
      realStatusList: [],
      realStatus: null,
      UnbundlingForm: {
        cardNo: null,
        reason: null
      },
      UnbundlingDialogVisible: false,
      AccountBalanceDialog: false,
      AccountBalanceForm: {
        remaindCanUse: null,
        comment: null,
        offBalance: null,
        studentIds: null,
        AdjustedBalance: null
      },
      UsagebalanceDialog: false,
      UsagebalanceForm: {
        comment: null,
        offContryDataBalance: null,
        offProvinceDataBalance: null,
        offVoiceBalance: null,
        studentIds: null,
        netWork1CanUse: null,
        netWork2CanUse: null,
        voiceCanUse: null
      },
      // 实名状态
      realStatusOptions: [
        { label: "未实名", value: 0 },
        { label: "已实名", value: 1 }
      ],
      RealstatusDialog: false,
      RealstatusForm: {
        comment: null,
        realStatus: null,
        studentIds: null
      },
      // 套餐变理
      PackagesChangeDialog: false,
      PackagesChangeForm: {
        balanceId: null,
        packageId: null,
        comment: null
      },
      studentPackageOptions: [],
      ChangePackageOptions: [],
      studentPackageDetailShow: false,
      studentPackageDetail: {
        contryNetBalance: null,
        endDateTime: null,
        packageName: null,
        payType: null,
        provinceNetBalance: null,
        startDateTime: null,
        validType: null,
        voiceBalance: null
      },
      changePackageDetailShow: false,
      changePackageDetail: {
        clearCycle: null,
        contryNetBalance: null,
        packageName: null,
        payType: null,
        provinceNetBalance: null,
        validMonth: null,
        voiceBalance: null
      },
      loading: false,
      removeShow: false,
      fwUnionAccountOptions: []
    };
  },
  mounted () {
    this.getCardInfolist();
    this.getPorductsListOptions()
    this.getfwUnionAccountOptions()
  },
  watch: {},
  methods: {
    // 获取渠道的值 来自 子组件
    channelSelectId (channelSelectId) {
      this.queryCardInfoForm.channelId = channelSelectId
    },
    //获取 卡信息 列表
    getCardInfolist () {
      let params = this.queryCardInfoForm
      this.loading = true
      API.apiCardInfoList(params).then(res => {
        if (res.resultCode === 0) {
          this.cardInfoList = res.data
          this.total = res.rowNum
          console.log(this.cardInfoList);
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryCardInfoForm.pageSize = newSize
      this.getCardInfolist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(`当前页: ${newPage}`);
      this.queryCardInfoForm.page = newPage - 1
      this.getCardInfolist()
    },
    // 点击 查询按钮
    queryCardInfo () {
      if (this.queryCardInfoForm.cardNo === '') {
        this.queryCardInfoForm.cardNo = null
      }
      if (this.queryCardInfoForm.iccid === '') {
        this.queryCardInfoForm.iccid = null
      }
      if (this.queryCardInfoForm.studentName === '') {
        this.queryCardInfoForm.studentName = null
      }
      if (this.queryCardInfoForm.contactInfo === '') {
        this.queryCardInfoForm.contactInfo = null
      }
      if (this.queryCardInfoForm.cardStatus === '') {
        this.queryCardInfoForm.cardStatus = null
      }
      if (this.queryCardInfoForm.channelId === '') {
        this.queryCardInfoForm.channelId = null
      }
      if (this.queryCardInfoForm.currentPackage === '') {
        this.queryCardInfoForm.currentPackage = null
      }
      if (this.queryCardInfoForm.nextPackage === '') {
        this.queryCardInfoForm.nextPackage = null
      }
      if (this.queryCardInfoForm.fwAccount === '') {
        this.queryCardInfoForm.fwAccount = null
      }
      if (this.queryCardInfoForm.province === '') {
        this.queryCardInfoForm.province = null
      }
      if (this.queryCardInfoForm.orderEndDate === '') {
        this.queryCardInfoForm.orderEndDate = null
      }
      if (this.queryCardInfoForm.orderStartDate === '') {
        this.queryCardInfoForm.orderStartDate = null
      }
      this.getCardInfolist()
    },
    startTimeChange () {
      this.queryCardInfoForm.orderStartDate = `${this.queryCardInfoForm.orderStartDate} 00:00:00`
    },
    endTimeChange () {
      this.queryCardInfoForm.orderEndDate = `${this.queryCardInfoForm.orderEndDate} 23:59:59`
    },
    // 获取套餐列表
    getPorductsListOptions () {
      const data = {
        page: 0,
        pageSize: 10000,
        packageType: 0
      }
      API.apiPackagesList(data).then(res => {
        if (res.resultCode === 0) {
          this.porductsListOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听查询参数 当前套餐
    currentPackageChange (vId) {
      console.log(vId);
      let obj = {};
      obj = this.porductsListOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.packageId === vId; // 筛选出匹配数据
      });
      this.queryCardInfoForm.currentPackage = obj.packageName
    },
    // 监听查询参数 下月未生效套餐
    nextPackageChange (vId) {
      console.log(vId);
      let obj = {};
      obj = this.porductsListOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.packageId === vId; // 筛选出匹配数据
      });
      this.queryCardInfoForm.nextPackage = obj.packageName
    },
    // 获取蜂窝账号
    getfwUnionAccountOptions () {
      const data = {
        page: 0,
        pageSize: 1000,
      }
      API.apiFwAccountList(data).then(res => {
        if (res.resultCode === 0) {
          this.fwUnionAccountOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听蜂窝账号
    fwUnionAccount (vId) {
      let obj = {};
      obj = this.fwUnionAccountOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      this.queryCardInfoForm.fwAccount = obj.fwAccount
    },
    // 点击到详情
    goDetail ($item) {
      const iccid = $item.iccid
      const cardNo = $item.cardNo
      sessionStorage.setItem('iccid', iccid)
      sessionStorage.setItem('cardNo', cardNo)
      this.$router.push({
        path: 'cardDetail',
        query: { iccid: iccid }
      })
    },
    // null 转 ''
    praseStrEmpty (str) {
      if (typeof str === 'undefined' || str === null) {
        return '';
      }
      return str;
    },
    //导出
    exportCardInfo () {
      API.apiCardsExport(this.queryCardInfoForm).then(res => {
        if (!res) {
          return
        }
        this.$message.success(`请前往“我的任务”中查询，id值为${res.data}`)
      })
    },
    // 监听全选按钮
    handleSelectionChange (val) {
      this.cardNos = Object.values(val).map(function (e) {
        return e.cardNo
      })
      this.studentIds = Object.values(val).map(function (e) {
        return e.studentId
      })
      this.realStatusList = Object.values(val).map(function (e) {
        return e.realStatus
      })
      if (this.realStatusList[0] === '未实名') {
        this.realStatus = 0
      } else {
        this.realStatus = 1
      }


      this.selectListNumber = val.length
    },

    // 编辑选中
    editSelected () {
      this.$refs.editModalRef.dialogVisible = true
    },
    // 编辑确定
    editCardInfoSuccess (data) {
      API.apiCardInfoEdit(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getCardInfolist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听添加用户对话框的关闭事件
    UnbundlingDialogClosed () {
      this.$refs.UnbundlingFormRef.resetFields()
    },
    // -------------- 解绑 --------------------
    // 单条解绑
    unbindCard (cardNo) {
      this.UnbundlingDialogVisible = true
      this.UnbundlingForm.cardNo = cardNo
    },
    // 解绑 提交
    UnbundlingConfirm () {
      const data = {
        phone: this.UnbundlingForm.cardNo
      }
      API.apiCardsUnbind(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功解绑！')
          this.getCardInfolist()
          // 提交之后，关闭弹框
          this.UnbundlingDialogVisible = false
          this.$refs.UnbundlingFormRef.resetFields()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // ----------- 调整金额 --------------
    // 点击调整金额按钮
    AccountBalanceShow () {
      this.AccountBalanceDialog = true
      const cardNo = this.cardNos[0]
      API.apiCardInfoDetail(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.AccountBalanceForm.remaindCanUse = res.data.remaindCanUse
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听调整金额值
    offBalanceValue () {
      this.AccountBalanceForm.AdjustedBalance = Number(this.AccountBalanceForm.offBalance) + Number(this.AccountBalanceForm.remaindCanUse)
    },
    // 调整金额提交
    AccountBalanceConfirm () {
      const data = {
        comment: this.AccountBalanceForm.comment,
        offBalance: this.AccountBalanceForm.offBalance,
        studentIds: this.studentIds
      }
      console.log(JSON.stringify(data));
      API.apiAccountBalanceModify(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功调整金额！')
          this.getCardInfolist()
          this.AccountBalanceDialog = false
          this.AccountBalanceForm.remaindCanUse = null
          this.AccountBalanceForm.comment = null
          this.AccountBalanceForm.offBalance = null
          this.AccountBalanceForm.studentIds = null
          this.AccountBalanceForm.AdjustedBalance = null
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 取消调整金额
    AccountBalanceClose () {
      this.AccountBalanceDialog = false
      this.AccountBalanceForm.remaindCanUse = null
      this.AccountBalanceForm.comment = null
      this.AccountBalanceForm.offBalance = null
      this.AccountBalanceForm.studentIds = null
      this.AccountBalanceForm.AdjustedBalance = null
    },
    // -------------------   调整用量 --------------
    UsagebalanceShow () {
      this.UsagebalanceDialog = true
      const cardNo = this.cardNos[0]
      API.apiCardInfoDetail(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.UsagebalanceForm.netWork1CanUse = res.data.netWork1CanUse
          this.UsagebalanceForm.netWork2CanUse = res.data.netWork2CanUse
          this.UsagebalanceForm.voiceCanUse = res.data.voiceCanUse
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    UsagebalanceConfirm () {
      const data = {
        comment: this.UsagebalanceForm.comment,
        offContryDataBalance: this.UsagebalanceForm.offContryDataBalance,
        offProvinceDataBalance: this.UsagebalanceForm.offProvinceDataBalance,
        offVoiceBalance: this.UsagebalanceForm.offVoiceBalance,
        studentIds: this.studentIds
      }
      console.log(JSON.stringify(data));
      API.apiUsagebalanceModify(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功调整用量！')
          this.getCardInfolist()
          this.UsagebalanceDialog = false
          this.UsagebalanceForm.comment = null
          this.UsagebalanceForm.offContryDataBalance = null
          this.UsagebalanceForm.offProvinceDataBalance = null
          this.UsagebalanceForm.offVoiceBalance = null
          this.UsagebalanceForm.studentIds = null
          this.UsagebalanceForm.netWork1CanUse = null
          this.UsagebalanceForm.netWork2CanUse = null
          this.UsagebalanceForm.voiceCanUse = null
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    UsagebalanceClose () {
      this.UsagebalanceDialog = false
      this.UsagebalanceForm.comment = null
      this.UsagebalanceForm.offContryDataBalance = null
      this.UsagebalanceForm.offProvinceDataBalance = null
      this.UsagebalanceForm.offVoiceBalance = null
      this.UsagebalanceForm.studentIds = null
      this.UsagebalanceForm.netWork1CanUse = null
      this.UsagebalanceForm.netWork2CanUse = null
      this.UsagebalanceForm.voiceCanUse = null
    },
    // 清空当前可用量
    UsagebalanceClear () {
      this.$confirm('您确认要清空当前可用量？')
        .then(() => {
          const data = {
            studentIds: this.studentIds
          }
          console.log(JSON.stringify(data));
          API.apiUsagebalanceClear(JSON.stringify(data)).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('成功清除当前可用量！')
              this.getCardInfolist()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        })
        .catch(() => {
        });
    },
    // ----------  修改实名状态----------------
    RealstatusShow () {
      this.RealstatusDialog = true
      this.RealstatusForm.realStatus = this.realStatus
    },
    RealstatusConfirm () {
      const data = {
        // comment: this.RealstatusForm.comment,
        realStatus: this.RealstatusForm.realStatus,
        studentIds: this.studentIds
      }
      console.log(JSON.stringify(data))
      API.apiRealstatusModify(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功修改实名状态！')
          this.getCardInfolist()
          this.RealstatusDialog = false
          // this.RealstatusForm.comment = null
          this.RealstatusForm.realStatus = null
          this.RealstatusForm.studentIds = null
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    RealstatusClose () {
      this.RealstatusDialog = false
      // this.RealstatusForm.comment = null
      this.RealstatusForm.realStatus = null
      this.RealstatusForm.studentIds = null
    },
    // -----------  套餐变更 -------------
    // 获取学生套餐
    getStudentPackage () {
      const data = {
        studentId: this.studentIds[0]
      }
      console.log(data);
      API.apiStudentBalances(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.studentPackageOptions = res.data
          console.log(this.studentPackageOptions);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取可更改的套餐
    getChangePackage () {
      const data = {
        studentId: this.studentIds[0]
      }
      console.log(data);
      API.apiStudentPackages(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.ChangePackageOptions = res.data
          console.log(this.ChangePackageOptions);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 选择 学生套餐
    studentPackageChange (vId) {
      let obj = {};
      obj = this.studentPackageOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.balanceId === vId; // 筛选出匹配数据
      });
      console.log(obj)
      if (obj) {
        this.studentPackageDetailShow = true
        this.studentPackageDetail.contryNetBalance = obj.contryNetBalance
        this.studentPackageDetail.endDateTime = obj.endDateTime
        this.studentPackageDetail.packageName = obj.packageName
        this.studentPackageDetail.payType = obj.payType
        this.studentPackageDetail.provinceNetBalance = obj.provinceNetBalance
        this.studentPackageDetail.startDateTime = obj.startDateTime
        this.studentPackageDetail.validType = obj.validType
        this.studentPackageDetail.voiceBalance = obj.voiceBalance
        this.studentPackageDetail.clearCycle = obj.clearCycle
        this.removeShow = true
      } else {
        this.studentPackageDetailShow = false
        this.removeShow = false
      }
    },
    // 监听 可更改的套餐
    changePackagesChange (vId) {
      let obj = {};
      obj = this.ChangePackageOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.packageId === vId; // 筛选出匹配数据
      });
      if (obj) {
        this.changePackageDetailShow = true
        this.changePackageDetail.clearCycle = obj.clearCycle
        this.changePackageDetail.contryNetBalance = obj.contryNetBalance
        this.changePackageDetail.packageName = obj.packageName
        this.changePackageDetail.payType = obj.payType
        this.changePackageDetail.provinceNetBalance = obj.provinceNetBalance
        this.changePackageDetail.validMonth = obj.validMonth
        this.changePackageDetail.voiceBalance = obj.voiceBalance
      } else {
        this.changePackageDetailShow = false
      }
    },
    PackagesChangeShow () {
      this.PackagesChangeDialog = true
      this.getStudentPackage()
      this.getChangePackage()
    },
    PackagesChangeConfirm () {
      const data = {
        balanceId: this.PackagesChangeForm.balanceId,
        packageId: this.PackagesChangeForm.packageId,
        description: this.PackagesChangeForm.comment
      }
      API.apiStudentPackagesChange(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功更改套餐！')
          this.getCardInfolist()
          this.PackagesChangeDialog = false
          this.PackagesChangeForm.comment = null
          this.studentPackageDetailShow = false
          this.changePackageDetailShow = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    PackagesChangeClose () {
      this.PackagesChangeDialog = false
      this.PackagesChangeForm.comment = null
      this.PackagesChangeForm.balanceId = null
      this.PackagesChangeForm.packageId = null
      this.studentPackageDetailShow = false
      this.changePackageDetailShow = false
      this.removeShow = false
    },
    // 清除所有套餐
    allPackageClear () {
      this.$confirm('您确认要清空该学生所有套餐？')
        .then(() => {
          const data = {
            studentId: this.studentIds[0]
          }
          console.log(JSON.stringify(data));
          API.apiStudentPackagesDelete(JSON.stringify(data)).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('成功清空该学生所有套餐！')
              this.getCardInfolist()
              this.getStudentPackage()
              this.getChangePackage()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        })
        .catch(() => {
        });
    },
    // 删除所选套餐
    allPackageClearRemove () {
      this.$confirm('您确认要清除所选套餐吗？')
        .then(() => {
          const data = {
            balanceId: this.PackagesChangeForm.balanceId
          }
          console.log(JSON.stringify(data));
          API.apiStudentPackagesRemove(JSON.stringify(data)).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('成功清除所选套餐！')
              this.getCardInfolist()
              this.getStudentPackage()
              this.getChangePackage()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        })
        .catch(() => { });
    }
  }
};
</script>
<style scoped>
</style>
