<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Notes field-name="标签名" placeholder="请输入标签名" :value.sync="tag.name" @update:value="updateTag"/>
    </div>
    <div class="button-wrapper">
      <Button>删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import tagListModel from '@/models/tagListModel';
import  Vue  from 'vue';
import {Component} from 'vue-property-decorator';
import Notes from '@/components/Money/Notes.vue';
import Button from '@/components/Button.vue'
@Component({
  components:{Notes,Button}
})
export default class EditLabels extends Vue {
  tag?: {id:string,name:string} = undefined
 created(){
    const tagId = this.$route.params.id;
    tagListModel.fetch();
    let tags = tagListModel.data;
    const tag = tags.filter(item => item.id === tagId)[0]
    if(tag){
        this.tag = tag;
    }else{
        this.$router.replace("/404")
    }
 }
 updateTag(){
  if(this.tag){
    this.tag.id = this.tag.name
    console.log(this.tag);
  }
 }
}
</script>

<style lang="scss" scoped>
  .navBar {
    text-align: center;
    font-size: 16px;
    padding: 12px 16px;
    background: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > .leftIcon {
      width: 24px;
      height: 24px;
    }
    > .rightIcon {
      width: 24px;
      height: 24px;
    }
  }
  .form-wrapper {
    background: white;
    margin-top: 8px;
  }
  .button-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 28px;
  }
</style>