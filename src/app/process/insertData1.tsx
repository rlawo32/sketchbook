'use client';

import styled from "styled-components";
import * as Style from "./insertData.style";

import {useAtom} from "jotai"; 
import {processStep, personnel, teamCount} from "./jotaiAtoms";
import {createTeams} from "./jotaiActions"


const StepStyle = styled('div')<{$step:number}>`
    display: ${({$step}) => $step > 1 ? "none" : "block"};   
`;

const InsertData1 = () => {
    const [step, setStep] = useAtom(processStep);
    const [, setPersonnel] = useAtom(personnel);
    const [, setTeamCount] = useAtom(teamCount);
    const [, setCreateTeams] = useAtom(createTeams);
    
    const onClickNextStep = (next:number):void => {
        setStep(next);
        if(next === 2) {
            setCreateTeams();
        }
    }

    return (
        <StepStyle $step={step}>
            <Style.InputValueStyle type="text" onChange={(e) => setPersonnel(parseInt(e.target.value))} />
            <Style.InputValueStyle type="text" onChange={(e) => setTeamCount(parseInt(e.target.value))} />
            <Style.BtnStyle onClick={() => onClickNextStep(2)}>다음</Style.BtnStyle>
        </StepStyle>
    )
}

export default InsertData1;
