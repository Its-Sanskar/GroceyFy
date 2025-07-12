import React, { useState } from "react";
import { motion, scale } from "motion/react";
import style from "./SignUp.module.css";
import { IoClose } from "react-icons/io5";
import { useRecoilState } from "recoil";
import { PagesToggle } from "../../StoreData/PagesToggle";
import axios from "axios";
import { Urls } from "../../StoreData/Apis";
import { useNavigate } from "react-router";

export default function SignUp() {
  const [signUpTgl, setSignUpTgl] = useRecoilState(PagesToggle);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { tabs } = signUpTgl;
  function signUpHandle(e) {
    e.preventDefault();
    if (!name || !email || !password) {
      setError("Please Enter Full Information");
      return;
    }
    setLoading(true);
    axios
      .post(Urls.signUp, {
        name,
        email,
        password,
      })
      .then((reso) => {
        console.log(reso);
        alert("Successfully Registered");
        setError(null);
        setSignUpTgl({ ...signUpTgl, signUp: false });
        setSignUpTgl({ ...signUpTgl, logIn: true, tab: tabs.logIn });
      })
      .catch((e) => {
        setError(e.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

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
        // transition={{ duration: 0.2, }}
        className={style.container}
      >
        <div className={style.cross}>
          <motion.div whileHover={{scale:1.1}} whileTap={{ scale: 0.9 }}>
            <IoClose
              size={50}
              onClick={() =>
                setSignUpTgl({
                  ...signUpTgl,
                  signUp: false,
                  tab: tabs.home,
                })
              }
            />
          </motion.div>
        </div>

        <h1>SignUp </h1>
        <div>{error}</div>
        <form onSubmit={signUpHandle} className={style.form}>
          <input
            type="Name"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <button type="submit" className="button">
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
