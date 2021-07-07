<template>
  <div class="about">
    <p>瀑布流，实现瀑布流布局，当删除瀑布流中的一个数据时，剩余的自动重新布局</p>
    <div class="page">
      <div class="content" v-for="(item, index) in ManageStrategys" :key="item.id" :style="{width: waterfallW + 'px', left: item.left + 'px', top: item.top + 'px'}" ref="col" @click="clickMe(index)">
        <!-- <img :src="item.image" alt=""> -->
        <div style="height:100px">{{item.name}}</div>
        <div>{{item.startDate}}</div>
      </div>
    </div>
  </div>
</template>
<script>
const gap = 10;
let leftH = 0;
let rightH = 0;
// const itemTop = [];
import API from 'api/groupControl'
export default {
  data () {
    const list = [
      {
        image:
          'http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180',
        // imgH: 122,
        title: '标题只有1行哦长砍',
        desc: 'Bon Cake(徐家汇店)这家店不要条好吃啊',
        praiseNum: 322,
        top: 0,
        left: 0,
        itemH: 0,
      },
      {
        image:
          'http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180',
        // imgH: 334,
        title: '标题只有1行哦长砍标题只有1行哦长砍标题只有1行哦长砍',
        desc:
          'Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店',
        praiseNum: 32232,
        top: 0,
        left: 0,
        itemH: 0,
      },
      {
        image:
          'http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180',
        // imgH: 173,
        title: '标题只有1行哦长砍',
        desc:
          'Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店',
        praiseNum: 32,
        top: 0,
        left: 0,
        itemH: 0,
      },
      {
        image:
          'http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180',
        // imgH: 225,
        title: '标题只有1行哦长砍',
        desc: 'Bon Cake(徐家汇店)这家店',
        praiseNum: 32,
        top: 0,
        left: 0,
        itemH: 0,
      },
      {
        image:
          'http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180',
        // imgH: 89,
        title: '标题只有1行哦长砍',
        desc:
          'Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店Bon Cake(徐家汇店)这家店',
        praiseNum: 32,
        top: 0,
        left: 0,
        itemH: 0,
      },
      {
        image:
          'http://img-agc.iqianggou.com/0a62fca1eeab88e894b93539c35446ec!180x180',
        // imgH: 112,
        title: '标题只有1行哦长砍',
        desc: 'Bon Cake(徐家汇店)这家店',
        praiseNum: 32,
        top: 0,
        left: 0,
        itemH: 0,
      },
    ];
    return {
      list,
      list1: [],
      list2: [],
      initLeft: '',
      waterfallW: '',
      screenWidth: document.body.clientWidth, // 屏幕宽度
      ManageStrategys: []
    };
  },
  computed: {},
  created () {
    this.waterfallW = (this.screenWidth - 30) / 2;
    this.initLeft = (this.screenWidth - this.waterfallW) / 2;
  },
  mounted () {
    this.getGroupcontrolManageStrategys()
    const nodeList = this.$refs.col;
    this.doSort(nodeList);
  },
  methods: {
    getGroupcontrolManageStrategys () {
      const data = {
        groupId: null,
        iccids: [],
        names: [],
        organizationIds: [],
        phones: [],
        terms: []
      }
      API.apiGroupcontrolManageStrategys(data).then(res => {
        if (res.resultCode === 0) {
          this.ManageStrategysNew = res.data.reverse()
          const tempData = JSON.parse(JSON.stringify(this.ManageStrategysNew))
          const reduceDataFunc = (data) => {
            data.map((m) => {
              m.top = 0
              m.left = 0
              m.itemH = 0
            })
          }
          reduceDataFunc(tempData, 1)
          this.ManageStrategys = tempData
        } else {
          this.$message.error(res.resultInfo)
        }
      })
    },
    doSort (nodeList) {
      for (let i = 0; i < nodeList.length; i++) {
        nodeList[i].style.position = 'absolute';
        const domHeight = nodeList[i].clientHeight;
        let top;
        let left;
        let itemH;
        if (leftH > rightH) {
          left = gap * 2 + this.waterfallW;
          top = rightH + gap;
          itemH = domHeight;
          rightH += gap + domHeight;
        } else {
          left = gap;
          top = leftH + gap;
          itemH = domHeight;
          leftH += gap + domHeight;
        }
        this.ManageStrategys[i].top = top;
        this.ManageStrategys[i].left = left;
        this.ManageStrategys[i].itemH = itemH;
        this.ManageStrategys[i].itemW = this.waterfallW;
      }
    },
    clickMe (index) {
      // this.list.splice(index, 1);
      const renderedList = this.ManageStrategys.slice(0, index);
      const afreshRenderList = this.ManageStrategys.slice(index + 1);
      if (this.ManageStrategys[index].left > gap) {
        rightH = this.ManageStrategys[index].top - gap; // 被删除数据列的无需重排数据的高度
        leftH = this.checkHeight(renderedList, 'left');
      } else {
        rightH = this.checkHeight(renderedList, 'right');
        leftH = this.ManageStrategys[index].top - gap;
      }
      const newList = this.restartSort(afreshRenderList);
      this.ManageStrategys = [...renderedList, ...newList];
    },
    // 查找不需要重新排列的数据中非被删除列的高度
    checkHeight (list, col) {
      let needHeight = 0;
      for (let i = 0; i < list.length; i++) {
        if (col == 'left' && list[i].left == gap && list[i].top > needHeight) {
          needHeight = list[i].top + list[i].itemH;
        } else if (
          col == 'right' &&
          list[i].left > gap &&
          list[i].top > needHeight
        ) {
          needHeight = list[i].top + list[i].itemH;
        }
      }
      return needHeight;
    },
    //重新排列列表中被删除数据之后的所有数据
    restartSort (list) {
      const newList = list;
      newList.forEach(function (item) {
        if (leftH > rightH) {
          item.left = gap * 2 + item.itemW;
          item.top = rightH + gap;
          rightH += gap + item.itemH;
        } else {
          item.left = gap;
          item.top = leftH + gap;
          leftH += gap + item.itemH;
        }
      });
      return newList;
    },
  },
};
</script>
<style scoped>
.page {
  position: relative;
  width: 100%;
  height: 100%;
}

.content {
  /* position: fixed; */
  /* top: 100%; */
}

.content img {
  display: block;
  width: 100%;
  height: 100%;
}
</style>