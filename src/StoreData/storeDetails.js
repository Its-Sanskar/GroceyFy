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

export const userData = atom({
  key: "UserData",
  default: {
    user: userDataStor().user,
    token: userDataStor().accessToken,
    isAuthenticated: !!userDataStor().accessToken,
  },
});

export const LoginData = atom({
  key: "userData",
  default: {
    users: [
      {
        city: "Delhi",
        phoneNo: "9876543210",
      },
      {
        city: "Mumbai",
        phoneNo: "8765432109",
      },
      {
        city: "Bangalore",
        phoneNo: "7654321098",
      },
      {
        city: "Hyderabad",
        phoneNo: "6543210987",
      },
      {
        city: "Kolkata",
        phoneNo: "5432109876",
      },
    ],
    login: {},
  },
});
