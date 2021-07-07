<template>
  <!-- 渠道套餐配置 新增模态框 刘珍利 -->
  <el-dialog title="新增渠道商品配置" :visible.sync="dialogVisible" width="430px" :close-on-click-modal="false" :destroy-on-close="true" top="5vh">
    <el-form ref="addChanelPCGRef" :model="addChanelPCGForm" :rules="addChanelPCGRules" label-width="110px">
      <!-- <el-form-item label="渠道">
        <channelSelect @channelSelectId="channelSelectId"></channelSelect>
      </el-form-item> -->
      <el-form-item label="商品类型" prop="type">
        <el-select size="small" style="width:100%;" v-model="addChanelPCGForm.type" placeholder="请选择商品类型" @change="goodsTypeChange">
          <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="商品名" prop="goodId">
        <el-select size="small" v-model="addChanelPCGForm.goodId" filterable placeholder="请选择商品" style="width:100%">
          <el-option v-for="item in packageList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="省内流量归属地" prop="provinceIds" v-show="provinceShow">
        <!-- prop="placeOfOwnerShip" -->
        <el-select size="small" v-model="addChanelPCGForm.provinceIds" multiple filterable placeholder="请输入归属地关键词" style="width:100%">
          <el-option v-for="item in provincesList" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="卡费" prop="cardGoodId" v-show="cardFeeShow">
        <el-select size="small" v-model="addChanelPCGForm.cardGoodId" filterable placeholder="请输入卡费" style="width:100%">
          <el-option v-for="item in cardFeeList" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="套餐显示名" prop="nickName">
        <el-input size="small" v-model="addChanelPCGForm.nickName" placeholder="请输入套餐显示名"></el-input>
      </el-form-item>
      <el-form-item label="套餐备注" prop="description">
        <el-input size="small" v-model="addChanelPCGForm.description" placeholder="请输入套餐备注"></el-input>
      </el-form-item>
      <el-form-item label="原价" prop="orgPrice">
        <el-input size="small" v-model.number="addChanelPCGForm.orgPrice" placeholder="请输入原价"></el-input>
      </el-form-item>
      <el-form-item label="销售价" prop="salePrice">
        <el-input size="small" v-model.number="addChanelPCGForm.salePrice" placeholder="请输入销售价"></el-input>
      </el-form-item>

      <el-form-item label="状态" prop="status">
        <el-select size="small" style="width:100%;" v-model="addChanelPCGForm.status" placeholder="请选择状态">
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
// import channelSelect from './../channelSelect'
import API from 'api/channels'
export default {
  props: ['statusOptions', 'porductsListOptions', 'provincesList', 'typeOptions'],
  components: {
    // channelSelect
  },
  data () {
    return {
      // 模态框 隐藏
      dialogVisible: false,
      // form 表单字段
      addChanelPCGForm: {
        type: null,
        cardGoodId: null,
        channelId: sessionStorage.getItem('channelId'),
        description: null,
        goodId: null,
        nickName: null,
        orgPrice: null,
        provinceIds: [],
        salePrice: null,
        status: null
      },
      channelId: null,
      packageList: [],
      cardFeeList: [],
      cardFeeShow: true,
      provinceShow: true,
      addChanelPCGRules: {
        type: [
          { required: true, message: '请选择商品类型', trigger: 'change' }
        ],
        goodId: [
          { required: true, message: '请选择商品', trigger: 'change' }
        ],
        // cardGoodId: [
        //   { required: true, message: '请选择卡费', trigger: 'change' }
        // ],
        nickName: [
          { required: true, message: '请输入套餐显示名', trigger: 'change' }
        ],
        orgPrice: [
          { type: 'number', message: '原始价必须为数字值' }
        ],
        salePrice: [
          { type: 'number', message: '销售价必须为数字值' }
        ]
      }
    };
  },
  created () {
    this.channelId = sessionStorage.getItem('channelId')
    this.getGoodsList();
  },
  methods: {
    goodsTypeChange (vId) {
      if (vId === 0) {
        this.packageList = this.GoodsList.filter(item => {
          return item.type === 0
        }).map(item => {
          return item
        })
        this.cardFeeShow = true
        this.provinceShow = true
      }
      if (vId === 1) {
        this.packageList = this.GoodsList.filter(item => {
          return item.type === 1
        }).map(item => {
          return item
        })
        this.cardFeeShow = false
        this.provinceShow = true
      }
      if (vId === 2) {
        this.packageList = this.GoodsList.filter(item => {
          return item.type === 3
        }).map(item => {
          return item
        })
        this.cardFeeShow = false
        this.provinceShow = false
      }
    },
    getGoodsList () {
      const params = {
        page: 0,
        pageSize: 10000
      }
      API.apiGoodsList(params).then(res => {
        if (res.resultCode === 0) {
          this.GoodsList = res.data
          this.cardFeeList = this.GoodsList.filter(item => {
            return item.type === 2
          }).map(item => {
            return item
          })
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    uploadIt () {
      this.$refs.addChanelPCGRef.validate(valid => {
        if (!valid) return
        const data = {
          cardGoodId: this.addChanelPCGForm.cardGoodId,
          channelId: Number(sessionStorage.getItem('channelId')),
          description: this.addChanelPCGForm.description,
          goodId: this.addChanelPCGForm.goodId,
          nickName: this.addChanelPCGForm.nickName,
          orgPrice: this.addChanelPCGForm.orgPrice,
          provinceIds: this.addChanelPCGForm.provinceIds,
          salePrice: this.addChanelPCGForm.salePrice,
          status: this.addChanelPCGForm.status
        }
        console.log(data);
        this.$emit("addChanelPCGSuccess", data);
        this.dialogVisible = false;
        this.$refs.addChanelPCGRef.resetFields()
      });
    },
    closeButton () {
      this.dialogVisible = false;
      this.$refs.addChanelPCGRef.resetFields()
    }
  }
};
</script>
