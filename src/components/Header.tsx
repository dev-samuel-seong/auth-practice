"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export default function Header() {
  const { data } = useSession();
  return (
    <header>
      {data?.user && <div>{data.user.name}</div>}
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link href="/">메인</Link>
        {data?.user ? (
          <button onClick={() => signOut()}>로그아웃</button>
        ) : (
          <>
            <Link href="/signin">로그인</Link>
          </>
        )}
      </nav>
    </header>
  );
}
