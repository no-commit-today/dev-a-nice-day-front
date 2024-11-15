import { Metadata } from "next";
import BottomTabBar from "./_components/BottomTabBar";
import TobTab from "./_components/TobTab";
import ReactQueryProvider from "./_hooks/useReactQuery";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://devniceday.com"),
  title: "Dev a Nice Day | 한눈에 보는 IT 트렌드",
  description:
    "지금 알고 싶은 정보부터 더 깊은 개발 이야기까지 Dev A Nice Day에서 확인하세요!",
  openGraph: {
    type: "website",
    title: "Dev a Nice Day | 한눈에 보는 IT 트렌드",
    description:
      "지금 알고 싶은 정보부터 더 깊은 개발 이야기까지 Dev A Nice Day에서 확인하세요!",
    url: "https://devniceday.com",
  },
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{
          fontFamily: "Pretendard",
          fontWeight: 500,
          backgroundColor: "#191A1C",
        }}
      >
        <ReactQueryProvider>
          {children}
          <TobTab />

          <Suspense>
            <BottomTabBar />
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
