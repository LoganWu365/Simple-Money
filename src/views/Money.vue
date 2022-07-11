<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount" @submit="saveRecord"/>
    <Types :value.sync="record.type"/>
    <Notes :value.sync="record.note"/>
    <Tags :dataSource.sync="tags" :value.sync="record.tag" />
    {{record}}
  </Layout>
</template>

<script lang="ts">
  import Vue from 'vue'
  import NumberPad from '@/components/Money/NumberPad.vue';
  import Types from '@/components/Money/Types.vue';
  import Notes from '@/components/Money/Notes.vue';
  import Tags from '@/components/Money/Tags.vue';
  import { Component,Watch } from 'vue-property-decorator';
  import model from '@/model';

  @Component({
    components:{Tags,Notes,Types,NumberPad}
  })
  export default class Money extends Vue {
    tags=['衣','食','住','行']//默认tag
    recordList = model.fetch();
    record: RecordItem = {
      tag: [],
      note: '',
      type: '-',
      amount: 0,//默认值
    }

    saveRecord(){
      this.record.createAt = new Date();
      let deepClone = model.clone(this.record);
      this.recordList.push(deepClone);
      console.log(this.recordList);
    }
    @Watch('recordList')
    onRecordListChange(){
      model.save(this.recordList);
    }
  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
