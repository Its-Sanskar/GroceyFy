import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { StoreData } from "../../StoreData/productData";
import { useParams } from "react-router";
import axios from "axios";
import style from "./ProductDetail.module.css";
import { Urls } from "../../StoreData/Apis";
import Image from "../../Components/Image/Image";
import Loader from "../../Components/Loader/Loader/Loader";
import { decimalizer } from "../../StoreData/utilityFunctions";
import { PagesToggle } from "../../StoreData/PagesToggle";
export default function ProductDetailPage() {
  const { id } = useParams();
  const [storeData, setStoreData] = useRecoilState(StoreData);
  const [Loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [qtyShow, setShowQty] = useRecoilState(PagesToggle);

  const product = storeData.product;

  useEffect(() => {
    setLoading(true);
    axios.get(Urls.productDetail(id)).then((respo) => {
      const product = respo.data.data;
      setStoreData({ ...storeData, product });
      setLoading(false);
    });
  }, []);
  function cartBtnHdl() {
    const newCart = [
      ...storeData.cartProduct,
      {
        id: product.id,
        qty: quantity,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setStoreData({
      ...storeData,
      cartProduct: newCart,
    });
    setShowQty({ ...qtyShow, showQty: true });
  }

  return (
    <div className="container">
      {Loading ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <div className={style.container}>
          <div className={style.imgContainer}>
            <Image src={product.images} css={style.image} />
          </div>
          <div className={style.detail}>
            <h1>{product.name}</h1>
            <span>{product.description}</span>
            <span>
              <b> MRP:</b>
              <s>₹{product.price}</s>
            </span>
            <span>
              <b>Discount:</b> {product.discount}%
            </span>
            <div className={style.price}>
              <span>
                <b>Selling Price :</b>₹{decimalizer(product.sellPrice)}/
                {product.unit}
              </span>
              <div className={style.counter}>
                <button
                  className="button"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  className="button"
                  onClick={() => {
                    setQuantity(quantity + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div className={style.btn}>Buy Now</div>
            <div className={style.btn} onClick={cartBtnHdl}>
              Add To Cart
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
