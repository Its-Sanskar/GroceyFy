import React, { useEffect, useState } from "react";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link, Links } from "react-router";
import LogIn from "../../Pages/LoginPage/LogIn2";
import { AnimatePresence } from "motion/react";
import SignUp from "../../Pages/SignUp/SignUp";
import { useRecoilState, useRecoilValue } from "recoil";
import { PagesToggle } from "../../StoreData/PagesToggle";
import { userData } from "../../StoreData/storeDetails";
import { motion } from "motion/react";

export default function NavBar() {
  const [pagesTgl, setPagesTgl] = useRecoilState(PagesToggle);
  const { user, isAuthenticated } = useRecoilValue(userData);
  const tab = pagesTgl.tab;
  const tabs = pagesTgl.tabs;
  const isSeller = user?.role === "SELLER";
  const logInToggle = () => {
    if (!pagesTgl.logIn) {
      setPagesTgl({ ...pagesTgl, logIn: true, tab: tabs.logIn });
    }
  };
  const signUpTgl = () => {
    setPagesTgl({ ...pagesTgl });

    if (!pagesTgl.signUp) {
      setPagesTgl({ ...pagesTgl, signUp: true, tab: tabs.signUp });
    }
  };
  console.log(user);
  console.log(isAuthenticated);

  return (
    <div className={style.container}>
      <div className={style.logo}>GroceyFy</div>
      <div>
        <ul className={style.nav}>
          <motion.div
            initial={{ x: tab, scale: 0 }}
            animate={{ x: tab, scale: 1 }}
            className={style.bar}
          ></motion.div>
          <Link to="/">
            <li
              onClick={() => {
                setPagesTgl({ ...pagesTgl, tab: tabs.home });
              }}
            >
              Home
            </li>
          </Link>

          <li
            onClick={() => {
              setPagesTgl({ ...pagesTgl, tab: tabs.profile });
            }}
          >
            Profile
          </li>
          {isSeller && (
            <Link to="/Dashboard">
              <li>Dashboard</li>
            </Link>
          )}
          {isAuthenticated ? (
            <Link to="/Orders">
              <li
                onClick={() => {
                  setPagesTgl({ ...pagesTgl, tab: tabs.Orders });
                }}
              >
                Orders
              </li>
            </Link>
          ) : (
            <>
              <li onClick={logInToggle} className={style.login}>
                Login
              </li>
              <li onClick={signUpTgl}>Signup</li>
            </>
          )}

          <Link
            onClick={() => {
              setTab(275);
            }}
            to="/Cart"
          >
            <FaCartArrowDown
              className={style.cart}
              size={40}
              color="var(--Accent)"
            />
          </Link>
        </ul>
      </div>

      <AnimatePresence>
        {pagesTgl.logIn && <LogIn />}
        {pagesTgl.signUp && <SignUp />}
      </AnimatePresence>
    </div>
  );
}
