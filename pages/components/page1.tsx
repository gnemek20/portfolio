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

  const videoSrc = "https://static.vecteezy.com/system/resources/previews/004/827/602/mp4/abstract-plexus-blue-geometrical-shapes-connection-and-web-concept-digital-communication-and-technology-background-with-with-moving-lines-and-dots-free-video.mp4";

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
        <source src={videoSrc} />
      </video>
      <div className={styles.content}>
        <h1 className={styles.name}>GWON MINSEOK</h1>
        <hr />
        <h4>Rhino Developer</h4>
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