<template>
  <!-- 渠道列表 2020-06月 刘珍利  -->
  <div class="box_subject">
    <el-row :gutter="20">
      <el-col :span="6">
        <channelTree ref="channerTreeRef" @channelChick="channelChick" @getChannelId="getChannelId" style="max-height:680px;overflow: auto"></channelTree>
      </el-col>
      <el-col :span="18">
        <el-card>
          <!-- 查询区域 -->
          <el-form :inline="true" ref="queryChannelRef" :model="queryChannelForm">
            <el-form-item label="渠道名称" class="queryFormItem">
              <el-input class="queryFormInput" v-model="queryChannelForm.channelName" placeholder="请输入渠道名称"></el-input>
            </el-form-item>
            <el-form-item label="渠道编码" class="queryFormItem">
              <el-input class="queryFormInput" v-model="queryChannelForm.channelId" placeholder="请输入渠道编码"></el-input>
            </el-form-item>
            <el-form-item label="管理员姓名" class="queryFormItem">
              <el-input class="queryFormInput" v-model="queryChannelForm.manager" placeholder="请输入管理员姓名"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" class="queryFormItem">
              <el-date-picker v-model="queryChannelForm.startDate" style="width:135px" type="date" placeholder="开始日期">
              </el-date-picker>
              <span class="time-line">-</span>
              <el-date-picker v-model="queryChannelForm.endDate" style="width:135px" type="date" placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item class="queryFormItem">
              <el-button type="primary" size="mini" icon="el-icon-search" @click="queryChannelButton">查询</el-button>
            </el-form-item>
          </el-form>
          <!-- 按钮区域 -->
          <div class="button_content">
            <el-button size="medium" type="primary" icon="el-icon-plus" @click="addChannelShow">添加</el-button>
          </div>
          <!-- table表格区域 -->
          <el-table v-loading="loading" :data="channelList" border max-height="510" align="center" :cell-style="{height: '38px',padding:0}">
            <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false" :show-overflow-tooltip='true'>
              <template slot-scope="scope">
                <div v-if="p.prop == 'usingInDeviceCL'">
                  <span v-if="scope.row.usingInDevice == 0">否</span>
                  <span v-else>是</span>
                </div>
                <div v-if="p.prop == 'usingInXuebakaCL'">
                  <span v-if="scope.row.usingInXuebaka == 0">否</span>
                  <span v-else>是</span>
                </div>
                <div v-if="p.prop == 'statusCL'">
                  <span v-if="scope.row.status === 1"> 启用</span>
                  <span v-else-if="scope.row.status === 0">停用</span>
                </div>
                <div v-if="p.prop == 'twoCodeUrlCL'">
                  <el-popover placement="top-start" width="150" trigger="hover">
                    <div class="hoverQrcodeBox">
                      <img :src="ChannelsQrcode" width="150" height="150">
                      <p class="hoverQrcodeBoxNo">{{scope.row.channelNo}}</p>
                    </div>
                    <el-button size="mini" slot="reference">预览</el-button>
                  </el-popover>
                  <el-button size="mini" @click="ChannelsQrcodeAdd(scope.row.channelId)" style="margin-left:10px">生成</el-button>
                  <!-- <el-button size="mini" @click="ChannelsQrcodeAdd(scope.row.channelId)">下载</el-button> -->
                </div>
                <div v-if="p.prop == 'parentChannelCL'">
                  {{parentChannnelName}}
                </div>
                <div v-if="p.prop == 'operation'">
                  <el-button size="mini" @click="channelEdit(scope.row)">编辑</el-button>
                  <el-button size="mini" @click="channelDetail(scope.$index, scope.row)">详情</el-button>
                  <div class="list-button" v-if="scope.row.status == 1">
                    <el-button size="mini" type="danger" plain @click="deactivation(scope.row, 0)">停用</el-button>
                  </div>
                  <div class="list-button" v-else>
                    <el-button size="mini" type="warning" plain @click="deactivation(scope.row,1)">启用</el-button>
                  </div>
                </div>
                <div v-else>
                  <div v-html="scope.row[p.prop]" />
                </div>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页区域 -->
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>
      </el-col>
    </el-row>

    <!-- 新增/编辑的对话框 -->
    <el-dialog :title="dialogTitle" :visible.sync="addDialogVisible" width="430px" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form ref="addChannelRef" :model="addChannelForm" :rules="addChannelRules" label-width="120px">
        <el-form-item label="渠道名称" prop="channelName">
          <el-input size="small" v-model="addChannelForm.channelName" placeholder="请输入渠道名称"></el-input>
        </el-form-item>
        <el-form-item label="父渠道" prop="parentChannelId">
          <SelectTree :props="props" :options="optionData" :value="addChannelForm.parentChannelId" :clearable="isClearable" :accordion="isAccordion" @getValue="getValue($event)" height="200" style="width:100%">
          </SelectTree>
        </el-form-item>
        <el-form-item label="管理员手机号" prop="managerPhone">
          <el-input size="small" v-model="addChannelForm.managerPhone" placeholder="请输入管理员手机号"></el-input>
        </el-form-item>
        <el-form-item label="管理员姓名" prop="manager">
          <el-input size="small" v-model="addChannelForm.manager" placeholder="请输入管理员姓名"></el-input>
        </el-form-item>
        <el-form-item label="学霸卡渠道" prop="usingInXuebaka" v-show="isUsingIn">
          <el-select size="small" style="width:100%;" v-model="addChannelForm.usingInXuebaka" placeholder="请选择是否为学霸卡渠道" @change="usingInXuebakaChange">
            <el-option v-for="item in usingInXuebakaOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备渠道" prop="usingInDevice" v-show="isUsingIn">
          <el-select size="small" style="width:100%;" v-model="addChannelForm.usingInDevice" placeholder="请选择是否为设备渠道" @change="usingInDeviceChange">
            <el-option v-for="item in usingInDeviceOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分配带参数的永久二维码" label-width="200">
          <el-switch v-model="addChannelForm.twoCodeEnable" active-color="#13ce66" inactive-color="#eee">
          </el-switch>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeButton">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import channelTree from "./../channelTree"
