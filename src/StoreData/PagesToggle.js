import { atom } from "recoil";

export const PagesToggle = atom({
  key: "pagesTgl",
  default: {
    logIn: false,
    signUp: false,
    sideBar: false,
    showQty: false,
    tab: "",
    tabs: {
      "/": 0,
      "/logIn": 80,
      "/Orders": 85,
      "/signUp": 164,
      "/profile": 173,
    },
  },
});
