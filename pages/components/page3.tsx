import styles from "@/styles/Page3.module.scss";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef, useState } from "react";
import Flicking from "@egjs/react-flicking";

interface page3Props {
  onChangeIsShowingModalStatus?: Function
}

const page3 = (props: page3Props) => {
  type imageType = StaticImport;
  interface imageProps {
    src: imageType,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require('@/public/images/page3Background.jpg'),
    alt: 'backgroundImage'
  }

  const closeIcon: imageProps = {
    src: require('@/public/icons/close.svg'),
    alt: 'closeIcon'
  }

  // portfolio
  const dogImage: imageProps = {
    src: require('@/public/dummy/dog.jpg'),
    alt: 'dogImage'
  }
  const duckImage: imageProps = {
    src: require('@/public/dummy/duck.jpg'),
    alt: 'duckImage'
  }
  const parrotImage: imageProps = {
    src: require('@/public/dummy/parrot.jpg'),
    alt: 'parrotImage'
  }
  const squirrelImage: imageProps = {
    src: require('@/public/dummy/squirrel.jpg'),
    alt: 'squirrelImage'
  }

  interface portfolioProps {
    name: string,
    image: imageProps
  }

  const portfolioList: Array<portfolioProps> = [
    {
      name: 'DOG',
      image: dogImage
    },
    {
      name: 'DUCK',
      image: duckImage
    },
    {
      name: 'PARROT',
      image: parrotImage
    },
    {
      name: 'SQUIRREL',
      image: squirrelImage
    }
  ]

  const [selectedPortfolio, setSelectedPortfolio] = useState<portfolioProps>({ name: 'dummy', image: backgroundImage });
  const [mouseOveredPortfolio, setMouseOveredPortfolio] = useState<string>('');

  const onMouseEnterPortfolio = (portfolioName: string) => {
    setMouseOveredPortfolio(portfolioName);
  }
  const onMouseLeavePortfolio = () => {
    setMouseOveredPortfolio('');
  }

  // modal
  const modalRef = useRef<HTMLDivElement>(null);
  const [isShowingModal, setIsShowingModal] = useState<boolean>(false);
  const [isCanCloseModal, setIsCanCloseModal] = useState<boolean>(true);

  const onClickPortfolio = (index: number) => {
    const isNowShowingModal = true;

    setSelectedPortfolio(portfolioList[index]);
    setIsShowingModal(isNowShowingModal);
    if (props.onChangeIsShowingModalStatus) props.onChangeIsShowingModalStatus(isNowShowingModal);
  }
  
  const onClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current && isCanCloseModal) {
      const isNowShowingModal = false;

      flickingRef.current?.moveTo(0);
      setIsShowingModal(isNowShowingModal);
      if (props.onChangeIsShowingModalStatus) props.onChangeIsShowingModalStatus(isNowShowingModal);
    }
  }

  const onMoveStartFlicking = () => {
    setIsCanCloseModal(false);
  }
  const onChangedFlicking = () => {
    setIsCanCloseModal(true);
    setIsCanMovePanel(true);
  }

  // flicking
  type directionType = 'left' | 'right';

  const flickingRef = useRef<Flicking>(null);

  const [isCanMovePanel, setIsCanMovePanel] = useState<boolean>(true);

  const onWheelFlicking = (event: React.WheelEvent<HTMLDivElement>) => {
    if (event.deltaY > 0) movePanel('right');
    else if (event.deltaY < 0) movePanel('left');
  }
  const movePanel = (direction: directionType) => {
    if (isCanMovePanel === false || flickingRef.current?.animating) return;

    const startPanelIndex = 0;
    const lastPanelIndex = flickingRef.current?.panelCount? flickingRef.current?.panelCount - 1 : 0;
    
    if (direction === 'left' && flickingRef.current?.index !== startPanelIndex) {
      flickingRef.current?.prev();
      setIsCanMovePanel(false);
    }
    else if (direction === "right" && flickingRef.current?.index !== lastPanelIndex) {
      flickingRef.current?.next();
      setIsCanMovePanel(false);
    }
  }

  return (
    <div className={styles.section}>
      <div
        ref={modalRef}
        className={`
          ${styles.modal}
          ${isShowingModal ? styles.active : styles.disabled}
        `}
        onClick={(event) => onClickModal(event)}
      >
        <div className={styles.wrapper}>
          <div className={styles.description}>
            <h1>{ selectedPortfolio.name }</h1>
            <h4>introduce</h4>
          </div>
          <div
            className={styles.flickingContainer}
            onWheel={(event) => onWheelFlicking(event)}
          >
            <Flicking
              ref={flickingRef}
              duration={500}
              deceleration={1}
              onMoveStart={onMoveStartFlicking}
              onChanged={onChangedFlicking}
              bounce={0}
            >
              <div className={styles.flickingPanel}>
                <Image src={backgroundImage.src} alt="alt"></Image>
              </div>
              <div className={styles.flickingPanel}></div>
              <div className={styles.flickingPanel}></div>
            </Flicking>
          </div>
          <div
            className={styles.closeModalButton}
            onClick={() => setIsShowingModal(false)}
          >
            <Image
              src={closeIcon.src}
              alt={closeIcon.alt}
            ></Image>
          </div>
        </div>
      </div>
      <div className={styles.dimmed}></div>
      <Image
        className={styles.backgroundImage}
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></Image>
      <div className={styles.gradation}></div>
      <div className={styles.container}>
        <div className={styles.title}>
          <h1>Portfolio</h1>
        </div>
        <div className={styles.list}>
          {
            portfolioList.map((portfolio, index) => (
              <div
                className={`
                  ${styles.item}
                  ${(portfolio.name === mouseOveredPortfolio) && styles.hoveredItem}
                `}
                key={index}
                onClick={() => onClickPortfolio(index)}
                onMouseEnter={() => onMouseEnterPortfolio(portfolio.name)}
                onMouseLeave={onMouseLeavePortfolio}
              >
                <Image
                  className={`
                    ${styles.image}
                    ${portfolio.name === mouseOveredPortfolio && styles.hoveredImage}
                  `}
                  src={portfolio.image.src}
                  alt={portfolio.image.alt}
                ></Image>
                {
                  portfolio.name === mouseOveredPortfolio && (
                    <div className={styles.dimmed}>
                      <h4>{ portfolio.name }</h4>
                    </div>
                  )
                }
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page3;