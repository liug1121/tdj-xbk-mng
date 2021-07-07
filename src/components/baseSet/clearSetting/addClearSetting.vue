<template>
  <el-dialog title="新增套餐清零设置" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="90px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="addForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeButton">取 消</el-button>
      <el-button type="primary" @click="addBasic()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      addForm: {
        name: ""
      },
      addRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ]
      }
    };
  },
  mounted () { },
  methods: {
    closeButton () {
      this.$refs.addForm.resetFields()
      this.dialogVisible = false;
    },
    addBasic () {
      this.$refs.addForm.validate(valid => {
        if (!valid) return
        this.$emit("addBasicSuccess");
        // 新增完成后 清空表单
        this.$refs.addForm.resetFields()
        this.dialogVisible = false;
      });
    }
  }
};
</script>
