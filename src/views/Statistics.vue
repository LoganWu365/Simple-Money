<template>
  <Layout>
    <Tabs :value.sync="type" classPrefix="type" :data-source="typeList" />
    <div class="block">
      <el-date-picker
        v-model="selectDate"
        type="date"
        placeholder="选择日期"
        size="small">
      </el-date-picker>
    </div>
    <ol v-if="groupedList.length > 0">
      <li v-for="(group,index) in groupedList" :key="index">
        <h3 class="title">{{beautify(group.title)}}<span>￥{{group.totalAmount}}</span></h3>
        <ol>
          <li v-for="item in group.items" :key="item.createAt" class="record">
            <span>{{tagString(item.tag)}}</span>
            <span class="notes">{{item.note}}</span>
            <span>￥{{item.amount}}</span>
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
import TypeList from "@/constants/TypeList";
import dayjs from "dayjs"
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  typeList = TypeList;
      selectDate = '';

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
  tagString(tags:[]){
    return tags.length === 0 ? '' : tags.join(',');
  }
  get recordList(){
    return this.$store.state.recordList;
  }

  get groupedList(){
    const {recordList} = this;
    type Result = { title: string, total?: number, items: RecordItem[]}[]
    const newList = JSON.parse(JSON.stringify(recordList))
    .filter((item: { type: string; }) => item.type === this.type)
    .sort((a:RecordItem,b:RecordItem)=> dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf());
    if(newList.length === 0){return  [] as Result}                                
    const groupedList = [{title:dayjs(newList[0].createAt).format("YYYY-MM-DD"),items:[newList[0]],totalAmount:0}];
    for(let i=1;i<newList.length;i++){
      const current = newList[i];
      const last = groupedList[groupedList.length - 1];
      if(dayjs(current.createAt).isSame(dayjs(last.title),'day')){
        last.items.push(current);
      }else{
        groupedList.push({title:dayjs(newList[i].createAt).format("YYYY-MM-DD"),items:[newList[i]],totalAmount:0});
      }
    }
    for(let n=0;n<groupedList.length;n++){
      groupedList[n].items.reverse();
      for(let i=0;i<groupedList[n].items.length;i++){
        groupedList[n].totalAmount += groupedList[n].items[i].amount;
      }
    }
    return groupedList;
  }

  beforeCreate(){
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
.noResult {
  padding: 16px;
  text-align: center;
}
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .tabs > .interval-tabs-item {
    height: 48px;
  }
}

%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item
}
.record {
  background: white;
  @extend %item;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: #999;
}
</style>