<template>
  <Layout>
    <div class="wrapper">
      <div class="navBar">
        <Icon class="leftIcon" name="left" @click="goBack" />
        <span class="title">编辑标签</span>
        <span class="rightIcon"></span>
      </div>
      <div class="tagIcon"><Icon :name="tag.iconName" /></div>
      <div class="form-wrapper">
        <Notes
          field-name="标签名"
          placeholder="请输入标签名"
          :value.sync="tag.name"
          @update:value="updateTag"
          maxlength="4"
        />
      </div>
      <div class="button-wrapper">
        <el-button class="button" type="text" @click="open">删除标签</el-button>
      </div>
    </div>
    </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Notes from "@/components/Money/Notes.vue";
import Button from "@/components/Button.vue";
@Component({
  components: { Notes, Button },
})
export default class EditLabels extends Vue {
  created() {
    this.$store.commit('fetchTags');
    this.$store.commit("findTag", this.$route.params.id);
    if (!this.tag) {
      this.$router.replace("/404");
    }
  }
  get tag() {
    return this.$store.state.currentTag;
  }
  updateTag(name: string) {
    if (this.tag) {
      if(name === ''){window.alert("您输入的标签名为空，请重新输入");return;}
      const id = this.tag.id;
      this.$store.commit('updateTag',{id,name});
    }
  }
  open() {
        this.$confirm('是否确定删除此标签?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (this.tag) {
            let type = this.tag.type;
            this.$store.commit("removeTag",this.tag.id);
            this.$router.push(`/labels/${type}`);
          }          
        }).catch(() => {
            console.log("取消删除")
        });
      }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
}
.navBar {
  width: 100%;
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #4E76E5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > .title {
    color: white;
  }
  > .leftIcon {
    width: 24px;
    height: 24px;
    color: white;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.tagIcon {
  display: flex;
  width: 150px;
  height: 150px;
  border-radius: 100px;
  margin-top: 40px;
  justify-content: center;
  align-items: center;
  font-size: 100px;
  color: white;
  background-color: #585757;
}
.form-wrapper {
  background: white;
  margin-top: 40px;
  margin-left:20px;
  margin-right: 20px;
  border-radius: 15px;
}
::v-deep {
  .notes {
    padding-left: 20px;
    .name {
      font-size: 16px;
      font-weight: 600;
    }
  }
}
.button-wrapper {
  padding: 16px;
  margin-top: 28px;
  .button {
    border-radius: 4px;
    border: none;
    height: 40px;
    background-color: #F56C6C;
    color: white;
    padding: 10px 16px;
  }
}
</style>