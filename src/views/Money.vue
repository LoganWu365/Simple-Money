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
  import { Component } from 'vue-property-decorator';

  @Component({
    components:{Tags,Notes,Types,NumberPad}
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
    saveRecord(){
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
