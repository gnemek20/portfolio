import styles from "@/styles/Page3.module.scss";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useRef, useState } from "react";

interface page3Props {
  onChangeIsShowingModalStatus?: Function
}

const page3 = (props: page3Props) => {
  type imageType = StaticImport;
  interface imageProps {
    src: imageType,
    alt: string
  }

  const backgrounrdImage: imageProps = {
    src: require('@/public/images/page3Background.jpg'),
    alt: 'backgroundImage'
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

  const onClickPortfolio = () => {
    const isNowShowingModal = true;

    setIsShowingModal(isNowShowingModal);
    if (props.onChangeIsShowingModalStatus) props.onChangeIsShowingModalStatus(isNowShowingModal);
  }
  
  const onClickModal = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === modalRef.current) {
      const isNowShowingModal = false;

      setIsShowingModal(isNowShowingModal);
      if (props.onChangeIsShowingModalStatus) props.onChangeIsShowingModalStatus(isNowShowingModal);
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

        </div>
      </div>
      <div className={styles.dimmed}></div>
      <Image
        className={styles.backgroundImage}
        src={backgrounrdImage.src}
        alt={backgrounrdImage.alt}
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
                onClick={onClickPortfolio}
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