<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord" :tag="record.tag"/>
    <Notes field-name="备注：" placeholder="点击写备注哦~"  :value.sync="record.note"/>
    <Tags  :value.sync="record.tag" :type="record.type"/>
    <Tabs :value.sync="record.type" :data-source="typeList" classPrefix="money"/>
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Tabs from '@/components/Tabs.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import TypeList from '@/constants/TypeList'
  import { Component } from 'vue-property-decorator';

  @Component({
    components:{Tags,Notes,Tabs,NumberPad}
  })
  export default class Money extends Vue {
    created(){
      this.$store.commit('fetchRecords');
    }
    record: RecordItem = {
      tag: [],
      note: '',
      type: '-',
      amount: 0,//默认值
    }
    typeList = TypeList;
    saveRecord(){
      if(this.record.tag.length === 0){
        window.alert("请至少选择一个标签")
        return;
      }
      if(this.record.amount === 0){
        window.alert("您输入的数字为零，请重新输入")
        return;
      }
      this.$store.commit('createRecord',this.record);
      this.record.amount = 0;
    }
  }
</script>

<style lang="scss" scoped>
  ::v-deep {
    .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
    .money-tabs-item- {
      border-radius: 10px 0 0 10px;
    }
    .money-tabs-item\+ {
      border-radius: 0 10px 10px 0;
    }
    .tabs {
      margin-top: 10px;
      margin-left: 80px;
      margin-right: 80px;
    }
    .notes {
      font-size: 18px;
    }
  }
</style>
