'use client';

import { useAtom, useAtomValue } from "jotai";
import { useRef } from "react";

import {dataArr} from "./testAtoms";
import {actionInsertInput, actionDeleteInput, actionUpdateInput} from "./testActions";

const JotaiTest = () => {
    const inputRef = useRef<number>(0);

    const inputData = useAtomValue(dataArr);
    const [, setInsertInput] = useAtom(actionInsertInput);
    const [, setDeleteInput] = useAtom(actionDeleteInput);
    const [, setUpdateInput] = useAtom(actionUpdateInput);

    const actionAdd = ():void => {
        setInsertInput(inputRef.current+1);
        inputRef.current += 1;
    }

    return (
        <div>
            <center>
                <h1>Input 추가하기</h1>
            </center>

            <br/><br/><br/>

            {inputData.map((item, idx) => (
                <div key={idx}>
                    <input type="text" value={item.content} id={item.id+""} onChange={(e) =>setUpdateInput({idx:item.id, val:e.target.value})}/>
                    {
                        idx == 0 ? 
                            <button onClick={() => actionAdd()}>추가</button>
                            :
                            <button onClick={() => setDeleteInput(item.id)}>삭제</button>
                    }
                </div>
            ))}
        </div>
    )
}

export default JotaiTest;
