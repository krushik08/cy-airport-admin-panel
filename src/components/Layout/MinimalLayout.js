import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const MinimalLayout = () => {
  return (
    <>
      <div
        className=""
        style={{
          height: "100vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Outlet />
      </div>
    </>
  );
};

export default MinimalLayout;
