<template>
  <el-dialog title="文件导入" :visible.sync="dialogVisible" width="412px" :close-on-click-modal="false" :destroy-on-close="true">
    <el-form ref="ImportForm" :model="ImportForm" :rules="ImportRules" label-width="120px">
      <el-form-item label="渠道" prop="channelId">
        <channelSelect v-model="ImportForm.channelId" @channelSelectId="channelSelectId"></channelSelect>
      </el-form-item>
      <el-form-item label="备注" prop="remarks">
        <el-input size="small" v-model.number="ImportForm.remarks" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form ref="ImportForm" :model="ImportForm" label-width="120px">
        <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form>
    </el-form>
    <div class="notice">
      <p>1、下载模板后，填写数据。ICCID、卡号为必须字段，卡号可以带86。</p>
      <p>2、如果数据存在则做更新操作，只会更新：级别与状态两个字段，请注意。</p>
      <p>3、如果需要迁移网格，请使用迁移网络功能。</p>
      <p>4、卡号码状态对应编码 1:录入2:可销售5:已分配3:已开卡6:已激活7:已注销9:已销毁。</p>
      <p>
        <a href>下载模板文件</a> 仅支持xlsx,xls格式的文件.
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="uploadIt()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import channelSelect from './../channelSelect'
export default {
  data () {
    return {
      // 仓位列表
      storingLocationOptions: [
        { label: "天地杰", value: "1" },
        { label: "友众力", value: "2" }
      ],
      dialogVisible: false,
      ImportForm: {
        channelId: null,
        file: '',
        remarks: null
      },
      // 导入
      fileList: [],
      ImportRules: {
        channelId: [
          { required: true, message: "请选择渠道", trigger: "change" }
        ],
        cardType: [{ required: true, message: "请选择卡类型", trigger: "change" }]
      }
    };
  },
  components: {
    channelSelect
  },
  props: [],
  methods: {
    channelSelectId (channelSelectId) {
      this.ImportForm.channelId = channelSelectId
      // console.log(channelSelectId);
    },
    uploadFile (item) {
      console.log(item);
      const that = this
      that.file = item.file
    },
    // 导入文件
    uploadIt () {
      this.$refs["ImportForm"].validate(valid => {
        if (!valid) return
        const that = this
        if (!that.file) {
          that.$message.error({
            message: "请选择文件",
            type: "error",
            duration: 2000
          })
        } else {
          const param = new FormData()
          param.append('file', that.file)
          console.log(param);
          const channelId = this.ImportForm.channelId
          this.$emit("ImportModalSuccess", channelId, param)
          this.dialogVisible = false
        }
      })
    }
  }
};
</script>