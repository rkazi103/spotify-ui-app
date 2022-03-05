/* eslint-disable @next/next/no-img-element */
import { NextComponentType, NextPageContext } from "next";
import useSpotify from "../hooks/useSpotify";
import { millisToMinutesAndSeconds } from "../lib/time";

type SongProps = {
  order: number;
  track: SpotifyApi.PlaylistTrackObject;
};

const Song: NextComponentType<NextPageContext, {}, SongProps> = ({
  order,
  track,
}) => {
  const spotifyApi = useSpotify();

  return (
    <div className="grid cursor-pointer grid-cols-2 rounded-lg py-4 px-5 text-gray-500 hover:bg-gray-900">
      <div className="flex items-center space-x-4">
        <p>{order + 1}</p>
        <img
          src={track.track.album.images?.[0].url}
          alt="Picture of song"
          className="h-10 w-10"
        />
        <div>
          <p className="w-36 truncate text-white lg:w-64">{track.track.name}</p>
          <p className="w-40">{track.track.artists[0].name}</p>
        </div>
      </div>

      <div className="ml-auto flex items-center justify-between md:ml-0">
        <p className="hidden w-40 md:inline">{track.track.album.name}</p>
        <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
      </div>
    </div>
  );
};

export default Song;
