export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <div>
      {children}
      {modal}
    </div>
  );
}

// 주소가 localhost:3001일 때는 children->page.tsx, modal->@modal/default.tsx

// 링크타고 들어가면 @modal에서 인터셉팅함. 근데 걔가 페러렐 라우트라 결론적으로는
// children -> 기존 페이지, modal -> 인터셉팅한 새로운 페이지(@modal/(.)onboarind/page.tsx
