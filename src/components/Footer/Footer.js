import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="copyright_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_left">
                <p>Copyright © 2022 All Rights Reserved</p>
              </div>
            </div>
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_right">
                <img src="assets/img/common/cards.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Footer;
