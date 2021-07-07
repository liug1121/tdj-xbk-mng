<template>
  <!-- 渠道套餐配置 -->
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
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
              <el-button type="primary" size="mini" icon="el-icon-search" @click="getchannelPackageAllocationList(channelIdTree)">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 按钮区域 -->
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addChannelPackageShow">新增</el-button>
          </div>
          <!-- table表格区域 -->
          <el-table v-loading="loading" :data="channelPackageAllocationList" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'clearTypeCL'">
                  <span v-if="scope.row.clearType == 1">27号</span>
                  <span v-else-if="scope.row.clearType == 0">自然月</span>
                </div>

                <div v-if="p.prop == 'packageGoodName'">
                  {{scope.row.packageName}}
                </div>
                <div v-if="p.prop == 'packageTypeCL'">
                  <span v-if="scope.row.packageType == 0">套餐</span>
                  <span v-else-if="scope.row.packageType == 1">加油包</span>
                  <span v-else></span>
                </div>
                <div v-if="p.prop == 'netWorkAreaCL'">
                  <span v-if="scope.row.netWorkArea == 0">省内</span>
                  <span v-if="scope.row.netWorkArea == 1">全国</span>
                </div>
                <div v-if="p.prop == 'statusCL'">
                  <span v-if="scope.row.status == 1">上架</span>
                  <span v-else-if="scope.row.status == 0">下架</span>
                  <span v-else-if="scope.row.status == 2">回收</span>
                </div>
                <div v-if="p.prop == 'networkTotalQG'">
                  <span v-show="scope.row.netWorkArea == 1">{{scope.row.networkTotal}}</span>
                </div>
                <div v-if="p.prop == 'networkTotalSN'">
                  <span v-show="scope.row.netWorkArea == 0">{{scope.row.networkTotal}}</span>
                </div>
                <div v-if="p.prop == 'operation'">

                  <el-button size="mini" v-if="scope.row.status===0 || scope.row.status===2" @click="deactivation(scope.row,1)">上架</el-button>
                  <el-button size="mini" v-if="scope.row.status===1 || scope.row.status===0" @click="deactivation(scope.row,2)">上架不显示</el-button>
                  <el-button size="mini" v-if="scope.row.status===2 || scope.row.status===1" @click="deactivation(scope.row,0)">下架</el-button>
                  <el-button size="mini" @click="modityChannelGoods(scope.row)">编辑</el-button>
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
    <!-- 编辑 弹框 -->
    <el-dialog title="修改商品" :visible.sync="editVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
      <el-form ref="editFormRef" :model="editForm" label-width="110px">
        <el-form-item label="商品显示名">
          <el-input v-model="editForm.nickName" placeholder="请输入商品显示名"></el-input>
        </el-form-item>
        <el-form-item label="原始价格">
          <el-input v-model.number="editForm.orgPrice" placeholder="请输入原始价格"></el-input>
        </el-form-item>
        <el-form-item label="销售价格">
          <el-input v-model.number="editForm.salePrice" placeholder="请输入销售价格"></el-input>
        </el-form-item>
        <el-form-item label="商品说明">
          <el-input v-model="editForm.description" placeholder="请输入商品说明"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select style="width:100%;" v-model="editForm.status" placeholder="请选择状态">
            <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: right;display: block;margin-right: 10px;">
        <el-button @click="editVisible = false">取 消</el-button>
        <el-button type="primary" @click="editIt()">确 定</el-button>
      </span>
    </el-dialog>
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
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格 label 字段名称
      table_column: [
        // { prop: 'channelName', label: '渠道名', width: 100, fixed: 'left' },
        { prop: 'packageName', label: '套餐/商品名', width: 150, fixed: 'left' },
        { prop: 'nickName', label: '显示名', width: 300 },
        { prop: 'packageNo', label: '商品编号', width: 80 },
        { prop: 'packageTypeCL', label: '商品类型', width: 100 },
        { prop: 'networkTotalQG', label: '全国流量(MB)', width: 80 },
        { prop: 'networkTotalSN', label: '省内流量(MB)', width: 80 },
        { prop: 'netWorkAreaCL', label: '流量区域', width: 80 },
        { prop: 'provinceName', label: '归属地', width: 80 },
        { prop: 'voiceTotal', label: '语音(分钟)', width: 80 },
        { prop: 'cardFee', label: '卡费', width: 80 },
        { prop: 'orignPrice', label: '原始价(元)', width: 80 },
        { prop: 'salePrice', label: '销售价(元)', width: 80 },
        { prop: 'clearPeriod', label: '用量清零周期(月)', width: 110 },
        { prop: 'validMoth', label: '产品有效期(月)', width: 100 },
        { prop: 'clearTypeCL', label: '用量清算方式', width: 110 },
        { prop: 'description', label: '备注', width: 100 },
        { prop: 'statusCL', label: '状态', width: 80 },
        { prop: 'operation', label: '操作', width: 260, fixed: 'right' }

      ],
      queryInventoryForm: {
        packageId: '',
        page: 0,
        pageSize: 10,
      },
      // 套餐列表下拉框
      porductsListOptions: [],
      // 状态
      statusOptions: [
        { label: "上架", value: 1 },
        { label: "下架", value: 0 },
        { label: "上架不显示", value: 2 }
      ],
      typeOptions: [
        { label: '套餐', value: 0 },
        { label: '加油包', value: 1 },
        { label: '充值金额', value: 2 }
      ],
      addChannelPackageDialogVisible: false,
      provincesList: [],
      channelIdTree: null,
      editVisible: false,
      editForm: {
        description: null,
        id: null,
        nickName: null,
        orgPrice: null,
        salePrice: null,
        status: null
      },
      loading: false
    }
  },
  mounted () {
    this.getchannelPackageAllocationList()
    this.getPorductsListOptions()
    this.getProvincesList()
  },
  methods: {
    channelChick (channel) {
      if (!channel) return
      const parentChannelId = channel.channelId
      sessionStorage.setItem('channelId', parentChannelId)
      this.channelIdTree = sessionStorage.getItem('channelId')
      this.getchannelPackageAllocationList(parentChannelId)
    },
    // 子组件传来的点击渠道事件
    getChannelId (channelsID) {
      this.channelsID = channelsID
      sessionStorage.setItem('channelId', channelsID)
      this.getchannelPackageAllocationList(channelsID)
      this.channelIdTree = sessionStorage.getItem('channelId')
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
      let queryInventoryForm = this.queryInventoryForm;
      let params = Object.assign(
        queryInventoryForm,
        channelId
      );
      this.loading = true
      API.apiChannelsPackages(params).then(res => {
        if (res.resultCode === 0) {
          this.channelPackageAllocationList = res.data
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
      this.getchannelPackageAllocationList(this.channelIdTree)
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInventoryForm.page = newPage - 1
      this.getchannelPackageAllocationList(this.channelIdTree)
    },
    // 获取归属地
    getProvincesList () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provincesList = res.data
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
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addChannelPackageShow () {
      if (this.channelIdTree === null || this.channelIdTree === '') {
        this.$message.error('请选择渠道')
      } else {
        this.$refs.addChanelPCGRef.dialogVisible = true;
      }
    },
    addChanelPCGSuccess (data) {
      API.apiChannelsPackagesAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getchannelPackageAllocationList(this.channelIdTree)
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
        API.apiChannelsPackagesStatusModify(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('操作成功！')
            this.getchannelPackageAllocationList(this.channelIdTree)
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      });
    },
    getGoodsList () {
      const params = {
        page: 0,
        pageSize: 10000
      }
      API.apiGoodsList(params).then(res => {
        if (res.resultCode === 0) {
          this.GoodsList = res.data
          this.cardFeeList = this.GoodsList.filter(item => {
            return item.type === 2
          }).map(item => {
            return item
          })
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    modityChannelGoods (row) {
      console.log(row);
      this.editForm.description = row.description
      this.editForm.id = row.id
      this.editForm.nickName = row.nickName
      this.editForm.orgPrice = Number(row.orignPrice)
      this.editForm.salePrice = Number(row.salePrice)
      this.editForm.status = row.status
      this.editVisible = true
    },
    editIt () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.editForm)
        this.editPackageSuccess(data)

      })
    },
    // 编辑成功之后，刷新页面
    editPackageSuccess (data) {
      API.apiChannelsGoodsModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('编辑成功！')
          this.getchannelPackageAllocationList(this.channelIdTree)
          this.editVisible = false
          this.$refs.editFormRef.resetFields()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
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
