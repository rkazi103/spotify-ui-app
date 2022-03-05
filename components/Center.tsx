/* eslint-disable @next/next/no-img-element */
import { ChevronDownIcon } from "@heroicons/react/outline";
import { NextComponentType } from "next";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { shuffle } from "lodash";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdState } from "../atoms/playlistIdAtom";
import { playlistState } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
  "from-indigo-500",
  "from-purple-500",
  "from-blue-500",
  "from-green-500",
  "from-red-500",
  "from-yellow-500",
  "from-pink-500",
];

const Center: NextComponentType = () => {
  const { data: session } = useSession();
  const [color, setColor] = useState<string>("");
  const playlistId = useRecoilValue(playlistIdState);
  const [playlist, setPlaylist] = useRecoilState(playlistState);
  const spotifyApi = useSpotify();

  useEffect(() => {
    setColor(shuffle(colors).pop() as string);
  }, []);

  useEffect(() => {
    spotifyApi
      .getPlaylist(playlistId)
      .then(data => setPlaylist(data.body))
      .catch(err => console.error("Something went wrong", err));
  }, [playlistId, spotifyApi, setPlaylist]);

  return (
    <div className="flex-grow">
      <header className="absolute top-5 right-8">
        <div className="flex cursor-pointer items-center space-x-3 rounded-full bg-red-300 p-1 pr-2 opacity-90 hover:opacity-80">
          <img
            // TODO: fix image
            src="https://lh3.googleusercontent.com/ogw/ADea4I6ue6ul3ozCcUYNy63qPsdyJ5zRRK5GenxA4mELWg=s64-c-mo"
            alt="Profile picture for user"
            className="h-10 w-10 rounded-full"
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className="h-5 w-5" />
        </div>
      </header>

      <section
        className={`flex h-80 items-end space-x-7 bg-gradient-to-b ${color} to-black p-8 text-white`}
      >
        <img
          src={playlist?.images?.[0]?.url}
          alt=""
          className="h-44 w-44 shadow-2xl"
        />

        <div>
          <p>PLAYLIST</p>
          <h2 className="text-2xl font-bold md:text-3xl xl:text-5xl">
            {playlist?.name}
          </h2>
        </div>
      </section>

      <section>
        <Songs />
      </section>
    </div>
  );
};

export default Center;
