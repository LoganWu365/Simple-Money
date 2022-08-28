<template>
  <Layout>
    <div class="datePicker-wrapper">
      <select name="datePicker" v-model="year" class="datePicker">
          <option value="2021">2021年</option>
          <option value="2022">2022年</option>
          <option value="2023">2023年</option>
      </select>
      <select name="datePicker" v-model="month" class="datePicker">
          <option value="12">12月</option>
          <option value="11">11月</option>
          <option value="10">10月</option>
          <option value="09">9月</option>
          <option value="08">8月</option>
          <option value="07">7月</option>
          <option value="06">6月</option>
          <option value="05">5月</option>
          <option value="04">4月</option>
          <option value="03">3月</option>
          <option value="02">2月</option>
          <option value="01">1月</option>
      </select>
    </div>
    <div class="total-wrapper">
      <div class="total">
        <span class="total-word">总计结余</span>
        <div class="total-number">{{allMonth.add-allMonth.pay}}</div>
      </div>
      <div class="all">
        <div class="all-flex">
          <div class="all-word add">总收入</div>
          <span>{{allMonth.add}}</span>
        </div>
        <div class="all-flex">
          <div class="all-word pay">总支出</div>
          <span>{{allMonth.pay}}</span>
        </div>
      </div>
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>{{setDay(group.title)}}</span>
          <span>收入￥{{group.totalAdd}}</span>
          <span>支出￥{{group.totalPay}}</span>
        </h3>
        <ol class="recordList">
          <li v-for="item in group.items" :key="item.createAt" class="record">
            <div class="icon-wrapper">
              <Icon :name="tagIconName(item.tag[0])" class="icon"/>
            </div>
            <div class="record-notes">
              <span class="tagName">{{tagString(item.tag)}}</span>
              <span class="notes">{{item.note}}</span>
            </div>
            <span class="amount" :class="{addAmount:item.type === '+',payAmount:item.type==='-'}">￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">没有相关记录</div>
  </Layout>
</template>
<script lang=ts>
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import dayjs from "dayjs"
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  selectDate = '';
  year = dayjs().format("YYYY");
  month = dayjs().format("MM");
  beautify(time:string){
    const day = dayjs(time);
    const now = dayjs();
    if(day.isSame(now,'day')){
      return "今天";
    }else if(day.isSame(now.subtract(1,'day'),'day')){
      return "昨天";
    }else if(day.isSame(now.subtract(2,'day'),'day')){
      return "前天";
    }else if(!day.isSame(now,'year')){
      return day.format("YYYY年M月D日")
    }else {
      return day.format("M月D日")
    }
  }
  setDay(time:string){
    const day = dayjs(time).day();
    switch (day) 
    { 
      case 0:return"周日"; 
      case 1:return"周一"; 
      case 2:return"周二"; 
      case 3:return"周三"; 
      case 4:return"周四"; 
      case 5:return"周五"; 
      case 6:return"周六"; 
    }
  }
  tagString(tags:[]){
    return tags.length === 0 ? '' : tags.join(',');
  }
  get recordList(){
    return this.$store.state.recordList;
  }
  tagIconName(name:string){
    const tagIconName = this.$store.state.tagList.filter((item: { name: string; }) => item.name === name)[0];
    if(tagIconName){
      return tagIconName.iconName;
    }else {return 'star'}
  }
  get groupedList(){
    const {recordList} = this;
    type Result = { title: string,  items: RecordItem[],totalAdd: number,totalPay:number}[]
    const newList = JSON.parse(JSON.stringify(recordList))
    .filter((item: { createAt: string|number|dayjs.Dayjs|Date|null|undefined; }) => dayjs(this.year+'-'+this.month).isSame(dayjs(item.createAt),'month'))
    .sort((a:RecordItem,b:RecordItem)=> dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if(newList.length === 0){return  [] as Result}                                
    const groupedList = [{title:dayjs(newList[0].createAt).format("YYYY-MM-DD"),items:[newList[0]],totalAdd:0,totalPay:0}];
    for(let i=1;i<newList.length;i++){
      const current = newList[i];
      const last = groupedList[groupedList.length - 1];
      if(dayjs(current.createAt).isSame(dayjs(last.title),'day')){
        last.items.push(current);
      }else{
        groupedList.push({title:dayjs(newList[i].createAt).format("YYYY-MM-DD"),items:[newList[i]],totalAdd:0,totalPay:0});
      }
    }
    for(let n=0;n<groupedList.length;n++){
      groupedList[n].items.reverse();
      for(let i=0;i<groupedList[n].items.length;i++){
        if(groupedList[n].items[i].type === '-'){
            groupedList[n].totalPay += groupedList[n].items[i].amount;
        }else if(groupedList[n].items[i].type === '+'){
            groupedList[n].totalAdd += groupedList[n].items[i].amount;
        }
      }
    }
    return groupedList;
  }
  get allMonth(){
    let allMonthAdd = 0;
    let allMonthPay = 0;
    this.groupedList.forEach(item => allMonthAdd += item.totalAdd)
    this.groupedList.forEach(item => allMonthPay += item.totalPay)
    return {
      add:allMonthAdd,
      pay:allMonthPay
    }
  }
  beforeCreate(){
    this.$store.commit("fetchRecords");
    this.$store.commit("fetchTags");
  }
}
</script>

