import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)
// 创建仓库实例
const store = new Vuex.Store({
  // 仓库的数据
  state: {
    userinfo: {
      id: '',
      username: '',
      token: ''
    },
    //首页的导航菜单显示隐藏
    isCollapse: false,
    openTab: [],//所有打开的路由
    activeIndex: '/main' //激活状态
  },

  // 同步修改state的值
  mutations: {
    // mutations下的方法第一个参数是固定state
    // 第二个参数是传进来的参数
    setisCollapse (state, isCollapse) {
      state.isCollapse = isCollapse;
    },
    // 添加tabs
    add_tabs (state, data) {
      this.state.openTab.push(data);
    },
    // 删除tabs
    delete_tabs (state, route) {
      let index = 0;
      for (let option of state.openTab) {
        if (option.route === route) {
          break;
        }
        index++;
      }
      this.state.openTab.splice(index, 1);
    },
    // 设置当前激活的tab
    set_active_index (state, index) {
      this.state.activeIndex = index;
    },
  },
  //异步操作，有延迟问题
  actions: {
    // setisCollapseActions: (context, allCollapse) => {
    //     context.commit('setisCollapse', allCollapse)
    // }
    // 注册方法
    // editableTabs (context, obj) {
    //   context.commit('editableTabs', obj);
    // }
  }
});

export default store;