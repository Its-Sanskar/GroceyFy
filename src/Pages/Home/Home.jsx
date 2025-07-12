import React, { useState } from "react";
import ProductCard from "../../Components/Cards/ProductCard";
import style from "./Home.module.css";
import { useRecoilState } from "recoil";
import { StoreData } from "../../StoreData/productData";
import axios from "axios";
import { Link } from "react-router";
import { Urls } from "../../StoreData/Apis";
import Loader from "../../Components/Loader/Loader/Loader";

export default function Home() {
  const [productsData, setProductsData] = useRecoilState(StoreData);
  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const products = productsData.products;

  useState(() => {
    setLoading(true);
    axios
      .get(Urls.products)
      .then((respo) => {
        console.log(respo.data.data);

        const products = respo.data.data;
        const storeName = respo.data.storeName;
        setProductsData({ ...productsData, products });
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(e.message);
      })
      .finally(() => {});
  }, []);

  return (
    <div className="container">
      {error ? (
        <h1 className="error">{error}</h1>
      ) : Loading ? (
        <Loader />
      ) : (
        <div className={style.container}>
          {products.map((product) => (
            <Link
              className={style.textDeco}
              key={product.id}
              to={`/Product/${product.id}`}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
