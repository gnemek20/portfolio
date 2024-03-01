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
  const [touchedClientY, setTouchedClientY] = useState<number>(0);

  const preventEvent = (event: Event) => {
    event.preventDefault();
  }

  const onWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) movePage('down');
    else if (event.deltaY < 0) movePage('up');
  }
  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchedClientY(event.touches[0].clientY);
  }
  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const offset: number = 50;
    const movedClientY: number = event.touches[0].clientY;

    if (touchedClientY > (movedClientY + offset)) movePage('down');
    else if (touchedClientY < (movedClientY - offset)) movePage('up');
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
    document.documentElement.style.setProperty('--vh', `${window.innerHeight}px`);
    setPageInnerHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener('resize', onResizeHeight);
    onResizeHeight();

    window.addEventListener('wheel', preventEvent, { passive: false });
    window.addEventListener('touchstart', preventEvent, { passive: false });
    window.addEventListener('touchmove', preventEvent, { passive: false });
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
        <h1>{ homeRef.current?.scrollTop }</h1>
        <h1>{ pageInnerHeight }</h1>
      </div>
      <div className={styles.page}>
        <h1>{ homeRef.current?.scrollTop }</h1>
        <h1>{ pageInnerHeight }</h1>
      </div>
      <div className={styles.page}>
        <h1>{ homeRef.current?.scrollTop }</h1>
        <h1>{ pageInnerHeight }</h1>
      </div>
    </div>
  );
}
