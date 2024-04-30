
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
        }
    }

    .btn_section {
        display: flex;
        width: 250px;
        margin: 20px auto;
    }
`;

const InputFadeUp = styled('input')<{$timing:number}>`
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
    display: block;
    margin: 20px auto;
    padding: 5px 25px;
    border: none;
    border-radius: 10px;
    background: rgba(42,50,113, .68);
    color: #6cacc5;
    font-size: 18px;

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

const CheckFadeUp = styled('input')`
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
`;

const LabelFadeUp = styled('label')<{$timing:number}>`
    position: relative;
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer; 
    
    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .${({$timing}) => $timing}s;

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

const SelectFadeUp = styled('select')<{$timing:number}>`    
    padding: 10px 5px;
    border: none;
    border-radius: 10px;
    background: #231f50;
    font-size: 18px;

    opacity: 0;
    animation: fade-up .8s forwards cubic-bezier(.6, 1.5, .8, 1.2);
    animation-delay: .${({$timing}) => $timing}s;

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
        <StepStyle $step={step} >
            <div className="list_section">
                {teams.map((parent, idx1) => (
                    <div key={idx1} className="list_parent">
                        {parent.map((child, idx2) => (
                            <div key={idx2}>
                                <SelectFadeUp onChange={(e) => setSelectData({index:child.id, arrNo:idx1, value:parseInt(e.target.value)})} value={child.lv}
                                            $timing={idx2}>
                                    {onActiveSelectBox()}
                                </SelectFadeUp>
                                <InputFadeUp type="text" id={"input_" + child.id} onChange={(e) => setInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} 
                                            $timing={idx2} />
                                {/* <CheckFadeUp type="checkbox" onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} 
                                            $timing={idx2+parent.length} id={`${idx2+parent.length}`}/> */}
                                            
                                <LabelFadeUp htmlFor={"chkbx" + child.id} $timing={idx2+parent.length}>
                                    <CheckFadeUp type="checkbox" id={"chkbx" + child.id} 
                                                 onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} />
                                    <div className="pin">
                                        <svg width="28" height="39" viewBox="0 0 28 39">
                                            <ellipse id="pin-drop" rx="30" ry="15"/>
                                            <ellipse id="pin-drop" rx="20" ry="10"/>
                                            <g id="pin">
                                                <path id="pin-outline" d="M23.2868 17.8471L25.6099 19.9765C27.0233 21.2722 25.9789 23.6561 24.0663 23.5218C22.0209 23.3782 19.6865 23.2372 17.4707 23.1553C17.2349 24.3851 15.6175 32.5 14.0001 32.5C12.3826 32.5 10.7652 24.3847 10.5294 23.1553C8.31299 23.2371 5.97783 23.3782 3.93189 23.5218C2.01924 23.6561 0.974913 21.2722 2.38831 19.9765L4.6978 17.8595C5.54732 17.0808 6.1603 16.076 6.397 14.9481C6.6819 13.5905 7.01306 11.6911 6.99908 10.25C6.9923 9.54993 6.69118 8.81942 6.23976 8.115C4.70814 5.72496 4.87443 2.79074 7.68558 2.39631C9.34716 2.16318 11.4284 2 13.9991 2C16.6405 2 18.765 2.17227 20.4486 2.41569C23.2218 2.81664 23.4312 5.71451 21.853 8.02978C21.3442 8.77626 20.9991 9.5431 20.9991 10.25C20.9991 11.7792 21.3221 13.6428 21.6009 14.9667C21.8361 16.0831 22.4458 17.0761 23.2868 17.8471Z"/>
                                                <mask id="mask-fill" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="28" height="34">
                                                <path d="M23.2868 17.8471L25.6099 19.9765C27.0233 21.2722 25.9789 23.6561 24.0663 23.5218C22.0209 23.3782 19.6865 23.2372 17.4707 23.1553C17.2349 24.3851 15.6175 32.5 14.0001 32.5C12.3826 32.5 10.7652 24.3847 10.5294 23.1553C8.31299 23.2371 5.97783 23.3782 3.93189 23.5218C2.01924 23.6561 0.974913 21.2722 2.38831 19.9765L4.6978 17.8595C5.54732 17.0808 6.1603 16.076 6.397 14.9481C6.6819 13.5905 7.01306 11.6911 6.99908 10.25C6.9923 9.54993 6.69118 8.81942 6.23976 8.115C4.70814 5.72496 4.87443 2.79074 7.68558 2.39631C9.34716 2.16318 11.4284 2 13.9991 2C16.6405 2 18.765 2.17227 20.4486 2.41569C23.2218 2.81664 23.4312 5.71451 21.853 8.02978C21.3442 8.77626 20.9991 9.5431 20.9991 10.25C20.9991 11.7792 21.3221 13.6428 21.6009 14.9667C21.8361 16.0831 22.4458 17.0761 23.2868 17.8471Z"/>
                                                </mask>
                                                <g mask="url(#mask-fill)">
                                                <ellipse id="pin-fill" rx="80" ry="40"/>
                                                </g>
                                            </g>
                                        </svg>
                                    </div>
                                </LabelFadeUp>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <div className="btn_section">
                <BtnFadeUp onClick={() => onClickRandom()}>무작위</BtnFadeUp>
                <BtnFadeUp onClick={() => onClickBalance()}>밸런스</BtnFadeUp>
            </div>
        </StepStyle>
    )
}

export default InsertData2;
