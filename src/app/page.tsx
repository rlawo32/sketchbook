import styles from "./page.module.css";

import InsertData1 from "./process/insertData1";
import InsertData2 from "./process/insertData2";
import Page from "./test/page";

import JotaiTest from "./process/jotaiTest";

export default function Home() {
  return (
    <main className={styles.main}>
  {/* <InsertData1 />
      <InsertData2 /> */}

      <Page />

      {/* <JotaiTest /> */}

    </main>
  );
}
