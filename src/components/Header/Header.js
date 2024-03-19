import React, { useEffect, useState } from 'react';
import './Header.css';

import { Link } from 'react-router-dom';
import Logo from '../../assets/img/logo.png';
import SecondLogo from '../../assets/img/second-logo.png';

const Header = () => {
  const [sticky, setSticky] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', isSticky);
    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = () => {
    const scrollTop = window.scrollY;
    const stickyClass = scrollTop >= 10 ? 'is-sticky' : '';
    setSticky(stickyClass);
  };

  const navClass = `navbar-area ${sticky}`;

  return (
    <>
      <header className="main_header_arae">
        {/* Navbar Bar  */}
        <div className={navClass}>
          <div className="main-responsive-nav">
            <div className="container-fluid d-sm-none ">
              <div className="main-responsive-menu">
                <div className="logo">
                  <Link to="/flight">
                    {window.scrollY >= 10 ? (
                      <img src={SecondLogo} alt="logo" className="logo-img" />
                    ) : (
                      <>
                        <img src={Logo} alt="logo" className="logo-img" />
                      </>
                    )}
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="main-navbar d-sm-block">
            <div className="container">
              <nav className="navbar navbar-expand-sm navbar-light">
                <Link className="navbar-brand" to="/flight">
                  {window.scrollY >= 10 ? (
                    <img src={SecondLogo} alt="logo" className="logo-img" />
                  ) : (
                    <>
                      <img src={Logo} alt="logo" className="logo-img" />
                    </>
                  )}
                </Link>
                <div
                  className="collapse navbar-collapse mean-menu"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/flight" className="nav-link ">
                        Flight
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/bookings" className="nav-link ">
                        Booked Flight
                      </Link>
                    </li>
                  </ul>
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <Link to="become-vendor.html" className="btn  btn_navber">
                        Logout
                      </Link>
                    </div>
                  </div>
                </div>
              </nav>
            </div>
          </div>
          {/* <div className="others-option-for-responsive">
            <div className="container">
              <div className="dot-menu">
                <div className="inner">
                  <div className="circle circle-one"></div>
                  <div className="circle circle-two"></div>
                  <div className="circle circle-three"></div>
                </div>
              </div>
              <div className="container">
                <div className="option-inner">
                  <div className="others-options d-flex align-items-center">
                    <div className="option-item">
                      <Link to="#" className="search-box">
                        <i className="fas fa-search"></i>
                      </Link>
                    </div>
                    <div className="option-item">
                      <Link to="contact.html" className="btn  btn_navber">
                        Get free quote
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          {/* <div className="mean-bar">
            <GiHamburgerMenu />
          </div> */}
        </div>
      </header>
    </>
  );
};

export default Header;
