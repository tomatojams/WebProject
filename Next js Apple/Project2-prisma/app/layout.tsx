import "./global.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="navbar">
          <Link href="/" className="logo">
            P.Tmind
          </Link>
          <Link href="/list">List</Link>
          <Link href="/join">Join</Link>
          <Link href="/login">Login</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
