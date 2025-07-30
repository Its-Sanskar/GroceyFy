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
import Notify from "./Components/Notification/Notify";
import PathProvider from "./Path.Provider";
import UserProfile from "./Pages/UserProfile/UserProfile";
import PlaceHolder from "./Pages/PlaceHolder/PlaceHolder";

export default function Navigationprovider() {
  return (
    <BrowserRouter>
      <NavBar />
      <SideBar />
      <Notify />
      <PathProvider />
      <PlaceHolder />
      <Routes>
        <Route path="/" Component={Home}></Route>
        <Route path="/Product/:id" Component={ProductDetailPage}></Route>
        <Route path="/Cart" Component={Cart}></Route>
        <Route
          path="/Profile"
          element={
            <AuthenticatedRoutes>
              <UserProfile />
            </AuthenticatedRoutes>
          }
        ></Route>
        <Route
          path="/Check_Out"
          element={
            <AuthenticatedRoutes>
              <CheckOut />
            </AuthenticatedRoutes>
          }
        ></Route>

        <Route
          path="/Orders"
          element={
            <AuthenticatedRoutes>
              <UserOrders />
            </AuthenticatedRoutes>
          }
        ></Route>
        <Route
          path="/Dashboard"
          element={
            <AuthenticatedRoutes>
              <Dashboard />
            </AuthenticatedRoutes>
          }
        >
          <Route path="" element={<Navigate to="Products" />} />
          <Route path="Products" Component={Products}></Route>
          <Route path="Orders" element={<Orders />}></Route>
          <Route path="Profile" element={<Profile />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
