import { atom } from "recoil";
function avatarProvider() {
  if (localStorage.getItem("avatar")) {
    const avatar = localStorage.getItem("avatar");
    return avatar;
  } else {
    return "/PlaceHolder/PlaceHolder.jpg";
  }
}
function tabIndicator() {
  if (window.innerWidth < 600) {
    const phoneTab = {
      "/": 0,
      "/logIn": 46,
      "/Orders": 50,
      "/signUp": 96,
      "/Profile": 102,
    };
    return phoneTab;
  } else {
    const desktopTab = {
      "/": 0,
      "/logIn": 80,
      "/Orders": 85,
      "/signUp": 164,
      "/Profile": 173,
    };
    return desktopTab;
  }
}
export const PagesToggle = atom({
  key: "pagesTgl",
  default: {
    loading: false,
    logIn: false,
    signUp: false,
    sideBar: false,
    showQty: false,
    notify: false,
    orderSuccess: false,
    detailCollector: false,
    tab: "",
    tabs: tabIndicator(),
  },
});
export const Avatars = atom({
  key: "Avatar Manager",
  default: {
    avatar: avatarProvider(),
    avatarBox: false,
    avatars: [
      "/PlaceHolder/17.png",
      "/PlaceHolder/18.png",
      "/PlaceHolder/25.png",
      "/PlaceHolder/26.png",
      "/PlaceHolder/39.png",
      "/PlaceHolder/40.png",
      "/PlaceHolder/43.png",
      "/PlaceHolder/45.png",
      "/PlaceHolder/49.png",
    ],
  },
});
