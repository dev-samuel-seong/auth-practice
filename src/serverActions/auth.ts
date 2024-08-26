"use server";
import { redirect } from "next/navigation";
import { auth, signIn, signOut, update } from "@/auth";

export const signInWithCredentials = async (
  initialState: { message: string },
  formData: FormData
) => {
  try {
    await signIn("credentials", {
      displayName: formData.get("displayName") || "", // "null" 문자 방지
      email: formData.get("email") || "",
      password: formData.get("password") || "",
    });
  } catch (error: any) {
    // @ts-ignore-next-line // 아직 해당 타입이 없어 무시합니다. // if (error instanceof CredentialsSignin)
    // return { message: error.cause.err.message };
    return { message: error.message };
  }
  return { message: "메시지!" };
  // redirect("/"); // 또는 return { message: '메시지!' }
};

export const signInWithKakao = async () => {
  await signIn("kakao", {
    /* 옵션 */
  });
  // ...
};

export const signInWithNaver = async () => {
  await signIn("naver", {
    /* 옵션 */
  });
  // ...
};

export const signInWithGoogle = async () => {
  await signIn("google", {
    /* 옵션 */
  });
  // ...
};

export const signOutWithForm = async (formData: FormData) => {
  await signOut();
};

export { auth as getSession, update as updateSession };
