<template>
  <el-dialog title="文件导入" :visible.sync="dialogVisible" width="412px" :close-on-click-modal="false" :destroy-on-close="true">
    <el-form ref="ImportForm" :model="ImportForm" label-width="120px">
      <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
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
        groupId: this.groupId,
        file: ''
      },
      //   导入
      fileList: []
    };
  },
  props: ['fwAccountOptions', 'groupId'],
  methods: {
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
        // const groupId = that.groupId
        // console.log(groupId);
        const param = new FormData()
        param.append('file', that.file)
        param.append('groupId', that.groupId)
        console.log(param);
        this.$emit("InportModalSuccess", param)
        this.dialogVisible = false
      }
    }
  }
};
</script>