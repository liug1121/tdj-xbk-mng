<template>
  <el-dialog title="文件导入" :visible.sync="dialogVisible" width="412px" :close-on-click-modal="false" :destroy-on-close="true">
    <el-form ref="ImportForm" :model="ImportForm" :rules="ImportRules" label-width="120px">
      <el-form-item label="蜂窝平台账户" prop="fwAccount">
        <el-select v-model="ImportForm.fwAccount" clearable filterable placeholder="请输入蜂窝平台账户关键词" style="width:100%" @change="fwAccountChange">
          <el-option v-for="item in honeycombOptions" :key="item.id" :label="item.fwAccount" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="卡类型" prop="cardType">
        <el-select v-model="ImportForm.cardType" clearable placeholder="请选择卡类型" style="width:100%">
          <el-option v-for="item in cardTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="仓位">
        <el-select v-model="ImportForm.stockType" clearable placeholder="请选择仓位" style="width:100%" @change="stockTypeChange">
          <el-option v-for="item in storingLocationOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>

      <el-form ref="ImportForm" :model="ImportForm" label-width="120px">
        <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </el-form>
    </el-form>
    <div class="notice">
      <p>1、下载模板后，填写数据。ICCID、卡号为必须字段，卡号可以带86。</p>
      <p>2、如果数据存在则会报错，请注意。</p>
      <p>
        <a>下载模板文件</a> 仅支持xlsx,xls格式的文件.
      </p>
    </div>
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
      // 仓位列表
      storingLocationOptions: [
        { label: "天地杰", value: "1" },
        { label: "友众力", value: "2" }
      ],
      dialogVisible: false,
      ImportForm: {
        fwAccount: null,
        cardType: null,
        stockType: null,
        file: ''
      },
      // 导入
      fileList: [],
      ImportRules: {
        fwAccount: [
          { required: true, message: "请选择蜂窝平台账户", trigger: "change" }
        ],
        cardType: [{ required: true, message: "请选择卡类型", trigger: "change" }]
      }
    };
  },
  props: ['cardTypeOptions', 'honeycombOptions'],
  methods: {
    // 蜂窝账号
    fwAccountChange (vId) {
      let obj = {};
      obj = this.honeycombOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.openCompanyDesc);
      // console.log(obj.fwAccount); // 这边的name就是对应label
      this.ImportForm.fwAccount = obj.fwAccount
      this.ImportForm.stockType = obj.openCompanyDesc
    },
    // 仓位名称
    stockTypeChange (vId) {
      let obj = {};
      obj = this.storingLocationOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.value === vId; // 筛选出匹配数据
      });
      // console.log(obj.value);
      // console.log(obj.label); // 这边的name就是对应label
      this.ImportForm.stockType = obj.label
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
            // type: "error",
            // duration: 2000
          })
        } else {
          const param = new FormData()
          param.append('file', that.file)
          const cardType = this.ImportForm.cardType
          const fwAccount = this.ImportForm.fwAccount
          const stockType = this.ImportForm.stockType
          this.$emit("ImportModalSuccess", cardType, fwAccount, stockType, param)
          this.dialogVisible = false
        }
      })
    }
  }
};
</script>