"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "../app/styles/navigation.module.css";

export default function Navigation() {
  const path = usePathname();

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link href="/">Home</Link>
          {path === "/" ? "👌" : null}
        </li>
        <li>
          <Link href="/about-us">About Us</Link>{" "}
          {path === "/about-us" ? "👌" : null}
        </li>
      </ul>
    </nav>
  );
}