<style lang="scss" scoped>
.datePicker-wrapper {
  height: 45px;
  padding:5px 16px;
  line-height: 45px;
  background-color: #fff;
  .datePicker {
    border: none;
    color: #4F77E7;
    font-size:24px;
    margin-right: 20px;
    background-color: white;
  }
}
.total-wrapper {
  margin: 22px 16px 25px;
  padding: 28px 19px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 4px 7px rgba(155, 142, 142, 0.25);
  overflow: auto;
  .total {
    margin-bottom: 20px;
    &-word {
      font-size: 14px;
      color: #575757;
    }
    &-number {
      margin-top: 5px;
      font-size: 25px;
      font-weight: bold;
      color: #343434;
    }
  }
  .all {
    display: flex;
    color: #767676;
    &-flex {
      display: flex;
      align-content: center;
      margin-right: 28px;
      .all-word {
        width: 45px;
        height: 20px;
        font-size: 12px;
        line-height: 20px;
        text-align: center;
        color: #fff;
        border-radius: 10px;
      }
      span {
        display: block;
        line-height: 20px;
        margin-left: 9px;
      }
      .add {
        background-color: #91D781;
      }
      .pay {
        background-color: #FF9391;
      }
    }
    &-pay {
      display: flex;
    }
  }
}
.noResult {
  padding: 16px;
  text-align: center;
}


%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  align-content: center;
  color: #767676;
  font-size: 14px;
}
.title {
  padding: 10px 22px 0px;
  font-weight: 400;
  justify-content: space-between;
  color: #343D4E;
  @extend %item
}
.recordList {
  margin-top: 5px;
}
.record {
  @extend %item;
  align-items: center;
  background: white;
  border-radius: 10px;
  margin: 0px 16px 10px;
  .icon-wrapper {
    width: 50px;
    height: 50px;
    background-color: #343D4E;
    display: flex;
    border-radius: 50px;
    align-items: center;
    justify-content: center;
    color: #fff;
    .icon {
      font-size: 30px;
    }
  }
  &-notes {
    display: flex;
    flex-direction: column;
    margin-left: 22px;
    color: #343D4E;
    .tagName {
      font-weight: bold;
    }
    .notes {
      font-size: 12px;
      color: #767676;
}
  }
  .amount {
    color: #343D4E;
    font-weight: bold;
    margin-left: auto;
  }
  .addAmount {
    color: #91D781;
  }
  .payAmount {
    color: #FF9391;
  }
}
</style>