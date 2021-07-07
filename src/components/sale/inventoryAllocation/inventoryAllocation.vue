<template>
  <!-- 分配渠道 -->
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <!-- 查询区域 -->
          <el-form :inline="true" v-model="queryInventoryForm" ref="queryInventoryForm">
            <el-form-item label="卡号码" class="queryFormItem">
              <el-input class="queryFormInput" v-model="queryInventoryForm.cardNo" placeholder="请输入卡号码"></el-input>
            </el-form-item>
            <el-form-item label="ICCID" class="queryFormItem">
              <el-input class="queryFormInput" v-model="queryInventoryForm.iccid" placeholder="请输入ICCID"></el-input>
            </el-form-item>
            <el-form-item label="档位" class="queryFormItem">
              <el-select class="queryFormInput" v-model="queryInventoryForm.levelId" placeholder="请选择档位">
                <el-option v-for="item in gearOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="卡状态" class="queryFormItem">
              <el-select class="queryFormInput" v-model="queryInventoryForm.cardStatus" placeholder="请选择卡状态">
                <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="queryFormItem">
              <el-button type="primary" size="mini" icon="el-icon-search" @click="queryInventoryButton">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 按钮区域 -->
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="exportAllocationShow">分配渠道</el-button>
            <el-button size="medium" type="primary" icon="el-icon-upload2" @click="SWdistributeShow">首尾分配渠道</el-button>
            <el-button size="medium" type="primary" icon="el-icon-download">导出</el-button>
            <el-button size="medium" type="primary" icon="el-icon-download" @click="exportInventoryShow">按首尾条件导出</el-button>
            <!-- <el-button size="medium" type="primary" icon="el-icon-search" @click="queryInventoryShow">查询</el-button> -->
          </div>
          <!-- table表格区域 -->
          <el-table v-loading="loading" :data="ChannelsCards" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'cardStatusCL'">
                  <div v-if="scope.row.cardStatus === 0">未使用</div>
                  <div v-if="scope.row.cardStatus === 1">已使用</div>
                  <div v-if="scope.row.cardStatus === 50">停用</div>
                </div>
                <div v-if="p.prop == 'operation'">
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
      </el-col>

    </el-row>

    <!-- 按首尾条件导出 -->
    <el-dialog title="按首尾条件导出" :visible.sync="exportInventoryDialogVisible" width="430px">
      <el-form v-model="exportInventoryForm" ref="exportInventoryForm" label-width="120px">
        <el-form-item label="首ICCID(19位)" prop="iccidStart">
          <el-input size="small" v-model="exportInventoryForm.iccidStart" placeholder="请输入首ICCID(19位)"></el-input>
        </el-form-item>
        <el-form-item label="尾ICCID(19位)" prop="iccidEnd">
          <el-input size="small" v-model="exportInventoryForm.iccidEnd" placeholder="请输入尾ICCID(19位)"></el-input>
        </el-form-item>
      </el-form>
      <div class="notice">
        <p>1、注意：请输入19位数的ICCID，每次导出不能超过2万张卡</p>
        <p>2、系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行导出。</p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="exportInventoryDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="exportButton">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 首尾分配渠道 -->
    <SWdistribute ref="SWdistributeRef" @SWdistributeSuccess="SWdistributeSuccess">
    </SWdistribute>

    <!-- 分配渠道 -->
    <ImportModal ref="ImportModal" @ImportModalSuccess="ImportModalSuccess"></ImportModal>
  </div>
</template>

