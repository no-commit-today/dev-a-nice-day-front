"use client";
import Link from "next/link";
import styles from "./BottomTabBar.module.css";
import { usePathname } from "next/navigation";
import useParams from "../_hooks/useParams";

export default function BottomTabBar() {
  const pathname = usePathname();
  const query = useParams("categories").getParamsToString();

  return (
    <div className={styles.container}>
      <Link
        href={{ pathname: "/", query: query }}
        className={styles.tabBtn}
        scroll={false}
        onClick={() => {
          if (pathname === "/content") {
            sessionStorage.setItem("scrollY", window.scrollY.toString());
          }
        }}
      >
        <div className={styles.btnBox}>
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.8455 7.83997H16.3423"
                stroke={pathname === "/" ? "#fff" : "#898989"}
                strokeOpacity={pathname === "/" ? "1" : "0.6"}
                strokeWidth="1.56211"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3.8455 12.5263H16.3423"
                stroke={pathname === "/" ? "#fff" : "#898989"}
                strokeOpacity={pathname === "/" ? "1" : "0.6"}
                strokeWidth="1.56211"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8.53182 3.15366L6.96972 17.2126"
                stroke={pathname === "/" ? "#fff" : "#898989"}
                strokeOpacity={pathname === "/" ? "1" : "0.6"}
                strokeWidth="1.56211"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.2181 3.15366L11.656 17.2126"
                stroke={pathname === "/" ? "#fff" : "#898989"}
                strokeOpacity={pathname === "/" ? "1" : "0.6"}
                strokeWidth="1.56211"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className={pathname === "/" ? styles.textFocused : styles.text}>
            홈
          </span>
        </div>
      </Link>
      <Link
        href={{ pathname: "/content", query: query }}
        className={styles.tabBtn}
        scroll={false}
      >
        <div className={styles.btnBox}>
          <div>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_147_1585)">
                <path
                  d="M11.0625 2.37302H4.8125C3.95312 2.37302 3.25781 3.07614 3.25781 3.93552L3.25 16.4355C3.25 17.2949 3.94531 17.998 4.80469 17.998H14.1875C15.0469 17.998 15.75 17.2949 15.75 16.4355V7.06052L11.0625 2.37302ZM12.625 14.873H6.375V13.3105H12.625V14.873ZM12.625 11.748H6.375V10.1855H12.625V11.748ZM10.2812 7.84177V3.54489L14.5781 7.84177H10.2812Z"
                  fill={pathname === "/content" ? "#fff" : "#898989"}
                  fillOpacity={pathname === "/content" ? "1" : "0.6"}
                />
              </g>
              <defs>
                <clipPath id="clip0_147_1585">
                  <rect
                    width="18.75"
                    height="18.75"
                    fill="white"
                    transform="translate(0.125 0.810516)"
                  />
                </clipPath>
              </defs>
            </svg>
          </div>
          <span
            className={
              pathname === "/content" ? styles.textFocused : styles.text
            }
          >
            콘텐츠
          </span>
        </div>
      </Link>
      <Link
        href={{ pathname: "/setting", query: query }}
        className={styles.tabBtn}
        onClick={() => {
          if (pathname === "/content") {
            sessionStorage.setItem("scrollY", window.scrollY.toString());
          }
        }}
      >
        <div className={styles.btnBox}>
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16.1553 17.2126V15.6505C16.1553 14.8219 15.8261 14.0272 15.2402 13.4413C14.6543 12.8554 13.8596 12.5263 13.031 12.5263H6.78263C5.95404 12.5263 5.15938 12.8554 4.57348 13.4413C3.98757 14.0272 3.65842 14.8219 3.65842 15.6505V17.2126"
                stroke="#898989"
                stroke-width="1.56211"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.90683 9.40208C11.6323 9.40208 13.031 8.00332 13.031 6.27787C13.031 4.55241 11.6323 3.15366 9.90683 3.15366C8.18138 3.15366 6.78262 4.55241 6.78262 6.27787C6.78262 8.00332 8.18138 9.40208 9.90683 9.40208Z"
                stroke="#898989"
                stroke-width="1.56211"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span
            className={
              pathname === "/setting" ? styles.textFocused : styles.text
            }
          >
            내정보
          </span>
        </div>
      </Link>
    </div>
  );
}
