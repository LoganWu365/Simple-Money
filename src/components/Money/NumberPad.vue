<template>
  <div class="numberPad">
    <div class="number">
      <div class="tagIcon"><Icon :name="tagName"/></div>
      <div class="output"><Icon name="rmb"/>{{output}}</div>
    </div>
    <div class="buttons">
      <button @click="inputNumber">1</button>
      <button @click="inputNumber">2</button>
      <button @click="inputNumber">3</button>
      <button @click="remove">删除</button>
      <button @click="inputNumber">4</button>
      <button @click="inputNumber">5</button>
      <button @click="inputNumber">6</button>
      <button @click="clear">清空</button>
      <button @click="inputNumber">7</button>
      <button @click="inputNumber">8</button>
      <button @click="inputNumber">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputNumber">0</button>
      <button @click="inputNumber">.</button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue'
  import { Component, Prop } from 'vue-property-decorator'


  @Component
  export default class NumberPad extends Vue {
    @Prop(Number)value!: number
    @Prop(Array)tag!: string[]
    get output(){
      return this.$store.state.amount
    }
    get tagName(){
      if(this.tag.length === 0){
        return 'empty'
      }else{
        this.$store.commit("fetchTags");
        return this.$store.state.tagList.filter((item:{name:string})=> item.name === this.tag[0])[0].iconName;
      }
    }
    inputNumber(event: MouseEvent){ 
      this.$store.commit("inputNumber",event)
    }
    remove(){
      this.$store.commit("removeNumber")
    }
    clear(){
      this.$store.commit("clearNumber")
    }
    ok(){
      this.$emit("update:value",parseFloat(this.output));
      this.$emit("submit");
    }
  }
</script>

<style lang="scss" scoped>
  @import "~@/assets/style/helper.scss";
  .numberPad {
    .number {
      @extend %innerShadow;
      display: flex;
      background: #fff;
      font-size: 36px;
      font-family: Consolas, monospace;
      padding: 0px 16px;
      justify-content: space-between;
      overflow: auto;
      .tagIcon {
        color: #333333;
      }
      .output {
        display: flex;
        align-items: center;
      }
    }
    .buttons {
      @extend %clearFix;
      > button {
        width: 25%;
        height: 64px;
        float: left;
        font-size: 18px;
        font-weight: bold;
        color: #333;
        background: #fff;
        border: none;
        &.ok {
          height: 64*2px;
          float: right;
          background: rgb(78,118,229);
          color: rgb(254,254,254);
        }
        &.zero {
          width: 25*2%;
        }
      }
    }
  }
</style>