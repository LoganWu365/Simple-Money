<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Tabs :value.sync="record.type" :data-source="typeList"/>
    <Notes field-name="备注" placeholder="在这里输入备注"  :value.sync="record.note"/>
    <Tags  :value.sync="record.tag" />
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
      if(this.record.amount === 0){
        window.alert("您输入的数字为零，请重新输入")
        return;
      }
      this.$store.commit('createRecord',this.record);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
