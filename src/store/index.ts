import createId from '@/lib/createId';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)//use把store绑定到Vue.prototype上，但并未传值，等初始化组件时传值

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: {} as Tag,
    amount: '0' as string
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
    createTag: function (state,{name,type}) {
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
          for(let i=0;i<state.recordList.length;i++){
            if(state.recordList[i].tag[0] === tag.name){
              state.recordList[i].tag = [name];
            }
          }
          store.commit('saveRecords');
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
    inputNumber: function(state,event:MouseEvent) {
      const button = (event.target as HTMLButtonElement);
      const input = button.textContent as string;
      if(state.amount.length === 14){return;}
      if(state.amount === '0' && '0123456789'.indexOf(input) >= 0 ){
        state.amount = input;
        return;
      }else if(state.amount.indexOf('.') >= 0 && input === '.'){
        return;//双点特殊情况判断
      }else if(state.amount.indexOf('.') >= 0 && state.amount.length - 1 === state.amount.indexOf('.') + 2){
        return;//小数点后最多两位
      }else{state.amount += input;}//正常情况
    },
    removeNumber: function(state){
      if(state.amount.length === 1){
        state.amount = '0';
      }else{
        state.amount = state.amount.slice(0,-1);
      }
    },
    clearNumber: function(state){
      state.amount = '0';
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