<script>
import channelTree from "./../channelTree"
import SWdistribute from "./SWdistribute"
import ImportModal from "./ImportModal"
import API from 'api/channels'
export default {
  name: 'signPlan',
  components: {
    channelTree,
    SWdistribute,
    ImportModal
  },
  data () {
    return {
      excelName: '按首尾条件导出表',
      ChannelsCards: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: "cardNo", label: "卡号码", width: 200, fixed: "left" },
        { prop: "iccid", label: "ICCID", width: 200 },
        { prop: "cardStatusCL", label: "卡状态", width: 80 },
        { prop: "channelName", label: "渠道" }
      ],
      // 档位
      gearOptions: [
        { label: "1", value: 1 },
        { label: "2", value: 2 },
        { label: "3", value: 3 },
        { label: "4", value: 4 },
        { label: "5", value: 5 },
      ],
      // 卡状态
      statusOptions: [
        { label: "未使用", value: 0 },
        { label: "已使用", value: 1 },
        { label: "停用", value: 50 }
      ],
      queryInventoryForm: {
        cardNo: null,
        cardStatus: null,
        iccid: null,
        levelId: null,
        page: 0,
        pageSize: 10
      },
      exportInventoryForm: {
        iccidStart: null,
        iccidEnd: null,
        channelId: null
      },
      exportInventoryDialogVisible: false,
      channelIdNew: null,
      loading: false
    }
  },
  mounted () {
    // this.getChannelsCards()
  },
  methods: {
    channelChick (channel) {
      // console.log(channel);
      if (!channel) return
      const parentChannelId = channel.channelId
      // this.getChannelsCards(parentChannelId)
      this.exportInventoryForm.channelId = parentChannelId
      this.channelIdNew = channel.channelId
    },
    // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID) {
      this.getChannelsCards(channelsID)
      this.exportInventoryForm.channelId = channelsID
      this.channelIdNew = channelsID
    },
    // 获取列表 apiChannelsCards
    getChannelsCards (channelsID) {
      // console.log(channelsID);
      if (!channelsID) {
        // const channelId = {
        //   channelId: 1
        // }
        // this.apiChannelsCards(channelId)
      } else {
        const channelId = {
          channelId: channelsID
        }
        this.apiChannelsCards(channelId)
      }

    },
    // 获取分配渠道后台数据
    apiChannelsCards (channelId) {
      let queryInventoryForm = this.queryInventoryForm
      let params = Object.assign(
        queryInventoryForm,
        channelId
      );
      this.loading = true
      API.apiChannelsCards(params).then(res => {
        if (res.resultCode === 0) {
          this.ChannelsCards = res.data
          console.log(this.ChannelsCards)
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInventoryForm.pageSize = newSize
      this.getChannelsCards(this.channelIdNew)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInventoryForm.page = newPage - 1
      this.getChannelsCards(this.channelIdNew)
    },
    // 查询按钮
    queryInventoryButton () {
      if (this.queryInventoryForm.cardNo === '') {
        this.queryInventoryForm.cardNo = null
      }
      if (this.queryInventoryForm.cardStatus === '') {
        this.queryInventoryForm.cardStatus = null
      }
      if (this.queryInventoryForm.iccid === '') {
        this.queryInventoryForm.iccid = null
      }
      if (this.queryInventoryForm.levelId === '') {
        this.queryInventoryForm.levelId = null
      }
      this.getChannelsCards(this.channelIdNew)
    },
    // 点击按首尾分配 按钮
    SWdistributeShow () {
      this.$refs.SWdistributeRef.dialogVisible = true;
    },
    // 点击 按首尾条件 导出
    exportInventoryShow () {
      this.exportInventoryDialogVisible = true
    },
    // 点击 分配渠道 按钮
    exportAllocationShow () {
      this.$refs.ImportModal.dialogVisible = true;
    },
    // 按 首尾分配 模态框 确认 按钮
    SWdistributeSuccess (data) {
      console.log(data);
      API.apiChannelsCardsDistributeIccid(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('分配成功！')
          this.getChannelsCards(this.channelIdNew)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 导入组件，成功后
    ImportModalSuccess (channelId, param) {
      API.apiChannelsCardsUpload(channelId, param).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('导入成功！')
          this.getChannelsCards(this.channelIdNew)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 按首尾条件导出确认按钮
    exportButton () {
      if (this.exportInventoryForm.channelId === null) {
        this.exportInventoryForm.channelId = ''
      }
      if (this.exportInventoryForm.iccidStart === null) {
        this.exportInventoryForm.iccidStart = ''
      }
      if (this.exportInventoryForm.iccidEnd === null) {
        this.exportInventoryForm.iccidEnd = ''
      }
      const data = {
        channelId: this.exportInventoryForm.channelId,
        iccidStart: this.exportInventoryForm.iccidStart,
        iccidEnd: this.exportInventoryForm.iccidEnd
      }

      API.apiChannelsCardDownload(data).then(res => {
        if (!res) {
          return
        }
        this.$message.success(`请前往“我的任务”中查询，id值为${res.data}`)
        // let url = window.URL.createObjectURL(new Blob([res]))
        // let link = document.createElement('a')
        // link.style.display = 'none'
        // link.href = url
        // link.setAttribute('download', `${this.excelName}.xlsx`)

        // document.body.appendChild(link)
        // link.click()
      })
    }
  }
}
</script>

<style scoped>
.box_subject {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
</style>
