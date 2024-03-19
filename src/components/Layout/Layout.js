import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Layout.css";

const Layout = () => {
  return (
    <>
      <div className="layout__wrapper">
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
