<template>
  <el-dialog title="新增套餐类型" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="90px">

      <el-form-item label="名称" prop="typeName">
        <el-input v-model="addForm.typeName" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model.number="addForm.type" placeholder="请输入类型,只能是数字"></el-input>
      </el-form-item>

      <el-form-item label="应用场景" prop="useScene">
        <el-select style="width:100%;" v-model="addForm.useScene" placeholder="请选择应用场景">
          <el-option v-for="item in sceneOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="common">
        <el-input v-model="addForm.common" placeholder="请输入备注"></el-input>
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
        typeName: "",
        common: "",
        useScene: "",
        type: '',
        age: ''
      },
      addRules: {
        typeName: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: "blur" },
          { type: 'number', message: '类型必须为数字', trigger: "blur" }
        ]
      }
    };
  },
  props: ["sceneOptions"],
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
