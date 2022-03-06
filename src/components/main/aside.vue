<template>
  <div>
    <div class="logo" :class="{'isCollapse':isCollapse}">
      <!-- <img  src="@/assets/images/logo_union.png" /> -->
      <b class="title">流量运营平台</b>
    </div>
    <!-- <div class="company">南京天地杰实业有限公司</div> -->
    <el-menu :default-active="path" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" @select="handlselect" background-color="#001529" active-background-color="#1890ff" router active-text-color="#fff"
      :collapse="isCollapse" :unique-opened="true" :default-openeds="openedMenus">
      <el-submenu index="root-xbk" v-show="xuebakaMenus.length > 0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>学霸卡</span>
        </template>
        <template v-for="(item, index) in xuebakaMenus">
          <el-submenu v-if="item.children" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.path">
              <i :class="subitem.icon"></i>
              {{subitem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-submenu index="root-device" v-show="deviceMenus.length > 0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>设备管理</span>
        </template>
        <template v-for="(item, index) in deviceMenus">
          <el-submenu v-if="item.children" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.path">
              <i :class="subitem.icon"></i>
              {{subitem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-submenu index="root-groupControl" v-show="groupControlMenus.length > 0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>群控管理</span>
        </template>
        <template v-for="(item, index) in groupControlMenus">
          <el-submenu v-if="item.children" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.path">
              <i :class="subitem.icon"></i>
              {{subitem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-submenu index="root-bigflow" v-show="bigflowMenus.length > 0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>大流量卡</span>
        </template>
        <template v-for="(item, index) in bigflowMenus">
          <el-submenu v-if="item.children" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.path">
              <i :class="subitem.icon"></i>
              {{subitem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>

      <el-submenu index="root-sys" v-show="sysMenus.length > 0">
        <template slot="title">
          <i class="el-icon-s-home"></i>
          <span>系统管理</span>
        </template>
        <template v-for="(item, index) in sysMenus">
          <el-submenu v-if="item.children" :index="item.path" :key="index">
            <template slot="title">
              <i :class="item.icon"></i>
              <span>{{item.title}}</span>
            </template>
            <el-menu-item v-for="(subitem,subindex) in item.children" :key="subindex" :index="subitem.path">
              <i :class="subitem.icon"></i>
              {{subitem.title}}
            </el-menu-item>
          </el-submenu>
          <el-menu-item v-else :index="item.path" :key="index">
            <i :class="item.icon"></i>
            <span v-show="!isCollapse">{{item.title}}</span>
          </el-menu-item>
        </template>
      </el-submenu>
      </el-menu>
      <!-- <div class="company">Copyright ©2019 南京天地杰实业有限公司 All Rights Reserved 苏ICP备18059126号-1</div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";
import AsideData from "components/main/asides.js";
export default {
  data () {
    return {
      path: "",
      // nav_menu_data: AsideData.nav_menu_data,
      nav_menu_data:[],
      xuebakaMenus:[],
      deviceMenus:[],
      groupControlMenus:[],
      bigflowMenus:[],
      sysMenus:[],
      userType: null,
      menuShow: false,
      usingInDevice: null,
      usingInXuebaka:null,
      openedMenus:[]
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
    this.usingInXuebaka = window.sessionStorage.getItem('usingInXuebaka')
    this.nav_menu_data = JSON.parse(window.sessionStorage.getItem('AuthMenus'))
    this.xuebakaMenus = this.nav_menu_data.filter(menu=>{
      if(menu.type == 0){
        return true
      }
      return false
    })
    this.deviceMenus = this.nav_menu_data.filter(menu=>{
      if(menu.type == 3){
        return true
      }
      return false
    })
    this.groupControlMenus = this.nav_menu_data.filter(menu=>{
      if(menu.type == 4){
        return true
      }
      return false
    })
    this.bigflowMenus = this.nav_menu_data.filter(menu=>{
      if(menu.type == 1){
        return true
      }
      return false
    })
    this.sysMenus = this.nav_menu_data.filter(menu=>{
      if(menu.type == 10){
        return true
      }
      return false
    })
  },
  methods: {
    onRouteChanged () {
      // let that = this;
      // that.path = that.$route.path;
    },
    handleOpen (key, keyPath) {
      if(key === 'root-xbk'){
        this.openedMenus = ['root-xbk', key]
      } else if(key === 'root-device'){
        this.openedMenus = ['root-device', key]
      }else if(key === 'root-groupControl'){
        this.openedMenus = ['root-groupControl', key]
      }else if(key === 'root-bigflow'){
        this.openedMenus = ['root-bigflow', key]
      }else if(key === 'root-sys'){
        this.openedMenus = ['root-sys', key]
      } 
    },
    handleClose (key, keyPath) {

    },
    handlselect (index, indexPath) {

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
  color: #1890ff !important;
  /* background-color: #1890ff !important; */
}
.logo {
  height: 60px;
  position: relative;
  /* line-height: 54px; */
  transition: all 1s;
  /* background: white; */
  width: 100%;
  overflow: hidden;
  /* padding-left:23px; */
  text-align: center;
}
.logo > img {
  width: 100%;
  height: 60px;
  position: relative;
  /* top: 8px; */
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
.company{
  height: 30px;
  bottom:0;
  text-align: center;
  font-size: 5px;
  color:silver;
}
</style>