<template>
  <!-- 套餐 新增模态框 刘珍利 2020-06-18 已完成 -->
  <el-dialog title="新增商品" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="addForm" :model="addForm" :rules="addRules" label-width="120px">
      <el-form-item label="商品名" prop="name">
        <el-input size="small" v-model="addForm.name" placeholder="请输入商品名"></el-input>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select size="small" style="width:100%;" v-model="addForm.type" clearable placeholder="请选择商品类型" @change="GoodsTypeChange">
          <el-option v-for="item in packageTypeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="加油包类型" prop="addPackageType" v-show="this.addForm.type === 1">
        <el-select size="small" style="width:100%;" v-model="addForm.addPackageType" clearable placeholder="请选择加油包类型" @change="addPackageType">
          <el-option v-for="item in addPackageOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="自动续期" prop="payType" v-show="inputShow2">
        <el-select size="small" style="width:100%;" v-model="addForm.payType" clearable placeholder="请选择是否自动续期">
          <el-option v-for="item in automaticOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用量清算方式" prop="clearType" v-show="inputShow2">
        <el-select size="small" style="width:100%;" v-model="addForm.clearType" clearable placeholder="请选择用量清算方式">
          <el-option v-for="item in usageClearingMethodOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品说明" prop="description">
        <el-input size="small" v-model="addForm.description" placeholder="请输入商品说明"></el-input>
      </el-form-item>
      <el-form-item label="商品有效期(月)" prop="validMoth" v-show="inputShow">
        <el-input size="small" v-model.number="addForm.validMoth" placeholder="请输入商品有效期"></el-input>
      </el-form-item>
      <el-form-item label="用量清零周期(月)" prop="clearCycle" v-show="inputShow">
        <el-input size="small" v-model.number="addForm.clearCycle" placeholder="请输入商品有效期"></el-input>
      </el-form-item>
      <el-form-item label="流量区域" prop="netWorkArea" v-show="inputShow3">
        <el-select size="small" style="width:100%;" v-model="addForm.netWorkArea" clearable placeholder="请选择流量区域" @change="netWorkAreaChange">
          <el-option v-for="item in netWorkAreaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item :label="netWorkTitle" prop="networkTotal" v-show="inputShow3">
        <el-select size="small" v-model="addForm.networkTotal" clearable filterable placeholder="请输入流量关键词" style="width:100%" @change="netWordChange">
          <el-option v-show="netWorkListShow" v-for="item in queryFlowList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
          <el-option v-show="!netWorkListShow" v-for="item in queryFlowSNList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="语音" prop="voiceTotal" v-show="inputShow2">
        <el-select size="small" v-model="addForm.voiceTotal" clearable filterable placeholder="请输入语音关键词" style="width:100%" @change="voiceChange">
          <el-option v-for="item in queryOviceList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品价格" prop="price">
        <el-input size="small" v-model="addForm.price" placeholder="请输入原始价格"></el-input>
        <!-- <el-input-number size="small" v-model="addForm.price" :precision="2" placeholder="请输入原始价格"></el-input-number> -->
      </el-form-item>
      <el-form-item label="状态" prop="status" v-show="inputShow2">
        <el-select size="small" style="width:100%;" v-model="addForm.status" clearable placeholder="请选择状态">
          <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
