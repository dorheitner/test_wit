/** @format */

import { atom } from "recoil";

export const favoriteState = atom({
  key: "favorites",
  default: localStorage.getItem("favorites")
    ? JSON.parse(localStorage.getItem("favorites"))
    : {},
});

export const errorState = atom({
  key: "error",
  default: {},
});
