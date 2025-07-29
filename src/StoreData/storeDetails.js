import { atom } from "recoil";

function defaultValue() {
  return { user: null, isAuthenticated: false };
}

function userDataStor() {
  if (JSON.parse(localStorage.getItem("User"))) {
    const user = JSON.parse(localStorage.getItem("User"));
    return user;
  } else {
    return defaultValue();
  }
}
// console.log(userDataStor().user.name);
function details() {
  if (JSON.parse(localStorage.getItem("detail"))) {
    const detail = JSON.parse(localStorage.getItem("detail"));
    return detail;
  } else {
    return null;
  }
}
export const userData = atom({
  key: "UserData",
  default: {
    user: userDataStor().user,
    token: userDataStor().accessToken,
    isAuthenticated: !!userDataStor().accessToken,
    details: details(),
  },
});
