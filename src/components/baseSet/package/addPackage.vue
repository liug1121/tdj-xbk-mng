<template>
  <!-- 套餐 新增模态框 刘珍利 2020-06-18 已完成 -->
  <el-dialog title="新增套餐" :visible.sync="dialogVisible" width="720px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form :inline="true" ref="addForm" :model="addForm" :rules="addRules" label-width="110px">
      <el-form-item label="套餐名" prop="packageName">
        <el-input style="width:217px;" v-model="addForm.packageName" placeholder="请输入套餐名"></el-input>
      </el-form-item>
      <el-form-item label="套餐显示名" prop="packageNickName">
        <el-input style="width:217px;" v-model="addForm.packageNickName" placeholder="请输入套餐显示名"></el-input>
      </el-form-item>
      <el-form-item label="套餐编号">
        <el-input style="width:217px;" v-model.number="addForm.packageCode" placeholder="请输入套餐编号"></el-input>
      </el-form-item>
      <el-form-item label="套餐类型" prop="packageType">
        <el-select style="width:100%;" v-model="addForm.packageType" clearable placeholder="请选择套餐类型" @change="packageTypeChange">
          <el-option v-for="item in packageTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加油包类型" prop="addPackageType" v-if="isPackageType">
        <el-select style="width:100%;" v-model="addForm.addPackageType" clearable placeholder="请选择包类型">
          <el-option v-for="item in packageTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="validMothTitle" prop="validMoth" v-if="isProductValidity">
        <el-input style="width:217px;" v-model.number="addForm.validMoth" :placeholder="validMothTitleP"></el-input>
      </el-form-item>
      <el-form-item label="用量清算方式" prop="clearType">
        <el-select style="width:100%;" v-model="addForm.clearType" clearable placeholder="请选择用量清算方式">
          <el-option v-for="item in usageClearingMethodOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用量区域" prop="netWorkArea">
        <el-select v-model="addForm.netWorkArea" clearable filterable placeholder="请输入流量关键词" style="width:100%" disabled>
          <el-option v-for="item in netWorkAreaOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流量" prop="networkTotal">
        <el-select v-model="addForm.networkTotal" clearable filterable placeholder="请输入流量关键词" style="width:100%" @change="netWordChange">
          <el-option v-for="item in queryFlowList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音" prop="voiceTotal">
        <el-select v-model="addForm.voiceTotal" clearable filterable placeholder="请输入语音关键词" style="width:100%" @change="voiceChange">
          <el-option v-for="item in queryOviceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="短信" prop="smsTotal">
        <el-select v-model="addForm.smsTotal" clearable filterable placeholder="请输入短信关键词" style="width:100%" @change="smsChange">
          <el-option v-for="item in querySmsList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原始价格" prop="orignPrice">
        <el-input style="width:217px;" v-model.number="addForm.orignPrice" placeholder="请输入原始价格"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="">
        <el-input style="width:217px;" v-model.number="addForm.salePrice" placeholder="请输入销售价格"></el-input>
      </el-form-item>

      <el-form-item label="产品说明">
        <el-input style="width:217px;" v-model="addForm.description" placeholder="请输入产品说明"></el-input>
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
      addForm: {
        addPackageType: '',
        clearType: '',
        description: '',
        netWorkArea: '',
        networkTotal: '',
        orignPrice: '',
        packageCode: '',
        packageName: '',
        packageNickName: '',
        packageType: '',
        salePrice: '',
        smsTotal: '',
        validMoth: '',
        voiceTotal: ''
      },
      validMothTitle: '',
      validMothTitleP: '',
      // 默认 包类型 隐藏
      isPackageType: false,
      // 默认 产品有效期/用量清零周期 隐藏
      isProductValidity: false,
      // 字段验证
      addRules: {
        packageName: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        packageNickName: [{ required: true, message: "请输入套餐显示名", trigger: "blur" }],
        clearType: [{ required: true, message: "请选择用量清算方", trigger: "blur" }],
        orignPrice: [{ required: true, message: "请输入原始价格", trigger: "blur" }],
        salePrice: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        packageType: [{ required: true, message: "请选择套餐类型", trigger: "blur" }]
      }
    };
  },
  props: ["packageTypeList", 'usageClearingMethodOptions', 'netWorkAreaOptions', 'packageTypeOptions', 'queryFlowList', 'queryOviceList', 'querySmsList'],
  mounted () { },
  methods: {
    netWordChange (vId) {
      let obj = {};
      obj = this.queryFlowList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.id);
      // console.log(obj.size); // 这边的name就是对应label
      this.addForm.networkTotal = obj.size
      this.addForm.netWorkArea = obj.areaType
    },
    voiceChange (vId) {
      let obj = {};
      obj = this.queryOviceList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.id);
      // console.log(obj.size); // 这边的name就是对应label
      this.addForm.voiceTotal = obj.size
    },
    smsChange (vId) {
      let obj = {};
      obj = this.querySmsList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.id);
      // console.log(obj.size); // 这边的name就是对应label
      this.addForm.smsTotal = obj.size
    },
    uploadIt () {
      this.$refs.addForm.validate(valid => {
        if (!valid) return
        this.$emit("addPackageSuccess");
        this.dialogVisible = false;
        this.$refs.addForm.resetFields()
      });
    },
    packageTypeChange (vId) {
      let obj = {};
      obj = this.packageTypeList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.typeId === vId; // 筛选出匹配数据
      });
      // console.log(obj.typeId);
      // console.log(obj.typeName); // 这边的name就是对应label
      if (obj.typeName === '月套餐') {
        this.isProductValidity = true
        this.isPackageType = false
        this.validMothTitle = '产品效期(月)'
        this.validMothTitleP = '请输入产品效期(月)'
      } else if (obj.typeName === '加油包') {
        this.isPackageType = true
        this.isProductValidity = false
      } else if (obj.typeName === '包量套餐') {
        this.isPackageType = false
        this.isProductValidity = true
        this.validMothTitle = '用量清零周期'
        this.validMothTitleP = '请输入用量清零周期'
      } else {
        this.isProductValidity = false
        this.isPackageType = false
      }
    }
  }
};
</script>