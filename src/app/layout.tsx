import { Metadata } from "next";
import BottomTabBar from "./_components/BottomTabBar";
import TobTab from "./_components/TobTab";
import ReactQueryProvider from "./_hooks/useReactQuery";
import "./globals.css";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dev a Nice Day | 한눈에 보는 IT 트렌드",
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
