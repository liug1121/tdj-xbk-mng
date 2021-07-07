<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form ref="queryPayRecordsRef" :inline="true" :model="queryPayRecordsForm">
        <el-form-item label="支付订单号" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPayRecordsForm.wechatPayNo" clearable placeholder="请输入支付订单号" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="卡号码" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPayRecordsForm.studentCardNo" clearable placeholder="请输入卡号码" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="ICCID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryPayRecordsForm.stuentCardIccid" clearable placeholder="请输入ICCID" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <channelSelect style="width:200px !important" @channelSelectId="channelSelectId" @channelSelectName="channelSelectName"></channelSelect>
        </el-form-item>
        <el-form-item label="订单状态" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPayRecordsForm.status" clearable placeholder="请选择订单状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道商品" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPayRecordsForm.goodName" clearable filterable placeholder="请输入渠道商品关键词" style="width:230px" @change="goodsChange">
            <el-option v-for="item in goodsListOptions" :key="item.id" :label="item.packageName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="蜂窝账号" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPayRecordsForm.fwUnionAccount" clearable filterable placeholder="请输入蜂窝账号关键词" style="width:230px" @change="fwUnionAccount">
            <el-option v-for="item in fwUnionAccountOptions" :key="item.id" :label="item.fwAccount" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="消费类型" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryPayRecordsForm.payType" clearable placeholder="请选择消费类型">
            <el-option v-for="item in payTpeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="充值时间" class="queryFormItem">
          <el-date-picker style="width:140px" v-model="queryPayRecordsForm.startDateTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px" v-model="queryPayRecordsForm.endDateTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryPayRecords">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 列表区域 -->
      <el-table v-loading="loading" :data="PayRecordsList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop =='payTypeCL'">
              <div v-if="scope.row.payType === 0">充值</div>
              <div v-if="scope.row.payType === 1">购买加油包</div>
              <div v-if="scope.row.payType === 2">购买套餐</div>
              <div v-if="scope.row.payType === 3">套餐变更</div>
              <div v-if="scope.row.payType === 4">用量变更</div>
              <div v-if="scope.row.payType === 5">卡费</div>
              <div v-if="scope.row.payType === 6">月套餐</div>
            </div>
            <div v-if="p.prop == 'statusCL'">
              <div v-if="scope.row.status === 1">支付成功</div>
              <div v-if="scope.row.status === 0">支付失败</div>
              <div v-if="scope.row.status === -1">支付失败</div>
              <div v-if="scope.row.status === 5">支付成功</div>
              <div v-if="scope.row.status === 6">支付成功</div>
              <div v-if="scope.row.status === 7">支付成功</div>
              <div v-if="scope.row.status === 8">已退款</div>
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="operation" label="操作" width="270" align="center">
          <template slot-scope="scope">
            <el-button v-if="!scope.row.DetailList" type="warning" size="mini" plain @click="goApplyRefund(scope.row)">申请退款</el-button>
            <div v-if="scope.row.DetailList">
              <el-button v-if="scope.row.DetailList[0].opt_type === 0" type="primary" size="mini" plain @click="goReviewed(scope.row)">申请待审核</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 2" type="success" size="mini" plain @click="goRefund(scope.row)">审核通过</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 1" type="danger" size="mini" plain>审核拒绝</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 1" type="warning" size="mini" plain @click="goApplyRefund(scope.row)">申请退款</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 3" type="success" size="mini" plain>退款完成</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 4" type="success" size="mini" plain>已经退款</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 1" type="danger" size="mini" plain>退款拒绝</el-button>
              <el-button v-if="scope.row.DetailList[0].opt_type === 1" type="warning" size="mini" plain @click="goApplyRefund(scope.row)">申请退款</el-button>
              <el-button v-if="scope.row.flowId !== -1" type="primary" size="mini" plain @click="goDetail(scope.row)">详情</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 申请退款/退款审核/财务退款 共用一个弹出框 -->
    <el-dialog :title="applyRefundTitle" :visible.sync="applyRefundDialog" width="450px" @close="applyRefundClose">
      <!-- 内容主体区域 -->
      <el-form :model="applyRefundForm" ref="applyRefundFormRef" label-width="110px">
        <div class="formItem">
          <div class="formLabel">渠道</div>
          <div class="formText">{{applyRefundForm.channelName}}</div>
        </div>
        <div class="formItem">
          <div class="formLabel">收款公司</div>
          <div class="formText">{{applyRefundForm.toCompanyName}}</div>
        </div>
        <div class="formItem">
          <div class="formLabel">公众号</div>
          <div class="formText">{{applyRefundForm.officeName}}</div>
        </div>
        <div class="formItem">
          <div class="formLabel">支付订单号</div>
          <div class="formText">{{applyRefundForm.wechatPayNo}}</div>
        </div>
        <div class="formItem">
          <div class="formLabel">产品</div>
          <div class="formText">{{applyRefundForm.goodName}}</div>
        </div>
        <div class="formItem">
          <div class="formLabel">消费金额</div>
          <div class="formText">{{applyRefundForm.payPrice}} 元</div>
        </div>
        <div class="formItem" v-show="applyRefundShow1">
          <div class="formLabel">申请退款金额</div>
          <div class="formText">{{applyRefundForm.payPrice}} 元</div>
        </div>
        <div class="formItem" v-show="applyRefundShow1">
          <div class="formLabel">申请退款时间</div>
          <div class="formText">{{applyRefundForm.ReviewedCreate_time}}</div>
        </div>
        <div class="formItem" v-show="applyRefundShow1">
          <div class="formLabel">退款原因</div>
          <div class="formText">{{applyRefundForm.ReviewedDesc}}</div>
        </div>
        <div class="formItem" v-show="applyRefundShow2">
          <div class="formLabel">审核备注</div>
          <div class="formText">{{applyRefundForm.RefundDesc}}</div>
        </div>
        <el-form-item label="申请退款金额" v-show="applyRefundShow">
          <el-input size="small" style="width:300px;" v-model.number="applyRefundForm.price" placeholder="请输入申请退款金额"></el-input>
        </el-form-item>
        <el-form-item :label="applyRefundLabel">
          <el-input size="small" style="width:300px;" v-model="applyRefundForm.desc" :placeholder="applyRefundPlaceholder"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="applyRefundClose">取 消</el-button>
        <el-button size="small" type="primary" @click="applyRefundConfirm" v-show="applyRefundShow">提交申请</el-button>
        <el-button size="small" type="primary" @click="ReviewedConfirm(2)" v-show="applyRefundShow0">审核通过</el-button>
        <el-button size="small" type="danger" @click="ReviewedConfirm(1)" v-show="applyRefundShow0">审核拒绝</el-button>
        <el-button size="small" type="primary" @click="ReviewedConfirm(3)" v-show="applyRefundShow2">退款完成</el-button>
        <el-button size="small" type="danger" @click="ReviewedConfirm(1)" v-show="applyRefundShow2">拒绝退款</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from 'api/StatisticsBill'
