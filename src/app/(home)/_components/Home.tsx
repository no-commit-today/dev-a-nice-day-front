import CategoryButton from "@/app/_components/CategoryButton";
import styles from "./Home.module.css";
import ContentSlider from "./ContentSlider";
export default function Home() {
  // const totalPage = 10;
  // var numbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  // function getRandomNumber() {
  //   if (numbers.length === 0) {
  //     numbers = Array.from({ length: totalPage }, (_, i) => i + 1);
  //   }
  //   const randomIndex = Math.floor(Math.random() * numbers.length); // 랜덤 인덱스 선택
  //   const selectedNumber = numbers[randomIndex]; // 선택된 숫자
  //   numbers.splice(randomIndex, 1); // 선택된 숫자 배열에서 제거
  //   return selectedNumber;
  // }
  // function shuffleArray(array: object[]) {
  //   for (let i = array.length - 1; i > 0; i--) {
  //     const j = Math.floor(Math.random() * (i + 1));
  //     [array[i], array[j]] = [array[j], array[i]];
  //   }
  //   return array;
  // }
  // const getPage = () => {
  //   const page = getRandomNumber();
  //   return 2;
  // };

  //const content = shuffleArray(originalContent.content);

  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <CategoryButton />
        <div className={styles.sliderBox}>
          <ContentSlider />
        </div>
      </div>
    </div>
  );
}
