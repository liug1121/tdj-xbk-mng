<template>
  <!-- 订单 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryOrderForm" :model="queryOrderForm">
        <el-form-item label="订单编号" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryOrderForm.orderId" placeholder="请输入订单编号"></el-input>
        </el-form-item>
        <el-form-item label="买家姓名" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryOrderForm.orderName" placeholder="请输入买家姓名"></el-input>
        </el-form-item>
        <el-form-item label="买家联系方式" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryOrderForm.contactPhone" placeholder="请输入买家联系方式"></el-input>
        </el-form-item>
        <el-form-item label="套餐名称" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryOrderForm.packageId" placeholder="请输入套餐名称"></el-input>
        </el-form-item>
        <el-form-item label="卡号码" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryOrderForm.cardNo" placeholder="请输入卡号码"></el-input>
        </el-form-item>
        <el-form-item label="ICCID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryOrderForm.iccid" placeholder="请输入ICCID"></el-input>
        </el-form-item>
        <el-form-item label="订单状态" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryOrderForm.orderType" placeholder="请选择卡状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="购卡时间" class="queryFormItem">
          <el-date-picker v-model="queryOrderForm.startDate" style="width:135px" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker v-model="queryOrderForm.endDate" style="width:135px" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryOrder">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <!-- <el-button size="medium" type="primary" icon="el-icon-download">导出</el-button> -->
        <!-- <el-button size="medium" type="primary" icon="el-icon-download" @click="exportOrderShow">按首尾条件导出</el-button> -->
        <el-button size="medium" type="primary" @click="PreOpeningCardButton()">预开卡</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table v-loading="loading" :data="orderList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop ==='address'">
              {{scope.row.province}}{{scope.row.city}}{{scope.row.district}}{{scope.row.orderAddress}}
            </div>
            <div v-if="p.prop =='orderTypeZS'">
              <div v-if="scope.row.orderType === 1">已支付</div>
              <div v-if="scope.row.orderType === 0">未支付</div>
              <div v-if="scope.row.orderType === -1">支付失败</div>
              <div v-if="scope.row.orderType === 5">已开卡</div>
              <div v-if="scope.row.orderType === 6">已发货</div>
            </div>
            <div v-if="p.prop == 'operation'">
              <div v-if="scope.row.orderType === 1">
                <el-button size="mini" @click="activateCard(scope.row)">开卡</el-button>
              </div>
              <div v-else-if="scope.row.orderType === 5">
                <el-button size="mini" @click="operation(scope.row)">发货</el-button>
              </div>
              <div v-else>
                <span>暂无操作</span>
              </div>
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

    <!-- 按首尾条件导出 -->
    <!-- <el-dialog title="按首尾条件导出" :visible.sync="exportOrderDialogVisible" width="430px">
      <el-form ref="exportOrderForm" label-width="120px">
        <el-form-item label="首ICCID(19位)">
          <el-input placeholder="请输入首ICCID(19位)"></el-input>
        </el-form-item>
        <el-form-item label="尾ICCID(19位)">
          <el-input placeholder="请输入尾ICCID(19位)"></el-input>
        </el-form-item>
      </el-form>
      <div class="notice">
        <p>1、注意：请输入19位数的ICCID，每次导出不能超过2万张卡</p>
        <p>2、系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行导出。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportOrderDialogVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </span>
    </el-dialog> -->
    <!-- 开卡 -->
    <el-dialog title="开卡" :visible.sync="activateCardDialogVisible" width="430px">
      <el-form ref="activateCardRef" v-model="activateCardForm" label-width="100px">
        <el-form-item label="订单号">
          <el-input v-model="activateCardForm.orderId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="ICCID">
          <el-input v-model="activateCardForm.iccid" placeholder="请输入19位ICCID"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="activateCardDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="activateCardSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 发货 -->
    <el-dialog title="发货" :visible.sync="operationDialogVisible" width="430px">
      <el-form ref="operationOrderRef" v-model="operationOrderForm" label-width="100px">
        <el-form-item label="ICCID">
          <el-input v-model="operationOrderForm.iccid" placeholder="请输入该渠道下的ICCID" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="快递单号">
          <el-input v-model="operationOrderForm.sendNo" placeholder="请输入快递单号"></el-input>
        </el-form-item>
        <el-form-item label="快递公司">
          <el-input v-model="operationOrderForm.sendCompany" placeholder="请输入快递公司"></el-input>
        </el-form-item>
        <el-form-item label="卡号码">
          <el-input v-model="operationOrderForm.cardNo" placeholder="数据库匹配 ICCID点击确定后，自动匹配 " :disabled="true"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="operationDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="operateSubmit">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 预开卡 -->
    <activateCard ref="activateCardRef" @activateCardSuccess="activateCardSuccess"></activateCard>
  </div>
</template>

