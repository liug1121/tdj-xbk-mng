<template>
  <!-- 套餐 编辑模态框 刘珍利 2020-06-18 已完成 -->
  <div>
    <el-form :inline="true" ref="editFormRef" :model="editForm" :rules="editRules" label-width="110px">
      <el-form-item label="套餐名" prop="packageName">
        <el-input style="width:217px;" v-model="editForm.packageName" placeholder="请输入套餐名"></el-input>
      </el-form-item>
      <el-form-item label="套餐显示名" prop="packageNickName">
        <el-input style="width:217px;" v-model="editForm.packageNickName" placeholder="请输入套餐显示名"></el-input>
      </el-form-item>
      <el-form-item label="套餐编号">
        <el-input style="width:217px;" v-model.number="editForm.packageCode" placeholder="请输入套餐编号"></el-input>
      </el-form-item>
      <el-form-item label="套餐类型" prop="packageType">
        <el-select style="width:100%;" v-model="editForm.packageType" placeholder="请选择套餐类型" @change="packageTypeChange">
          <el-option v-for="item in packageTypeList" :key="item.typeId" :label="item.typeName" :value="item.typeId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加油包类型" prop="addPackageType" v-if="isPackageType">
        <el-select style="width:100%;" v-model="editForm.addPackageType" placeholder="请选择包类型">
          <el-option v-for="item in packageTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="validMothTitle" prop="validMoth" v-if="isProductValidity">
        <el-input style="width:217px;" v-model.number="editForm.validMoth" :placeholder="validMothTitleP"></el-input>
      </el-form-item>
      <el-form-item label="用量清算方式" prop="clearType">
        <el-select style="width:100%;" v-model="editForm.clearType" placeholder="请选择用量清算方式">
          <el-option v-for="item in usageClearingMethodOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用量区域" prop="netWorkArea">
        <el-select v-model="editForm.netWorkArea" filterable placeholder="请输入流量关键词" style="width:100%">
          <el-option v-for="item in netWorkAreaOptions" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="流量" prop="networkTotal">
        <el-select v-model="editForm.networkTotal" filterable placeholder="请输入流量关键词" style="width:100%" @change="netWordChange">
          <el-option v-for="item in queryFlowList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音" prop="voiceTotal">
        <el-select v-model="editForm.voiceTotal" filterable placeholder="请输入语音关键词" style="width:100%" @change="voiceChange">
          <el-option v-for="item in queryOviceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="短信" prop="smsTotal">
        <el-select v-model="editForm.smsTotal" filterable placeholder="请输入短信关键词" style="width:100%" @change="smsChange">
          <el-option v-for="item in querySmsList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="原始价格" prop="orignPrice">
        <el-input style="width:217px;" v-model.number="editForm.orignPrice" placeholder="请输入原始价格"></el-input>
      </el-form-item>
      <el-form-item label="销售价格" prop="">
        <el-input style="width:217px;" v-model.number="editForm.salePrice" placeholder="请输入销售价格"></el-input>
      </el-form-item>

      <el-form-item label="产品说明">
        <el-input style="width:217px;" v-model="editForm.description" placeholder="请输入产品说明"></el-input>
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
      editRules: {
        packageName: [{ required: true, message: "请输入套餐名称", trigger: "blur" }],
        packageNickName: [{ required: true, message: "请输入套餐显示名", trigger: "blur" }],
        clearType: [{ required: true, message: "请选择用量清算方", trigger: "blur" }],
        orignPrice: [{ required: true, message: "请输入原始价格", trigger: "blur" }],
        salePrice: [{ required: true, message: "请输入销售价格", trigger: "blur" }],
        packageType: [{ required: true, message: "请选择套餐类型", trigger: "blur" }]
      }
    };
  },
  props: ["packageTypeList", 'list', 'usageClearingMethodOptions', 'packageTypeOptions', 'queryFlowList', 'queryOviceList', 'querySmsList', 'netWorkAreaOptions'],
  mounted () {
    this.init();
  },
  watch: {
    "editForm.basicProductsName": {
      handler (val) {
        console.log(val)
      }
    }
  },
  methods: {

    init () {
      this.$nextTick(() => {
        this.editForm.packageName = this.list.packageName
        this.editForm.packageId = this.list.packageId
        this.editForm.packageNickName = this.list.packageNickName
        this.editForm.packageCode = this.list.packageCode
        this.editForm.clearType = this.list.clearType
        this.editForm.netWorkArea = this.list.netWorkArea
        this.editForm.networkTotal = this.list.networkTotal
        this.editForm.voiceTotal = this.list.voiceTotal
        this.editForm.smsTotal = this.list.smsTotal
        this.editForm.orignPrice = this.list.orignPrice
        this.editForm.salePrice = this.list.salePrice
        this.editForm.description = this.list.description
        // 套餐类型
        if (this.list.packageType === 0 || this.list.packageType === 5) {
          this.editForm.packageType = '月套餐'
          this.isProductValidity = true
          this.isPackageType = false
          this.validMothTitle = '产品效期(月)'
          this.validMothTitleP = '请输入产品效期(月)'
          this.editForm.validMoth = this.list.validDuration
        } else if (this.list.packageType === 1 || this.list.packageType === 6) {
          this.editForm.packageType = '加油包'
          this.isPackageType = true
          this.isProductValidity = false
        } else if (this.list.packageType === 2 || this.list.packageType === 7) {
          this.editForm.packageType = '包量套餐'
          this.isPackageType = false
          this.isProductValidity = true
          this.validMothTitle = '用量清零周期'
          this.validMothTitleP = '请输入用量清零周期'
          this.editForm.validMoth = this.list.clearPeriod
        } else {
          this.isProductValidity = false
          this.isPackageType = false
        }
      })
    },
    netWordChange (vId) {
      let obj = {};
      obj = this.queryFlowList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      console.log(obj.id);
      console.log(obj.name); // 这边的name就是对应label
      this.editForm.networkTotal = obj.name
    },
    voiceChange (vId) {
      let obj = {};
      obj = this.queryOviceList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      console.log(obj.id);
      console.log(obj.name); // 这边的name就是对应label
      this.editForm.voiceTotal = obj.name
    },
    smsChange (vId) {
      let obj = {};
      obj = this.querySmsList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      console.log(obj.id);
      console.log(obj.name); // 这边的name就是对应label
      this.editForm.smsTotal = obj.name
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
    },
    // 编辑确定
    editIt () {
      this.$refs.editFormRef.validate(valid => {
        if (!valid) return

        console.log(JSON.stringify(this.editForm))
        const data = JSON.stringify(this.editForm)
        this.$emit('editPackageSuccess', data)
      })
    },
  }
}
</script>
