import { atom } from "recoil";

export const playlistIdState = atom<string>({
  key: "playlistIdState",
  // TODO: put "" in prod
  default: "37i9dQZF1DX8NTLI2TtZa6",
});