<script>
import API from 'api/order'
import activateCard from "./activateCardModal"
export default {
  components: {
    activateCard
  },
  name: 'signPlan',
  data () {
    return {
      // 订单列表
      orderList: [],
      // 获取用户列表的参数对象
      page: 1,
      pageSize: 10,
      // 总数据条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'orderId', label: '订单编号', width: 200, fixed: 'left' },
        { prop: 'wechatPayId', label: '微信交易单号', width: 240 },
        { prop: 'orderName', label: '买家姓名', width: 80 },
        { prop: 'contactPhone', label: '买家联系方式', width: 120 },
        { prop: 'address', label: '发货地址', width: 300 },
        { prop: 'packageName', label: '套餐名称', width: 250 },
        { prop: 'packagePrice', label: '套餐价格', width: 80 },
        { prop: 'preDepositePrice', label: '预存款', width: 80 },
        { prop: 'channelName', label: '渠道名称', width: 150 },
        { prop: 'saler', label: '销售员', width: 80 },
        { prop: 'orderOrgin', label: '订单来源', width: 100 },
        { prop: 'sendCompany', label: '物流公司', width: 150 },
        { prop: 'sendNo', label: '快递单号', width: 200 },
        { prop: 'orderDate', label: '购卡时间', width: 200 },
        { prop: 'cardNo', label: '卡号码', width: 150 },
        { prop: 'iccid', label: 'ICCID', width: 180 },
        { prop: 'orderTypeZS', label: '订单状态', width: 100 },
        { prop: 'operation', label: '操作', width: 90, fixed: 'right' }
      ],
      // 卡状态字典
      statusOptions: [
        { label: '已支付', value: 1 },
        { label: '未支付', value: 0 },
        { label: '支付失败', value: -1 },
        { label: '开卡', value: 5 },
        { label: '发货', value: 6 }
      ],
      // 查询字段
      queryOrderForm: {
        cardNo: null,
        contactPhone: null,
        endDate: null,
        iccid: null,
        orderId: null,
        orderName: null,
        orderType: null,
        packageId: null,
        startDate: null,
        page: 0,
        pageSize: 10
      },
      // 开卡字段
      activateCardForm: {
        orderId: '',
        iccid: '',
        orderUuid: ''
      },
      // 发货字段
      operationOrderForm: {
        orderUuid: '',
        iccid: '',
        sendNo: '',
        sendCompany: '',
        orderId: ''
      },
      // 单条 list 
      chooseList: {},
      username: '',
      // exportOrderDialogVisible: false,
      // 操作模态框
      operationDialogVisible: false,
      activateCardDialogVisible: false,
      loading: false
    }
  },
  mounted () {
    // 获取 订单列表
    this.getOrdersList();
    this.username = this.$store.state.userinfo.username;
  },
  methods: {
    // 获取列表
    getOrdersList () {
      let params = this.queryOrderForm
      this.loading = true
      API.apiProvincesList(params).then(res => {
        if (res.resultCode === 0) {
          this.orderList = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryOrderForm.pageSize = newSize
      this.getOrdersList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryOrderForm.page = newPage - 1
      this.getOrdersList()
    },
    queryOrder () {
      if (this.queryOrderForm.cardNo === '') {
        this.queryOrderForm.cardNo = null
      }
      if (this.queryOrderForm.contactPhone === '') {
        this.queryOrderForm.contactPhone = null
      }
      if (this.queryOrderForm.endDate === '') {
        this.queryOrderForm.endDate = null
      }
      if (this.queryOrderForm.iccid === '') {
        this.queryOrderForm.iccid = null
      }
      if (this.queryOrderForm.orderId === '') {
        this.queryOrderForm.orderId = null
      }
      if (this.queryOrderForm.orderName === '') {
        this.queryOrderForm.orderName = null
      }
      if (this.queryOrderForm.orderType === '') {
        this.queryOrderForm.orderType = null
      }
      if (this.queryOrderForm.packageId === '') {
        this.queryOrderForm.packageId = null
      }
      if (this.queryOrderForm.startDate === '') {
        this.queryOrderForm.startDate = null
      }
      this.getOrdersList();
    },
    startTimeChange () {
      this.queryOrderForm.startDate = `${this.queryOrderForm.startDate} 00:00:00`
    },
    endTimeChange () {
      this.queryOrderForm.endDate = `${this.queryOrderForm.endDate} 23:59:59`
    },
    // exportOrderShow () {
    //   this.exportOrderDialogVisible = true
    // },
    // 开卡
    activateCard (row) {
      this.chooseList = row
      this.activateCardForm.orderId = this.chooseList.orderId
      this.activateCardDialogVisible = true
    },
    // 开卡模态框 确认按钮
    activateCardSubmit () {
      const data = {
        cardNo: '',
        iccid: this.activateCardForm.iccid,
        orderUuid: this.chooseList.orderId
      }
      API.apiOrderOpenCard(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('开卡成功！')
          this.getOrdersList()
          this.activateCardDialogVisible = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 发货
    operation (row) {
      this.chooseList = row
      this.operationOrderForm.orderId = this.chooseList.orderId
      this.operationOrderForm.iccid = this.chooseList.iccid
      this.operationOrderForm.cardNo = this.chooseList.cardNo
      this.operationDialogVisible = true
    },

    // 发货模态框 确定按钮
    operateSubmit () {
      const data = {
        orderUuid: this.chooseList.orderId,
        sendCompany: this.operationOrderForm.sendCompany,
        sendNo: this.operationOrderForm.sendNo
      }
      API.apiOrderSendCard(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('发货成功！')
          this.getOrdersList()
          this.operationDialogVisible = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 预开卡  2020-12-06  未完成
    PreOpeningCardButton () {
      this.$refs.activateCardRef.dialogVisible = true;
    },

    // 预开卡
    activateCardSuccess (param, channelId, comment, contact, goodId, price) {
      console.log(param, channelId, comment, contact, goodId, price);
      API.apiPlansImport(param, channelId, comment, contact, goodId, price).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功预开卡！')
          this.getOrdersList()
        } else {
          // const resultInfo = res.resultInfo.split(':')
          // this.$message.error(resultInfo[1] + ':' + resultInfo[2])
          this.$message.error(res.resultInfo)
        }
      })
    },
    stringHandle (handleData) {
      var str = handleData
      var newString = str.split(':')
      return newString[1]
    }
  }
}
</script>

<style scoped>
</style>
