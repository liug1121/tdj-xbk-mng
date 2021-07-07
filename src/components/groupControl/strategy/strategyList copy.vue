<template>
  <!-- 策略管理 -->
  <div class="box_subject">
    <el-card class="all_list">
      <!-- 按钮区域 -->
      <el-row :gutter="20" style="margin-bottom:10px;">
        <el-col :span="8">
          <el-input size="medium" placeholder="请输入名称" v-model="queryInfo.name" clearable @clear="getGroupcontrolManageStrategys">
            <el-button slot="append" icon="el-icon-search" @click="getGroupcontrolManageStrategys"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button size="medium" type="primary" icon="el-icon-plus" @click="addStrategy">添加</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="24" v-for="item in ManageStrategys" :key="item.id">
          <div class="ManageStrategyBox">
            <div class="ManageStrategyHead">
              <div class="strategyHead">
                <div class="strategyHeadName">策略：<el-input style="widht:100%; flex:1;" size="medium" v-model="item.name" placeholder="请输入策略名称" @change="strategyChange(item)"></el-input>
                </div>
                <div class="strategyHeadId">编号：<span>{{item.code}}</span></div>
                <div class="strategyHeadButton">
                  <el-button size="small" type="primary" @click="StrategyDetailsBox(item.id)">新增时间段</el-button>
                  <el-button size="small" type="danger" @click="StrategyDel(item.id)">删除</el-button>
                </div>
              </div>
              <div class="strategyTime">
                <div class="strategyTimeTitle">有效期：</div>
                <div class="flex1">
                  <el-row :gutter="20">
                    <el-col :span="11">
                      <el-date-picker v-model="item.startDate" size="medium" type="date" placeholder="开始日期" style="width:100%" value-format="yyyy-MM-dd" @change="strategyChange(item)">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align:center;">至</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="item.endDate" size="medium" type="date" placeholder="结束日期" style="width:100%" value-format="yyyy-MM-dd" @change="strategyChange(item)">
                      </el-date-picker>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>

            <div class="strategyBox" v-for="itemdetails in item.details" :key="itemdetails.id">
              <div class="checkedBox">
                <!-- <div class="weekList">
                  <span v-for="city in cities" :key="city.id">
                    <input type="checkbox" :id="city.id" :value="city.id" v-model="itemdetails.day_of_week" @change="strategyDetailsChange(itemdetails,item.id)">
                    <label :for="city.id">{{city.name}}</label>
                  </span>
                </div> -->
                <div class="weekList">
                  <span v-for="city in cities" :key="city.id" class="checkboxlist">
                    <label :for="city.name" v-if="itemdetails.day_of_week === null">
                      <div class="checkbox" :class="checkboxWeeks.indexOf(city.name)!=-1?'checked':''"></div>
                      <input type="checkbox" :id="city.id" v-model="checkboxWeeks" :value="city.id" @change="strategyDetailsChange(itemdetails,item.id)"><span class="checkboxName">{{city.name}}</span>
                    </label>
                    <label :for="city.name" v-else>
                      <div class="checkbox" :class="itemdetails.day_of_week.indexOf(city.name)!=-1?'checked':''"></div>
                      <input type="checkbox" :id="city.id" v-model="itemdetails.day_of_week" :value="city.id" @change="strategyDetailsChange(itemdetails,item.id)"><span class="checkboxName">{{city.name}}</span>
                    </label>
                  </span>
                </div>
              </div>
              <div class="strategyTimeTitleBox">
                <div class="strategyTimeTitle">有效时间：</div>
                <div class="flex1">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-time-picker size="medium" style="width:100%" v-model="itemdetails.start_time" placeholder="起始时间" value-format="HH:mm:ss" @change="strategyDetailsChange(itemdetails,item.id)">
                      </el-time-picker>
                    </el-col>
                    <el-col :span="12">
                      <el-time-picker size="medium" style="width:100%" placeholder="结束时间" v-model="itemdetails.end_time" value-format="HH:mm:ss" @change="strategyDetailsChange(itemdetails,item.id)">
                      </el-time-picker>
                    </el-col>
                  </el-row>
                </div>
                <div style="margin-left:10px">
                  <el-button size="medium" type="danger" @click="StrategyDetailDel(itemdetails.id)">删除</el-button>
                </div>
              </div>
              <el-row :gutter="20">
                <el-col :span="8">
                  <el-card>
                    <div class="functionTop">
                      <img class="functionIcon" :src="telLogo" alt="">
                      <div class="functionTitle">语音通话</div>
                    </div>
                    <div class="itemBox">
                      <el-switch v-model="itemdetails.card_voice_statue" active-color="#ffb525" inactive-color="#eee" @change="strategyDetailsChange(itemdetails,item.id)">
                      </el-switch>
                    </div>
                    <div class="itemBox">允许语音通话</div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div class="functionTop">
                      <img class="functionIcon" :src="smsIcon" alt="">
                      <div class="functionTitle">短信业务</div>
                    </div>
                    <div class="itemBox">
                      <el-switch v-model="itemdetails.card_sms_statue" active-color="#ffb525" inactive-color="#eee" @change="strategyDetailsChange(itemdetails,item.id)">
                      </el-switch>
                    </div>
                    <div class="itemBox">允许收发短信</div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div class="functionTop">
                      <img class="functionIcon" :src="networkIcon" alt="">
                      <div class="functionTitle">网络服务</div>
                    </div>
                    <div class="itemBox">
                      <el-switch v-model="itemdetails.card_data_statue" active-color="#ffb525" inactive-color="#eee" @change="strategyDetailsChange(itemdetails,item.id)">
                      </el-switch>
                    </div>
                    <div class="itemBox">允许上网</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import API from 'api/groupControl'
