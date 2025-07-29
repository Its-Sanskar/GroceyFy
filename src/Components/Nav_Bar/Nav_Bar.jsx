import { useEffect } from "react";
import style from "./NavBar.module.css";
import { FaCartArrowDown } from "react-icons/fa6";
import { Link } from "react-router";
import LogIn from "../../Pages/LoginPage/LogIn2";
import { AnimatePresence } from "motion/react";
import SignUp from "../../Pages/SignUp/SignUp";
import { useRecoilState, useRecoilValue } from "recoil";
import { Avatars, PagesToggle } from "../../StoreData/PagesToggle";
import { userData } from "../../StoreData/storeDetails";
import { motion } from "motion/react";
import { StoreData } from "../../StoreData/productData";

export default function NavBar() {
  const [pagesTgl, setPagesTgl] = useRecoilState(PagesToggle);
  const { user, isAuthenticated } = useRecoilValue(userData);
  const cartData = useRecoilValue(StoreData);
  const cartQty = cartData.cartProduct.length;
  const tab = pagesTgl.tab;
  const tabs = pagesTgl.tabs;
  const isSeller = user?.role === "SELLER";
  console.log(user);

  useEffect(() => {
    if (pagesTgl.showQty == true) {
      setTimeout(() => {
        setPagesTgl({ ...pagesTgl, showQty: false });
      }, 1000);
    }
  }, [pagesTgl.showQty]);
  const logInToggle = () => {
    if (!pagesTgl.logIn) {
      setPagesTgl({ ...pagesTgl, logIn: true, tab: "/logIn" });
    }
  };
  const signUpTgl = () => {
    setPagesTgl({ ...pagesTgl });

    if (!pagesTgl.signUp) {
      setPagesTgl({ ...pagesTgl, signUp: true, tab: "/signUp" });
    }
  };
  const isCartTab = tab == "/Cart";
  const isTabIndicActiv =
    tab == "/Cart" ||
    tab.startsWith("/Product/") ||
    tab == "/Check_Out" ||
    tab.startsWith("/Dashboard/");
  console.log(tab);

  return (
    <div className={style.container}>
      <div className={style.logo}>GroceyFy</div>
      <div>
        <ul className={style.nav}>
          {!isTabIndicActiv && (
            <motion.div
              initial={{ x: tabs[tab], scale: 0 }}
              animate={{ x: tabs[tab], scale: 1 }}
              className={style.bar}
            ></motion.div>
          )}

          <Link to="/">
            <li>Home</li>
          </Link>

          {isAuthenticated ? (
            <>
              {!isSeller && (
                <>
                  <Link to="/Orders">
                    <li>Orders</li>
                  </Link>
                  <Link to="/Profile">
                    <li>Profile</li>
                  </Link>
                </>
              )}

              {isSeller && (
                <Link to="/Dashboard">
                  <li>Dashboard</li>
                </Link>
              )}
            </>
          ) : (
            <>
              <li onClick={logInToggle}>Login</li>
              <li onClick={signUpTgl}>Signup</li>
            </>
          )}

          <Link to="/Cart">
            <motion.div
              whileTap={{ scale: 1.2 }}
              animate={isCartTab ? { scale: 1.2 } : { scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            >
              {pagesTgl.showQty && (
                <motion.span
                  initial={{ y: 0, opacity: 0 }}
                  animate={{ y: -20, opacity: 1 }}
                  className={style.qtyC}
                >
                  {cartQty}
                </motion.span>
              )}
              <FaCartArrowDown
                className={style.cart}
                color={isCartTab ? "var(--primary)" : "var(--Accent)"}
              />
            </motion.div>
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
