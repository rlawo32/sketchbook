import styles from "./page.module.css";

import Process2 from "./process/process2";

import InsertData1 from "./process/insertData1";
import InsertData2 from "./process/insertData2";

export default function Home() {
  return (
    <main className={styles.main}>
      
      <InsertData1 />
      <InsertData2 />

    </main>
  );
}
