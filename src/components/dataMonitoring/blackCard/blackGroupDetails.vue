<template>
  <!-- 黑名单卡组明细 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <div class="heraderTop">
        <div class="button_content">
          <el-button size="medium" type="primary" icon="el-icon-upload2">导出</el-button>
        </div>
        <!-- 查询区域 -->
        <el-form :inline="true" ref="queryBlackGroupFormRef" :model="queryBlackGroupFormModel" class="queryForm">
          <el-form-item label="iccid" class="queryFormItem">
            <el-input class="queryFormInput" v-model="queryBlackGroupFormModel.iccid" clearable placeholder="请输入推送地址"></el-input>
          </el-form-item>
          <el-form-item label="省份" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryBlackGroupFormModel.provinceId" clearable filterable placeholder="请选择省份" @change="provinceChange">
              <el-option v-for="item in provinceOptions" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryBlackGroupFormModel.cityId" clearable filterable placeholder="请选择城市名">
              <el-option v-for="item in PoisCitiesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="queryBlackGroupButton">查询</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="blackGrouplist" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}" @row-dblclick='handledbClick'>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop =='statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button v-if="scope.row.status == 1" size="mini" type="danger" plain @click="deactivation(scope.row,0)">停用</el-button>
              <el-button v-if="scope.row.status == 0" size="mini" type="warning" plain @click="deactivation(scope.row,1)">启用</el-button>
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import API from 'api/dataMoniting'
export default {
  components: {
  },
  data () {
    return {
      // 列表显示
      blackGrouplist: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格
      table_column: [
        { prop: 'iccid', label: 'iccid', width: 190 },
        { prop: 'province', label: '省', width: 100 },
        { prop: 'city', label: '市', width: 100 },
        { prop: 'address', label: '详细地址' },
        { prop: 'lbsTime', label: '定位时间', width: 180 },
        { prop: 'statusCL', label: '状态', width: 100 },
        { prop: 'operation', label: '操作', width: 100 }
      ],
      // 处理策略
      statusOptions: [
        { label: "使用", value: 1 },
        { label: "停用", value: 0 }
      ],
      // 省份
      provinceOptions: [],
      PoisCitiesList: [],
      // 查询表字段
      queryBlackGroupFormModel: {
        cityId: null,
        groupId: Number(sessionStorage.getItem('groupId')),
        iccid: null,
        provinceId: null,
        page: 0,
        pageSize: 10
      },
      loading: false
    };
  },
  mounted () {
    this.getBlackGrouplist()
    this.getprovinceOptions()
  },
  methods: {
    handledbClick (row, event, column) {
      console.log(row)
      const iccid = row.iccid
      sessionStorage.setItem('iccid', iccid)
      this.$router.push({
        path: 'blackCardDetails',
        query: { iccid: iccid }
      })
    },
    //获取分页列表
    getBlackGrouplist () {
      // 获取查询字段
      let params = this.queryBlackGroupFormModel;
      this.loading = true
      // 获取后台数据
      API.apiLbsGroupDetails(params).then(res => {
        if (res.resultCode === 0) {
          this.blackGrouplist = res.data
          // console.log(this.blackGrouplist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryBlackGroupFormModel.pageSize = newSize
      this.getBlackGrouplist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryBlackGroupFormModel.page = newPage - 1
      this.getBlackGrouplist()
    },
    queryBlackGroupButton () {
      if (this.queryBlackGroupFormModel.cityId === '') {
        this.queryBlackGroupFormModel.cityId = null
      }
      if (this.queryBlackGroupFormModel.iccid === '') {
        this.queryBlackGroupFormModel.iccid = null
      }
      if (this.queryBlackGroupFormModel.provinceId === '') {
        this.queryBlackGroupFormModel.provinceId = null
      }
      this.getBlackGrouplist()
    },
    // 获取省份
    getprovinceOptions () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provinceOptions = res.data
          // console.log(this.provinceOptions);
          const provinceId = this.provinceOptions[0].provinceId
          this.getPoisCitiesList(provinceId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听省份id
    provinceChange (vId) {
      let obj = {};
      obj = this.provinceOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.provinceId === vId; // 筛选出匹配数据
      });
      // console.log(obj.provinceId);
      // console.log(obj.provinceName); // 这边的name就是对应label
      this.getPoisCitiesList(obj.provinceId)
    },
    // 获取需市
    getPoisCitiesList (provinceId) {
      const data = {
        provinceId: provinceId
      }
      API.apiPoisCitiesList(data).then(res => {
        if (res.resultCode === 0) {
          this.PoisCitiesList = res.data
          // console.log(this.PoisCitiesList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 操作状态
    deactivation (row, type) {
      const data = {
        groupId: Number(sessionStorage.getItem('groupId')),
        iccid: row.iccid,
        status: type
      }
      API.apiLbsGroupStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getBlackGrouplist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
  }
};
</script>
<style scoped>
.time-line {
  display: inline-block;
  width: 20px;
  text-align: center;
}
.el-table__body-wrapper is-scrolling-left {
  max-height: 487px !important;
}
</style>
