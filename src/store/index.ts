import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)//use把store绑定到Vue.prototype上，但并未传值，等初始化组件时传值

const store = new Vuex.Store({
  state: {
    recordList: [] as RecordItem[]
  },
  mutations: {
    createRecord: function (state,record: RecordItem) {
      record.createAt = new Date();
      const deepClone = JSON.parse(JSON.stringify(record));
      state.recordList.push(deepClone);
      store.commit('saveRecords');
    },
    saveRecords: function (state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList));
    },
    fetchRecords: function (state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
      return state.recordList;
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
