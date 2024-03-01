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

  const videoSrc = "https://vod-progressive.akamaized.net/exp=1709345247~acl=%2Fvimeo-prod-skyfire-std-us%2F01%2F4722%2F5%2F148614367%2F452088318.mp4~hmac=2d8741944fc7cdb0ce803a6ae3cd59cc7e736a54adb79bd87348280bdfded8f2/vimeo-prod-skyfire-std-us/01/4722/5/148614367/452088318.mp4?filename=file.mp4";

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
        muted
        autoPlay
        loop
      >
        <source src={videoSrc} />
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