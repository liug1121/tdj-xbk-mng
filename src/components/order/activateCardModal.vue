<template>
  <el-dialog title="预开卡" :visible.sync="dialogVisible" width="412px" :close-on-click-modal="false" :destroy-on-close="true">
    <el-form ref="PreOpeningCardRef" :model="PreOpeningCardForm" :rules="PreOpeningCardRules" label-width="120px">
      <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
      <el-form-item label="渠道" prop="channelId">
        <channelSelect size="small" @channelSelectId="channelSelectId"></channelSelect>
      </el-form-item>
      <el-form-item label="商品" prop="goodId">
        <el-select size="small" style="width:100%" v-model="PreOpeningCardForm.goodId" filterable placeholder="请输入商品关键词" :disabled="noDisabled">
          <el-option v-for="item in PackagesListOptions" v-show="item.packageType ===0" :key="item.id" :label="item.packageName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="预充值" prop="price">
        <el-input size="small" v-model.number="PreOpeningCardForm.price" placeholder="请输入预充值金额"></el-input>
      </el-form-item>
      <el-form-item label="联系人" prop="contact">
        <el-input size="small" v-model="PreOpeningCardForm.contact" placeholder="请输入联系人"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input size="small" type="textarea" v-model="PreOpeningCardForm.comment" placeholder="请输入备注"></el-input>
      </el-form-item>
    </el-form>
    <div class="notice">
      <p>
        下载模板文件后，填写数据。号码去86，完整的11位数;
      </p>
      <p>ICCID,号码 数据必须匹配;</p>
      <p>号码状态不能为已开卡已激活状态;</p>
      <p>
        <a>下载模板文件</a> 仅支持xlsx,xls格式的文件。
      </p>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="clickConfirm()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import channelSelect from './../sale/channelSelect'
import API from 'api/order'
export default {
  data () {
    return {
      dialogVisible: false,
      PreOpeningCardForm: {
        channelId: '',
        comment: '',
        contact: '',
        goodId: '',
        price: '',
        file: ''
      },
      //   导入
      fileList: [],
      PackagesListOptions: [],
      noDisabled: true,
      PreOpeningCardRules: {
        channelId: [
          { required: true, message: '请选择渠道', trigger: 'change' }
        ],
        // goodId: [
        //   { required: true, message: '请选择商品', trigger: 'change' }
        // ],
        price: [
          { required: true, message: '请输入预充值金额', trigger: 'change' },
          { type: 'number', message: '预充值金额必须为数字值' }
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'change' }
        ]
      }
    };
  },
  components: {
    channelSelect
  },
  methods: {
    // 获取渠道id
    channelSelectId (channelSelectId) {
      this.PreOpeningCardForm.channelId = channelSelectId
      this.getPorductsListOptions(channelSelectId)
      this.noDisabled = false
    },
    // 根据渠道获取商品列表
    getPorductsListOptions (channelSelectId) {
      const data = {
        page: 0,
        pageSize: 100,
        channelId: channelSelectId
      }
      API.apichannelsPackagesList(data).then(res => {
        if (res.resultCode === 0) {
          this.PackagesListOptions = res.data
          console.log(this.PackagesListOptions);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    uploadFile (item) {
      console.log(item);
      const that = this
      that.file = item.file
    },
    clickConfirm () {
      const that = this
      this.$refs.PreOpeningCardRef.validate(valid => {
        if (!valid) return
        if (!that.file) {
          that.$message.error({
            message: "请选择文件"
            // type: "error",
            // duration: 2000
          })
        } else {
          // const groupId = that.groupId
          // console.log(groupId);
          const param = new FormData()
          param.append('file', that.file)
          const comment = that.PreOpeningCardForm.comment
          const contact = that.PreOpeningCardForm.contact
          const goodId = that.PreOpeningCardForm.goodId
          const price = that.PreOpeningCardForm.price
          const channelId = that.PreOpeningCardForm.channelId
          console.log(comment);
          this.$emit("activateCardSuccess", param, channelId, comment, contact, goodId, price)
          this.dialogVisible = false
        }
      });

    }
  }
};
</script>

<style>
.unload-demo {
  display: flex;
  margin-bottom: 10px;
}
.el-upload-list__item:first-child {
  margin-top: 0;
  line-height: 34px;
}
</style>