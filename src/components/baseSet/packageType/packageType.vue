<template>
  <!--  套餐类型 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-plus" @click="addDialogShow">添加</el-button>
      </div>
      <!-- table表格区域 -->
      <el-table :data="packageTypeList" border max-height="420" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in packageType_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
          <template slot-scope="scope">
            <div v-if="p.prop == 'useSceneCL'">
              <span v-if="scope.row.useScene == '01'">卡池</span>
              <span v-else-if="scope.row.useScene == '02'">卡</span>
              <span v-else></span>
            </div>
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
    <add-products-type ref="addPackageTypeModal" @addBasicSuccess="addBasicSuccess" :sceneOptions="sceneOptions"></add-products-type>
  </div>
</template>

<script>
import addPackageType from './addPackageType'
import API from 'api/baseSet'
export default {
  name: 'products',
  components: {
    'add-products-type': addPackageType
  },
  data () {
    return {
      packageTypeList: [],
      packageType_column: [
        { prop: 'typeId', label: '编号', width: 100 },
        { prop: 'typeName', label: '名称' },
        { prop: 'useSceneCL', label: '应用场景', width: 100 },
        { prop: 'common', label: '备注', width: 100 }
      ],
      // 应用场景
      sceneOptions: [
        { label: "卡池", value: "01" },
        { label: "卡", value: "02" }
      ]
    }
  },
  mounted () {
    this._basicPackageTypeList();
    this.username = this.$store.state.userinfo.username;
  },
  methods: {
    // 获取列表
    _basicPackageTypeList () {
      API.apiProductsTypes().then(res => {
        if (res.resultCode === 0) {
          this.packageTypeList = res.data.reverse()
          console.log(this.packageTypeList)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    // 点击添加 button
    addDialogShow () {
      this.$refs.addPackageTypeModal.dialogVisible = true;
    },

    // 新增提交 
    addBasicSuccess () {
      // console.log(JSON.stringify(this.$refs.addPackageTypeModal.addForm));
      const data = JSON.stringify(this.$refs.addPackageTypeModal.addForm)
      console.log(data);
      API.apiPackagesTypesAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this._basicPackageTypeList()
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
