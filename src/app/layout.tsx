import BottomTabBar from "./_components/BottomTabBar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Pretendard", fontWeight: 500 }}>
        {children}
        <BottomTabBar />
      </body>
    </html>
  );
}
