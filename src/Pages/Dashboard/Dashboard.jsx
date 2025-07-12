import React from "react";
import style from "./Dashboard.module.css";
import { Link, Outlet } from "react-router";
import { useRecoilValue } from "recoil";
import { userData } from "../../StoreData/storeDetails";
import { CgProfile } from "react-icons/cg";
import { MdOutlineAddBusiness } from "react-icons/md";
import { BsFillBoxSeamFill } from "react-icons/bs";

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
            <li>
              <CgProfile size={30} /> <br /> Profile
            </li>
          </Link>
          <Link to="Products">
            <MdOutlineAddBusiness size={30} /> <li>Products</li>
          </Link>

          <Link to="Orders">
            <BsFillBoxSeamFill /> <li>Orders</li>
          </Link>
        </ul>
        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
