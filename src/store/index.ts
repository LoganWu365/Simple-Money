import createId from '@/lib/createId';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)//use把store绑定到Vue.prototype上，但并未传值，等初始化组件时传值

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: {} as Tag
  },
  mutations: {
    createRecord: function (state, record: RecordItem) {
      record.createAt = new Date().toISOString();
      const deepClone = JSON.parse(JSON.stringify(record));
      state.recordList.push(deepClone);
      store.commit('saveRecords');
      window.alert("记账成功");
    },
    saveRecords: function (state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchRecords: function (state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    findTag: function (state, id: string) {
      state.currentTag = JSON.parse(JSON.stringify(state.tagList.filter(item => item.id === id)[0]));
    },
    createTag: function (state,type) {
      const name = window.prompt("请输入标签名");
      if (name === null) { return }
      if (name === '') {
        window.alert("您输入的标签为空");
        return;
      }
      const nameList = state.tagList.map(item => item.name)
      if (nameList.indexOf(name) >= 0) {
        window.alert("您输入的标签已存在");
        return;
      }//返回字符串判断错误信息
      const id = createId().toString();
      const newTag: Tag = {
        id: id,
        name: name,
        iconName: 'star',
        type: type
      };
      state.tagList.push(newTag);
      store.commit('saveTags');
    },
    updateTag: function (state,{id,name}) {
      const idList = state.tagList.map(tag => tag.id);
      if (idList.indexOf(id) >= 0) {
        const nameList = state.tagList.map(tag => tag.name);
        if (nameList.indexOf(name) < 0) {
          const tag = state.tagList.filter(tag => tag.id === id)[0];
          tag.name = name;
          store.commit('saveTags');
        } else {
          window.alert("此标签已存在");
        }
      } else {
        return ;
      }
    },
    removeTag: function (state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      state.tagList.splice(index, 1);
      store.commit('saveTags');
    },
    saveTags: function (state) {
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList));
    },
    fetchTags: function (state) {
      state.tagList = JSON.parse(window.localStorage.getItem('tagList') || `[
        { "id": "0", "name": "一般","iconName":"normal","type":"-"},
        { "id": "1", "name": "餐饮","iconName":"food","type":"-"},
        { "id": "2", "name": "购物","iconName":"shop","type":"-"},
        { "id": "3", "name": "服饰","iconName":"cloth","type":"-"},
        { "id": "4", "name": "工资","iconName":"pay","type":"+"},
        { "id": "5", "name": "投资","iconName":"invest","type":"+"},
        { "id": "6", "name": "奖金","iconName":"award","type":"+"},
        { "id": "7", "name": "副业","iconName":"partTime","type":"+"},
        { "id": "8", "name": "股票","iconName":"stock","type":"+"}
      ]`) as Tag[]
    },
  },
  actions: {
  },
  modules: {
  }
})

export default store
