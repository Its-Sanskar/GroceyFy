import React from "react";
import style from "./PlaceHolder.module.css";
import { useRecoilState, useRecoilValue } from "recoil";
import { Avatars } from "../../StoreData/PagesToggle";
import { motion, AnimatePresence, scale } from "motion/react";

export default function PlaceHolder() {
  const [avatar, setAvatar] = useRecoilState(Avatars);
  return (
    <AnimatePresence>
      {avatar.avatarBox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "decay", stiffness: 10 }}
          exit={{ opacity: 0 }}
          className={style.background}
          onClick={() => {
            setAvatar({ ...avatar, avatarBox: false });
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0, "--blur": "0px" }}
            animate={{ opacity: 1, scale: 1, "--blur": "8px" }}
            exit={{ opacity: 0, scale: 0, "--blur": "0px" }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={style.container}
          >
            <h1>Choose Avatar</h1>
            {avatar.avatars.map((png, i) => (
              <motion.img
                src={png}
                key={i}
                onClick={() => {
                  setAvatar({ ...avatar, avatar: png, avatarBox: false });
                  localStorage.setItem("avatar", png);
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
