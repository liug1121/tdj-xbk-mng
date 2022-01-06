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
        <div class="board-row">
          <span>风险告警</span>
           <div class="alert-panel">
             <div class="left">
               <span class="title">风险区域</span>
               <div class="info">
                风险区域关停：100
               </div>
             </div>
             <div class="right">
               <img src="../assets/images/smsIcon.png"  alt="" />
             </div>
           </div>
           <div class="alert-panel"> 
             <div class="left">
               <span class="title">风险用量</span>
               <div class="info">
                可用量少于10%的流量池数量：2
               </div>
               <div class="info">
                可用量少于10%的卡数量：1200
               </div>
             </div>
             <div class="right">
               <img src="../assets/images/smsIcon.png"  alt="" />
             </div>
           </div>
           <div class="alert-panel"> 
             <div class="left">
               <span class="title">风险类型</span>
               <div class="info">
                不合理的设备IMEI：0（张）
               </div>
               <div class="info">
                卡状态异常：0（张）
               </div>
             </div>
             <div class="right">
               <img src="../assets/images/smsIcon.png"  alt="" />
             </div>
           </div>
        </div>
        
        <div class="board-row">
          <span>卡状态统计</span>
            <div class="chart">
              <Vepie  :data="statusChartData"></Vepie>
            </div>
            <div class="chart">
              <VeLine  :data="chartData"></VeLine>
            </div>
        </div>
      </div>
      
    </el-card>
  </div>
</template>

<script>

import Vepie from "v-charts/lib/pie.common";
import VeLine from "v-charts/lib/line.common";
export default {
  components: {
      Vepie,
      VeLine
    },
  data () {
    return {
      
      chartData: {
        columns: ["日期", "新增SIM卡数量"],
        rows: [
          { 日期: "1月", 新增SIM卡数量: 123 },
          { 日期: "2月", 新增SIM卡数量: 1223 },
          { 日期: "3月", 新增SIM卡数量: 2123 },
          { 日期: "4月", 新增SIM卡数量: 4123 },
          { 日期: "5月", 新增SIM卡数量: 3123 },
          { 日期: "6月", 新增SIM卡数量: 7123 }
        ]
      },
      statusChartData: {
        columns: ["状态", "卡数量"],
        rows: [
          { 状态: "可测试", 卡数量: 123 },
          { 状态: "可激活", 卡数量: 123 },
          { 状态: "已激活", 卡数量: 123 },
          { 状态: "已停用", 卡数量: 123 },
          { 状态: "已失效", 卡数量: 123 },
          { 状态: "已停用", 卡数量: 123 }
        ]
      },
      dataChart: {},
      firstValue:'',
      secondValue:'',
      thirdValue:'',
      datacollection: null
    }
  },
  mounted () {
    this.addData()
  },
  methods:{
    addData() {
      this.firstValue="aaa"
      this.secondValue="aaa"
      this.thirdValue="aaa"
      // var hrate = []
      // this.heart_rate.forEach(el => {
      //   hrate.push(el.rate)
      // })
      this.dataChart = {
        labels: ['Km', 'Kj', 'HB'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: ['#41B883', '#E46651', '#00D8FF'],
            data: [this.firstValue,this.secondValue,this.thirdValue]
          }
        ]
      }
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
      }
    
  }
}
</script>

<style scoped>
.all_list {
  height: 100%;
  height: 900px;
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
    height: 320px;
    width: 450px;
  }
  
</style>