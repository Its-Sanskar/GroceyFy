import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { PagesToggle } from "./StoreData/PagesToggle";
import { useLocation } from "react-router";

export default function PathProvider() {
  const [pagesTgl, setPagesTgl] = useRecoilState(PagesToggle);
  const path = useLocation().pathname;
  useEffect(() => {
    console.log(path);

    setPagesTgl({ ...pagesTgl, tab: path });
  }, [path]);
  return <></>;
}
