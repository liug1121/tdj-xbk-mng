<template>
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-form :inline="true" ref="queryChannelRef" :model="queryChannelCardForm">
              <el-form-item label="ICCID">
                <el-input style="width:300px;" v-model="queryChannelCardForm.iccid" placeholder="请输入iccid" ></el-input>
              </el-form-item>
              <el-form-item label="卡号码">
                <el-input style="width:300px;" v-model="queryChannelCardForm.phone" placeholder="请输入iccid" ></el-input>
              </el-form-item>
              <el-form-item label="卡状态">
                  <el-select 
                    filterable
                    clearable
                    reserve-keyword
                    placeholder="请选择卡状态" v-model="queryChannelCardForm.status">
                        <el-option v-for="item in statusTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                <!-- <el-input style="width:300px;" v-model="queryChannelCardForm.status" placeholder="请输入卡状态" ></el-input> -->
              </el-form-item>
              <el-button size="medium" type="primary" @click="queryChannelCards">查询</el-button>
          </el-form>
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" >分配渠道</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showDistrubuteBetween">首尾分配渠道</el-button>
          </div>
          <el-table v-loading="loading" :data="channelStocks" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                  <div v-if="p.prop == 'channelName'">
                    <span>{{selectedChannelName}}</span>
                  </div>
                  <div v-else>
                      <div v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
           <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
      </el-col>
    </el-row>
       <el-dialog title="渠道分配" :visible.sync="showDistrubuteDlg" width="500px" @close="hideDistrubuteBetween">
      <el-form :model="distrubuteForm"  label-width="130px">
          <el-form-item label="分配渠道">
          <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入父渠道" v-model="distrubuteForm.channelId">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.name" :value="item.channelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="首ICCID（19位）">
          <el-input style="width:300px;"  v-model="distrubuteForm.iccidStart" placeholder="请输入首ICCID" ></el-input>
        </el-form-item>
        <el-form-item label="尾ICCID（19位）">
          <el-input style="width:300px;"  v-model="distrubuteForm.iccidEnd" placeholder="请输入联系人尾ICCID" ></el-input>
        </el-form-item>
      </el-form>
      <span>
          <p>1）注意：请输入19位数的ICCID，每次分配不能超过2万张卡</p>

          <p>2）系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行分配渠道</p>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideDistrubuteBetween">取 消</el-button>
        <el-button type="primary" @click="okDistrubuteBetween">确 定</el-button>
      </span>  
    </el-dialog>
  </div>
</template>

<script>
import channelTree from "./channelTree"
import apiBigflow from 'api/bigflow'
export default {
  name: 'channelList',
  components: {
    channelTree,
    // SelectTree
  },
  data () {
    return {
      showDistrubuteDlg:false,
      distrubuteForm:{},
      queryChannelCardForm:{},
      loading:false,
      channels:[],
      channelStocks:[],
      selecedChannelCode:'',
      selectedChannelName:'',
      page: 1,
      pageSize: 20,
      total: 0,
      table_column: [
        { prop: 'iccid', label: 'ICCID', width: 300 },
        { prop: 'phoneNumber', label: '卡号码', width: 100 },
        { prop: 'status', label: '卡状态', width: 100 },
        { prop: 'channelName', label: '渠道', width: 300 },
        { prop: 'salePoint', label: '网点', width: 200 },
        { prop: 'salePersonName', label: '销售员', width: 240 }
      ],
      statusTypes:[
        {label:'可销售', value:2},
        {label:'已激活', value:6}
    ]
    }
  },

  mounted () {
    this.getChannels()
    this.getChannelStocks()
  },
  methods: {
    okDistrubuteBetween:function(){
        if(this.distrubuteForm.channelId == undefined || this.distrubuteForm.channelId == '' || this.distrubuteForm.channelId == null){
            this.$message.error('渠道名必须填写')
            return
        }
        if(this.distrubuteForm.iccidStart == undefined || this.distrubuteForm.iccidStart == '' || this.distrubuteForm.iccidStart == null){
            this.$message.error('首iccd必须填写')
            return
        }
        if(this.distrubuteForm.iccidEnd == undefined || this.distrubuteForm.iccidEnd == '' || this.distrubuteForm.iccidEnd == null){
            this.$message.error('尾iccd必须填写')
            return
        }
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.channelId = this.distrubuteForm.channelId
        params.iccidStart = this.distrubuteForm.iccidStart
        params.iccidEnd = this.distrubuteForm.iccidEnd
        params.type = 1
        apiBigflow.distributeChannelCardsBetween(params).then(res => {
            if (res.resultCode === 0) {
                this.channelStocks = res.data
                this.total = res.rowNum
            } else {
            this.$message.error(res.resultInfo)
            }
        })
      }).catch(() => {
      });
    },
    hideDistrubuteBetween:function(){
        this.showDistrubuteDlg = false
    },
    showDistrubuteBetween:function(){
        this.showDistrubuteDlg = true
    },
    queryChannelCards:function(){
        this.getChannelStocks()
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
    //   this.queryChannelForm.pageSize = newSize
    //   this.getChannelList(localStorage.getItem('channelId'))
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
        this.page = newPage
        this.getChannelStocks()
    //   this.queryChannelForm.page = newPage - 1
    //   this.getChannelList(localStorage.getItem('channelId'))
    },
    getChannelStocks:function(){
      let params = {}
      params.page=this.page
      params.channelId = this.selecedChannelCode
      params.iccidLike = this.queryChannelCardForm.iccid
      params.phoneNumberLike = this.queryChannelCardForm.phone
      params.status = this.queryChannelCardForm.status
      params.type = 1
      apiBigflow.getChannelStocks(params).then(res => {
        if (res.resultCode === 0) {
            this.channelStocks = res.data
            this.total = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })

    },
    getChannels () {
      let params = {}
      params.page=1
      apiBigflow.getSaleChannels(params).then(res => {
        if (res.resultCode === 0) {
            this.channels = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    
    channelChick (channel) {
    },
    // // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName) {
        this.selecedChannelCode = channelsID
        this.selectedChannelName = channelName
        this.getChannelStocks()
        // this.getSalePerson()
    }
  }
}
</script>

<style scoped>
.box_subject {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
.hoverQrcodeBox {
  width: 150px;
}
.hoverQrcodeBoxNo {
  text-align: center;
}
</style>
