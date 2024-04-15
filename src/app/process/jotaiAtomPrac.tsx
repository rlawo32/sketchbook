import { atom } from "jotai";

export const processStep = atom<number>(1);                                     // 프로세스 진행
export const personnel = atom<number>(0);                                       // 입력된 총 인원
export const teamCount = atom<number>(0);                                       // 입력된 팀 수

export const produceTeam = atom<{id:number, lv:number, nm:string}[][]>([[]]);   // 생성된 팀
export const playerFix = atom<{id:number, row:number, cell:number}[]>([]);      // 고정 팀원

