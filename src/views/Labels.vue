<template>
    <Layout>
        <div class="tags">
            <router-link class="tag" v-for="tag in tagList" :key="tag.id" :to="`/labels/edit/${tag.id}`">
                <span>{{tag.name}}</span>
                <Icon name="right"/>
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
    import tagListModel from '@/models/tagListModel'
    import Button from '@/components/Button.vue'

    @Component({
        components:{Button}
    })
    export default class Labels extends Vue{
        tagList = window.tagList;
        addTag(){
          const name = window.prompt("请输入标签名");
          if(name === null){return}
          const message = tagListModel.create(name as string);
          if(message === 'null'){window.alert("您输入的标签为空")}
          if(message === 'duplicated'){window.alert("您输入的标签已存在")}
        }
    }
</script>

<style lang="scss" scoped>
    .tags {
        background: white;
        font-size: 16px;
        padding-left: 16px;
        padding-right: 16px;
        > .tag {
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid #e6e6e6;
            svg {
                width: 18px;
                height: 18px;
                color: #666;
            }
        }
    }
    .createTag {
        background: #767676;
        color: white;
        border-radius: 4px;
        border: none;
        height: 40px;
        padding: 0 16px;
        &-wrapper {
            text-align: center;
            padding: 16px;
            margin-top: 28px;
        }
    }
</style>