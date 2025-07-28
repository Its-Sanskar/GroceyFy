import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { userData } from "./StoreData/storeDetails";
import { useNavigate } from "react-router";
import { PagesToggle } from "./StoreData/PagesToggle";

export default function AuthenticatedRoutes({ children }) {
  const { isAuthenticated } = useRecoilValue(userData);
  const navigate = useNavigate();
  const [logInTgl, setLogInTgl] = useRecoilState(PagesToggle);
  useEffect(() => {
    if (!isAuthenticated) {
      setLogInTgl({ ...logInTgl, logIn: true, tab: "/logIn" });
      navigate("/");
    }
  }, []);

  return children;
}
