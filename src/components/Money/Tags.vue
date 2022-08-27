<template>
  <div class="tags">
    <ul class="current">
      <li
        v-for="tag in dataSource"
        :key="tag.id"
        :class="{ selected: selectedTags.indexOf(tag.name) >= 0 }"
      >
      <div class="iconName" @click="toggle(tag.name)"><Icon :name="tag.iconName"/></div>
        <div class="name">{{tag.name}}</div>
      </li>
      <li >
        <el-button type="text" @click="open" class="iconName add-wrapper" >
          <Icon name="add" class="add"/>
        </el-button>
        <div>
          <b>添加标签</b>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class Tags extends Vue {
  @Prop(Array) value!: string[];
  @Prop(String) type!:string;
  created() {
    this.$store.commit("fetchTags");
    this.$store.commit("saveTags");
  }
  get dataSource(){
      return this.$store.state.tagList.filter((item :{type:string}) => item.type === this.type)
  }
  selectedTags = this.value;
  toggle(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags = [tag];
    }
    this.$emit("update:value", this.selectedTags);
  }
  add() {
    this.$store.commit("createTag",this.type);
  }
   open() {
    this.$prompt('请输入标签', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      inputPattern: /^[\u4e00-\u9fa5]{1,4}$/,
      inputErrorMessage: '请输入1-4个汉字'
    }).then(({ value  }) => {
      this.$store.commit('createTag',{name:value,type:this.type});
    }).catch(() => {
      console.log("取消输入")
    });
  }  
  @Watch('type')
  onTypeChange(){
    this.selectedTags = [];
    this.$emit("update:value", this.selectedTags);
  }
}
</script>

<style lang="scss" scoped>
.tags {
  font-size: 14px;
  padding: 16px;
  padding-top: 25px;
  flex-grow: 1;
  display: flex;
  overflow: auto; 
  flex-direction: column;
  > .current {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    row-gap: 20px;
    overflow: scroll;
    > li {
      display: flex;
      flex-direction: column;
      align-items: center;
      .iconName {
        $h:50px;
        height: $h;
        width: $h;
        line-height: $h;
        border-radius: $h;
        font-size: 20px;
        text-align: center;
        background-color: #e7e7e7;
        .add {
          font-size: 25px;
          color: white;
        }
      }
      .name {
        font-weight: 600;
      }
      .add-wrapper {
        background-color: #4E76E5;
        line-height: 0;
      }
      &.selected {
        > .iconName {
        background: darken(#d9d9d9, 50%);
        color: white;
        }

      }
    }
  }
}
</style>