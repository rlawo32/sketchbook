import { atom, useAtomValue } from "jotai";
import {processStep, personnel, teamCount, produceTeam, playerFix} from "./jotaiAtoms";

export const createTeams = atom(null, (get, set) => {
    const realPersonnel:number = get(personnel);
    const realTeamCount:number = get(teamCount);
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

    set(produceTeam, temp2DemList);
}) 

export const updateInputData = atom(null, (get, set, data:{index:number; arrNo:number; value:string;}) => {
    const tempProduceTeam = get(produceTeam);
    const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempProduceTeam));
    const index = copyTempDataList[data.arrNo].findIndex((item) => item.id === data.index);
    copyTempDataList[data.arrNo][index].nm = data.value;
    set(produceTeam, copyTempDataList);
})

export const updateSelectData = atom(null, (get, set, data:{index:number; arrNo:number; value:number;}) => {
    const tempProduceTeam = get(produceTeam);
    const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempProduceTeam));
    const index = copyTempDataList[data.arrNo].findIndex((item) => item.id === data.index);
    copyTempDataList[data.arrNo][index].lv = data.value;
    set(produceTeam, copyTempDataList);
})

export const updateCheckData = atom(null, (get, set, data:{checked:boolean; index:number; arrNo:number; value:number;}) => {
    if(data.checked) {
        set(playerFix, (prev => [...prev, {id:data.index, row:data.arrNo, cell:data.value}]));
    } else {
        set(playerFix, (get(playerFix).filter((el) => el.id !== data.index)));
    }
})

