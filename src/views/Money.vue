<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amount"/>
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
  import { Component } from 'vue-property-decorator';
  type Record = {
    tag: string[],
    note: string,
    type: string,
    amount: number
  }
  @Component({
    components:{Tags,Notes,Types,NumberPad}
  })
  export default class Money extends Vue {
    tags=['衣','食','住','行']//默认tag
    record: Record = {
      tag: [],
      note: '',
      type: '-',
      amount: 0//默认值
    }

  }
</script>

<style lang="scss">
  .layout-content {
    display: flex;
    flex-direction: column-reverse;
  }
</style>
