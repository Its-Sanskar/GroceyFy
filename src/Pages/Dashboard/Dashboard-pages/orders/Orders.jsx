import axios from "axios";
import React, { useEffect, useState } from "react";
import { Urls } from "../../../../StoreData/Apis";
import { useRecoilValue } from "recoil";
import { userData } from "../../../../StoreData/storeDetails";
import { BsFillBoxSeamFill } from "react-icons/bs";
import { FaRegCalendarAlt } from "react-icons/fa";
import style from "./Orders.module.css";
import OrdersLoader from "../../../../Components/Loader/OrdersLoader/OrdersLoader";
import { date } from "../../../../StoreData/utilityFunctions";
import { CiLocationOn } from "react-icons/ci";

export default function Orders() {
  const { token } = useRecoilValue(userData);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(Urls.orders, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((reso) => {
        const data = reso.data.data;
        console.log(data);
        setProducts(data);
        setLoading(false);
      });
  }, []);
  return (
    <div className={style.container}>
      <h1>Orders</h1>

      {loading ? (
        <OrdersLoader />
      ) : (
        products.map((product) => (
          <div key={product.id} className={style.product}>
            <div className={style.user}>
              <BsFillBoxSeamFill size={50} />
              <div>
                <div>
                  <span>
                    <b> {product.user.name} </b>
                  </span>
                  <span>{product.phone}</span>
                </div>
                <div>
                  <span>
                    <FaRegCalendarAlt color="var(--primary)" />{" "}
                    {date(product.createdAt)}
                  </span>
                  <span>
                    <CiLocationOn color="var(--primary)" />
                    <b>{product.address}</b>
                  </span>
                </div>
              </div>
            </div>
            <table className={style.table}>
              <thead>
                <tr>
                  <th>Order Id</th>
                  <th>Product Id</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {product.items.map((item) => (
                  <tr key={item.id} className={style.tData}>
                    <td>#{item.orderId}</td>
                    <td>{item.productId}</td>
                    <td>{item.quantity}</td>
                    <td>₹{item.unitPrice}</td>
                    <td>₹{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}
    </div>
  );
}
