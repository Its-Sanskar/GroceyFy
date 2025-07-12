const Main_api = "https://kiranabe.onrender.com/api";
export const Urls = {
  products: `${Main_api}/products`,
  creatProducts: `${Main_api}/products`,
  signUp: `${Main_api}/auth/register`,
  logIn: `${Main_api}/auth/login`,
  productDetail: (id) => `${Main_api}/products/${id}`,
  placeOrder: `${Main_api}/orders`,
  orders: `${Main_api}/orders`,
};
