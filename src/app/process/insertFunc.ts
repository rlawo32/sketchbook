'use client';

import {atom, useAtomValue, useSetAtom} from "jotai";

const dataPersonnel = atom<number>(0);
const dataTeamCount = atom<number>(0);
export const dataProduceTeam = atom<{id:number, lv:number, nm:string}[][]>([[]]);

export const inputPersonnel = (data:number) => {
    const setPersonnel = useSetAtom(dataPersonnel);
    setPersonnel(data);
}

export const inputTeamCount = (data:number) => {
    const setTeamCount = useSetAtom(dataTeamCount);
    setTeamCount(data);
}

export const produceTeam = () => {
    const setProduceTeam = useSetAtom(dataProduceTeam);
    const realPersonnel:number = useAtomValue(dataPersonnel);
    const realTeamCount:number = useAtomValue(dataTeamCount);
    const realComposition:number = realPersonnel/realTeamCount;

    let temp2DemList:{id:number, lv:number, nm:string}[][] = Array.from({length: realTeamCount}, () => Array.from({length: realComposition}));

    if(realPersonnel % realTeamCount !== 0) {
        let tempComposition:number = Math.ceil(realPersonnel/realTeamCount);
        let tempPersonnel:number = realPersonnel;
        const cellArray:number[] = [];
        let idx:number = 0;
        
        for(let i=1; i<=realTeamCount; i++) {
            cellArray[idx++] = tempComposition;
            tempPersonnel -= tempComposition;
            if((realTeamCount - i) === 2 && tempPersonnel % 2 === 0) {
                tempComposition = tempPersonnel / 2;
            } else if((realTeamCount - i) === 3 && tempPersonnel % 3 === 0) {
                tempComposition = tempPersonnel / 3;
            } else if((realTeamCount - i) === 1) {
                tempComposition = tempPersonnel;
            }
        }

        temp2DemList = [];
        temp2DemList = Array.from({length: realTeamCount});

        
        for(let i=0; i<realTeamCount; i++) {
            temp2DemList[i] = Array.from({length: cellArray[i]});
        }
    }

    for(let i=0; i<temp2DemList.length; i++) {
        let plus:number = 1;
        for(let j=0; j<temp2DemList[i].length; j++) {
            temp2DemList[i][j] = {id:i+plus, lv:5, nm:''};
            plus += realTeamCount;
        }
    }

    setProduceTeam(temp2DemList);
}