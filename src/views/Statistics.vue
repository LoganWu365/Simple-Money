<template>
  <Layout>
    <Tabs :value.sync="type" classPrefix="type" :data-source="typeList" />
    <Tabs
      :value.sync="interval"
      classPrefix="interval"
      :data-source="intervalList"
    />
    <ol>
      <li v-for="(group,index) in result" :key="index">
        <h3 class="title">{{group.title}}</h3>
        <ol>
          <li v-for="item in group.items" :key="item.createAt" class="record">
            <span>{{tagString(item.tag)}}</span>
            <span class="notes">{{item.note}}</span>
            <span>￥{{item.amount}}</span>
          </li>
        </ol>
      </li>
    </ol>
  </Layout>
</template>
<script lang=ts>
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import TypeList from "@/constants/TypeList";
import IntervalList from "@/constants/IntervalList";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";

  typeList = TypeList;
  intervalList = IntervalList;

  tagString(tags:[]){
    return tags.length === 0 ? '' : tags.join(',');
  }
  get recordList(){
    return this.$store.state.recordList;
  }

  get result(){
    const {recordList} = this;
    const hashTable: {[key:string]: {title:string,items:RecordItem[]}} = {};
    for(let i = 0;i<recordList.length;i++){
      const [date,time] = recordList[i].createAt.split('T');
      hashTable[date] = hashTable[date] || {title:date,items:[]};
      hashTable[date].items.push(recordList[i]);
    }
    return hashTable;
  }

  beforeCreate(){
    this.$store.commit("fetchRecords");
  }
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
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