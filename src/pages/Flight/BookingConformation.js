import React, { useEffect, useState } from 'react';

import Right from '../../assets/img/icon/right.png';
import { useNavigate } from 'react-router-dom';

const BookingConformation = () => {
  const navigate = useNavigate();
  const [passengerInfo, setPassengerInfo] = useState(
    JSON.parse(localStorage.getItem('passengerInfo'))
  );
  const [flightDetails, setFlightDetails] = useState(
    JSON.parse(localStorage.getItem('selecetdFlightDetails'))
  );
  useEffect(() => {
    // setTimeout(() => {
    localStorage.removeItem('passengerInfo');
    localStorage.removeItem('selecetdFlightDetails');
    navigate('/bookings');
    // }, 2000);
  });
  return (
    <div>
      {/* Common Banner Area  */}
      <section id="common_banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Flight submission</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle"></i>
                    </span>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle"></i>
                    </span>{' '}
                    Flight booking
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>{' '}
      <section id="tour_booking_submission" class="section_padding">
        <div class="container">
          <div class="row">
            <div class="col-lg-8">
              <div class="tou_booking_form_Wrapper">
                <div class="tour_booking_form_box mb-4">
                  <div class="booking_success_arae">
                    <div class="booking_success_img">
                      <img src={Right} alt="img" />
                    </div>
                    <div class="booking_success_text">
                      <h3>
                        {console.log('passengerInfo', passengerInfo)}
                        {passengerInfo?.firstName} {passengerInfo?.lastName},
                        your ticket was booked successfully!
                      </h3>
                      <h6>
                        Your booking details has been sent to:
                        yourmail@domain.com
                      </h6>
                    </div>
                  </div>
                </div>
                <div class="booking_tour_form">
                  <h3 class="heading_theme">Your information</h3>
                  <div class="tour_booking_form_box">
                    <div class="your_info_arae">
                      <ul>
                        <li>
                          <span class="name_first">First name:</span>{' '}
                          <span class="last_name">
                            {passengerInfo?.firstName}
                          </span>
                        </li>
                        <li>
                          <span class="name_first">Last name:</span>{' '}
                          <span class="last_name">
                            {' '}
                            {passengerInfo?.lastName}
                          </span>
                        </li>
                        <li>
                          <span class="name_first">Email address:</span>{' '}
                          <span class="last_name"> {passengerInfo?.email}</span>
                        </li>

                        <li>
                          <span class="name_first">Phone Number:</span>{' '}
                          <span class="last_name">
                            {' '}
                            {passengerInfo?.phoneNumber}
                          </span>
                        </li>
                        <li>
                          <span class="name_first">PassPort Number:</span>{' '}
                          <span class="last_name">
                            {' '}
                            {passengerInfo?.passPortNumber}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="tour_details_right_sidebar_wrapper">
                <div class="tour_detail_right_sidebar">
                  <div class="tour_details_right_boxed">
                    <div class="tour_details_right_box_heading">
                      <h3>Booking details</h3>
                    </div>
                    <div class="tour_booking_amount_area">
                      <ul>
                        <li>
                          PNR Number: <span>{passengerInfo?.PNRNumber}</span>
                        </li>

                        <li>
                          Payment method: <span>Bank transfer</span>
                        </li>
                        <li>
                          Booking status: <span>Success</span>
                        </li>
                      </ul>
                      <ul>
                        <li>
                          Adult Price x 1{' '}
                          <span>AED {flightDetails?.price}</span>
                        </li>
                        <li class="remove_coupon_tour">
                          Discount <span>10%</span>
                        </li>
                        <li>
                          Tax <span>0%</span>
                        </li>
                      </ul>

                      <div class="coupon_add_area"></div>
                      <div class="total_subtotal_booking">
                        <h6 class="remove_coupon_tour">
                          Total Amount <span>AED {flightDetails?.price}</span>{' '}
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BookingConformation;
