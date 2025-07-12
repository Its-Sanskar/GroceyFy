import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import NavBar from "./Components/Nav_Bar/Nav_Bar";
import Home from "./Pages/Home/Home";
import ProductDetailPage from "./Pages/ProductDetail/Product.detail.page";
import SideBar from "./Components/SideBar/SideBar";
import Cart from "./Pages/Cart/Cart";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Dashboard/Dashboard-pages/Products/Products";
import Profile from "./Pages/Dashboard/Dashboard-pages/Profile/Profile";
import CheckOut from "./Pages/checkOut/CheckOut";
import UserOrders from "./Pages/Orders/UserOrders";
import Orders from "./Pages/Dashboard/Dashboard-pages/orders/Orders";

import AuthenticatedRoutes from "./AuthenticatedRoutes";

export default function Navigationprovider() {
  return (
    <BrowserRouter>
      <NavBar />
      <SideBar />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/Product/:id" Component={ProductDetailPage}></Route>
        <Route path="/Cart" Component={Cart}></Route>

        <Route
          path="/Check Out"
          element={
            <AuthenticatedRoutes>
              <CheckOut />
            </AuthenticatedRoutes>
          }
        ></Route>

        <Route path="/Orders" Component={UserOrders}></Route>
        <Route path="/Dashboard" element={<Dashboard />}>
          <Route path="" element={<Navigate to="Products" />} />
          <Route path="Products" Component={Products}></Route>
          <Route
            path="Orders"
            element={
              <AuthenticatedRoutes>
                <Orders />
              </AuthenticatedRoutes>
            }
          ></Route>
          <Route path="Profile" Component={Profile}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
