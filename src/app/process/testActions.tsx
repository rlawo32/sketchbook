import { atom } from "jotai";
import { dataArr } from "./testAtoms";

export const actionInsertInput = atom(null, (get, set, data:number) => {
    set(dataArr, (prev => [...prev, {id:data, content:''}]));
})

export const actionDeleteInput = atom(null, (get, set, data:number) => {
    const tempArr = get(dataArr);
    const copyTempArr:{id:number, content:string}[] = tempArr.filter((item) => item.id !== data);
    set(dataArr, copyTempArr);
})

export const actionUpdateInput = atom(null, (get, set, data:{idx:number; val:string;}) => {
    const tempArr = get(dataArr);
    const copyTempArr:{id:number, content:string}[] = JSON.parse(JSON.stringify(tempArr));
    const index = copyTempArr.findIndex((item) => item.id === data.idx);
    copyTempArr[index].content = data.val;
    
    set(dataArr, copyTempArr);
})