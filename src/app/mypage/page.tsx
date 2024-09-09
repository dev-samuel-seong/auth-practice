import { updateUser } from "@/serverActions/user";
import { getSession } from "next-auth/react";

export default async function MyPage() {
  const session = await getSession();
  const res = await fetch(`${process.env.API_URL}/self`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      // apikey: process.env.HEROPY_API_KEY as string,
      Authorization: `Bearer ${session?.token?.access}`,
    },
  });
  const user = await res.json();
  return (
    <>
      <form action={updateUser}>
        <label>
          사용자 이름
          <input
            name="displayName"
            type="text"
            defaultValue={session?.user?.name || ""}
          />
        </label>
        <button type="submit">수정</button>
      </form>
    </>
  );
}
