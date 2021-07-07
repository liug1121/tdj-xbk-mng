<template>
  <el-dialog title="文件导入" :visible.sync="dialogVisible" width="412px" :close-on-click-modal="false" :destroy-on-close="true">
    <el-form ref="ImportForm" :model="ImportForm" :rules="ImportRules" label-width="120px">
      <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>

      <el-form-item label="蜂窝平台账户" prop="fwAccount">
        <el-select v-model="ImportForm.fwAccount" filterable placeholder="请输入蜂窝平台账户关键词" style="width:100%" @change="fwAccountChange">
          <el-option v-for="item in fwAccountOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <!-- <el-form-item label="上传文件">
        <el-upload class="upload-demo" action :show-file-list="false" :auto-upload="true" ref="upLoad" :file-list="fileList" :before-upload="beforeUpload" @change="handleImportExcel" accept=".xls, .xlsx">
          <el-button class="upload-btn" size="medium" slot="trigger">
            <i class="el-icon-plus" style="margin-right:5px;"></i>点击上传文件
          </el-button>
        </el-upload>
      </el-form-item> -->
    </el-form>
    <div class="notice">
      <p>
        <a>下载模板文件</a> 仅支持xlsx,xls格式的文件.
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
export default {
  data () {
    return {
      dialogVisible: false,
      ImportForm: {
        fwAccount: '',
        file: ''
      },
      //   导入
      fileList: [{ name: '' }],
      ImportRules: {
        fwAccount: [
          { required: true, message: "请选择蜂窝平台账户", trigger: "change" }
        ]
      }
    };
  },
  props: ['fwAccountOptions'],
  methods: {
    //上传之前的钩子
    // beforeUpload (file) {
    //   var type = file.name.substring(file.name.lastIndexOf(".") + 1);
    //   var file_type = type === "xls" || type === "xlsx";
    //   if (!file_type) {
    //     this.$message.error("上传文件类型只能是表格！");
    //     this.fileList = [];
    //     // $("#btn").blur();
    //     return false;
    //   } else {
    //     this.fileList = [file];
    //     // console.log(this.fileList[0].name);
    //     console.log(this.fileList);

    //     return false;
    //   }
    // },
    fwAccountChange (vId) {
      let obj = {};
      obj = this.fwAccountOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.value === vId; // 筛选出匹配数据
      });
      // console.log(obj.value);
      // console.log(obj.label); // 这边的name就是对应label
      this.ImportForm.fwAccount = obj.label
    },
    uploadFile (item) {
      console.log(item);
      const that = this
      that.file = item.file

    },
    clickConfirm () {
      const that = this
      if (!that.file) {
        that.$message.error({
          message: "请选择文件",
          type: "error",
          duration: 2000
        })
      } else {
        const account = that.ImportForm.fwAccount
        // const param = {
        //   // fwAccount: that.ImportForm.fwAccount,
        //   file: that.file
        // }
        const param = new FormData()
        param.append('file', that.file)
        console.log(param);
        this.$emit("InportModalSuccess", param, account)
        this.dialogVisible = false
      }
    }
  }
};
</script>