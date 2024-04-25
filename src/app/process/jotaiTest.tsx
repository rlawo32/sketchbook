'use client';

import { atom, useAtom } from "jotai";
import { useEffect } from "react";

const test1 = atom<number>(0);

const testAction1 = atom((get) => get(test1) + 1);
const testAction2 = atom(null, (get, set) => {
    const val = get(test1);
    const res = val + 1;
    set(test1, res);
});

const JotaiTest = () => {
    const [testVal] = useAtom(testAction1);
    const [, setTestVal] = useAtom(testAction2);

    useEffect(() => {
        console.log("값 확인 : " + testVal);
    }, [testVal])

    return (
        <div>
            <button onClick={() => setTestVal()}>click</button>
        </div>
    )
}

export default JotaiTest;
