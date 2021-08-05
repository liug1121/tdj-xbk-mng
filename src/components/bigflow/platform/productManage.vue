<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <el-form-item label="产品编码" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入产品编码" style="width:150px" v-model="productCode"></el-input>
        </el-form-item>   
        <el-form-item label="产品名称" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入产品编码" style="width:150px" v-model="productName"></el-input>
        </el-form-item>  
        <el-form-item label="产品类型" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择产品类型" v-model="productTypeName">
            <el-option v-for="item in productTypeNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select> 
        </el-form-item>
        <el-form-item label="使用类型" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择使用类型" v-model="useTypeName">
            <el-option v-for="item in useTypeNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态" class="queryFormItem">
          <el-select class="queryFormInput"  clearable placeholder="请选择状态" v-model="statusName">
            <el-option v-for="item in statusNames" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryProducts">查询</el-button>
      </el-form>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
         
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="products" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import apiBigflow from './../../../api/bigflow'
export default {
  components: {

  },
  data () {
    return {
    loading: false,
    productCode:'',
    productName:'',
    productTypeName:'',
    useTypeName:'',
    statusName:'',
    productTypeNames:[
        {label:'月套餐', value:'setmeal'},
        {label:'包量套餐', value:'setmeal_q'},
        {label:'首月赠送套餐', value:'givesetmeal'},
        {label:'加油包', value:'incrementpackage'}
    ],
    useTypeNames:[
        {label:'卡', value:'card'},
        {label:'卡池', value:'pool'}
    ],
    statusNames:[
       {label:'上架状态', value:1},
        {label:'上架不显示', value:3} ,
        {label:'下架状态', value:2} 
    ],
    products:[],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'productCode', label: '产品编码', width: 200, fixed: 'left', sortable: true },
        { prop: 'productName', label: '产品名', width: 190, fixed: 'left', sortable: true },
        { prop: 'viewName', label: '显示名', width: 200, sortable: true },
        { prop: 'originalPrice', label: '原始价', width: 150, sortable: true },
        { prop: 'price', label: '销售价', width: 300, sortable: true },
        { prop: 'highUseName', label: '高速用量', width: 200, sortable: true },
        { prop: 'mediumUseName', label: '中速用量', width: 180, sortable: true },
        { prop: 'productTypeName', label: '产品类型', width: 180, sortable: true },
        { prop: 'useTypeName', label: '使用类型', width: 180, sortable: true },
        { prop: 'useExpire', label: '用量清零周期', width: 180, sortable: true },
        { prop: 'expireTime', label: '产品有效期', width: 180, sortable: true },
        { prop: 'statusName', label: '状态', width: 180, sortable: true },
        { prop: 'clearType', label: '用量清算周期', width: 180, sortable: true },
        { prop: 'zone', label: '用量区域', width: 180, sortable: true },
        { prop: 'gmtCreate', label: '创建时间', width: 180, sortable: true },
        { prop: 'memo', label: '产品说明', width: 180, sortable: true }
      ],
    };
  },
  mounted () {

  },
  created(){
      this.queryProducts()
  },
  watch: {},
  methods: {
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryProducts:function(){
        this.loading = true
        let params = {}
        params.page = this.page
        if(this.productCode != '')
            params.productCode = this.productCode
        if(this.productName != '')
            params.productNameLike = this.productName
        if(this.useTypeName != '')
            params.useType = this.useTypeName
        if(this.statusName != '')
            params.status = this.statusName
        if(this.productTypeName != '')
            params.productType = this.productTypeName
        apiBigflow.getProducts(params).then(res=>{
            if(res.resultCode == 0){
                this.products = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryProducts()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryProducts()
    },
  }
};
</script>
<style scoped>
</style>
