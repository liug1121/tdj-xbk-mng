<template>
  <div class="box_subject">
    <el-card class="all_list">
      <div class="heraderTop">
        <el-form :inline="true"  :model="queryCardsForm" class="queryForm">
          <el-form-item label="iccid" class="queryFormItem"> 
           <el-input class="queryFormInput" v-model="queryCardsForm.iccid" clearable placeholder="请输入ICCID" style="width:202px"></el-input>
          </el-form-item>
          <el-form-item label="渠道" class="queryFormItem">
            <channelSelect style="width:150px !important" @channelSelectId="channelSelectId"></channelSelect>
          </el-form-item>
          <el-form-item label="监控组" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryCardsForm.lbsGroupId" clearable placeholder="请选择LBS监控组">
              <el-option v-for="item in blackCardlist" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <!-- <el-form-item label="IMEI监控组" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryCardsForm.IMEIGroupId" clearable placeholder="请选择IMEI监控组">
              <el-option v-for="item in blackCardlist" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item label="卡状态" class="queryFormItem">
            <el-select class="queryFormInput" v-model="queryCardsForm.status" clearable placeholder="请选择卡状态">
              <el-option v-for="item in statusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item class="queryFormItem">
            <el-button type="primary" size="mini" icon="el-icon-search" @click="queryOk">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
       <div class="button_content">
          <el-button size="medium" type="primary"  @click="importCardsToGroup()" 
          v-permission="{indentity:'xbkBlackCardList-add'}">卡导入</el-button>
          <el-button size="medium" type="primary"  @click="groupDlgShow" 
          v-permission="{indentity:'xbkBlackCardList-add'}">监控组</el-button>
        </div>
      <el-table v-loading="loading" :data="cardMonitors" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}" >
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
          <template slot-scope="scope">
            <div v-if="p.prop == 'opts'">
              <el-button size="mini" type="primary" plain @click="importData(scope.row)">查看与编辑</el-button>
            </div>
            <div v-else>
              <div v-html="scope.row[p.prop]" />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
      <el-dialog title="新增" :visible.sync="addDialogVisible" width="430px" @close="addDialogClosed">
        <el-form :model="groupAddForm" ref="addFormRef" label-width="90px">
          <el-form-item label="名称">
           <el-input style="width:300px;" v-model="groupAddForm.name" placeholder="请输入监控组名称"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item label="LBS监控">
             <el-select  size="small" v-model="groupAddForm.selectedPositionTypeLabel" filterable placeholder="请输入监控类型" style="width:100%" >
              <el-option v-for="item in positionTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div v-if="groupAddForm.selectedPositionTypeLabel != undefined">
              <el-select class="queryFormInput" v-model="groupAddForm.selectedProvince" clearable filterable placeholder="请选择省份" style="width:100%" @change="provinceChange">
                <el-option v-for="item in provinceOptions" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
              </el-select>
              <el-select class="queryFormInput" v-model="groupAddForm.selectedCities" multiple clearable filterable placeholder="请选择城市名" style="width:100%" >
                <el-option v-for="item in PoisCitiesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item label="IMEI监控">
             <el-select  size="small" v-model="groupAddForm.IMEIType" filterable placeholder="请输入监控类型" style="width:100%" >
              <el-option v-for="item in IMEITypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div v-if="groupAddForm.IMEIType == 1">
              <el-input style="width:300px;" v-model="groupAddForm.imeiToMach" placeholder="请输入前6位IMEI"></el-input>
            </div>
            <div v-if="groupAddForm.IMEIType == 2">
              <el-input style="width:300px;" v-model="groupAddForm.imeiToMach" placeholder="请输入后6位IMEI"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="" class="queryFormItem">
          </el-form-item>
          <el-form-item label="" class="queryFormItem">
          </el-form-item>
          <el-form-item label="" class="queryFormItem">
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addGroup">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="修改" :visible.sync="modifyDialogVisible" width="430px" @close="modifyDialogVisible = false">
        <el-form label-width="90px">
          <el-form-item label="名称">
           <el-input style="width:300px;" v-model="nameToUpdate" placeholder="请输入监控组名称"></el-input>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item label="LBS监控">
             <el-select  size="small" v-model="selectedPositionTypeLabelToUpdate" filterable placeholder="请输入监控类型" style="width:100%" @click="positionTypeChange">
              <el-option v-for="item in positionTypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div v-if="selectedPositionTypeLabelToUpdate != undefined">
              <el-select class="queryFormInput" v-model="selectedProvinceToUpdate" clearable filterable placeholder="请选择省份" style="width:100%" @change="provinceChange">
                <el-option v-for="item in provinceOptions" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
              </el-select>
              <el-select class="queryFormInput" v-model="selectedCitiesToUpdate" multiple clearable filterable placeholder="请选择城市名" style="width:100%" @change="cityChange" >
                <el-option v-for="item in PoisCitiesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item>
          </el-form-item>
          <el-form-item label="IMEI监控">
             <el-select  size="small" v-model="IMEITypeToUpdate" filterable placeholder="请输入监控类型" style="width:100%" @change="positionTypeChange">
              <el-option v-for="item in IMEITypes" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <div v-if="IMEITypeToUpdate == 1">
              <el-input style="width:300px;" v-model="imeiToMachToUpdate" placeholder="请输入前6位IMEI"></el-input>
            </div>
            <div v-if="IMEITypeToUpdate == 2">
              <el-input style="width:300px;" v-model="imeiToMachToUpdate" placeholder="请输入后6位IMEI"></el-input>
            </div>
          </el-form-item>
          <el-form-item label="" class="queryFormItem">
          </el-form-item>
          <el-form-item label="" class="queryFormItem">
          </el-form-item>
          <el-form-item label="" class="queryFormItem">
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="modifyDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="modifyGroup">确 定</el-button>
        </span>
      </el-dialog>
      
      <el-dialog title="卡导入" :visible.sync="dialogVisible" width="412px" :close-on-click-modal="false" :destroy-on-close="true">
        <el-form  :model="ImportForm" label-width="120px">
          <el-form-item label="LBS监控组">
            <el-select class="queryFormInput" v-model="ImportForm.lbsGroupId" placeholder="请选择LBS监控组">
              <el-option v-for="item in blackCardlist" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item> 
          <el-form-item label="IMEI监控组">
          <el-select class="queryFormInput" v-model="ImportForm.IMEIGroupId"  placeholder="请选择IMEI监控组">
              <el-option v-for="item in blackCardlist" :key="item.groupId" :label="item.groupName" :value="item.groupId"></el-option>
            </el-select>
          </el-form-item>
          <el-upload class="unload-demo" accept=".xls, .xlsx" action="#" :file-list="fileList" :http-request="uploadFile">
            <el-button size="small" type="primary">点击上传要导入的文件</el-button>
          </el-upload>
        </el-form>
        <div class="notice">
          <p>
            <a>下载模板文件</a> 仅支持xlsx,xls格式的文件.
          </p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="toImport">确 定</el-button>
        </span>
      </el-dialog>
  
      <el-dialog title="监控组" :visible.sync="groupDlgVisible" width="80%" height="1000px" :close-on-click-modal="false" :destroy-on-close="true">
        <div class="el-dialog-div">
          <div class="button_content">
            <el-button size="medium" type="primary" @click="addShow" 
            v-permission="{indentity:'xbkBlackCardList-add'}">新增</el-button>
          </div>
          <el-table v-loading="loading" :data="blackCardlist" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}" >
          <el-table-column v-for="(p, key) in tableGroupColum" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
            <template slot-scope="scope">
              <div v-if="p.prop == 'opts'">
                <el-button size="mini" type="primary" plain @click="modifyDialogShow(scope.row)">编辑</el-button>
                <el-button size="mini" type="primary" plain @click="removeGroup(scope.row['groupId'])">删除</el-button>
              </div>
              <div v-if="p.prop == 'positionType' || p.prop == 'positionCityIds' || p.prop == 'imeiType'" style="display: none;">
              </div>
              <div v-else>
                <div v-html="scope.row[p.prop]" />
              </div>
            </template>
          </el-table-column>
        </el-table>
        </div>
         <span slot="footer" class="dialog-footer">
            <el-button @click="groupDlgHide">取 消</el-button>

          </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import API from 'api/dataMoniting'
