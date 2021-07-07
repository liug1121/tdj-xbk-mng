<template>
  <div class="box_subject" style="overflow: auto;">
    <el-card class="card_content">
      <div class="detail">
        <div class="detailLogo">
          <img src="../../assets/images/logo_1.png" alt="">
        </div>
        <div class="main">
          <div class="detailHearder">
            <div class="detailHearderLeft">ICCID: {{ICCID}}</div>
            <div class="detailHearderRight">
              <el-button type="info" size="small" disabled>调账</el-button>
              <el-button type="primary" size="small" disabled>数据同步</el-button>
            </div>
          </div>
          <div class="detailMain">
            <div class="detailMainContent">
              <p>卡号码：{{cardDetail.cardNo}}</p>
              <p>激活时间：{{cardDetail.activeDate}}</p>
              <p>总金额：{{cardDetail.remaind}}</p>
              <p>蜂窝平台账户：{{cardDetail.fwAccount}}</p>
            </div>
            <div class="detailMainContent">
              <p>卡状态：
                <span v-if="cardDetail.cardStatus === '0'">未使用</span>
                <span v-if="cardDetail.cardStatus === '1'">已使用</span>
                <span v-if="cardDetail.cardStatus === '3'">已停用</span>
              </p>

              <p>当前使用套餐：{{cardDetail.packageName}}</p>
              <p>渠道：{{cardDetail.channelName}}</p>
              <p>当前通信计划：{{cardDetail.cardPlan}}</p>
            </div>
            <div class="detailMainContent dmright">
              <div class="money">
                <p>冻结金额</p>
                <p>￥{{cardDetail.remaindCanNotUse}}</p>
              </div>
              <div class="money">
                <p>可用金额</p>
                <p>￥{{cardDetail.remaindCanUse}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="meal_content">
      <div slot="header" class="header_tit">
        <span>用户信息</span>
      </div>
      <div class="detailMain">
        <div class="detailMainContent">
          <p>申请人姓名：{{cardDetail.orderName}}</p>
          <p>学生姓名：{{cardDetail.studentName}}</p>
        </div>
        <div class="detailMainContent">
          <p>申请人手机：{{cardDetail.orderPhone}}</p>
          <p>家长手机号：{{cardDetail.parentPhone}}</p>
        </div>
        <div class="detailMainContent">
          <p>配送区域：{{cardDetail.orderProvince}}{{cardDetail.orderCity}}{{cardDetail.orderdistrict}}</p>
          <p>发货地址：{{cardDetail.address}}</p>
        </div>
      </div>
    </el-card>
    <el-card class="meal_content">
      <div slot="header" class="header_tit">
        <span>当前套餐</span>
      </div>
      <div class="detailMain">
        <div class="detailMainContent">
          <p>全国流量已使用：{{cardDetail.netWork1Used}} MB</p>
          <p>全国流量剩余：{{cardDetail.netWork1CanUse}} MB</p>
        </div>
        <div class="detailMainContent">
          <p>省内流量已使用：{{cardDetail.netWork2Used}} MB</p>
          <p>省内流量剩余：{{cardDetail.netWork2CanUse}} MB</p>
        </div>
        <div class="detailMainContent">
          <p>语音已使用：{{cardDetail.voiceUsed}} 分钟</p>
          <p>语音剩余：{{cardDetail.voiceCanUse}} 分钟</p>
        </div>
      </div>
    </el-card>
    <el-card class="meal_content">
      <div slot="header" class="header_tit">
        <span>当前通信计划</span>
      </div>
      <div class="detailMain">
        <div class="detailMainContent">
          <p>全国流量：
            <i v-if="cardDetail.netWork1Status === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
            <i v-else-if="cardDetail.netWork1Status === '0'" class="el-icon-s-opportunity"></i>
          </p>
        </div>
        <div class="detailMainContent">
          <p>省内流量：
            <i v-if="cardDetail.netWork2Status === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
            <i v-else-if="cardDetail.netWork2Status === '0'" class="el-icon-s-opportunity"></i>
          </p>
        </div>
        <div class="detailMainContent">
          <p>呼出：
            <i v-if="cardDetail.voiceOutStatus === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
            <i v-else-if="cardDetail.voiceOutStatus === '0'" class="el-icon-s-opportunity"></i>
          </p>
        </div>
        <div class="detailMainContent">
          <p>呼入：
            <i v-if="cardDetail.voiceInStatus === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
            <i v-else-if="cardDetail.voiceInStatus === '0'" class="el-icon-s-opportunity"></i>
          </p>
        </div>
      </div>
    </el-card>
    <el-card class="tab_content">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="充值记录" name="RechargeChange">
          <!-- <stable :column="RechargeRecord" :tableData="RechargeRecordList">
          </stable> -->
          <el-table :data="RechargeRecordList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in RechargeRecord" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <!-- <template slot-scope="scope">
                <div v-if="p.prop == 'operation'">
                  <el-button size="mini" type="warning" plain @click="enable(scope.row)">退款</el-button>
                </div>
                <div v-else>
                  <div v-html="scope.row[p.prop]" />
                </div>
              </template> -->
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="套餐变量记录" name="PackageChange">
          <stable :column="packageRecord" :tableData="packageRecordList"></stable>
        </el-tab-pane>
        <el-tab-pane label="通信计划变更记录" name="signalChange">
          <!-- <stable :column="signalRecord" :tableData="signalRecordList"></stable> -->
          <el-table :data="signalRecordList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in signalRecord" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'smsInStatusCL'">
                  <i v-if="scope.row.smsInStatus === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
                  <i v-else class="el-icon-s-opportunity"></i>
                </div>
                <div v-if="p.prop == 'smsOutStatusCL'">
                  <i v-if="scope.row.smsOutStatus === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
                  <i v-else class="el-icon-s-opportunity"></i>
                </div>
                <div v-if="p.prop == 'voiceOutStatusCL'">
                  <i v-if="scope.row.voiceOutStatus === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
                  <i v-else class="el-icon-s-opportunity"></i>
                </div>
                <div v-if="p.prop == 'voiceInStatusCL'">
                  <i v-if="scope.row.voiceInStatus === '1'" class="el-icon-s-opportunity" style="color:#F8E409"></i>
                  <i v-else class="el-icon-s-opportunity"></i>
                </div>
                <div v-if="p.prop == 'operation'">
                  <el-button size="mini" type="warning" plain @click="enable(scope.row)">退款</el-button>
                </div>
                <div v-else>
                  <div v-html="scope.row[p.prop]" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="记账明细" name="detailed">
          <!-- <stable :column="bookkeepingRecord" :tableData="bookkeepingRecordList"></stable> -->
          <el-table :data="bookkeepingRecordList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in bookkeepingRecord" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'billingTypeCL'">
                  <span v-if="scope.row.billingType ===0">充值</span>
                  <span v-if="scope.row.billingType ===1">购买加油包</span>
                  <span v-if="scope.row.billingType ===2">购买套餐</span>
                  <span v-if="scope.row.billingType ===3">套餐变更</span>
                  <span v-if="scope.row.billingType ===4">用量变更</span>
                  <span v-if="scope.row.billingType ===5">卡费</span>
                  <span v-if="scope.row.billingType ===6">月套餐</span>
                </div>
                <div v-if="p.prop == 'optTypeCL'">
                  <span v-if="scope.row.optType ===0">充值</span>
                  <span v-if="scope.row.optType ===1">购买加油包</span>
                  <span v-if="scope.row.optType ===2">购买套餐</span>
                  <span v-if="scope.row.optType ===3">套餐变更</span>
                  <span v-if="scope.row.optType ===4">用量变更</span>
                  <span v-if="scope.row.optType ===5">卡费</span>
                  <span v-if="scope.row.optType ===6">月套餐</span>
                </div>
                <div v-if="p.prop == 'remaindCanUseACL'">
                  {{(Number(scope.row.remaind) + Number(scope.row.price)).toFixed(2)}}
                </div>
                <div v-else>
                  <div v-html="scope.row[p.prop]" />
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="月账单" name="MonthlyBill">
          <stable :column="monthRecord" :tableData="monthRecordList"></stable>
        </el-tab-pane>

        <el-tab-pane label="通话记录" name="CallLog">
          <!-- <stable :column="VoiceRecord" :tableData="VoiceRecordList"></stable> -->
          <el-table :data="VoiceRecordList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in VoiceRecord" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'typeCL'">
                  <span v-if="scope.row.type ===0">呼出</span>
                  <span v-else>呼入</span>
                </div>
                <div v-if="p.prop == 'durationCL'">
                  <!-- {{(Number(scope.row.duration)/60).toFixed(2)}} -->
                  {{Math.round((parseInt(Number(scope.row.duration)/ 60) +Number(scope.row.duration) % 60 /60 ) *100 ) /100}}
                </div>
                <div v-else>
                  <div v-html="scope.row[p.prop]" />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination @size-change="VoicehandleSizeChange" @current-change="VoicehandleCurrentChange" :current-page="VoicequeryInfo.page" :page-sizes="[10,20,30]" :page-size="VoicequeryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="Voicetotal">
          </el-pagination>
        </el-tab-pane>

        <el-tab-pane label="上网记录" name="OnlineRecords">
          <!-- <stable :column="NetworkRecord" :tableData="NetworkRecordList"></stable> -->
          <el-table :data="NetworkRecordList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in NetworkRecord" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'typeCL'">
                  <span v-if="scope.row.type ===0">呼出</span>
                  <span v-else>呼入</span>
                </div>
                <div v-if="p.prop == 'durationCL'">
                  <!-- {{(Number(scope.row.duration)/60).toFixed(2)}} -->
                  {{Math.round((parseInt(Number(scope.row.duration)/ 60) +Number(scope.row.duration) % 60 /60 ) *100 ) /100}}
                </div>
                <div v-if="p.prop == 'usageCL'">
                  {{(Number(scope.row.usage)/1024).toFixed(2)}}
                  <!-- {{Math.round((parseInt(Number(scope.row.usage)/ 60) +Number(scope.row.usage) % 60 /60 ) *100 ) /100}} -->
                </div>
                <div v-else>
                  <div v-html="scope.row[p.prop]" />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination @size-change="NethandleSizeChange" @current-change="NethandleCurrentChange" :current-page="NetqueryInfo.page" :page-sizes="[10,20,30]" :page-size="NetqueryInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper" :total="Nettotal">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
import stable from 'components/table'
import API from 'api/cardInfo'
export default {
  data () {
    return {
      cardDetail: {},
      activeName: 'PackageChange',
      ICCID: '',
      // 充值记录
      RechargeRecord: [
        { prop: 'date', label: '充值时间' },
        { prop: 'remaind', label: '充值金额' },
        { prop: '', label: '微信支付订单号' },
        { prop: 'operation', label: '操作' },
      ],
      RechargeRecordList: [],
      // 套餐变更记录
      packageRecord: [
        { prop: 'packageName', label: '套餐名称' },
        { prop: 'voiceDesc', label: '语音' },
        { prop: 'netWorkDesc', label: '流量' },
        { prop: 'price', label: '金额' },
        { prop: 'date', label: '变量时间' }
      ],
      packageRecordList: [],
      // 通信计划变更记录
      signalRecord: [
        { prop: 'date', label: '变更时间' },
        { prop: 'planName', label: '通信计划', width: 250 },
        { prop: 'voiceOutStatusCL', label: '呼出' },
        { prop: 'voiceInStatusCL', label: '呼入' },
        { prop: 'netWorkStatus', label: '流量' },
        { prop: 'planStatus', label: '计划状态' },
        { prop: 'operator', label: '操作人' }
      ],
      signalRecordList: [],
      // 记账明细
      bookkeepingRecord: [
        { prop: 'id', label: '流水ID' },
        { prop: 'billingTypeCL', label: '记账类型' },
        { prop: 'optTypeCL', label: '操作类型' },
        { prop: 'price', label: '发生金额' },
        { prop: 'remaind', label: '总金额' },
        { prop: 'remaindCanUseACL', label: '可用金额' },
        { prop: 'remaindCanNotUse', label: '冻结金额' },
        { prop: 'description', label: '说明' },
        { prop: 'date', label: '记账时间' }
      ],
      bookkeepingRecordList: [],
      // 月账单
      monthRecord: [
        { prop: 'voiceUsed', label: '语音已使用' },
        { prop: 'smsUsed', label: '短信已使用' },
        { prop: 'netWorkUsed', label: '流量已使用' },
        { prop: 'packagePrice', label: '套餐费' },
        { prop: 'addedPackagePrice', label: '加油包费' },
        { prop: 'overPrice', label: '套外费用' },
        { prop: 'billingPrice', label: '总费用' }
      ],
      monthRecordList: [],
      // 通话记录
      VoiceRecord: [
        { prop: 'typeCL', label: '呼叫类型' },
        { prop: 'targetPhone', label: '对方号码' },
        { prop: 'startTime', label: '开始时间' },
        { prop: 'endTime', label: '结束时间' },
        { prop: 'durationCL', label: '时长(分钟)' }
      ],
      VoicequeryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      // 列表总条数
      Voicetotal: 0,
      VoiceRecordList: [],
      // 上网记录
      NetworkRecord: [
        { prop: 'startTime', label: '时间' },
        { prop: 'durationCL', label: '时长(分钟)' },
        { prop: 'usageCL', label: '用量(MB)' }
      ],
      NetqueryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      // 列表总条数
      Nettotal: 0,
      NetworkRecordList: []
    }
  },
  components: { stable },
  created () {
    this.ICCID = sessionStorage.getItem('iccid')
    this.cardDetailData()
    this.getPackageRecordList()
    this.getSignalRecordList()
    this.getBookkeepingRecordList()
    this.getMonthRecordList()
    this.getVoiceRecordList()
    this.getNetworkRecordList()
  },
  methods: {
    // 获取卡详情数据
    cardDetailData () {
      // const iccid = this.$route.query.iccid
      const cardNo = sessionStorage.getItem('cardNo')
      // console.log(orderNo)
      API.apiCardInfoDetail(cardNo).then(res => {
        if (res.resultCode === 0) {
          this.cardDetail = res.data
          // console.log(this.cardDetail)
          // this.$message.success('加载成功')
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取套餐变量列表 packageRecordList
    getPackageRecordList () {
      const data = {
        cardNo: sessionStorage.getItem('cardNo'),
        page: 0,
        pageSize: 100
      }
      API.apiDetailsPakcagechanges(data).then(res => {
        if (res.resultCode === 0) {
          this.packageRecordList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 通信计划变更记录 signalRecordList
    getSignalRecordList () {
      const data = {
        cardNo: sessionStorage.getItem('cardNo'),
        page: 0,
        pageSize: 100
      }
      API.apiDetailsPhoneplanchanges(data).then(res => {
        if (res.resultCode === 0) {
          this.signalRecordList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    // 记账明细 bookkeepingRecordList
    getBookkeepingRecordList () {
      const data = {
        cardNo: sessionStorage.getItem('cardNo'),
        page: 0,
        pageSize: 100
      }
      console.log(data);

      API.apiDetailsBillingchanges(data).then(res => {
        if (res.resultCode === 0) {
          this.bookkeepingRecordList = res.data
          console.log(this.bookkeepingRecordList)
          // 充值金额
          this.RechargeRecordList = res.data.filter(item => {
            return item.billingType === 0
          }).map(item => {
            return item
          })
          console.log(this.RechargeRecordList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 月账单 monthRecordList
    getMonthRecordList () {
      // const data = {
      //   cardNo: sessionStorage.getItem('cardNo'),
      //   page: 0,
      //   pageSize: 100
      // }
      // API.apiDetailsBillings(data).then(res => {
      //   if (res.resultCode === 0) {
      //     this.monthRecordList = res.data
      //   } else {
      //     this.$message.error(res.resultInfo)
      //   }
      // })
    },
    // 通话记录 VoiceRecordList
    getVoiceRecordList () {
      let querycardNo = {
        cardNo: sessionStorage.getItem('cardNo')
      }
      let params = Object.assign(
        this.VoicequeryInfo,
        querycardNo
      );
      API.apiDetailsVoicedetails(params).then(res => {
        if (res.resultCode === 0) {
          this.VoiceRecordList = res.data
          this.Voicetotal = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    VoicehandleSizeChange (newSize) {
      this.VoicequeryInfo.pageSize = newSize
      this.getVoiceRecordList()
    },
    // 监听 页码值 改变的事件
    VoicehandleCurrentChange (newPage) {
      this.VoicequeryInfo.page = newPage - 1
      this.getVoiceRecordList()
    },
    // 上网记录 NetworkRecordList
    getNetworkRecordList () {
      let querycardNo = {
        cardNo: sessionStorage.getItem('cardNo')
      }
      let params = Object.assign(
        this.NetqueryInfo,
        querycardNo
      );
      API.apiDetailsNetworkdetails(params).then(res => {
        if (res.resultCode === 0) {
          this.NetworkRecordList = res.data
          this.Nettotal = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    NethandleSizeChange (newSize) {
      this.NetqueryInfo.pageSize = newSize
      this.getNetworkRecordList()
    },
    // 监听 页码值 改变的事件
    NethandleCurrentChange (newPage) {
      this.NetqueryInfo.page = newPage - 1
      this.getNetworkRecordList()
    },
    handleClick (tab, event) { }
  }
};
</script>
<style scope>
.el-card {
  height: auto;
  margin-bottom: 10px;
}
.card_content,
.meal_content,
.tab_content {
  margin: 10px;
  width: auto;
  overflow: hidden;
}
.card_content .el-card__body {
  overflow: hidden;
}
/* 个人信息 */
.detail {
  display: flex;
}
.detailLogo {
  flex: 0 1 auto;
  margin-right: 16px;
  padding-top: 1px;
}
.detailLogo > img {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  display: block;
}
.main {
  flex: 1;
}
.detailHearder {
  width: 100%;
  display: flex;
  align-items: center;
}
.detailHearderLeft {
  font-size: 20px;
  font-weight: 500;
  flex: 1;
}
.detailHearderRight {
  text-align: center;
}
.detailMain {
  display: flex;
  margin-top: 10px;
}
.detailMainContent > p,
.money > p {
  font-size: 14px;
  line-height: 24px;
}
.detailMainContent {
  flex: 1;
}
.dmright {
  display: flex;
}
.dmright .money {
  flex: 1;
}
/* 套餐信息 */
.meal_content .el-card__header {
  padding: 10px !important;
}
.header_tit {
  font-size: 16px;
}
.meal_detail,
.signal_detail {
  overflow: hidden;
}
.meal_detail li {
  float: left;
  width: 16.666%;
  line-height: 30px;
}
.signal_detail li {
  width: 33.33%;
  float: left;
  line-height: 30px;
}
.detailMain {
  display: flex;
}
/* 流水记录部分 */
.tab_content .el-card__body {
  padding: 10px 10px 15px 10px;
}
</style>