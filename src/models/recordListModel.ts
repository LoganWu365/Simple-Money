type RecordListModel = {
    data: RecordItem[],
    fetch: () => RecordItem[],
    create: (record:RecordItem) => void,
    save: () => void
}
const recordListModel: RecordListModel = {
    data: [],
    create(record: RecordItem){
        record.createAt = new Date();
        const deepClone = JSON.parse(JSON.stringify(record));
        this.data.push(deepClone);
        this.save();
    },
    fetch(){
        this.data = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
        return this.data;
    },
    save(){
        window.localStorage.setItem('recordList',JSON.stringify(this.data));
    }
};
export default recordListModel;