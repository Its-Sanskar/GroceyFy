import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { StoreData } from "../../StoreData/productData";
import axios from "axios";
import { Urls } from "../../StoreData/Apis";
import { userData } from "../../StoreData/storeDetails";
import style from "./CheckOut.module.css";
import CheckOutL from "../../Components/Loader/CheckOutL/CheckOutL";
export default function CheckOut() {
  const [productData, setProductData] = useRecoilState(StoreData);
  const { token } = useRecoilValue(userData);
  const [checkOutP, setCheckOutP] = useState([]);
  const [loading, setLoading] = useState(false);
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
        setCheckOutP(pro);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  function placeOrderHdl() {
    const payLoad = {
      products: productData.cartProduct.map((product) => ({
        id: product.id,
        quantity: product.qty,
      })),
      phone: "9340188888",
      address: "Jabalpur, Barela (M.P)",
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
      })
      .catch((e) => {
        console.log(e);
      });
  }
  console.log(checkOutP);

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
                ₹{product.product.sellPrice}X{product.qty}
              </span>
            </div>
          ))
        )}
        <hr />
        <h3>Total:</h3>
      </div>
      <div className={style.button}>
        <button className="button" onClick={placeOrderHdl}>
          Order Place
        </button>
      </div>
    </div>
  );
}
