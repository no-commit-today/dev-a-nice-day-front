import Number1 from "@/../public/assets/number_1.svg";
import Number2 from "@/../public/assets/number_2.svg";
import Number3 from "@/../public/assets/number_3.svg";
import Number4 from "@/../public/assets/number_4.svg";
import Number5 from "@/../public/assets/number_5.svg";

export default function IndexIndicator({ index }: { index: number }) {
  if (index === 0) {
    return <img src={Number1.src} width={23} height={23} />;
  }
  if (index === 1) {
    return <img src={Number2.src} width={23} height={23} />;
  }
  if (index === 2) {
    return <img src={Number3.src} width={23} height={23} />;
  }
  if (index === 3) {
    return <img src={Number4.src} width={23} height={23} />;
  } else {
    return <img src={Number5.src} width={23} height={23} />;
  }
}
