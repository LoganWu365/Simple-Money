import createId from '@/lib/createId'

const tagListModel: TagListModel = {
    data: [],
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('tagList') || '[]') as Tag[]
        return this.data;
    },
    create(input) {
        if(input === ''){return "null"}
        const nameList = this.data.map(item => item.name)
        if(nameList.indexOf(input) >= 0){return "duplicated";}//返回字符串判断错误信息
        const id = createId().toString();
        const newTag: Tag = {
            id: id,
            name: input
        }
        this.data.push(newTag);
        this.save();
        return 'success';
    },
    update(id:string,name:string){
        const idList = this.data.map(tag => tag.id);
        if(idList.indexOf(id) >= 0){
            const nameList = this.data.map(tag => tag.name);
            if(nameList.indexOf(name) < 0){
                const tag = this.data.filter(tag => tag.id === id)[0];
                tag.name = name;
                this.save();
                return 'success';
            }else{
                window.alert("此标签已存在");
                return 'duplicated';
            }
        }else{
            return 'not found';
        }
    },
    remove(id:string){
        let index = -1;
        for(let i = 0;i<this.data.length;i++){
            if(this.data[i].id === id){
                index = i;
                break;
            }
        }
        this.data.splice(index,1);
        this.save();
        return 'success'
    },
    save(){
        window.localStorage.setItem('tagList',JSON.stringify(this.data));
    }
};
export default tagListModel;