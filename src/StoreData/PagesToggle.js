import { atom } from "recoil";
function avatarProvider() {
  if (localStorage.getItem("avatar")) {
    const avatar = localStorage.getItem("avatar");
    return avatar;
  } else {
    return "/PlaceHolder/PlaceHolder.jpg";
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
    tab: "",
    tabs: {
      "/": 0,
      "/logIn": 80,
      "/Orders": 85,
      "/signUp": 164,
      "/Profile": 173,
    },
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
