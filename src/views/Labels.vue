<template>
    <Layout>
        <Tabs :value.sync="type" :data-source="typeList" classPrefix="label"/>
        <div class="tags">
            <router-link class="tag" v-for="tag in tagList" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <div class="iconName" ><Icon :name="tag.iconName"/></div>
                <span>{{tag.name}}</span>
                <Icon class="right" name="right"/>
            </router-link>
        </div>
        <div class="createTag-wrapper">
            <Button class="createTag" @click="addTag">新建标签</Button>
        </div>
    </Layout>
</template>

<script lang="ts">
    import Vue from "vue";
    import {Component} from 'vue-property-decorator'
    import Button from '@/components/Button.vue'
    import Tabs from "@/components/Tabs.vue";
    import typeList from "@/constants/TypeList";

    @Component({
        components:{Button,Tabs}
    })
    export default class Labels extends Vue{
        created(){
            this.$store.commit('fetchTags')
        }
        addTag(){
            this.$store.commit('createTag',this.type);
        }
        get tagList(){
            return this.$store.state.tagList.filter((item :{type:string}) => item.type === this.type)
        }
        typeList = typeList
        type = '-'
    }
</script>

<style lang="scss" scoped>
    .tags {
        background: white;
        font-size: 16px;
        margin-top: 68px;
        margin-left: 20px;
        margin-right: 20px;
        padding-left: 16px;
        padding-right: 16px;
        border-radius: 10px;
        box-shadow: 1px 1px #E1E1E0;
        > .tag {
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            .iconName {
                font-size: 25px;
            }
            .right {
                width: 18px;
                height: 18px;
                color: #4E76E5;
            }
            span {
                font-weight: bold;
            }
        }
    }
    .createTag {
        background: white;
        color: #4E76E5;
        border-radius: 8px;
        border: none;
        height: 40px;
        padding: 0 16px;
        box-shadow: 1px 1px #E1E1E0;
        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 28px;
        }
    }
    ::v-deep {
    .tabs {
        position: fixed;
        width: 100%;
        > .label-tabs-item {
        height: 48px;
        }
    }
  }
</style>