export declare module "next-auth" {
  interface User {
    token?: {
      access: string;
      refresh: string;
    };
  }
  interface Session {
    token?: {
      access: string;
      refresh: string;
    };
  }
}
export declare module "@auth/core/jwt" {
  interface JWT {
    token?: {
      access: string;
      refresh: string;
    };
  }
}
