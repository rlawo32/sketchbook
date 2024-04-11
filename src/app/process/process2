'use client';

import styles from "./../page.module.css";
import { useState, useEffect } from "react";

const step1 = () => {
    const [stepProcess, setStepProcess] = useState<number>(0);
    const [personnel, setPersonnel] = useState<number>(0);
    const [teamCount, setTeamCount] = useState<number>(0);

    const [tempDataList, setTempDataList] = useState<{id:number, lv:number, nm:string}[][]>([[]]);

    const tempTest = ():void => {     
        const composition:number = Math.floor(personnel/teamCount);

        let tempList:{id:number, lv:number, nm:string}[][] = Array.from({length: teamCount}, () => Array.from({length: composition}));

        for(let i=0; i<tempList.length; i++) {
            let plus:number = 1;
            for(let j=0; j<tempList[i].length; j++) {
                tempList[i][j] = {id:i+plus, lv:5, nm:''};
                plus += teamCount;
            }
        }

        setTempDataList(tempList);
        setStepProcess(stepProcess+1);
    }

    const onChangeInputData = (idx:number, team:number, current:string):void => {
        const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempDataList));
        const index = copyTempDataList[team].findIndex((item) => item.id === idx);
        copyTempDataList[team][index].nm = current;
        setTempDataList(copyTempDataList);
    }

    const onChangeSelectData = (idx:number, team:number, current:number):void => {
        const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempDataList));
        const index = copyTempDataList[team].findIndex((item) => item.id === idx);
        copyTempDataList[team][index].lv = current;
        setTempDataList(copyTempDataList);
    }

    const onActiveselectBox = ():any[] => {
        const list:any[] = [];
        const textBox:string[] = ["E", "D", "C", "B", "A"];

        for(let i=4; i>=0; i--) {
            list.push(<option key={i} value={i+1}>{textBox[i]}</option>);
        }

        return list;
    }

    const random = ():void => {
        const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempDataList));
        for(let i=copyTempDataList.length-1; i>=0; i--) {
            for(let j=copyTempDataList[i].length-1; j>=0; j--) {
                let n = Math.floor(Math.random() * (i+1));
                let m = Math.floor(Math.random() * (j+1));
                [copyTempDataList[n][j], copyTempDataList[i][m]] = [copyTempDataList[i][m], copyTempDataList[n][j]];
            }
	  	}
        setTempDataList(copyTempDataList);
    }

    const balance = ():void => {
        const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempDataList));
        const temp1DemList:{id:number, lv:number, nm:string}[] = [];
        const temp2DemList:{id:number, lv:number, nm:string}[][] = [[]];
        for(let i=0; i<copyTempDataList.length; i++) {
            for(let j=0; j<copyTempDataList[i].length; j++) {
                temp1DemList.push(copyTempDataList[i][j]);
            }
	  	}
        
        for(let i=temp1DemList.length-1; i>=0; i--) {
            let j = Math.floor(Math.random() * (i+1));
            [temp1DemList[i], temp1DemList[j]] = [temp1DemList[j], temp1DemList[i]];
	  	}

        temp1DemList.sort((a, b) => {
		    return b.lv - a.lv;
		});

        const composition:number = Math.floor(personnel/teamCount);
        let tmpIdx:number = 0;
        for(let i=0; i<composition; i++) {
            for(let j=0; j<teamCount; j++) {
                temp2DemList[j][i] = temp1DemList[tmpIdx++];
            }
	  	}

        let tmpCompare1:number = 0;
        let tmpCompare2:number = 0;
        tmpIdx = 0;

        // 팀별 합산으로 밸런스 조정 //
        // for(let i=0; i<temp1DemList.length; i+=2) {
		// 	if(tmpCompare1 > tmpCompare2) {
		// 		for(let j=i+1; j>i-1; j--) {
		// 			temp2DemList.push(temp1DemList[j]);	
		// 		}
		// 	} else {
		// 		for(let j=i; j<i+2; j++) {
		// 			temp2DemList.push(temp1DemList[j]);	
		// 		}	
		// 	}
			
		// 	tmpCompare1 = 0;
		// 	tmpCompare2 = 0;
		// 	tmpIdx = 1;
		// 	for(let j=0; j<teamCount; j++) {
		// 		for(let k=j; k<temp2DemList.length; k+=teamCount) {
		// 			if(tmpIdx == 1) {
		// 				tmpCompare1 += parseInt(temp2DemList[k].lv);
		// 			} else {
		// 				tmpCompare2 += parseInt(temp2DemList[k].lv);
		// 			}
		// 		}
		// 		tmpIdx++;
		// 	}
		// }
        // setTempDataList(temp2DemList);
    }

    useEffect(() => {
        console.log(tempDataList);
    }, [tempDataList])

    return (
        <div>
            <div style={stepProcess === 0 ? {display: "block"} : {display: "none"}}>    
                <input type="number" className={styles.input} onChange={(e) => setPersonnel(e.target.valueAsNumber)} placeholder="인원"/>
                <input type="number" className={styles.input} onChange={(e) => setTeamCount(e.target.valueAsNumber)} placeholder="팀수"/>
            </div>

            <div style={stepProcess === 1 ? {display: "flex", alignItems: "flex-start"} : {display: "none"}}>    
                {tempDataList.map((parent, idx1) => (
                    <div key={idx1}>
                        {parent.map((child, idx2) => (
                            <div key={idx2}>
                                <select onChange={(e) => onChangeSelectData(child.id, idx1, parseInt(e.target.value))} value={child.lv}>
                                    {onActiveselectBox()}
                                </select>
                                <input type="text" id={"input_" + child.id} onChange={(e) => onChangeInputData(child.id, idx1, e.target.value)} value={child.nm} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <div style={stepProcess === 2 ? {display: "block"} : {display: "none"}}>    

            </div>

            <div>
                <button onClick={() => tempTest()}>다음</button>
                <button onClick={() => random()}>무작위</button>
                <button onClick={() => balance()}>밸런스</button>
            </div>
        </div>
    )
}

export default step1;