import channelSelect from './../sale/channelSelect'
export default {
  components: {
    channelSelect
  },
  data () {
    return {
      // 卡信息列表
      PayRecordsList: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'id', label: '流水ID', width: 120, fixed: 'left' },
        { prop: 'payTypeCL', label: '消费类型', width: 80 },
        { prop: 'payPrice', label: '消费金额', width: 80 },
        { prop: 'goodName', label: '渠道商品', width: 180 },
        { prop: 'studentCardNo', label: '卡号码', width: 120 },
        { prop: 'stuentCardIccid', label: 'ICCID', width: 190 },
        { prop: 'fwUnionAccount', label: '蜂窝账号', width: 130 },
        { prop: 'wechatPayNo', label: '支付订单号', width: 240 },
        { prop: 'payDateTime', label: '支付时间', width: 160 },
        { prop: 'toCompanyName', label: '收款公司', width: 130 },
        { prop: 'channelName', label: '渠道', width: 200 },
        { prop: 'officeName', label: '公众号', width: 140 },
        { prop: 'orderId', label: '订单号', width: 190 },
        { prop: 'statusCL', label: '订单状态', width: 100 },
      ],
      // 卡状态
      statusOptions: [
        { label: '已支付', value: 1 },
        { label: '未支付', value: 0 },
        { label: '支付失败', value: -1 },
        { label: '开卡', value: 5 },
        { label: '发货', value: 6 }
      ],
      payTpeOptions: [
        { label: '充值', value: 0 },
        { label: '购买加油包', value: 1 },
        { label: '购买套餐', value: 2 },
        { label: '套餐变更', value: 3 },
        { label: '用量变更', value: 4 },
        { label: '卡费', value: 5 },
        { label: '月套餐', value: 6 }
      ],
      // 查询字段
      queryPayRecordsForm: {
        channelName: null,
        endDateTime: null,
        fwUnionAccount: null,
        goodName: null,
        payType: null,
        startDateTime: null,
        status: null,
        studentCardNo: null,
        stuentCardIccid: null,
        wechatPayNo: null,
        page: 0,
        pageSize: 10
      },
      // 查询 套餐列表
      goodsListOptions: [],
      fwUnionAccountOptions: [],
      loading: false,
      applyRefundDialog: false,
      applyRefundTitle: '申请退款',
      applyRefundLabel: '退款原因',
      applyRefundPlaceholder: '请输入退款原因',
      applyRefundForm: {
        channelName: null,
        toCompanyName: null,
        officeName: null,
        wechatPayNo: null,
        goodName: null,
        payPrice: null,
        referId: null,
        price: null,
        desc: null,
        type: null,
        ReviewedPrice: null,
        ReviewedCreate_time: null,
        ReviewedDesc: null,
        RefundDesc: null
      },
      applyRefundShow: true,
      applyRefundShow1: false,
      applyRefundShow2: false,
      applyRefundShow0: false,
    };
  },
  mounted () {
    this.getPayRecordslist()
    this.getfwUnionAccountOptions()
  },
  watch: {
  },
  methods: {
    // 获取渠道的值 来自 子组件
    channelSelectId (channelSelectId) {
      this.getPorductsListOptions(channelSelectId)
    },
    channelSelectName ($name) {
      this.queryPayRecordsForm.channelName = $name
    },
    // 根据渠道获取商品列表
    getPorductsListOptions (channelSelectId) {
      const data = {
        page: 0,
        pageSize: 100,
        channelId: channelSelectId
      }
      API.apichannelsPackagesList(data).then(res => {
        if (res.resultCode === 0) {
          this.goodsListOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听商品
    goodsChange (vId) {
      let obj = {};
      obj = this.goodsListOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      this.queryPayRecordsForm.goodName = obj.packageName
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
      this.queryPayRecordsForm.fwUnionAccount = obj.fwAccount
    },
    //获取 支付记录 列表
    getPayRecordslist () {
      let params = this.queryPayRecordsForm
      this.loading = true
      API.apiPayRecordsList(params).then(res => {
        if (res.resultCode === 0) {
          const list = res.data
          for (let i = 0; i < list.length; i++) {
            const element = list[i];
            const data = {
              referId: element.id,
              type: 0
            }
            API.apiFlowQuery(data).then(res => {
              if (res.resultCode === 0) {
                // vue修改数据页面不重新渲染
                // 第一种方式
                element.flowId = res.data
                this.$forceUpdate();
                this.loading = false
                const data = {
                  flowId: element.flowId
                }
                API.apiFlowDetail(data).then(res => {
                  if (res.resultCode === 0) {
                    if (res.data.length !== 0) {
                      element.DetailList = res.data.reverse()
                      this.$forceUpdate();
                    }
                  } else {
                    this.$message.error(res.resultInfo)
                  }
                })
              } else {
                this.$message.error(res.resultInfo)
              }
            })
          }
          this.PayRecordsList = list
          console.log(this.PayRecordsList);
          this.total = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryPayRecordsForm.pageSize = newSize
      this.getPayRecordslist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(`当前页: ${newPage}`);
      this.queryPayRecordsForm.page = newPage - 1
      this.getPayRecordslist()
    },
    // 点击 查询按钮
    queryPayRecords () {
      if (this.queryPayRecordsForm.channelName === '') {
        this.queryPayRecordsForm.channelName = null
      }
      if (this.queryPayRecordsForm.endDateTime === '') {
        this.queryPayRecordsForm.endDateTime = null
      }
      if (this.queryPayRecordsForm.fwUnionAccount === '') {
        this.queryPayRecordsForm.fwUnionAccount = null
      }
      if (this.queryPayRecordsForm.goodName === '') {
        this.queryPayRecordsForm.goodName = null
      }
      if (this.queryPayRecordsForm.payType === '') {
        this.queryPayRecordsForm.payType = null
      }
      if (this.queryPayRecordsForm.startDateTime === '') {
        this.queryPayRecordsForm.startDateTime = null
      }
      if (this.queryPayRecordsForm.status === '') {
        this.queryPayRecordsForm.status = null
      }
      if (this.queryPayRecordsForm.studentCardNo === '') {
        this.queryPayRecordsForm.studentCardNo = null
      }
      if (this.queryPayRecordsForm.stuentCardIccid === '') {
        this.queryPayRecordsForm.stuentCardIccid = null
      }
      if (this.queryPayRecordsForm.wechatPayNo === '') {
        this.queryPayRecordsForm.wechatPayNo = null
      }
      this.getPayRecordslist()
    },

    // 点击到详情
    goDetail ($item) {
      console.log($item.flowId);
      sessionStorage.setItem('flowId', $item.flowId)
      this.$router.push({
        path: 'payrecordDetail'
      })
    },
    //导出  还未做
    exportCardInfo () {
      // const fileNames = '卡信息'
      // this.$axios.get('api/inventories/excel', {
      //   params: this.queryCardStockFormModel,
      //   responseType: 'arraybuffer'
      // }).then((response) => {
      //   //创建一个blob对象,file的一种
      //   let blob = new Blob([response.data], { type: 'application/x-xls' })
      //   let link = document.createElement('a')

      //   link.href = window.URL.createObjectURL(blob)
      //   link.download = fileNames + '.xls'
      //   link.click()
      // })
    },
    // --------------------- 申请退款流程----------------------------------------------
    // 点击申请退款
    goApplyRefund (item) {
      this.applyRefundDialog = true
      this.applyRefundTitle = '申请退款'
      this.applyRefundLabel = '退款原因'
      this.applyRefundPlaceholder = '请输入退款原因'
      this.applyRefundShow2 = false
      this.applyRefundShow1 = false
      this.applyRefundShow0 = false
      this.applyRefundShow = true
      this.applyRefundForm.channelName = item.channelName
      this.applyRefundForm.toCompanyName = item.toCompanyName
      this.applyRefundForm.officeName = item.officeName
      this.applyRefundForm.wechatPayNo = item.wechatPayNo
      this.applyRefundForm.goodName = item.goodName
      this.applyRefundForm.payPrice = item.payPrice
      this.applyRefundForm.referId = item.id
      this.applyRefundForm.type = 0
    },
    // 关闭申请退款窗口
    applyRefundClose () {
      this.applyRefundDialog = false
      this.applyRefundForm.channelName = null
      this.applyRefundForm.toCompanyName = null
      this.applyRefundForm.officeName = null
      this.applyRefundForm.wechatPayNo = null
      this.applyRefundForm.goodName = null
      this.applyRefundForm.payPrice = null
      this.applyRefundForm.referId = null
      this.applyRefundForm.type = null
      this.applyRefundForm.desc = null
      this.applyRefundForm.price = null
      this.applyRefundForm.flowId = null
      this.applyRefundForm.ReviewedPrice = null
      this.applyRefundForm.ReviewedCreate_time = null
      this.applyRefundForm.ReviewedDesc = null
      this.applyRefundForm.RefundDesc = null
    },
    // 提交申请退款
    applyRefundConfirm () {
      const data = {
        desc: this.applyRefundForm.desc,
        price: this.applyRefundForm.payPrice,
        referId: this.applyRefundForm.referId,
        type: this.applyRefundForm.type
      }
      console.log(JSON.stringify(data));
      API.apiFlowAdd(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('申请退款提交成功！')
          this.getPayRecordslist()
          this.applyRefundClose()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 退款审核
    goReviewed (item) {
      console.log(item);
      this.applyRefundDialog = true
      this.applyRefundTitle = '退款审核'
      this.applyRefundLabel = '审核备注'
      this.applyRefundPlaceholder = '请输入审核备注'
      this.applyRefundShow2 = false
      this.applyRefundShow1 = true
      this.applyRefundShow = false
      this.applyRefundShow0 = true
      this.applyRefundForm.channelName = item.channelName
      this.applyRefundForm.toCompanyName = item.toCompanyName
      this.applyRefundForm.officeName = item.officeName
      this.applyRefundForm.wechatPayNo = item.wechatPayNo
      this.applyRefundForm.goodName = item.goodName
      this.applyRefundForm.payPrice = item.payPrice
      this.applyRefundForm.referId = item.id
      this.applyRefundForm.flowId = item.flowId
      this.applyRefundForm.ReviewedPrice = item.DetailList[0].price
      this.applyRefundForm.ReviewedCreate_time = item.DetailList[0].create_time
      this.applyRefundForm.ReviewedDesc = item.DetailList[0].desc
    },
    // 财务退款
    goRefund (item) {
      this.applyRefundDialog = true
      this.applyRefundTitle = '财务退款'
      this.applyRefundLabel = '财务备注'
      this.applyRefundPlaceholder = '请输入财务备注'
      this.applyRefundShow2 = true
      this.applyRefundShow1 = true
      this.applyRefundShow0 = false
      this.applyRefundShow = false
      this.applyRefundForm.channelName = item.channelName
      this.applyRefundForm.toCompanyName = item.toCompanyName
      this.applyRefundForm.officeName = item.officeName
      this.applyRefundForm.wechatPayNo = item.wechatPayNo
      this.applyRefundForm.goodName = item.goodName
      this.applyRefundForm.payPrice = item.payPrice
      this.applyRefundForm.referId = item.id
      this.applyRefundForm.flowId = item.flowId
      this.applyRefundForm.ReviewedPrice = item.DetailList[0].price
      this.applyRefundForm.ReviewedCreate_time = item.DetailList[0].create_time
      this.applyRefundForm.ReviewedDesc = item.DetailList[1].desc
      this.applyRefundForm.RefundDesc = item.DetailList[0].desc
    },
    ReviewedConfirm (optType) {
      const data = {
        desc: this.applyRefundForm.desc,
        flowId: this.applyRefundForm.flowId,
        optType: optType,
        // price:
      }
      console.log(JSON.stringify(data));
      API.apiFlowDetailAdd(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('申请退款提交成功！')
          this.getPayRecordslist()
          this.applyRefundClose()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
};
</script>
<style scoped>
.cardNos {
  display: flex;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 4px;
}
.cardNos .cardNosList {
  flex: 1;
}
.cardNos .cardNosList ul {
  display: flex;
  flex-wrap: wrap;
}
.cardNos .cardNosList ul li {
  padding-right: 17px;
}
.cardNos .cardNosNumber {
  text-align: right;
}
</style>
