import { atom } from "recoil";

export const PagesToggle = atom({
  key: "pagesTgl",
  default: {
    logIn: false,
    signUp: false,
    sideBar: false,
    tab: 0,
    tabs: { home: 0, profile: 85, logIn: 165, signUp: 250,Orders:173 },
  },
});
