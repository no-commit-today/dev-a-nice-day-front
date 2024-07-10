import { Metadata } from "next";
import BottomTabBar from "./_components/BottomTabBar";
import TobTab from "./_components/TobTab";
import ReactQueryProvider from "./_hooks/useReactQuery";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "테크스와이프 | 테크를 스와이프하다.",
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
          <TobTab />
          {children}
          <Suspense>
            <BottomTabBar />
          </Suspense>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
