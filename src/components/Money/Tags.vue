<template>
  <div class="tags">
    <div class="new">
      <button @click="add">新增标签</button>
    </div>
    <ul class="current">
      <li v-for="tag in dataSource" :key="tag.id" :class="{selected:selectedTags.indexOf(tag.name)>=0}" @click="toggle(tag.name)">{{tag.name}}</li>
    </ul>
  </div>

</template>

<script lang="ts">
  import Vue from 'vue'
  import {Component, Prop} from "vue-property-decorator"
  import tagListModel from '@/models/tagListModel';

  @Component
  export default class Tags extends Vue {
    @Prop(Array)value !:string[];
    selectedTags = this.value;
    dataSource = tagListModel.fetch();
    toggle(tag :string){
      const index = this.selectedTags.indexOf(tag);
      if(index >= 0){
        this.selectedTags.splice(index,1)
      }else{
        this.selectedTags.push(tag);
      }
      this.$emit("update:value",this.selectedTags)
    }
    add(){
      const name = window.prompt("请输入标签名");
      const message = tagListModel.create(name as string);
      if(message === 'null'){window.alert("您输入的标签为空")}
      if(message === 'duplicated'){window.alert("您输入的标签已存在")}
    }
  }
</script>

<style lang="scss" scoped>
  .tags {
    font-size: 14px;
    padding: 16px;
    flex-grow: 1;
    display: flex;
    flex-direction: column-reverse;
    > .current {
      display: flex;
      flex-wrap: wrap;
      > li {
        background: #d9d9d9;
        $h: 24px;
        height: $h;
        line-height: $h;
        border-radius: $h/2;
        padding: 0 16px;
        margin-right: 12px;
        margin-top: 4px;
        &.selected {
          background: darken(#d9d9d9,50%);
          color: white;
        }
      }
    }
    > .new {
      padding-top: 16px;
      button {
        background: transparent;
        border: none;
        color: #999;
        border-bottom: 1px solid;
        padding: 0 4px;
      }
    }
  }
</style>