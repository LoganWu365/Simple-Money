<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes field-name="备注" placeholder="在这里输入备注"  :value.sync="record.note"/>
    <Tags  :value.sync="record.tag" />
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import { Component,Watch } from 'vue-property-decorator';
  import recordListModel from '@/models/recordListModel';

  @Component({
    components:{Tags,Notes,Types,NumberPad}
  })
  export default class Money extends Vue {
    recordList = recordListModel.fetch();
    record: RecordItem = {
      tag: [],
      note: '',
      type: '-',
      amount: 0,//默认值
    }

    saveRecord(){
      this.record.createAt = new Date();
      let deepClone = recordListModel.clone(this.record);
      this.recordList.push(deepClone);
    }
    @Watch('recordList')
    onRecordListChange(){
      recordListModel.save();
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
