import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { PagesToggle } from "../../StoreData/PagesToggle";
import { motion } from "motion/react";
import style from "./Details.module.css";
import { userData } from "../../StoreData/storeDetails";
export default function DetailsCol() {
  const [detailCol, setDetailCol] = useRecoilState(PagesToggle);
  const [user, setUser] = useRecoilState(userData);
  const [details, setDetail] = useState({ address: undefined, phoneNo: 0 });
  const [error, setError] = useState(null);
  const detailBtnHandler = (e) => {
    e.preventDefault();
    if (details.address) {
      if (details.phoneNo) {
        localStorage.setItem("detail", JSON.stringify(details));
        setUser({ ...user, details });
        setDetailCol({ ...detailCol, detailCollector: false });
      } else {
        setError("Please Enter Phone Number");
      }
    } else {
      setError("Please Enter Address");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "decay", stiffness: 10 }}
      exit={{ opacity: 0 }}
      className={style.BackGround}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0, "--blur": "0px" }}
        animate={{ opacity: 1, scale: 1, "--blur": "8px" }}
        exit={{ opacity: 0, scale: 0, "--blur": "0px" }}
        className={style.container}
      >
        <h1>Fill Details Required </h1>
        {error && <div>{error}</div>}
        <form onSubmit={detailBtnHandler} className={style.form}>
          <input
            type="text"
            placeholder="Address"
            onChange={(e) => {
              setDetail({ ...details, address: e.target.value });
            }}
          />
          <input
            type="number"
            placeholder="Enter Phone Number"
            onChange={(e) => {
              setDetail({ ...details, phoneNo: e.target.value });
            }}
          />

          <button type="submit" className="button">
            SAVE
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
