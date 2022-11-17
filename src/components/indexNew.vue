<template>
  <div>
    
    <el-card class="all_list">
      <div class="board">
        
        <div class="board-row">
           <span>我的面板</span>
           <div class="board-panel" @click="toChannelList">
             <div class="borad-panel-main">
               <div class="borad-panel-main-img">
                 <img src="../assets/images/networkIcon.png"  alt="" />
               </div>
               <span>渠道列表</span>
             </div>
             <div class="borad-panel-footer">
               <span>查  看</span>
             </div>
           </div>
           <div class="board-panel" @click="toChannelMng">
             <div class="borad-panel-main">
               <div class="borad-panel-main-img">
                 <img src="../assets/images/networkIcon.png"  alt="" />
               </div>
               <span>渠道业务管理</span>
             </div>
             <div class="borad-panel-footer">
               <span>查  看</span>
             </div>
           </div>
           <div class="board-panel" @click="toChannelStatic">
             <div class="borad-panel-main">
               <div class="borad-panel-main-img">
                 <img src="../assets/images/networkIcon.png"  alt="" />
               </div>
               <span>渠道业务统计</span>
             </div>
             <div class="borad-panel-footer">
               <span>查  看</span>
             </div>
           </div>
        </div>
        <!-- <div class="board-row"> -->
          <!-- <span>风险告警</span>
           <div class="alert-panel" @click="toLbs">
             <div class="left">
               <span class="title">风险区域</span>
               <div class="info">
                风险区域关停：{{stopedCardNum}}（张）
               </div>
             </div>
             <div class="right">
               <img src="../assets/images/smsIcon.png"  alt="" />
             </div>
           </div> -->
           <!-- <div class="alert-panel" @click="toPool"> 
             <div class="left">
               <span class="title">风险用量</span>
               <div class="info">
                可用量少于10%的流量池：{{sharingPoolNum}}（个）
               </div>
             </div>
             <div class="right">
               <img src="../assets/images/smsIcon.png"  alt="" />
             </div>
           </div> -->
           <!-- <div class="alert-panel"> 
             <div class="left">
               <span class="title">风险类型</span>
               <div class="info">
                不合理的设备IMEI：{{imeiNum}}（张）
               </div>
               <div class="info">
                卡状态异常： （张）
               </div>
             </div>
             <div class="right">
               <img src="../assets/images/smsIcon.png"  alt="" />
             </div>
           </div> -->
        <!-- </div> -->
        
        <!-- <div class="board-row">
          <span>卡统计</span>
          <div class="chart">
            <el-form  :inline="true" >
              <el-form-item >
                <el-select 
                filterable
                clearable
                reserve-keyword
                placeholder="请选择渠道" v-model="channelForStatus" style="width:500px" @change="channelChangeForStatus">
                  <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="cardstatus-vepie">
              <Vepie  :data="statusChartData"></Vepie>
            </div>
            
          </div>

          <div class="chart">
            <el-form  :inline="true" >
              <el-form-item >
                <el-select 
                filterable
                clearable
                reserve-keyword  
                placeholder="请选择渠道" v-model="channelForLbs" style="width:500px" @change="channelChangeForLbs">
                  <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div class="mapTitle">卡区域分布</div>
            <div id="china_map_box">
                <div id="china_map"></div>
            </div>
          </div>  
        </div> -->

        <!-- <div class="board-row">
          <span>增长趋势</span>
          <div class="chart">
            <div class="chart-form">
              <el-form  :inline="true" >
              <el-form-item >
                <el-select 
                filterable
                clearable
                reserve-keyword
                placeholder="请选择渠道" v-model="channelForDataUsage" style="width:200px" @change="channelChangeCardDataUsageForChannels">
                  <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <el-form  :inline="true" >
              <el-form-item >
                <el-select 
                filterable
                clearable
                reserve-keyword
                placeholder="请选择类型" v-model="dateType" style="width:200px" @change="dataTypeForCardDataUsage">
                  <el-option v-for="item in dateTypes" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            </div>
              <VeLine  :data="dataUsage"></VeLine>
            </div>
            
          <div class="chart">
            <el-form  :inline="true" >
              <el-form-item >
                <el-select 
                filterable
                clearable
                reserve-keyword
                placeholder="请选择渠道" v-model="channelForCardNum" style="width:400px" @change="channelChangeForCardNum">
                  <el-option v-for="item in channels" :key="item.value" :label="item.name" :value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
              <VeLine  :data="chartData"></VeLine>
            </div>
            
        </div> -->
      </div>
      
    </el-card>
    <el-main class="el-loading" v-loading="loading" element-loading-background="transparent"
        element-loading-text="加载中" > 
    </el-main>
  </div>
