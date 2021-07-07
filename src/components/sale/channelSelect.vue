<template>
  <SelectTree :props="props" :options="optionData" :value="channelId" :clearable="isClearable" :accordion="isAccordion" @getValue="getValue($event)" @getChannelName='getChannelName' height="200" style="width:100%">
  </SelectTree>
</template>
<script>
import SelectTree from './treeSelect'
import API from 'api/channels'
export default {
  components: {
    SelectTree
  },
  data () {
    return {
      channelId: null,
      mineStatusValue: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      isClearable: true, // 可清空（可选）
      isAccordion: true, // 可收起（可选）
      props: {
        // 配置项（必选）
        value: "channelId",
        label: "channelName",
        children: "children"
        // disabled:true
      },
      // 选项列表（必选）
      channelTreeList: [],
    };
  },
  mounted () {
    this.getParentChannelOptions()
  },
  computed: {
    /* 转树形数据 */
    optionData () {
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
      return result;
    }
  },
  methods: {
    // 取值
    getValue (value) {
      this.channelId = value;
      this.$emit('channelSelectId', this.channelId)
    },
    getChannelName (name) {
      this.$emit('channelSelectName', name)
    },
    // 获取渠道
    getParentChannelOptions () {
      // 获取后台数据
      API.apiChannelsAllList().then(res => {
        if (res.resultCode === 0) {
          this.channelTreeList = Object.values(res.data).map(function (e) {
            return {
              channelId: e.channelId,
              channelName: e.channelName,
              manager: e.manager,
              parentChannelId: e.parentChannelId
            }
          })
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    selectChange (e) {
      var arrNew = [];
      var dataLength = this.mineStatusValue.length;
      var eleng = e.length;
      for (let i = 0; i < dataLength; i++) {
        for (let j = 0; j < eleng; j++) {
          if (e[j] === this.mineStatusValue[i].label) {
            arrNew.push(this.mineStatusValue[i])
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew);//设置勾选的值
    },
    handleCheckChange () {
      let res = this.$refs.tree.getCheckedNodes(true, true); //这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      let arrLabel = [];
      let arr = [];
      res.forEach(item => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.mineStatusValue = arr;
      this.mineStatus = arrLabel;
      // console.log('arr:' + JSON.stringify(arr))
      // console.log('arrLabel:' + arrLabel)
    }
  }
};
</script>
