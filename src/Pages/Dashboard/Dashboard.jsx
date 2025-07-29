import React from "react";
import style from "./Dashboard.module.css";
import { Link, Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { userData } from "../../StoreData/storeDetails";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAddBusiness } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { motion } from "motion/react";

export default function Dashboard() {
  const { user } = useRecoilValue(userData);

  return (
    <div className="container">
      <div className={style.container}>
        <ul className={style.nav}>
          <div className={style.photo}>
            <CgProfile size={100} color="var(--Text)" />
            <div>
              <span>
                <b> {user.name}</b>
              </span>
              <br />
              <span>{user.role}</span>
            </div>
          </div>
          {/* <hr style={{ width: "30vh", color: "var(--secondry)" }} /> */}
          <Link to="Profile">
            <motion.li>
              <CgProfile size={30} /> <br /> Profile
            </motion.li>
          </Link>
          <Link to="Products">
            <motion.li>
              <MdOutlineAddBusiness size={30} />
              Products
            </motion.li>
          </Link>

          <Link to="Orders">
            <motion.li>
              <BsFillBoxSeamFill />
              Orders
            </motion.li>
          </Link>
        </ul>
        <div className={style.pages}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
