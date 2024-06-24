import Link from "next/link";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import category from "@/../public/assets/categories.svg";
import ContentSlider from "./_components/ContentSlider";

export default function Home() {
  const cookieStore = cookies();
  const popup = cookieStore.has("popup");
  if (!popup) {
    redirect("/onboarding");
  }
  const content = {
    content: [
      {
        id: 1,
        url: "https://content-url",
        title: "UX디자인에서의 디자인 시스템 구축하기",
        summary:
          "- 구글의 AI 모델 제미나이가 정치적 올바름을 과도하게 반영해 불필요한 이미지를 생성, 사용자의 불만을 샀다. - 구글의 AI 모델 제미나이가 정치적 올바름을 과도하게 반영해 불필요한 이미지를 생성, 사용자의 불만을 샀다. - 최종적으로, 구글의 실패는 AI와 기술 서비스에 윤리적 고려와 사용자 중심 디자인이 필수임을 재확인시켰다. - 이 사태는 출시 전 충분한 테스트의 부재를 드러내며, 기술뿐 아니라 UX 디자인의 중요성을 강조한다. - 구글의 AI 모델 제미나이가 정치적 올바름을 과도하게 반영해 불필요한 이미지를 생성, 사용자의 불만을 샀다.",
        imageUrl: "https://picsum.photos/1000/1000",
        categories: ["SW엔지니어링", "웹 개발"],
        providerId: 2,
        providerTitle: "토스",
        providerUrl: "https://provider-url",
        providerIconUrl: "https://picsum.photos/200/200",
        publishedDate: "2021.08.01",
      },
      {
        id: 2,
        url: "https://content-url",
        title: "title2",
        summary: "summary",
        imageUrl: "https://picsum.photos/200/300",
        categories: ["웹 개발"],
        providerId: 2,
        providerTitle: "title",
        providerUrl: "https://provider-url",
        providerIconUrl: "https://picsum.photos/200/200",
        publishedDate: "2021.08.01",
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <div className={styles.categoryBox}>
          <img src={category.src} />
          <h1 className={styles.grayMediumText}>관심주제 변경</h1>
        </div>
        <div className={styles.sliderBox}>
          <ContentSlider contentData={content.content} />
        </div>
      </div>
    </div>
  );
}
