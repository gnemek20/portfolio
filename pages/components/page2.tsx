import styles from "@/styles/Page2.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";
import { useEffect, useState } from "react";

const page2 = () => {
  type imageType = StaticImport;
  interface imageProps {
    src: imageType,
    alt: string
  }

  const backgroundImage: imageProps = {
    src: require('@/public/images/page2Background.jpg'),
    alt: 'backgroundImage'
  }

  const paperLeftImage: imageProps = {
    src: require('@/public/images/paperLeft.png'),
    alt: 'paperLeftImage'
  }
  const paperRightImage: imageProps = {
    src: require('@/public/images/paperRight.png'),
    alt: 'paperRightImage'
  }

  const foldedNoteIcon: imageProps = {
    src: require('@/public/icons/foldedNote.svg'),
    alt: 'foldedNoteIcon'
  }

  const nextLogo: imageProps = {
    src: require('@/public/logos/nextLogo.png'),
    alt: 'nextLogo'
  }
  const reactLogo: imageProps = {
    src: require('@/public/logos/reactLogo.png'),
    alt: 'reactLogo'
  }
  const vueLogo: imageProps = {
    src: require('@/public/logos/vueLogo.png'),
    alt: 'vueLogo'
  }
  const expressLogo: imageProps = {
    src: require('@/public/logos/expressLogo.png'),
    alt: 'expressLogo'
  }
  const mysqlLogo: imageProps = {
    src: require('@/public/logos/mysqlLogo.png'),
    alt: 'mysqlLogo'
  }
  const pythonLogo: imageProps = {
    src: require('@/public/logos/pythonLogo.png'),
    alt: 'pythonLogo'
  }
  const githubLogo: imageProps = {
    src: require('@/public/logos/githubLogo.png'),
    alt: 'githubLogo'
  }

  // check mobile
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const checkIsMobile = () => {
    if (window.innerWidth <= 1200 || window.innerHeight <= 800) setIsMobile(true);
    else setIsMobile(false);
  }

  useEffect(() => {
    window.addEventListener('resize', checkIsMobile);
    checkIsMobile();
  }, []);

  // panel
  const leftArrowIcon: imageProps = {
    src: require('@/public/icons/leftArrow.svg'),
    alt: 'leftArrowIcon'
  }
  const rightArrowIcon: imageProps = {
    src: require('@/public/icons/rightArrow.svg'),
    alt: 'rightArrowIcon'
  }

  const firstPanelNumber = 0;
  const lastPanelNumber = 1;

  const [currentPanelNumber, setCurrentPanelNumber] = useState<number>(0);

  const onClickPrevButton = () => {
    if (currentPanelNumber !== firstPanelNumber) setCurrentPanelNumber(currentPanelNumber - 1);
  }
  const onClickNextButton = () => {
    if (currentPanelNumber !== lastPanelNumber) setCurrentPanelNumber(currentPanelNumber + 1);
  }

  return (
    <div className={styles.section}>
      <div className={styles.dimmed} />
      <Image className={styles.backgroundImage} src={backgroundImage.src} alt={backgroundImage.alt}></Image>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Image className={styles.paper} src={paperLeftImage.src} alt={paperLeftImage.alt}></Image>
            <div className={styles.content}>
              <div className={`${styles.panel} ${currentPanelNumber === firstPanelNumber && styles.active}`}>
                <div className={styles.title}>
                  <h1>About Me</h1>
                </div>
                <div className={styles.text}>
                  <h3>안녕하세요</h3>
                  <h3>반갑습니다</h3>
                </div>
              </div>
              <div className={`${styles.panel} ${currentPanelNumber === lastPanelNumber && styles.active}`}>
                <div className={styles.mainSkill}>
                  <div className={styles.title}>
                    <h1>Main Skill</h1>
                  </div>
                  <div className={styles.skillList}>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={nextLogo.src} alt={nextLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>NextJS</h3>
                      </div>
                    </div>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={vueLogo.src} alt={vueLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>VueJS</h3>
                      </div>
                    </div>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={reactLogo.src} alt={reactLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>ReactJS</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.subSkill}>
                  <div className={styles.title}>
                    <h1>Sub Skill</h1>
                  </div>
                  <div className={styles.skillList}>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={expressLogo.src} alt={expressLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>Express</h3>
                      </div>
                    </div>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={mysqlLogo.src} alt={mysqlLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>MySQL</h3>
                      </div>
                    </div>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={pythonLogo.src} alt={pythonLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>Python</h3>
                      </div>
                    </div>
                    <div className={styles.skill}>
                      <div className={styles.skillImage}>
                        <Image src={githubLogo.src} alt={githubLogo.alt} width={30}></Image>
                      </div>
                      <div className={styles.skillDescription}>
                        <h3>GitHub</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.swiper}>
                <button className={`${currentPanelNumber === firstPanelNumber && styles.disabled}`} onClick={onClickPrevButton}>
                  <Image src={leftArrowIcon.src} alt={leftArrowIcon.alt} width={30}></Image>
                  이전
                </button>
                <button className={`${currentPanelNumber === lastPanelNumber && styles.disabled}`} onClick={onClickNextButton}>
                  다음
                  <Image src={rightArrowIcon.src} alt={rightArrowIcon.alt} width={30}></Image>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Image className={styles.paper} src={paperRightImage.src} alt={paperRightImage.alt}></Image>
            <div className={styles.content}>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page2;