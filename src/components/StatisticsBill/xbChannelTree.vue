<template>
  <el-card>
    <el-input placeholder="输入关键字进行过滤" v-model="filterText">
    </el-input>
    <el-tree v-loading="loading" class="filter-tree" :data="channelTree" :props="defaultProps" :filter-node-method="filterNode" node-key="channelId" ref="tree" @node-click="handleNodeClick" style="margin-top:10px;"
      :default-expanded-keys="[2]">
    </el-tree>
  </el-card>
</template>

<script>
import API from 'api/channels'
export default {
  data () {
    return {
      filterText: '',
      // channelTree: [],
      defaultProps: {
        // children: 'channelsChild',
        // label: 'channelName'
        children: 'children',
        label: 'channelName',
        id: 'channelId'
      },
      channelTreeList: [],
      channelId: '',
      loading: false
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    }
  },
  mounted () {
    this.getChannelTree()
  },
  computed: {
    /* 转树形数据 */
    channelTree () {
      let jsonData = JSON.parse(JSON.stringify(this.channelTreeList))
      var result = [], temp = {}, i = 0, j = 0, len = jsonData.length
      for (; i < len; i++) {
        temp[jsonData[i]['channelId']] = jsonData[i] // 以id作为索引存储元素，可以无需遍历直接定位元素
      }
      for (; j < len; j++) {
        var currentElement = jsonData[j]
        var tempCurrentElementParent = temp[currentElement['parentChannelId']] // 临时变量里面的当前元素的父元素 parentId 父级ID
        if (tempCurrentElementParent) { // 如果存在父元素
          if (!tempCurrentElementParent['children']) { // 如果父元素没有chindren键
            tempCurrentElementParent['children'] = [] // 设上父元素的children键
          }
          tempCurrentElementParent['children'].push(currentElement) // 给父元素加上当前元素作为子元素
        } else { // 不存在父元素，意味着当前元素是一级元素
          result.push(currentElement);
        }
      }
      const channel = result[0]
      this.$emit("channelChick", channel);
      return result;
    }
  },
  methods: {
    // 获取所有渠道
    getChannelTree () {
      this.loading = true
      API.apiChannelsAllList().then(res => {
        if (res.resultCode === 0) {
          // var treeList = res.data.filter((item) => {
          //   if (item.parentChannelId !== 0) {
          //     return item
          //   }
          // })
          this.channelTreeList = Object.values(res.data).map(function (e) {
            return {
              channelId: e.channelId,
              channelName: e.channelName,
              manager: e.manager,
              parentChannelId: e.parentChannelId
            }
          })
          this.channelTreeList.sort((a, b) => {
            return a['channelName'].localeCompare(b['channelName'])  //index是list你需要索引的字段名称
          })
          this.loading = false
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    filterNode (value, data) {
      if (!value) return true;
      return data.channelName.indexOf(value) !== -1
    },
    // 点击 TREE 获取数据
    handleNodeClick (data) {
      const channelsID = data.channelId
      const channelName = data.channelName
      this.$emit("getChannelId", channelsID, channelName)
    }
  }
}
</script>