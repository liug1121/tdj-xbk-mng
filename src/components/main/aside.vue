<template>
  <div>
    <div class="logo" :class="{'isCollapse':isCollapse}">
      <img src="@/assets/images/logo.png" />
      <b class="title">卡管理后台</b>
    </div>
    <el-menu :default-active="path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handlselect" background-color="#001529" active-background-color="#1890ff" router active-text-color="#fff"
      :collapse="isCollapse" :unique-opened="true">
      <template v-for="(item, index) in nav_menu_data">
        <!--存在子菜单-->
        <el-submenu v-if="item.children" :index="item.path" :key="index" v-show="userType == '1'? item.type== 1 : usingInDevice == '1' ? item.usingInDevice ==1 : item.all=true">
          <template slot="title">
            <i :class="item.icon"></i>
            <span>{{item.title}}</span>
          </template>
          <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.path">
            <i :class="subitem.icon"></i>
            {{subitem.title}}
          </el-menu-item>
        </el-submenu>
        <!--不存在子菜单-->
        <el-menu-item v-else :index="item.path" :key="index" v-show="userType == '1'? item.type== 1 : usingInDevice == '1' ? item.usingInDevice ==1 : item.all=true">
          <i :class="item.icon"></i>
          <span v-show="!isCollapse">{{item.title}}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import AsideData from "components/main/asides.js";
export default {
  data () {
    return {
      path: "",
      nav_menu_data: AsideData.nav_menu_data,
      userType: null,
      menuShow: false,
      usingInDevice: null
    };
  },
  computed: {
    ...mapState(["isCollapse"])
  },
  mounted () {
    // console.log(this.nav_menu_data);
  },
  watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
    $route: "onRouteChanged"
  },
  created () {
    this.onRouteChanged();
    this.userType = window.sessionStorage.getItem('userType')
    this.usingInDevice = window.sessionStorage.getItem('usingInDevice')
    // console.log(this.userType)
  },
  methods: {
    onRouteChanged () {
      let that = this;
      that.path = that.$route.path;
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath);
    },
    handlselect (index, indexPath) {
      // console.log(index, indexPath);
    },
    // 调用 注册vuex内注册的editableTabs方法
    // ...mapActions({
    //   onRouteChanged: 'editableTabs'
    // })
  }
};
</script>

<style scoped>
.el-menu-item.is-active {
  color: #fff !important;
  background-color: #1890ff !important;
}
.logo {
  height: 54px;
  position: relative;
  line-height: 54px;
  transition: all 1s;
  background: rgb(0, 21, 41);
  width: 100%;
  overflow: hidden;
  /* padding-left:23px; */
  text-align: center;
}
.logo > img {
  width: 32px;
  height: 32px;
  position: relative;
  top: 8px;
}
.logo .title {
  color: #fff;
  vertical-align: middle;
  font-size: 20px;
  margin: 0 0 0 12px;
  font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 600;
}
.isCollapse .title {
  display: none;
  transition: all 0.5s;
}
</style>