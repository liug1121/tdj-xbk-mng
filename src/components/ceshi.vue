<template>
  <div class="ele_test_box">
    <!-- 常用效果 Popover 弹出框组件 具体属性查看官方文档-->
    <el-popover placement="bottom" title="标题" width="400" trigger="click" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <span>11111111111111111</span> <!-- 利用分发取代content属性 可以嵌套表单表格按钮等组件-->
      <el-button slot="reference">click 激活</el-button>
    </el-popover>
    <!-- Carousel 走马灯组件 -->
    <el-carousel :interval="3000" type="card" height="200px">
      <el-carousel-item v-for="item in 4" :key="item">
        <h3>{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
    <!-- Collapse 折叠面板 -->
    <el-collapse v-model="activeIndex" @change="handleChange">
      <el-collapse-item title="第一块面板（操作互不干扰）" name="1">
        <div>第一块的内容是在这里</div>
        <div>通过accordion属性来设置是否以手风琴模式显示。</div>
      </el-collapse-item>
      <el-collapse-item title="第二块面板（操作互不干扰）" name="2">
        <div>第二块的内容是在这里</div>
      </el-collapse-item>
      <el-collapse-item title="第三块面板（操作互不干扰）" name="3">
        <div>第三块的内容是在这里</div>
      </el-collapse-item>
      <el-collapse-item>
        <template slot="title">
          <i class="header-icon el-icon-caret-left"></i>第四块的内容是在这里<i class="header-icon el-icon-caret-right"></i>
        </template>
        <div>除了可以通过title属性以外,还可以通过具名slot来实现自定义面板的标题内容，以实现增加图标等效果</div>
      </el-collapse-item>
    </el-collapse>
    <div>分别通过<span style="color: red">(default-expanded-keys)和(default-checked-keys)</span>设置默认展开和默认选中的节点,需要注意的是,此时必须设置<span style="color: red">(node-key)</span>,其值为节点数据中的一个字段名,该字段在整棵树中是唯一的.</div>
    <el-tree :data="data2" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]" :props="defaultProps">
    </el-tree>
    <div style="margin-top: 30px;">
      <el-button type="primary" @click="goNextPage">跳转页面</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeIndex: ['1'], // 默认展开第一块
      data2: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2',
          disabled: true // 通过disabled设置禁用状态
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    handleChange (val) {
      console.log(val)
    },
    // 跳转下一页面
    goNextPage () {
      this.$router.push({ name: 'tableTest' })
    }
  }
}

</script>
<style scoped>
.el-carousel__item h3 {
  color: #fff;
  font-size: 24px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #333;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #ff9933;
}
</style>
