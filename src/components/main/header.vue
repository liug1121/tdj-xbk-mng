<template>
  <el-container>
    <el-header style="font-size: 12px;position:relative;">
      <div @click="pushisCollapse" class="sets">
        <i class="el-icon-flowmenuopen" v-if="!ismyCollapse"></i>
        <i class="el-icon-flowmenuunfold" v-if="ismyCollapse"></i>
      </div>
      <div class="box_breadcrumb">
        <el-breadcrumb separator="/">
          <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item> -->
          <!-- <el-breadcrumb-item v-for="bread in breadList" v-bind:key="bread">{{bread}}</el-breadcrumb-item> -->
        </el-breadcrumb>
      </div>
      <div class="top_right">
        <span @click="logout()" style="cursor:pointer;">退出登录</span>
        <span style="margin-left:20px;"><img style="position: relative;top: 8px;" src="@/assets/images/male.png" /></span>
        <span style="padding-left:10px;">{{username}}</span>
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
</style>
