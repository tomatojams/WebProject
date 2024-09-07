import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "판매사이트",
  description: "제품을 판매하는 곳",
};



export default function ProductsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <nav className="p-2 bg-gray-200 category ">
        <Link href="/products/woman">여성옷</Link>
        <Link href="/products/man">남성옷</Link>
      </nav>
      <section> {children}</section>
    </>
  );
}
