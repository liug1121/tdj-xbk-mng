<template>
  <!-- LBS记录 刘珍利  -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 查询区域 -->
      <el-form :inline="true" ref="queryLBSlistFormRef" :model="queryLBSlistFormModel">
        <el-form-item label="ICCID" class="queryFormItem">
          <el-input class="queryFormInput" v-model="queryLBSlistFormModel.iccid" clearable placeholder="请输入ICCID" style="width:202px"></el-input>
        </el-form-item>
        <el-form-item label="渠道" class="queryFormItem">
          <channelSelect style="width:120px !important" @channelSelectId="channelSelectId"></channelSelect>
        </el-form-item>
        <el-form-item label="创建时间" class="queryFormItem">
          <el-date-picker style="width:140px" v-model="queryLBSlistFormModel.startTime" type="date" placeholder="开始日期" value-format="yyyy-MM-dd" @change="startTimeChange">
          </el-date-picker>
          <span class="time-line">-</span>
          <el-date-picker style="width:140px" v-model="queryLBSlistFormModel.endTime" type="date" placeholder="结束日期" value-format="yyyy-MM-dd" @change="endTimeChange">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="省份" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryLBSlistFormModel.provinceId" clearable filterable placeholder="请选择省份" @change="provinceChange">
            <el-option v-for="item in provinceOptions" :key="item.provinceId" :label="item.provinceName" :value="item.provinceId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" class="queryFormItem">
          <el-select class="queryFormInput" v-model="queryLBSlistFormModel.cityId" clearable filterable placeholder="请选择城市名">
            <el-option v-for="item in PoisCitiesList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="queryFormItem">
          <el-button type="primary" size="mini" icon="el-icon-search" @click="queryLBSbutton">查询</el-button>
          <el-button type="primary" size="mini" icon="el-icon-download" @click="exportButton()">导出</el-button>
        </el-form-item>
      </el-form>
      <!-- 按钮区域 -->
      <!-- <div class="button_content">
        <el-button size="medium" type="primary" icon="el-icon-download">导出</el-button>
      </div> -->
      <!-- 卡库存 List 区域 -->
      <el-table v-loading="loading" :data="LBSlist" border max-height="510px" align="center" :cell-style="{height: '38px',padding:0}">
        <el-table-column v-for="(p, key) in table_column" :prop="p.prop" :label="p.label" :width="p.width" :key="key" align="center" :fixed="p.fixed?p.fixed:false">
        </el-table-column>
      </el-table>
      <!-- 分页 区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-sizes="[10,20,30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import API from 'api/dataMoniting'
