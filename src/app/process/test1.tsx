'use client';

import styles from "./../page.module.css";
import { useState, useEffect } from "react";

import {atom, useAtom, useAtomValue, useSetAtom} from "jotai"; 
import {processStep, personnel, teamCount, testAtom} from "./jotaiAtoms";
import {createTeams, testAction3} from "./jotaiActions"

const test1 = () => {
    const step = useAtomValue(processStep);
    const setStep = useSetAtom(processStep);
    const [, setPersonnel] = useAtom(personnel);
    const [, setTeamCount] = useAtom(teamCount);
    const [, setCreateTeams] = useAtom(createTeams);

    // test
    // const [, setTestAtom1] = useAtom(testAction3);
    const setTestAtom1 = useSetAtom(testAction3);

    const val = useAtomValue(testAtom);
    const test = () => {
        setTestAtom1();
        console.log(val);
    }
    // test

    const [stepProcess, setStepProcess] = useState<number>(0);

    const [tempDataList, setTempDataList] = useState<{id:number, lv:number, nm:string}[][]>([[]]);
    const [checkDatas, setCheckDatas] = useState<{id:number, row:number, cell:number}[]>([]);

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

    return (
        <div style={step === 1 ? {display:"block"} : {display:"none"}}>
            <div style={stepProcess === 0 ? {display: "block"} : {display: "none"}}>    
                <input type="number" className={styles.input} onChange={(e) => setPersonnel(e.target.valueAsNumber)} placeholder="인원"/>
                <input type="number" className={styles.input} onChange={(e) => setTeamCount(e.target.valueAsNumber)} placeholder="팀수"/>
            </div>
            <div>
                <button onClick={() => {setStep(step+1); setCreateTeams();}}>다음</button>
            </div>
        </div>
    )
}

export default test1;
