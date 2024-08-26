"use client";

import SubmitButton from "@/components/SubmitButton";
import { signInWithCredentials } from "@/serverActions/auth";
import credentials from "next-auth/providers/credentials";
import { signIn } from "next-auth/react";
import { useFormState } from "react-dom";

export default function SignInPage() {
  const [state, action] = useFormState(signInWithCredentials, {
    message: "",
  });
  return (
    <>
      <h1>로그인</h1>
      <h2>{state.message}</h2>
      <form
        action={action}
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
        <SubmitButton name={"로그인"} />
        <button
          type="submit"
          onClick={() => {
            signIn("credentials");
          }}>
          로그인
        </button>
      </form>
    </>
  );
}
