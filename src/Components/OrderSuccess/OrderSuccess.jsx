import React from "react";
import style from "./OrderSuccess.module.css";
import { SiTicktick } from "react-icons/si";
import { motion } from "motion/react";
import { useRecoilState } from "recoil";
import { PagesToggle } from "../../StoreData/PagesToggle";
import { decimalizer } from "../../StoreData/utilityFunctions";
import { useNavigate } from "react-router";

export default function OrderSuccess(props) {
  const [OrderSucess, setOrderSuccess] = useRecoilState(PagesToggle);
  const { price } = props;
  const navigate = useNavigate();
  console.log(price);

  return (
    <>
      {OrderSucess.orderSuccess && (
        <div className={style.background}>
          <motion.div
            initial={{ opacity: 0, scale: 0, "--blur": "0px" }}
            animate={{ opacity: 1, scale: 1, "--blur": "8px" }}
            exit={{ opacity: 0, scale: 0, "--blur": "0px" }}
            className={style.container}
          >
            <div className={style.icon}>
              <SiTicktick size={50} />
            </div>
            <h1>Order Complete!</h1>
            <p>
              Thank you for your purchase! Your order has been successfully
              placed and is being processed.
            </p>
            <h1>₹{price.mrp - price.sellPrice}</h1>
            <span style={{ fontSize: "30px", fontWeight: 600 }}>YOU SAVE!</span>
            <table className={style.info}>
              <tr>
                <td>
                  <b>Order Number:</b>
                </td>
                <td>ORD-{decimalizer(Math.random() * 10000000)}</td>
              </tr>
              <tr>
                <td>
                  <b>Estimated Delivery:</b>
                </td>
                <td>6-7 day</td>
              </tr>
            </table>
            <button
              className="button"
              onClick={() => {
                setOrderSuccess({ ...OrderSucess, orderSuccess: false });
                navigate("/");
              }}
            >
              Continue Shopping
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
