<template>
  <!-- 渠道套餐配置 -->
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree @channelChick="channelChick" @getChannelId="getChannelId"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <!-- 查询区域 -->
          <el-form :inline="true" v-model="queryInventoryForm" ref="queryInventoryForm">
            <el-form-item label="套餐名" class="queryFormItem">
              <el-select v-model="queryInventoryForm.packageId" filterable placeholder="请输入套餐关键词">
                <el-option v-for="item in porductsListOptions" :key="item.packageId" :label="item.packageName" :value="item.packageId">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="queryFormItem">
              <el-button type="primary" size="mini" icon="el-icon-search" @click="getchannelPackageAllocationList()">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 按钮区域 -->
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addChannelPackageShow">新增</el-button>
          </div>
          <!-- table表格区域 -->
          <el-table :data="channelPackageAllocationList" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'clearTypeCL'">
                  <span v-if="scope.row.clearType == 1">27号</span>
                  <span v-else-if="scope.row.clearType == 0">自然月</span>
                </div>

                <div v-if="p.prop == 'nickNameCL'">
                  <span v-if="scope.row.nickName == null">
                    <span v-if="scope.row.netWorkArea == 0">
                      语音{{scope.row.voiceTotal}} + 短信{{scope.row.smsTotal}} + 省内流量{{scope.row.networkTotal}}
                    </span>
                    <span v-else>语音{{scope.row.voiceTotal}} + 短信{{scope.row.smsTotal}} + 全国流量{{scope.row.networkTotal}}</span>
                  </span>
                  <span v-else>{{scope.row.nickName}}</span>
                </div>
                <div v-if="p.prop == 'packageTypeCL'">
                  <span v-if="scope.row.packageType == 0">套餐</span>
                  <span v-else-if="scope.row.packageType == 1">加油包</span>
                  <span v-else></span>
                </div>
                <div v-if="p.prop == 'statusCL'">
                  <span v-if="scope.row.status == 1">上架</span>
                  <span v-else-if="scope.row.status == 0">下架</span>
                  <span v-else-if="scope.row.status == 2">回收</span>
                </div>
                <div v-if="p.prop == 'netWorkAreaCL'">
                  <span v-if="scope.row.netWorkArea == 0">省内</span>
                  <span v-else>全国</span>
                </div>
                <div v-if="p.prop == 'operation'">
                  <el-button size="mini" @click="deactivation(scope.row,1)">上架</el-button>
                  <el-button size="mini" @click="deactivation(scope.row,0)">下架</el-button>
                  <el-button size="mini" @click="deactivation(scope.row,2)">回收</el-button>
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

    <!-- 新增弹出框 -->
    <addChanelPCG ref="addChanelPCGRef" :porductsListOptions="porductsListOptions" :statusOptions="statusOptions" :provincesList="provincesList" :typeOptions="typeOptions" @addChanelPCGSuccess="addChanelPCGSuccess">
    </addChanelPCG>

  </div>
</template>

<script>
import addChanelPCG from './addChanelPCG'
import channelTree from "./../channelTree"
import API from 'api/channels'
export default {
  name: '',
  components: {
    addChanelPCG,
    channelTree
  },
  data () {
    return {
      // 获取 渠道套餐配置 list
      channelPackageAllocationList: [],
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10,
      },
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'channelId', label: '渠道名', width: 100, fixed: 'left' },
        { prop: 'packageName', label: '套餐名', width: 150, fixed: 'left' },
        { prop: 'nickNameCL', label: '套餐显示名', width: 300 },
        { prop: 'packageNo', label: '套餐编号', width: 80 },
        { prop: 'packageTypeCL', label: '套餐类型', width: 100 },
        { prop: 'networkTotal', label: '流量', width: 80 },
        { prop: 'netWorkAreaCL', label: '用量区域', width: 80 },
        { prop: 'voiceTotal', label: '语音', width: 80 },
        { prop: 'smsTotal', label: '短信', width: 80 },
        { prop: 'orignPrice', label: '原始价', width: 80 },
        { prop: 'salePrice', label: '销售价', width: 80 },
        { prop: 'validMoth', label: '用量清零周期', width: 110 },
        { prop: 'validDuration', label: '产品有效期', width: 100 },
        { prop: 'clearTypeCL', label: '用量清算方式', width: 110 },
        { prop: 'description', label: '产品说明', width: 100 },
        { prop: 'statusCL', label: '状态', width: 80 },
        { prop: 'operation', label: '操作', width: 220, fixed: 'right' }

      ],
      queryInventoryForm: {
        packageId: ''
      },
      // 套餐列表下拉框
      porductsListOptions: [],
      // 状态
      statusOptions: [
        { label: "上架", value: 1 },
        { label: "下架", value: 0 },
        { label: "回收", value: 2 }
      ],
      typeOptions: [
        { label: '套餐', value: 0 },
        { label: '加油包', value: 1 }
      ],
      addChannelPackageDialogVisible: false,
      provincesList: []
    }
  },
  mounted () {
    this.getchannelPackageAllocationList()
    this.getPorductsListOptions()
    this.getProvincesList()
  },
  methods: {
    channelChick (channel) {
      // console.log(channel);
      if (!channel) return
      // const parentChannelId = channel.channelId
      // this.getchannelPackageAllocationList(parentChannelId)
    },
    // 子组件传来的点击渠道事件
    getChannelId (channelsID) {
      this.channelsID = channelsID
      this.getchannelPackageAllocationList(channelsID)
    },
    // 获取列表
    getchannelPackageAllocationList (channelId) {
      if (!channelId) {
        // const channelIdaa = {
        //   channelId: null
        // }
        // this.apiChannelsPackages(channelIdaa)
      } else {
        const channelIdbb = {
          channelId: channelId
        }
        this.apiChannelsPackages(channelIdbb)
      }

    },
    // 获取后台数据
    apiChannelsPackages (channelId) {
      console.log(channelId);
      let queryInventoryForm = this.queryInventoryForm;
      let params = Object.assign(
        this.queryInfo,
        queryInventoryForm,
        channelId
      );
      API.apiChannelsPackages(params).then(res => {
        if (res.resultCode === 0) {
          this.channelPackageAllocationList = res.data
          console.log(this.channelPackageAllocationList)
          this.total = res.rowNum
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getchannelPackageAllocationList()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage - 1
      this.getchannelPackageAllocationList()
    },
    // 获取归属地
    getProvincesList () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provincesList = res.data
          // console.log(this.provincesList)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取套餐列表
    getPorductsListOptions () {
      const data = {
        page: 0,
        pageSize: 100,
        packageType: 0
      }
      API.apiPackagesList(data).then(res => {
        if (res.resultCode === 0) {
          this.porductsListOptions = res.data
          console.log(this.porductsListOptions)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addChannelPackageShow () {
      this.$refs.addChanelPCGRef.dialogVisible = true;
    },
    addChanelPCGSuccess (data) {
      API.apiChannelsPackagesAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getchannelPackageAllocationList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 上架/下架/回收
    deactivation (row, type) {
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          packageId: row.id,
          status: type
        }
        // console.log(data);
        API.apiChannelsPackagesStatusModify(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('操作成功！')
            this.getchannelPackageAllocationList()
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      });
    },
  }
}
</script>

<style scoped>
.box_subject {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
</style>
