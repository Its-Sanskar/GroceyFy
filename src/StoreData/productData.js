import { atom } from "recoil";

function cartData() {
  if (JSON.parse(localStorage.getItem("cart"))) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    return cart;
  } else {
    return [];
  }
}
export const StoreData = atom({
  key: "ProductsData",
  default: { products: [], product: {}, cartProduct: cartData() },
});
