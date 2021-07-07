<template>
  <!-- 批量编辑 刘珍利 -->
  <el-dialog title="批量编辑" :visible.sync="dialogVisible" width="472px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form :inline="true" ref="batchmodifyDataRef" :model="editForm" label-width="120px">
      <div class="cardNos">
        <!-- <div class="cardNosList">
          <ul>
            <li v-for="(item,index) in cardNos" :key="index">{{item}}</li>
          </ul>
        </div> -->
        <div class="cardNosNumber">选中<span class="red">{{selectListNumber}}</span>条数据</div>
      </div>
      <el-form-item label="受控状态" prop="status">
        <el-select v-model="editForm.status" filterable clearable placeholder="请选择受控状态" style="width:300px">
          <el-option v-for="item in SKStatusOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="batchmodifyConfirm()">确 定</el-button>
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
        iccids: null,
        names: null,
        organizationIds: null,
        phones: null,
        terms: null,
        status: null
      }
    };
  },
  props: ['selectListNumber', 'SKStatusOptions'],
  mounted () { },
  methods: {
    batchmodifyConfirm () {
      this.$refs.batchmodifyDataRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.editForm)
        // console.log(data);
        this.$emit("batchmodifySuccess", data);
        this.dialogVisible = false;
        this.$refs.batchmodifyDataRef.resetFields()
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