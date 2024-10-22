"use client";

import Image from "next/image";
import "@/app/global.css";
import Link from "next/link";
import styled from "styled-components";

import LogoutButton from "@/app/components/logoutButton";

export default function Nav({ name }) {
  return (
    <>
      <div className="navbar">
        <Link href="/" className="logo">
          P.Tmind
        </Link>
        <Link href="/list">List</Link>
        <Link href="/join">Join</Link>
        <Link href="/login">Login</Link>
        <LogoutButton name={name} />
      </div>
    </>
  );
}
