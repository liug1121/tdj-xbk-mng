<template>
  <div>
    <el-container>
      <el-aside width="300px">
        <zgzAside></zgzAside> <!-- 我是侧边栏 -->
      </el-aside>
      <el-container>
        <el-main>
          <zgzTabs></zgzTabs> <!-- 我是tabs组件 -->
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import zgzAside from './main/test'
import zgzTabs from './main/tabs'
export default {
  data () {
    return {}
  },
  components: {
    zgzAside,
    zgzTabs
  }
}
</script>