import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import Layout from '@/components/Layout.vue'
import Icon from '@/components/Icon.vue'
import tagListModel from './models/tagListModel'
import recordListModel from './models/recordListModel'

Vue.component('Layout',Layout)
Vue.component('Icon',Icon)
Vue.config.productionTip = false

//recordList
window.recordList = recordListModel.fetch();
window.createRecord = (record: RecordItem)=>{
  recordListModel.create(record);
}
//tagList
window.tagList = tagListModel.fetch();

window.findTag = (id: string)=>{
  const tags = tagListModel.fetch();
  return JSON.parse(JSON.stringify(tags.filter(item => item.id === id)[0]));
}
window.createTag = ()=>{
  const name = window.prompt("请输入标签名");
  if(name === null){return}
  const message = tagListModel.create(name as string);
  if(message === 'null'){window.alert("您输入的标签为空")}
  if(message === 'duplicated'){window.alert("您输入的标签已存在")}
};

window.removeTag = (id: string)=>{
  tagListModel.remove(id);
  window.tagList = tagListModel.fetch();//更新全局变量
  return 'success'
}

window.updateTag = (id: string,name: string)=>{
  const message = tagListModel.update(id,name);
  window.tagList = tagListModel.fetch();
  return message
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
