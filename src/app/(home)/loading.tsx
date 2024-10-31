import { categoryFallback } from "../_components/CategoryFallback";
import ContentFallBack from "./_components/ContentSliderFallback";
import styles from "./loading.module.css";
export default function Loading() {
  const CategoryBar = () => categoryFallback;
  return <ContentFallBack />;
}
