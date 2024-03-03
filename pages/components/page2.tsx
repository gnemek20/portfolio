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

  // skill list
  interface skillListProps {
    name: string,
    image: imageType
  }

  const mainSkillList: Array<skillListProps> = [
    {
      name: 'NextJS',
      image: require('@/public/logos/nextLogo.png')
    },
    {
      name: 'VueJS',
      image: require('@/public/logos/vueLogo.png')
    },
    {
      name: 'ReactJS',
      image: require('@/public/logos/reactLogo.png')
    }
  ]

  const subSkillList: Array<skillListProps> = [
    {
      name: 'Express',
      image: require('@/public/logos/expressLogo.png')
    },
    {
      name: 'MySQL',
      image: require('@/public/logos/mysqlLogo.png')
    },
    {
      name: 'Python',
      image: require('@/public/logos/pythonLogo.png')
    },
    {
      name: 'GitHub',
      image: require('@/public/logos/githubLogo.png')
    }
  ]

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
      <Image
        className={styles.backgroundImage}
        src={backgroundImage.src}
        alt={backgroundImage.alt}
      ></Image>
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <Image
              className={styles.paper}
              src={paperLeftImage.src}
              alt={paperLeftImage.alt}
            ></Image>
            <div className={styles.content}>
              <div className={`${styles.panel} ${currentPanelNumber === firstPanelNumber && styles.active}`}>
                <div className={styles.title}>
                  <h1>Profile</h1>
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
                    {
                      mainSkillList.map((skill: skillListProps, index: number) => (
                        <div className={styles.skill} key={index}>
                          <div className={styles.skillImage}>
                            <Image
                              src={skill.image}
                              alt={skill.name}
                              width={32}
                            ></Image>
                          </div>
                          <div className={styles.skillDescription}>
                            <h3>{ skill.name }</h3>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
                <div className={styles.subSkill}>
                  <div className={styles.title}>
                    <h1>Sub Skill</h1>
                  </div>
                  <div className={styles.skillList}>
                    {
                      subSkillList.map((skill: skillListProps, index: number) => (
                        <div className={styles.skill} key={index}>
                          <div className={styles.skillImage}>
                            <Image
                              src={skill.image}
                              alt={skill.name}
                              width={32}
                            ></Image>
                          </div>
                          <div className={styles.skillDescription}>
                            <h3>{ skill.name }</h3>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
              <div className={styles.swiper}>
                <button className={`${currentPanelNumber === firstPanelNumber && styles.disabled}`} onClick={onClickPrevButton}>
                  <Image
                    src={leftArrowIcon.src}
                    alt={leftArrowIcon.alt}
                    width={30}
                  ></Image>
                  이전
                </button>
                <button className={`${currentPanelNumber === lastPanelNumber && styles.disabled}`} onClick={onClickNextButton}>
                  다음
                  <Image
                    src={rightArrowIcon.src}
                    alt={rightArrowIcon.alt}
                    width={30}
                  ></Image>
                </button>
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <Image
              className={styles.paper}
              src={paperRightImage.src}
              alt={paperRightImage.alt}
            ></Image>
            <div className={styles.content}>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page2;