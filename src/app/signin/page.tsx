"use client";

import { signIn } from "next-auth/react";

export default function SignInPage() {
  return (
    <>
      <h1>로그인</h1>
      <form
        action={() => signIn("credentials")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "start",
          gap: "10px",
        }}>
        <label>
          이메일(ID)
          <input name="email" type="email" />
        </label>
        <label>
          비밀번호
          <input name="password" type="password" />
        </label>
        <button type="submit" onClick={() => {}}>
          로그인
        </button>
      </form>
      <button onClick={() => signIn("kakao")}>카카오</button>
      <button onClick={() => signIn("naver")}>네이버</button>
      <button onClick={() => signIn("google")}>구글</button>
    </>
  );
}
