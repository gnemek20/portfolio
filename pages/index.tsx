import styles from "@/styles/Home.module.scss";
import { useEffect, useRef, useState } from "react";
import Page1 from "@/pages/components/page1";
import Page2 from "@/pages/components/page2";
import Page3 from "@/pages/components/page3";

export default function Home() {
  // ref
  const homeRef = useRef<HTMLDivElement>(null);

  // scroll
  type directionType = 'up' | 'down';

  const [pageInnerHeight, setPageInnerHeight] = useState<number>(0);
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(0);
  const [touchedClientY, setTouchedClientY] = useState<number>(0);

  const [isVideoRunning, setIsVideoRunning] = useState<boolean>(true);
  const [isTransitionRunning, setIsTransitionRunning] = useState<boolean>(false);

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
    if (isTransitionRunning || isShowingModal) return;
    
    const firstPageNumber: number = 0;
    const lastPageNumber: number = 2;
    let nextPageNumber: number = firstPageNumber;

    if (direction === 'up') {
      if (currentPageNumber === firstPageNumber) return;
      nextPageNumber = currentPageNumber - 1;
    }
    else if (direction === 'down') {
      if (currentPageNumber === lastPageNumber) return;
      nextPageNumber = currentPageNumber + 1;
    }

    homeRef.current?.style.setProperty('transform', `translateY(-${pageInnerHeight * nextPageNumber}px)`);
    setIsTransitionRunning(true);
    setCurrentPageNumber(nextPageNumber);
  }

  // transition
  const onHomeRefTransitionEnd = (event: React.TransitionEvent<HTMLDivElement>) => {
    if (event.target === homeRef.current) setIsTransitionRunning(false);
  }

  // modal
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);

  const onChangeIsShowingModalStatus = (bool: boolean) => {
    setIsShowingModal(bool);
  }

  // resize
  const onResizeHeight = () => {
    const windowInnerHeight = window.innerHeight;
    setPageInnerHeight(windowInnerHeight);
  }

  useEffect(() => {
    if (currentPageNumber === 0) setIsVideoRunning(true);
    else setIsVideoRunning(false);
  }, [currentPageNumber]);

  useEffect(() => {
    homeRef.current?.style.setProperty('transform', `translateY(-${pageInnerHeight * currentPageNumber}px)`);
  }, [pageInnerHeight]);

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 250);

    window.addEventListener('resize', onResizeHeight);
    onResizeHeight();
  }, []);

  return (
    <div
      ref={homeRef}
      className={styles.home}
      onTransitionEnd={(event) => onHomeRefTransitionEnd(event)}
      onWheel={(event) => onWheel(event)}
      onTouchStart={(event) => onTouchStart(event)}
      onTouchMove={(event) => onTouchMove(event)}
    >
      <div style={{height: pageInnerHeight > 0 ? pageInnerHeight : '100vh'}}>
        <Page1 play={isVideoRunning} />
      </div>
      <div style={{height: pageInnerHeight > 0 ? pageInnerHeight : '100vh'}}>
        <Page2 />
      </div>
      <div style={{height: pageInnerHeight > 0 ? pageInnerHeight : '100vh'}}>
        <Page3 onChangeIsShowingModalStatus={onChangeIsShowingModalStatus} />
      </div>
    </div>
  );
}