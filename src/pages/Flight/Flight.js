import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ApiService from '../../until/api';
import SearchForm from '../SearchForm/SearchForm';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import Air1 from '../../assets/img/flights/Air1.png';
import Air2 from '../../assets/img/flights/Air2.png';
import Air3 from '../../assets/img/flights/Air3.png';
import Air4 from '../../assets/img/flights/Air4.png';
import Air5 from '../../assets/img/flights/Air5.png';
import Air6 from '../../assets/img/flights/Air6.png';
const Flight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flightList, setFlightList] = useState([]);
  const [searchoptions, setSearchoptions] = useState();
  const [ticketDetails, setTicketDetails] = useState();
  useEffect(() => {
    if (id) {
      ApiService.request(`book-flight/${id}`, 'get').then((response) => {
        setTicketDetails(response.flightBookDetails);
      });
    }
  }, [id]);
  return (
    <>
      {/* search  */}
      <div className="search-overlay">
        <div className="d-table">
          <div className="d-table-cell">
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-layer"></div>
            <div className="search-overlay-close">
              <span className="search-overlay-close-line"></span>
              <span className="search-overlay-close-line"></span>
            </div>
            <div className="search-overlay-form">
              <form>
                <input
                  type="text"
                  className="input-search"
                  placeholder="Search here..."
                />
                <button type="button">
                  <i className="fas fa-search"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Common Banner Area  */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Flight search result</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle"></i>
                    </span>{' '}
                    Flight search result
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*  */}
      <div className="mt-5">
        <SearchForm
          ticketDetails={ticketDetails}
          flightList={flightList}
          setFlightList={setFlightList}
          searchoptions={searchoptions}
          setSearchoptions={setSearchoptions}
        />
      </div>

      {/* <!-- Flight Search Areas --> */}
      <section id="explore_area" className="section_padding">
        <div className="container">
          {/* <!-- Section Heading --> */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                <h2>
                  {flightList.length} Flight{flightList.length ? 's' : ''} Found
                </h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {flightList.length ? (
                <>
                  {flightList.map((item) => (
                    <div className="flight_search_result_wrapper">
                      <div className="flight_search_item_wrappper">
                        <div className="flight_search_items">
                          <div className="flight_search_left">
                            <div className="flight_logo">
                              {item?.imgPath === 'Air1' && (
                                <img src={Air1} cls alt="img" />
                              )}
                              {item?.imgPath === 'Air2' && (
                                <img src={Air2} alt="img" />
                              )}
                              {item?.imgPath === 'Air3' && (
                                <img src={Air3} alt="img" />
                              )}
                              {item?.imgPath === 'Air4' && (
                                <img src={Air4} alt="img" />
                              )}
                              {item?.imgPath === 'Air5' && (
                                <img src={Air5} alt="img" />
                              )}
                              {item?.imgPath === 'Air6' && (
                                <img src={Air6} alt="img" />
                              )}

                              <p>{item?.flightNo}</p>
                            </div>
                          </div>
                          <div className="flight_multis_area_wrapper">
                            <div className="flight_search_middel">
                              <div className="flight_search_destination">
                                <p>From</p>
                                <h3>{searchoptions?.departure.value}</h3>
                                <h6>{item?.departureTime}</h6>
                                <h6>{searchoptions?.departure?.airport}</h6>
                              </div>
                              <div className="flight_right_arrow">
                                <img
                                  src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/right_arrow.png"
                                  alt="icon"
                                />
                                <h6>Non-stop</h6>
                                <p>{item?.takenTime} </p>
                              </div>
                              <div className="flight_search_destination">
                                <p>To</p>
                                <h3>{searchoptions?.arrival.value}</h3>
                                <h6>{item?.arrivalTime}</h6>
                                <h6>{searchoptions?.arrival?.airport}</h6>
                              </div>
                            </div>
                          </div>
                          <div className="flight_search_right">
                            <h5>
                              <del>$800</del>
                            </h5>
                            <h2>
                              AED {item?.price}
                              <sup>*20% OFF</sup>
                            </h2>
                            <button
                              onClick={() => {
                                const date = moment(
                                  searchoptions?.departure?.departureDate
                                ).format('YYYY-MM-DD');
                                searchoptions.departure.departureDate = moment(
                                  `${date}T${item?.departureTime}`
                                ).toISOString();
                                const selectedFlightDetails = {
                                  id: item?._id,
                                  ...searchoptions,
                                  price: item?.price,
                                };
                                console.log(
                                  'selectedFlightDetails',
                                  selectedFlightDetails
                                );

                                localStorage.setItem(
                                  'selecetdFlightDetails',
                                  JSON.stringify(selectedFlightDetails)
                                );
                                if (id) {
                                  navigate(`/flight-booking/${id}`);
                                } else {
                                  navigate('/flight-booking');
                                }
                              }}
                              className="btn btn_theme btn_sm"
                            >
                              Book now
                            </button>
                            <p>*Discount applicable on some conditions</p>
                            <h6
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseExample"
                              aria-expanded="false"
                              aria-controls="collapseExample"
                            >
                              Show more <i className="fas fa-chevron-down"></i>
                            </h6>
                          </div>
                        </div>
                        <div
                          className="flight_policy_refund collapse"
                          id="collapseExample"
                        >
                          <div className="flight_show_down_wrapper">
                            <div className="flight-shoe_dow_item">
                              <div className="airline-details">
                                <div className="img">
                                  <img src="assets/img/icon/bg.png" alt="img" />
                                </div>
                                <span className="airlineName fw-500">
                                  Biman Bangladesh Airlines &nbsp; BG435
                                </span>
                                <span className="flightNumber">
                                  BOEING 737-800 - 738
                                </span>
                              </div>
                              <div className="flight_inner_show_component">
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                                <div className="flight_duration">
                                  <div className="arrow_right"></div>
                                  <span>01h 15m</span>
                                </div>
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_refund_policy">
                              <div className="TabPanelInner flex_widht_less">
                                <h4>Refund Policy</h4>
                                <p className="fz12">
                                  1. Refund and Date Change are done as per the
                                  following policies.
                                </p>
                                <p className="fz12">
                                  2. Refund Amount= Refund Charge (as per
                                  airline policy + ShareTrip Convenience Fee).{' '}
                                </p>
                                <p className="fz12">
                                  3. Date Change Amount= Date Change Fee (as per
                                  Airline Policy + ShareTrip Convenience Fee).
                                </p>
                              </div>
                              <div className="TabPanelInner">
                                <h4>Baggage</h4>
                                <div className="flight_info_taable">
                                  <h3>DAC-SPD</h3>
                                  <p>
                                    <span>20KG /</span> person
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flight_show_down_wrapper">
                            <div className="flight-shoe_dow_item">
                              <div className="airline-details">
                                <div className="img">
                                  <img src="assets/img/icon/bg.png" alt="img" />
                                </div>
                                <span className="airlineName fw-500">
                                  Biman Bangladesh Airlines &nbsp; BG435
                                </span>
                                <span className="flightNumber">
                                  BOEING 737-800 - 738
                                </span>
                              </div>
                              <div className="flight_inner_show_component">
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                                <div className="flight_duration">
                                  <div className="arrow_right"></div>
                                  <span>01h 15m</span>
                                </div>
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_refund_policy">
                              <div className="TabPanelInner flex_widht_less">
                                <h4>Refund Policy</h4>
                                <p className="fz12">
                                  1. Refund and Date Change are done as per the
                                  following policies.
                                </p>
                                <p className="fz12">
                                  2. Refund Amount= Refund Charge (as per
                                  airline policy + ShareTrip Convenience Fee).{' '}
                                </p>
                                <p className="fz12">
                                  3. Date Change Amount= Date Change Fee (as per
                                  Airline Policy + ShareTrip Convenience Fee).
                                </p>
                              </div>
                              <div className="TabPanelInner">
                                <h4>Baggage</h4>
                                <div className="flight_info_taable">
                                  <h3>DAC-SPD</h3>
                                  <p>
                                    <span>20KG /</span> person
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flight_show_down_wrapper">
                            <div className="flight-shoe_dow_item">
                              <div className="airline-details">
                                <div className="img">
                                  <img src="assets/img/icon/bg.png" alt="img" />
                                </div>
                                <span className="airlineName fw-500">
                                  Biman Bangladesh Airlines &nbsp; BG435
                                </span>
                                <span className="flightNumber">
                                  BOEING 737-800 - 738
                                </span>
                              </div>
                              <div className="flight_inner_show_component">
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                                <div className="flight_duration">
                                  <div className="arrow_right"></div>
                                  <span>01h 15m</span>
                                </div>
                                <div className="flight_det_wrapper">
                                  <div className="flight_det">
                                    <div className="code_time">
                                      <span className="code">DAC</span>
                                      <span className="time">15:00</span>
                                    </div>
                                    <p className="airport">
                                      Hazrat Shahjalal International Airport
                                    </p>
                                    <p className="date">7th Jun 2022</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="flight_refund_policy">
                              <div className="TabPanelInner flex_widht_less">
                                <h4>Refund Policy</h4>
                                <p className="fz12">
                                  1. Refund and Date Change are done as per the
                                  following policies.
                                </p>
                                <p className="fz12">
                                  2. Refund Amount= Refund Charge (as per
                                  airline policy + ShareTrip Convenience Fee).{' '}
                                </p>
                                <p className="fz12">
                                  3. Date Change Amount= Date Change Fee (as per
                                  Airline Policy + ShareTrip Convenience Fee).
                                </p>
                              </div>
                              <div className="TabPanelInner">
                                <h4>Baggage</h4>
                                <div className="flight_info_taable">
                                  <h3>DAC-SPD</h3>
                                  <p>
                                    <span>20KG /</span> person
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Flight;
