import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import BookingConformation from './BookingConformation';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import ApiService from '../../until/api';
import moment from 'moment';

const selectStyle = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: '#fff',
    width: '80%',
    padding: '8px 12px',
    borderRadius: '8px',
  }),
  option: (styles, { data, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#4B0082' : '#fff',
      borderRadius: '8px',
      margin: '8px 0',
      padding: '12px',

      ':hover': {
        color: '#fff',
        backgroundColor: isFocused ? '#4B0082cc' : '#fff',
      },
      // ...
    };
  },
  backgroundColor: 'red',
  // ...
};
const FlightBooking = () => {
  const { id } = useParams();

  const navigate = useNavigate();
  const [passenger, setPassenger] = useState();
  const [ticketDetails, setTicketDetails] = useState();
  const [customValidation, setCustomValidation] = useState({
    firstName: null,
    lastName: null,
    bod: null,
    mobile: null,
    email: null,
    gender: null,
    passNumber: null,
    passportExpiry: null,
  });
  const [flightDetails, setFlightDetails] = useState(
    JSON.parse(localStorage.getItem('selecetdFlightDetails'))
  );
  const handleChange = (name, value) => {
    setPassenger({ ...passenger, [name]: value });
  };
  useEffect(() => {
    if (id) {
      ApiService.request(`book-flight/${id}`, 'get').then((response) => {
        setTicketDetails(response.flightBookDetails);
        setPassenger(response.data);
      });
    }
  }, [id]);

  const genderOption = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
  ];
  const customValidationFuc = () => {
    const newState = customValidation;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let phoneNumberRegex = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!passenger?.firstName) {
      newState['firstName'] = 'Please Enter First Name';
    }
    if (!passenger?.lastName) {
      newState['lastName'] = 'Please Enter Last Name';
    }
    if (!passenger?.DOB || moment(passenger.DOB, 'YYYY-MM-DD').isAfter()) {
      newState['DOB'] = 'Please Valid Birth Date';
    }
    debugger;
    if (
      !passenger?.phoneNumber ||
      (passenger?.phoneNumber && typeof passenger.phoneNumber === 'number'
        ? JSON.stringify(passenger.phoneNumber).length !== 10
        : passenger.phoneNumber.length !== 10)
    ) {
      newState['phoneNumber'] = 'Please Enter valid Phone Number';
    }
    if (!passenger?.email || !emailRegex.test(passenger.email)) {
      newState['email'] = 'Please Enter  valid Email';
    }
    if (!passenger?.gender) {
      newState['gender'] = 'Please Select Gender';
    }
    if (!passenger?.passPortNumber) {
      newState['passportNumber'] = 'Please Enter Passport Number';
    }
    if (
      !passenger?.passportExpiry ||
      moment(passenger.passportExpiry, 'YYYY-MM-DD').isBefore()
    ) {
      newState['passportExpiry'] = 'Please Enter Valid Passport Expiry';
    }
    console.log('newState', newState);
    setCustomValidation({ ...newState });
  };
  const handlePayNow = () => {
    customValidationFuc();
    if (
      !customValidation?.firstName &&
      !customValidation?.lastName &&
      !customValidation?.DOB &&
      !customValidation?.phoneNumber &&
      !customValidation?.email &&
      !customValidation?.passPortNumber &&
      !customValidation?.gender &&
      !customValidation?.passportExpiry
    ) {
      ApiService.request('book-flight/add', 'post', {
        ...passenger,
        flightId: flightDetails?.id,
        departureDate: flightDetails.departure.departureDate,
        departureAirport: flightDetails.departure.airport,
        arrivalAirport: flightDetails.arrival.airport,
        departureLocation: flightDetails.departure.code,
        arrivalLocation: flightDetails.arrival.code,
      }).then((response) => {
        if (response) {
          localStorage.setItem('passengerInfo', JSON.stringify(response.data));
          navigate('/booking-confirmation');
        }
      });
    }
  };
  const handleConfirm = () => {
    customValidationFuc();
    if (
      !customValidation?.firstName &&
      !customValidation?.lastName &&
      !customValidation?.DOB &&
      !customValidation?.phoneNumber &&
      !customValidation?.email &&
      !customValidation?.passPortNumber &&
      !customValidation?.gender &&
      !customValidation?.passportExpiry
    ) {
      ApiService.request(`book-flight/${id}`, 'put', {
        ...passenger,
        flightId: flightDetails?.id,
        departureDate: flightDetails.departure.departureDate,
        departureAirport: flightDetails.departure.airport,
        arrivalAirport: flightDetails.arrival.airport,
        departureLocation: flightDetails.departure.code,
        arrivalLocation: flightDetails.arrival.code,
        status: 'Rescheduled',
      }).then((response) => {
        if (response) {
          localStorage.setItem('passengerInfo', JSON.stringify(response.data));
          navigate('/bookings');
        }
      });
    }
  };
  return (
    <>
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
      </section>

      {/* Tour Booking Submission Areas  */}
      <section id="tour_booking_submission" className="section_padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="tou_booking_form_Wrapper">
                <div className="booking_tour_form">
                  <h3 className="heading_theme">Passenger information</h3>
                  <div className="tour_booking_form_box">
                    <form action="!#" id="tour_bookking_form_item">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={passenger?.firstName}
                              className="form-control bg_input"
                              placeholder="First name*"
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  firstName: '',
                                });
                                handleChange('firstName', e.target.value);
                              }}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.firstName}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Last Name
                            </label>

                            <input
                              type="text"
                              value={passenger?.lastName}
                              className="form-control bg_input"
                              placeholder="Last name*"
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  lastName: '',
                                });
                                handleChange('lastName', e.target.value);
                              }}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.lastName}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Brith of Date
                            </label>

                            <input
                              type="date"
                              value={
                                passenger?.DOB
                                  ? moment(passenger?.DOB).format('YYYY-MM-DD')
                                  : ''
                              }
                              className="form-control bg_input"
                              placeholder="Brith of Date*"
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  DOB: '',
                                });
                                handleChange('DOB', e.target.value);
                              }}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.DOB}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Mobile Number
                            </label>

                            <input
                              type="number"
                              value={passenger?.phoneNumber}
                              className="form-control bg_input"
                              placeholder="Phone Number"
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  phoneNumber: '',
                                });
                                handleChange('phoneNumber', e.target.value);
                              }}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.phoneNumber}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Email
                            </label>

                            <input
                              type="email"
                              value={passenger?.email}
                              className="form-control bg_input"
                              placeholder="Email"
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  email: '',
                                });
                                handleChange('email', e.target.value);
                              }}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.email}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Gender
                            </label>

                            <Select
                              className="form-control bg_input"
                              value={genderOption.find(
                                (item) => item?.value === passenger?.gender
                              )}
                              onChange={(newData) => {
                                setCustomValidation({
                                  ...customValidation,
                                  gender: '',
                                });
                                handleChange('gender', newData.value);
                              }}
                              options={genderOption}
                              styles={selectStyle}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.gender}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Passport Number
                            </label>

                            <input
                              type="text"
                              value={passenger?.passPortNumber}
                              className="form-control bg_input"
                              placeholder="Passport no."
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  passportNumber: '',
                                });
                                handleChange('passPortNumber', e.target.value);
                              }}
                            />

                            <p style={{ color: '#A80101' }}>
                              {customValidation?.passportNumber}
                            </p>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label for="mobil-number" className="mb-3">
                              Passport Expiry
                            </label>
                            <input
                              type="date"
                              value={
                                passenger?.passportExpiry
                                  ? moment(passenger?.passportExpiry).format(
                                      'YYYY-MM-DD'
                                    )
                                  : ''
                              }
                              className="form-control bg_input"
                              placeholder="Passport Expires"
                              onChange={(e) => {
                                setCustomValidation({
                                  ...customValidation,
                                  passportExpiry: '',
                                });
                                handleChange('passportExpiry', e.target.value);
                              }}
                            />
                            <p style={{ color: '#A80101' }}>
                              {customValidation?.passportExpiry}
                            </p>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="booking_tour_form">
                  <h3 className="heading_theme">Payment method</h3>
                  <div className="tour_booking_form_box">
                    <div className="booking_payment_boxed">
                      <form action="!#" id="payment_checked">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            value="red"
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault1"
                          >
                            Payment by card
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault2"
                            value="green"
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault2"
                          >
                            Paypal
                          </label>
                        </div>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault3"
                            value="black"
                          />
                          <label
                            className="form-check-label"
                            for="flexRadioDefault3"
                          >
                            Payoneer
                          </label>
                        </div>

                        <div className="payment_filed_wrapper">
                          <div className="payment_card payment_toggle red">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Card number"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Cardholder name"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Date of expiry"
                                  />
                                </div>
                              </div>
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Security code"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="paypal_payment payment_toggle green">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Email Address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="payoneer_payment payment_toggle black">
                            <div className="row">
                              <div className="col-lg-6">
                                <div className="form-group">
                                  <input
                                    type="text"
                                    className="form-control bg_input"
                                    placeholder="Email Address"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="booking_tour_form_submit">
                  <div className="form-check write_spical_check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefaultf1"
                    />
                    <label
                      className="form-check-label"
                      for="flexCheckDefaultf1"
                    >
                      I read and accept all{' '}
                      <a href="terms-service.html">Terms and conditios</a>
                    </label>
                  </div>
                  {!id ? (
                    <button
                      onClick={handlePayNow}
                      className="btn btn_theme btn_md"
                    >
                      Pay Now
                    </button>
                  ) : (
                    <button
                      onClick={handleConfirm}
                      className="btn btn_theme btn_md"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="tour_details_right_sidebar_wrapper">
                <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Flights</h3>
                    </div>
                    <div className="flight_sidebar_right">
                      <div className="flight_search_left_sidebar">
                        <div className="flight_search_destination_sidebar">
                          <p style={{ color: '#A80101' }}>From</p>
                          <h3>{flightDetails?.departure?.value}</h3>
                          <h6>{flightDetails?.departure?.airport}.</h6>
                        </div>
                      </div>
                      <div className="flight_search_middel_sidebar">
                        <div className="flight_right_arrow_sidebar">
                          <img
                            src="https://andit.co/projects/html/and-tour/demo/assets/img/icon/right_arrow.png"
                            alt="icon"
                          />
                          <h6>Non-stop</h6>
                          {/* <p style={{ color: '#A80101' }}>01h 05minute </p> */}
                        </div>
                        <div className="flight_search_destination_sidebar">
                          <p style={{ color: '#A80101' }}>To</p>
                          <h3>{flightDetails?.arrival?.value}</h3>
                          <h6>{flightDetails?.arrival?.airport}.</h6>
                        </div>
                      </div>
                    </div>
                    <div className="tour_package_details_bar_list">
                      <h5>Package rules</h5>
                      <ul>
                        <li>
                          <i className="fas fa-circle"></i>Buffet breakfast as
                          per the Itinerary
                        </li>
                        <li>
                          <i className="fas fa-circle"></i>Visit eight villages
                          showcasing Polynesian culture
                        </li>
                        <li>
                          <i className="fas fa-circle"></i>Complimentary Camel
                          safari, Bonfire,
                        </li>
                        <li>
                          <i className="fas fa-circle"></i>All toll tax,
                          parking, fuel, and driver allowances
                        </li>
                        <li>
                          <i className="fas fa-circle"></i>Comfortable and
                          hygienic vehicle
                        </li>
                      </ul>
                    </div>
                    <div className="tour_package_details_bar_price">
                      <h5>Price</h5>
                      <div className="tour_package_bar_price">
                        <h6>
                          <del>AED *800</del>
                        </h6>
                        <h3>AED {flightDetails?.price}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                {/* <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Travel date</h3>
                    </div>
                    <div className="edit_date_form">
                      <div className="form-group">
                        <label for="dates">Edit Date</label>
                        <input
                          type="date"
                          value="2022-05-05"
                          className="form-control"
                          id="dates"
                        />
                      </div>
                    </div>
                    <div className="tour_package_details_bar_list">
                      <h5>Tourist</h5>
                      <div className="select_person_item">
                        <div className="select_person_left">
                          <h6>Adult</h6>
                          <p style={{color:"#A80101"}}>12y+</p>
                        </div>
                        <div className="select_person_right">
                          <h6>01</h6>
                        </div>
                      </div>

                      <div className="select_person_item">
                        <div className="select_person_left">
                          <h6>Children</h6>
                          <p style={{color:"#A80101"}}>2 - 12 years</p>
                        </div>
                        <div className="select_person_right">
                          <h6>01</h6>
                        </div>
                      </div>
                      <div className="select_person_item">
                        <div className="select_person_left">
                          <h6>Infant</h6>
                          <p style={{color:"#A80101"}}>Below 2 years</p>
                        </div>
                        <div className="select_person_right">
                          <h6>01</h6>
                        </div>
                      </div>
                    </div>
                    <div className="edit_person">
                      <p style={{color:"#A80101"}}>Edit person</p>
                    </div>
                  </div>
                </div> */}

                <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Booking amount</h3>
                    </div>

                    <div className="tour_booking_amount_area">
                      <ul>
                        <li>
                          Adult Price x 1{' '}
                          <span>AED {flightDetails?.price}</span>
                        </li>
                        <li>
                          Discount <span>-0%</span>
                        </li>
                        <li>
                          Tax<span>5%</span>
                        </li>
                      </ul>

                      <div className="total_subtotal_booking">
                        <h6>
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
    </>
  );
};

export default FlightBooking;
