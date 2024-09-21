export default function LayoutAbout({ children }: { children: React.ReactNode }) {
  return (
    // 서브 레이아웃의 경우에는 body를 없애야함 루트의 레이아웃과 겹칩
    <div>
      {children}
      Next js good
    </div>
  );
}
