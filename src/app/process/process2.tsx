'use client';

import styles from "./../page.module.css";
import { useState, useEffect } from "react";

const step1 = () => {
    const [stepProcess, setStepProcess] = useState<number>(0);
    const [personnel, setPersonnel] = useState<number>(0);
    const [teamCount, setTeamCount] = useState<number>(0);

    const [tempDataList, setTempDataList] = useState<{id:number, lv:number, nm:string}[][]>([[]]);
    const [checkDatas, setCheckDatas] = useState<{id:number, row:number, cell:number}[]>([]);

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

    const onChangeCheckData = (checked:boolean, idx:number, row:number, cell:number):void => {
        if(checked) {
            setCheckDatas(prev => [...prev, {id:idx, row:row, cell:cell}]);
        } else {
            setCheckDatas(checkDatas.filter((el) => el.id !== idx));
        }
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
        let temp:{id:number, lv:number, nm:string}[][] = [[]];

        if(checkDatas.length > 0) {
            temp = JSON.parse(JSON.stringify(tempDataList));
            for(let i=0; i<checkDatas.length; i++) {
                copyTempDataList[0].filter((el) => el.id !== checkDatas[i].id);
            }
            console.log(copyTempDataList);
        }


        // for(let i=copyTempDataList.length-1; i>=0; i--) {
        //     for(let j=copyTempDataList[i].length-1; j>=0; j--) {
        //         let n = Math.floor(Math.random() * (i+1));
        //         let m = Math.floor(Math.random() * (j+1));
        //         [copyTempDataList[n][j], copyTempDataList[i][m]] = [copyTempDataList[i][m], copyTempDataList[n][j]];
        //     }
	  	// }
        // setTempDataList(copyTempDataList);
    }

    const balance = ():void => {
        const composition:number = Math.floor(personnel/teamCount);

        const copyTempDataList:{id:number, lv:number, nm:string}[][] = JSON.parse(JSON.stringify(tempDataList));
        const temp1DemList:{id:number, lv:number, nm:string}[] = [];
        const temp2DemList:{id:number, lv:number, nm:string}[][] = Array.from({length: teamCount}, () => Array.from({length: composition}));
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
        let tmpIdx:number = 0;
        for(let i=0; i<composition; i++) {
            for(let j=0; j<teamCount; j++) {
                temp2DemList[j][i] = temp1DemList[tmpIdx++];
            }
	  	}

        let tmpCompare1:number = 0;
        let tmpCompare2:number = 0;
        let chkIdx = 0;
        tmpIdx = 0;
        

        // 팀별 합산으로 밸런스 조정 //
        for(let i=0; i<composition; i++) {
	
            if(tmpCompare1 > tmpCompare2) {
                for(let j=teamCount-1; j>=0; j--) {
                    temp2DemList[j][i] = temp1DemList[tmpIdx++];
                }
            } else {
                for(let j=0; j<teamCount; j++) {
                    temp2DemList[j][i] = temp1DemList[tmpIdx++];
                }	
            }
                
            tmpCompare1 = 0;
            tmpCompare2 = 0;
            chkIdx = 0;
            for(let j=0; j<teamCount; j++) {
                for(let k=0; k<i+1; k++) {
                    if(chkIdx == 0) {
                        tmpCompare1 += temp2DemList[j][k].lv;
                    } else {
                        tmpCompare2 += temp2DemList[j][k].lv;
                    }
                }
                chkIdx++;
            }
        }
        setTempDataList(temp2DemList);
    }

    useEffect(() => {
        console.log(checkDatas);
    }, [checkDatas])

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
                                <input type="checkbox" onChange={(e) => onChangeCheckData(e.target.checked, child.id, idx1, idx2)} />
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
