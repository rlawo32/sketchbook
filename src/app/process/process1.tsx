'use client';

import styles from "./../page.module.css";
import { useEffect, useState } from "react";

const InsertData = () => {
    const [stepProcess, setStepProcess] = useState<number>(0);
    const [personnel, setPersonnel] = useState<number>(0);
    const [teamCount, setTeamCount] = useState<number>(0);

    const dataList:any[] = [];
    const [userDataList, setUserDataList] = useState<{id:number, lv:number, nm:string}[]>([]);

    // const onChangeInputData = (idx:number, e: React.ChangeEvent<HTMLInputElement>):void => {
    //     const copyUserDataList: {id:number, lv:number, nm:string}[] = JSON.parse(JSON.stringify(userDataList));
    //     copyUserDataList[idx].nm = e.target.value;
    //     // setUserDataList(copyUserDataList);
    //     setUserDataList((prevList) => [...prevList, {id:plus+i, lv:5, nm:""}]);
    // }

    const onChangeSelectData = ():void => {
        
    }

    const selectBox = ():any[] => {
        const list:any[] = [];
        const textBox:string[] = ["E", "D", "C", "B", "A"];

        for(let i=4; i>=0; i--) {
            list.push(<option key={i} value={i+1}>{textBox[i]}</option>);
        }

        return list;
    }

    const distribution = ():void => {
        
    }

    
    const onClickNextStep = ():void => {
        let composition:number = Math.floor(personnel/teamCount);

        if(personnel % teamCount === 0) {
            const copyUserDataList:{id:number, lv:number, nm:string}[] = [];
            for(let i=0; i<teamCount; i++) {
                const item:{id:number, lv:number, nm:string}[] = [];
                let plus:number = 1;
                let key:number = i+1;
                for(let j=0; j<composition; j++) {
                    item.push({id:plus+i, lv:0, nm:""});
                    copyUserDataList.push({id:plus+i, lv:0, nm:""});
                    plus += teamCount;
                }
                dataList.push(<div key={key} style={{display: "inline-block"}}>
                    {i+1}팀
                    {
                        item.map((item:{id:number, lv:number, nm:string}) => (
                            <div key={item.id} >
                                <select>
                                    {selectBox()}
                                </select>
                                <input key={item.id} id={"item_" + item.id} type="text" />
                            </div>
                        ))
                    }
                </div>);
            }
            console.log(copyUserDataList);
        } else {
            let counting:number[] = [];
            let idx:number = 0;
            let temp1:number = Math.ceil(personnel/teamCount);
            let temp2:number = personnel;
            for(let i=1; i<=teamCount; i++) {
                counting[idx++] = temp1;
                temp2 -= temp1;

                if((teamCount-i) === 2 && temp2 % 2 === 0) {
                    temp1 = temp2/2;
                } else if((teamCount-i) === 3 && temp2 % 3 === 0) {
                    temp1 = temp2/3;
                } else if((teamCount-i) === 1) {
                    temp1 = temp2;
                }
            }

            for(let i=0; i<teamCount; i++) {
                const item:any[] = [];
                let plus:number = 1;
                let key:number = i+1;
                for(let j=0; j<counting[i]; j++) {
                    item.push({id:plus+i, lv: 0, name:""});
                    plus += teamCount;
                }
                dataList.push(<div key={key} style={{display: "inline-block"}}>
                    {i+1}팀
                    {
                        item.map((item:any) => (
                            <div key={item.id} >
                                <input key={item.id} id={"item_" + item.id} type="text" />
                            </div>
                        ))
                    }
                </div>);
            }
        }  
        
        setStepProcess(stepProcess+1);
    }

    console.log(dataList);
    useEffect(() => {
    }, [dataList])

    return (
        <div>
            <div style={stepProcess === 0 ? {display: "block"} : {display: "none"}}>    
                <input type="number" className={styles.input} onChange={(e) => setPersonnel(e.target.valueAsNumber)} placeholder="인원"/>
                <input type="number" className={styles.input} onChange={(e) => setTeamCount(e.target.valueAsNumber)} placeholder="팀수"/>
            </div>

            <div style={stepProcess === 1 ? {display: "flex", alignItems: "flex-start"} : {display: "none"}}>    
                {dataList.map((item:any) => (
                    <>
                        {item}
                    </>
                ))}
            </div>

            <div style={stepProcess === 2 ? {display: "block"} : {display: "none"}}>    

            </div>

            <div>
                <button onClick={() => onClickNextStep()}>다음</button>
            </div>
        </div>
    )
}

export default InsertData;