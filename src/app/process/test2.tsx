'use client'

import {useAtom, useAtomValue} from "jotai"; 
import {processStep, produceTeam} from "./jotaiAtoms";
import {updateCheckData, updateInputData, updateSelectData, onClickRandom, onClickBalance} from "./jotaiActions";

const test2 = () => {

    const onActiveselectBox = ():any[] => {
        const list:any[] = [];
        const textBox:string[] = ["E", "D", "C", "B", "A"];

        for(let i=4; i>=0; i--) {
            list.push(<option key={i} value={i+1}>{textBox[i]}</option>);
        }

        return list;
    }

    const teams = useAtomValue(produceTeam);
    const steps = useAtomValue(processStep);
    
    const [, setInputData] = useAtom(updateInputData);
    const [, setSelectData] = useAtom(updateSelectData);
    const [, setCheckData] = useAtom(updateCheckData);
    const [, setRandomData] = useAtom(onClickRandom);
    const [, setBalanceData] = useAtom(onClickBalance);

    const random = () => {
        let tmp:number = 5000;
        let interval = setInterval(() => {
            setRandomData();    
            tmp -= 200;
            if(tmp === 0) {
                clearInterval(interval);
            }
        }, 200);
    }

    const balance = () => {
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
        <div style={steps === 2 ? {display:"block"} : {display:"none"}}>
            <div style={{display: "flex", alignItems: "flex-start"}}>    
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
            </div>

            <div>
                {/* <button onClick={() => tempTest()}>다음</button>
                <button onClick={() => random()}>무작위</button>
                <button onClick={() => balance()}>밸런스</button>
                <button onClick={() => several()}>여러번</button>
                <button onClick={() => jotaiTest()}>Test</button> */}
            </div>
        </div>
    )
}

export default test2;
