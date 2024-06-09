import BottomTabBar from "./_components/BottomTabBar";
import TobTab from "./_components/TobTab";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
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
        <TobTab />
        {children}
        <BottomTabBar />
      </body>
    </html>
  );
}
