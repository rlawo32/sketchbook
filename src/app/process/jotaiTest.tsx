'use client';

import { useAtom, useAtomValue } from "jotai";
import { useRef } from "react";

import styled from "styled-components";
import {dataArr} from "./testAtoms";
import {actionInsertInput, actionDeleteInput, actionUpdateInput} from "./testActions";

const ButtonStyle = styled('button')`
    flex: 1 1 auto;
    margin: 10px;
    padding: 15px;
    text-align: center;
    text-transform: uppercase;
    transition: 0.5s;
    background-size: 200% auto;
    color: #6cacc5;
    box-shadow: 0 0 40px rgba(42,50,113, .68);
    border: none;
    border-radius: 10px;
    background-image: linear-gradient(to right, rgba(42,50,113) 0%, #261226 41%, #261226 71%, rgba(42,50,113) 100%);
    cursor: pointer;
    &:hover {
        background-position: right center;
    }
`;

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

            <ButtonStyle>test</ButtonStyle>

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
