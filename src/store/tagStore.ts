import tagListModel from "@/models/tagListModel";

export default {
    //tag store
    tagList: tagListModel.fetch(),
    findTag: (id: string) => {
        const tags = tagListModel.fetch();
        return JSON.parse(JSON.stringify(tags.filter(item => item.id === id)[0]));
    },
    createTag: () => {
        const name = window.prompt("请输入标签名");
        if (name === null) { return }
        const message = tagListModel.create(name as string);
        if (message === 'null') { window.alert("您输入的标签为空") }
        if (message === 'duplicated') { window.alert("您输入的标签已存在") }
    },
    removeTag: function (id: string) {
        tagListModel.remove(id);
        this.tagList = tagListModel.fetch();//更新全局变量
        return 'success'
    },
    updateTag: function (id: string, name: string) {
        const message = tagListModel.update(id, name);
        this.tagList = tagListModel.fetch();
        return message
    }
}