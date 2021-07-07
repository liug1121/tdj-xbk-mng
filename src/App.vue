<template>
  <div id="app" @click="clicked" v-if="isRouterAlive">
    <router-view></router-view>
    <el-dialog title="超时提示" :visible.sync="cTimeDialogVisible" width="400px" center>
      <span style="color:red;">您好：您登录时间超过两个小时，需重新登录！</span>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="centerDialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="CTimeClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
window.onload = function () {
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault()
    }
  })
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault()
  })
}
export default {
  name: "app",
  provide () { // 父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    }
  },
  data () {
    return {
      cTimeDialogVisible: false,
      lastTime: null, // 最后一次点击的时间
      currentTime: null, // 当前点击的时间
      timeOut: 120 * 60 * 1000, // 设置超时时间:120分钟
      isRouterAlive: true // 控制视图是否显示的变量
    }
  },
  created () {
    //在页面加载时读取sessionStorage里的状态信息
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(
        Object.assign(
          {},
          this.$store.state,
          JSON.parse(sessionStorage.getItem("store"))
        )
      );
    }

    //在页面刷新时将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload", () => {
      sessionStorage.setItem("store", JSON.stringify(this.$store.state));
    });
    // console.log(sessionStorage.getItem("store"));

    this.lastTime = new Date().getTime()
  },
  methods: {
    reload () {
      this.isRouterAlive = false // 先关闭，
      this.$nextTick(function () {
        this.isRouterAlive = true // 再打开
      })
    },
    clicked () {
      this.currentTime = new Date().getTime() // 记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) { // 判断上次最后一次点击的时间和这次点击的时间间隔是否大于30分钟
        if (sessionStorage.getItem('token')) { // 如果是登录状态
          // this.$router.push({name: 'login'})
          this.cTimeDialogVisible = true
        } else {
          this.lastTime = new Date().getTime()
        }
      } else {
        this.lastTime = new Date().getTime() // 如果在30分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    },

    CTimeClick () {
      // 退出登录
      sessionStorage.clear();
      // location.reload();
      this.$router.push("/login");
      this.cTimeDialogVisible = false
    }
  }
};
</script>

<style>
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
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif, PingFangSC-Medium;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
  /* overflow: hidden; */
  font-size: 26px;
}
p {
  margin: 0;
}
</style>
