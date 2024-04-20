'use client';

import styled from "styled-components";

import {useAtom, useAtomValue} from "jotai";
import {processStep, produceTeam} from "./jotaiAtoms";
import {
    updateInputData, updateSelectData, 
    updateCheckData, activeRandom, activeBalance
} from "./jotaiActions"

const InputFadeUp = styled('input')`
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

const BtnFadeUp = styled('button')`
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .2s;

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

const CheckFadeUp = styled('input')`
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .3s;

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

const SelectFadeUp = styled('select')`
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

const InsertData2 = () => {
    const [step, setStep] = useAtom(processStep);
    const [, setInputData] = useAtom(updateInputData);
    const [, setSelectData] = useAtom(updateSelectData);
    const [, setCheckData] = useAtom(updateCheckData);
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
        <div style={step === 3 ? {display: "flex", alignItems: "flex-start"} : {display: "none"}} className="fade-up" >
            {teams.map((parent, idx1) => (
                <div key={idx1}>
                    {parent.map((child, idx2) => (
                        <div key={idx2}>
                            <SelectFadeUp onChange={(e) => setSelectData({index:child.id, arrNo:idx1, value:parseInt(e.target.value)} )} value={child.lv}>
                                {onActiveSelectBox()}
                            </SelectFadeUp>
                            <InputFadeUp type="text" id={"input_" + child.id} onChange={(e) => setInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} />
                            <CheckFadeUp type="checkbox" onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} />
                        </div>
                    ))}
                </div>
            ))}
            <div>
                <BtnFadeUp onClick={() => onClickRandom()}>무작위</BtnFadeUp>
                <BtnFadeUp onClick={() => onClickBalance()}>밸런스</BtnFadeUp>
            </div>
        </div>
    )
}

export default InsertData2;