import channelSelect from './../../sale/channelSelect'
export default {
  components: {
    channelSelect
  },
  data () {
    return {
      // 列表显示
      LBSlist: [],
      page: 1,
      pageSize: 10,
      // 列表总条数
      total: 0,
      loading: false,
      // 表格
      table_column: [
        { prop: 'channelName', label: '渠道', width: 180, fixed: 'left' },
        { prop: 'iccid', label: 'ICCID', width: 180 },
        { prop: 'provinceName', label: '省份', width: 100 },
        { prop: 'cityName', label: '城市', width: 100 },
        { prop: 'address', label: '详细地址' },
        { prop: 'lbsTime', label: '定位时间', width: 180 }
      ],
      // 省份
      provinceOptions: [],
      PoisCitiesList: [],
      // 查询表字段
      queryLBSlistFormModel: {
        channelId: null,
        cityId: null,
        endTime: null,
        iccid: null,
        provinceId: null,
        startTime: null,
        page: 0,
        pageSize: 10
      },
      excelName: 'LBS记录'
    };
  },
  mounted () {
    this.getLBSlist()
    this.getprovinceOptions()
  },
  methods: {
    // 渠道
    channelSelectId (channelSelectId) {
      this.queryLBSlistFormModel.channelId = channelSelectId
      // console.log(channelSelectId);
    },
    //获取分页列表
    getLBSlist () {
      let params = this.queryLBSlistFormModel
      this.loading = true
      // 获取后台数据
      API.apiLbsDetails(params).then(res => {
        if (res.resultCode === 0) {
          this.LBSlist = res.data
          console.log(this.LBSlist);
          this.total = res.rowNum
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 pagesize 改变的事件
    handleSizeChange (newSize) {
      this.queryLBSlistFormModel.pageSize = newSize
      this.getLBSlist()
    },
    // 监听 页码值 改变的事件
    handleCurrentChange (newPage) {
      this.queryLBSlistFormModel.page = newPage - 1
      this.getLBSlist()
    },
    startTimeChange () {
      this.queryLBSlistFormModel.startTime = `${this.queryLBSlistFormModel.startTime} 00:00:00`
      console.log(this.queryLBSlistFormModel.startTime)
    },
    endTimeChange () {
      this.queryLBSlistFormModel.endTime = `${this.queryLBSlistFormModel.endTime} 23:59:59`
      console.log(this.queryLBSlistFormModel.endTime)
    },
    queryLBSbutton () {
      if (this.queryLBSlistFormModel.channelId === '') {
        this.queryLBSlistFormModel.channelId = null
      }
      if (this.queryLBSlistFormModel.cityId === '') {
        this.queryLBSlistFormModel.cityId = null
      }
      if (this.queryLBSlistFormModel.endTime === '') {
        this.queryLBSlistFormModel.endTime = null
      }
      if (this.queryLBSlistFormModel.iccid === '') {
        this.queryLBSlistFormModel.iccid = null
      }
      if (this.queryLBSlistFormModel.provinceId === '') {
        this.queryLBSlistFormModel.provinceId = null
      }
      if (this.queryLBSlistFormModel.startTime === '') {
        this.queryLBSlistFormModel.startTime = null
      }
      this.getLBSlist()
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
    // 监听省份id
    provinceChange (vId) {
      let obj = {};
      obj = this.provinceOptions.find((item) => { // 这里的userList就是上面遍历的数据源
        return item.provinceId === vId; // 筛选出匹配数据
      });
      // console.log(obj.provinceId);
      // console.log(obj.provinceName); // 这边的name就是对应label
      this.getPoisCitiesList(obj.provinceId)
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
    // null 转 ''
    praseStrEmpty (str) {
      if (typeof str === 'undefined' || str === null) {
        return '';
      }
      return str;
    },
    // 导出确认按钮
    exportButton () {
      const data = {
        iccid: this.praseStrEmpty(this.queryLBSlistFormModel.iccid),
        channelId: this.praseStrEmpty(this.queryLBSlistFormModel.channelId),
        startTime: this.praseStrEmpty(this.queryLBSlistFormModel.startTime),
        endTime: this.praseStrEmpty(this.queryLBSlistFormModel.endTime),
        provinceId: this.praseStrEmpty(this.queryLBSlistFormModel.provinceId),
        cityId: this.praseStrEmpty(this.queryLBSlistFormModel.cityId)
      }
      if (data.iccid !== '' & data.channelId !== '' & data.startTime !== '' & data.endTime !== '' & data.provinceId !== '' & data.cityId !== '') {
        this.apiLBSDownload(data)
      } else {
        this.$confirm('您确认要导出所有信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.apiLBSDownload(data)
        }).catch(() => {
        });
      }
    },
    apiLBSDownload (data) {
      API.apiLBSDownload(data).then(res => {
        if (!res) {
          return
        }
        console.log(res.data);
        this.$message.success(`请前往“我的任务”中查询，id值为${res.data}`)
        // let url = window.URL.createObjectURL(new Blob([res]))
        // let link = document.createElement('a')
        // link.style.display = 'none'
        // link.href = url
        // link.setAttribute('download', `${this.excelName}.xlsx`)

        // document.body.appendChild(link)
        // link.click()
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
</style>
