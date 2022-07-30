type RecordItem = {
    tag: string[],
    note: string,
    type: string,
    amount: number,
    createAt?: Date
  }

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

interface Window {
  tagList:Tag[];
  createTag:()=>void;
  removeTag:(id: string)=>string;
  updateTag:TagListModel['update'];
  findTag:(id: string)=>Tag;
}