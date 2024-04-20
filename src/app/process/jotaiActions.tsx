import { atom } from "jotai";
import { personnel, teamCount, produceTeam, playerFix, testAtom } from "./jotaiAtoms";

// test
export const testAction1 = atom((get) => get(testAtom) + 1);
export const testAction2 = atom((get) => get(testAtom), (get, set) => {
    const val = get(testAtom);
    const res = val + 100;
    set(testAtom, res);
});
export const testAction3 = atom(null, (get, set) => {
    const val = get(testAtom);
    const res = val + 200;
    set(testAtom, res);
});
// test

export const createTeams = atom(null, (get, set) => {
    const realPersonnel:number = get(personnel);
    const realTeamCount:number = get(teamCount);
    const realComposition:number = realPersonnel/realTeamCount;

    // 1. 입력한 인원, 팀수로 2차원 배열 생성 //
    let temp2DemList:{id:number, lv:number, nm:string}[][] = Array.from({length: realTeamCount}, () => Array.from({length: realComposition}));

    // 2. 인원이 홀수일 경우 2차원 배열 재생성 //
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
    // 3. 생성된 2차원 배열에 객체 생성 //
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

export const activeRandom = atom(null, (get, set) => {
    const tempProduceTeam = get(produceTeam);
    const tempPlayerFix = get(playerFix);
    const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempProduceTeam));

    // 1. 배열 랜덤하게 정렬
    for(let i=copyTempDataList.length-1; i>=0; i--) { 
        for(let j=copyTempDataList[i].length-1; j>=0; j--) {
            let n = Math.floor(Math.random() * (i+1));
            let m = Math.floor(Math.random() * (j+1));
            [copyTempDataList[n][j], copyTempDataList[i][m]] = [copyTempDataList[i][m], copyTempDataList[n][j]];
        }
      }
    // 2. 고정 체크된 선수 처리 //
    /* 
       미리 저장했던 고정 체크한 정보를 이용해 정렬된 배열 상에서 
       고정 체크한 인덱스 값을 찾아 저장한 값과 정렬된 배열의 인덱스 값과 교환
    */
    if(tempPlayerFix.length > 0) { 
        for(let i=0; i<tempPlayerFix.length; i++) {
            for(let j=0; j<copyTempDataList.length; j++) {
                for(let x=0; x<copyTempDataList[j].length; x++) {
                    if(j === tempPlayerFix[i].row && x === tempPlayerFix[i].cell) {
                        let tempBox:{id:number, lv:number, nm:string} = copyTempDataList[j][x];
                        let row:number = -1;
                        let cell:number = -1;
                        for(let y=0; y<copyTempDataList.length; y++) {
                            cell = copyTempDataList[y].findIndex((item) => item.id === tempPlayerFix[i].id);
                            if(cell !== -1) {
                                row = y;
                                break;
                            }
                        }
                        copyTempDataList[j][x] = copyTempDataList[row][cell];
                        copyTempDataList[row][cell] = tempBox;
                    }
                }
            }
        }
    }
    set(produceTeam, copyTempDataList);
})

