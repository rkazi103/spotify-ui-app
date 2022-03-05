/* eslint-disable @next/next/no-img-element */
import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useState } from "react";
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
  const song = useSongInfo();

  return (
    <div>
      {/* Left */}
      <div></div>
    </div>
  );
};

export default Player;