import SelectTree from './../treeSelect'
import API from 'api/channels'
export default {
  name: 'channelList',
  components: {
    channelTree,
    SelectTree
  },
  data () {
    return {
      // 渠道管理列表
      channelList: [],
      parentChannnelName: '',
      page: 1,
      pageSize: 10,
      total: 0,
      // 表格 label 字段名称
      table_column: [
        { prop: 'channelNo', label: '渠道编号', width: 110, fixed: "left" },
        { prop: 'channelName', label: '渠道名称', width: 200 },
        { prop: 'usingInXuebakaCL', label: '学霸卡渠道', width: 100 },
        { prop: 'usingInDeviceCL', label: '设备渠道', width: 100 },
        { prop: 'parentChannelCL', label: '父渠道', width: 100 },
        { prop: 'manager', label: '管理员姓名', width: 100 },
        { prop: 'managerPhone', label: '管理员手机号码', width: 140 },
        { prop: 'twoCodeUrlCL', label: '带参数的永久二维码', width: 220 },
        { prop: '', label: '微信公众号', width: 150 },
        { prop: 'date', label: '创建时间', width: 150 },
        { prop: 'statusCL', label: '状态', width: 80 },
        { prop: 'operation', label: "操作", width: 220, fixed: "right" }
      ],
      queryChannelForm: {
        channelId: null,
        channelName: null,
        endDate: null,
        manager: null,
        startDate: null,
        page: 0,
        pageSize: 10
      },
      ChannelsQrcode: '',
      addDialogVisible: false,
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
  },
  methods: {
    channelChick (channel) {
      console.log(channel);
      if (!channel) return
      this.parentChannnelName = channel.channelName
      const channelNew = localStorage.getItem('channelId')
      if (channelNew === '' || channelNew === null) {
        localStorage.setItem('channelId', channel.channelId)
        this.addChannelForm.parentChannelId = Number(localStorage.getItem('channelId'))
        this.getChannelList(localStorage.getItem('channelId'))
      }
    },
    // 点击 tree 从子组件 获取 对应的 渠道id
    getChannelId (channelsID, channelName) {
      this.parentChannnelName = channelName
      // this.addChannelForm.parentChannelId = channelsID
      localStorage.setItem('channelId', channelsID)
      this.addChannelForm.parentChannelId = Number(localStorage.getItem('channelId'))
      this.getChannelList(localStorage.getItem('channelId'))
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
