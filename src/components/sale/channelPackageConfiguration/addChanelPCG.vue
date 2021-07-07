<template>
  <!-- 渠道套餐配置 新增模态框 刘珍利 -->
  <el-dialog title="新增渠道商品套餐配置" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="addChanelPCGRef" :model="addChanelPCGForm" :rules="addChanelPCGRules" label-width="100px">
      <el-form-item label="渠道" prop="channelId">
        <channelSelect @channelSelectId="channelSelectId"></channelSelect>
      </el-form-item>
      <el-form-item label="归属地" prop="provinceId">
        <!-- prop="placeOfOwnerShip" -->
        <el-select v-model="addChanelPCGForm.provinceId" filterable placeholder="请输入归属地关键词" style="width:100%">
          <el-option v-for="item in provincesList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐" prop="packageIds">
        <el-select v-model="addChanelPCGForm.packageIds" multiple filterable placeholder="请输入套餐关键词" style="width:100%" @change="packageIdChange">
          <el-option v-for="item in porductsListOptions" :key="item.packageId" :label="item.packageName" :value="item.packageId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select style="width:100%;" v-model="addChanelPCGForm.status" placeholder="请选择状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-select style="width:100%;" v-model="addChanelPCGForm.type" placeholder="请选择状态">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeButton">取 消</el-button>
      <el-button type="primary" @click="uploadIt()">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import channelSelect from './../channelSelect'
export default {
  props: ['statusOptions', 'porductsListOptions', 'provincesList', 'typeOptions'],
  components: {
    channelSelect
  },
  data () {
    return {
      // 模态框 隐藏
      dialogVisible: false,
      // form 表单字段
      addChanelPCGForm: {
        packageIds: null,
        channelId: null,
        provinceId: null,
        status: null,
        type: null,
      },
      // 字段验证
      addChanelPCGRules: {
        packageIds: [{ required: true, message: "请选择套餐", trigger: "blur" }],
        provinceId: [{ required: true, message: "请选择归属地", trigger: "blur" }],
        status: [{ required: true, message: "请选择状态", trigger: "blur" }],
        channelId: [{ required: true, message: "请选择渠道", trigger: "blur" }]
      },
    };
  },
  methods: {
    packageIdChange (vid) {
      // console.log(vid);
    },
    channelSelectId (channelSelectId) {
      this.addChanelPCGForm.channelId = channelSelectId
      // console.log(channelSelectId);
    },
    closeButton () {
      this.dialogVisible = false;
      this.$refs.addChanelPCGRef.resetFields()
    },
    uploadIt () {
      this.$refs.addChanelPCGRef.validate(valid => {
        if (!valid) return
        const data = JSON.stringify(this.addChanelPCGForm)
        console.log(data);

        this.$emit("addChanelPCGSuccess", data);
        this.dialogVisible = false;
        this.$refs.addChanelPCGRef.resetFields()
      });
    }
  }
};
</script>
