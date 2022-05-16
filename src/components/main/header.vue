<template>
  <el-container>
    <el-header style="font-size: 12px;position:relative;">
      <div class="sets">
        <!-- <i class="el-icon-flowmenuopen" v-if="!ismyCollapse"></i>
        <i class="el-icon-flowmenuunfold" v-if="ismyCollapse"></i> -->
      </div>
      <div class="box_breadcrumb">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
          <!-- <el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread">{{bread}}</el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>

      
  
      <div class="top_right">
        <!-- <span @click="logout()" style="cursor:pointer;">退出登录</span> -->
        <!-- <span  style="margin-left:20px;"><img class="usr-img" style="position: relative;top: 8px;" src="@/assets/images/user_pic.png" /></span> -->
        <!-- <span style="padding-left:10px;">{{username}}</span> -->
        <div class="dropdown">
        <button @click="myFunction" class="dropbtn">{{username}}</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#home" @click="openEditPwdDlg">修改密码</a>
            <a href="#home" @click="logout()">退出登陆</a>
          </div>
        </div>
      </div>
    </el-header>

    <el-dialog title="修改密码" :visible.sync="editPwdDlgShowed" width="430px" >
      <!-- 内容主体区域 -->
      <el-form ref="addChannelRef"  label-width="120px">
        <el-form-item label="原密码" >
          <el-input type="password"  size="small" v-model="oldPwd" placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" >
          <el-input type="password"  size="small" v-model="newPwd" placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码确认" >
          <el-input type="password"  size="small" v-model="newPwdComfirm" placeholder="请再次输入"></el-input>
        </el-form-item>
        </el-form>
        <!-- 底部区域 -->
        <span slot="footer" class="dialog-footer">
          <el-button @click="editPwdDlgShowed = false">取 消</el-button>
          <el-button type="primary" @click="okEditPwd">确 定</el-button>
        </span>
      </el-dialog>
    
    <zgzTabs></zgzTabs>
    <!-- <router-view></router-view> -->
  </el-container>
</template>

<script>
import apiBigflow from './../../api/bigflow'
import { mapState } from "vuex";
import zgzTabs from './tabs'
export default {
  data () {
    return {
      oldPwd:'',
      newPwd:'',
      newPwdComfirm:'',
      editPwdDlgShowed: false,
      username: "",
      ismyCollapse: true,
      breadList: ["卡信息"]
    };
  },
  components: {
    zgzTabs
  },
  computed: {
    ...mapState(["isCollapse"])
  },
  mounted () {
    // console.log(this.isCollapse);
    this.ismyCollapse = this.isCollapse;
    // console.log(JSON.stringify(window.sessionStorage))
    this.username = window.sessionStorage.getItem('userName')
  },
  watch: {
    //监听data里面的ismyCollapse值的动态变化，修改仓库值，注意，仓库中接受的数据跟data里数据不能重名，会报错
    ismyCollapse () {
      this.$store.commit("setisCollapse", this.ismyCollapse);
    },
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    '$route': {
      handler (val) {
        // debugger
        this.breadList = [];
        // console.log(val);
        this.breadList.push(val.meta.title);
        // console.log(this.breadList);
      },
      // 深度观察监听
      deep: true
    }
  },
  methods: {
    okEditPwd:function(){
      if(this.oldPwd == undefined || this.oldPwd == null || this.oldPwd == ''){
        this.$message.error('原密码不能为空')
        return
      }
      if(this.newPwd == undefined || this.newPwd == null || this.newPwd == ''){
        this.$message.error('新密码不能为空')
        return
      }
      if(this.newPwdComfirm == undefined || this.newPwdComfirm == null || this.newPwdComfirm == ''){
        this.$message.error('新密码确认不能为空')
        return
      }
      if(this.newPwdComfirm != this.newPwd){
        this.$message.error('两次密码输入不一致，请确认')
        return
      }
      this.$confirm('您确认要此操作, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            let params = {}
            // params.userName = this.username
            params.oldPwd = this.oldPwd
            params.newPwd = this.newPwd
            apiBigflow.modifyMangerPwd(params).then(res=>{
                if(res.resultCode == 0){
                    this.editPwdDlgShowed = false
                    this.$message.success('修改成功')
                }else{
                    this.$message.error('修改失败:' + res.resultInfo)
                }
            })
        }).catch(() => {
        }); 
      
    },
    openEditPwdDlg:function(){
      this.editPwdDlgShowed = true
      this.oldPwd = ''
      this.newPwd = ''
      this.newPwdComfirm = ''
    },
    close:function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    },
    myFunction:function(){
      document.getElementById("myDropdown").classList.toggle("show");
    },
    logout () {
      window.sessionStorage.clear();
      this.$router.push("/login")
      window.sessionStorage.clear('userType');
      this.$store.state.openTab = [];
      this.$store.state.activeIndex = '/main';
      this.$router.push('/login')
    },
    //修改显示隐藏
    pushisCollapse () {
      this.ismyCollapse = !this.ismyCollapse;
    },
    //退出
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange (val) {
      this.page = val - 1;
      this.getlist();
    }
  }
};
</script>

<style scoped>
.sets {
  color: black;
  font-size: 22px;
  width: 60px;
  text-align: center;
}
.sets:hover {
  background-color: rgb(219, 250, 255);
  cursor: pointer;
}
.top_right {
  float: right;
  margin-right: 20px;
  z-index: 999;
}
.usr-img{
  width: 35px;
  height: 35px;
}
.company{
  background-color: red;
  /* height:100px; */
}

.dropbtn {
    background-color: white;
    color:black;
    padding: 16px;
    font-size: 13px;
    border: none;
    cursor: pointer;
}

.dropbtn:hover, .dropbtn:focus {
    background-color: white;
}

.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 160px;
    overflow: auto;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
}

.dropdown-content a {
    color: black;
    padding: 1px 12px;
    height: 40px;
    text-decoration: none;
    display: block;
}

.dropdown a:hover {background-color: #f1f1f1}

.show {display:block;}
</style>