export const activeBalance = atom(null, (get, set) => {
    const realPersonnel:number = get(personnel);
    const realTeamCount:number = get(teamCount);
    const realComposition:number = realPersonnel/realTeamCount;
    const tempProduceTeam = get(produceTeam);
    const tempPlayerFix = get(playerFix);

    const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempProduceTeam));
    const temp1DemList:{id:number, lv:number, nm:string}[] = [];
    let temp2DemList:{id:number, lv:number, nm:string}[][] = Array.from({length: realTeamCount}, () => Array.from({length: realComposition}));

    // 1. 1차원 객체 배열 생성 //
    for(let i=0; i<copyTempDataList.length; i++) {
        for(let j=0; j<copyTempDataList[i].length; j++) {
            temp1DemList.push(copyTempDataList[i][j]);
        }
    }
    // 2. 1차원 객체 배열 섞기 //
    for(let i=temp1DemList.length-1; i>=0; i--) {
        let j = Math.floor(Math.random() * (i+1));
        [temp1DemList[i], temp1DemList[j]] = [temp1DemList[j], temp1DemList[i]];
    }
    // 3. 1차원 객체 배열 정렬(내림차순) //
    temp1DemList.sort((a, b) => {
        return b.lv - a.lv;
    });
    // 4. 인원이 홀수일 경우 2차원 배열 재생성 //
    if(realPersonnel % realTeamCount !== 0) {
        let tempComposition:number = Math.ceil(realPersonnel/realTeamCount);
        let tempPersonnel:number = realPersonnel;
        const cellArray:number[] = [];
        let idx:number = 0;
        // 4-1. 팀별 인원수 조정 //
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
        // 4-2. 조정된 팀별 인원으로 2차원 배열 재생성 //
        temp2DemList = [];
        temp2DemList = Array.from({length: realTeamCount});
        for(let i=0; i<realTeamCount; i++) {
            temp2DemList[i] = Array.from({length: cellArray[i]});
        }
    }

    let tempComposition:number = Math.ceil(realPersonnel/realTeamCount);
    let tempCompare:{idx:number, sum:number, len:number}[] = [];
    // 팀별 합산 값, 길이 값 객체 생성 //
    for(let i=0; i<realTeamCount; i++) {
        tempCompare[i] = {idx:i, sum:0, len:temp2DemList[i].length};
    }

    // 5. 팀별 합산 값으로 밸런스 조정 //
    for(let i=0; i<tempComposition; i++) {
        let tmpIdx:number = 0;

        // 5-1. 팀별 합산 정렬(오름차순) //
        tempCompare.sort((a, b) => {
            return a.sum - b.sum;
        });
        // 5-2. 적은 인원 팀 부터 정렬(오름차순) //
        if(realPersonnel % realTeamCount !== 0) {
            tempCompare.sort((a, b) => {
                return a.len - b.len;
            }); 
        }
        // 5-3. 정렬된 순서로 결과 생성 //
        for(let j=0; j<realTeamCount; j++) {
            if(temp2DemList[tempCompare[j].idx].length-1 >= i) {
                temp2DemList[tempCompare[j].idx][i] = temp1DemList[tmpIdx++];
            }
        }
        // 5-4. 생성된 결과 값으로 합산 //
        for(let j=0; j<realTeamCount; j++) {
            if(temp2DemList[tempCompare[j].idx].length-1 >= i) {
                tempCompare[j].sum += temp2DemList[tempCompare[j].idx][i].lv;   
            }
        }
    }

    // 6. 고정 체크된 선수 처리 //
    /* 
       미리 저장했던 고정 체크한 정보를 이용해 정렬된 배열 상에서 
       고정 체크한 인덱스 값을 찾아 저장한 값과 정렬된 배열의 인덱스 값과 교환
    */
    if(tempPlayerFix.length > 0) { 
        for(let i=0; i<tempPlayerFix.length; i++) {
            for(let j=0; j<temp2DemList.length; j++) {
                for(let x=0; x<temp2DemList[j].length; x++) {
                    if(j === tempPlayerFix[i].row && x === tempPlayerFix[i].cell) {
                        let tempBox:{id:number, lv:number, nm:string} = temp2DemList[j][x];
                        let row:number = -1;
                        let cell:number = -1;
                        for(let y=0; y<temp2DemList.length; y++) {
                            cell = temp2DemList[y].findIndex((item) => item.id === tempPlayerFix[i].id);
                            if(cell !== -1) {
                                row = y;
                                break;
                            }
                        }
                        temp2DemList[j][x] = temp2DemList[row][cell];
                        temp2DemList[row][cell] = tempBox;
                    }
                }
            }
        }
    }
    set(produceTeam, temp2DemList);
})
