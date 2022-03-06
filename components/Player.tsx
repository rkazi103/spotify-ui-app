/* eslint-disable @next/next/no-img-element */
import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";

const Player: NextComponentType = () => {
  const spotifyApi = useSpotify();
  const { data: session } = useSession();
  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  useEffect(() => {
    const fetchCurrentSong = async () => {
      if (!songInfo)
        spotifyApi.getMyCurrentPlayingTrack().then(data => {
          setCurrentTrackId(data?.body?.item?.id as string);

          spotifyApi
            .getMyCurrentPlaybackState()
            .then(data => setIsPlaying(data?.body?.is_playing));
        });
    };

    if (spotifyApi.getAccessToken() && !currentTrackId) {
      fetchCurrentSong();
      setVolume(50);
    }
  }, [
    currentTrackId,
    spotifyApi,
    session,
    setCurrentTrackId,
    setIsPlaying,
    setVolume,
    songInfo,
  ]);

  // https://youtu.be/3xrko3GpYoU?t=11991

  return (
    <div className="grid h-24 grid-cols-3 bg-gradient-to-b from-black to-gray-900 px-2 text-xs text-white md:px-8 md:text-base">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <img
          // FIXME: remove in prod
          src={
            songInfo?.album?.images?.[0].url ||
            "https://i.scdn.co/image/ab67616d0000b2731b6102b34cc4de238d079f83"
          }
          alt="song's album image"
          className="hidden h-10 w-10 md:inline"
        />

        <div>
          <h3>{songInfo?.name || "Caelisa"}</h3>
          <p>{songInfo?.artists?.[0]?.name || "Max Suaer"}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
