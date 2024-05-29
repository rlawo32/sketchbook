'use client';

import styled from "styled-components";
import * as Style from "./insertData.style";

import {useAtom} from "jotai"; 
import {processStep, personnel, teamCount} from "./jotaiAtoms";
import {createTeams} from "./jotaiActions"
import React from "react";


const StepStyle = styled('div')<{$step:number}>`
    display: ${({$step}) => $step > 1 ? "none" : "block"}; 
    height: 250px; 
`;

const InsertData1 = () => {
    const [step, setStep] = useAtom(processStep);
    const [personnelData, setPersonnelData] = useAtom(personnel);
    const [teamCountData, setTeamCountData] = useAtom(teamCount);
    const [, setCreateTeams] = useAtom(createTeams);
    
    const handleEnterEvent = (e:React.KeyboardEvent):void => {
        if(e.key === 'Enter') {
            onClickNextStep(2);
        }
    }

    const handleQuickCreate = (type:number):void => {
        setPersonnelData(type);
        setTeamCountData(2);
        setStep(2);
        setCreateTeams();
    }

    const onClickNextStep = (next:number):void => {
        if(personnelData < 1) {
            alert('인원수를 입력해주세요.');
        } else if(teamCountData < 1) {
            alert('팀수를 입력해주세요.');
        } else {
            if(personnelData < teamCountData) {
                alert('인원수를 팀수보다 많이 입력해주세요.');
            } else {
                setStep(next);
                if(next === 2) {
                    setCreateTeams();
                }
            }
        }
    }

    return (
        <StepStyle $step={step}>
            <div>
                <button onClick={() => handleQuickCreate(10)}>5대5</button>
                <button onClick={() => handleQuickCreate(8)}>4대4</button>
                <button onClick={() => handleQuickCreate(6)}>3대3</button>
                <button onClick={() => handleQuickCreate(4)}>2대2</button>
                <button onClick={() => handleQuickCreate(2)}>1대1</button>
            </div>
            <Style.InputValueStyle type="number" onChange={(e) => setPersonnelData(parseInt(e.target.value))} 
                                   placeholder="총 인원" onKeyDown={(e) => handleEnterEvent(e)}/>
            <Style.InputValueStyle type="number" onChange={(e) => setTeamCountData(parseInt(e.target.value))} 
                                   placeholder="팀 수" onKeyDown={(e) => handleEnterEvent(e)}/>
            <Style.BtnStyle onClick={() => onClickNextStep(2)}>다음</Style.BtnStyle>
        </StepStyle>
    )
}

export default InsertData1;
