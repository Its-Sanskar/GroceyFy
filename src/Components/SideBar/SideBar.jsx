import React, { useState } from "react";
import style from "./SideBar.module.css";
import { motion } from "motion/react";
import { VscThreeBars } from "react-icons/vsc";
import { IoClose } from "react-icons/io5";
import { useRecoilValue } from "recoil";
import { userData } from "../../StoreData/storeDetails";
import { useNavigate } from "react-router";

export default function SideBar() {
  const [sideBarTgl, setsideBarTgl] = useState(false);
  const [refreshPage, setRefreshPage] = useState("");
  const navigate = useNavigate();
  const user = useRecoilValue(userData);
  const sideBarHdl = () => {
    if (!sideBarTgl) {
      setsideBarTgl(true);
    } else {
      setsideBarTgl(false);
    }
  };

  return (
    <motion.div
      initial={{ x: 0 }}
      animate={{ x: sideBarTgl ? 350 : 0 }}
      className={style.container}
    >
      <div className={style.placeholder}>
        <div className={style.greet}>
          Hello! {user.isAuthenticated ? user.user.name : "User"}
        </div>
        <img src="https://media.istockphoto.com/vectors/avatar-photo-placeholder-icon-design-vector-id1221380217?k=20&m=1221380217&s=612x612&w=0&h=avdFJ5PNo-CSkbUZzQ0Xm8h3u5BovGfSNDrfRicPDfY=" />
        <div className={style.sideBrBtn} onClick={sideBarHdl}>
          {sideBarTgl ? <IoClose size={30} /> : <VscThreeBars size={30} />}
        </div>
      </div>
      <div className={style.options}>
        <div>Tranding Deal</div>
        <div>Categories</div>
        <div>Orders</div>
        <div>My Account</div>
        <div>Contect Us</div>
        <div
          onClick={() => {
            localStorage.clear();
            navigate(0);
          }}
        >
          Sign Out
        </div>
        <div>About us</div>
      </div>
    </motion.div>
  );
}
