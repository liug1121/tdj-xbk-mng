<template>
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card v-if="selectedTab == 0">
          <el-table  :data="channelCardStatics" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label"  :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                  <div>
                      <div v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-main class="el-loading" v-loading="loading" element-loading-background="transparent"
        element-loading-text="加载中" > 
    </el-main>
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
      channelCardStatics:[],
      selectedTab:0,
      loading:false,
      table_column: [
        { prop: 'channelName', label: '渠道名称', width: 200 },
        { prop: 'cardNum', label: '总卡数', width: 200 },
        { prop: 'cardUsingNum', label: '已启用卡数', width: 220 },
        { prop: 'cardRealedNum', label: '已认证卡数', width: 120 }
        
      ],
    }
  },

  mounted () {
    this.getChannelCardStatics()
    this.getChannels()
  },
  methods: {
    getChannelCardStatics:function(){
        let params = {}
        apiBigflow.getChannelCardStatics(params).then(res=>{
            if(res.resultCode == 0){
                this.channelCardStatics = res.data
            }else{
                this.$message.success('操作失败')
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
        this.getChannelBillingFeeConfigs()
        this.getChannelProducts()
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
.tree-tab-unselected {
  display:inline-block;
  background:silver;
  color:white;
  margin: 5px;
  margin-top: 10px;
  padding: 5px;
  border-radius:5px;
  width: 100px;
  font-size: 5px;
  text-align: center;
  color:#145297;
  background-color: transparent;
  border-color: transparent;
}
.tree-selected {
  background:#6ab3fc;
  color: white;
}
.el-button {
  color:#145297;
    background-color: transparent;
    border-color: transparent;
}
</style>
