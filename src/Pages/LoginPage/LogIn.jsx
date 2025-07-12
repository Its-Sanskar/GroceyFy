import React, { useId, useState } from "react";
import style from "./LoginPage.module.css";
import { motion, AnimatePresence } from "motion/react";
import { useRecoilState } from "recoil";
import { LoginData } from "../../StoreData/storeDetails";

export default function LogIn() {
  const [userId, setUserId] = useRecoilState(LoginData);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function emailInput(event) {
    const email = event.target.value;
    setEmail(email);
  }
  function passInput(event) {
    const passKey = event.target.value;
    setPassword(passKey);
  }
  function submit() {
    userId.users.find((user) => {
      const eml = user.email;
      const pass = user.password;
      if (eml === email) {
        if (pass === password) {
          localStorage.setItem("user", JSON.stringify(user));
        }
      } else {
        setError("Accound Not Found");
      }
    });
  }
  return (
    <div className={style.background}>
      <motion.div
        initial={{ x: 370, y: -350, scale: 0, opacity: 0.2 }}
        animate={{ x: 0, y: 0, scale: 1, opacity: 1 }}
        exit={{ x: 370, y: -350, scale: 0, opacity: 0.2 }}
        className={style.container}
      >
        <h1>Login</h1>
        <div>{error}</div>
        <input type="email" placeholder="Email" onChange={emailInput} />

        <input type="password" placeholder="Password" onChange={passInput} />
        <button type="submit" className={style.loginBtn} onClick={submit}>
          LogIn
        </button>
      </motion.div>
    </div>
  );
}
