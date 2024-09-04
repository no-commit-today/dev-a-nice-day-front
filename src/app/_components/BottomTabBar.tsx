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
              height="19"
              viewBox="0 0 20 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.7373 0L7.56834 2.78211C7.33455 2.85224 7.12414 2.96914 6.91373 3.08604L4.13162 1.91708L2.44833 3.60037L3.61728 6.38248C3.50039 6.61627 3.40687 6.8033 3.31336 7.03709L0.53125 8.20605V10.544L3.31336 11.7129C3.40687 11.9467 3.50039 12.1337 3.61728 12.3675L2.44833 15.1496L4.13162 16.8329L6.91373 15.664C7.12414 15.7575 7.33455 15.8744 7.56834 15.9679L8.7373 18.75H11.0752L12.2442 15.9679C12.4546 15.8744 12.6884 15.7809 12.8988 15.664L15.6809 16.8329L17.3642 15.1496L16.1952 12.3675C16.2887 12.1571 16.4056 11.9233 16.4991 11.7129L19.2812 10.544V8.20605L16.4991 7.03709C16.429 6.82668 16.3121 6.59289 16.1952 6.38248L17.3642 3.60037L15.6809 1.91708L12.8988 3.08604C12.6884 2.99252 12.4546 2.87562 12.2442 2.78211L11.0752 0L8.7373 0ZM9.90625 5.84476C11.8467 5.84476 13.4131 7.41116 13.4131 9.35162C13.4131 11.2921 11.8467 12.8585 9.90625 12.8585C7.96579 12.8585 6.39939 11.2921 6.39939 9.35162C6.39939 7.41116 7.96579 5.84476 9.90625 5.84476Z"
                fill={pathname === "/setting" ? "#fff" : "#898989"}
              />
            </svg>
          </div>
          <span
            className={
              pathname === "/setting" ? styles.textFocused : styles.text
            }
          >
            더보기
          </span>
        </div>
      </Link>
    </div>
  );
}
