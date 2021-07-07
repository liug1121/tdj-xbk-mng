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
      <el-row :gutter="20" style="min-width:600px;">
        <!-- 策略无数据 -->
        <el-col :span="24" v-show="strategyNewShow">
          <div class="ManageStrategyBox">
            <div class="ManageStrategyHead" style="background:#CBE3FA;">
              <div class="strategyHead">
                <div class="strategyHeadName">策略：<el-input style="widht:100%; flex:1;" size="medium" v-model="stragegyForm.name" placeholder="请输入策略名称"></el-input>
                </div>
                <div class="strategyHeadId">编号：<span></span></div>
                <div class="strategyHeadButton">
                  <el-button size="small" type="primary" @click="StrategyDetailsNew">保存</el-button>
                  <el-button size="small" type="danger" @click="strategyNewShow=false">删除</el-button>
                </div>
              </div>
              <div class="strategyTime">
                <div class="strategyTimeTitle">有效期：</div>
                <div class="flex1">
                  <el-row :gutter="20">
                    <el-col :span="11">
                      <el-date-picker v-model="stragegyForm.startDate" size="medium" type="date" placeholder="开始日期" style="width:100%" value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="2" style="text-align:center;">至</el-col>
                    <el-col :span="11">
                      <el-date-picker v-model="stragegyForm.endDate" size="medium" type="date" placeholder="结束日期" style="width:100%" value-format="yyyy-MM-dd">
                      </el-date-picker>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>

            <!-- 策略明细 -->
            <!-- <div class="strategyBox" v-show="strategyDetailNewShow">
              <div class="checkedBox">
                <div class="weekList">
                  <span v-for="city in cities" :key="city.id" class="checkboxlist">
                    <label :for="city.name">
                      <div class="checkbox" :class="checkboxWeeks.indexOf(city.name)!=-1?'checked':''"></div>
                      <input type="checkbox" :id="city.id" v-model="checkboxWeeks" :value="city.id"><span class="checkboxName">{{city.name}}</span>
                    </label>
                  </span>
                </div>
              </div>
              <div class="strategyTimeTitleBox">
                <div class="strategyTimeTitle">有效时间：</div>
                <div class="flex1">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-time-picker size="medium" style="width:100%" v-model="stragegyForm.start_time" placeholder="起始时间" value-format="HH:mm:ss">
                      </el-time-picker>
                    </el-col>
                    <el-col :span="12">
                      <el-time-picker size="medium" style="width:100%" placeholder="结束时间" v-model="stragegyForm.end_time" value-format="HH:mm:ss">
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
                      <el-switch v-model="stragegyForm.card_voice_statue" active-color="#ffb525" inactive-color="#eee">
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
                      <el-switch v-model="stragegyForm.card_sms_statue" active-color="#ffb525" inactive-color="#eee">
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
                      <el-switch v-model="stragegyForm.card_data_statue" active-color="#ffb525" inactive-color="#eee">
                      </el-switch>
                    </div>
                    <div class="itemBox">允许上网</div>
                  </el-card>
                </el-col>
              </el-row>
            </div> -->
          </div>
        </el-col>
        <!-- 有数据 -->
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
            <!-- 策略明细 -->
            <div class="strategyBox" v-show="strategyDetailBJShow">
              <div class="checkedBox">
                <div class="weekList">
                  <span v-for="city in cities" :key="city.id" class="checkboxlist">
                    <label :for="city.name">
                      <div class="checkbox" :class="checkboxWeeks.indexOf(city.name)!=-1?'checked':''"></div>
                      <input type="checkbox" :id="city.id" v-model="checkboxWeeks" :value="city.id"><span class="checkboxName">{{city.name}}</span>
                    </label>
                  </span>
                </div>
              </div>
              <div class="strategyTimeTitleBox">
                <div class="strategyTimeTitle">有效时间：</div>
                <div class="flex1">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <el-time-picker size="medium" style="width:100%" v-model="stragegyForm.start_time" placeholder="起始时间" value-format="HH:mm:ss">
                      </el-time-picker>
                    </el-col>
                    <el-col :span="12">
                      <el-time-picker size="medium" style="width:100%" placeholder="结束时间" v-model="stragegyForm.end_time" value-format="HH:mm:ss">
                      </el-time-picker>
                    </el-col>
                  </el-row>
                </div>
                <div style="margin-left:10px">
                  <el-button size="medium" type="primary" @click="StrategyDetailAdd(item.id)">确定新增</el-button>
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
                      <el-switch v-model="stragegyForm.card_voice_statue" active-color="#ffb525" inactive-color="#eee">
                      </el-switch>
                    </div>
                    <div class="itemBox" v-if="stragegyForm.card_voice_statue === true">允许语音通话</div>
                    <div class="itemBox" v-if="stragegyForm.card_voice_statue === false">禁止语音通话</div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div class="functionTop">
                      <img class="functionIcon" :src="smsIcon" alt="">
                      <div class="functionTitle">短信业务</div>
                    </div>
                    <div class="itemBox">
                      <el-switch v-model="stragegyForm.card_sms_statue" active-color="#ffb525" inactive-color="#eee">
                      </el-switch>
                    </div>
                    <div class="itemBox" v-if="stragegyForm.card_sms_statue === true">允许收发短信</div>
                    <div class="itemBox" v-if="stragegyForm.card_sms_statue === false">禁止收发短信</div>
                  </el-card>
                </el-col>
                <el-col :span="8">
                  <el-card>
                    <div class="functionTop">
                      <img class="functionIcon" :src="networkIcon" alt="">
                      <div class="functionTitle">网络服务</div>
                    </div>
                    <div class="itemBox">
                      <el-switch v-model="stragegyForm.card_data_statue" active-color="#ffb525" inactive-color="#eee">
                      </el-switch>
                    </div>
                    <div class="itemBox" v-if="stragegyForm.card_data_statue === true">允许上网</div>
                    <div class="itemBox" v-if="stragegyForm.card_data_statue === false">禁止上网</div>
                  </el-card>
                </el-col>
              </el-row>
            </div>

            <div class="strategyBox" v-for="itemdetails in item.details" :key="itemdetails.id">
              <div class="checkedBox">
                <div class="weekList">
                  <span v-for="city in cities" :key="city.id" class="checkboxlist">
                    <label :for="city.name" v-if="itemdetails.day_of_week === null">
                      <div class="checkbox" :class="checkboxWeeks.indexOf(city.name)!=-1?'checked':''"></div>
                      <input type="checkbox" :id="city.id" v-model="checkboxWeeks" :value="city.id" @change="strategyDetailsChange(itemdetails,item.id,checkboxWeeks)"><span class="checkboxName">{{city.name}}</span>
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
                    <div class="itemBox" v-if="itemdetails.card_voice_statue === true">允许语音通话</div>
                    <div class="itemBox" v-if="itemdetails.card_voice_statue === false">禁止语音通话</div>
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
                    <div class="itemBox" v-if="itemdetails.card_sms_statue === true">允许收发短信</div>
                    <div class="itemBox" v-if="itemdetails.card_sms_statue === false">禁止收发短信</div>
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
                    <div class="itemBox" v-if="itemdetails.card_data_statue === true">允许上网</div>
                    <div class="itemBox" v-if="itemdetails.card_data_statue === false">禁止上网</div>
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
      checkboxWeeks: [],
      cities: cityOptions,
      telLogo: telLogo,
      networkIcon: networkIcon,
      smsIcon: smsIcon,
      strategyNewShow: false,
      strategyDetailNewShow: false,
      strategyDetailBJShow: false,
      stragegyForm: {
        name: '',
        startDate: '',
        endDate: '',
        start_time: '',
        end_time: '',
        card_voice_statue: true,
        card_sms_statue: true,
        card_data_statue: true
      }
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
      this.strategyNewShow = true
      this.strategyDetailNewShow = true
    },
    StrategyDetailsNew () {
      if (this.stragegyForm.startDate > this.stragegyForm.endDate) {
        this.$message.error('开始日期不能大于结束日期')
      } else {
        const data = {
          endDate: this.stragegyForm.endDate,
          name: this.stragegyForm.name,
          startDate: this.stragegyForm.startDate
        }
        console.log(data);
        API.apiGroupcontrolManageStrategyAdd(data).then(res => {
          if (res.resultCode === 0) {
            this.getGroupcontrolManageStrategys()
            this.strategyNewShow = false
            this.strategyDetailNewShow = false
          } else {
            // this.$message.error(res.resultInfo)
            this.getGroupcontrolManageStrategys()
          }
        })
        this.strategyDetailBJShow = true
      }

    },
    StrategyDetailsBox () {
      this.strategyDetailBJShow = true
    },
    // 新增策略明细确认按钮
    StrategyDetailAdd (id) {
      if (this.stragegyForm.start_time > this.stragegyForm.end_time) {
        this.$message.error('开始时间不能大于结束时间')
      } else if (this.stragegyForm.start_time === null || this.stragegyForm.start_time === '') {
        this.$message.error('开始时间不能为空')
      } else if (this.stragegyForm.end_time === null || this.stragegyForm.end_time === '') {
        this.$message.error('结束时间不能为空')
      } else {
        if (this.checkboxWeeks.length !== 0) {
          const data = {
            details: [
              {
                cardDataStatus: Number(this.stragegyForm.card_data_statue),
                cardSmsStatue: Number(this.stragegyForm.card_sms_statue),
                cardVoiceStatue: Number(this.stragegyForm.card_voice_statue),
                dayOfWeek: this.checkboxWeeks,
                endTime: this.stragegyForm.end_time,
                startTime: this.stragegyForm.start_time
              }
            ],
            stragegyId: id
          }
          this.apiGroupcontrolManageStrategyAdd(data)
        } else {
          const data = {
            details: [
              {
                cardDataStatus: Number(this.stragegyForm.card_data_statue),
                cardSmsStatue: Number(this.stragegyForm.card_sms_statue),
                cardVoiceStatue: Number(this.stragegyForm.card_voice_statue),
                endTime: this.stragegyForm.end_time,
                startTime: this.stragegyForm.start_time
              }
            ],
            stragegyId: id
          }
          this.apiGroupcontrolManageStrategyAdd(data)
        }
      }
    },
    apiGroupcontrolManageStrategyAdd (data) {
      API.apiGroupcontrolManageStrategyAdd(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolManageStrategys()
          this.strategyDetailBJShow = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    // 监听 策略名称、开始日期、结束日期 并提交
    strategyChange (row) {
      if (row.startDate > row.endDate) {
        this.$message.error('开始日期不能大于结束日期')
      } else {
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
      }

    },
    // 监听时间段里的数据 并提交
    strategyDetailsChange (row, id, checkboxWeek) {
      if (checkboxWeek) {
        row.day_of_week = checkboxWeek
      }
      console.log(row.day_of_week);
      this.$confirm('您确认要更改些信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        if (row.day_of_week === null) {
          console.log('空');
          const data = {
            cardDataStatus: Number(row.card_data_statue),
            cardSmsStatue: Number(row.card_sms_statue),
            cardVoiceStatue: Number(row.card_voice_statue),
            detailId: row.id,
            endTime: row.end_time,
            startTime: row.start_time,
            stragegyId: id,
          }
          console.log(data);
          this.apiGroupcontrolManageStrategyDetailModify(data)
        } else {
          console.log('有值');
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
          this.apiGroupcontrolManageStrategyDetailModify(data)
        }

      }).catch(() => {
      });
    },
    apiGroupcontrolManageStrategyDetailModify (data) {
      API.apiGroupcontrolManageStrategyDetailModify(data).then(res => {
        if (res.resultCode === 0) {
          this.getGroupcontrolManageStrategys()
        } else {
          this.$message.error(res.resultInfo)
        }
      })
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
  text-align: right;
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
/* .strategyBox:nth-of-type(even) {
  background: #ccc;
} */
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
  margin-bottom: 50px;
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