import ImportModal from "./ImportModal"
import channelSelect from '../../sale/channelSelect'
export default {
  components: {
    // 导入 组件
    ImportModal,
    channelSelect
  },
  data () {
    return {
      
      groupAddForm:{},
      groupModifyForm:{},

      groupIdToUpdate:'',
      nameToUpdate:'',
      selectedPositionTypeLabelToUpdate:'',
      selectedProvinceToUpdate:'',
      selectedCitiesToUpdate:'',
      IMEITypeToUpdate:'',
      imeiToMachToUpdate:'',
      groupDlgVisible:false,
      modifyDialogVisible:false,
      ImportForm: {},
      fileList: [],
      dialogVisible:false,
      queryCardsForm:{},
      channels:[],
      // 列表显示
      cardMonitors:[],
      blackCardlist: [],
      groupList:[],
      // 获取用户列表的参数对象
      queryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      // 表格
      table_column: [
        { prop: 'channelName', label: '渠道', width: 150},
        {prop:'iccid', label:'iccid', width: 220},
        {prop:'status', label:'状态',width: 300 },
        { prop: 'cityName', label: '当前城市', width: 100 },
        { prop: 'imei', label: 'IMEI', width: 200 },
        { prop: 'lbsGroupName', label: 'LBS监控组', width: 200 },
        // { prop: 'imeiGroupName', label: 'IMEI监控组', width: 200 },
        { prop: 'opts', label: '操作'}
      ],

      // positionType  positionCityIds imeiType
      tableGroupColum:[
        { prop: 'groupId', label: 'ID', width: 50},
        { prop: 'groupName', label: '组名称', width: 200},
        { prop: 'positionTypeName', label: 'lbs监控类型', width: 200},
        { prop: 'positionCityNames', label: 'lbs组配置信息', width: 200},
        { prop: 'imeiTypeName', label: 'IMEI监控类型', width: 200},
        { prop: 'imei', label: 'IMEI组配置信息', width: 100},
        { prop: 'opts', label: '操作'}
        // { prop: 'positionType', label: '监控类型id'},
        // { prop: 'positionCityIds', label: '监控城市id'},
        // { prop: 'imeiType', label: 'imei监控类型'}
      ],
      // 处理策略
      statusOptions: [
        { label: "使用", value: 0 },
        { label: "停用", value: 1 }
      ],
      positionTypes:[
        { label: "指定城市可以使用", value: 1 },
        { label: "指定城市不可以使用", value: 0 }
      ],
      IMEITypes:[
        { label: "IMEI一对一精确绑定", value: 0 },
        { label: "IMEI前6位数模糊匹配", value: 1 },
        { label: "IMEI后6位数模糊匹配", value: 2 }
      ],
      selectedPositionTypeValue:'',
      selectedPositionTypeLabel:'',
      selectedProvince:'',
      selectedCities:'',
      // 省份
      provinceOptions: [],

      PoisCitiesList: [],
      // 查询表字段
      queryBlackCardFormModel: {
        groupId: null,
        status: null
      },
      addDialogVisible: false,
      addForm: {
        name: '',
        lbsRate: ''
      },
      groupId: '',
      loading: false
    };
  },
  mounted () {
    this.getprovinceOptions()
  },
  created(){
    this.getBlackCardlist()
    this.queryCards()
  },
  methods: {
    
    channelSelectId (channelSelectId) {
      this.queryCardsForm.channelId = channelSelectId
    },
    queryOk:function(){
      this.queryCards();
    },
    queryCards:function(){
      this.loading = true
      console.log('sds')
      // 获取后台数据
      let params = {}
      params.iccid = this.queryCardsForm.iccid
      params.channelId = this.queryCardsForm.channelId
      params.lbsGroupId = this.queryCardsForm.lbsGroupId
      params.IMEIGroupId = this.queryCardsForm.IMEIGroupId
      params.status = this.queryCardsForm.status
      params.page = this.queryInfo.page
      params.pageSize = this.queryInfo.pageSize
      API.apiGroupCards(params).then(res => {
        if (res.resultCode === 0) {
          this.cardMonitors = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    uploadFile (item) {
      this.ImportForm.file = item.file
    },
    toImport:function(){
      if(this.ImportForm.file == undefined){
        that.$message.error({
          message: "请选择文件",
          type: "error",
          duration: 2000
        })
        return
      }
      if(this.ImportForm.lbsGroupId == undefined){
        that.$message.error({
          message: "请lbs监控组",
          type: "error",
          duration: 2000
        })
        return
      }
      if(this.ImportForm.IMEIGroupId == undefined){
        that.$message.error({
          message: "请IMEI监控组",
          type: "error",
          duration: 2000
        })
        return
      }
       
      const param = new FormData()
      param.append('file', this.ImportForm.file)
      param.append('lbsGroupId', this.ImportForm.lbsGroupId)
      param.append('IMEIGroupId', this.ImportForm.IMEIGroupId)
      API.apiLbsGroupCardUpload(param, this.groupId).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('导入成功！')
          this.getBlackCardlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })

    },
    groupDlgShow:function(){
      this.groupDlgVisible = true
      this.getBlackCardlist()
    },
    groupDlgHide:function(){
      this.groupDlgVisible = false
    },
    cityChange: function(vId){
      console.log(vId)
    },
    provinceChange (vId) {
      let obj = {};
      obj = this.provinceOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.provinceId === vId; // 筛选出匹配数据
      });
      
      if(obj == undefined)
        obj = {}
      this.getPoisCitiesList(obj.provinceId)
    },
    // 获取省份
    getprovinceOptions () {
      API.apiProvincesList().then(res => {
        if (res.resultCode === 0) {
          this.provinceOptions = res.data
          const provinceId = this.provinceOptions[0].provinceId
          this.getPoisCitiesList(provinceId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取需市
    getPoisCitiesList (provinceId) {
      const data = {
        provinceId: provinceId
      }
      API.apiPoisCitiesList(data).then(res => {
        if (res.resultCode === 0) {
          this.PoisCitiesList = res.data
          console.log(this.PoisCitiesList);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    positionTypeChange (vId) {
      
    },
    handledbClick (row, event, column) {
      console.log(row.groupId)
      const groupId = row.groupId
      sessionStorage.setItem('groupId', groupId)
      this.$router.push({
        path: 'blackGroupDetails',
        query: { groupId: groupId }
      })
    },
    //获取分页列表
    getBlackCardlist () {
      // 获取查询字段
      let queryBlackCardFormModel = this.queryBlackCardFormModel;
      let params = Object.assign(
        this.queryInfo,
        queryBlackCardFormModel
      );
      this.loading = true
      // 获取后台数据
      API.apiLbsGroups(params).then(res => {
        if (res.resultCode === 0) {
          this.blackCardlist = res.data
          console.log(this.blackCardlist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryInfo.pageSize = newSize
      this.queryCards()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      console.log(newPage)
      this.queryInfo.page = newPage - 1
      this.queryCards()
    },
    // 获取省份
    getprovinceOptions () {
      const params = {
        page: 0,
        pageSize: 100
      }
      API.apiProvincesList(params).then(res => {
        if (res.resultCode === 0) {
          this.provinceOptions = res.data
          console.log(this.provinceOptions);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    addShow () {
      this.addDialogVisible = true
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    modifyDialogShow:function(row){
      console.log(JSON.stringify(row))
      this.modifyDialogVisible = true
      this.selectedPositionTypeLabelToUpdate = row['positionType'];
      this.groupIdToUpdate = row['groupId']
      this.nameToUpdate = row['groupName']
      this.selectedCitiesToUpdate = row['positionCityIds']
      this.IMEITypeToUpdate = row['imeiType']
      this.imeiToMachToUpdate = row['imei']
    },
    modifyGroup:function(){
      this.$confirm('您确认要修改吗？')
        .then(() => {
          let params = {}
          params.groupId = this.groupIdToUpdate
          params.name = this.nameToUpdate
          params.positionType = this.selectedPositionTypeLabelToUpdate
          params.poiIds = this.selectedCitiesToUpdate
          params.imeiType = this.IMEITypeToUpdate
          params.imeiToMatch = this.imeiToMachToUpdate
          API.apiLbsGroupModify(params).then(res => {
            if (res.resultCode === 0) {
              this.modifyDialogVisible = false
              this.$message.success('修改成功！')
              this.getBlackCardlist()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        })
        .catch(() => {
        });
    },
    removeGroup:function(groupId){
      this.$confirm('您确认要删除吗？')
        .then(() => {
          let params = {}
          params.groupId = groupId
          API.apiLbsDeleteGroup(params).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('删除成功！')
              this.getBlackCardlist()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        })
        .catch(() => {
        });
    },
    addGroup () {
      let param = {}
      param.name = this.groupAddForm.name
      if(param.name == undefined || param.name === ''){
        this.$message.error({
          message: "组名称必须填写",
          type: "error",
          duration: 2000
        })
        return
      }
      param.positionType = this.groupAddForm.selectedPositionTypeLabel
      param.poiIds = this.groupAddForm.selectedCities
      if(param.positionType != undefined && (param.poiIds == undefined || param.poiIds == '')){
        this.$message.error({
          message: "选择lbs定位类型的情况下，必须填写相应的使用城市",
          type: "error",
          duration: 2000
        })
        return
      }
      param.imeiType = this.groupAddForm.IMEIType
      param.imeiToMatch = this.groupAddForm.imeiToMach
      if(param.imeiType != undefined && param.imeiType != 0 && (param.imeiToMatch == undefined || param.imeiToMatch == '')){
        this.$message.error({
          message: "必须填写相应的imei信息",
          type: "error",
          duration: 2000
        })
        return
      }
      console.log(JSON.stringify(param))
      API.apiLbsGroupAdd(param).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getBlackCardlist()
          this.addDialogVisible = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 操作状态
    deactivation (row, type) {
      const data = {
        groupId: row.groupId,
        status: type
      }
      API.apiLbsGroupStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('操作成功！')
          this.getBlackCardlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    importCardsToGroup () {
      this.dialogVisible = true;
    },
    // 导入弹框
    importData ($item) {
      console.log($item);
      this.groupId = $item.groupId
      this.$refs.ImportModal.dialogVisible = true;
    },
    // 导入组件，成功后
    InportModalSuccess (param) {
      API.apiLbsGroupCardUpload(param, this.groupId).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('导入成功！')
          this.getBlackCardlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
};
</script>
<style scoped>
.time-line {
  display: inline-block;
  width: 20px;
  text-align: center;
}
.el-table__body-wrapper is-scrolling-left {
  max-height: 487px !important;
}
.el-dialog-div{
  height: 300px;
}

</style>
