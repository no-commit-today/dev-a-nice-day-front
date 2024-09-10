import Image from "next/image";
import no_image from "@/../public/assets/no_image.svg";
import styles from "./ContentSlider.module.css";

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
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        overflow: "hidden",
      }}
    >
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
};

export default BackImage;
