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

  @Component({
    computed:{
      dataSource(){
        return this.$store.state.tagList
      }
    }
  })
  export default class Tags extends Vue {
    @Prop(Array)value !:string[];
    created(){
      this.$store.commit('fetchTags')
    }
    selectedTags = this.value;
    toggle(tag :string){
      const index = this.selectedTags.indexOf(tag);
      if(index >= 0){
        this.selectedTags.splice(index,1)
      }else{
        this.selectedTags = [tag];
      }
      this.$emit("update:value",this.selectedTags)
    }
    add(){
      this.$store.commit('createTag')
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