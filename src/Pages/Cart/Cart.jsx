import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { StoreData } from "../../StoreData/productData";
import axios from "axios";
import { Urls } from "../../StoreData/Apis";
import Image from "../../Components/Image/Image";
import style from "./Cart.module.css";
import Loader from "../../Components/Loader/Loader/Loader";
import { Link } from "react-router";
export default function Cart() {
  const [storeData, setStoreData] = useRecoilState(StoreData);
  const [cartProducts, setCartProducts] = useState([]);
  const [loading, setLoader] = useState(false);

  const cartData = storeData.cartProduct;
  console.log(cartData);
  useEffect(() => {
    setLoader(true);
    axios.get(Urls.products).then((respo) => {
      console.log(respo.data.data);
      const data = respo.data.data;
      let cartP = [];
      data.forEach((product) => {
        const result = cartData.find((respo) => respo.id === product.id);
        console.log(result);

        if (result) {
          cartP = [...cartP, { product, qty: result.qty }];
        }
      });
      setCartProducts(cartP);
      setLoader(false);
    });
  }, []);

  {
    cartProducts && console.log(cartProducts);
  }

  return (
    <div className="container">
      {cartData.length ? (
        loading ? (
          <Loader />
        ) : (
          <div>
            <div className={style.contBtn}>
              <button
                className="button"
                onClick={() => {
                  localStorage.removeItem("cart");
                  setStoreData({ ...storeData, cartProduct: [] });
                }}
              >
                Clear Cart
              </button>
            </div>
            {cartProducts &&
              cartProducts.map((cartProduct) => (
                <Link
                  to={`/Product/${cartProduct.product.id}`}
                  className={style.pdtContainer}
                  key={cartProduct.product.id}
                >
                  <Image src={cartProduct.product.images} css={style.img} />
                  <div className={style.detail}>
                    <h1>{cartProduct.product.name}</h1>
                    <span> {cartProduct.product.description} </span>
                    <br />

                    <span>
                      <b>Quentity:</b> {cartProduct.qty}
                    </span>
                  </div>
                </Link>
              ))}

            <Link to="/Check Out" className={style.contBtn}>
              <button className="button">Proceed To Buy</button>
            </Link>
          </div>
        )
      ) : (
        <h1 className={style.noPro}>No Product In Cart</h1>
      )}
    </div>
  );
}
