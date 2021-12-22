<template>
  <!-- 渠道列表 2020-06月 刘珍利  -->
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <div class="button_content"> 
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showAddChannel" v-permission="{indentity:'bigflowChannelList-add'}">添加渠道</el-button>
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="showAddManager" v-permission="{indentity:'bigflowChannelList-add'}">添加管理员</el-button>
          </div>
          <el-table v-loading="loading" :data="salePersons" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                  <div v-if="p.prop == 'channelName'">
                    <span>{{selectedChannelName}}</span>
                  </div>
                  <div v-else>
                      <div v-html="scope.row[p.prop]" />
                  </div>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
       <el-dialog title="新增渠道" :visible.sync="showAddChannelDlg" width="450px" @close="hideAddChannelDlg">
      <el-form :model="addChannelForm"  label-width="110px">
          <el-form-item label="渠道名称">
          <el-input style="width:300px;" v-model="addChannelForm.name" placeholder="请输入渠道名称" ></el-input>
        </el-form-item>
        <el-form-item label="父渠道">
            <el-select 
            filterable
          clearable
          reserve-keyword
            placeholder="请输入父渠道" v-model="addChannelForm.parentId">
            <el-option v-for="item in channels" :key="item.channelId" :label="item.name" :value="item.channelId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系人姓名">
          <el-input style="width:300px;"  v-model="addChannelForm.salePerson" placeholder="请输入联系人姓名" ></el-input>
        </el-form-item>
        <el-form-item label="联系人手机号">
          <el-input style="width:300px;"  v-model="addChannelForm.phone" placeholder="请输入联系人手机号" ></el-input>
        </el-form-item>
         <el-form-item label="登录密码">
          <el-input style="width:300px;"  v-model="addChannelForm.pwd" placeholder="请输入登录密码" ></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="hideAddChannelDlg">取 消</el-button>
        <el-button type="primary" @click="okAddChannel">确 定</el-button>
      </span>   
    </el-dialog>
    <el-dialog :title="dialogTitle" :visible.sync="addManagerDialogVisible" width="430px" @close="closeChannelManagerButton">
      <!-- 内容主体区域 -->
      <el-form ref="addChannelRef"  label-width="120px">
        <el-form-item label="管理员手机号" >
          <el-input size="small" v-model="managerPhone" placeholder="请输入管理员手机号"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" >
          <el-input size="small" v-model="manager" placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="密码" >
          <el-input size="small" v-model="pwd" placeholder="请输入管理员密码"></el-input>
        </el-form-item>
        <el-form-item label="管理员角色" prop="usingInDevice" v-show="isUsingIn">
          <el-select size="small" style="width:100%;" v-model="roleId" placeholder="请选择管理员角色">
            <el-option v-for="item in channelRoles" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="closeChannelManagerButton">取 消</el-button>
          <el-button type="primary" @click="addManager">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import channelTree from "./channelTree"
