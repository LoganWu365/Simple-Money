<template>
  <Layout>
    <Tabs :value.sync="type" classPrefix="type" :data-source="typeList" />
    <Tabs
      :value.sync="interval"
      classPrefix="interval"
      :data-source="intervalList"
    />
  </Layout>
</template>

<script lang=ts>
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import TypeList from "@/constants/TypeList";
import IntervalList from "@/constants/IntervalList";
@Component({
  components: { Tabs },
})
export default class Statistics extends Vue {
  type = "-";
  interval = "day";

  typeList = TypeList;
  intervalList = IntervalList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: white;
    &.selected {
      background: #c4c4c4;
      &::after {
        display: none;
      }
    }
  }
  .tabs > .interval-tabs-item {
    height: 48px;
  }
}
</style>