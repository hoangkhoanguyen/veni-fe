import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Footer } from "../../components/Footer/Footer";
import { Header } from "../../components/Header/Header";
import { path } from "../../constant";
import { Blog } from "../Blog/Blog";
import { Cart } from "../Cart/Cart";
import { CheckOut } from "../CheckOut/CheckOut";
import { Contact } from "../Contact/Contact";
import { History } from "../History/History";
import { HomePage } from "../HomePage/HomePage";
import { MyStore } from "../MyStore/MyStore";
import { Order } from "../Order/Order";
import { OrderDetails } from "../OrderDetails/OrderDetails";
import { ProductDetails } from "../ProductDetails/ProductDetails";
import { Profile } from "../Profile/Profile";

export const NormalPage = () => {
  return (
    <>
      <Header />
      <main className="main-site">
        {/* <Router> */}
        <Routes>
          <Route index element={<HomePage />} />
          <Route path={path.CART} element={<Cart />} />
          <Route path={path.PROFILE} element={<Profile />} />
          <Route path={path.HISTORY} element={<History />} />
          <Route path={path.MY_STORE} element={<MyStore />} />
          <Route path={path.ORDER} element={<Order />} />
          <Route path={path.ORDER_DETAILS} element={<OrderDetails />} />
          <Route path={path.CHECK_OUT} element={<CheckOut />} />
          <Route path={path.PRODUCT_DETAILS} element={<ProductDetails />} />
          <Route path={path.CONTACT} element={<Contact />} />
          <Route path={path.BLOGS} element={<Blog />} />
        </Routes>
        {/* </Router> */}
      </main>
      <Footer />
    </>
  );
};
