<template>
  <div>
    <ul class="tabs">
      <li
        v-for="item in dataSource"
        :key="item.text"
        @click="select(item)"
        :class="liClass(item)"
      >
        {{ item.text }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({ required: true, type: Array }) dataSource!: DataSourceItem[];
  @Prop(String) value!: string;
  @Prop(String) classPrefix?: string;

  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.value,
      [this.classPrefix + "-tabs-item" + item.value]: this.classPrefix,
      [this.classPrefix + "-tabs-item"]: this.classPrefix,
    };
  }

  select(item: DataSourceItem) {
    this.$emit("update:value", item.value);
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  text-align: center;
  font-size: 18px;
  > li {
    width: 50%;
    height: 40px;
    display: flex;
    background: rgb(254, 254, 254);
    color: rgb(79,119,230);
    justify-content: center;
    align-items: center;
    position: relative;
    &.selected {
      background: rgb(78,118,229);
      color: rgb(254,254,254);
      overflow: hidden;
    }
  }
}
</style>