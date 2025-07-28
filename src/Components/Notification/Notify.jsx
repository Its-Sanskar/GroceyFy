import React, { useEffect } from "react";
import styled from "styled-components";
import style from "./Notify.module.css";
import { motion, AnimatePresence } from "motion/react";
import { useRecoilState } from "recoil";
import { PagesToggle } from "../../StoreData/PagesToggle";

const Notify = () => {
  const [isNotify, setIsNotify] = useRecoilState(PagesToggle);
  useEffect(() => {
    if (isNotify.notify) {
      setTimeout(() => {
        setIsNotify({ ...isNotify, notify: false });
      }, 1000);
    }
  }, [isNotify.notify]);
  return (
    <AnimatePresence>
      {isNotify.notify && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 145 }}
          exit={{ y: 50 }}
          className={style.container}
        >
          <StyledWrapper>
            <div className="modern-success-message">
              <button
                className="close-btn"
                onClick={() => {
                  setIsNotify({ ...isNotify, notify: false });
                }}
              >
                ×
              </button>
              <div className="icon-wrapper">
                <svg
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth={2}
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  className="success-icon"
                >
                  <path d="M9 12l2 2 4-4" />
                  <circle r={10} cy={12} cx={12} />
                </svg>
              </div>
              <div className="text-wrapper">
                <div className="title">Success</div>
                <div className="message">Product Added Successfully</div>
              </div>
            </div>
          </StyledWrapper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const StyledWrapper = styled.div`
  .modern-success-message {
    display: flex;
    align-items: center;
    padding: 10px 15px;
    background: linear-gradient(135deg, #ffcf82ff, #ff7043);
    border-radius: 10px;
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
    color: white;
    font-family: "Poppins", sans-serif;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    width: 300px;
    height: 50px;
  }

  .modern-success-message:hover {
    transform: scale(1.05);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.25);
  }

  .close-btn {
    position: absolute;
    top: 12px;
    right: 20px;
    background: none;
    border: none;
    font-size: 30px;
    color: white;
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.3s;
  }

  .close-btn:hover {
    opacity: 1;
  }

  .icon-wrapper {
    background-color: rgba(255, 255, 255, 0.15);
    padding: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }

  .success-icon {
    width: 20px;
    height: 20px;
  }

  .text-wrapper .title {
    font-size: 18px;
    font-weight: 700;
    letter-spacing: 1.2px;
    text-transform: uppercase;
  }

  .text-wrapper .message {
    margin-top: 6px;
    font-size: 14px;
    opacity: 0.85;
  }

  .modern-success-message::before {
    content: "";
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(
      circle,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(45deg);
    transition: all 0.5s ease-in-out;
  }

  .modern-success-message:hover::before {
    transform: rotate(90deg);
    opacity: 0.5;
  }
`;

export default Notify;
