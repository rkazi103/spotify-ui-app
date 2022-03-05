import { atom } from "recoil";

export const playlistIdState = atom<string>({
  key: "playlistIdState",
  // TODO: put "" in prod
  default: "3wda5i7vjSAfXQTVx4aMsf",
});
