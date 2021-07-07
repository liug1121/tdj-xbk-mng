<template>
  <!-- 套餐 编辑模态框 刘珍利 2020-06-18 已完成 -->
  <div>
    <el-form :inline="true" ref="editFormRef" :model="editForm" :rules="editRules" label-width="105px">
      <el-form-item label="蜂窝账号" prop="fwAccount">
        <el-select v-model="editForm.fwAccount" filterable placeholder="请输入蜂窝账号关键词" style="width:100%" @change="fwAccountChange">
          <el-option v-for="item in honeycombList" :key="item.id" :label="item.accountName" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="通信计划码" prop="planCode">
        <el-input style="width:217px;" v-model="editForm.planCode" placeholder="请输入通信计划码"></el-input>
      </el-form-item>
      <el-form-item label="通信计划名称" prop="planName">
        <el-input style="width:217px;" v-model="editForm.planName" placeholder="请输入通信计划名称"></el-input>
      </el-form-item>
      <el-form-item label="计划别名" prop="planNickName">
        <el-input style="width:217px;" v-model="editForm.planNickName" placeholder="计划别名"></el-input>
      </el-form-item>
      <el-form-item label="收短信(mt)" prop="canRecvMsg">
        <el-select style="width:100%;" v-model="editForm.canRecvMsg" placeholder="请选择收短信">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发短信(mo)" prop="canSendMsg">
        <el-select style="width:100%;" v-model="editForm.canSendMsg" placeholder="请选择发短信">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音呼入(mt)" prop="canRecvVoice">
        <el-select style="width:100%;" v-model="editForm.canRecvVoice" placeholder="请选择语音呼入">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音呼出(mo)" prop="canSendVoice">
        <el-select style="width:100%;" v-model="editForm.canSendVoice" placeholder="请选择语音呼出">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省内高速流量" prop="canProvinceFast">
        <el-select style="width:100%;" v-model="editForm.canProvinceFast" placeholder="请选择省内高速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省内中速流量" prop="canProvinceMiddle">
        <el-select style="width:100%;" v-model="editForm.canProvinceMiddle" placeholder="请选择省内中速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="全国高速流量" prop="canCountryFast">
        <el-select style="width:100%;" v-model="editForm.canCountryFast" placeholder="请选择全国高速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="全国中速流量" prop="canCountryMiddle">
        <el-select style="width:100%;" v-model="editForm.canCountryMiddle" placeholder="请选择全国中速流量">
          <el-option v-for="item in ReceiveOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="区域" prop="area">
        <el-select style="width:100%;" v-model="editForm.area" placeholder="请选择区域">
          <el-option v-for="item in areaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" prop="comment">
        <el-input style="width:217px;" v-model="editForm.comment" placeholder="请输入备注"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input style="width:217px;" v-model="editForm.description" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer" style="text-align: right;display: block;margin-right: 10px;">
      <el-button @click="editVisible = false">取 消</el-button>
      <el-button type="primary" @click="editIt()">确 定</el-button>
    </span>
  </div>

</template>
<script>
export default {
  data () {
    return {
      editForm: {
        id: '',
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
      },
      ReceiveOptions: [
        { label: "开", value: 1 },
        { label: "关", value: 0 }
      ],
      areaOptions: [
        { label: "全国", value: 1 },
        { label: "省内", value: 0 }
      ],
      editRules: {
        fwAccount: [{ required: true, message: "请选择蜂窝账号", trigger: "blur" }]
      }
    };
  },
  props: ['list', 'honeycombList'],
  mounted () {
    this.init();
  },
  watch: {
    "editForm.area": {
      handler (val) {
        // console.log(val);
      }
    }
  },
  methods: {
    init () {
      this.$nextTick(() => {
        this.editForm.id = this.list.id
        this.editForm.area = this.list.area
        this.editForm.canCountryFast = this.list.canCountryFast
        this.editForm.canCountryMiddle = this.list.canCountryMiddle
        this.editForm.canProvinceFast = this.list.canProvinceFast
        this.editForm.canProvinceMiddle = this.list.canProvinceMiddle
        this.editForm.canRecvMsg = this.list.canRecvMsg
        this.editForm.canRecvVoice = this.list.canRecvVoice
        this.editForm.canSendMsg = this.list.canSendMsg
        this.editForm.canSendVoice = this.list.canSendVoice
        this.editForm.comment = this.list.comment
        this.editForm.description = this.list.description
        this.editForm.fwAccount = this.list.fwAccount
        this.editForm.planCode = this.list.planCode
        // this.editForm. = this.list.planId
        this.editForm.planName = this.list.planName
        this.editForm.planNickName = this.list.planNickName
        // this.editForm.unionAccount = this.list.unionAccount
      })
    },
    fwAccountChange (vId) {
      let obj = {};
      obj = this.honeycombList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.id);
      // console.log(obj.accountName); // 这边的name就是对应label
      this.addForm.fwAccount = obj.accountName
    },
    // 编辑确定
    editIt () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return
        this.editForm.area = this.list.area
        // console.log(JSON.stringify(this.editForm))
        const data = JSON.stringify(this.editForm)
        this.$emit('editSignPlanSuccess', data)
        this.$refs.editFormRef.resetFields()
      })
    },
  }
}
</script>
