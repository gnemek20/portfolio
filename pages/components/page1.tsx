import styles from "@/styles/Page1.module.scss";
import Image from "next/image"
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { useEffect, useRef } from "react";

interface page1Props {
  play?: boolean
}

const page1 = (props: page1Props) => {
  type imageType = StaticImport;

  interface imageProps {
    src: imageType,
    alt: string
  }

  const videoRef = useRef<HTMLVideoElement>(null);

  const downArrowImage: imageProps = {
    src: require('@/public/icons/downArrow.svg'),
    alt: 'downArrow'
  }
  
  useEffect(() => {
    const { play } = props;

    if (play) videoRef.current?.play();
    else videoRef.current?.pause();
  }, [props]);

  return (
    <div className={styles.section}>
      <div className={styles.dimmed} />
      <video
        ref={videoRef}
        className={styles.video}
        playsInline
        muted
        autoPlay
        loop
      >
        <source src="https://cdn.pixabay.com/vimeo/148614367/1625.mp4?width=640&hash=c99e4b60975fc73d61c6447f8635f524009ab7b2" />
      </video>
      <div className={styles.content}>
        <h1 className={styles.name}>GWON MINSEOK</h1>
        <hr />
        <h4>FrontEnd Developer</h4>
      </div>
      <Image
        className={styles.downArrowImage}
        src={downArrowImage.src}
        alt={downArrowImage.alt}
      ></Image>
    </div>
  )
}

export default page1;