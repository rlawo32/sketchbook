
'use client';

import styled from "styled-components";
import * as Style from "./insertData.style";

import {useAtom, useAtomValue} from "jotai";
import {processStep, produceTeam} from "./jotaiAtoms";
import {
    updateInputData, updateSelectData, 
    updateCheckData, activeRandom, activeBalance
} from "./jotaiActions"

const StepStyle = styled('div')<{$step:number}>`
    display: ${({$step}) => $step > 1 ? "block" : "none"};
    align-items: center;
    justify-content: center;
    height: 300px;
    
    .list_section {
        display: flex;
        flex-wrap: wrap;
        width: 1024px;

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
        flex-wrap: wrap;
        width: 250px;
        margin: 50px auto;

        .btn_footer {
            margin: auto;
        }
    }
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
            <div>
                <div className="list_section">
                    {teams.map((parent, idx1) => (
                        <div key={idx1} className="list_parent">
                            {parent.map((child, idx2) => (
                                <div key={idx2} className="list_child">
                                    <Style.FadeUp $timing={idx2}>
                                        <Style.SelectStyle onChange={(e) => setSelectData({index:child.id, arrNo:idx1, value:parseInt(e.target.value)})} value={child.lv}>
                                            {onActiveSelectBox()}
                                        </Style.SelectStyle>    
                                        <Style.ToolTipStyle className="tooltip">
                                             Level
                                        </Style.ToolTipStyle>
                                    </Style.FadeUp>
                                    <Style.FadeUp $timing={idx2+1}>
                                        <Style.InputPlayerStyle onChange={(e) => setInputData({index:child.id, arrNo:idx1, value:e.target.value})} value={child.nm} 
                                                     type="text" id={"input_" + child.id} placeholder="이름 입력" />
                                    </Style.FadeUp>
                                    
                                    <Style.FadeUp $timing={idx2+2}>
                                        <Style.CheckStyle onChange={(e) => setCheckData({checked:e.target.checked, index:child.id, arrNo:idx1, value:idx2})} 
                                                     checked={checkData.some(data => data.id === child.id) ? true : false} type="checkbox" id={"chkbx" + child.id} />
                                        <Style.LabelStyle htmlFor={"chkbx" + child.id} className="check-box" />
                                        <Style.ToolTipStyle className="tooltip">
                                            Fix
                                        </Style.ToolTipStyle>
                                    </Style.FadeUp>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="btn_section">
                    <Style.FadeUp $timing={0}>
                        <Style.BtnStyle onClick={() => onClickRandom()}>무작위</Style.BtnStyle>
                    </Style.FadeUp>
                    <Style.FadeUp $timing={1}>
                        <Style.BtnStyle onClick={() => onClickBalance()}>밸런스</Style.BtnStyle>
                    </Style.FadeUp>
                    <div className="btn_footer">
                        <Style.FadeUp $timing={2}>
                            <Style.BtnStyle onClick={() => window.location.reload()}>처음으로</Style.BtnStyle>
                        </Style.FadeUp>
                    </div>
                </div>
            </div>
        </StepStyle>
    )
}

export default InsertData2;
