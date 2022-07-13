type Tag = {
    id: string,
    name: string
}

type TagListModel = {
    data: Tag[],
    fetch:() => Tag[],
    create: (name:string) => 'success' | 'duplicated' | 'null',//联合类型
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
        const newTag: Tag = {
            id: input,
            name: input
        }
        this.data.push(newTag);
        this.save();
        return 'success';
    },
    save(){
        window.localStorage.setItem('tagList',JSON.stringify(this.data));
    }
};
export default tagListModel;