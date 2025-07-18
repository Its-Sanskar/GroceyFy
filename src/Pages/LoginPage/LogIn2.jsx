import React, { useId, useState } from "react";
import style from "./LoginPage.module.css";
import { motion, AnimatePresence } from "motion/react";
import { useRecoilState } from "recoil";
import { LoginData, userData } from "../../StoreData/storeDetails";
import { IoClose } from "react-icons/io5";
import { PagesToggle } from "../../StoreData/PagesToggle";
import axios from "axios";
import { Urls } from "../../StoreData/Apis";
import { useNavigate } from "react-router";

export default function LogIn() {
  const [pagesTgl, setPagesTgl] = useRecoilState(PagesToggle);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { tabs } = pagesTgl;

  function emailInput(event) {
    const email = event.target.value;
    setEmail(email);
  }
  function passInput(event) {
    const passKey = event.target.value;
    setPassword(passKey);
  }
  function submit() {
    if (!email) {
      setError("Please Enter Email ");
      if (!password) {
        setError("Please Enter Password");
      }
    }
    setIsloading(true);
    axios
      .post(Urls.logIn, {
        email,
        password,
      })
      .then((respo) => {
        console.log(respo);
        setError(null);
        alert(respo.data.message);
        setPagesTgl({ ...pagesTgl, logIn: false, tab: tabs.home });
        localStorage.setItem("User", JSON.stringify(respo.data));
        navigate(0);
      })
      .catch((e) => {
        console.log(e);
        setError(e.response.data.message);
      })
      .finally(() => setIsloading(false));
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ type: "decay", stiffness: 10 }}
      exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
      className={style.background}
    >
      <motion.div
        initial={{
          x: 370,
          y: -350,
          scale: 0,
          opacity: 0.2,
          "--blur": "0px",
        }}
        animate={{
          x: 0,
          y: 0,
          scale: 1,
          opacity: 1,
          "--blur": "8px",
        }}
        // transition={{ duration: 0.1 }}
        exit={{ x: 370, y: -350, scale: 0, opacity: 0.2, "--blur": "0px" }}
        className={style.container}
      >
        <div className={style.cross}>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <IoClose
              onClick={() => {
                setPagesTgl({ ...pagesTgl, logIn: false, tab: tabs.home });
              }}
              size={50}
            />
          </motion.div>
        </div>
        <h1>Login</h1>
        <div>{error}</div>
        <input type="email" placeholder="Email" onChange={emailInput} />

        <input type="password" placeholder="Password" onChange={passInput} />
        <button type="submit" className="button" onClick={submit}>
          {isLoading ? "Logging... IN" : "LogIn"}
        </button>
      </motion.div>
    </motion.div>
  );
}
