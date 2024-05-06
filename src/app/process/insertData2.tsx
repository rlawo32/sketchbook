
'use client';

import styled from "styled-components";

import {useAtom, useAtomValue} from "jotai";
import {processStep, produceTeam} from "./jotaiAtoms";
import {
    updateInputData, updateSelectData, 
    updateCheckData, activeRandom, activeBalance
} from "./jotaiActions"

const StepStyle = styled('div')<{$step:number}>`
    display: ${({$step}) => $step > 2 ? "block" : "none"};
    height: 500px;
    align-items: center;
    justify-content: center;
    
    .list_section {
        display: flex;

        .list_parent {
            margin: 0 30px;

            .list_child {
                display: flex;
                align-items: center;
            }
        }
    }

    .btn_section {
        display: flex;
        width: 250px;
        margin: 20px auto;
    }
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

const InputFadeUp = styled('input')`
    min-heigth: 100px;
    width: 250px;
    margin: 5px;
    padding: 10px 20px;
    border: none;
    border-radius: 15px;
    background: rgba(42,50,73, .68);
    color: #6cacc5;
    font-size: 24px;
    outline: 0;
`;

const BtnFadeUp = styled('button')`
    display: block;
    margin: 10px;
    padding: 5px 25px;
    border: none;
    border-radius: 10px;
    background: rgba(42,50,113, .68);
    color: #6cacc5;
    font-size: 18px;
    cursor: pointer;
    transition-duration: .3s;

    &:hover {
        transform: scale(1.1);
    }
`;

const CheckFadeUp = styled('input')`
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #999;
    border-radius: 10px;
    outline: 0;
    cursor: pointer;
    appearance: none;

    transition-property: transform;

    &:hover {
        transform: scale(1.2);
    }

    &:checked {
        background-color: gray;
    }
`;

const SelectFadeUp = styled('select')`    
    padding: 10px 5px;
    border: none;
    border-radius: 10px;
    background: #231f50;
    font-size: 18px;
    cursor: pointer;
`;

const InsertData2 = () => {
    const [step, setStep] = useAtom(processStep);
    const [, setInputData] = useAtom(updateInputData);
    const [, setSelectData] = useAtom(updateSelectData);
    const [checkData, setCheckData] = useAtom(updateCheckData);
    const [, setRandomData] = useAtom(activeRandom);
    const [, setBalanceData] = useAtom(activeBalance);

    const teams = useAtomValue(produceTeam);

    const onActiveSelectBox = ():any[] => {
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
        <StepStyle $step={step} >
            <div className="list_section">
                {teams.map((parent, idx1) => (
                    <div key={idx1} className="list_parent">
                        {parent.map((child, idx2) => (
                            <div key={idx2} className="list_child">
                                <FadeUp $timing={idx2}>
                                    <SelectFadeUp onChange={(e) => setSelectData({index:child.id, arrNo:idx1, value:parseInt(e.target.value)})} value={child.lv}>
                                        {onActiveSelectBox()}
                                    </SelectFadeUp>    
                                </FadeUp>
                                <FadeUp $timing={idx2+1}>
                                    <InputFadeUp onChange={(e) => setInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} 
                                                 type="text" id={"input_" + child.id} />
                                </FadeUp>
                                
                                <FadeUp $timing={idx2+2}>
                                    <CheckFadeUp onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} 
                                                 checked={checkData.some(data => data.id === child.id) ? true : false} type="checkbox" id={"chkbx" + child.id} />
                                </FadeUp>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="btn_section">
                <FadeUp $timing={0}>
                <BtnFadeUp onClick={() => onClickRandom()}>무작위</BtnFadeUp>
                </FadeUp>
                <FadeUp $timing={1}>
                    <BtnFadeUp onClick={() => onClickBalance()}>밸런스</BtnFadeUp>
                </FadeUp>
            </div>
        </StepStyle>
    )
}

export default InsertData2;
