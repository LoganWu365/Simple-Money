 
const recordStore = {
    recordList: [] as RecordItem[],
    createRecord: function(record: RecordItem){
        record.createAt = new Date();
        const deepClone = JSON.parse(JSON.stringify(record));
        this.recordList.push(deepClone);
        this.saveRecords();
},
    saveRecords: function(){
        window.localStorage.setItem('recordList',JSON.stringify(this.recordList));
    },
    fetchRecords: function(){
        this.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
        return this.recordList;
    }
}

recordStore.fetchRecords();
export default recordStore