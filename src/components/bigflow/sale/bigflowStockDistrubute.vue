<template>
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <!-- <el-form :inline="true" ref="queryChannelRef" :model="queryChannelForm">
          </el-form>
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showAddChannel">添加渠道</el-button>
          </div> -->
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
       <!-- <el-dialog title="新增渠道" :visible.sync="showAddChannelDlg" width="450px" @close="hideAddChannelDlg">
      <el-form :model="addChannelForm"  label-width="110px">
          <el-form-item label="渠道名称">
          <el-input style="width:300px;" v-model="addChannelForm.name" placeholder="请输入渠道名称" ></el-input>
        </el-form-item>
        <el-form-item label="父渠道">
            <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入父渠道" v-model="addChannelForm.parentId">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.name" :value="item.channelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input style="width:300px;"  v-model="addChannelForm.salePerson" placeholder="请输入联系人姓名" ></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号">
          <el-input style="width:300px;"  v-model="addChannelForm.phone" placeholder="请输入联系人手机号" ></el-input>
        </el-form-item>
         <el-form-item label="登录密码">
          <el-input style="width:300px;"  v-model="addChannelForm.pwd" placeholder="请输入登录密码" ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddChannelDlg">取 消</el-button>
        <el-button type="primary" @click="okAddChannel">确 定</el-button>
      </span>  
    </el-dialog> -->
  </div>
</template>

<script>
import channelTree from "./channelTree"
import API from 'api/channels'
import apiBigflow from 'api/bigflow'
import APISYS from 'api/system'
export default {
  name: 'channelList',
  components: {
    channelTree,
    // SelectTree
  },
  data () {
    return {
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
    }
  },

  mounted () {
    this.getChannels()
    this.getChannelStocks()
  },
  methods: {
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
