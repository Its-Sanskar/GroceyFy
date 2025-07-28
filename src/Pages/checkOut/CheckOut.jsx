import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StoreData } from "../../StoreData/productData";
import axios from "axios";
import { Urls } from "../../StoreData/Apis";
import { userData } from "../../StoreData/storeDetails";
import style from "./CheckOut.module.css";
import CheckOutL from "../../Components/Loader/CheckOutL/CheckOutL";
import { decimalizer } from "../../StoreData/utilityFunctions";
import { motion } from "motion/react";
import OrderSuccess2 from "../../Components/OrderSuccess/OrderSuccess2";
import { PagesToggle } from "../../StoreData/PagesToggle";
export default function CheckOut() {
  const productData = useRecoilValue(StoreData);
  const { token, phone, address } = useRecoilValue(userData);
  const [checkOutP, setCheckOutP] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState({ mrp: 0, sellPrice: 0 });
  const [orderSuccess, setOrderSuccess] = useRecoilState(PagesToggle);
  console.log(productData.cartProduct);
  useEffect(() => {
    setLoading(true);
    axios
      .get(Urls.products)
      .then((respo) => {
        const data = respo.data.data;
        let pro = [];
        data.map((product) => {
          const result = productData.cartProduct.find(
            (cartP) => cartP.id === product.id
          );

          if (result) {
            pro = [...pro, { product, qty: result.qty }];
          }
        });
        let sellPrice = 0;
        let mrp = 0;
        pro.map((pro) => {
          sellPrice = sellPrice + pro.product.sellPrice * pro.qty;
          mrp = mrp + pro.product.price * pro.qty;
          console.log(pro);
        });
        sellPrice = decimalizer(sellPrice);
        mrp = decimalizer(mrp);
        setPrice({ ...price, mrp, sellPrice });

        setCheckOutP(pro);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(checkOutP);

  function placeOrderHdl() {
    const payLoad = {
      products: productData.cartProduct.map((product) => ({
        id: product.id,
        quantity: product.qty,
      })),
      phone: phone,
      address: address,
    };
    console.log(payLoad);

    axios
      .post(Urls.placeOrder, payLoad, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((respo) => {
        console.log(respo);
        setOrderSuccess({ ...orderSuccess, orderSuccess: true });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  console.log(checkOutP);
  console.log(price);

  return (
    <div className="container">
      <div className={style.container}>
        <h1>Check Out</h1>
        {loading ? (
          <CheckOutL />
        ) : (
          checkOutP.map((product) => (
            <div key={product.product.id} className={style.pBar}>
              <div>
                <h2>{product.product.name}</h2>
                <span>
                  <b>quentity:</b> {product.qty}
                </span>
              </div>
              <span>
                ₹{decimalizer(product.product.sellPrice)}X{product.qty}
              </span>
            </div>
          ))
        )}
        <hr />
        <div className={style.total}>
          <h3 style={{ color: "var(--primary)" }}>Total:</h3>
          <h3 style={{ color: "var(--Accent)" }}>₹{price.mrp}</h3>
        </div>
        <div className={style.total}>
          <h3 style={{ color: "var(--primary)" }}>Amount TO Pay:</h3>
          <h3 style={{ color: "var(--Accent)" }}>₹{price.sellPrice}</h3>
        </div>
      </div>
      <div className={style.button}>
        <button className="button" onClick={placeOrderHdl}>
          Order Place
        </button>
      </div>
      <OrderSuccess2 price={price} />
    </div>
  );
}
