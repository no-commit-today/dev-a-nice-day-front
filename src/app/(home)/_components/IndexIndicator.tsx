import Number1 from "@/../public/assets/number_1.svg";
import Number2 from "@/../public/assets/number_2.svg";
import Number3 from "@/../public/assets/number_3.svg";
import Image from "next/image";

export default function IndexIndicator({ index }: { index: number }) {
  if (index === 0) {
    return (
      <Image
        alt={"number"}
        src={Number1.src}
        width={23}
        height={23}
        priority={true}
      />
    );
  }
  if (index === 1) {
    return (
      <Image
        alt={"number"}
        src={Number2.src}
        width={23}
        height={23}
        priority={true}
      />
    );
  }
  if (index === 2) {
    return (
      <Image
        alt={"number"}
        src={Number3.src}
        width={23}
        height={23}
        priority={true}
      />
    );
  }
}
