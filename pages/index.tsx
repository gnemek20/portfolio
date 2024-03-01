import styles from "@/styles/Home.module.scss";

export default function Home() {
  const consoleLog = () => {
    console.log('console!');
  }

  return (
    <div className={styles.home} onScroll={consoleLog} onTouchStart={consoleLog} onTouchMove={consoleLog}>
      <div className={styles.page}>
        <h1>1</h1>
      </div>
      <div className={styles.page}>
        <h1>2</h1>
      </div>
      <div className={styles.page}>
        <h1>3</h1>
      </div>
    </div>
  );
}
