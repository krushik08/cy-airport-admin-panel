import React, { useEffect, useState } from "react";
import {
  FaExchangeAlt,
  FaGlobe,
  FaHotel,
  FaPassport,
  FaPlaneArrival,
  FaPlaneDeparture,
} from "react-icons/fa";
import ApiService from "../../until/api";
import SearchForm from "../SearchForm/SearchForm";

const HomePage = () => {
  return (
    <>
      {/* Banner Area  */}
      <section id="home_one_banner">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12">
              <div className="banner_one_text">
                <h1>Explore the world together</h1>
                <h3>Find awesome flights, hotel, tour, car and packages</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form Area  */}
      <SearchForm />

      {/* imagination Area  */}
      <section id="go_beyond_area" className="section_padding_top">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="heading_left_area">
                <h2>
                  Go beyond your <span>imagination</span>
                </h2>
                <h5>Discover your ideal experience with us</h5>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="top-destinations.html">
                  <img
                    src="assets/img/imagination/imagination1.png"
                    alt="img"
                  />
                </a>
                <h3>
                  <a href="top-destinations.html">
                    7% Discount for all <span>Airlines</span>
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="top-destinations.html">
                  <img
                    src="assets/img/imagination/imagination2.png"
                    alt="img"
                  />
                </a>
                <h3>
                  <a href="#!">
                    Travel around<span>the world</span>
                  </a>
                </h3>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="imagination_boxed">
                <a href="top-destinations.html">
                  <img
                    src="assets/img/imagination/imagination3.png"
                    alt="img"
                  />
                </a>
                <h3>
                  <a href="top-destinations.html">
                    Luxury resorts<span>top deals</span>
                  </a>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top destinations  */}
      <section id="top_destinations" className="section_padding_top">
        <div className="container">
          {/* Section Heading  */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>Top destinations</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="destinations_content_box img_animation">
                <img src="assets/img/destination/big-img.png" alt="img" />
                <div className="destinations_content_inner">
                  <h2>Up to</h2>
                  <div className="destinations_big_offer">
                    <h1>50</h1>
                    <h6>
                      <span>%</span> <span>Off</span>
                    </h6>
                  </div>
                  <h2>Holiday packages</h2>
                  <a
                    href="top-destinations.html"
                    className="btn btn_theme btn_md"
                  >
                    Book now
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 col-12">
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination1.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">China</a>
                      </h3>
                    </div>
                  </div>
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination2.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">Darjeeling</a>
                      </h3>
                    </div>
                  </div>
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination3.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">Malaysia</a>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination4.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">Gangtok</a>
                      </h3>
                    </div>
                  </div>
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination5.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">Thailand</a>
                      </h3>
                    </div>
                  </div>
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination6.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">Australia</a>
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination7.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">London</a>
                      </h3>
                    </div>
                  </div>
                  <div className="destinations_content_box img_animation">
                    <a href="top-destinations.html">
                      <img
                        src="assets/img/destination/destination8.png"
                        alt="img"
                      />
                    </a>
                    <div className="destinations_content_inner">
                      <h3>
                        <a href="top-destinations.html">USA</a>
                      </h3>
                    </div>
                  </div>
                  <div className="destinations_content_box">
                    <a
                      href="top-destinations.html"
                      className="btn btn_theme btn_md w-100"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