</template>

<script>

import * as echarts from 'echarts'
import 'echarts/map/js/china.js' 
import apiBigflow from './../api/bigflow'
import Vepie from "v-charts/lib/pie.common";
import VeLine from "v-charts/lib/line.common";
export default {
  components: {
      Vepie,
      VeLine
    },
  data () {
    return {

      options: {
        
        tooltip: {
          triggerOn: "mousemove",   //mousemove、click
          padding:8,
          borderWidth:1,
          borderColor:'#409eff',
          backgroundColor:'rgba(255,255,255,0.7)',
          textStyle:{
            color:'#000000',
            fontSize:13
          },
          formatter: function(e, t, n) {
            if(e.data == undefined || e.data == null)
              return ''
            let tipContent = e.data.tipContent
            return tipContent;
          }
        },
        visualMap: {
          show:true,
          left: 26,
          bottom: 1,
          showLabel:true,
          pieces: [
            {
              gte: 20000,
              label: ">= 20000",
              color: "#1f307b"
            },
            {
              gte: 5000,
              lt: 19999,
              label: "5000 - 19999",
              color: "#3c57ce"
            },
            {
              gte: 1000,
              lt:4999,
              label: "1000 - 4999",
              color: "#6f83db"
            },
            {
              gte: 1,
              lt: 999,
              label: "1 - 999",
              color: "#9face7"
            },
            {
              lt:0,
              label:'<1',
              color: "#bcc5ee"
            }
          ]
        },
        geo: {
          map: "china",
          scaleLimit: {
            min: 1,
            max: 2
          },
          zoom: 1.3,
          top: 120,
          label: {
            normal: {
              show:true,
              fontSize: "12",
              color: "white"
            }
          },
          itemStyle: {
            normal: {
              borderColor: "rgba(0, 0, 0, 0.2)",
              areaColor: 'silver',
            },
            emphasis: {
              areaColor: "#f2d5ad",
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              borderWidth: 0
            }
          }
        },
        series: [
          {
            name: "突发事件",
            type: "map",
            geoIndex: 0,
            data:[]
          }
        ]
      },
      dataList: [

      ],





      channelForLbs:'',
      channelForStatus:'',
      channelForCardNum:'',
      channelForDataUsage:'',
      channels:[],
      dateType:1,
      dateTypes:[
        {value:0, name:'7天内'},
        {value:1, name:'15天内'},
        {value:2, name:'本计费周期内'},
        {value:3, name:'6个月内'},
      ],
      loading:false,
      dataUsage: {
        columns: ["日期", "用量趋势变化GB"],
        rows: [
          { 日期: "1月", 用量趋势变化GB: 0 },
          { 日期: "2月", 用量趋势变化GB: 0 },
          { 日期: "3月", 用量趋势变化GB: 0 },
          { 日期: "4月", 用量趋势变化GB: 0 },
          { 日期: "5月", 用量趋势变化GB: 0 },
          { 日期: "6月", 用量趋势变化GB: 0 }
        ]
      },
      chartData: {
        columns: ["日期", "新增SIM卡数量"],
        rows: [
          { 日期: "1月", 新增SIM卡数量: 0 },
          { 日期: "2月", 新增SIM卡数量: 0 },
          { 日期: "3月", 新增SIM卡数量: 0 },
          { 日期: "4月", 新增SIM卡数量: 0 },
          { 日期: "5月", 新增SIM卡数量: 0 },
          { 日期: "6月", 新增SIM卡数量: 0 }
        ]
      },
      initStatusDatas:[
        { 状态: "可激活", 卡数量: 0 },
        { 状态: "已激活", 卡数量: 0 },
        { 状态: "已停用", 卡数量: 0 },
        { 状态: "已失效", 卡数量: 0 },
      ],
      statusChartData: {
        columns: ["状态", "卡数量"],
        rows: [
          { 状态: "可激活", 卡数量: 0 },
          { 状态: "已激活", 卡数量: 0 },
          { 状态: "已停用", 卡数量: 0 },
          { 状态: "已失效", 卡数量: 0 },
        ]
      },
      dataChart: {},
      firstValue:'',
      secondValue:'',
      thirdValue:'',
      datacollection: null,
      stopedCardNum:0,
      sharingPoolNum:0,
      imeiNum:0,
      loadingCount:0
    }
  },
  watch: {
      //观察option的变化
      options: {
        handler(newVal, oldVal) {
          let mapDiv = document.getElementById('china_map');
          let myChart = echarts.init(mapDiv);
          if (this.myChart) {
            if (newVal) {
              this.myChart.setOption(newVal);
            } else {
              this.myChart.setOption(oldVal);
            }
          } else {
            this.initEchartMap();
          }
        },
        deep: true //对象内部属性的监听，关键。
      }
    },
  created() {
      this.setEchartOption();
    },
  mounted () {
    this.$nextTick(()=>{
          this.initEchartMap();
      })
    // this.getChinaMapDatas()
    // this.getAllChannels()
    // this.getStopedCardNumForChannels()
    // this.getSharingPoolNumForChannels()
    // this.getImeiNumForChannels()
    // this.getCardStatusNumForChannels()
    // this.getCardNumForChannels()
    // this.getCardDataUsageForChannels()
  },
  methods:{
    getChinaMapDatas:function(){
      let params = {}
      params.type = 0
      params.channelId = this.channelForLbs
      let that = this
      this.addLoadingCount()
        apiBigflow.getCardLbsStaticsForChannels(params).then(res=>{
            if(res.resultCode == 0){
                let statics = res.data  
                this.dataList = []
                for(let i =0; i < statics.length; i++){
                  let oneData = {}
                  oneData.name = statics[i].name
                  oneData.value = statics[i].value
                  let cities = statics[i].cities
                  let tipContent = `<div>
                                        <p><b style="font-size:15px;">${oneData.name}</b>（卡总数：${oneData.value} 张）</p>`
                  for(let i = 0; i < cities.length; i++){
                    tipContent = tipContent + `<p class="tooltip_style"><span class="tooltip_left">${cities[i].cityName}：</span><span class="tooltip_right"> ${cities[i].card_num} 张</span></p>`
                  }
                  tipContent = tipContent + `</div>`
                  oneData.tipContent = tipContent
                  this.dataList.push(oneData)
                }
                that.setEchartOption()
            }
            this.reduceLoadingCount()
        })
    },
    dataTypeForCardDataUsage:function(type){
      this.getCardDataUsageForChannels()
    },
    channelChangeCardDataUsageForChannels:function(channelId){
      this.getCardDataUsageForChannels()
    },
    getCardDataUsageForChannels:function(){
      let params = {}
      params.channelId = this.channelForDataUsage
      params.queryType = this.dateType
      this.addLoadingCount()
        apiBigflow.getCardDataUsageForChannels(params).then(res=>{
            if(res.resultCode == 0){
                let statics = res.data  
                let rows = []
                for(let i = 0; i < statics.length; i++){
                  let one = statics[i]
                  let row = {}
                  row["日期"] = one.date
                  row["用量趋势变化GB"] = one.dateUsage
                  rows.push(row)
                }
                if(rows.length > 0)
                  this.dataUsage.rows = rows
                else{
                  let row = {}
                  row["日期"] = '无'
                  row["用量趋势变化GB"] = '0'
                  rows.push(row)
                  this.dataUsage.rows = rows
                }
            }
            this.reduceLoadingCount()
        })
    },
    channelChangeForLbs:function(){
      this.getChinaMapDatas()
    },

      channelChangeForStatus:function(channelId){
        this.getCardStatusNumForChannels()
      },
      channelChangeForCardNum:function(channelId){
        this.getCardNumForChannels()
      },
      getAllChannels:function(){
        let params = {}
        apiBigflow.getAllChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.channels = res.data
            }
        })
    },
    addLoadingCount:function(){
      this.loadingCount++
      if(this.loadingCount > 0)
        this.loading = true
    },
    reduceLoadingCount:function(){
      this.loadingCount--
      if(this.loadingCount <= 0)
        this.loading = false
    },
    getCardNumForChannels:function(){
      let params = {}
      params.channelId = this.channelForCardNum
      this.addLoadingCount()
        apiBigflow.getCardNumForChannels(params).then(res=>{
            if(res.resultCode == 0){
                let statics = res.data  
                let rows = []
                for(let i = 0; i < statics.length; i++){
                  let one = statics[i]
                  let row = {}
                  row["日期"] = one.month
                  row["新增SIM卡数量"] = one.cardNum
                  rows.push(row)
                }
                if(rows.length > 0)
                  this.chartData.rows = rows
                else{
                  let row = {}
                  row["日期"] = '无'
                  row["新增SIM卡数量"] = '0'
                  rows.push(row)
                  this.chartData.rows = rows
                }
            }
            this.reduceLoadingCount()
        })
    },
    getCardStatusNumForChannels:function(){
      let params = {}
      params.channelId = this.channelForStatus
      this.addLoadingCount()
        apiBigflow.getCardStatusNumForChannels(params).then(res=>{
            if(res.resultCode == 0){
                let statics = res.data  
                let rows = []
                for(let i = 0; i < statics.length; i++){
                  let one = statics[i]
                  let row = {}
                  row["状态"] = one.status
                  row["卡数量"] = one.cardNum
                  rows.push(row)
                }
                if(rows.length > 0)
                  this.statusChartData.rows = rows
                else
                  this.statusChartData.rows = this.initStatusDatas
                
            }
            this.reduceLoadingCount()
        })
    },
    getImeiNumForChannels:function(){
      let params = {}
      this.addLoadingCount()
        apiBigflow.getImeiNumForChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.imeiNum = res.data  
            }
            this.reduceLoadingCount()
        })
    },
    getSharingPoolNumForChannels:function(){
      let params = {}
      this.addLoadingCount()
        apiBigflow.getSharingPoolNumForChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.sharingPoolNum = res.data  
            }
            this.reduceLoadingCount()
        })
    },
    
    getStopedCardNumForChannels:function(){
      let params = {}
      this.addLoadingCount()
        apiBigflow.getStopedCardNumForChannels(params).then(res=>{
            if(res.resultCode == 0){
                this.stopedCardNum = res.data  
            }
            this.reduceLoadingCount()
        })
    },
    
    toChannelList:function(){
      this.$router.push('/bigflowChannelList');
    },
    toChannelMng:function(){
      this.$router.push('/bigflowStockDistrubute');
    },
    toChannelStatic:function(){
      this.$router.push('/bigflowChannelStatic');
    },
    toLbs:function(){
      this.$router.push({
        path: '/LBSRecordList',
        query: { lbsStatus: 1 }
      })
    },

    toPool:function(){
      this.$router.push('/bigflowPoolInfo');
    },

    
    fillData () {
        this.datacollection = {
          labels: [this.getRandomInt(), this.getRandomInt()],
          datasets: [
            {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }, {
              label: 'Data One',
              backgroundColor: '#f87979',
              data: [this.getRandomInt(), this.getRandomInt()]
            }
          ]
        }
      },
      getRandomInt () {
        return Math.floor(Math.random() * (50 - 5 + 1)) + 5
      },

      initEchartMap() {
        let mapDiv = document.getElementById('china_map');
        let myChart = echarts.init(mapDiv);
        myChart.setOption(this.options);
      },
      //修改echart配制
      setEchartOption(){
        this.options.series[0]['data'] = this.dataList;
      }
    
  }
}
</script>

