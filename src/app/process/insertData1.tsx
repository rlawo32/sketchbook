'use client';

import styles from "./../page.module.css";
import * as func from "./insertFunc";

const InsertData1 = () => {

    return (
        <div>
            {/* SSR에서 onChange 사용불가 */}
            <input type="number" className={styles.input} onChange={(e) => func.inputPersonnel(e.target.valueAsNumber)} placeholder="인원"/>
            <input type="number" className={styles.input} onChange={(e) => func.inputTeamCount(e.target.valueAsNumber)} placeholder="팀수"/>
        </div>
    )
}

export default InsertData1;