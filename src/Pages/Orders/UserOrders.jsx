import axios from "axios";
import React, { useEffect, useState } from "react";
import { Urls } from "../../StoreData/Apis";
import { useRecoilValue } from "recoil";
import { userData } from "../../StoreData/storeDetails";
import Image from "../../Components/Image/Image";
import style from "./UserOrders.module.css";
import Loader from "../../Components/Loader/Loader/Loader";
import { IoBagHandleOutline } from "react-icons/io5";
import { date } from "../../StoreData/utilityFunctions";

export default function UserOrders() {
  const { token } = useRecoilValue(userData);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(token);

  useEffect(() => {
    setLoading(true);
    axios
      .get(Urls.orders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((respo) => {
        const products = respo.data.data;
        console.log(products);
        setProducts(products);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <div className={style.container}>
        <div className={style.head}>
          <h1>Orders</h1> <hr color="#654f4a" />
        </div>

        {loading ? (
          <Loader />
        ) : (
          products.map((product) => (
            <div key={product.id} className={style.product}>
              <div className={style.info}>
                <div>
                  <div>{date(product.createdAt)}</div>
                </div>
                <IoBagHandleOutline
                  className={style.icon}
                  color="var(--primary)"
                  size={30}
                />
              </div>
              <div className={style.pDisplay}>
                {product.items.map((item) => (
                  <div key={item.product.id} className={style.inProducts}>
                    <div className={style.img}>
                      <Image src={item.product.images} />
                    </div>
                    <div className={style.bottom}>
                      <h3>{item.product.name}</h3>
                      <span>
                        <b>Quentity:</b>
                        {item.quantity}
                      </span>
                      <span>
                        <b>Amount:</b>₹{item.total}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
