<template>
  <el-dialog title="新增通信计划" :visible.sync="dialogVisible" width="1040px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form :inline="true" ref="addForm" :model="addForm" :rules="addRules" label-width="105px">
      <el-form-item label="蜂窝账号" prop="fwAccount">
        <el-select v-model="addForm.fwAccount" filterable placeholder="请输入蜂窝账号关键词" style="width:100%" @change="fwAccountChange">
          <el-option v-for="item in honeycombList" :key="item.id" :label="item.accountName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通信计划码" prop="planCode">
        <el-input style="width:217px;" v-model="addForm.planCode" placeholder="请输入通信计划码"></el-input>
      </el-form-item>
      <el-form-item label="通信计划名称" prop="planName">
        <el-input style="width:217px;" v-model="addForm.planName" placeholder="请输入通信计划名称"></el-input>
      </el-form-item>
      <el-form-item label="计划别名" prop="planNickName">
        <el-input style="width:217px;" v-model="addForm.planNickName" placeholder="计划别名"></el-input>
      </el-form-item>
      <el-form-item label="收短信(mt)" prop="canRecvMsg">
        <el-select style="width:100%;" v-model="addForm.canRecvMsg" placeholder="请选择收短信">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发短信(mo)" prop="canSendMsg">
        <el-select style="width:100%;" v-model="addForm.canSendMsg" placeholder="请选择发短信">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音呼入(mt)" prop="canRecvVoice">
        <el-select style="width:100%;" v-model="addForm.canRecvVoice" placeholder="请选择语音呼入">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音呼出(mo)" prop="canSendVoice">
        <el-select style="width:100%;" v-model="addForm.canSendVoice" placeholder="请选择语音呼出">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省内高速流量" prop="canProvinceFast">
        <el-select style="width:100%;" v-model="addForm.canProvinceFast" placeholder="请选择省内高速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省内中速流量" prop="canProvinceMiddle">
        <el-select style="width:100%;" v-model="addForm.canProvinceMiddle" placeholder="请选择省内中速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="全国高速流量" prop="canCountryFast">
        <el-select style="width:100%;" v-model="addForm.canCountryFast" placeholder="请选择全国高速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="全国中速流量" prop="canCountryMiddle">
        <el-select style="width:100%;" v-model="addForm.canCountryMiddle" placeholder="请选择全国中速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="运营商账户ID">
        <el-select v-model="addForm.unionAccount" filterable placeholder="请输入运营商账户关键词" style="width:100%" @change="unionAccountChange">
          <el-option v-for="item in fwAccountOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="区域" prop="area">
        <el-select style="width:100%;" v-model="addForm.area" placeholder="请选择区域">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input style="width:217px;" v-model="addForm.comment" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input style="width:217px;" v-model="addForm.description" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
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
      dialogVisible: false,
      addForm: {
        area: '',
        canCountryFast: '',
        canCountryMiddle: '',
        canProvinceFast: '',
        canProvinceMiddle: '',
        canRecvMsg: '',
        canRecvVoice: '',
        canSendMsg: '',
        canSendVoice: '',
        comment: '',
        description: '',
        fwAccount: '',
        planCode: '',
        planName: '',
        planNickName: '',
        // unionAccount: ''
      },
      ReceiveOptions: [
        { label: "开", value: 1 },
        { label: "关", value: 0 }
      ],
      areaOptions: [
        { label: "全国", value: 1 },
        { label: "省内", value: 0 }
      ],
      addRules: {
        fwAccount: [{ required: true, message: "请选择蜂窝账号", trigger: "blur" }]
      }
    }
  },
  props: ["honeycombList"],
  mounted () { },
  methods: {
    fwAccountChange (vId) {
      let obj = {};
      obj = this.honeycombList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      console.log(obj.id);
      console.log(obj.accountName); // 这边的name就是对应label
      this.addForm.fwAccount = obj.accountName
    },
    uploadIt () {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          this.$emit("addSuccess");
          this.dialogVisible = false;
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.el-form-item__content {
  margin-left: 100px !important;
}
.el-form-item__label {
  width: 100px !important;
}
</style>
