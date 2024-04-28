import { atom } from "jotai";

export const dataArr = atom<{id:number, content:string}[]>([{id:0, content:''}]);