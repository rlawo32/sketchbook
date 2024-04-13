'use client';

import {useAtomValue} from "jotai";

import styles from "./../page.module.css";
import * as func from "./insertFunc";

const InsertData2 = () => {

    return (
        <div>
            {func.dataProduceTeam.map((parent, idx1) => (
                <div key={idx1}>
                    {parent.map((child, idx2) => (
                        <div key={idx2}>
                            <input type="text" id={"input_" + child.id} value={child.nm} />
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default InsertData2;