/* eslint-disable @next/next/no-img-element */
import {
  RewindIcon,
  SwitchHorizontalIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
} from "@heroicons/react/solid";
import { VolumeUpIcon as VolumeDownIcon } from "@heroicons/react/outline";
import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { currentTrackState, isPlayingState } from "../atoms/songAtom";
import useSongInfo from "../hooks/useSongInfo";
import useSpotify from "../hooks/useSpotify";
import { debounce } from "lodash";

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

  const debouncedAdjustVolume = useCallback(
    (volume: number) =>
      debounce(
        (vol = volume) => spotifyApi.setVolume(volume).catch(err => {}),
        500
      ),
    [spotifyApi]
  );

  useEffect(() => {
    if (volume > 0 && volume < 100) debouncedAdjustVolume(volume);
  }, [volume, debouncedAdjustVolume]);

  const handlePlayPause = async () => {
    spotifyApi.getMyCurrentPlaybackState().then(data => {
      if (data.body.is_playing) {
        spotifyApi.pause();
        setIsPlaying(false);
      } else {
        spotifyApi.play();
        setIsPlaying(true);
      }
    });
  };

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

      {/* Center */}
      <div className="flex items-center justify-evenly">
        <SwitchHorizontalIcon className="button" />
        <RewindIcon className="button" />

        {isPlaying ? (
          <PauseIcon
            onClick={() => handlePlayPause()}
            className="button h-10 w-10"
          />
        ) : (
          <PlayIcon
            onClick={() => handlePlayPause()}
            className="button h-10 w-10"
          />
        )}

        <FastForwardIcon className="button" />
        <ReplyIcon className="button" />
      </div>

      <div className="flex items-center justify-end space-x-3 pr-5 md:space-x-4">
        <VolumeDownIcon
          onClick={() => volume > 10 && setVolume(volume - 10)}
          className="button"
        />
        <input
          className="w-14 md:w-28"
          type="range"
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume(volume + 10)}
          className="button"
        />
      </div>
    </div>
  );
};

export default Player;
