<template>
  <div class="box">
    <el-container style="height: auto;">
      <Aside class="el-aside"></Aside>
      <Header></Header>
    </el-container>
  </div>
</template>

<script>
import Aside from "components/main/aside";
import Header from "components/main/header";
export default {
  components: {
    Aside,
    Header
  },
  data () {
    return {};
  },

  methods: {}
};
</script>
<style >
.box {
  width: 100%;
  height: 100%;
  overflow: auto;
}
html,
body,
#app,
.el-container {
  /*设置内部填充为0，几个布局元素之间没有间距*/
  padding: 0px;
  /*外部间距也是如此设置*/
  margin: 0px;
  /*统一设置高度为100%*/
  height: 100%;
  min-width: 500px;
}
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px 0 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.el-aside {
  background-color: rgb(0, 21, 41);
  height: auto;
  /* width:180px; */
  width: auto;
  overflow: hidden;
}

.el-container.is-vertical {
  font-size: 14px;
}
.el-table th > .cell {
  text-align: center;
}
.el-table .cell {
  text-align: center;
}
.left_titles {
  color: #fff;
}
.el-menu {
  border: none !important;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 180px;
  min-width: 180px;
  min-height: 700px;
  background-color: #001529;
  height: auto;
  border: none !important;
}
.el-submenu__title {
  color: #999;
}
.el-submenu__title:hover {
  background-color: rgba(12, 133, 247, 0.4) !important;
}
.el-menu-item {
  color: #999;
}
.el-menu-item:hover {
  background-color: rgba(12, 133, 247, 0.4) !important;
}
.el-submenu.is-opened .el-submenu__title {
  color: #fff;
}
.el-submenu.is-opened .el-submenu__title i {
  color: #fff;
}
.el-submenu.is-active .el-submenu__title {
  color: #fff;
}
.el-submenu.is-active .el-submenu__title i {
  color: #fff;
}
</style>