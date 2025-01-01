import { categoryFallback } from "../_components/CategoryFallBack/CategoryFallback";
import ContentFallBack from "./_components/ContentSliderFallback/ContentSliderFallback";
import styles from "./loading.module.css";
export default function Loading() {
  const CategoryBar = () => categoryFallback;
  return <ContentFallBack />;
}
