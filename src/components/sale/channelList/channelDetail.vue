<template>
  <div>
    <el-card class="all_list">
      <div slot="header" class="clearfix">
        <span>渠道信息</span>
      </div>
      <div class="text item">
        <el-row v-show="isShow">
          <el-col :span="8">
            <div class="grid-content bg-purple">渠道名称：{{channelDetail.channelName}}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple-light">渠道联系人：{{channelDetail.manager}}</div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">渠道联系人电话：{{channelDetail.managerPhone}}</div>
          </el-col>
        </el-row>
        <el-row style="margin-top:10px">
          <el-col :span="24">
            <div class="grid-content bg-purple-dark">带参数的永久二维码：<img :src="ChannelsQrcode" width="100" height="100"></div>
          </el-col>
        </el-row>
      </div>
    </el-card>
    <el-card class="all_list">
      <div slot="header" class="clearfix">
        <span>渠道套餐</span>
      </div>
      <div class="text item">
        <el-table :data="channelDetail.packages" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
          <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
            <template slot-scope="scope">
              <div v-if="p.prop == 'operation'">
                <el-button size="mini">上架</el-button>
                <el-button size="mini">隐藏</el-button>
                <el-button size="mini">下架</el-button>
              </div>
              <div v-else>
                <div v-html="scope.row[p.prop]" />
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import API from 'api/channels'
export default {
  data () {
    return {
      channelDetail: {},
      isShow: true,
      // 表格 label 字段名称
      table_column: [
        { prop: 'packageName', label: '套餐名', width: 150, fixed: 'left' },
        { prop: 'packageNickName', label: '套餐显示名', width: 300 },
        { prop: 'packageId', label: '套餐编号', width: 80 },
        { prop: 'packageType', label: '套餐类型', width: 100 },
        { prop: 'networkTotal', label: '流量', width: 80 },
        { prop: 'netWorkArea', label: '用量区域', width: 80 },
        { prop: 'voiceTotal', label: '语音', width: 80 },
        { prop: 'smsTotal', label: '短信', width: 80 },
        { prop: 'orignPrice', label: '原始价', width: 80 },
        { prop: 'salePrice', label: '销售价', width: 80 },
        { prop: 'validMoth', label: '用量清零周期', width: 110 },
        { prop: 'validDuration', label: '产品有效期', width: 100 },
        { prop: 'clearType', label: '用量清算方式', width: 110 },
        { prop: 'description', label: '产品说明', width: 100 },
        { prop: 'status', label: '状态', width: 80 },
        { prop: 'operation', label: '操作', width: 220, fixed: 'right' }
      ],
      ChannelsQrcode: ''
    }
  },
  mounted () {
    this.getChannelDetailList();
    this.getChannelsQrcode()
  },
  methods: {
    // 渠道套餐列表
    getChannelDetailList () {
      const data = {
        channelId: sessionStorage.getItem('channelId'),
        page: 0,
        pageSize: 10,
        province: null
      }
      API.apiChannelsDetails(data).then(res => {
        if (res.resultCode === 0) {
          this.channelDetail = res.data
          console.log(this.channelDetail)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    getChannelsQrcode () {
      const params = {
        channelId: sessionStorage.getItem('channelId')
      }
      API.apiChannelsQrcode(params).then(res => {
        if (res.resultCode === 0) {
          this.ChannelsQrcode = res.data
        } else {
          this.$message.error('获取公众号二维码失败: 获取不到accesstoken')
        }
      })
    }
  }
}
</script>
<style scoped>
.el-card {
  height: auto;
  margin-bottom: 10px;
}
</style>