<style scoped>
.all_list {
  height: 100%;
  height: 1000px;
  background: #f6f6f6;
}
.board{
  display: flex;
  flex-direction:column;
  
}
.board-row{
  /* border-radius: 10px;  
  box-shadow: 0 0 10px #ddd; */
  flex: 1;
  min-height:230px;
  border-top: 1px solid silver;
  display: flex;
}
.board-row span{
  color: silver;
  font-weight :bold;
}
.board-panel{
  border-radius: 10px;  
  box-shadow: 0 0 10px #ddd;
  width: 300px;
  height: 180px;
  margin: 20px;
  flex:1;
  background: #ffffff;
  cursor: pointer;
}
.borad-panel-footer{
  background: #f8f3fd;
  height: 30px;
}
.borad-panel-footer span{
  margin: 10px;
  color: #aad0fb;
  line-height: 30px;
}
.borad-panel-main{
  height: 150px;
  display: flex;
}

.borad-panel-main-img{
  flex: 1;
}
.borad-panel-main-img img{
  flex: 1;
  height: 80px;
  width: 80px;
  margin: 30px;
  opacity:0.2;
}
.borad-panel-main span{
  flex:2;
  margin-top: 50px;
  text-align: right;
  margin-right: 20px;
  font-size: 25px;
}
.alert-panel{
  border-radius: 10px;  
  box-shadow: 0 0 10px #f3e7e3;
  width: 300px;
  height: 180px;
  margin: 20px;
  flex:1;
  background: #f3e7e3;
  cursor: pointer;
  display: flex;
}
.alert-panel > .left{
  flex:3;
}
.alert-panel > .right{
  flex:1;
}
.alert-panel > .right > img{
  width: 50px;
  height: 50px;
  margin-top: 60px;
  margin-right: 30px;
  opacity:0.4;
}
.alert-panel > .left > .title{
  margin: 10px;
}
.alert-panel > .left > .info{
  margin-left: 20px;
  margin-top: 30px;
  font-size: 13px;
  color: goldenrod;
}
.small {
    max-width: 600px;
    margin:  150px auto;
  }
  .chart{
    margin: 30px;
    margin-left: 50px;
    height: 570px;
    width: 500px;
  }
  .chart-form{
    display: flex;
  }
  #china_map {
  	width: 100%;
  	height: 500px;
  }
  .cardstatus-vepie{
    margin-top: 100px;
  }
  .mapTitle{
    font-size: 15px;
    margin-left: 40%;
    margin-top: 1%;
  }
</style>