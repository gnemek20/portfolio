import styles from "@/styles/Home.module.scss";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  // ref
  const homeRef = useRef<HTMLDivElement>(null);

  const consoleLog = () => {
    console.log('console!');
  }

  // scroll
  type directionType = 'up' | 'down';

  const [pageInnerHeight, setPageInnerHeight] = useState<number>(0);
  const [touchedPageY, setTouchedPageY] = useState<number>(0);

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) movePage('down');
    else if (event.deltaY < 0) movePage('up');
  }
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchedPageY(event.touches[0].pageY);
  }
  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const offset: number = 50;
    const movedPageY: number = event.touches[0].pageY;

    if (touchedPageY > (movedPageY + offset)) movePage('down');
    else if (touchedPageY < (movedPageY - offset)) movePage('up');
  }
  const movePage = (direction: directionType) => {
    const currentPageTop: number = homeRef.current?.scrollTop ? homeRef.current?.scrollTop : 0;
    if (currentPageTop % pageInnerHeight !== 0) return;
    
    const startPageNumber: number = 0;
    const lastPageNumber: number = 2;
    const currentPageNumber: number = currentPageTop / pageInnerHeight;
    let nextPageNumber: number = currentPageNumber;
    
    if (direction === 'up') {
      nextPageNumber = (currentPageNumber - 1) > startPageNumber ? (currentPageNumber - 1) : startPageNumber;
    }
    else if (direction === 'down') {
      nextPageNumber = (currentPageNumber + 1) < lastPageNumber ? (currentPageNumber + 1) : lastPageNumber;
    }

    homeRef.current?.scrollTo({
      top: pageInnerHeight * nextPageNumber,
      behavior: 'smooth'
    });
  }

  // resize
  const onResizeHeight = () => {
    homeRef.current?.scrollTo({
      top: 0
    });

    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    setPageInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', onResizeHeight);
    onResizeHeight();
  }, []);

  return (
    <div
      ref={homeRef}
      className={styles.home}
      onWheel={(event) => onWheel(event)}
      onTouchStart={(event) => onTouchStart(event)}
      onTouchMove={(event) => onTouchMove(event)}
    >
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
