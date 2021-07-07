<template>
  <el-dialog title="新增资费计划" :visible.sync="dialogVisible" width="445px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="105px">
      <el-form-item label="蜂窝账号">
        <el-select v-model="addForm.fwAccount" filterable placeholder="请输入蜂窝账号关键词" style="width:100%">
          <el-option v-for="item in areaOptions" :key="item.id" :label="item.productName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="归属地">
        <el-select v-model="addForm.area" filterable placeholder="请输入归属地关键词" style="width:100%">
          <el-option v-for="item in areaOptions" :key="item.id" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="资费计划名称">
        <el-input v-model="addForm.payName" placeholder="请输入资费计划名称"></el-input>
      </el-form-item>
      <el-form-item label="资费价格">
        <el-input v-model="addForm.price" placeholder="请输入资费价格"></el-input>
      </el-form-item>
      <el-form-item label="用量区域">
        <el-select style="width:100%;" v-model="addForm.areaCanUse" placeholder="请选择用量区域">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套内用量">
        <el-input v-model="addForm.total" placeholder="请输入套内用量"></el-input>
      </el-form-item>
      <el-form-item label="启用时间">
        <el-date-picker v-model="addForm.date" type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
      </el-form-item>
      <el-form-item label="停用时间">
        <el-date-picker v-model="addForm.stopDate" type="date" placeholder="选择日期" style="width:100%" value-format="yyyy-MM-dd hh:mm:ss"></el-date-picker>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadIt()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      addForm: {
        area: null,
        areaCanUse: null,
        date: null,
        fwAccount: null,
        payName: null,
        price: null,
        stopDate: null,
        total: null
      },
      areaOptions: [
        { label: "全国", value: "01" },
        { label: "分省", value: "02" }
      ],
      addRules: {
        area: [{ required: true, message: "请选择归属地", trigger: "blur" }]
      }
    };
  },
  mounted () { },
  methods: {
    uploadIt () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$emit("addSuccess");
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form-item__content {
  margin-left: 100px !important;
}
.el-form-item__label {
  width: 100px !important;
}
</style>
