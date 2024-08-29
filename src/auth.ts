import NextAuth from "next-auth";
import credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import kakao from "next-auth/providers/kakao";
import naver from "next-auth/providers/naver";

interface UserInfo {
  displayName?: string;
  email: string;
  password: string;
}
interface ResponseValue {
  user: {
    email: string;
    displayName: string;
    profileImg: string | null;
  };
  token: { access: string; refresh: string };
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
  unstable_update: update, // Beta!
} = NextAuth({
  providers: [
    kakao({
      clientId: process.env.KAKAO_CLIENT_ID!,
      clientSecret: process.env.KAKAO_CLIENT_SECRET!,
    }),
    naver({
      clientId: process.env.NAVER_CLIENT_ID!,
      clientSecret: process.env.NAVER_CLIENT_SECRET!,
    }),
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent", // 사용자에게 항상 동의 화면을 표시하도록 강제!
        },
      },
    }),
    credentials({
      authorize: async (credentials) => {
        const userInfo = credentials as unknown as UserInfo;
        try {
          // // 회원가입
          // if (userInfo.displayName) {
          //   return _signIn("signup", userInfo);
          // }
          // // 로그인
          // return _signIn("login", userInfo);
          return {
            user: {
              email: userInfo.email,
              displayName: userInfo.displayName,
              profileImg: null,
            },
            token: { access: "test", refresh: "" },
          };
        } catch (error: any) {
          throw new Error(error.message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // JSON Web Token 사용
    maxAge: 60 * 60 * 24, // 세션 만료 시간(sec)
  },
  pages: {
    signIn: "/signin", // Default: '/auth/signin'
  },
  callbacks: {
    signIn: async ({ user, account, profile }) => {
      if (account?.provider === "kakao") {
        const res = await fetch(
          `${process.env.DJANGO_API_URL}/api/sns-user/auth/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-KEY": process.env.API_KEY!,
            },
            body: JSON.stringify({
              sns_id: account?.providerAccountId,
              sns_type: account?.provider,
              email: user.email,
            }),
          }
        );
        const data = await res.json();
        user.token = data.jwt;
        console.log("account:", account, "profile:", profile);
        return true;
      }
      return true;
    },
    jwt: async ({ token, user, trigger, session, profile }) => {
      if (user) {
        Object.assign(token, user);
      }
      if (trigger === "update" && session) {
        Object.assign(token, session.user);
        token.picture = session.user.image;
      }
      console.log("token:", token, "profile:", profile);
      return token;
    },
    session: async ({ session, token }) => {
      session = { ...session, ...token };
      console.log("session:", session, "token:", token);
      return session;
    },
    // redirect: async ({ url, baseUrl }) => {
    //   if (url.startsWith("/")) return `${baseUrl}${url}`;
    //   if (url) {
    //     const { search, origin } = new URL(url);
    //     const callbackUrl = new URLSearchParams(search).get("callbackUrl");
    //     if (callbackUrl)
    //       return callbackUrl.startsWith("/")
    //         ? `${baseUrl}${callbackUrl}`
    //         : callbackUrl;
    //     if (origin === baseUrl) return url;
    //   }
    //   return baseUrl;
    // },
  },
});

async function _signIn(
  type: "signup" | "login",
  body: { displayName?: string; email: string; password: string }
) {
  const res = await fetch(`${process.env.API_URL}/auth/${type}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as ResponseValue | string;

  if (res.ok && typeof data !== "string") {
    const { user, token } = data;
    return {
      id: user.email,
      email: user.email,
      name: user.displayName,
      image: user.profileImg,
      token: token,
    };
  }

  throw new Error(
    (data || "문제가 발생했습니다, 잠시 후 다시 시도하세요.") as string
  );
}
