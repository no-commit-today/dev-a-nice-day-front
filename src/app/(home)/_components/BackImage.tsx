import Image from "next/image";
import no_image from "@/../public/assets/no_image.svg";
import styles from "./ContentSlider.module.css";
import { useEffect } from "react";

const BackImage = ({
  imageUrl,
  isActive,
}: {
  imageUrl: string;
  isActive: boolean;
}) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        right: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "calc(50% - 300px)",
          height: "100%",
          backgroundColor: "black",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "calc(50% - 300px)",
          height: "100%",
          backgroundColor: "black",
        }}
      />
      <Image
        src={imageUrl ? imageUrl : no_image.src}
        alt={"main Image"}
        fill
        priority={true}
        style={{
          objectFit: "cover",
          opacity: 0.2,
          transform: isActive ? "" : "scale(1.2)",
        }}
        className={isActive ? styles["image-animation"] : ""}
      ></Image>
    </div>
  );

  return null;
};

export default BackImage;