import telLogo from 'assets/images/voiceIcon.png'
import smsIcon from 'assets/images/smsIcon.png'
import networkIcon from 'assets/images/networkIcon.png'
const cityOptions = [
  {
    id: 1,
    name: '星期日'
  },
  {
    id: 2,
    name: '星期一'
  },
  {
    id: 3,
    name: '星期二'
  },
  {
    id: 4,
    name: '星期三'
  },
  {
    id: 5,
    name: '星期四'
  },
  {
    id: 6,
    name: '星期五'
  },
  {
    id: 7,
    name: '星期六'
  }
];
export default {
  data () {
    return {
      // 获取策略
      ManageStrategys: [],
      queryInfo: {
        name: null
      },
      startTime: '',
      checkedCities: [5],
      checkboxWeeks: [],
      cities: cityOptions,
      telLogo: telLogo,
      smsIcon: smsIcon,
      networkIcon: networkIcon
    }
  },
  mounted () {
    this.getGroupcontrolManageStrategys()
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
          console.log(this.ManageStrategys);
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 点击新增按钮
    addStrategy () {
      const data = {
        endDate: null,
        name: null,
        startDate: null
      }
      console.log(data);
      API.apiGroupcontrolManageStrategyAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolManageStrategys()
        } else {
          // this.$message.error(res.resultInfo)
          this.getGroupcontrolManageStrategys()
        }
      })
    },
    StrategyDetailsBox (id) {
      const data = {
        details: [
          {
            cardDataStatus: 0,
            cardSmsStatue: 0,
            cardVoiceStatue: 0,
            endTime: '00:02:00',
            startTime: '00:01:00',
            dayOfWeek: [5]
          }
        ],
        stragegyId: id
      }
      console.log(data);
      API.apiGroupcontrolManageStrategyAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolManageStrategys()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    timeValueChange () {
      console.log(this.startTime);
    },
    // 监听 策略名称、开始日期、结束日期 并提交
    strategyChange (row) {
      const data = {
        name: row.name,
        startDate: row.startDate,
        endDate: row.endDate,
        id: row.id
      }
      console.log(data);
      API.apiGroupcontrolManageStrategyModify(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolManageStrategys()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听时间段里的数据 并提交
    strategyDetailsChange (row, id) {
      this.$confirm('您确认要更改些信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (row.day_of_week === null) {
          const data = {
            cardDataStatus: Number(row.card_data_statue),
            cardSmsStatue: Number(row.card_sms_statue),
            cardVoiceStatue: Number(row.card_voice_statue),
            dayOfWeek: this.checkboxWeeks,
            detailId: row.id,
            endTime: row.end_time,
            startTime: row.start_time,
            stragegyId: id,
          }
          console.log(data);
          API.apiGroupcontrolManageStrategyDetailModify(data).then(res => {
            if (res.resultCode === 0) {
              this.getGroupcontrolManageStrategys()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        } else {
          const data = {
            cardDataStatus: Number(row.card_data_statue),
            cardSmsStatue: Number(row.card_sms_statue),
            cardVoiceStatue: Number(row.card_voice_statue),
            dayOfWeek: row.day_of_week,
            detailId: row.id,
            endTime: row.end_time,
            startTime: row.start_time,
            stragegyId: id,
          }
          console.log(data);
          API.apiGroupcontrolManageStrategyDetailModify(data).then(res => {
            if (res.resultCode === 0) {
              this.getGroupcontrolManageStrategys()
            } else {
              this.$message.error(res.resultInfo)
            }
          })
        }

      }).catch(() => {
      });
    },
    // 删除策略
    StrategyDel (id) {
      this.$confirm('您确认要删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        API.apiGroupcontrolStrategyDel(id).then(res => {
          if (res.resultCode === 0) {
            this.$message.success('删除成功')
            this.getGroupcontrolManageStrategys()
          } else {
            this.$message.error(res.resultInfo)
          }
        })
      }).catch(() => {
      });

    },
    // 删除时间段
    StrategyDetailDel (id) {
      API.apiGroupcontrolStrategyDetailDel(id).then(res => {
        if (res.resultCode === 0) {
          this.$message.success('删除成功')
          this.getGroupcontrolManageStrategys()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },

  }
}
</script>

<style scoped>
.strategyHead {
  display: flex;
  height: 36px;
  line-height: 36px;
  font-size: 16px;
  margin-bottom: 10px;
}
.strategyHeadName {
  flex: 1;
  display: flex;
}
.strategyHeadId {
  width: 200px;
  margin-left: 10px;
  display: flex;
}
.strategyHeadId span {
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 4rem;
}
.strategyHeadButton {
  width: 160px;
}
.strategyTime {
  line-height: 40px;
  font-size: 14px;
  display: flex;
}
.strategyBox {
  border-top: 1px solid #e3e3e3;
  padding-top: 10px;
}
.strategyTimeTitle {
  width: 80px;
}
.flex1 {
  flex: 1;
}
.el-checkbox {
  margin-right: 20px;
}
.checkedBox {
  line-height: 36px;
  margin-bottom: 10px;
}
.functionTop {
  display: flex;
}
.functionIcon {
  height: 36px;
}
.functionIcon img {
  width: 20px;
  height: 20px;
  display: block;
}
.functionTitle {
  flex: 1;
  font-size: 16px;
  margin-left: 10px;
  line-height: 36px;
}
.itemBox {
  text-align: center;
  line-height: 36px;
}
.weekList {
  font-size: 12px;
  display: flex;
  height: 24px;
  line-height: 24px;
  border-bottom: 1px solid #f0f0f0;
  justify-content: center;
  align-items: center;
  padding-bottom: 10px;
}
.weekList span {
  flex: 1;
  text-align: center;
  line-height: 20px;
}
.weekList span input {
  vertical-align: middle;
}
.weekList span input[type='checkbox']:checked {
  color: red;
}
.strategyTimeTitleBox {
  display: flex;
  line-height: 36px;
  margin: 0 10px;
}
.ManageStrategyBox {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.ManageStrategyHead {
  background: #ededed;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  padding: 10px 10px 0 10px;
}
.checkboxlist {
}
.checkboxlist label {
  /*  margin-left: 10px; */
}
.checkboxlist .checkbox {
  display: inline-block;
  /* width: 14px; */
  height: 14px;
  border: 1px solid #eee;
  margin-right: -20px;
}
.checkboxlist .checkbox.checked {
  background: #0075ff;
}
.checkboxlist input[type='checkbox']:checked ~ span {
  color: #0075ff;
}
.checkboxlist input {
  /* opacity: 0; */
}
</style>