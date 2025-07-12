import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { userData } from "./StoreData/storeDetails";
import { useNavigate } from "react-router";

export default function AuthenticatedRoutes({ children }) {
  const { isAuthenticated } = useRecoilValue(userData);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) navigate("/");
  }, []);

  return children;
}
