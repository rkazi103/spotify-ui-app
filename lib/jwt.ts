import { JWT, User, Profile, Account, Session } from "next-auth";
import spotifyWebApi from "./spotify";

export const refreshAccessToken = async (token: JWT) => {
  try {
    spotifyWebApi.setAccessToken(token.accessToken as string);
    spotifyWebApi.setRefreshToken(token.refreshToken as string);

    const { body: refreshedToken } = await spotifyWebApi.refreshAccessToken();

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export type SessionParams = {
  session: Session;
  user: User;
  token: JWT;
};

export type JWTParams = {
  token: JWT;
  user?: User | undefined;
  account?: Account | undefined;
  profile?: Profile | undefined;
  isNewUser?: boolean | undefined;
};
