import createId from '@/lib/createId'

type Tag = {
    id: string,
    name: string
}

type TagListModel = {
    data: Tag[],
    fetch:() => Tag[],
    create: (name:string) => 'success' | 'duplicated' | 'null',//联合类型
    update: (id:string,name:string) => string,
    remove: (id:string) => string,
    save:() => void
}
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
        return 'success';
    },
    save(){
        window.localStorage.setItem('tagList',JSON.stringify(this.data));
    }
};
export default tagListModel;