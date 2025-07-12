import React, { useEffect } from "react";
import style from "./Card.module.css";
import { motion, scale } from "motion/react";
import { useRecoilState } from "recoil";
import { StoreData } from "../../StoreData/productData";
import { img } from "motion/react-client";
import Image from "../Image/Image";

export default function ProductCard(props) {
  const [detailProduct, setDetailProduct] = useRecoilState(StoreData);
  const product = props.product;

  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.01 }}
      transition={{duration:0.2}}
    >
      {product && (
        <div className={style.card}>
          {/* <img src={product.images} /> */}
          <Image src={product.images[0]} css={style.image} />
          <h3>{product.name}</h3>
          <span>
            ₹{product.price}/{product.unit}
          </span>
          <div className={style.addCartBtn}>Add To Cart</div>
        </div>
      )}
    </motion.div>
  );
}
