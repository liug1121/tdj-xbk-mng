<template>
  <!-- 按首尾分配渠道 刘珍利 -->
  <el-dialog title="首尾分配" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="SWdistributeRef" :model="SWdistributeForm" :rules="SWdistributeRules" label-width="120px">
      <el-form-item label="渠道" prop="channelId">
        <channelSelect @channelSelectId="channelSelectId"></channelSelect>
      </el-form-item>
      <el-form-item label="首ICCID(19位)" prop="iccidStart">
        <el-input size="small" v-model="SWdistributeForm.iccidStart" placeholder="请输入首ICCID(19位)"></el-input>
      </el-form-item>
      <el-form-item label="尾ICCID(19位)" prop="iccidEnd">
        <el-input size="small" v-model="SWdistributeForm.iccidEnd" placeholder="请输入尾ICCID(19位)"></el-input>
      </el-form-item>
    </el-form>
    <div class="notice">
      <p>1、注意：请输入19位数的ICCID，每次分配不能超过2万张卡</p>
      <p>2、系统会根据输入的首ICCID（包含），和尾ICCID（包含），查询出这之间的数据进行分配渠道。</p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeButton">取 消</el-button>
      <el-button type="primary" @click="uploadIt()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import channelSelect from './../channelSelect'
export default {
  components: {
    channelSelect
  },
  data () {
    return {
      // 模态框 隐藏
      dialogVisible: false,
      // form 表单字段
      SWdistributeForm: {
        channelId: null,
        iccidEnd: '',
        iccidStart: ''
      },
      // 字段验证
      SWdistributeRules: {
        channelId: [{ required: true, message: "请选择渠道", trigger: "blur" }]
      },
    };
  },
  methods: {
    // 从子组件 获取 对应的 渠道id
    channelSelectId (channelSelectId) {
      this.SWdistributeForm.channelId = channelSelectId
      // console.log(channelSelectId);
    },
    closeButton () {
      this.dialogVisible = false;
      this.$refs.SWdistributeRef.resetFields()
    },
    // 点击 确定 按钮
    uploadIt () {
      this.$refs.SWdistributeRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.SWdistributeForm)
        // console.log(data);
        this.$emit("SWdistributeSuccess", data);
        this.dialogVisible = false;
        this.$refs.SWdistributeRef.resetFields()
      });
    }
  }
};
</script>
