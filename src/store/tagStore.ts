import createId from '@/lib/createId'

const tagStore = {
    tagList: [] as Tag[],
    findTag: function(id: string){
        return JSON.parse(JSON.stringify(this.tagList.filter(item => item.id === id)[0]));
    },
    createTag: function(){
        const name = window.prompt("请输入标签名");
        if (name === null) {return }
        if(name === ''){
            window.alert("您输入的标签为空");
            return "null"
        }
        const nameList = this.tagList.map(item => item.name)
        if(nameList.indexOf(name) >= 0){
            window.alert("您输入的标签已存在");
            return "duplicated"
        }//返回字符串判断错误信息
        const id = createId().toString();
        const newTag: Tag = {
            id: id,
            name: name
        }
        this.tagList.push(newTag);
        this.saveTags();
        return 'success';
    },
    removeTag: function (id: string) {
        let index = -1;
        for(let i = 0;i<this.tagList.length;i++){
            if(this.tagList[i].id === id){
                index = i;
                break;
            }
        }
        this.tagList.splice(index,1);
        this.saveTags();
        return 'success'
    },
    updateTag: function (id: string, name: string) {
        const idList = this.tagList.map(tag => tag.id);
        if(idList.indexOf(id) >= 0){
            const nameList = this.tagList.map(tag => tag.name);
            if(nameList.indexOf(name) < 0){
                const tag = this.tagList.filter(tag => tag.id === id)[0];
                tag.name = name;
                this.saveTags();
                return 'success';
            }else{
                window.alert("此标签已存在");
                return 'duplicated';
            }
        }else{
            return 'not found';
        }
    },
    fetchTags: function(){
        this.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]') as Tag[]
        return this.tagList;
    },
    saveTags: function(){
        window.localStorage.setItem('tagList',JSON.stringify(this.tagList));
    }
}

tagStore.fetchTags();

export default tagStore