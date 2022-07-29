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

interface Window {
  tagList:Tag[];
}