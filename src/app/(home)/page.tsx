"use client";
import styles from "./page.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import ContentSlider from "./_components/ContentSlider";
import CategoryButton from "../_components/CategoryButton";

function shuffleArray(array: object[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default function Home({ searchParams }: { searchParams: any }) {
  // const cookieStore = cookies();
  // const popup = cookieStore.has("popup");
  // if (!popup) {
  //   redirect("/onboarding");
  // }

  const totalPage = 10;
  var numbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  function getRandomNumber() {
    if (numbers.length === 0) {
      numbers = Array.from({ length: totalPage }, (_, i) => i + 1);
    }
    const randomIndex = Math.floor(Math.random() * numbers.length); // 랜덤 인덱스 선택
    const selectedNumber = numbers[randomIndex]; // 선택된 숫자
    numbers.splice(randomIndex, 1); // 선택된 숫자 배열에서 제거
    return selectedNumber;
  }
  const getPage = () => {
    const page = getRandomNumber();
    console.log(numbers);
    console.log(page);
    return page;
  };
  const originalContent = {
    content: [
      {
        id: 1,
        url: "https://content-url",
        title: "UX디자인에서의 디자인 시스템 구축하기",
        summary:
          "- 구글의 AI 모델 제미나이가 정치적 올바름을 과도하게 반영해 불필요한 이미지를 생성, 사용자의 불만을 샀다. - 구글의 AI 모델 제미나이가 정치적 올바름을 과도하게 반영해 불필요한 이미지를 생성, 사용자의 불만을 샀다. - 최종적으로, 구글의 실패는 AI와 기술 서비스에 윤리적 고려와 사용자 중심 디자인이 필수임을 재확인시켰다. - 이 사태는 출시 전 충분한 테스트의 부재를 드러내며, 기술뿐 아니라 UX 디자인의 중요성을 강조한다. - 구글의 AI 모델 제미나이가 정치적 올바름을 과도하게 반영해 불필요한 이미지를 생성, 사용자의 불만을 샀다.",
        imageUrl: "https://picsum.photos/1000/1000",
        categories: ["SW_ENGINEERING", "WEB"],
        providerId: 2,
        providerTitle: "토스",
        providerUrl: "https://toss.im/",
        providerIconUrl: "https://picsum.photos/200/200",
        publishedDate: "2021-08-01",
      },
      {
        id: 2,
        url: "https://content-url",
        title: "title2",
        summary: "summary",
        imageUrl: "https://picsum.photos/200/300",
        categories: ["SW_ENGINEERING"],
        providerId: 2,
        providerTitle: "title",
        providerUrl: "https://toss.im/",
        providerIconUrl: "https://picsum.photos/200/200",
        publishedDate: "2021-08-01",
      },
    ],
  };

  const content = shuffleArray(originalContent.content);

  return (
    <div className={styles.container}>
      <button
        onClick={() => {
          getPage();
        }}
      >
        Click me
      </button>
      <div className={styles.contentBox}>
        <CategoryButton />
        <div className={styles.sliderBox}>
          <ContentSlider contentData={content} />
        </div>
      </div>
    </div>
  );
}
