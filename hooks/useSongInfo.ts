import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { currentTrackState } from "../atoms/songAtom";
import { SpotifyApiResponse } from "../types/SpotifyApiResponse";
import useSpotify from "./useSpotify";

const useSongInfo = () => {
  const currentTrackId = useRecoilValue(currentTrackState);
  const spotifyApi = useSpotify();

  const [songInfo, setSongInfo] = useState<SpotifyApiResponse | null>(null);

  useEffect(() => {
    const fetchSongInfo = async () => {
      if (currentTrackId)
        fetch(`https://api.spotify.com/v1/tracks/${currentTrackId}`, {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        })
          .then(res => res.json())
          .then((data: SpotifyApiResponse) => setSongInfo(data));
    };

    fetchSongInfo();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
};

export default useSongInfo;
