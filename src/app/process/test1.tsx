'use client';

import styles from "./../page.module.css";
import { useState, useEffect } from "react";

import {atom, useAtom, useAtomValue, useSetAtom} from "jotai"; 
import {processStep, personnel, teamCount, testAtom, produceTeam} from "./jotaiAtoms";
import {createTeams, testAction3, updateCheckData, updateInputData, updateSelectData, activeRandom, activeBalance} from "./jotaiActions"
import styled from "styled-components";

const StepStyle = styled('div')`

`;

const InputFadeUp = styled('input')`
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);

    @keyframes fade-up {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: none;
            opacity: 1;
        }
    }
`;

const BtnFadeUp = styled('button')`
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .1s;

    @keyframes fade-up {
        from {
            transform: translateY(100px);
            opacity: 0;
        }
        to {
            transform: none;
            opacity: 1;
        }
    }
`;

const test1 = () => {
    const [step, setStep] = useAtom(processStep);
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

    const teams = useAtomValue(produceTeam);
    const steps = useAtomValue(processStep);
    
    const [, setInputData] = useAtom(updateInputData);
    const [, setSelectData] = useAtom(updateSelectData);
    const [, setCheckData] = useAtom(updateCheckData);
    const [, setRandomData] = useAtom(activeRandom);
    const [, setBalanceData] = useAtom(activeBalance);

    const onClickNextStep = (next:number):void => {
        setStep(next);
        if(next === 3) {
            setCreateTeams();
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
    
    const onClickRandom = () => {
        let tmp:number = 5000;
        let interval = setInterval(() => {
            setRandomData();    
            tmp -= 200;
            if(tmp === 0) {
                clearInterval(interval);
            }
        }, 200);
    }

    const onClickBalance = () => {
        let tmp:number = 5000;
        let interval = setInterval(() => {
            setBalanceData();    
            tmp -= 200;
            if(tmp === 0) {
                clearInterval(interval);
            }
        }, 200);
    }

    return (
        <StepStyle>
            <div style={step === 1 ? {display: "block"} : {display: "none"}} className="fade-up" >
                <InputFadeUp>
                    <input type="number" onChange={(e) => setPersonnel(e.target.valueAsNumber)} placeholder="인원"/>
                </InputFadeUp>
                <BtnFadeUp onClick={() => onClickNextStep(2)}>다음</BtnFadeUp>
            </div>
            <div style={step === 2 ? {display: "block"} : {display: "none"}} className="fade-up" >    
                <InputFadeUp type="number" onChange={(e) => setTeamCount(e.target.valueAsNumber)} placeholder="팀수"/>
                <BtnFadeUp onClick={() => onClickNextStep(3)}>다음</BtnFadeUp>
            </div>
            <div style={step === 3 ? {display: "flex", alignItems: "flex-start"} : {display: "none"}} className="fade-up" >
                {teams.map((parent, idx1) => (
                    <div key={idx1}>
                        {parent.map((child, idx2) => (
                            <div key={idx2}>
                                <select onChange={(e) => setSelectData({index:child.id, arrNo:idx1, value:parseInt(e.target.value)} )} value={child.lv}>
                                    {onActiveselectBox()}
                                </select>
                                <input type="text" id={"input_" + child.id} onChange={(e) => setInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} />
                                <input type="checkbox" onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} />
                            </div>
                        ))}
                    </div>
                ))}
                <div>
                    <BtnFadeUp onClick={() => onClickRandom()}>무작위</BtnFadeUp>
                    <BtnFadeUp onClick={() => onClickBalance()}>밸런스</BtnFadeUp>
                </div>
            </div>
        </StepStyle>
    )
}

export default test1;
