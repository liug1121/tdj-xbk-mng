<template>
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form ref="queryEquipmentRef" :inline="true" :model="queryEquipmentForm">
        <el-form-item label="设备SN" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryEquipmentForm.sn" clearable placeholder="请输入设备SN" style="width:230px"></el-input>
        </el-form-item>
        <el-form-item label="设备类型" class="queryFormItem">
          <el-input class="queryFormInput" v-model.number="queryEquipmentForm.deviceType" clearable placeholder="请输入设备型号" style="width:150px"></el-input>
        </el-form-item>
        <el-form-item label="IMEI" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryEquipmentForm.imei" clearable placeholder="请输入IMEI" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="MAC" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryEquipmentForm.mac" clearable placeholder="请输入MAC" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="IMSI" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryEquipmentForm.imsi" clearable placeholder="请输入IMSI" style="width:210px"></el-input>
        </el-form-item>
        <el-form-item label="最终用户联系方式" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryEquipmentForm.contactPhone" clearable placeholder="请输入最终用户联系方式" style="width:140px"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <channelSelect style="width:150px !important" @channelSelectName="channelSelectName"></channelSelect>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryEquipment">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <div class="button_content">
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>机卡锁定</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="StatusModify(0)">机卡锁定</el-button>
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>机卡解锁</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="StatusModify(1)">机卡解锁</el-button>
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>锁小区</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="StatusModify(2)">锁小区</el-button>
        <el-button v-if="selectListNumber !==1" size="medium" type="primary" icon="el-icon-edit" disabled>解锁小区</el-button>
        <el-button v-else size="medium" type="primary" icon="el-icon-edit" @click="StatusModify(3)">解锁小区</el-button>
        <!-- managerType 超强管理员 -->
        <el-button v-if="managerType === '0'" size="medium" type="primary" icon="el-icon-refresh" @click="refreshAll">刷新全部设备</el-button>
      </div>
      <!-- 列表区域 -->
      <!-- 选中 -->
      <div class="cardNos">
        <div class="cardNosList">
          <ul>
            <!-- <li v-fo r="(item,index) in cardNos" :key="index">{{item}}</li> -->
          </ul>
        </div>
        <div class="cardNosNumber">选中<span class="red">{{selectListNumber}}</span>条数据</div>
      </div>
      <el-table v-loading="loading" :data="EquipmentList" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" fixed="left">
        </el-table-column>
        <el-table-column label="序号" prop="id" width="100">
        </el-table-column>
        <el-table-column label="设备SN" prop="sn" width="180">
        </el-table-column>
        <el-table-column label="设备类型" prop="deviceType" width="100">
        </el-table-column>
        <el-table-column label="IMEI" prop="imei" width="180">
        </el-table-column>
        <el-table-column label="MAC" prop="mac" width="180">
        </el-table-column>
        <el-table-column label="IMSI" prop="imsi" width="180">
        </el-table-column>
        <el-table-column prop="cardPhone" width="120">
          <template slot="header">
            <div class="table-hearder-title">手机号</div>
          </template>
        </el-table-column>
        <el-table-column prop="cardPhone" width="120">
          <template slot="header">
            <div class="table-hearder-title">是否受控</div>
          </template>
          <template slot-scope="scope">
            <span v-if="scope.row.controlType ===0">不受控</span>
            <span v-else>受控</span>
          </template>
        </el-table-column>
        <el-table-column label="ICCID" prop="cardIccid" width="180">
        </el-table-column>
        <el-table-column label="卡PIN码" prop="cardPin" width="100">
        </el-table-column>
        <el-table-column prop="cardPuk" width="120">
          <template slot="header">
            <div class="table-hearder-title">卡PUK</div>
          </template>
        </el-table-column>
        <el-table-column prop="cardPackageName" width="240">
          <template slot="header">
            <div class="table-hearder-title">商品</div>
          </template>
          <template slot-scope="scope">
            <el-popover placement="top-start" width="200" trigger="hover">
              <div>
                {{scope.row.cardPackageName}}
                <!-- 商品内容：合约期2年，每月58元，每月200G白名单小区流量+S30C-A CPE -->
              </div>
              <div slot="reference">{{scope.row.cardPackageName}}</div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="channelName" width="120">
          <template slot="header">
            <div class="table-hearder-title">渠道</div>
          </template>
        </el-table-column>
        <el-table-column prop="contactName" width="150">
          <template slot="header">
            <div class="table-hearder-title">最终用户联系姓名</div>
          </template>
        </el-table-column>
        <el-table-column prop="contactPhone" width="140">
          <template slot="header">
            <div class="table-hearder-title">最终用户联系方式</div>
          </template>
        </el-table-column>
        <el-table-column prop="activeDateTime" width="160">
          <template slot="header">
            <div class="table-hearder-title">卡激活时间</div>
          </template>
        </el-table-column>
        <el-table-column label="基站/小区" prop="" width="120">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.baseStationNo" :key="index">
              <div @click="baseStationNoClick(scope.row)">{{item}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="当前基站/小区" prop="ci" width="120">
        </el-table-column>
        <el-table-column label="设备IP地址" prop="ip" width="120">
        </el-table-column>
        <el-table-column label="运营商网络信号参数" prop="" width="160">
          <template slot-scope="scope">
            <div v-for="(item,index) in scope.row.netSignal" :key="index">
              <div>{{item}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="ROM版本" prop="rom" width="90">
        </el-table-column>
        <el-table-column label="设备状态" prop="" width="80">
          <template slot-scope="scope">
            <div v-if="scope.row.status === 0">离线</div>
            <div v-if="scope.row.status === 1">上线</div>
          </template>
        </el-table-column>
        <el-table-column label="锁卡状态" prop="" width="100">
          <template slot-scope="scope">
            <div v-if="scope.row.cardLockedStatus === 1">机卡锁定</div>
            <div v-if="scope.row.cardLockedStatus === 0">机卡解锁</div>
            <div v-if="scope.row.stationLockedStatus === 1">小区锁定</div>
            <div v-if="scope.row.stationLockedStatus === 0">小区解锁</div>
          </template>
        </el-table-column>
        <el-table-column label="上报时间" prop="uploadDateTime" width="160">
        </el-table-column>
        <el-table-column label="操作" prop="" width="220" fixed="right">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" plain @click="deviceModify(scope.row)">编辑</el-button>
            <el-button type="success" size="mini" plain @click="rebootClick(scope.row)">重启</el-button>
            <el-button type="danger" size="mini" plain @click="refreshClick(scope.row)">刷新</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
    <!-- 设置编辑 -->
    <el-dialog title="设置编辑" :visible.sync="equipmentDialog" width="430px" @close="equipmentDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="equipmentForm" ref="equipmentFormRef" label-width="90px">
        <el-form-item label="手机号">
          <el-input style="width:300px;" size="small" v-model="equipmentForm.cardPhone" placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item label="卡PUK">
          <el-input style="width:300px;" size="small" v-model="equipmentForm.puk" placeholder="请输入卡PUK"></el-input>
        </el-form-item>
        <el-form-item label="渠道">
          <channelSelect style="width:300px !important" @channelSelectId="EditchannelSelectId"></channelSelect>
        </el-form-item>
        <el-form-item label="商品">
          <el-select v-model="equipmentForm.packageId" size="small" clearable filterable placeholder="请输入渠道商品关键词" style="width:300px">
            <el-option v-for="item in goodsListOptions" :key="item.id" :label="item.packageName" :value="item.packageId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="最终用户联系姓名" class="itemlabel">
          <el-input style="width:300px;" size="small" v-model="equipmentForm.contactName" placeholder="请输入最终用户联系姓名"></el-input>
        </el-form-item>
        <el-form-item label="最终用户联系方式" class="itemlabel">
          <el-input style="width:300px;" size="small" v-model="equipmentForm.contactPhone" placeholder="请输入最终用户联系方式"></el-input>
        </el-form-item>
        <el-form-item label="卡激活时间">
          <el-date-picker style="width:300px" size="small" v-model="equipmentForm.activeDateTime" type="date" placeholder="卡激活时间" value-format="yyyy-MM-dd hh:mm:ss">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="受控状态">
          <el-radio-group v-model="equipmentForm.controlType">
            <el-radio label="1">是</el-radio>
            <el-radio label="2">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="equipmentDialogClosed">取 消</el-button>
        <el-button type="primary" @click="equipmentConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 机卡锁定/机卡解锁/锁基站/基站解锁 -->
    <el-dialog :title="StatusModifyTitle" :visible.sync="StatusModifyDialog" width="430px" @close="StatusModifyDialogClosed">
      <!-- 内容主体区域 -->
      <el-form :model="StatusModifyForm" ref="StatusModifyFormRef" label-width="90px">
        <el-form-item label="设备sn">
          <el-input style="width:300px;" v-model="StatusModifyForm.sn" placeholder="请输入设备sn" disabled></el-input>
        </el-form-item>
        <el-form-item label="说明">
          <el-input style="width:300px;" v-model="StatusModifyForm.description" placeholder="请输入说明"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="StatusModifyDialogClosed">取 消</el-button>
        <el-button type="primary" @click="StatusModifyConfirm">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="当前基站" :visible.sync="baseStationDialog" width="800px" @close="baseStationDialogClosed">
      <!-- 内容主体区域 -->
      <el-table v-loading="loading" :data="DeviceBasestations" border max-height="600" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column prop="id" label="序号" width="">
        </el-table-column>
        <el-table-column prop="" label="上报时间" width="160">
        </el-table-column>
        <el-table-column prop="isWhite" label="是否是白名单用户" width="">
          <template slot-scope="scope">
            <div v-if="scope.row.isWhite === 0">否</div>
            <div v-if="scope.row.isWhite === 1">是</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="站名" width="">
        </el-table-column>
        <el-table-column prop="no" label="小区号" width="">
        </el-table-column>
        <el-table-column prop="tac" label="TAC" width="">
        </el-table-column>
        <el-table-column prop="type" label="类型" width="">
        </el-table-column>
        <el-table-column prop="city" label="城市" width="">
        </el-table-column>
      </el-table>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="baseStationDialogClosed">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import API from 'api/equipment'
import channelSelect from './channelSelect'
export default {
  data () {
    return {
      // 卡信息列表
      EquipmentList: [],
      page: 1,
      pageSize: 10,
      total: 0,
      selectListNumber: 0,
      // 列表，标题、字段
      table_column: [
        { prop: 'id', label: '序号', width: 100 },
        { prop: 'sn', label: '设备SN', width: 100 },
        { prop: 'deviceType', label: '设备类型', width: 100 },
        { prop: 'imei', label: 'IMEI', width: 180 },
        { prop: 'mac', label: 'MAC', width: 240 },
        { prop: 'imsi', label: 'IMSI', width: 120 },
        { prop: 'cardPhone', label: '手机号', width: 150 },
        { prop: 'cardIccid', label: 'ICCID', width: 180 },
        { prop: 'cardPin', label: '卡PIN码', width: 100 },
        { prop: 'cardPuk', label: '卡PUK', width: 120 },
        { prop: 'cardPackageName', label: '商品', width: 240 },
        { prop: 'channelName', label: '渠道', width: 120 },
        { prop: 'contactName', label: '最终用户联系姓名', width: 150 },
        { prop: 'contactPhone', label: '最终用户联系方式', width: 140 },
        { prop: 'activeDateTime', label: '卡激活时间', width: 160 },
        { prop: 'baseStationNoCL', label: '基站/小区', width: 120 }, // 需要处理
        { prop: 'ip', label: '设备IP地址', width: 240 },
        { prop: 'netSignalCL', label: '运营商网络信号参数', width: 120 }, // 需要处理
        { prop: 'rom', label: 'ROM版本', width: 150 },
        { prop: 'statusCL', label: '设备状态', width: 100 },
        { prop: 'LockedCL', label: '锁卡状态', width: 100 },
        { prop: 'uploadDateTime', label: '上报时间', width: 160 },
        { prop: 'operation', label: '操作', width: 220, fixed: 'right' }
      ],
      loading: false,
      queryEquipmentForm: {
        channelName: null,
        contactPhone: null,
        deviceType: null,
        imei: null,
        imsi: null,
        mac: null,
        sn: null,
        page: 0,
        pageSize: 10
      },
      equipmentDialog: false,
      equipmentForm: {
        activeDateTime: null,
        cardPhone: null,
        channelId: null,
        contactName: null,
        contactPhone: null,
        deviceId: null,
        packageId: null,
        puk: null,
        controlType: '1'
      },
      StatusModifyDialog: false,
      StatusModifyForm: {
        description: null,
        sn: null,
        type: null
      },
      // 查询 套餐列表
      goodsListOptions: [],
      sn: [],
      StatusModifyTitle: '机卡锁定',
      baseStationDialog: false,
      DeviceBasestations: [],
      managerType: null
    };
  },
  components: {
    channelSelect
  },
  mounted () {
    this.getEquipmentlist(),
      this.managerType = window.sessionStorage.getItem('managerType')
  },
  methods: {
    // 获取渠道的值 来自 子组件
    channelSelectId (channelSelectId) {
      this.queryEquipmentForm.channelId = channelSelectId
    },
    channelSelectName ($name) {
      this.queryEquipmentForm.channelName = $name
    },
    EditchannelSelectId (channelSelectId) {
      this.equipmentForm.channelId = channelSelectId
      this.getPorductsListOptions(channelSelectId)
    },
    //获取 列表
    getEquipmentlist () {
      const params = this.queryEquipmentForm
      this.loading = true
      API.apiDevicesList(params).then(res => {
        if (res.resultCode === 0) {
          this.EquipmentList = res.data
          this.total = res.rowNum
          console.log(this.EquipmentList);
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryEquipmentForm.pageSize = newSize
      this.getEquipmentlist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryEquipmentForm.page = newPage - 1
      this.getEquipmentlist()
    },
    // 查询按钮
    queryEquipment () {
      if (this.queryEquipmentForm.channelName === '') {
        this.queryEquipmentForm.channelName = null
      }
      if (this.queryEquipmentForm.contactPhone === '') {
        this.queryEquipmentForm.contactPhone = null
      }
      if (this.queryEquipmentForm.deviceType === '') {
        this.queryEquipmentForm.deviceType = null
      }
      if (this.queryEquipmentForm.imei === '') {
        this.queryEquipmentForm.imei = null
      }
      if (this.queryEquipmentForm.imsi === '') {
        this.queryEquipmentForm.imsi = null
      }
      if (this.queryEquipmentForm.mac === '') {
        this.queryEquipmentForm.mac = null
      }
      if (this.queryEquipmentForm.sn === '') {
        this.queryEquipmentForm.sn = null
      }
      this.getEquipmentlist()
    },
    // 点击 基站/小区
    baseStationNoClick (row) {
      this.baseStationDialog = true
      const data = {
        page: 0,
        pageSize: 10,
        sn: row.sn
      }
      API.apiDeviceBasestations(data).then(res => {
        if (res.resultCode === 0) {
          this.DeviceBasestations = res.data
          console.log(this.DeviceBasestations);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 当前基站 模态框 关闭
    baseStationDialogClosed () {
      this.baseStationDialog = false
    },
    // 监听全选按钮
    handleSelectionChange (val) {
      this.selectListNumber = val.length
      this.sn = Object.values(val).map(function (e) {
        return e.sn
      })
    },
    // 根据渠道获取商品列表
    getPorductsListOptions (channelSelectId) {
      const data = {
        page: 0,
        pageSize: 1000,
        channelId: channelSelectId
      }
      API.apichannelsPackagesList(data).then(res => {
        if (res.resultCode === 0) {
          this.goodsListOptions = res.data
          console.log(this.goodsListOptions);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击 编辑
    deviceModify (row) {
      this.equipmentDialog = true
      this.equipmentForm.activeDateTime = row.activeDateTime
      this.equipmentForm.cardPhone = row.cardPhone
      this.equipmentForm.channelId = null
      this.equipmentForm.contactName = row.contactName
      this.equipmentForm.contactPhone = row.contactPhone
      this.equipmentForm.deviceId = row.id
      this.equipmentForm.packageId = null
      this.equipmentForm.puk = row.cardPuk,
        this.equipmentForm.controlType = String(row.controlType)
    },
    // 编辑 模态框 取消/关闭 按钮
    equipmentDialogClosed () {
      this.equipmentDialog = false
      this.equipmentForm.activeDateTime = null
      this.equipmentForm.cardPhone = null
      this.equipmentForm.channelId = null
      this.equipmentForm.contactName = null
      this.equipmentForm.contactPhone = null
      this.equipmentForm.deviceId = null
      this.equipmentForm.packageId = null
      this.equipmentForm.puk = null
      this.equipmentForm.controlType = '1'
    },
    // 编辑 模态框 确认按钮
    equipmentConfirm () {
      const data = {
        activeDateTime: this.equipmentForm.activeDateTime,
        cardPhone: this.equipmentForm.cardPhone,
        channelId: this.equipmentForm.channelId,
        contactName: this.equipmentForm.contactName,
        contactPhone: this.equipmentForm.contactPhone,
        deviceId: this.equipmentForm.deviceId,
        packageId: this.equipmentForm.packageId,
        puk: this.equipmentForm.puk,
        controlType: Number(this.equipmentForm.controlType)
      }
      API.apiDeviceModify(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功修改设备！')
          this.getEquipmentlist()
          this.equipmentDialogClosed()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击 机卡锁定、机卡解锁、锁小区、解锁小区 按钮
    StatusModify (status) {
      this.StatusModifyDialog = true
      this.StatusModifyForm.type = status
      this.StatusModifyForm.sn = this.sn[0]
      if (status === 0) {
        this.StatusModifyTitle = '机卡锁定'
      } else if (status === 1) {
        this.StatusModifyTitle = '机卡解锁'
      } else if (status === 2) {
        this.StatusModifyTitle = '锁小区'
      } else {
        this.StatusModifyTitle = '解锁小区'
      }
    },
    // 修改状态 模态框 取消按钮
    StatusModifyDialogClosed () {
      this.StatusModifyDialog = false
      this.StatusModifyForm.description = null
      this.StatusModifyForm.sn = null
      this.StatusModifyForm.type = null
    },
    // 修改状态 模态框 确认按钮
    StatusModifyConfirm () {
      const data = {
        description: this.StatusModifyForm.description,
        sn: this.StatusModifyForm.sn,
        type: this.StatusModifyForm.type
      }
      API.apiDeviceStatusModify(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功更改状态！')
          this.getEquipmentlist()
          this.StatusModifyDialogClosed()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 重启设备
    rebootClick (row) {
      const data = {
        sn: row.sn
      }
      API.apiDeviceReboot(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('成功重启！')
          this.getEquipmentlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 刷新设备
    refreshClick (row) {
      const data = {
        sn: row.sn
      }
      API.apiDeviceRefresh(JSON.stringify(data)).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('刷新成功！')
          this.getEquipmentlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 刷新全部设备
    refreshAll () {
      API.apiDeviceRefreshall().then(res => {
        if (res.resultCode === 0) {
          this.$message.success('刷新成功！')
          this.getEquipmentlist()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    }
  }
}

</script>
