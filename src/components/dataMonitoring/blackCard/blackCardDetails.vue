<template>
  <!-- 黑名单卡明细 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <div class="heraderTop">
        <div class="button_content">
          <el-button size="medium" type="primary" icon="el-icon-upload2" @click="CardDownload">导出</el-button>
        </div>
      </div>
      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="blackCardDetailslist" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop =='statusCL'">
              <span v-if="scope.row.status == 0">停用</span>
              <span v-else-if="scope.row.status == 1">启用</span>
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
      excelName: '黑名单卡明细表',
      // 列表显示
      blackCardDetailslist: [],
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
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
        { prop: 'statusCL', label: '状态', width: 100 }
      ],
      queryForm: {
        cityId: null,
        groupId: Number(sessionStorage.getItem('groupId')),
        iccid: sessionStorage.getItem('iccid'),
        provinceId: null
      },
      loading: false
    };
  },
  mounted () {
    this.getBlackCardDetailslist()
  },
  methods: {
    //获取分页列表
    getBlackCardDetailslist () {
      // 获取查询字段
      let queryForm = this.queryForm
      let params = Object.assign(
        this.queryInfo,
        queryForm
      );
      this.loading = true
      // 获取后台数据
      API.apiLbsGroupCardDetails(params).then(res => {
        if (res.resultCode === 0) {
          this.blackCardDetailslist = res.data
          console.log(this.blackCardDetailslist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.getBlackGrouplist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryInfo.page = newPage - 1
      this.getBlackGrouplist()
    },
    CardDownload () {
      console.log('导出');
      const groupId = sessionStorage.getItem('groupId')
      const iccid = sessionStorage.getItem('iccid')
      console.log(groupId);
      console.log(iccid);
      window.location.href = `http://119.29.252.68:8889/boss/v1.0/lbs/group/card/download/${groupId}/${iccid}`
      // API.apiLbsGroupCardDownload(groupId, iccid).then(res => {
      //   if (!res) {
      //     return
      //   }
      //   let url = window.URL.createObjectURL(new Blob([res]))
      //   let link = document.createElement('a')
      //   link.style.display = 'none'
      //   link.href = url
      //   link.setAttribute('download', `${this.excelName}.xlsx`)

      //   document.body.appendChild(link)
      //   link.click()
      // })
    }
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
