import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import spotifyWebApi from "../lib/spotify";

const useSpotify = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) if (session.error === "RefreshAccessTokenError") signIn();

    spotifyWebApi.setAccessToken(session?.user?.accessToken as string);
  }, [session]);

  return spotifyWebApi;
};

export default useSpotify;
