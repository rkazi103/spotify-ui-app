import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWTParams, refreshAccessToken, SessionParams } from "../../../lib/jwt";
import { LOGIN_URL } from "../../../lib/spotify";

export default NextAuth({
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_SPOTIFY_ID,
      clientSecret: process.env.NEXT_PUBLIC_SPOTIFY_SECRET,
      authorization: LOGIN_URL,
    }),
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async jwt({ token, account, user }: JWTParams): Promise<any> {
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: (account.expires_at as number) * 1000,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log("EXISTING TOKEN VALID ✅");
        return token;
      }

      console.log("ACCESS TOKEN EXPIRED ❌, CREATING NEW ONE");
      return refreshAccessToken(token);
    },

    async session({ session, token }: SessionParams) {
      session!.user!.accessToken = token.accessToken;
      session!.user!.refreshToken = token.refreshToken;
      session!.user!.username = token.username;

      return session;
    },
  },
});
