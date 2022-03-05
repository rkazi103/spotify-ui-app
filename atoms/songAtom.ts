import { atom } from "recoil";

export const currentTrackState = atom<string>({
  key: "currentTrackState",
  default: "",
});

export const isPlayingState = atom<boolean>({
  key: "isPlayingState",
  default: false,
});
