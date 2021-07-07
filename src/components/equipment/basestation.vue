<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-upload2">导入基站列表</el-button>
      </div>
      <!-- 列表区域 -->
      <el-table v-loading="loading" :data="basestationList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
            <div v-if="p.prop == 'isWhiteCL'">
              <span v-if="scope.row.isWhite === 0">否</span>
              <span v-else>是</span>
            </div>
            <div v-if="p.prop == 'operation'">
              <el-button type="danger" size="mini" plain>删除</el-button>
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
// import API from 'api/equipment'
export default {
  data () {
    return {
      // 卡信息列表
      basestationList: [],
      // 列表，标题、字段
      table_column: [
        { prop: 'id', label: '序号', width: 150 },
        { prop: 'name', label: '站名', width: 100 },
        { prop: 'no', label: '小区号' },
        { prop: 'tac', label: 'TAC', width: 120 },
        { prop: 'type', label: '类型', width: 240 },
        { prop: 'city', label: '城市', width: 120 },
        { prop: 'isWhiteCL', label: '是否白名单', width: 150 },
        { prop: 'operation', label: '操作', width: 120, fixed: 'right' }
      ],
      loading: false
    };
  },
  mounted () {
    this.getbasestationlist()
  },
  methods: {
    //获取 列表 ----未完成
    getbasestationlist () {
      // const params = this.queryEquipmentForm
      // this.loading = true
      // API.apiDevicesList(params).then(res => {
      //   if (res.resultCode === 0) {
      //     this.basestationList = res.data
      //     this.total = res.rowNum
      //     console.log(this.basestationList);
      //     this.loading = false
      //   } else {
      //     this.$message.error(res.resultInfo)
      //   }
      // })
    }
  }
};
</script>
