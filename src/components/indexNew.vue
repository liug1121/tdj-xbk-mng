<template>
  <div>
    <el-card class="all_list">
      <!-- <span style="font-size:20px">欢迎进入卡管理平台</span> -->
      <div class="board">
        <div class="board-row">
           <span>我的面板</span>
           <div class="board-panel">
             <div class="borad-panel-main">
               <div class="borad-panel-main-img">
                 <img src="../assets/images/networkIcon.png"  alt="" />
               </div>
               <span>渠道统计</span>
             </div>
             <div class="borad-panel-footer">
               <span>查  看</span>
             </div>
           </div>
           <div class="board-panel">
             <div class="borad-panel-main">
               <div class="borad-panel-main-img">
                 <img src="../assets/images/networkIcon.png"  alt="" />
               </div>
               <span>渠道统计</span>
             </div>
             <div class="borad-panel-footer">
               <span>查  看</span>
             </div>
           </div>
           <div class="board-panel">
             <div class="borad-panel-main">
               <div class="borad-panel-main-img">
                 <img src="../assets/images/networkIcon.png"  alt="" />
               </div>
               <span>渠道统计</span>
             </div>
             <div class="borad-panel-footer">
               <span>查  看</span>
             </div>
           </div>
        </div>
        <div class="board-row">
          <span>风险告警</span>
        </div>
        <div class="board-row">
          <span>卡状态统计</span>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style scoped>
.all_list {
  height: 100%;
  height: 800px;
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
  font-size: 30px;
}

</style>