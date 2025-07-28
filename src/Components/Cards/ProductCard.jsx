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
    const isAvilableInCart = storeData.cartProduct.some(
      (pro) => pro.id === product.id
    );
    console.log(isAvilableInCart);
    let upDateCart;
    if (!isAvilableInCart) {
      upDateCart = [
        ...storeData.cartProduct,
        {
          id: product.id,
          qty: 1,
        },
      ];
    } else {
      upDateCart = storeData.cartProduct.map((pro) =>
        pro.id == product.id ? { ...pro, qty: pro.qty + 1 } : pro
      );
    }
    localStorage.setItem("cart", JSON.stringify(upDateCart));
    setStoreData({
      ...storeData,
      cartProduct: upDateCart,
    });
    setQtyShow({ ...qtyShow, showQty: true, notify: true });
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
