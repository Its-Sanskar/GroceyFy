import axios from "axios";
import React, { useState } from "react";
import { Urls } from "../../../../StoreData/Apis";
import { useRecoilValue } from "recoil";
import { userData } from "../../../../StoreData/storeDetails";
import style from "./Products.module.css";

export default function Products() {
  const { token } = useRecoilValue(userData);
  const [data, setData] = useState({
    name: "",
    img: "",
    price: "",
    discount: "",
    description: "",
    unit: "",
    category: "",
  });

  function createProduct(e) {
    e.preventDefault();
    const payload = {
      name: data.name,
      images: [data.img],
      price: Number(data.price),
      discount: Number(data.discount),
      description: data.description,
      unit: data.unit,
      category: data.category,
    };
    console.log(payload);

    axios
      .post(Urls.creatProducts, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((reso) => {
        console.log(reso);
        setData({
          name: "",
          img: "",
          price: "",
          discount: "",
          description: "",
          unit: "",
          category: "",
        });
        alert("Product is uploaded");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className={style.container}>
      <h1>Products</h1>
      <div>
        <form onSubmit={createProduct}>
          <div className={style.inputs}>
            <div>
              <h3>Name</h3>
              <input
                type="text"
                placeholder="Enter Product Name"
                value={data.name}
                onChange={(e) => {
                  setData({ ...data, name: e.target.value });
                }}
              />
            </div>
            <div>
              <h3>Image:</h3>
              <input
                type="text"
                placeholder="Enter Image Url"
                value={data.img}
                onChange={(e) => setData({ ...data, img: e.target.value })}
              />
            </div>
            <div>
              <h3>Price</h3>
              <input
                type="number"
                placeholder="Price"
                value={data.price}
                onChange={(e) => setData({ ...data, price: e.target.value })}
              />
            </div>
            <div>
              <h3>Discount</h3>
              <input
                type="number"
                placeholder="Discount"
                value={data.discount}
                onChange={(e) => setData({ ...data, discount: e.target.value })}
              />
            </div>
            <div>
              <h3>Unit</h3>
              <input
                type="text"
                placeholder="Unit"
                value={data.unit}
                onChange={(e) => setData({ ...data, unit: e.target.value })}
              />
            </div>
            <div>
              <h3>Category</h3>
              <select
                className={style.select}
                value={data.category}
                onChange={(e) => setData({ ...data, category: e.target.value })}
                required
              >
                <option value="">Select category</option>
                <option value="fruits">Fruits</option>
                <option value="vegetables">Vegetables</option>
                <option value="dairy">Dairy Products</option>
                <option value="meat">Meat & Seafood</option>
                <option value="grains">Grains & Cereals</option>
                <option value="beverages">Beverages</option>
                <option value="snacks">Snacks</option>
                <option value="frozen">Frozen Foods</option>
                <option value="bakery">Bakery</option>
                <option value="household">Household Items</option>
              </select>
            </div>
          </div>
          <div className={style.description}>
            <textarea
              type="text"
              placeholder="Describe Your Product,its Features and Benefits"
              value={data.description}
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
            ></textarea>
          </div>
          <button className="button" type="submit">
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
