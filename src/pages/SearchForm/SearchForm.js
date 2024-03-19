import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import {
  FaExchangeAlt,
  FaGlobe,
  FaHotel,
  FaPassport,
  FaPlaneArrival,
  FaPlaneDeparture,
} from 'react-icons/fa';
import Hotels from '../../components/Search/Hotels';
import Visa from '../../components/Search/Visa';
import Tours from '../../components/Search/Tours';
import ApiService from '../../until/api';
import moment from 'moment/moment';
import PassengerModal from '../../components/Modals/passenger/passenger';
import { connect, useSelector } from 'react-redux';
import { setFlightSearch } from '../../store/flightSearch';
import { setFlightDetails } from '../../store/flightDetails';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
const departureAirpot = [
  {
    value: 'Dubai',
    label: 'Dubai (DXB - Dubai International Airport)',
    airport: 'Dubai International Airport',
    code: 'DXB',
  },
  {
    value: 'Abu Dhabi',
    label: 'Abu Dhabi (AUH - Zayed International Airport)',
    airport: 'Zayed International Airport',
    code: 'AUH',
  },
];
const arrivalAirport = [
  {
    value: 'Mumbai',
    label: 'Mumbai (BOM - Chhatrapati Shivaji Maharaj International Airport)',
    airport: 'Chhatrapati Shivaji Maharaj International Airport',
    code: 'BOM',
  },
  {
    value: 'London',
    label: 'London (OXF - Oxford, United Kingdom)',
    airport: 'Oxford, United Kingdom',
    code: 'OXF',
  },
  {
    value: 'Paris',
    label: 'Paris (PAR - Charles de Gaulle Airport)',
    airport: 'Charles de Gaulle Airport',
    code: 'PAR',
  },
  {
    value: 'New York',
    label: 'New York (JFK - John F. Kennedy International Airport)',
    airport: 'John F. Kennedy International Airport',
    code: 'JFK',
  },
  {
    value: 'Barcelona',
    label: 'Barcelona (BCN - Josep Tarradellas Barcelona–El Prat Airport)',
    airport: 'Josep Tarradellas Barcelona–El Prat Airport',
    code: 'BCN',
  },
];
const preferredClassis = [
  {
    id: 0,
    value: 'Business',
  },
  {
    id: 1,
    value: 'Economy',
  },
  {
    id: 2,
    value: 'First Class',
  },
];

const selectStyle = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    width: '80%',
    fontSize: '20px',
    fontWeight: '500',
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

