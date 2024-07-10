import Number1 from "@/../public/assets/number_1.svg";
import Number2 from "@/../public/assets/number_2.svg";
import Number3 from "@/../public/assets/number_3.svg";
import Number4 from "@/../public/assets/number_4.svg";
import Number5 from "@/../public/assets/number_5.svg";
import Image from "next/image";

export default function IndexIndicator({ index }: { index: number }) {
  if (index === 0) {
    return <Image alt={"number"} src={Number1.src} width={23} height={23} />;
  }
  if (index === 1) {
    return <Image alt={"number"} src={Number2.src} width={23} height={23} />;
  }
  if (index === 2) {
    return <Image alt={"number"} src={Number3.src} width={23} height={23} />;
  }
  if (index === 3) {
    return <Image alt={"number"} src={Number4.src} width={23} height={23} />;
  } else {
    return <Image alt={"number"} src={Number5.src} width={23} height={23} />;
  }
}
