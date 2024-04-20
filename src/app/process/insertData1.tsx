'use client';

import styled from "styled-components";

import {useAtom} from "jotai"; 
import {processStep, personnel, teamCount} from "./jotaiAtoms";
import {createTeams} from "./jotaiActions"

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

const InsertData1 = () => {
    const [step, setStep] = useAtom(processStep);
    const [, setPersonnel] = useAtom(personnel);
    const [, setTeamCount] = useAtom(teamCount);
    const [, setCreateTeams] = useAtom(createTeams);
    
    const onClickNextStep = (next:number):void => {
        setStep(next);
        if(next === 3) {
            setCreateTeams();
        }
    }

    return (
        <div style={step < 3 ? {display: "block"} : {display: "none"}}>
            <div style={step === 1 ? {display: "block"} : {display: "none"}} className="fade-up" >
                <InputFadeUp type="number" onChange={(e) => setPersonnel(e.target.valueAsNumber)} placeholder="인원" />
                <BtnFadeUp onClick={() => onClickNextStep(2)}>다음</BtnFadeUp>
            </div>
            <div style={step === 2 ? {display: "block"} : {display: "none"}} className="fade-up" >    
                <InputFadeUp type="number" onChange={(e) => setTeamCount(e.target.valueAsNumber)} placeholder="팀수"/>
                <BtnFadeUp onClick={() => onClickNextStep(3)}>다음</BtnFadeUp>
            </div>
        </div>
    )
}

export default InsertData1;