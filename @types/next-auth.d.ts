import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface JWT {
    name?: string | null;
    email?: string | null;
    picture?: string | null;
    sub?: string;
    accessToken?: string;
    refreshToken?: string;
    username?: string;
    accessTokenExpires?: number;
    error?: string;
  }
}

declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      accessToken?: string | null;
      refreshToken?: string | null;
      username?: string | null;
    };
    expires: ISODateString;
  }
}
