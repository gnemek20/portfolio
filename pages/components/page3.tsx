import styles from "@/styles/Page3.module.scss";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

const page3 = () => {
  type imageType = StaticImport;
  interface imageProps {
    src: imageType,
    alt: string
  }

  const backgrounrdImage: imageProps = {
    src: require('@/public/images/page3Background.jpg'),
    alt: 'backgroundImage'
  }

  return (
    <div className={styles.section}>
      <div className={styles.dimmed}></div>
      <Image
        className={styles.backgroundImage}
        src={backgrounrdImage.src}
        alt={backgrounrdImage.alt}
      ></Image>
      <div className={styles.gradation}></div>
    </div>
  )
}

export default page3;