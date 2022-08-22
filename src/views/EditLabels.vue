<template>
  <Layout>
    <div class="navBar">
      <Icon class="leftIcon" name="left" @click="goBack" />
      <span class="title">编辑标签</span>
      <span class="rightIcon"></span>
    </div>
    <div class="form-wrapper">
      <Notes
        field-name="标签名"
        placeholder="请输入标签名"
        :value.sync="tag.name"
        @blur="updateTag(tag.name)"
      />
    </div>
    <div class="button-wrapper">
      <Button @click="remove">删除标签</Button>
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
      const id = this.tag.id;
      this.$store.commit('updateTag',{id,name});
    }
  }
  remove() {
    if (this.tag) {
      this.$store.commit("removeTag",this.tag.id);
      this.$router.back();
    }
  }
  goBack() {
    this.$router.back();
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