<template>
  <!-- 组织架构及人员 -->
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="selectBox" style="padding:15px">
            <div class="selectInput">
              <el-input size="medium" placeholder="输入关键字进行过滤" v-model="filterText">
              </el-input>
            </div>
            <div class="selectButton">
              <el-button size="medium" type="primary" icon="el-icon-plus" @click="addShow">添加</el-button>
            </div>
          </div>
          <el-tree :data="groupControlData" :props="defaultProps" node-key="id" ref="tree" @node-click="handleNodeClick" style="margin:15px;" draggable>
            <div class="custom-tree-node" slot-scope="{node,data}">
              <div style="line-height:30px" :class="{active:(clickIndex1 == data )}">
                <span class="zz_icon" v-show="data.type === 2">校</span>
                <span class="zz_icon" v-show="data.type === 0">年</span>
                <span class="zz_icon" v-show="data.type === 1">班</span>
                <!-- <span class="zz_icon" v-show="data.type === 3">其</span> -->
                <span style="padding-left:5px">{{ node.label }}</span>
              </div>
              <div class="organizationTree" :class="{active:(clickIndex == item )}" v-for="item in controlGroupsTreeList" :key="item.id" v-show="item.organization_id === data.id"
                @click.stop="organizationTreeChick(item)">
                <!-- :class="{ 'active': isActive }" -->
                <div v-if="item.statue === 1">
                  <span class="k_icon">控</span><span style="padding-left:5px">{{ item.name }}</span>
                </div>
                <div v-if="item.statue === 0 || item.statue === null">
                  <span class="k_icon1">控</span><span style="padding-left:5px">{{ item.name }}</span>
                </div>
                <!-- <groupName :item="item" @groupChick="organizationTreeChick"></groupName> -->
              </div>
            </div>
          </el-tree>
        </el-card>
      </el-col>
      <el-col :span="18">
        <!-- 组织管理信息 -->
        <el-card v-show="ZZisShowCard">
          <div class="heardStype">
            <!-- table表格区域 -->
            <el-table :data="organizationList" border align="center" :cell-style="{height: '38px',padding:0}">
              <el-table-column prop="schoolName" label="组织名称" align="center">
                <template>
                  {{ZZname}}
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="管理员手机号/账号" width="150" align="center">
              </el-table-column>
              <el-table-column prop="name" label="管理员姓名" width="120" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="150" align="center">
              </el-table-column>
              <el-table-column label="操作" width="220" align="center">
                <template slot-scope="scope">
                  <el-button size="mini" @click="managerModify(scope.row)">编辑</el-button>
                  <el-button v-if="scope.row.status == 1" size="mini" type="danger" plain @click="deactivation(scope.row, 0)">停用</el-button>
                  <el-button v-else size="mini" type="warning" plain @click="deactivation(scope.row,1)">启用</el-button>
                  <el-button size="mini" @click="managerDel(scope.row.managerId)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-card>
        <el-card v-show="ZZisShowCard">
          <div style="padding:15px">
            <!-- 按钮区域 -->
            <div class="button_content" style="margin-top:10px;">
              <el-button size="medium" type="primary" icon="el-icon-plus">批量导入</el-button>
              <el-input class="searchInput" v-model="ZZsearch" placeholder="输入关键字搜索" />
            </div>
            <!-- 组织下的学生table表格区域 -->
            <el-table
              :data="personneList.filter(data => !ZZsearch || data.className.toLowerCase().includes(ZZsearch.toLowerCase()) || data.name.toLowerCase().includes(ZZsearch.toLowerCase()) || data.phone.toLowerCase().includes(ZZsearch.toLowerCase()) || data.iccid.toLowerCase().includes(ZZsearch.toLowerCase()))"
              ref="filterTable" border align="center" :cell-style="{height: '38px',padding:0}">
              <el-table-column prop="id" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="term" label="届数" width="60">
              </el-table-column>
              <el-table-column prop="grade" label="年级" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.grade === 1">年级</span>
                </template>
              </el-table-column>
              <el-table-column prop="className" width="100">
                <template slot="header" slot-scope="scope">
                  <span>班级名称{{scope.header}}</span>
                  <!-- <div class="searchBox">aaaaaaaaaaaaaa</div> -->
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="100" :filters="ZZnameList" :filter-method="filterName" filter-placement="bottom-end"></el-table-column>
              <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
              <el-table-column prop="iccid" label="ICCID" width="180"></el-table-column>
              <el-table-column prop="groups" label="受控组">
                <template slot-scope="scope">
                  <span class="groupsItem" v-for="item in scope.row.groups" :key="item.id">{{item.name}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="statue" label="当前状态" width="100" :filters="[{ text: '不受控', value: 0 }, { text: '受控', value: 1 }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <span v-if="scope.row.statue == 0">不受控</span>
                  <span v-if="scope.row.statue == 1">受控</span>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 区域 -->
            <el-pagination @size-change="ZZhandleSizeChange" @current-change="ZZhandleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="ZZtotal">
            </el-pagination>
          </div>

        </el-card>
        <!-- 受控组管理信息 -->
        <el-card v-show="SKZisShowCard">
          <div class="heardStype">
            <!-- table表格区域 -->
            <el-table :data="controlledList" border align="center" :cell-style="{height: '38px',padding:0}">
              <el-table-column prop="groupName" label="受控组名称" align="center">
                <template>
                  {{QKZname}}
                </template>
              </el-table-column>
              <el-table-column prop="phone" label="管理员手机号/账号" width="150" align="center">
              </el-table-column>
              <el-table-column prop="name" label="管理员姓名" width="120" align="center">
              </el-table-column>
              <el-table-column prop="createTime" label="创建时间" width="150" align="center">
              </el-table-column>
              <!-- <el-table-column label="操作" width="220" align="center">
              <template slot-scope="scope">
                <el-button size="mini" @click="managerModify(scope.row)">编辑</el-button>
                <el-button v-if="scope.row.status == 1" size="mini" type="danger" plain @click="deactivation(scope.row, 0)">停用</el-button>
                <el-button v-else size="mini" type="warning" plain @click="deactivation(scope.row,1)">启用</el-button>
                <el-button size="mini" @click="managerDel(scope.row.managerId)">删除</el-button>
              </template>
            </el-table-column> -->
            </el-table>
          </div>
        </el-card>
        <el-card v-show="SKZisShowCard">
          <div style="padding:15px">
            <!-- 按钮区域 -->
            <div class="button_content" style="margin-top:10px;">
              <!-- <el-button size="medium" type="primary" v-show="ManageStrategyList.length ===0" style="margin-right:15px;">受控策略</el-button> -->
              <div class="styategyTitle">受控策略：</div>
              <el-select style="margin:0 10px;width:260px" width="260px" v-model="ManageStrategy" multiple placeholder="请选择" @change="styategySetChange">
                <el-option v-for="item in ManageStrategys" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select>
              <!-- <el-select style="margin:0 10px;width:300px" width="260px" v-model="ManageStrategy" multiple placeholder="请选择">
                <el-option v-for="item in ManageStrategyList" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
              </el-select> -->
              <!-- <el-button v-if="QKZstytus===0 || QKZstytus===null" size="medium" type="primary" @click="StatusModifyClick(1)">生效</el-button>
              <el-button v-if="QKZstytus===1" size="medium" type="primary" disabled>生效</el-button> -->

              <!-- <el-button v-if="QKZstytus===1" size="medium" type="danger" @click="StatusModifyClick(0)">失效</el-button>
              <el-button v-if="QKZstytus===0 || QKZstytus===null" size="medium" type="danger" disabled>失效</el-button> -->
              <div class="svitchBox">
                <img class="SKZListItemIcon" :src="switchOpenIcon" v-if="QKZstytus===1" @click="StatusModifyClick(0)">
                <div class="SKZListItemStutasName" v-if="QKZstytus===1">生效</div>
                <img class="SKZListItemIcon" :src="switchCloseIcon" v-if="QKZstytus===0 || QKZstytus===null" @click="StatusModifyClick(1)">
                <div class="SKZListItemStutasName" v-if="QKZstytus===0 || QKZstytus===null">失效</div>
              </div>

              <el-button size="medium" v-show="this.selectListNumber === 0" type="primary" icon="el-icon-edit" disabled>批量设置</el-button>
              <el-button v-show="this.selectListNumber !== 0" size="medium" type="primary" icon="el-icon-edit" @click="editSelected()">批量设置</el-button>
            </div>
            <!-- 受控组下的学生信息table表格区域 -->
            <el-table :data="SKpersonneList" border align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="55">
              </el-table-column>
              <el-table-column prop="id" label="序号" width="60">
              </el-table-column>
              <el-table-column prop="term" label="届数" width="60">
              </el-table-column>
              <el-table-column prop="grade" label="年级" width="60">
                <template slot-scope="scope">
                  <span v-if="scope.row.grade === 1">年级</span>
                </template>
              </el-table-column>
              <el-table-column prop="className" width="100">
                <template slot="header" slot-scope="scope">
                  <span>班级名称{{scope.header}}</span>
                  <!-- <div class="searchBox">aaaaaaaaaaaaaa</div> -->
                </template>
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="100" :filters="ZZnameList" :filter-method="filterName" filter-placement="bottom-end"></el-table-column>
              <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
              <el-table-column prop="iccid" label="ICCID" width="180"></el-table-column>
              <!-- <el-table-column prop="groups" label="受控组">
              <template slot-scope="scope">
                <span class="groupsItem" v-for="item in scope.row.groups" :key="item.id">{{item.name}}</span>
              </template>
            </el-table-column> -->
              <el-table-column prop="statue" label="当前状态" width="100" :filters="[{ text: '不受控', value: 0 }, { text: '受控', value: 1 }]" :filter-method="filterTag" filter-placement="bottom-end">
                <template slot-scope="scope">
                  <span v-if="scope.row.statue == 0">不受控</span>
                  <span v-if="scope.row.statue == 1">受控</span>
                </template>
              </el-table-column>
              <el-table-column prop="operation" label="操作">
                <template slot-scope="scope">
                  <el-button v-if="scope.row.statue == 0" size="mini" type="danger" plain @click="SKdeactivation(scope.row, 1)">受控</el-button>
                  <el-button v-else size="mini" type="warning" plain @click="SKdeactivation(scope.row,0)">不受控</el-button>
                </template>
              </el-table-column>
            </el-table>
            <!-- 分页 区域 -->
            <el-pagination @size-change="SKhandleSizeChange" @current-change="SKhandleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
              :total="SKtotal">
            </el-pagination>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 新增对话框 -->
    <el-dialog title="新增" :visible.sync="addDialogVisible" width="430px" @close="addDialogClosed">
      <div style="margin-bottom: 20px">
        <el-radio-group v-model="flowRadio" size="medium">
          <el-radio-button label="受控组"></el-radio-button>
          <el-radio-button label="组织"></el-radio-button>
        </el-radio-group>
      </div>
      <!-- 内容主体区域 -->
      <el-form :model="addForm" ref="addFormRef" label-width="90px">
        <el-form-item label="受控组名称" prop="name" v-if="flowRadio == '受控组'">
          <el-input style="width:300px;" v-model="addForm.name" placeholder="请输入受控组名称"></el-input>
        </el-form-item>
        <el-form-item label="组织名称" prop="name" v-else>
          <el-input style="width:300px;" v-model="addForm.name" placeholder="请输入组织名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号/账号" prop="managerPhone">
          <el-input style="width:300px;" v-model="addForm.managerPhone" @change="managerPhone(addForm.managerPhone)" placeholder="请输入组管理员手机号/账号"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd">
          <el-input style="width:300px;" v-model="addForm.pwd" placeholder="请输入密码" :disabled="addDisbled"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="managerName">
          <el-input style="width:300px;" v-model="addForm.managerName" placeholder="请输入管理员姓名" :disabled="addDisbled"></el-input>
        </el-form-item>
        <el-form-item label="组织类型" prop="type" v-if="flowRadio == '组织'">
          <el-select style="width:300px;" v-model="addForm.type" placeholder="请选择组织类型">
            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 修改管理员信息对话框 -->
    <el-dialog title="修改管理员信息" :visible.sync="modifyManagerDialogVisible" width="430px" @close="modifyManagerDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="modifyManagerForm" ref="modifyManagerFormRef" label-width="90px">
        <el-form-item label="管理员姓名">
          <el-input style="width:300px;" v-model="modifyManagerForm.name" placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="手机号/账号">
          <el-input style="width:300px;" v-model="modifyManagerForm.phone" placeholder="请输入组管理员手机号/账号"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input style="width:300px;" v-model="modifyManagerForm.pwd" placeholder="请输入密码"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="modifyManagerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="modifyManagerConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 批量设置群控组状态 受控/不受控 -->
    <el-dialog title="批量设置受控状态" :visible.sync="batchmodifyDialogVisible" width="430px" @close="batchmodifyDialogClosed">
      <el-form :model="batchmodifyData" ref="batchmodifyDataRef" label-width="90px">
        <el-form-item label="受控状态">
          <el-select style="width:300px;" v-model="batchmodifyData.status" placeholder="请选择受控状态">
            <el-option v-for="item in SKStatusOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="batchmodifyDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="batchmodifyConfirm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from 'api/groupControl'
import switchOpenIcon from 'assets/images/switch_open.png'
import switchCloseIcon from 'assets/images/switch_close.png'
export default {
  inject: ['reload'], // 注入App里的reload方法
  data () {
    return {
      filterText: '',
      switchOpenIcon: switchOpenIcon,
      switchCloseIcon: switchCloseIcon,
      isActive: false,
      clickIndex: -1,
      clickIndex1: -1,
      ZZisShowCard: true,
      SKZisShowCard: false,
      treeList: [],
      controlGroupsTreeList: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      },
      channelTreeList: [],
      // 组织架构
      organizationList: [],

      // 获取用户列表的参数对象
      ZZqueryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      page: 0,
      pageSize: 10,
      // 列表总条数
      ZZtotal: 0,
      personneList: [],
      ZZnameList: [],
      // 受控组
      controlledList: [],
      SKpersonneList: [],
      // 获取用户列表的参数对象
      SKqueryInfo: {
        // 当前的页数
        page: 0,
        // 当前每页显示多少条数据
        pageSize: 10
      },
      // 列表总条数
      SKtotal: 0,
      batchNum: 0,
      ZZsearch: '',
      SKZsearch: '',
      flowRadio: '受控组',
      addForm: {
        name: null,
        managerPhone: null,
        pwd: null,
        managerName: null,
        parentId: null,
        type: null
      },
      // 组织类型
      typeOptions: [
        { label: "年级", value: 0 },
        { label: "班级", value: 1 },
        { label: "分校/系/学科/其他", value: 3 }
      ],
      addDialogVisible: false,
      SchoolmamnagersId: null,
      groupMamnagerId: null,
      modifyManagerDialogVisible: false,
      modifyManagerForm: {
        managerId: null,
        name: null,
        phone: null,
        pwd: null
      },
      batchmodifyDialogVisible: false,
      batchmodifyData: {
        iccids: null,
        names: null,
        organizationIds: null,
        phones: null,
        terms: null,
        status: null
      },
      // 组织类型
      SKStatusOptions: [
        { label: "不受控", value: 0 },
        { label: "受控", value: 1 }
      ],
      ManageStrategyList: [],
      ManageStrategy: [],
      stragegyIdsOld: [],
      multipleSelection: [],
      selectListNumber: 0,
      ManageStrategys: [],
      addDisbled: false,
      QKZstytus: '',
      QKZname: '',
      ZZname: ''
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
    this.getTreeList()
    this.getGroupcontrolManageStrategys()
  },
  computed: {
    /* 转树形数据 */
    groupControlData () {
      let jsonData = JSON.parse(JSON.stringify(this.treeList))
      // let controlGroupsTreeList = JSON.parse(JSON.stringify(this.controlGroupsTreeList))
      var result = [], temp = {}, i = 0, j = 0, len = jsonData.length
      for (; i < len; i++) {
        temp[jsonData[i]['id']] = jsonData[i] // 以id作为索引存储元素，可以无需遍历直接定位元素
      }
      for (; j < len; j++) {
        var currentElement = jsonData[j]
        var tempCurrentElementParent = temp[currentElement['parent_id']] // 临时变量里面的当前元素的父元素 parentId 父级ID
        if (tempCurrentElementParent) { // 如果存在父元素
          if (!tempCurrentElementParent['children']) { // 如果父元素没有chindren键
            tempCurrentElementParent['children'] = [] // 设上父元素的children键
          }
          tempCurrentElementParent['children'].push(currentElement) // 给父元素加上当前元素作为子元素
        } else { // 不存在父元素，意味着当前元素是一级元素
          result.push(currentElement);
        }
      }
      return result;
    }
  },
  methods: {
    getGroupcontrolManageStrategys () {
      const data = {
        groupId: null,
        iccids: [],
        names: [],
        organizationIds: [],
        phones: [],
        terms: []
      }
      API.apiGroupcontrolManageStrategys(data).then(res => {
        if (res.resultCode === 0) {
          this.ManageStrategys = res.data.reverse()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取 tree
    getTreeList () {
      API.apiTreeList().then(res => {
        if (res.resultCode === 0) {
          this.controlGroupsTreeList = res.data.controlGroups

          this.treeList = Object.values(res.data.organizations).map(function (e) {
            return {
              id: e.id,
              name: e.name,
              type: e.type,
              parent_id: e.parent_id
            }
          })
          this.SchoolmamnagersId = localStorage.getItem('SchoolmamnagersId')
          if (!this.SchoolmamnagersId) {
            localStorage.setItem('SchoolmamnagersId', this.treeList[0].id)
            this.SchoolmamnagersId = localStorage.getItem('SchoolmamnagersId')
          }

          this.getSchoolmamnagersList(this.treeList[0].id)
          this.ZZname = this.treeList[0].name
          this.getOrganizationStudentsList(this.treeList[0].id)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击 受控组 tree
    organizationTreeChick (row) {
      this.clickIndex = row
      this.clickIndex1 = -1
      this.isActive = !this.isActive
      localStorage.setItem('groupMamnagerId', row.id)
      this.groupMamnagerId = localStorage.getItem('groupMamnagerId')
      // this.groupMamnagerId = row.id
      this.SKZisShowCard = true
      this.ZZisShowCard = false
      this.getGroupcontrolList(row.id)
      this.getGroupcontrolStudentsList(row.id)
      this.getGroupcontrolManageStrategy(row.id)
      this.QKZstytus = row.statue
      this.QKZname = row.name
    },

    // 点击 TREE 获取数据
    handleNodeClick (data) {
      this.clickIndex = -1
      this.clickIndex1 = data
      this.SchoolmamnagersId = data.id
      this.ZZisShowCard = true
      this.SKZisShowCard = false
      this.getSchoolmamnagersList(data.id)
      this.getOrganizationStudentsList(data.id)
      this.ZZname = data.name
    },
    // 新增
    addShow () {
      this.addDialogVisible = true
    },
    // 监听管理员手机号
    managerPhone (phone) {
      const data = {
        phone: phone
      }
      API.apiGroupcontrolManagerPhone(data).then(res => {
        if (res.resultCode === 0) {
          if (res.data !== null) {
            this.addForm.managerName = res.data.name
            this.addDisbled = true
          }
        } else {
          this.$message.error(res.resultInfo)
          this.addDisbled = false
        }
      })
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 新增确认
    addConfirm () {
      if (this.flowRadio === '受控组') {
        const data = {
          managerName: this.addForm.managerName,
          managerPhone: this.addForm.managerPhone,
          name: this.addForm.name,
          parentId: this.SchoolmamnagersId,
          pwd: this.addForm.pwd
        }
        API.apiGroupcontrolAdd(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('添加成功！')
            this.getTreeList()
            this.addDialogVisible = false
            this.getGroupcontrolList(this.groupMamnagerId)
            this.addDisbled = false
            // this.reload() // 刷新页面
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      } else {
        const data = {
          managerName: this.addForm.managerName,
          managerPhone: this.addForm.managerPhone,
          name: this.addForm.name,
          parentId: this.SchoolmamnagersId,
          pwd: this.addForm.pwd,
          type: this.addForm.type
        }
        API.apiOrganizationAdd(data).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('添加成功！')
            this.getTreeList()
            this.addDialogVisible = false
            this.$refs.addFormRef.resetFields()
            this.getSchoolmamnagersList(this.SchoolmamnagersId)
            // this.reload() // 刷新页面
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }
    },
    // 修改管理员信息
    managerModify (row) {
      this.modifyManagerDialogVisible = true
      this.modifyManagerForm.managerId = row.managerId
      this.modifyManagerForm.name = row.name
      this.modifyManagerForm.phone = row.phone
      this.modifyManagerForm.pwd = row.pwd
    },
    // 修改管理员确认
    modifyManagerConfirm () {
      const data = {
        managerId: this.modifyManagerForm.managerId,
        name: this.modifyManagerForm.name,
        phone: this.modifyManagerForm.phone,
        pwd: this.modifyManagerForm.pwd
      }
      API.apiManagerModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('修改成功！')
          this.getTreeList()
          this.modifyManagerDialogVisible = false
          this.$refs.modifyManagerFormRef.resetFields()
          this.getGroupcontrolList(this.groupMamnagerId)
          this.getSchoolmamnagersList(this.SchoolmamnagersId)
          this.reload() // 刷新页面
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    modifyManagerDialogClosed () {
      this.$refs.modifyManagerFormRef.resetFields()
    },
    // 删除管理员
    managerDel (id) {
      API.apiGroupcontrolManagerDel(id).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('删除成功')
          this.getGroupcontrolList(this.groupMamnagerId)
          this.getSchoolmamnagersList(this.SchoolmamnagersId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取受控组管理员信息
    getGroupcontrolList (id) {
      const groupId = id
      API.apiGroupcontrolList(groupId).then(res => {
        if (res.resultCode === 0) {
          this.controlledList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取组织管理员信息
    getSchoolmamnagersList (id) {
      const organizationId = id
      API.apiSchoolmamnagersList(organizationId).then(res => {
        if (res.resultCode === 0) {
          // this.organizationList = res.data
          this.organizationList = res.data
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 人员表格状态筛选
    filterTag (value, row) {
      return row.statue === value;
    },
    filterName (value, row) {
      return row.name === value;
    },
    // 获取组织学生信息
    getOrganizationStudentsList (id) {
      const queryForm = {
        organizationId: id
      }
      let params = Object.assign(
        this.ZZqueryInfo,
        queryForm
      );
      // 获取后台数据
      API.apiOrganizationStudentsList(params).then(res => {
        if (res.data !== null) {
          if (res.resultCode === 0) {
            this.personneList = res.data
            this.ZZnameList = Object.values(this.personneList).map(function (e) {
              return {
                text: e.name,
                value: e.name
              }
            })
            this.ZZtotal = res.rowNum
          } else {
            this.$message.error(res.resultInfo)
          }
        }

      })
    },
    // 监听 pagesize 改变的事件
    ZZhandleSizeChange (newSize) {
      this.ZZqueryInfo.pageSize = newSize
      this.getOrganizationStudentsList()
    },
    // 监听 页码值 改变的事件
    ZZhandleCurrentChange (newPage) {
      this.ZZqueryInfo.page = newPage - 1
      this.getOrganizationStudentsList()
    },
    // 修改管理员 状态
    deactivation (row, type) {
      const data = {
        managerId: row.managerId,
        status: type
      }
      API.apiManagerStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('状态修改成功')
          this.getGroupcontrolList(this.groupMamnagerId)
          this.getSchoolmamnagersList(this.SchoolmamnagersId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 获取受控组学生信息
    getGroupcontrolStudentsList (id) {
      const queryForm = {
        groupId: id,
        iccids: [],
        names: [],
        organizationIds: [],
        phones: [],
        terms: []
      }
      let params = Object.assign(
        this.ZZqueryInfo,
        queryForm
      );
      // 获取后台数据
      API.apiGroupcontrolStudentsList(params).then(res => {
        if (res.data !== null) {
          if (res.resultCode === 0) {
            this.SKpersonneList = res.data
            this.ZZnameList = Object.values(this.SKpersonneList).map(function (e) {
              return {
                text: e.name,
                value: e.name
              }
            })
            this.SKtotal = res.rowNum
          } else {
            this.$message.error(res.resultInfo)
          }
        }

      })
    },
    // 获取群控组策略
    getGroupcontrolManageStrategy (id) {
      API.apiGroupcontrolManageStrategy(id).then(res => {
        if (res.resultCode === 0) {
          this.ManageStrategyList = res.data
          this.SKtotal = res.rowNum
          this.ManageStrategy = this.ManageStrategyList.map(function (item) {
            return item.id
          })
          this.stragegyIdsOld = this.ManageStrategyList.map(function (item) {
            return item.id
          })
          // console.log(this.ManageStrategyList)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    SKhandleSizeChange (newSize) {
      this.SKqueryInfo.pageSize = newSize
      this.getOrganizationStudentsList()
    },
    // 监听 页码值 改变的事件
    SKhandleCurrentChange (newPage) {
      this.SKqueryInfo.page = newPage - 1
      this.getOrganizationStudentsList()
    },
    // 设置群控组策略
    styategySetChange (vId) {
      console.log(vId);
      if (this.stragegyIdsOld !== null) {
        const data = {
          groupId: this.SchoolmamnagersId,
          stragegyIds: this.stragegyIdsOld
        }
        API.apiControlgroupsStragegyDel(data).then(res => {
          if (res.resultCode === 0) {
            const data = {
              groupId: this.SchoolmamnagersId,
              stragegyIds: vId
            }
            this.getApiStragegyAdd(data)
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      } else {
        const data = {
          groupId: this.SchoolmamnagersId,
          stragegyIds: vId
        }
        console.log(data);
        console.log('aaaaaa');
        this.getApiStragegyAdd(data)
      }
    },
    getApiStragegyAdd (data) {
      API.apiControlgroupsStragegyAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('设置成功！')
          this.getGroupcontrolList(this.groupMamnagerId)
          this.getSchoolmamnagersList(this.SchoolmamnagersId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 设置群控组状态 生效/失效
    StatusModifyClick (type) {
      const data = {
        id: Number(this.SchoolmamnagersId),
        status: type
      }
      API.apiGroupcontrolManageStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('状态修改成功')
          this.getGroupcontrolStudentsList(this.groupMamnagerId)
          if (type === 1) {
            this.QKZstytus = 1
          } else {
            this.QKZstytus = 0
          }
          this.getTreeList()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 设置学生 受控不受控 状态
    SKdeactivation (row, type) {
      const data = {
        controlGroupId: this.SchoolmamnagersId,
        status: type,
        studentId: row.id
      }
      API.apiGroupcontrolStudentStatusModify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('状态修改成功')
          this.getGroupcontrolStudentsList(this.groupMamnagerId)
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听全选按钮
    handleSelectionChange (val) {
      this.multipleSelection = val;

      this.batchmodifyData.iccids = Object.values(val).map(function (e) {
        return e.iccid
      })
      this.batchmodifyData.names = Object.values(val).map(function (e) {
        return e.name
      })
      this.batchmodifyData.organizationIds = Object.values(val).map(function (e) {
        return e.id
      })
      this.batchmodifyData.phones = Object.values(val).map(function (e) {
        return e.phone
      })
      this.batchmodifyData.terms = Object.values(val).map(function (e) {
        return e.term
      })

      // this.batchmodifyData.status = Object.values(val).map(function (e) {
      //   return e.statue
      // })
      // this.batchNum = this.multipleSelection.length
      this.selectListNumber = this.multipleSelection.length
    },
    editSelected () {
      this.batchmodifyDialogVisible = true
      const data = {
        groupId: this.SchoolmamnagersId,
        iccids: this.batchmodifyData.iccids,
        names: this.batchmodifyData.names,
        organizationIds: this.batchmodifyData.organizationIds,
        phones: this.batchmodifyData.phones,
        status: this.batchmodifyData.status,
        terms: this.batchmodifyData.terms
      }
    },
    batchmodifyDialogClosed () {
      this.$refs.batchmodifyDataRef.resetFields()
    },
    // 批量设置学生 受控不受控 状态
    batchmodifyConfirm () {
      const data = {
        groupId: this.SchoolmamnagersId,
        iccids: this.batchmodifyData.iccids,
        names: this.batchmodifyData.names,
        organizationIds: this.batchmodifyData.organizationIds,
        phones: this.batchmodifyData.phones,
        status: this.batchmodifyData.status
        // terms: this.batchmodifyData.terms
      }
      console.log(data);
      API.apiGroupcontrolStudentStatusBatchmodify(data).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('状态修改成功')
          this.batchmodifyDialogVisible = false
          this.getGroupcontrolStudentsList(this.groupMamnagerId)
        } else {
          this.$message.error(res.resultInfo)
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
.selectBox {
  display: flex;
}
.selectInput {
  flex: 1;
}
.selectButton {
  margin-left: 10px;
}
.el-table .cell.el-tooltip {
  white-space: pre-line;
  min-width: 50px;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  /* align-items: center; */
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  flex-direction: column;
  height: auto;
  margin: 10px;
}
.organizationTree {
  /* margin-left: 10px; */
  line-height: 30px;
  color: #606266;
}
.organizationTree:hover {
  color: #606266;
}
.button_content {
  display: flex;
}
.searchInput {
  margin-left: 15px;
}
.searchBox {
  /* position: absolute;
  top: 0;
  left: 0;
  transform-origin: center bottom;
  z-index: 99999;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-sizing: border-box;
  margin: 2px 0; */
}
/deep/.el-card__body {
  margin: 0;
  padding: 0;
}

.heardStype {
  background: #e5e5e5;
  padding: 15px;
}
.zz_icon {
  /* display: inline-block; */
  background: #e6a23c;
  padding: 3px;
  color: #fff;
  border-radius: 4px;
  font-size: 10px;
}
.k_icon {
  /* display: inline-block; */
  background: #f56c6c;
  padding: 3px;
  color: #fff;
  border-radius: 4px;
  font-size: 10px;
}
.k_icon1 {
  background: #909399;
  padding: 3px;
  color: #fff;
  border-radius: 4px;
  font-size: 10px;
}
.svitchBox {
  height: 40px;
  display: flex;
  align-items: center;
}
.SKZListItemIcon {
  width: 36px;
  height: 21px;
  margin-right: 2px;
}
.SKZListItemStutasName {
  width: 50px;
  line-height: 40px;
  font-size: 18px;
}
.active {
  background: #79bbff;
  height: 30px;
  margin-bottom: 1px;
  border-radius: 4px;
  color: #fff;
  padding: 2px 5px;
}
.styategyTitle {
  width: 70px;
  line-height: 40px;
}
</style>