const SearchForm = ({
  flightList,
  setFlightList,
  ticketDetails,
  searchoptions,
  setSearchoptions,
}) => {
  const { id } = useParams();
  const [fromAirpot, setFromAirpot] = useState();
  const [toAirpot, setToAirpot] = useState();

  const navigate = useNavigate();
  const location = useLocation();
  const { flightSearch } = useSelector((state) => state?.flightSearch);

  const [passengerInfo, setPassengerInfo] = useState({
    passengers: {
      adult: flightSearch?.passengers?.adult || 0,
      children: flightSearch?.passengers?.children || 0,
      infant: flightSearch?.passengers?.infant || 0,
    },
    sourceCode: 'AMD',
    destinationCode: 'LHR',
    flightType: 'One Way',
    departureDate: moment().format('YYYY-MM-DD'),
    preferedClass: flightSearch?.preferedClass || 0,
    returnDate: moment().add(1, 'd').format('YYYY-MM-DD'),
  });
  const [flightType, setFlightType] = useState(
    flightSearch?.flightType || passengerInfo?.flightType
  );
  const [selectedLocations, setSelectedLocations] = useState({
    from: flightSearch?.sourceCode || passengerInfo?.sourceCode,
    to: flightSearch?.destinationCode || passengerInfo?.destinationCode,
  });
  const [startLocalData, setStartLocalData] = useState({});
  const [endLocalData, setEndLocalData] = useState({});
  const [allCity, setAllCity] = useState([]);
  const [openModal, setIsOpenModal] = useState('');
  const [departureDate, setDepartureDate] = useState(
    moment().add(1, 'day').format('YYYY-MM-DD')
  );
  const [returnDate, setReturnDate] = useState(
    flightSearch?.returnDate || passengerInfo.returnDate
  );
  const [isFlightBooking, setIsFlightBooking] = useState(false);
  useEffect(() => {
    setFromAirpot(departureAirpot[0]);
    setToAirpot(arrivalAirport[2]);
  }, []);
  useEffect(() => {
    if (ticketDetails) {
      const selectedDepartureAirpot = departureAirpot.find(
        (item) => item.code === ticketDetails?.departureLocation
      );
      const selectedArrivalAirport = arrivalAirport.find(
        (item) => item.code === ticketDetails?.arrivalLocation
      );
      setDepartureDate(
        moment(ticketDetails?.departureDate).format('YYYY-MM-DD')
      );
      console.log('departureAirpot', departureAirpot);
      console.log('arrivalAirport', arrivalAirport);
      console.log('selectedDepartureAirpot', selectedDepartureAirpot);
      console.log('selectedArrivalAirport', selectedArrivalAirport);
      setFromAirpot(selectedDepartureAirpot);

      setToAirpot(selectedArrivalAirport);
    }
    // handleFetchData();
  }, [ticketDetails]);
  useEffect(() => {
    let selectedStartValue = allCity.find((data) => {
      if (data.airport_code === selectedLocations.from) {
        return data;
      }
    });
    let selectedEndValue = allCity.find((data) => {
      if (data.airport_code === selectedLocations.to) {
        return data;
      }
    });
    setStartLocalData(selectedStartValue);
    setEndLocalData(selectedEndValue);
  }, [selectedLocations, allCity]);
  useEffect(() => {}, [
    startLocalData,
    endLocalData,
    departureDate,
    passengerInfo,
  ]);
  const switchHandle = () => {
    setSelectedLocations({
      from: selectedLocations.to,
      to: selectedLocations.from,
    });
  };
  const handleFetchData = (e) => {
    ApiService.request('flight/list', 'get').then((response) => {
      setFlightList(response.flight);
      setSearchoptions({
        departure: { ...fromAirpot, departureDate },
        arrival: { ...toAirpot },
      });
    });
  };
  return (
    <>
      <section id="theme_search_form">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="theme_search_form_area">
                <div className="theme_search_form_tabbtn">
                  {!isFlightBooking && (
                    <ul className="nav nav-tabs" role="tablist">
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="flights-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#flights"
                          type="button"
                          role="tab"
                          aria-controls="flights"
                          aria-selected="true"
                        >
                          <FaPlaneDeparture size={18} fontWeight={900} />
                          Flights
                        </button>
                      </li>
                    </ul>
                  )}
                </div>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="flights"
                    role="tabpanel"
                    aria-labelledby="flights-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div
                          className={`flight_categories_search ${
                            !isFlightBooking
                              ? 'root_categories_search'
                              : 'booking_categories_search'
                          }`}
                        >
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  flightType === 'One Way' ? 'active' : ''
                                }`}
                                id="oneway-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#oneway_flight"
                                type="button"
                                role="tab"
                                aria-controls="oneway_flight"
                                aria-selected="true"
                                onClick={() => setFlightType('One Way')}
                              >
                                One Way
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className={`nav-link ${
                                  flightType === 'Round Trip' ? 'active' : ''
                                }`}
                                id="roundtrip-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#roundtrip"
                                type="button"
                                role="tab"
                                aria-controls="roundtrip"
                                aria-selected="false"
                                onClick={() => setFlightType('Round Trip')}
                              >
                                Roundtrip
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContent1">
                      <div
                        className="tab-pane fade show active"
                        id="oneway_flight"
                        role="tabpanel"
                        aria-labelledby="oneway-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form action="#!">
                                <div className="row">
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>From</p>
                                      <div className="city_Name">
                                        <Select
                                          isDisabled={id}
                                          value={fromAirpot}
                                          onChange={(newData) =>
                                            setFromAirpot(newData)
                                          }
                                          options={departureAirpot}
                                          styles={selectStyle}
                                          // menuIsOpen
                                        />
                                      </div>

                                      <span>{startLocalData?.name}</span>

                                      <div className="plan_icon_posation">
                                        <FaPlaneDeparture
                                          size={24}
                                          fontWeight={900}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3 col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      <p>To</p>
                                      <div className="city_Name">
                                        {console.log('id', id)}
                                        <Select
                                          isDisabled={id}
                                          value={toAirpot}
                                          onChange={(newData) =>
                                            setToAirpot(newData)
                                          }
                                          options={arrivalAirport}
                                          styles={selectStyle}
                                          // menuIsOpen
                                        />
                                      </div>
                                      <span>{endLocalData?.name}</span>

                                      <div className="plan_icon_posation">
                                        <FaPlaneArrival
                                          size={24}
                                          fontWeight={900}
                                        />
                                      </div>
                                      <div className="range_plan">
                                        <div className="range_plan-wrapper">
                                          <FaExchangeAlt
                                            size={24}
                                            onClick={switchHandle}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          <p>Journey date</p>
                                          {console.log(
                                            'departureDate',
                                            departureDate
                                          )}
                                          <input
                                            type="date"
                                            value={departureDate}
                                            min={departureDate}
                                            onChange={(e) => {
                                              setDepartureDate(e.target.value);
                                              setReturnDate(
                                                moment(e.target.value)
                                                  .add(1, 'd')
                                                  .format('YYYY-MM-DD')
                                              );
                                            }}
                                          />
                                          <span>
                                            {moment(departureDate).format(
                                              'dddd'
                                            )}
                                          </span>
                                        </div>
                                        {flightType == 'Round Trip' && (
                                          <div className="Journey_date">
                                            <p>Return date</p>
                                            <input
                                              type="date"
                                              value={returnDate}
                                              min={moment(departureDate)
                                                .add(1, 'd')
                                                .format('YYYY-MM-DD')}
                                              onChange={(e) => {
                                                setReturnDate(e.target.value);
                                              }}
                                            />
                                            <span>
                                              {' '}
                                              {moment(returnDate).format(
                                                'dddd'
                                              )}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div class="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div class="flight_Search_boxed dropdown_passenger_area">
                                      <p>Passenger, Class </p>
                                      <div class="dropdown">
                                        <button
                                          class="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                          onClick={() => {
                                            setIsOpenModal(
                                              !openModal ? 'show' : ''
                                            );
                                          }}
                                        >
                                          {parseInt(
                                            passengerInfo.passengers.adult +
                                              passengerInfo.passengers
                                                .children +
                                              passengerInfo.passengers.infant
                                          ) || 0}
                                        </button>
                                        <PassengerModal
                                          openModal={openModal}
                                          setIsOpenModal={setIsOpenModal}
                                          passengerInfo={passengerInfo}
                                          setPassengerInfo={setPassengerInfo}
                                          preferredClassis={preferredClassis}
                                        />
                                      </div>
                                      <span>
                                        {
                                          preferredClassis[
                                            passengerInfo.preferedClass
                                          ].value
                                        }
                                      </span>
                                    </div>
                                  </div>
                                  <div className="top_form_search_button">
                                    <button
                                      type="button"
                                      disabled={!(fromAirpot && toAirpot)}
                                      className="btn btn_theme btn_md"
                                      onClick={handleFetchData}
                                    >
                                      Search
                                    </button>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tours */}
                  <div
                    className="tab-pane fade"
                    id="tours"
                    role="tabpanel"
                    aria-labelledby="tours-tab"
                  >
                    <Tours />
                  </div>

                  {/* Hotels */}
                  <div
                    className="tab-pane fade"
                    id="hotels"
                    role="tabpanel"
                    aria-labelledby="hotels-tab"
                  >
                    <Hotels />
                  </div>

                  {/* Visa */}
                  <div
                    className="tab-pane fade"
                    id="visa-application"
                    role="tabpanel"
                    aria-labelledby="visa-tab"
                  >
                    <Visa />
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

export default SearchForm;
