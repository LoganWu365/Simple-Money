<template>
  <div>
    <label class="notes">
      <span class="name">{{fieldName}}</span>
      <input type="text" :placeholder="placeholder" v-model="noteContent">
    </label>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop, Watch } from 'vue-property-decorator'
  
  @Component
  export default class Notes extends Vue{
    @Prop({required:true})value!: string;
    @Prop({required:true})fieldName!:string;
    @Prop()placeholder?:string
    noteContent = this.value;
    @Watch('noteContent')
    onNoteContentChanged(value: string){
      this.$emit("update:value",value);
    }
  }
</script>

<style lang="scss" scoped>
  .notes {
    font-size: 14px;
    padding-left: 16px;
    display: flex;
    align-items: center;
    .name {
      padding-right: 16px;
    }
    input {
      height: 48px;
      flex-grow: 1;
      background: transparent;
      border: none;
      padding-right: 16px;
    }
  }
</style>