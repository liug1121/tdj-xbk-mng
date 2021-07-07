<template>
  <!-- 输入 2021-01月 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 按钮 -->
      <div class="button_content">
        <el-button class="upload-btn" size="medium" icon="el-icon-upload2" slot="trigger" type="primary" @click="openImportModal">导入</el-button>
      </div>
    </el-card>
    <!-- 文件导入弹出框 -->
    <el-dialog title="文件导入" :visible.sync="dialogVisible" width="400px" :close-on-click-modal="false" :destroy-on-close="true">
      <el-form ref="ImportForm" :model="ImportForm" :rules="ImportRules" label-width="120px">

        <el-form-item label="蜂窝平台账户" prop="fwAccount">
          <el-select style="width:217px" size="small" v-model="ImportForm.fwAccount" clearable filterable placeholder="请输入蜂窝平台账户关键词" @change="fwAccountChange">
            <el-option v-for="item in honeycombOptions" :key="item.id" :label="item.fwAccount" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="账期" prop="cycle">
          <el-date-picker size="small" style="width:217px" v-model="ImportForm.cycle" type="month" placeholder="请选择账期" value-format="yyyyMM">
          </el-date-picker>
        </el-form-item>

        <el-form ref="ImportForm" :model="ImportForm" label-width="120px">
          <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form>
      </el-form>
      <div class="notice">
        <p>1、下载模板后，填写数据。</p>
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
  </div>
</template>

<script>
import API from 'api/StatisticsBill'
export default {
  data () {
    return {
      dialogVisible: false,
      ImportForm: {
        fwAccount: null,
        cycle: null,
      },
      honeycombOptions: [],
      // 用量
      usageTypeOptions: [
        { label: "无用量", value: 0 },
        { label: "有用量", value: 1 }
      ],
      // 导入
      fileList: [],
      ImportRules: {
        fwAccount: [
          { required: true, message: '请选择蜂窝平台账户', trigger: "blur" }
        ],
        cycle: [
          { required: true, message: '请选择账期', trigger: "blur" }
        ]
      }
    }
  },
  components: {},
  mounted () { },
  methods: {
    // 获取蜂窝平台信息
    gethoneycombOptions () {
      const params = {
        page: 0,
        pageSize: 10000
      }
      API.apiFwAccountList(params).then(res => {
        if (res.resultCode === 0) {
          this.honeycombOptions = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 蜂窝账号
    fwAccountChange (vId) {
      let obj = {};
      obj = this.honeycombOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.id);
      // console.log(obj.fwAccount); // 这边的name就是对应label
      this.ImportForm.fwAccount = obj.fwAccount
    },
    uploadFile (item) {
      const that = this
      that.file = item.file
    },
    openImportModal () {
      this.dialogVisible = true
      this.gethoneycombOptions()
    },
    uploadIt () {
      this.$refs["ImportForm"].validate(valid => {
        if (!valid) return
        const that = this
        if (!that.file) {
          that.$message.error({
            message: "请选择文件"
          })
        } else {
          const param = new FormData()
          param.append('file', that.file)
          const fwAccount = this.ImportForm.fwAccount
          const cycle = this.ImportForm.cycle
          API.apiBillUploadAdd(fwAccount, cycle, param).then(res => {
            if (res.resultCode === 0) {
              this.$message.success(`已导入，如果无数据，可在“我的任务”中查看ID值为${res.data}的导入结果信息！`)
            } else {
              this.$message.error(res.resultInfo)
            }
          })
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>

<style scoped>
</style>