import API from 'api/baseSet'
export default {
  data () {
    return {
      // 模态框 隐藏
      dialogVisible: false,
      // form 表单字段
      addForm: {
        description: null,
        name: null,
        packageId: null,
        price: null,
        status: null,
        type: null,
        packagetype: null,
        clearType: null,
        validMoth: null,
        networkTotal: null,
        voiceTotal: null,
        clearCycle: null,
        netWorkArea: null,
        addPackageType: null,
        payType: null
      },
      validMothTitle: '',
      validMothTitleP: '',
      // 默认 包类型 隐藏
      isPackageType: false,
      // 默认 产品有效期/用量清零周期 隐藏
      isProductValidity: false,
      // 字段验证
      addRules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        // clearType: [{ required: true, message: "请选择用量清算方", trigger: "blur" }],
        type: [{ required: true, message: "请选择商品类型", trigger: "blur" }],
        // price: [
        //   { type: 'number', message: '价格必须为数字' }
        // ],
        validMoth: [
          { type: 'number', message: '商品有效期必须为数字' }
        ],
        clearCycle: [
          { type: 'number', message: '用量清零周期必须为数字' }
        ],
      },
      packageTypeList: [],
      inputShow: true,
      inputShow2: true,
      inputShow3: true,
      netWorkTitle: '全国流量',
      netWorkListShow: true
    };
  },
  props: ["packageTypeOptions", 'usageClearingMethodOptions', 'automaticOptions', 'netWorkAreaOptions', 'statusOptions', 'queryFlowList', 'queryOviceList', 'queryFlowSNList', 'netWorkAreaOption', 'addPackageOptions'],
  mounted () {
    this._basicPackageTypeList()
  },
  methods: {
    // 监听流量区域
    netWorkAreaChange (vId) {
      if (vId === 1) {
        this.netWorkListShow = true
        this.netWorkTitle = '全国流量'
        this.addForm.addPackageType = 1
      } else {
        this.netWorkListShow = false
        this.netWorkTitle = '省内流量'
        this.addForm.addPackageType = 0
      }
    },
    // 监听加油包类型
    addPackageType (vId) {
      if (vId === 0) {
        this.netWorkListShow = false
        this.netWorkTitle = '省内流量'
        this.inputShow3 = true
        this.addForm.netWorkArea = 0
      } else if (vId === 1) {
        this.netWorkListShow = true
        this.netWorkTitle = '全国流量'
        this.inputShow3 = true
        this.addForm.netWorkArea = 1
      } else {
        this.netWorkListShow = false
        this.inputShow3 = false
      }
    },
    // 监听流量
    netWordChange (vId) {
      if (this.addForm.netWorkArea === 0) {
        let obj = {};
        obj = this.queryFlowSNList.find((item) => { // 这里的userList就是上面遍历的数据源
          return item.id === vId; // 筛选出匹配数据
        });
        this.addForm.networkTotal1 = obj.size
      } else {
        let obj = {};
        obj = this.queryFlowList.find((item) => { // 这里的userList就是上面遍历的数据源
          return item.id === vId; // 筛选出匹配数据
        });
        // console.log(obj.id);
        // console.log(obj.size); // 这边的name就是对应label
        this.addForm.networkTotal1 = obj.size
      }
    },
    // 监听语音
    voiceChange (vId) {
      let obj = {};
      obj = this.queryOviceList.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.id === vId; // 筛选出匹配数据
      });
      // console.log(obj.id);
      // console.log(obj.size); // 这边的name就是对应label
      this.addForm.voiceTotal1 = obj.size
    },
    uploadIt () {
      this.$refs.addForm.validate(valid => {
        if (!valid) return
        // 商品类型为 套餐
        if (this.addForm.type === 0 || this.addForm.type === 1) {
          const packageForm = {
            packageName: this.addForm.name,
            clearType: this.addForm.clearType,
            validMoth: this.addForm.validMoth,
            networkTotal: this.addForm.networkTotal1,
            voiceTotal: this.addForm.voiceTotal1,
            packageType: this.addForm.packagetype,
            description: this.addForm.description,
            orignPrice: this.addForm.price,
            clearCycle: this.addForm.clearCycle,
            netWorkArea: this.addForm.netWorkArea,
            addPackageType: this.addForm.addPackageType,
            payType: this.addForm.payType
          }
          console.log(packageForm);
          API.apiPackagesAdd(packageForm).then(res => {
            if (res.resultCode === 0) {
              const data = {
                description: this.addForm.description,
                name: this.addForm.name,
                packageId: Number(res.data),
                price: this.addForm.price,
                status: this.addForm.status,
                type: this.addForm.type,
                netWorkArea: this.addForm.netWorkArea
              }
              console.log(data);
              this.$emit("addPackageSuccess", data);
              this.dialogVisible = false;
              this.$refs.addForm.resetFields()
            } else {
              this.$message.error(res.resultInfo)
            }
            this.$refs.addForm.resetFields()
          })
        } else if (this.addForm.type === 2) {
          // 商品类型为 加油包
          const CardfeeForm = {
            price: this.addForm.price
          }
          console.log(CardfeeForm);
          API.apiPackageCardfeeAdd(CardfeeForm).then(res => {
            if (res.resultCode === 0) {
              const data = {
                name: this.addForm.name,
                price: this.addForm.price,
                type: this.addForm.type,
                packageId: Number(res.data)
              }
              console.log(data);
              this.$emit("addPackageSuccess", data);
              this.dialogVisible = false;
              this.$refs.addForm.resetFields()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        } else if (this.addForm.type === 3) {
          const CardfeeForm = {
            price: this.addForm.price
          }
          console.log(CardfeeForm);
          API.apiPackagePayfeeAdd(CardfeeForm).then(res => {
            if (res.resultCode === 0) {
              const data = {
                name: this.addForm.name,
                price: this.addForm.price,
                type: this.addForm.type,
                packageId: Number(res.data)
              }
              console.log(data);
              this.$emit("addPackageSuccess", data);
              this.dialogVisible = false;
              this.$refs.addForm.resetFields()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        }
      })
    },
    closeButton () {
      this.dialogVisible = false;
      this.$refs.addForm.resetFields()
    },
    GoodsTypeChange (vId) {
      if (vId === 0) {
        // this.addForm.packagetype = packagetypes[0]
        this.addForm.packagetype = 2
        console.log(this.addForm.packagetype)
        this.inputShow = true
        this.inputShow2 = true
        this.inputShow3 = true
      } else if (vId === 1) {
        // this.addForm.packagetype = packagetypes[1]
        this.addForm.packagetype = 1
        console.log(this.addForm.packagetype)
        this.inputShow = false
        this.inputShow2 = true
        this.inputShow3 = true
      } else if (vId === 2 || vId === 3) {
        this.inputShow = false
        this.inputShow2 = false
        this.inputShow3 = false
      }
    },
    // 获取套餐类型
    _basicPackageTypeList () {
      API.apiProductsTypes().then(res => {
        if (res.resultCode === 0) {
          this.packageTypeList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
};
</script>