'use client';

import styled from "styled-components";
import * as Style from "./insertData.style";

import {useAtom} from "jotai"; 
import {processStep, personnel, teamCount} from "./jotaiAtoms";
import {createTeams} from "./jotaiActions"


const StepStyle = styled('div')<{$step:number}>`
    display: ${({$step}) => $step > 2 ? "none" : "flex"};
    height: 500px;
    align-items: center;
    justify-content: center;
`;

const FadeUp = styled('div')<{$timing:number}>`
    display: inline-block;
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .${({$timing}) => $timing+1}s;

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

const InputStyle = styled('input')`
    min-heigth: 100px;
    width: 250px;
    margin: 0;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(42,50,73, .68);
    color: #6cacc5;
    font-size: 24px;
    outline: 0;
`;

const BtnStyle = styled('button')`
    display: block;
    margin: 20px auto;
    padding: 5px 25px;
    border: none;
    border-radius: 10px;
    background: rgba(42,50,113, .68);
    color: #6cacc5;
    font-size: 18px;
    cursor: pointer;
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
        <StepStyle $step={step}>
        <div style={step === 1 ? {display: "block"} : {display: "none"}} className="fade-up" >
            <Style.InputStyle type="text" onChange={(e) => setPersonnel(parseInt(e.target.value))} />
            <Style.BtnStyle onClick={() => onClickNextStep(2)}>다음</Style.BtnStyle>
        </div>
        <div style={step === 2 ? {display: "block"} : {display: "none"}} className="fade-up" >    
            <Style.FadeUp1 $timing={0}>
                <Style.InputStyle type="text" onChange={(e) => setTeamCount(parseInt(e.target.value))} />
            </Style.FadeUp1>
            <Style.FadeUp1 $timing={1}>
                <Style.BtnStyle onClick={() => onClickNextStep(3)}>다음</Style.BtnStyle>
            </Style.FadeUp1>
        </div>
        </StepStyle>
    )
}

export default InsertData1;
