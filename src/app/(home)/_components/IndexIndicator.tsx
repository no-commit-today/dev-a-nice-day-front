import Number1 from "@/../public/assets/number_1.svg";
import Number2 from "@/../public/assets/number_2.svg";
import Number3 from "@/../public/assets/number_3.svg";

export default function IndexIndicator({ index }: { index: number }) {
  if (index === 0) {
    return <img src={Number1.src} width={23} height={23} />;
  }
  if (index === 1) {
    return <img src={Number2.src} width={23} height={23} />;
  } else {
    return <img src={Number3.src} width={23} height={23} />;
  }
}
