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
        <span  style="margin-left:20px;"><img class="usr-img" style="position: relative;top: 8px;" src="@/assets/images/user_pic.png" /></span>
        <!-- <span style="padding-left:10px;">{{username}}</span> -->
        <div class="dropdown">
        <button @click="myFunction" class="dropbtn">{{username}}</button>
          <div id="myDropdown" class="dropdown-content">
            <a href="#home" @click="logout()">退出登陆</a>
          </div>
        </div>
      </div>
    </el-header>
    
    <zgzTabs></zgzTabs>
    <!-- <router-view></router-view> -->
  </el-container>
</template>

<script>
import { mapState } from "vuex";
import zgzTabs from './tabs'
export default {
  data () {
    return {
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
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}

.dropdown a:hover {background-color: #f1f1f1}

.show {display:block;}
</style>
