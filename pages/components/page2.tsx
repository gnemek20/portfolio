import styles from "@/styles/Page2.module.scss";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import Image from "next/image";

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

  return (
    <div className={styles.section}>
      <div className={styles.dimmed} />
      <Image className={styles.backgroundImage} src={backgroundImage.src} alt={backgroundImage.alt}></Image>
      <div className={styles.content}>
        <div className={styles.container}>
          <div className={styles.left}>
            <Image className={styles.paper} src={paperLeftImage.src} alt={paperLeftImage.alt}></Image>
          </div>
          <div className={styles.right}>
            <Image className={styles.paper} src={paperRightImage.src} alt={paperRightImage.alt}></Image>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page2;