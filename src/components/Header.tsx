"use client";

import Link from "next/link";
import { signOutWithForm } from "@/serverActions/auth";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Header() {
  const { data } = useSession();
  const [toggle, setToggle] = useState(false);
  return (
    <header>
      {data?.user && <div>{data.user.name}</div>}
      <nav style={{ display: "flex", gap: "10px" }}>
        <Link href="/">메인</Link>
        {data?.user ? (
          <>
            <form action={signOutWithForm}>
              <button type="submit">로그아웃</button>
            </form>
          </>
        ) : (
          <>
            <Link href="/signin">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
        <button onClick={() => signOut()}>로그아웃</button>
      </nav>
    </header>
  );
}
