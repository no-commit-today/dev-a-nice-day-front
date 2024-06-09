"use client";
import Link from "next/link";
import styles from "./BottomTabBar.module.css";
import { usePathname } from "next/navigation";

const BottomTabBar = () => {
  const pathname = usePathname();
  return (
    <div className={styles.container}>
      <Link href="/" className={styles.tabBtn}>
        <div className={styles.btnBox}>
          <div>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_147_1585)">
                <path
                  d="M11.0625 2.37302H4.8125C3.95312 2.37302 3.25781 3.07614 3.25781 3.93552L3.25 16.4355C3.25 17.2949 3.94531 17.998 4.80469 17.998H14.1875C15.0469 17.998 15.75 17.2949 15.75 16.4355V7.06052L11.0625 2.37302ZM12.625 14.873H6.375V13.3105H12.625V14.873ZM12.625 11.748H6.375V10.1855H12.625V11.748ZM10.2812 7.84177V3.54489L14.5781 7.84177H10.2812Z"
                  fill={pathname === "/" ? "#fff" : "#898989"}
                  fill-opacity={pathname === "/" ? "1" : "0.6"}
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
          <span className={pathname === "/" ? styles.textFocused : styles.text}>
            홈
          </span>
        </div>
      </Link>
      <Link href="/content" className={styles.tabBtn}>
        <div className={styles.btnBox}>
          <div>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_147_1585)">
                <path
                  d="M11.0625 2.37302H4.8125C3.95312 2.37302 3.25781 3.07614 3.25781 3.93552L3.25 16.4355C3.25 17.2949 3.94531 17.998 4.80469 17.998H14.1875C15.0469 17.998 15.75 17.2949 15.75 16.4355V7.06052L11.0625 2.37302ZM12.625 14.873H6.375V13.3105H12.625V14.873ZM12.625 11.748H6.375V10.1855H12.625V11.748ZM10.2812 7.84177V3.54489L14.5781 7.84177H10.2812Z"
                  fill={pathname === "/content" ? "#fff" : "#898989"}
                  fill-opacity={pathname === "/content" ? "1" : "0.6"}
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
      <Link href="/setting" className={styles.tabBtn}>
        <div className={styles.btnBox}>
          <div>
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_147_1585)">
                <path
                  d="M11.0625 2.37302H4.8125C3.95312 2.37302 3.25781 3.07614 3.25781 3.93552L3.25 16.4355C3.25 17.2949 3.94531 17.998 4.80469 17.998H14.1875C15.0469 17.998 15.75 17.2949 15.75 16.4355V7.06052L11.0625 2.37302ZM12.625 14.873H6.375V13.3105H12.625V14.873ZM12.625 11.748H6.375V10.1855H12.625V11.748ZM10.2812 7.84177V3.54489L14.5781 7.84177H10.2812Z"
                  fill={pathname === "/setting" ? "#fff" : "#898989"}
                  fill-opacity={pathname === "/setting" ? "1" : "0.6"}
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
              pathname === "/setting" ? styles.textFocused : styles.text
            }
          >
            설정
          </span>
        </div>
      </Link>
    </div>
  );
};

export default BottomTabBar;
