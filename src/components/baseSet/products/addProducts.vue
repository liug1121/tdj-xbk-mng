<template>
  <!-- 产品 新增模态框 刘珍利 2020-6-18 已完成 -->
  <el-dialog title="新增产品" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <div style="margin-bottom: 20px">
      <el-radio-group v-model="flowRadio" size="medium" @change="flowChange">
        <el-radio-button label="全国流量"></el-radio-button>
        <el-radio-button label="省内流量"></el-radio-button>
        <el-radio-button label="语音"></el-radio-button>
      </el-radio-group>
    </div>
    <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="110px">

      <el-form-item label="名称" prop="name">
        <el-input size="small" style="width:300px;" v-model="addForm.name" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item :label="BSize" prop="size">
        <el-input size="small" style="width:300px;" v-model.number="addForm.size" placeholder="请输入包大小"></el-input>
      </el-form-item>
      <el-form-item label="区域" prop="areaType" v-if="isRegio">
        <el-select size="small" style="width:300px;" v-model="addForm.areaType" placeholder="请选择">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeButoon">取 消</el-button>
      <el-button type="primary" @click="addBasic()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      flowRadio: '全国流量',
      isRegio: true,
      addForm: {
        name: '',
        size: '',
        areaType: '',
        id: ''
      },
      addRules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" }
        ],
        size: [
          { required: true, message: "请输入包大小", trigger: "blur" },
          { type: 'number', message: '必须为数字', trigger: "blur" }
        ]
      },
      BSize: '包大小(MB)'
    };
  },
  props: ["areaOptions"],
  methods: {
    // 新增弹框 点击 流量 时，区域显示，否则：隐藏
    flowChange () {
      // console.log(this.flowRadio);
      if (this.flowRadio !== '语音') {
        this.isRegio = true
        this.BSize = '包大小(MB)'
      } else {
        this.isRegio = false
        this.BSize = '包大小(分钟)'
      }
    },
    closeButoon () {
      this.dialogVisible = false;
      this.$refs.addForm.resetFields()
    },
    addBasic () {
      if (this.flowRadio === '全国流量') {
        this.$refs.addForm.validate(valid => {
          if (!valid) return
          const data = {
            name: this.addForm.name,
            size: Number(this.addForm.size),
            areaType: this.addForm.areaType,
            id: null,
            type: 0
          }
          console.log(data);
          this.$emit("addflowSuccess", data);
          // 新增完成后 清空表单
          this.$refs.addForm.resetFields()
          this.dialogVisible = false;
        });
      } else if (this.flowRadio === '语音') {
        this.$refs.addForm.validate(valid => {
          if (!valid) return
          const data = {
            name: this.addForm.name,
            size: Number(this.addForm.size),
            areaType: null,
            id: null,
            type: 2
          }
          this.$emit("addVoiceSuccess", data);
          // 新增完成后 清空表单
          this.$refs.addForm.resetFields()
          this.dialogVisible = false;
        });
      } else if (this.flowRadio === '省内流量') {
        this.$refs.addForm.validate(valid => {
          if (!valid) return
          const data = {
            name: this.addForm.name,
            size: Number(this.addForm.size),
            areaType: null,
            id: null,
            type: 1
          }
          this.$emit("addSmsSuccess", data);
          // 新增完成后 清空表单
          this.$refs.addForm.resetFields()
          this.dialogVisible = false;
        });
      }

    }
  }
};
</script>