// import SelectTree from './../treeSelect'
import API from 'api/channels'
import apiBigflow from 'api/bigflow'
import APISYS from 'api/system'
export default {
  name: 'channelList',
  components: {
    channelTree,
    // SelectTree
  },
  data () {
    return {
      addManagerDialogVisible:false,
      managerPhone:'',
      manager:'',
      pwd:'', 
      roleId:'',
      channels:[],
      showAddChannelDlg:false,
      addChannelForm:{},
      salePersons:[],
      selecedChannelCode:null,
      selectedChannelName:null,
      // 渠道管理列表
      channelRoles:[],
      roleId:'',
      channelId:'',
      managerPhone:'', 
      manager:'' ,
      pwd:'',
      channelList: [],
      parentChannnelName: '',
      page: 1,
      pageSize: 10,
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'channelName', label: '渠道名称', width: 300 },
        { prop: 'name', label: '姓名', width: 100 },
        { prop: 'mobile', label: '登陆帐号', width: 100 },
        { prop: 'mobile', label: '手机号', width: 100 },
        { prop: 'type', label: '类型', width: 100 },
        { prop: 'qrCode', label: '登录密码', width: 180 },
        { prop: 'openId', label: '微信openId', width: 240 },
        { prop: 'status', label: '状态', width: 220 }
      ],
      queryChannelForm: {
          name:null,
          phone:null
      },
      ChannelsQrcode: '',
      addDialogVisible: false,
      addManagerDialogVisible:false,
      dialogTitle: '新增渠道',
      // 设备渠道
      usingInDeviceOptions: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      // 学霸卡渠道
      usingInXuebakaOptions: [
        { label: '是', value: 1 },
        { label: '否', value: 0 }
      ],
      // form 表单字段
      addChannelForm: {
        channelName: null,
        manager: null,
        managerPhone: null,
        parentChannelId: 2,
        twoCodeEnable: true,
        usingInXuebaka: 1,
        usingInDevice: 0
      },
      // 字段验证
      addChannelRules: {
        channelName: [{ required: true, message: "请输入渠道名称", trigger: "blur" }],
        managerPhone: [{ required: true, message: "请输入联系人手机", trigger: "blur" }],
        manager: [{ required: true, message: "联系人名称", trigger: "blur" }],
        channelNo: [{ required: true, message: "请输入渠道编码", trigger: "blur" }]
      },
      mineStatusValue: [],
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      props: {
        // 配置项（必选）
        value: "channelId",
        label: "channelName",
        children: "children"
      },
      // 选项列表（必选）
      channelTreeList: [],
      optionData: [],
      loading: false,
      isUsingIn: true
    }
  },

  mounted () {
    this.getChannelList();
    this.getParentChannelOptions()
    this.getChannelRoles()
    this.getChannelTree()
  },
  methods: {
    addManager:function(){
        if(this.selecedChannelCode == null || this.selecedChannelCode == undefined || this.selecedChannelCode  == ''){
            this.$message.success('渠道不能为空')
            return
        }
        if(this.manager == null || this.manager == undefined || this.manager  == ''){
            this.$message.success('管理员姓名不能为空')
            return
        }
        if(this.managerPhone == null || this.managerPhone == undefined || this.managerPhone  == ''){
            this.$message.success('管理员手机号不能为空')
            return
        }
        if(this.pwd == null || this.pwd == undefined || this.pwd  == ''){
            this.$message.success('管理员登录密码不能为空')
            return
        }
        if(this.roleId == null || this.roleId == undefined || this.roleId  == ''){
            this.$message.success('管理员角色不能为空')
            return
        }

        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.name = this.manager
        params.phone = this.managerPhone
        params.pwd = this.pwd
        params.saleChannelId = this.selecedChannelCode 
        params.roleId = this.roleId
        apiBigflow.addSaleChannelManager(params).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('添加成功！')
              this.addManagerDialogVisible = false;
              this.getSalePerson()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
      }).catch(() => {
      });
    },
    //   addSaleChannelManager
    closeChannelManagerButton:function(){
        this.addManagerDialogVisible = false
    },
    showAddManager:function(){
        this.addManagerDialogVisible = true
    },
    getChannelTree () {
      let params = {}
      params.page=1
      apiBigflow.getSaleChannels(params).then(res => {
        if (res.resultCode === 0) {
            this.channels = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    hideAddChannelDlg:function(){
        this.showAddChannelDlg = false
    },
    okAddChannel:function(){
        if(this.addChannelForm.name == undefined || this.addChannelForm.name == '' || this.addChannelForm.name == null){
            this.$message.error('渠道名必须填写')
            return
        }
        if(this.addChannelForm.parentId == undefined || this.addChannelForm.parentId == '' || this.addChannelForm.parentId == null){
            this.$message.error('父渠道必须填写')
            return
        }
        if(this.addChannelForm.salePerson == undefined || this.addChannelForm.salePerson == '' || this.addChannelForm.salePerson == null){
            this.$message.error('联系人姓名必须填写')
            return
        }
        if(this.addChannelForm.phone == undefined || this.addChannelForm.phone == '' || this.addChannelForm.phone == null){
            this.$message.error('联系人电话必须填写')
            return
        }
        if(this.addChannelForm.pwd == undefined || this.addChannelForm.pwd == '' || this.addChannelForm.pwd == null){
            this.$message.error('登录密码必须填写')
            return
        }
        this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.name = this.addChannelForm.name
        params.parentId = this.addChannelForm.parentId
        params.contactMobile = this.addChannelForm.phone
        params.contactName = this.addChannelForm.salePerson
        params.password = this.addChannelForm.pwd

        params.channelId = localStorage.getItem('channelId');
        apiBigflow.addSaleChannel(params).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('添加成功！')
              this.$refs.channerTreeRef.getChannelTree()
              this.hideAddChannelDlg()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
      }).catch(() => {
      }); 
    },
    showAddChannel:function(){
        this.showAddChannelDlg = true;
    },
    getSalePerson:function(){
        
        let params = {}
        params.qtype = 'channel'
        params.page = 1
        params.saleChannel = this.selecedChannelCode
      apiBigflow.getSalePersons(params).then(res => {
        if (res.resultCode === 0) {
          this.salePersons = res.data;
        
        } else {
          this.$message.error('查询失败')
        }
      })
    },
    getChannelRoles:function(){
      let params = {}
      APISYS.getAllSysRoles(params).then(res => {
        if (res.resultCode === 0) {
          let allRoles = res.data;
          this.channelRoles = allRoles.filter(role=>{
            if(role.type === 2)
                return true
            return false
        })
        } else {
          this.$message.error('获取公众号二维码失败: 获取不到accesstoken')
        }
      })
    },
    channelChick (channel) {
    
    },
    // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName) {
        this.selecedChannelCode = channelsID
        this.selectedChannelName = channelName
        this.getSalePerson()
    },
    // 获取列表
    getChannelList (parentChannelId) {
      // 获取查询字段
      if (!parentChannelId) {
        const parentChannelaa = {
          parentChannel: 1
        }
        this.apiChannelsList(parentChannelaa)
      } else {
        const parentChannelbb = {
          parentChannel: parentChannelId,
        }
        this.apiChannelsList(parentChannelbb)
      }
    },
    // 根据渠道生成微信公众号二维码
    ChannelsQrcodeAdd (channelId) {
      const params = {
        channelId: channelId
      }
      API.apiChannelsQrcode(params).then(res => {
        if (res.resultCode === 0) {
          this.ChannelsQrcode = res.data
        } else {
          this.$message.error('获取公众号二维码失败: 获取不到accesstoken')
        }
      })
    },
    apiChannelsList (parentChannel) {
      let queryChannelForm = this.queryChannelForm
      let params = Object.assign(
        queryChannelForm,
        parentChannel
      );
      this.loading = true
      API.apiChannelsList(params).then(res => {
        if (res.resultCode === 0) {
          this.channelList = res.data
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryChannelForm.pageSize = newSize
      this.getChannelList(localStorage.getItem('channelId'))
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryChannelForm.page = newPage - 1
      this.getChannelList(localStorage.getItem('channelId'))
    },
    // 查询按钮
    queryChannelButton () {
      if (this.queryChannelForm.channelId === '') {
        this.queryChannelForm.channelId = null
      }
      if (this.queryChannelForm.channelName === '') {
        this.queryChannelForm.channelName = null
      }
      if (this.queryChannelForm.endDate === '') {
        this.queryChannelForm.endDate = null
      }
      if (this.queryChannelForm.manager === '') {
        this.queryChannelForm.manager = null
      }
      if (this.queryChannelForm.startDate === '') {
        this.queryChannelForm.startDate = null
      }
      this.getChannelList(localStorage.getItem('channelId'))
    },
    // 取值
    getValue (value) {
      console.log(value);
      this.addChannelForm.parentChannelId = value
    },
    getManagerChannelId(value){
      this.channelId = value
    },
    // 获取渠道
    getParentChannelOptions () {
      // 获取后台数据
      API.apiChannelsAllList().then(res => {
        if (res.resultCode === 0) {
          this.channelTreeList = Object.values(res.data).map(function (e) {
            return {
              channelId: e.channelId,
              channelName: e.channelName,
              manager: e.manager,
              parentChannelId: e.parentChannelId
            }
          })
          let jsonData = JSON.parse(JSON.stringify(this.channelTreeList))
          var result = [], temp = {}, i = 0, j = 0, len = jsonData.length
          for (; i < len; i++) {
            temp[jsonData[i]['channelId']] = jsonData[i] // 以id作为索引存储元素，可以无需遍历直接定位元素
          }
          for (; j < len; j++) {
            var currentElement = jsonData[j]
            var tempCurrentElementParent = temp[currentElement['parentChannelId']] // 临时变量里面的当前元素的父元素 parentId 父级ID
            if (tempCurrentElementParent) { // 如果存在父元素
              if (!tempCurrentElementParent['children']) { // 如果父元素没有chindren键
                tempCurrentElementParent['children'] = [] // 设上父元素的children键
              }
              tempCurrentElementParent['children'].push(currentElement) // 给父元素加上当前元素作为子元素
            } else { // 不存在父元素，意味着当前元素是一级元素
              result.push(currentElement);
            }
          }
          this.optionData = result
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击新增
    addChannelShow () {
      this.addDialogVisible = true
      this.dialogTitle = '新增渠道'
      this.addChannelForm.channelId = null
      this.isUsingIn = true
    },
    addChannelManagerShow(){
      this.addManagerDialogVisible = true
      this.dialogTitle = '新增渠道管理员'
    },
    removeChannel(){
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let params = {}
        params.channelId = localStorage.getItem('channelId');
        API.apiRemoveChannel(params).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('删除成功！')
              this.$refs.channerTreeRef.getChannelTree()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
      }).catch(() => {
      });
    },
    closeChannelManagerButton(){
      this.addManagerDialogVisible = false
    },
    addChannelManagerButton(){
      let that = this
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('add...')
        let params = {}
        params.channelId = this.channelId
        params.userName = this.managerPhone
        params.name = this.manager
        params.type = 1
        params.phone = this.managerPhone
        params.pwd = this.pwd
        params.roleId = this.roleId
        API.apiAddChannelManager(params).then(res => {
          console.log('add...' + JSON.stringify(res))
            if (res.resultCode === 0) {
              this.$message.success('新增成功！')
              that.addManagerDialogVisible = false
              that.getChannelList(localStorage.getItem('channelId'))
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        
      }).catch(() => {
      });


      
    },
    // 监听是否为设备渠道
    usingInDeviceChange (vId) {
      if (vId === 0) {
        this.addChannelForm.usingInXuebaka = 1
      } else {
        this.addChannelForm.usingInXuebaka = 0
      }
    },
    // 监听是否为学霸卡渠道
    usingInXuebakaChange (vId) {
      if (vId === 0) {
        this.addChannelForm.usingInDevice = 1
      } else {
        this.addChannelForm.usingInDevice = 0
      }
    },
    closeButton () {
      this.addDialogVisible = false
      this.$refs.addChannelRef.resetFields()
      this.addChannelForm.channelId = null
      this.addChannelForm.channelName = null
      this.addChannelForm.parentChannelId = null
      this.addChannelForm.managerPhone = null
      this.addChannelForm.manager = null
      this.addChannelForm.usingInDevice = null
      this.addChannelForm.usingInXuebaka = null
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addChannelRef.resetFields()
      this.addChannelForm.channelId = null
      this.addChannelForm.channelName = null
      this.addChannelForm.parentChannelId = null
      this.addChannelForm.managerPhone = null
      this.addChannelForm.manager = null
      this.addChannelForm.usingInDevice = null
      this.addChannelForm.usingInXuebaka = null
    },
    addUser () {
      this.$refs.addChannelRef.validate(valid => {
        if (!valid) return
        if (!this.addChannelForm.channelId) {
          const data = {
            channelName: this.addChannelForm.channelName,
            manager: this.addChannelForm.manager,
            managerPhone: this.addChannelForm.managerPhone,
            parentChannelId: Number(this.addChannelForm.parentChannelId),
            twoCodeEnable: this.addChannelForm.twoCodeEnable,
            usingInDevice: this.addChannelForm.usingInDevice,
            usingInXuebaka: this.addChannelForm.usingInXuebaka
          }
          console.log('新增');
          console.log(data);
          this.addChannelListSuccess(JSON.stringify(data))
        } else {
          console.log('编辑');
          const data = {
            channelId: this.addChannelForm.channelId,
            channelName: this.addChannelForm.channelName,
            manager: this.addChannelForm.manager,
            managerPhone: this.addChannelForm.managerPhone,
            parentChannelId: Number(this.addChannelForm.parentChannelId),
            twoCodeEnable: this.addChannelForm.twoCodeEnable
          }
          console.log(data);
          API.apiChannelsModify(data).then(res => {
            if (res.resultCode === 0) {
              this.$message.success('编辑成功！')
              this.getChannelList(localStorage.getItem('channelId'))
              this.getParentChannelOptions()
              this.$refs.channerTreeRef.getChannelTree()
              this.addDialogVisible = false
              this.$refs.addChannelRef.resetFields()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        }

      });
    },

    // 新增确认成功
    addChannelListSuccess (data) {
      API.apiChannelsAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('添加成功！')
          this.getChannelList(localStorage.getItem('channelId'))
          this.getParentChannelOptions()
          this.$refs.channerTreeRef.getChannelTree()
          this.addDialogVisible = false
          this.$refs.addChannelRef.resetFields()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

    // 点击编辑
    channelEdit (row) {
      this.addDialogVisible = true
      this.dialogTitle = '编辑渠道'
      this.addChannelForm.channelId = row.channelId
      this.addChannelForm.channelName = row.channelName
      this.addChannelForm.parentChannelId = row.parentChannelId
      this.addChannelForm.managerPhone = row.managerPhone
      this.addChannelForm.manager = row.manager
      this.isUsingIn = false
      if (row.twoCodeEnable === 0) {
        this.addChannelForm.twoCodeEnable = false
      } else {
        this.addChannelForm.twoCodeEnable = true
      }
    },
    // 停用/启用
    deactivation (row, type) {
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = {
          channelId: row.channelId,
          status: type
        }
        API.apiChannelsStatusModify(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('停用成功！')
            this.getChannelList(localStorage.getItem('channelId'))
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      });
    },
    // 详情
    channelDetail (index, row) {
      const channelId = row.channelId
      localStorage.setItem('channelId', channelId)
      this.$router.push({
        path: 'channelDetail',
        query: {
          channelId: channelId
        }
      })
    }
  }
}
</script>

<style scoped>
.box_subject {
  box-sizing: border-box;
  padding: 10px 10px 0 10px;
}
.hoverQrcodeBox {
  width: 150px;
}
.hoverQrcodeBoxNo {
  text-align: center;
}
</style>
