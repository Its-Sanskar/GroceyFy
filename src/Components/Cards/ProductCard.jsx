import style from "./Card.module.css";
import { motion } from "motion/react";
import Image from "../Image/Image";
import { StoreData } from "../../StoreData/productData";
import { useRecoilState } from "recoil";
import { PagesToggle } from "../../StoreData/PagesToggle";

export default function ProductCard(props) {
  const product = props.product;
  const [storeData, setStoreData] = useRecoilState(StoreData);
  const [qtyShow, setQtyShow] = useRecoilState(PagesToggle);
  function cartBtnHdl(e) {
    e.stopPropagation();
    setQtyShow({ ...qtyShow, showQty: true });
    const newCart = [
      ...storeData.cartProduct,
      {
        id: product.id,
        qty: 1,
      },
    ];
    localStorage.setItem("cart", JSON.stringify(newCart));
    setStoreData({
      ...storeData,
      cartProduct: newCart,
    });
  }
  return (
    <motion.div
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      {product && (
        <div className={style.card}>
          <Image src={product.images[0]} css={style.image} />
          <h3>{product.name}</h3>
          <span>
            ₹{product.price}/{product.unit}
          </span>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.preventDefault();
              cartBtnHdl(e);
            }}
            className={style.addCartBtn}
          >
            Add To Cart
          </motion.button>
        </div>
      )}
    </motion.div>
  );
}
