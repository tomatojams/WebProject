import { Metadata } from "next";
import Navigation from "../components/navigation";
import "./styles/global.css";

export const metadata: Metadata = {
  title: {
    default: "Next", // 페이지를 못찾을때도 default값이 표시된다.
    template: "%s | Next",
  },
  description: "메타테이다 연습",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
