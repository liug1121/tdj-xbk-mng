<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form  :inline="true">
        <!-- <el-form-item label="接入码" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入接入码" style="width:150px" v-model="id"></el-input>
        </el-form-item>  
        <el-form-item label="名称" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输入名称" style="width:150px" v-model="name"></el-input>
        </el-form-item>  
        <el-form-item label="APPID" class="queryFormItem" >
          <el-input class="queryFormInput" clearable placeholder="请输APPID" style="width:150px" v-model="appId"></el-input>
        </el-form-item>  
        <el-button size="medium" type="primary" icon="el-icon-search" @click="queryAccessWechats">查询</el-button> -->
      </el-form>
      <!-- 列表区域 -->
      <div class="cardNos">
        <div class="cardNosList">
        </div>
        <div class="cardNosNumber">选中<span class="red">0</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="functions" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :sortable="p.sortable">
          <template slot-scope="scope">
              <div v-html="scope.row[p.prop]" />
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <!-- <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->
    </el-card>
  </div>
</template>

<script>
import apiSystem from './../../api/system'
export default {
  components: {

  },
  data () {
    return {
    loading: false,
    functions:[],
    // id:'',
    // name:'',
    // appId:'',
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'plateFormName', label: '平台类型', width: 200, fixed: 'left'},
        { prop: 'parentMenuName', label: '父菜单', width: 300, fixed: 'left'},
        { prop: 'name', label: '名称', width: 190},
        { prop: 'typeName', label: '菜单/操作', width: 300},
        { prop: 'indentity', label: '功能ID', width: 200}
      ],
    };
  },
  mounted () {

  },
  created(){
      this.queryAllFunctions()
  },
  watch: {},
  methods: {
    handleSelectBranchCom:function(item){
        console.log('handleSelectBranchCom:' + item)
    },
    queryAllFunctions:function(){
        this.loading = true
        let params = {}
    //     params.page = this.page
    //     if(this.id != '')
    //         params.channelId = this.id
    //     if(this.name != '')
    //         params.name = this.name
    //     if(this.appId != '')
    //         params.appId = this.appId
        apiSystem.getAllSysFunctions(params).then(res=>{
            if(res.resultCode == 0){
                this.functions = res.data
                this.total = res.rowNum
                this.loading = false
            }
        })
    },
    handleSelectionChange (val) {
    },
    handleSizeChange (newPage) {
      this.page = newPage;
      this.queryAllFunctions()
    },
    handleCurrentChange (newPage) {
      this.page = newPage;
      this.queryAllFunctions()
    },
  }
};
</script>
<style scoped>
</style>
