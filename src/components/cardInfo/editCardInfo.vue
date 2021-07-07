<template>
  <!-- 批量编辑 刘珍利 -->
  <el-dialog title="批量编辑" :visible.sync="dialogVisible" width="472px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form :inline="true" ref="editModalRef" :model="editForm" label-width="120px">
      <div class="cardNos">
        <div class="cardNosList">
          <!-- <ul>
            <li v-for="(item,index) in cardNos" :key="index">{{item}}</li>
          </ul> -->
        </div>
        <div class="cardNosNumber">选中<span class="red">{{selectListNumber}}</span>条数据</div>
      </div>
      <el-form-item label="套餐" prop="porductsListOptions">
        <el-select v-model="editForm.packageId" filterable clearable placeholder="请输入套餐关键词" style="width:300px">
          <el-option v-for="item in porductsListOptions" :key="item.packageId" :label="item.packageName" :value="item.packageId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡状态" prop="status">
        <el-select v-model="editForm.status" clearable placeholder="请选择卡状态" style="width:300px">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音用量" prop="voiceUsage">
        <el-input v-model.number="editForm.voiceUsage" placeholder="请输入语音用量" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="短信用量" prop="smsUsage">
        <el-input v-model.number="editForm.smsUsage" placeholder="请输入短信用量" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="流量用量" prop="netWorkUsage">
        <el-input v-model.number="editForm.netWorkUsage" placeholder="请输入流量用量" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="套餐有效期变更" prop="packageStartDate">
        <el-date-picker style="width:140px" v-model="editForm.packageStartDate" type="date" placeholder="开始日期" value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
        <span class="time-line">-</span>
        <el-date-picker style="width:140px" v-model="editForm.packageEndDate" type="date" placeholder="结束日期" value-format="yyyy-MM-dd hh:mm:ss">
        </el-date-picker>
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
      // 模态框 隐藏
      dialogVisible: false,
      // form 表单字段
      editForm: {
        cardNos: this.cardNos,
        netWorkUsage: null,
        packageEndDate: null,
        packageId: null,
        packageStartDate: null,
        smsUsage: null,
        status: null,
        voiceUsage: null
      }
    };
  },
  props: ['selectListNumber', 'cardNos', 'porductsListOptions', 'statusOptions'],
  mounted () { },
  methods: {
    uploadIt () {
      this.$refs.editModalRef.validate(valid => {
        if (!valid) return
        this.editForm.cardNos = this.cardNos
        const data = JSON.stringify(this.editForm)
        // console.log(data);
        this.$emit("editCardInfoSuccess", data);
        this.dialogVisible = false;
        this.$refs.editModalRef.resetFields()
      });
    }
  }
};
</script>

<style scoped>
.cardNos {
  display: flex;
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 10px;
  border-radius: 4px;
}
.cardNos .cardNosList {
  flex: 1;
}
.cardNos .cardNosList ul {
  display: flex;
  flex-wrap: wrap;
}
.cardNos .cardNosList ul li {
  padding-right: 17px;
}
.cardNos .cardNosNumber {
  text-align: right;
}
</style>