<template>
  <!--  套餐清零设置 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addDialogShow">添加</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table v-loading="loading" :data="clearSettingList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in clearSetting_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop == 'operation'">
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 新增弹出框 组件 -->
    <add-clear-setting ref="addBasicProductModal" @addBasicSuccess="addBasicSuccess"></add-clear-setting>

  </div>
</template>

<script>
import addClearSetting from './addClearSetting'
import API from 'api/baseSet'
export default {
  name: 'products',
  components: {
    'add-clear-setting': addClearSetting
  },
  data () {
    return {
      clearSettingList: [],
      clearSetting_column: [
        { prop: 'id', label: '编号', width: 100 },
        { prop: 'name', label: '名称' }
      ],
      loading: false
    }
  },
  mounted () {
    this._basicCleartypesList()
  },
  methods: {
    // 获取列表
    _basicCleartypesList () {
      this.loading = true
      API.apiCleartypesList().then(res => {
        if (res.resultCode === 0) {
          this.clearSettingList = res.data
          console.log(this.clearSettingList)
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件

    // 监听 页码值 改变的事件

    // 点击添加 button
    addDialogShow () {
      this.$refs.addBasicProductModal.dialogVisible = true;
    },

    // 新增提交 
    addBasicSuccess () {
      // console.log(JSON.stringify(this.$refs.addBasicProductModal.addForm))
      const data = JSON.stringify(this.$refs.addBasicProductModal.addForm)
      API.apiCleartypesAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this._basicCleartypesList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
}
</script>

<style scoped>
</style>
